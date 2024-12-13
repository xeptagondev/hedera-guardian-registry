/* eslint-disable prefer-const */
import { DateTime } from 'luxon';
import { ProgrammeTransfer } from '../Entities/programmeTransfer';
import { GovBGColor, CertBGColor, DevBGColor } from '../../Styles/role.color.constants';
import {
  ProgrammeStageR,
  ProgrammeStageMRV,
  ProgrammeStageUnified,
  ProgrammeStatus,
  ProgrammeCategory,
  ProjectProposalStage,
  getProjectCategory,
} from '../Enums/programmeStage.enum';
import { TypeOfMitigation } from '../Enums/typeOfMitigation.enum';
import { CreditTransferStage } from '../Enums/creditTransferStage.enum';
import { SectoralScope } from '../Enums/sectoralScope.enum';
import { RcFile } from 'rc-upload/lib/interface';
import { CarbonSystemType } from '../Enums/carbonSystemType.enum';
import { CreditTypeSl } from '../Enums/creditTypeSl.enum';

export const getStageEnumVal = (value: string) => {
  const index = Object.keys(ProgrammeStageUnified).indexOf(value);
  if (index < 0) {
    return value;
  }
  return Object.values(ProgrammeStageUnified)[index];
};

export const getStatusEnumVal = (value: string) => {
  const index = Object.keys(ProgrammeStatus).indexOf(value);
  if (index < 0) {
    return value;
  }
  return Object.values(ProgrammeStatus)[index];
};

export const getProjectProposalStageEnumVal = (value: string) => {
  const index = Object.keys(ProjectProposalStage).indexOf(value);
  if (index < 0) {
    return value;
  }
  return Object.values(ProjectProposalStage)[index];
};
export const getCreditStageVal = (value: string) => {
  const index = Object.keys(CreditTransferStage).indexOf(value);
  if (index < 0) {
    return value;
  }
  return Object.values(CreditTransferStage)[index];
};

export const getStageTransferEnumVal = (value: string, transfer: ProgrammeTransfer) => {
  // if (transfer.isRetirement) {
  //   if (value === ProgrammeTransferStage.APPROVED) {
  //     return 'Recongnised';
  //   }
  //   if (value === ProgrammeTransferStage.REJECTED) {
  //     return 'Not Recongnised';
  //   }
  // }

  const index = Object.keys(CreditTransferStage).indexOf(value);
  if (index < 0) {
    return value;
  }
  return Object.values(CreditTransferStage)[index];
};

export const getStageTagType = (stage: ProgrammeStageR | ProgrammeStageUnified) => {
  switch (getStageEnumVal(stage)) {
    case ProgrammeStageR.AwaitingAuthorization:
      return 'error';
    case ProgrammeStageR.Authorised:
      return 'processing';
    case ProgrammeStageR.Approved:
      return 'purple';
    default:
      return 'default';
  }
};
export const getProgrammeStatus = (stage: ProgrammeStatus) => {
  switch (getStageEnumVal(stage)) {
    case ProgrammeStatus.CONSTRUCTION_STAGE:
      return 'processing';
    case ProgrammeStatus.INSTALLATION_STAGE:
      return 'processing';
    case ProgrammeStatus.PROCUREMENT_STAGE:
      return 'purple';
    default:
      return 'default';
  }
};

export const getProjectProposalStage = (stage: ProjectProposalStage) => {
  switch (getProjectProposalStageEnumVal(stage)) {
    case ProjectProposalStage.SUBMITTED_INF:
      return 'processing';
    case ProjectProposalStage.APPROVED_INF:
      return 'purple';
    case ProjectProposalStage.SUBMITTED_COST_QUOTATION:
      return 'processing';
    case ProjectProposalStage.SUBMITTED_PROPOSAL:
      return 'processing';
    case ProjectProposalStage.SUBMITTED_VALIDATION_AGREEMENT:
      return 'processing';
    case ProjectProposalStage.ACCEPTED_PROPOSAL:
      return 'purple';
    case ProjectProposalStage.SUBMITTED_CMA:
      return 'processing';
    case ProjectProposalStage.VALIDATION_PENDING:
      return 'processing';
    case ProjectProposalStage.AUTHORISED:
      return 'purple';
    case ProjectProposalStage.REJECTED_VALIDATION:
      return 'error';
    case ProjectProposalStage.APPROVED_CMA:
      return 'purple';
    case ProjectProposalStage.REJECTED_CMA:
      return 'error';
    case ProjectProposalStage.REJECTED_PROPOSAL:
      return 'error';
    case ProjectProposalStage.REJECTED_INF:
      return 'error';
    default:
      return 'default';
  }
};

