import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Action } from "./action.enum";
import { Role } from "./role.enum";
import { EntitySubject } from "../entities/entity.subject";
import { Programme } from "../entities/programme.entity";
import { ProgrammeStage } from "../enum/programme-status.enum";
import { CompanyRole } from "../enum/company.role.enum";
import { Company } from "../entities/company.entity";
import { Stat } from "../dto/stat.dto";
import { ProgrammeTransfer } from "../entities/programme.transfer";
import { ProgrammeCertify } from "../dto/programme.certify";
import { TransferStatus } from "../enum/transform.status.enum";
import { ProgrammeTransferRequest } from "../dto/programme.transfer.request";
import { ConfigurationSettings } from "../entities/configuration.settings";
import { DocumentAction } from "../dto/document.action";
import { Investment } from "../entities/investment.entity";
import { InvestmentStatus } from "../enum/investment.status";
import { ProgrammeDocumentViewEntity } from "../entities/document.view.entity";
import { NDCActionViewEntity } from "../entities/ndc.view.entity";
import { ProgrammeDocument } from "../entities/programme.document";
import { Emission } from "../entities/emission.entity";
import { Projection } from "../entities/projection.entity";
import { CreditAuditLog } from "../entities/credit.audit.log.entity";
import { CreditAuditLogViewEntity } from "../entities/creditAuditLog.view.entity";
import { ProgrammeSl } from "../entities/programmeSl.entity";
import { CreditRetirementSl } from "src/entities/creditRetirementSl.entity";
import { DocumentEntity } from "../entities/document.entity";
import { VerificationRequestEntity } from "../entities/verification.request.entity";

type Subjects = InferSubjects<typeof EntitySubject> | "all";

export type AppAbility = MongoAbility<[Action, Subjects]>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

