import { Injectable, Logger } from "@nestjs/common";
import { resolve } from "path";
import { LocationInterface } from "./location.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Region } from "../entities/region.entity";
import { LocationDataType } from "src/enum/locationDataType.enum";
import { Province } from "src/entities/province.entity";
import { District } from "src/entities/district.entity";
import { DSDivision } from "src/entities/dsDivision.entity";
import { City } from "src/entities/city.entity";
const fs = require("fs");

@Injectable()
export class FileLocationService implements LocationInterface {
  private regionMap: { [key: string]: number[] } = {};
  private provinceMap: { [key: string]: number[] } = {};
  private config = {
    [LocationDataType.REGION]: {
      fileName: "regions.csv",
      entity: Region,
      nameField: "regionName",
      repository: () => this.regionRepo,
    },
    [LocationDataType.PROVINCE]: {
      fileName: "provinces.csv",
      entity: Province,
      nameField: "provinceName",
      repository: () => this.provinceRepo,
    },
    [LocationDataType.DISTRICT]: {
      fileName: "districts.csv",
      entity: District,
      nameField: "districtName",
      repository: () => this.districtRepo,
    },
    [LocationDataType.DIVISION]: {
      fileName: "dsDivisions.csv",
      entity: DSDivision,
      nameField: "divisionName",
      repository: () => this.divisionRepo,
    },
    [LocationDataType.CITY]: {
      fileName: "cities.csv",
      entity: City,
      nameField: "cityName",
      repository: () => this.cityRepo,
    },
    // Additional types can be configured here easily
  };
  constructor(
    private logger: Logger,
    @InjectRepository(Region) private regionRepo: Repository<Region>,
    @InjectRepository(Province) private provinceRepo: Repository<Province>,
    @InjectRepository(District) private districtRepo: Repository<District>,
    @InjectRepository(DSDivision) private divisionRepo: Repository<DSDivision>,
    @InjectRepository(City) private cityRepo: Repository<City>
  ) {}

  public async init(data: string | null, locationDataType: LocationDataType): Promise<void> {
    this.logger.log(`Initializing file location service for ${locationDataType}...`);
    const { fileName, repository } = this.config[locationDataType];
    const rawData = data || (await fs.readFileSync(fileName, "utf8"));
    await this.processData(rawData, locationDataType, repository());
  }

  private async processData(
    rawData: string,
    type: LocationDataType,
    repository: Repository<any>
  ): Promise<void> {
    const rows = rawData.slice(rawData.indexOf("\n") + 1).split("\n");
    const headers = rawData
      .slice(0, rawData.indexOf("\n"))
      .split(",")
      .map((header) => header.trim().replace("\r", ""));
    const dataIndexes = {
      nameIndex: headers.indexOf("Name"),
      latitudeIndex: headers.indexOf("Latitude"),
      longitudeIndex: headers.indexOf("Longitude"),
      countryIndex: headers.indexOf("Country"),
      languageIndex: headers.indexOf("Language"),
      // districtIndex: headers.indexOf("District"),
      // divisionIndex: headers.indexOf("DS Division"),
    };

    switch (type) {
      case LocationDataType.CITY:
        dataIndexes["districtIndex"] = headers.indexOf("District");
        dataIndexes["divisionIndex"] = headers.indexOf("DS Division");
        break;
      case LocationDataType.DIVISION:
        dataIndexes["districtIndex"] = headers.indexOf("District");
        break;

      case LocationDataType.DISTRICT:
        dataIndexes["provinceIndex"] = headers.indexOf("Province");
        break;
      // More cases can be added as needed for other LocationDataType values.
    }

    if (LocationDataType.CITY === type) {
    }

    const entities = rows
      .map((row) => this.parseRow(row, dataIndexes, type))
      .filter((entity) => entity !== null);
    console.log("entities------", entities);
    await repository.save(entities);
    this.logger.log(`${type} data loaded: ${entities.length}`);
  }

  private parseRow(
    row: string,
    indexes: any,
    type: LocationDataType
  ): Region | Province | District | DSDivision | null {
    console.log("row------", row);
    const columns = row.replace("\r", "").split(",");
    if (columns.length !== Object.keys(indexes).length) return null;

    const EntityClass = this.config[type].entity;
    const entity = new EntityClass();
    const nameField = this.config[type].nameField;
    entity[nameField] = columns[indexes.nameIndex].trim();
    entity.countryAlpha2 = columns[indexes.countryIndex].trim();
    entity.geoCoordinates = [
      Number(columns[indexes.longitudeIndex].trim()),
      Number(columns[indexes.latitudeIndex].trim()),
    ];
    entity.lang = columns[indexes.languageIndex].trim();
    entity.key = entity[nameField].trim().replace(/\s+/g, "") + "_" + entity.lang;
    if (this.isDistrict(entity, type)) {
      entity.provinceName = columns[indexes.provinceIndex].trim();
    }
    if (this.isDSDivision(entity, type)) {
      entity.districtName = columns[indexes.districtIndex].trim();
    }
    if (this.isCity(entity, type)) {
      entity.districtName = columns[indexes.districtIndex].trim();
      entity.divisionName = columns[indexes.divisionIndex].trim();
    }
    return entity;
  }

  isDSDivision(entity: any, locationDataType: LocationDataType): entity is DSDivision {
    return LocationDataType.DIVISION === locationDataType;
  }

  isCity(entity: any, locationDataType: LocationDataType): entity is City {
    return LocationDataType.CITY === locationDataType;
  }

