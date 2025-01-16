import { LogLevel } from './enum/log-level.enum';

export class AuditDTO {
    logLevel: LogLevel;

    message: string;
}