export const getDocumentStatusColor = (status: string) => {
  switch (status) {
    case 'Accepted':
      return 'purple';
    case 'Rejected':
      return 'error';
    case 'Pending':
      return 'processing';
    default:
      return 'default';
  }
};

export const getCreditTypeVal = (value: string) => {
  const index = Object.keys(CreditTypeSl).indexOf(value);
  if (index < 0) {
    return value;
  }
  return Object.values(CreditTypeSl)[index];
};

export const getCreditTypeTagType = (stage: CreditTypeSl) => {
  switch (getCreditTypeVal(stage)) {
    case CreditTypeSl.TRACK_1:
      return 'orange';
    case CreditTypeSl.TRACK_2:
      return 'lime';
    default:
      return 'default';
  }
};

export const getCreditTypeName = (value: string) => {
  switch (getCreditTypeVal(value)) {
    case CreditTypeSl.TRACK_1:
      return 'SLCER+';
    case CreditTypeSl.TRACK_2:
      return 'SLCER';
    default:
      return 'SLCER';
  }
};

export const getStageTagTypeMRV = (stage: ProgrammeStageMRV) => {
  switch (getStageEnumVal(stage)) {
    case ProgrammeStageMRV.AwaitingAuthorization:
      return 'error';
    case ProgrammeStageMRV.Authorised:
      return 'processing';
    case ProgrammeStageMRV.Approved:
      return 'purple';
    default:
      return 'default';
  }
};

export const getTransferStageTagType = (
  stage: CreditTransferStage,
  transfer: ProgrammeTransfer
) => {
  // if (transfer.isRetirement) {
  //   switch (getStageEnumVal(stage)) {
  //     case ProgrammeTransferStage.APPROVED:
  //       return 'purple';
  //     case ProgrammeTransferStage.REJECTED:
  //       return 'orange';
  //   }
  // }
  switch (getCreditStageVal(stage)) {
    case CreditTransferStage.Rejected:
      return 'error';
    case CreditTransferStage.Approved:
      return 'processing';
    case CreditTransferStage.Pending:
      return 'success';
    case CreditTransferStage.Recognised:
      return 'purple';
    case CreditTransferStage.NotRecognised:
      return 'orange';
    default:
      return 'default';
  }
};

export class UnitField {
  constructor(public unit: string, public value: any) {}
}

export interface ProgrammeProperties {
  maxInternationalTransferAmount: string;
  creditingPeriodInYears: number;
  sourceOfFunding: any;
  grantEquivalentAmount: number;
  carbonPriceUSDPerTon: number;
  buyerCountryEligibility: string;
  geographicalLocation: string[];
  greenHouseGasses: any[];
  creditYear: number;
  programmeMaterials: [];
  projectMaterial: [];
}

export interface ProgrammePropertiesR extends ProgrammeProperties {
  programmeCostUSD: number;
  estimatedProgrammeCostUSD: number;
}

export interface ProgrammePropertiesT extends ProgrammeProperties {
  estimatedProgrammeCostUSD: number;
}

export interface ProgrammePropertiesU extends ProgrammeProperties {
  estimatedProgrammeCostUSD: number;
  programmeCostUSD: number;
}