  isDistrict(entity: any, locationDataType: LocationDataType): entity is District {
    return LocationDataType.DISTRICT === locationDataType;
  }

  // public async init(data: any, locationDataType: LocationDataType): Promise<void> {
  //   this.logger.log("file location init");
  //   switch (locationDataType) {
  //     case LocationDataType.REGION:
  //       let regionRawData;
  //       if (!data) {
  //         regionRawData = fs.readFileSync("regions.csv", "utf8");
  //       } else {
  //         regionRawData = data;
  //       }
  //       return await this.retrieveData(regionRawData);
  //       break;
  //     case LocationDataType.PROVINCE:
  //       return await this.retrieveProvinceData(data);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // public async retrieveData(regionRawData: any) {
  //   // let regionRawData;
  //   // if (!data) {
  //   //   regionRawData = fs.readFileSync("regions.csv", "utf8");
  //   // } else {
  //   //   regionRawData = data;
  //   // }
  //   const deliminator = ",";

  //   const headers = regionRawData
  //     .slice(0, regionRawData.indexOf("\n"))
  //     .split(deliminator)
  //     .map((e) => e.trim().replace("\r", ""));
  //   const rows = regionRawData.slice(regionRawData.indexOf("\n") + 1).split("\n");

  //   const nameIndex = headers.indexOf("Name");
  //   const latitudeIndex = headers.indexOf("Latitude");
  //   const countryIndex = headers.indexOf("Country");
  //   const longitudeIndex = headers.indexOf("Longitude");
  //   const languageIndex = headers.indexOf("Language");
  //   if (
  //     nameIndex >= 0 &&
  //     latitudeIndex >= 0 &&
  //     longitudeIndex >= 0 &&
  //     countryIndex >= 0 &&
  //     languageIndex >= 0
  //   ) {
  //     const data: Region[] = [];
  //     for (let row of rows) {
  //       row = row.replace("\r", "");
  //       const columns = row.split(deliminator);
  //       if (columns.length != headers.length) {
  //         continue;
  //       }

  //       const region = new Region();
  //       region.countryAlpha2 = columns[countryIndex].trim();
  //       region.regionName = columns[nameIndex].trim();
  //       region.geoCoordinates = [
  //         Number(columns[longitudeIndex].trim()),
  //         Number(columns[latitudeIndex].trim()),
  //       ];
  //       region.lang = columns[languageIndex].trim();
  //       region.key = region.regionName + "_" + region.lang;
  //       const exist = data.some(
  //         (item: any) => item?.regionName === region.regionName && item?.lang === region.lang
  //       );
  //       if (!exist) {
  //         data.push(region);
  //       }
  //     }

  //     await this.regionRepo.save(data);
  //   }

  //   this.logger.log(`Regions loaded: ${Object.values(this.regionMap).length}`);
  // }

  // public async retrieveProvinceData(data: any) {
  //   let provinceRawData;
  //   if (!data) {
  //     provinceRawData = fs.readFileSync("province.csv", "utf8");
  //   } else {
  //     provinceRawData = data;
  //   }
  //   const deliminator = ",";

  //   const headers = provinceRawData
  //     .slice(0, provinceRawData.indexOf("\n"))
  //     .split(deliminator)
  //     .map((e) => e.trim().replace("\r", ""));
  //   const rows = provinceRawData.slice(provinceRawData.indexOf("\n") + 1).split("\n");

  //   const nameIndex = headers.indexOf("Name");
  //   const latitudeIndex = headers.indexOf("Latitude");
  //   const countryIndex = headers.indexOf("Country");
  //   const longitudeIndex = headers.indexOf("Longitude");
  //   const languageIndex = headers.indexOf("Language");
  //   if (
  //     nameIndex >= 0 &&
  //     latitudeIndex >= 0 &&
  //     longitudeIndex >= 0 &&
  //     countryIndex >= 0 &&
  //     languageIndex >= 0
  //   ) {
  //     const data: Province[] = [];
  //     for (let row of rows) {
  //       row = row.replace("\r", "");
  //       const columns = row.split(deliminator);
  //       if (columns.length != headers.length) {
  //         continue;
  //       }

  //       const province = new Province();
  //       province.countryAlpha2 = columns[countryIndex].trim();
  //       province.provinceName = columns[nameIndex].trim();
  //       province.geoCoordinates = [
  //         Number(columns[longitudeIndex].trim()),
  //         Number(columns[latitudeIndex].trim()),
  //       ];
  //       province.lang = columns[languageIndex].trim();
  //       province.key = province.provinceName + "_" + province.lang;
  //       const exist = data.some(
  //         (item: any) => item?.regionName === province.provinceName && item?.lang === province.lang
  //       );
  //       if (!exist) {
  //         data.push(province);
  //       }
  //     }

  //     await this.provinceRepo.save(data);
  //   }

  //   this.logger.log(`Province loaded: ${Object.values(this.provinceMap).length}`);
  // }

  public async getCoordinatesForRegion(regions: string[]): Promise<number[][]> {
    if (!regions) {
      return [];
    }

    const list = [];
    for (const region of regions) {
      list.push(
        (
          await this.regionRepo.findOneBy({
            regionName: region,
          })
        )?.geoCoordinates
      );
    }
    return list;
    // return new Promise((resolve, reject) => {
    //   resolve(regions.map( (region) => {
    //     return this.regionMap[region]
    //   }));
    // })
  }
}
