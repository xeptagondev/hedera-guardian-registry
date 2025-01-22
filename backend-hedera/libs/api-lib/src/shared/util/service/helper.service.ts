import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
    private prepareValue(value: any, table?: string, toLower?: boolean) {
        if (value instanceof Array) {
            return '(' + value.map((e) => `'${e}'`).join(',') + ')';
        } else if (this.isQueryDto(value)) {
            return this.generateWhereSQL(value, undefined, table);
        } else if (typeof value === 'string') {
            if (value === 'NULL') {
                return value;
            }
            if (toLower != true) {
                return "'" + value + "'";
            } else {
                return "LOWER('" + value + "')";
            }
        }
        return value;
    }

    private prepareKey(col: string, table?: string) {
        let key: string;
        if (col.includes('->>')) {
            const parts = col.split('->>');
            key = `"${parts[0]}"->>'${parts[1]}'`;
        } else {
            key = `"${col}"`;
        }
        return `${table ? table + '.' : ''}${key}`;
    }

    private isLower(key: string) {
        if (
            [
                'email',
                'name',
                'companyName',
                'taxId',
                'country',
                'title',
                'externalId',
                'serialNo',
                'programmeTitle',
                'programmeName',
                'id',
            ].includes(key)
        )
            return true;
    }

    private isQueryDto(obj) {
        if (
            obj &&
            typeof obj === 'object' &&
            (obj['filterAnd'] || obj['filterOr'])
        ) {
            return true;
        }
        return false;
    }

    public generateWhereSQL(
        query: QueryDto,
        extraSQL?: string,
        table?: string,
        ignoreCol?: string[],
    ) {
        let sql = '';
        if (query.filterAnd) {
            if (ignoreCol) {
                query.filterAnd = query.filterAnd.filter(
                    (e) => ignoreCol.indexOf(e.key) >= 0,
                );
            }
            sql += query.filterAnd
                .map((e) => {
                    if (this.isQueryDto(e.value)) {
                        return `(${this.prepareValue(e.value, table)})`;
                    } else if (e.operation === 'ANY') {
                        return `${this.prepareValue(
                            e.value,
                            table,
                        )} = ANY(${this.prepareKey(e.key, table)})`;
                    } else if (e.keyOperation) {
                        return `${e.keyOperation}(${this.prepareKey(e.key, table)}) ${
                            e.operation
                        } ${this.prepareValue(e.value, table, true)}`;
                    } else if (
                        this.isLower(e.key) &&
                        typeof e.value === 'string'
                    ) {
                        return `LOWER(${this.prepareKey(e.key, table)}) ${
                            e.operation
                        } ${this.prepareValue(e.value, table, true)}`;
                    } else {
                        return `${this.prepareKey(e.key, table)} ${
                            e.operation
                        } ${this.prepareValue(e.value, table)}`;
                    }
                })
                .join(' and ');
        }
        if (query.filterOr) {
            if (ignoreCol) {
                query.filterOr = query.filterOr.filter(
                    (e) => ignoreCol.indexOf(e.key) >= 0,
                );
            }
            const orSQl = query.filterOr
                .map((e) => {
                    if (this.isQueryDto(e.value)) {
                        return `(${this.prepareValue(e.value, table)})`;
                    } else if (e.operation === 'ANY') {
                        return `${this.prepareValue(
                            e.value,
                            table,
                        )} = ANY(${this.prepareKey(e.key, table)})`;
                    } else if (e.keyOperation) {
                        return `${e.keyOperation}(${this.prepareKey(e.key, table)}) ${
                            e.operation
                        } ${this.prepareValue(e.value, table, true)}`;
                    } else if (
                        this.isLower(e.key) &&
                        typeof e.value === 'string'
                    ) {
                        return `LOWER(${this.prepareKey(e.key, table)}) ${
                            e.operation
                        } ${this.prepareValue(e.value, table, true)}`;
                    } else {
                        return `${this.prepareKey(e.key, table)} ${
                            e.operation
                        } ${this.prepareValue(e.value, table)}`;
                    }
                })
                .join(' or ');
            if (sql != '') {
                sql = `(${sql}) and (${orSQl})`;
            } else {
                sql = orSQl;
            }
        }

        if (sql != '') {
            if (extraSQL) {
                sql = `(${sql}) and (${extraSQL})`;
            }
        } else if (extraSQL) {
            sql = extraSQL;
        }

        return sql;
    }
}