export interface Programme {
  programmeId: string;
  externalId: string;
  serialNo: string;
  title: string;
  sectoralScope: string;
  sector: string;
  countryCodeA2: string;
  currentStage: ProgrammeStageR | ProgrammeStageMRV | ProgrammeStageUnified;
  startTime: number;
  endTime: number;
  creditChange: number;
  creditIssued: number;
  creditEst: number;
  creditBalance: number;
  creditTransferred: number[];
  creditRetired: number[];
  creditFrozen: number[];
  constantVersion: string;
  proponentTaxVatId: string[];
  companyId: number[];
  proponentPercentage: number[];
  creditOwnerPercentage: number[];
  certifierId: any[];
  certifier: any[];
  company: any[];
  creditUnit: string;
  programmeProperties: ProgrammeProperties;
  agricultureProperties: any;
  solarProperties: any;
  txTime: number;
  createdTime: number;
  txRef: string;
  typeOfMitigation: TypeOfMitigation;
  geographicalLocationCordintes: any;
  projectLocation: any;
  mitigationActions: any;
  environmentalAssessmentRegistrationNo: any;
  article6trade: boolean;
}
export interface ProgrammeSl {
  programmeId: string;
  externalId: string;
  serialNo: string;
  title: string;
  sectoralScope: string;
  sector: string;
  countryCodeA2: string;
  projectStatus: ProgrammeStatus;
  projectCategory: ProgrammeCategory;
  purposeOfCreditDevelopment: string;
  currentStage: ProgrammeStageR | ProgrammeStageMRV | ProgrammeStageUnified;
  projectProposalStage: ProjectProposalStage;
  startDate: number;
  endTime: number;
  creditChange: number;
  creditIssued: number;
  creditEst: number;
  creditBalance: number;
  creditRetired: number;
  creditFrozen: number;
  creditTransferred: number;
  estimatedProjectCost: number;
  constantVersion: string;
  proponentTaxVatId: string[];
  companyId: number;
  proponentPercentage: number[];
  creditOwnerPercentage: number[];
  certifierId: any[];
  certifier: any[];
  company: any;
  creditUnit: string;
  programmeProperties: ProgrammeProperties;
  agricultureProperties: any;
  solarProperties: any;
  txTime: number;
  createdTime: number;
  txRef: string;
  typeOfMitigation: TypeOfMitigation;
  geographicalLocationCordintes: any;
  projectLocation: any;
  mitigationActions: any;
  environmentalAssessmentRegistrationNo: any;
  article6trade: boolean;
  registrationCertificateUrl: string;
  district?: string;
  dsDivision?: string;
  province?: string;
  city?: string;
  community?: string;
  projectDescription?: string;
  additionalDocuments?: [];
  contactName?: string;
  contactEmail?: string;
  contactPhoneNo?: string;
}

export interface ProgrammeR extends Programme {
  currentStage: ProgrammeStageR;
  programmeProperties: ProgrammePropertiesR;
}

export interface ProgrammeT extends Programme {
  currentStage: ProgrammeStageMRV;
  programmeProperties: ProgrammePropertiesT;
  emissionReductionExpected: number;
  emissionReductionAchieved: number;
  ownership: boolean;
}

export interface ProgrammeSlU extends ProgrammeSl {
  currentStage: ProgrammeStageUnified;
  projectProposalStage: ProjectProposalStage;
  programmeProperties: ProgrammePropertiesU;
  emissionReductionExpected: number;
  emissionReductionAchieved: number;
  geographicalLocationCoordinates: any[];
  documents: any;
}

export interface ProgrammeU extends Programme {
  currentStage: ProgrammeStageUnified;
  programmeProperties: ProgrammePropertiesU;
  emissionReductionExpected: number;
  emissionReductionAchieved: number;
}

export const getGeneralFields = (
  programme: Programme | ProgrammeU | ProgrammeR | ProgrammeT,
  system?: CarbonSystemType
) => {
  let res: Record<string, any> = {
    title: programme.title,
    serialNo: programme.serialNo,
    currentStatus: programme.currentStage,
    applicationType: 'Project Participant',
    sector: programme.sector,
    sectoralScope:
      Object.keys(SectoralScope)[
        Object.values(SectoralScope).indexOf(programme.sectoralScope as SectoralScope)
      ],
    location: programme.programmeProperties.geographicalLocation
      ? programme.programmeProperties.geographicalLocation.join(', ')
      : '-',
    startDate: DateTime.fromSeconds(Number(programme.startTime)),
    endDate: DateTime.fromSeconds(Number(programme.endTime)),
    buyerCountry: programme.programmeProperties.buyerCountryEligibility
      ? programme.programmeProperties.buyerCountryEligibility
      : '-',
    environmentalAssessmentRegistrationNo: programme.environmentalAssessmentRegistrationNo,
  };
  if (system === CarbonSystemType.UNIFIED || system === CarbonSystemType.MRV) {
    let prog: any = programme;
    res.emissionsReductionExpected = prog.emissionReductionExpected;
    res.emissionsReductionAchieved = prog.emissionReductionAchieved;
  }
  return res;
};

const safeNumber = (value: any) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num; // Return 0 if conversion results in NaN
};