const unAuthErrorMessage = "This action is unauthorised";

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createAppAbility);
    if (user) {
      if (user.role == Role.Root) {
        can(Action.Manage, "all");
        cannot([Action.Update], Company, {
          companyId: { $ne: user.companyId },
        });
        cannot([Action.Update], User, {
          companyId: { $ne: user.companyId },
        });
      } else if (
        user.role == Role.Admin &&
        (user.companyRole == CompanyRole.GOVERNMENT || user.companyRole == CompanyRole.MINISTRY)
      ) {
        can(Action.Manage, User, { role: { $ne: Role.Root } });
        can([Action.Manage], ConfigurationSettings);
        can([Action.Manage], Company);
        cannot([Action.Update, Action.Delete], User, {
          companyId: { $ne: user.companyId },
        });
        cannot(Action.Update, Company, { companyId: { $ne: user.companyId } });

        if (user.companyRole === CompanyRole.MINISTRY) {
          cannot([Action.Update, Action.Delete], User, {
            companyId: { $ne: user.companyId },
          });
          cannot(Action.Delete, Company, { companyRole: { $eq: user.companyRole } });
          cannot(Action.Delete, Company, { companyId: { $eq: user.companyId } });
        }
      } else if (user.role == Role.Admin && user.companyRole != CompanyRole.GOVERNMENT) {
        can(Action.Manage, User, { role: { $ne: Role.Root } });
        can(Action.Read, Company);
        can(Action.Update, Company, { companyId: { $eq: user.companyId } });
        cannot([Action.Update, Action.Delete, Action.Read], User, {
          companyId: { $ne: user.companyId },
        });
        cannot([Action.Create], Company);
      } else {
        if (user.companyRole == CompanyRole.GOVERNMENT) {
          can(Action.Read, User);
          if (user.role === Role.Manager) {
            can([Action.Delete], Company);
          }
        } else {
          if (user.companyRole == CompanyRole.MINISTRY) {
            can(Action.Read, User);
            if (user.role === Role.Manager) {
              can([Action.Delete], Company);
              cannot(Action.Delete, Company, { companyRole: { $eq: user.companyRole } });
              cannot(Action.Delete, Company, { companyId: { $eq: user.companyId } });
            }
          } else {
            can(Action.Read, User, { companyId: { $eq: user.companyId } });
          }
        }

        cannot([Action.Create], Company);
        cannot(Action.Create, User);
      }

      can(Action.Read, Company);
      can(Action.Update, User, { id: { $eq: user.id } });
      can(Action.Delete, User, { id: { $eq: user.id } });
      cannot(Action.Update, User, ["role", "apiKey", "password", "companyRole", "email"], {
        id: { $eq: user.id },
      });

      if (user.companyRole == CompanyRole.GOVERNMENT) {
        if (user.role != Role.ViewOnly) {
          can(Action.Manage, ProgrammeTransfer);
          can(Action.Manage, Programme);
          can(Action.Manage, ProgrammeTransferRequest);
          can(Action.Manage, DocumentAction);
          can(Action.Manage, Investment);
        } else {
          can(Action.Read, Investment);
          can(Action.Read, ProgrammeTransfer);
          can(Action.Read, Programme);
        }
      }

      if (user.companyRole == CompanyRole.MINISTRY) {
        if (user.role != Role.ViewOnly) {
          can(Action.Manage, Programme);
          can(Action.Manage, DocumentAction);
          can(Action.Manage, Investment);
          can(Action.Manage, ProgrammeTransferRequest);
          can(Action.Manage, ProgrammeTransfer);
        } else {
          can(Action.Read, Investment);
          can(Action.Read, Programme);
          can(Action.Read, ProgrammeTransfer);
        }
      }

      if (user.role != Role.ViewOnly && user.companyRole != CompanyRole.PROGRAMME_DEVELOPER) {
        can(Action.Manage, ProgrammeCertify);
      }

      if (user.role == Role.Admin && user.companyRole == CompanyRole.API) {
        can([Action.Create, Action.Read, Action.Update], Programme);
        can([Action.Create, Action.Read], User);
        can([Action.Create, Action.Read, Action.Update], Company);
      } else if (user.companyRole == CompanyRole.CERTIFIER) {
        can(Action.Read, Programme, {
          currentStage: { $in: [ProgrammeStage.AUTHORISED] },
        });
        can(Action.Read, Programme, {
          certifierId: { $elemMatch: { $eq: user.companyId } },
        });
        can(Action.Read, ProgrammeTransfer, {
          status: { $in: [TransferStatus.APPROVED, TransferStatus.RECOGNISED] },
        });
        can(Action.Read, Investment, {
          status: { $eq: InvestmentStatus.APPROVED },
        });
        can(Action.Read, Programme, {
          certifierId: { $elemMatch: { $eq: user.companyId } },
        });
        can(Action.Read, Programme);
        can(Action.Manage, DocumentAction);
      } else if (user.companyRole == CompanyRole.PROGRAMME_DEVELOPER) {
        // can(Action.Read, Programme, {
        //   currentStage: { $eq: ProgrammeStage.AUTHORISED },
        // });
        can(Action.Read, ProgrammeTransfer, {
          status: { $in: [TransferStatus.APPROVED, TransferStatus.RECOGNISED] },
        });
        can([Action.Create, Action.Read], DocumentAction);
        can(Action.Read, ProgrammeDocumentViewEntity, {
          companyId: { $elemMatch: { $eq: user.companyId } },
        });

        can(Action.Read, NDCActionViewEntity, {
          companyId: { $elemMatch: { $eq: user.companyId } },
        });

        can(Action.Read, Programme, {
          currentStage: { $in: [ProgrammeStage.AUTHORISED, ProgrammeStage.APPROVED] },
        });
        can(Action.Read, Investment, {
          status: { $eq: InvestmentStatus.APPROVED },
        });
        if (user.role != Role.ViewOnly) {
          can(Action.Manage, Programme, {
            companyId: { $elemMatch: { $eq: user.companyId } },
          });
          can(Action.Manage, ProgrammeTransfer, {
            toCompanyId: { $eq: user.companyId },
          });
          can(Action.Manage, ProgrammeTransfer, {
            fromCompanyId: { $eq: user.companyId },
          });
          can(Action.Manage, ProgrammeTransfer, {
            initiatorCompanyId: { $eq: user.companyId },
          });
          can(Action.Manage, ProgrammeTransferRequest);
          can(Action.Manage, Investment, {
            toCompanyId: { $eq: user.companyId },
          });
          can(Action.Manage, Investment, {
            fromCompanyId: { $eq: user.companyId },
          });
          can(Action.Manage, Investment, {
            initiatorCompanyId: { $eq: user.companyId },
          });
          can(Action.Manage, Investment);
        } else {
          can(Action.Read, Programme, {
            companyId: { $elemMatch: { $eq: user.companyId } },
          });
          can(Action.Read, ProgrammeTransfer, {
            toCompanyId: { $eq: user.companyId },
          });
          can(Action.Read, ProgrammeTransfer, {
            fromCompanyId: { $eq: user.companyId },
          });
          can(Action.Read, ProgrammeTransfer, {
            initiatorCompanyId: { $eq: user.companyId },
          });
          can(Action.Read, Investment, {
            toCompanyId: { $eq: user.companyId },
          });
          can(Action.Read, Investment, {
            fromCompanyId: { $eq: user.companyId },
          });
          can(Action.Read, Investment, {
            initiatorCompanyId: { $eq: user.companyId },
          });
        }
      }

      if (user.companyRole == CompanyRole.CERTIFIER) {
        can(Action.Read, Stat);
      } else {
        can(Action.Read, Stat);
      }

      cannot([Action.Delete], Company, {
        companyRole: { $eq: CompanyRole.GOVERNMENT },
      });

      cannot([Action.Delete], Company, {
        companyRole: { $eq: CompanyRole.MINISTRY },
      });

      cannot([Action.Delete], Company, {
        companyRole: { $eq: CompanyRole.CLIMATE_FUND },
      });

      cannot([Action.Delete], Company, {
        companyRole: { $eq: CompanyRole.EXECUTIVE_COMMITTEE },
      });

      if (user.companyState === 0) {
        cannot(Action.Create, "all");
        cannot(Action.Delete, Programme);
        cannot(Action.Delete, Company);
        cannot(Action.Update, User, { id: { $ne: user.id } });
        cannot(Action.Update, Programme);
        cannot(Action.Update, Company);
      }
    }
    if (
      user.companyRole == CompanyRole.GOVERNMENT ||
      user.companyRole == CompanyRole.CERTIFIER ||
      user.companyRole == CompanyRole.MINISTRY
    ) {
      can([Action.Read], ProgrammeDocument);
    }

    if (user.companyRole === CompanyRole.MINISTRY || user.companyRole === CompanyRole.GOVERNMENT) {
      if (user.role !== Role.ViewOnly) {
        can(Action.Create, Emission);
        can(Action.Create, Projection);
      }
      can(Action.Read, Emission);
      can(Action.Read, Projection);
    } else {
      can(Action.Read, Emission);
      can(Action.Read, Projection);
    }

    if (
      (user.role == Role.Root || user.role == Role.Admin) &&
      user.companyRole === CompanyRole.GOVERNMENT
    ) {
      can(Action.Read, CreditAuditLog);
      can(Action.Read, CreditAuditLogViewEntity);
    } else {
      cannot(Action.Read, CreditAuditLog);
      cannot(Action.Read, CreditAuditLogViewEntity);
    }

    if (user.companyRole === CompanyRole.GOVERNMENT) {
      can(Action.Read, ProgrammeSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);
    }

    if (user.companyRole === CompanyRole.MINISTRY) {
      can(Action.Read, ProgrammeSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);
    }

    if (user.companyRole === CompanyRole.CERTIFIER) {
      can(Action.Read, ProgrammeSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);
    }

    if (user.companyRole === CompanyRole.PROGRAMME_DEVELOPER) {
      can(Action.Read, ProgrammeSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, CreditRetirementSl, {
        toCompanyId: { $eq: user.companyId },
      });
      can(Action.Read, CreditRetirementSl, {
        fromCompanyId: { $eq: user.companyId },
      });
      can(Action.Read, VerificationRequestEntity);

      if (user.role == Role.Admin || user.role == Role.Manager) {
        can(Action.Create, ProgrammeSl);
        can(Action.Update, ProgrammeSl);
        can(Action.Create, DocumentEntity);
        can(Action.Update, DocumentEntity);
        can(Action.Create, CreditRetirementSl);
        can(Action.Update, CreditRetirementSl);
        can(Action.Create, VerificationRequestEntity);
      }
    }

    if (user.companyRole === CompanyRole.EXECUTIVE_COMMITTEE) {
      can(Action.Read, ProgrammeSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);

      if (user.role == Role.Admin) {
        can(Action.Update, ProgrammeSl);
        can(Action.Update, VerificationRequestEntity);
      }

      if (user.role == Role.Manager) {
        can(Action.Update, ProgrammeSl);
        can(Action.Update, VerificationRequestEntity);
      }
    }

    if (user.companyRole === CompanyRole.CLIMATE_FUND) {
      can(Action.Read, User);
      can(Action.Read, ProgrammeSl);
      can(Action.Read, CreditRetirementSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);

      if (user.role == Role.Admin) {
        can(Action.Create, Company);
        can(Action.Approve, Company);
        can(Action.Reject, Company);
        can(Action.Update, CreditRetirementSl);
        can(Action.Update, ProgrammeSl);
        can(Action.Create, DocumentEntity);
        can(Action.Update, DocumentEntity);
        can(Action.Update, VerificationRequestEntity);
      }

      if (user.role == Role.Manager) {
        can(Action.Create, Company);
        can(Action.Update, CreditRetirementSl);
        can(Action.Update, ProgrammeSl);
        can(Action.Create, DocumentEntity);
        can(Action.Update, DocumentEntity);
        can(Action.Update, VerificationRequestEntity);
      }
    }

    if (user.companyRole === CompanyRole.GOVERNMENT) {
      can(Action.Read, User);
      can(Action.Read, ProgrammeSl);
      can(Action.Read, CreditRetirementSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);
    }

    if (user.companyRole === CompanyRole.CERTIFIER) {
      can(Action.Read, User);
      can(Action.Read, ProgrammeSl);
      can(Action.Read, CreditRetirementSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);
    }

    if (user.companyRole === CompanyRole.MINISTRY) {
      can(Action.Read, User);
      can(Action.Read, ProgrammeSl);
      can(Action.Read, CreditRetirementSl);
      can(Action.Read, DocumentEntity);
      can(Action.Read, VerificationRequestEntity);
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
