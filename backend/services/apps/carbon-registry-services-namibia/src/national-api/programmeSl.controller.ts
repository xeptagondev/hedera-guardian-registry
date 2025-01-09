import { Body, Controller, Get, Post, Put, Query, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Action } from "src/casl/action.enum";
import { AppAbility } from "src/casl/casl-ability.factory";
import { CheckPolicies } from "src/casl/policy.decorator";
import { PoliciesGuard, PoliciesGuardEx } from "src/casl/policy.guard";
import { ProgrammeSl } from "../entities/programmeSl.entity";
import { ProgrammeSlService } from "../programme-sl/programme-sl.service";
import { ProgrammeSlDto } from "../dto/programmeSl.dto";
import { CMADto } from "src/dto/cma.dto";
import { GetDocDto } from "src/dto/getDoc.dto";
import { QueryDto } from "src/dto/query.dto";
import { CostQuotationDto } from "src/dto/costQuotation.dto";
import { TxType } from "src/enum/txtype.enum";
import { CompanyRole } from "src/enum/company.role.enum";
import { ProjectProposalDto } from "src/dto/projectProposal.dto";
import { ValidationAgreementDto } from "src/dto/validationAgreement.dto";
import { DocumentEntity } from "src/entities/document.entity";
import { CMAApproveDto } from "src/dto/cmaApprove.dto";
import { ValidationReportDto } from "src/dto/validationReport.dto";
import { CNCertificateIssueDto } from "src/dto/cncertificateIssue.dto";

@ApiTags("ProgrammeSl")
@ApiBearerAuth()
@Controller("programmeSl")
export class ProgrammeSlController {
  constructor(private programmeService: ProgrammeSlService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, ProgrammeSl))
  @Post("create")
  async addProgramme(@Body() programme: ProgrammeSlDto, @Request() req) {
    return this.programmeService.create(programme, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("inf/approve")
  async approveINF(@Body("programmeId") programmeId: string, @Request() req) {
    return this.programmeService.approveINF(programmeId, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("inf/reject")
  async rejectINF(@Body("programmeId") programmeId: string, @Body("remark") remark: string, @Request() req) {
    return this.programmeService.rejectINF(programmeId, remark, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("createCostQuotation")
  async createCostQuotation(@Body() costQuotationDto: CostQuotationDto, @Request() req) {
    return this.programmeService.createCostQuotation(costQuotationDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("createProjectProposal")
  async createProjectProposal(@Body() projectProposalDto: ProjectProposalDto, @Request() req) {
    return this.programmeService.createProjectProposal(projectProposalDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("createValidationAgreement")
  async createValidationAgreement(
    @Body() validationAgreementDto: ValidationAgreementDto,
    @Request() req
  ) {
    return this.programmeService.createValidationAgreement(validationAgreementDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("proposal/approve")
  async approveProposal(@Body("programmeId") programmeId: string, @Request() req) {
    return this.programmeService.approveProposal(programmeId, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("proposal/reject")
  async rejectProposal(@Body("programmeId") programmeId: string, @Body("remark") remark: string, @Request() req) {
    return this.programmeService.rejectProposal(programmeId, remark, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("createCMA")
  async createCMA(@Body() cmaDto: CMADto, @Request() req) {
    return this.programmeService.createCMA(cmaDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("cma/approve")
  async approveCMA(@Body() cmaApproveDto: CMAApproveDto, @Request() req) {
    return this.programmeService.approveCMA(cmaApproveDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("cma/reject")
  async rejectCMA(@Body("programmeId") programmeId: string, @Body("remark") remark: string, @Request() req) {
    return this.programmeService.rejectCMA(programmeId, remark, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("validation/create")
  async createValidationReport(@Body() validationReportDto: ValidationReportDto, @Request() req) {
    return this.programmeService.createValidationReport(validationReportDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("validation/approve")
  async approveValidation(@Body("programmeId") programmeId: string, @Request() req) {
    return this.programmeService.approveValidation(programmeId, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ProgrammeSl))
  @Post("validation/reject")
  async rejectValidation(@Body("programmeId") programmeId: string, @Body("remark") remark: string, @Request() req) {
    return this.programmeService.rejectValidation(programmeId, remark, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getDocs")
  async getDocs(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getDocs(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getDocVersions")
  async getDocVersions(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getDocVersions(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getVerificationDocVersions")
  async getVerificationDocVersions(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getVerificationDocVersions(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getDocByVersion")
  async getDocByVersion(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getDocByVersion(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getVerificationDocByVersion")
  async getVerificationDocByVersion(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getVerificationDocByVersion(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getDocLastVersion")
  async getDocLastVersion(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getDocLastVersion(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getVerificationDocLastVersion")
  async getVerificationDocLastVersion(@Body() getDocDto: GetDocDto, @Request() req) {
    return this.programmeService.getVerificationDocLastVersion(getDocDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, DocumentEntity))
  @Post("getDocumentById")
  async getDocumentById(@Body("docId") docId: number, @Request() req) {
    return this.programmeService.getDocumentById(docId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Post("getProjectById")
  async getProjectById(@Body("programmeId") programmeId: string) {
    return this.programmeService.getProjectById(programmeId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, ProgrammeSl))
  @Post("query")
  async getAll(@Body() query: QueryDto, @Request() req) {
    return this.programmeService.query(query, req.abilityCondition, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Post("getCarbonNeutralCertificates")
  async getCncByCompanyId(@Body("companyId") companyId: number) {
    return this.programmeService.getCarbonNeutralCertificateDocs(companyId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Post("requestCarbonNeutralCertificate")
  async createCncRequest(@Body("programmeId") programmeId: string, @Body("companyId") companyId: number, @Request() req) {
    return this.programmeService.requestCarbonNeutralCertificate(programmeId, companyId, req.user);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Post("issueCarbonNeutralCertificate")
  async approveCarbonNeutralCertificate(@Body() cNCertificateIssueDto: CNCertificateIssueDto, @Request() req) {
    return this.programmeService.approveCarbonNeutralCertificate(cNCertificateIssueDto, req.user);
  }
}