export const getGeneralFieldsSl = (programme: ProgrammeSl, system?: CarbonSystemType) => {
  let res: Record<string, any> = {
    title: programme.title,
    registrationSerialNo: programme.serialNo,
    projectProposalStage: programme.projectProposalStage,
    projectStatus: programme.projectStatus,
    projectCategory: getProjectCategory[programme.projectCategory],
    startDate: DateTime.fromSeconds(Number(programme.startDate)),
    purposeOfCreditDevelopment: programme.purposeOfCreditDevelopment,
    creditReceived:
      safeNumber(programme.creditBalance) +
      safeNumber(programme.creditFrozen) +
      safeNumber(programme.creditRetired) +
      safeNumber(programme.creditTransferred),
    creditRetired: programme.creditRetired,
    creditBalance: programme.creditBalance,
    province: programme.province,
    district: programme.district,
    dsDivision: programme.dsDivision,
    city: programme.city,
    community: programme.community,
    projectDescription: programme.projectDescription,
    additionalDocuments: programme.additionalDocuments,
  };

  return res;
};

export const addCommSep = (value: any) => {
  return (
    Number(value)
      // .toString()
      .toFixed(2)
      .replace('.00', '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};

export const addCommSepRound = (value: any) => {
  return Number(value)
    .toFixed(2)
    .replace('.00', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addRoundNumber = (value: any) => {
  return Number(value.toFixed(2).replace('.00', ''));
};

export const addSpaces = (text: string) => {
  if (!text) {
    return text;
  }
  if (text === text.toUpperCase()) {
    return text;
  }
  return text.replace(/([A-Z])/g, ' $1').trim();
};

export const getFinancialFields = (programme: ProgrammeU | ProgrammeR | ProgrammeT) => {
  return {
    estimatedProgrammeCostUSD: addCommSep(programme.programmeProperties.estimatedProgrammeCostUSD),
    creditEst: addCommSep(programme.creditEst),
    financingType: addSpaces(programme.programmeProperties.sourceOfFunding),
    grantEquivalent: new UnitField(
      'USD',
      addCommSep(programme.programmeProperties.grantEquivalentAmount)
    ),
    carbonPriceUSDPerTon: addCommSep(programme.programmeProperties.carbonPriceUSDPerTon),
  };
};

export const getFinancialFieldsSl = (programme: ProgrammeSlU) => {
  // return {
  //   estimatedProgrammeCostUSD: addCommSep(programme.programmeProperties.estimatedProgrammeCostUSD),
  //   creditEst: addCommSep(programme.creditEst),
  //   financingType: addSpaces(programme.programmeProperties.sourceOfFunding),
  //   grantEquivalent: new UnitField(
  //     'USD',
  //     addCommSep(programme.programmeProperties.grantEquivalentAmount)
  //   ),
  //   carbonPriceUSDPerTon: addCommSep(programme.programmeProperties.carbonPriceUSDPerTon),
  // };

  return {
    estimatedProgrammeCostLKR: programme.estimatedProjectCost
      ? programme.estimatedProjectCost
      : '-',
    creditEst: programme.creditEst ? programme.creditEst : '-',
  };
};

export const getCompanyBgColor = (item: string) => {
  if (item === 'Government') {
    return GovBGColor;
  } else if (item === 'Certifier') {
    return CertBGColor;
  }
  return DevBGColor;
};

export const getRetirementTypeString = (retirementType: string | null) => {
  if (retirementType === null) {
    return '-';
  }

  switch (retirementType) {
    case '0':
      return 'CROSS BORDER TRANSFER';
    case '1':
      return 'LEGAL ACTION';
    case '2':
      return 'OTHER';
  }
};

export const sumArray = (arrList: any[]) => {
  if (arrList === undefined || arrList === null) {
    return 0;
  }

  return arrList.reduce((a, b) => Number(a) + Number(b), 0);
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getFileName = (fileUrl: string) => {
  console.log('-------file url------', fileUrl);
  if (fileUrl === '' || fileUrl === undefined) return undefined;

  const fileUrlParts = fileUrl?.split('/');
  const fileName = fileUrlParts[fileUrlParts.length - 1];

  return fileName;
};

// export const base64ToFile = (base64String: string, filename: string): File => {
//   // Split the Base64 string into metadata and data
//   const arr = base64String.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
//   const bstr = atob(arr[1]); // Decode the Base64 string
//   const n = bstr.length;
//   const u8arr = new Uint8Array(n);

//   // Convert binary string to Uint8Array
//   for (let i = 0; i < n; i++) {
//     u8arr[i] = bstr.charCodeAt(i);
//   }

//   // Create a Blob and then a File object
//   const blob = new Blob([u8arr], { type: mime });
//   return new File([blob], filename, { type: mime });
// };
