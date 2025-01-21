import { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Styles/app.scss';
import Login from './Pages/Login/login';
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import SignUp from './Pages/Signup/signup';
import CustomLayout from './Components/Layout/layout';
import AddUser from './Pages/AddUser/addUser';
import UserManagement from './Pages/UserManagement/userManagement';
import RegistryDashboard from './Pages/Dashboard/registry/registrydashboard';
import AddNewCompany from './Pages/Company/addNewCompany';
import CompanyManagement from './Pages/CompanyManagement/companyManagement';
import ProgrammeManagement from './Pages/ProgrammeManagement/programmeManagement';
import ProgrammeView from './Pages/ProgrammeView/programmeView';
import i18next from 'i18next';
import 'mapbox-gl/dist/mapbox-gl.css';
import CreditTransfers from './Pages/Transfers/creditTransfers';
import Homepage from './Pages/Homepage/homepage';
import PrivacyPolicy from './Pages/PrivacyPolicy/privacyPolicy';
import CodeOfConduct from './Pages/CodeofConduct/codeofConduct';
import CookiePolicy from './Pages/CookiePolicy/cookiePolicy';
import TermsOfUse from './Pages/TermsofUse/termsofUse';
import CarbonHelp from './Pages/Help/help';
import UserProfile from './Pages/UserProfile/UserProfile';
import CompanyProfile from './Pages/CompanyProfile/companyProfile';
import { AbilityContext } from './Casl/Can';
import { defineAbility, updateUserAbility } from './Casl/ability';
import { message } from 'antd';
import InvestmentManagement from './Pages/InvestmentManagement/investmentManagement';
import AddInvestmentComponent from './Pages/InvestmentManagement/investmentCreation';
import NdcActionManagement from './Pages/NdcActionManagement/ndcActionManagement';
import AddProgramme from './Pages/ProgrammeManagement/addProgramme';
import AddNDCAction from './Pages/NdcActionManagement/addNDCAction';
import NdcActionView from './Pages/NdcActionManagement/ndcActionView';
import RegisterNewCompany from './Pages/Company/registerNewCompany';
import { useTranslation } from 'react-i18next';
import { ConnectionContextProvider } from './Context/ConnectionContext/connectionContext';
import { UserInformationContextProvider } from './Context/UserInformationContext/userInformationContext';
import { SettingsContextProvider } from './Context/SettingsContext/settingsContext';
import { Loading } from './Components/Loading/loading';
import NationalAccountingDashboard from './Pages/NationalAccounting/nationalAccounting';
import SLCFProgrammeManagement from './Pages/SLCFProgrammeManagement/SLCFProgrammeManagement';
import SLCFAddProgramme from './Pages/SLCFProgrammeManagement/SLCFAddProgramme';
import SLCFMonitoringReport from './Pages/SLCFProgrammeManagement/SLCFMonitoringReport';
import SLCFProjectDetailsView from './Pages/SLCFProgrammeManagement/SLCFProjectDetailsView';
import CMAFormPage from './Pages/CMAFormPage/CMAFormPage';
import ValidationReportPage from './Pages/ValidationReportPage.tsx/ValidationReportPage';
import ProjectProposalPage from './Pages/ProjectProposalPage/ProjectProposalPage';
import ValidationAgreementPage from './Pages/ValidationAgreementPage/ValidationAgreementPage';
import SLCFCostQuotationForm from './Pages/SLCFProgrammeManagement/SLCFCostQuotationForm';
import SLCFRetirement from './Pages/SLCFRetirementManagement/SLCFRetirement';
import VerificationReport from './Pages/SLCFProgrammeManagement/VerificationReport';
import SiteVisitCheckListPage from './Pages/SiteVisitCheckListPage/SiteVisitCheckListPage';
import Settings from './Pages/Settings/settings';
import SLCFDashboard from './Pages/Dashboard/slcf/slcfdashboard';

const App = () => {
  const ability = defineAbility();
  const enableRegistration = process.env.REACT_APP_ENABLE_REGISTRATION || 'true';
  const { i18n, t } = useTranslation(['common']);

  if (
    localStorage.getItem('companyId') &&
    localStorage.getItem('userRole') &&
    localStorage.getItem('userId') &&
    localStorage.getItem('companyState') &&
    localStorage.getItem('companyRole')
  )
    updateUserAbility(ability, {
      id: parseInt(localStorage.getItem('userId') as string),
      role: localStorage.getItem('userRole') as string,
      companyId: parseInt(localStorage.getItem('companyId') as string),
      companyState: parseInt(localStorage.getItem('companyState') as string),
      companyRole: localStorage.getItem('companyRole') as string,
    });
  return (
    <AbilityContext.Provider value={ability}>
      <ConnectionContextProvider
        serverURL={
          process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : 'http://localhost:3001'
        }
        t={t}
        statServerUrl={
          process.env.REACT_APP_STAT_URL ? process.env.REACT_APP_STAT_URL : 'http://localhost:3100'
        }
      >
        <UserInformationContextProvider>
          <SettingsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="forgotPassword" element={<Login forgotPassword={true} />} />
                <Route path="resetPassword/:requestid" element={<Login resetPassword={true} />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="help" element={<CarbonHelp />} />
                <Route path="codeconduct" element={<CodeOfConduct />} />
                <Route path="cookie" element={<CookiePolicy />} />
                <Route path="terms" element={<TermsOfUse />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<CustomLayout selectedKey="dashboard" />}>
                    <Route path="/dashboard" element={<RegistryDashboard />} />
                    <Route path="/dashboard/slcf" element={<SLCFDashboard />} />
                  </Route>
                  <Route
                    path="/nationalAccounting"
                    element={<CustomLayout selectedKey="nationalAccounting" />}
                  >
                    <Route path="/nationalAccounting" element={<NationalAccountingDashboard />} />
                  </Route>

                  <Route
                    path="/programmeManagementSLCF"
                    element={<CustomLayout selectedKey="programmeManagementSLCF/viewAll" />}
                  >
                    <Route path="viewAll" element={<SLCFProgrammeManagement />} />
                    <Route path="viewAllProjects" element={<SLCFProgrammeManagement />} />
                    <Route path="view/:id" element={<SLCFProjectDetailsView />} />
                    <Route path="addProgramme" element={<SLCFAddProgramme />} />
                    <Route path="addNdcAction" element={<AddNDCAction />} />
                    <Route path="monitoringReport/:id" element={<SLCFMonitoringReport />} />
                    <Route
                      path="monitoringReport/:id/:verificationRequestId"
                      element={<SLCFMonitoringReport />}
                    />
                    <Route path="verificationReport/:id" element={<VerificationReport />} />
                    <Route
                      path="verificationReport/:id/:verificationRequestId"
                      element={<VerificationReport />}
                    />
                    <Route path="addCostQuotation/:id" element={<SLCFCostQuotationForm />} />
                    <Route path="projectProposal/:id" element={<ProjectProposalPage />} />
                    <Route path="siteVisitCheckList/:id/" element={<SiteVisitCheckListPage />} />
                    <Route
                      path="validationAgreement/:id"
                      element={<ValidationAgreementPage />}
                    />{' '}
                    <Route path="cmaForm/:id/" element={<CMAFormPage />} />
                    <Route path="validationReport/:id" element={<ValidationReportPage />} />
                  </Route>

                  <Route
                    path="/retirementManagement"
                    element={<CustomLayout selectedKey="retirementManagement/viewAll" />}
                  >
                    <Route path="viewAll" element={<SLCFRetirement />} />
                    {/* <Route path="view" element={<ProgrammeView />} /> */}
                  </Route>
                  <Route
                    path="/programmeManagement"
                    element={<CustomLayout selectedKey="programmeManagement/viewAll" />}
                  >
                    <Route path="viewAll" element={<ProgrammeManagement />} />
                    <Route path="view/:id" element={<ProgrammeView />} />
                    <Route path="addProgramme" element={<AddProgramme />} />
                    <Route path="addNdcAction" element={<AddNDCAction />} />
                  </Route>
                  <Route
                    path="/investmentManagement"
                    element={<CustomLayout selectedKey="investmentManagement/viewAll" />}
                  >
                    <Route path="viewAll" element={<InvestmentManagement />} />
                    <Route path="addInvestment" element={<AddInvestmentComponent />} />
                  </Route>
                  <Route
                    path="/ndcManagement"
                    element={<CustomLayout selectedKey="ndcManagement/viewAll" />}
                  >
                    <Route path="viewAll" element={<NdcActionManagement />} />
                    <Route path="view" element={<NdcActionView />} />
                  </Route>
                  <Route
                    path="/companyManagement"
                    element={<CustomLayout selectedKey="companyManagement/viewAll" />}
                  >
                    <Route path="viewAll" element={<CompanyManagement />} />
                    <Route path="addCompany" element={<AddNewCompany />} />
                    <Route path="updateCompany" element={<AddNewCompany />} />
                  </Route>
                  <Route
                    path="/userManagement"
                    element={<CustomLayout selectedKey="userManagement/viewAll" />}
                  >
                    <Route path="viewAll" element={<UserManagement />} />
                    <Route path="addUser" element={<AddUser />} />
                    <Route path="updateUser" element={<AddUser />} />
                  </Route>
                  <Route
                    path="/creditTransfers"
                    element={<CustomLayout selectedKey="creditTransfers/viewAll" />}
                  >
                    <Route path="viewAll" element={<CreditTransfers />} />
                    {/* <Route path="view" element={<ProgrammeView />} /> */}
                  </Route>
                  <Route
                    path="/userProfile"
                    element={<CustomLayout selectedKey="userManagement/viewAll" />}
                  >
                    <Route path="view" element={<UserProfile />} />
                  </Route>
                  <Route
                    path="/companyProfile"
                    element={<CustomLayout selectedKey="companyManagement/viewAll" />}
                  >
                    <Route path="view" element={<CompanyProfile />} />
                  </Route>
                  <Route path="/settings" element={<CustomLayout selectedKey="settings" />}>
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Route>
                {enableRegistration === 'true' && (
                  <Route
                    path="registerCompany"
                    element={
                      <Suspense fallback={<Loading />}>
                        <RegisterNewCompany />
                      </Suspense>
                    }
                  />
                )}
                <Route path="/*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </SettingsContextProvider>
        </UserInformationContextProvider>
      </ConnectionContextProvider>
    </AbilityContext.Provider>
  );
};

export default App;
