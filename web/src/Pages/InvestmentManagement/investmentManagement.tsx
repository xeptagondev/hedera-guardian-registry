import { InvestmentManagementComponent } from '@undp/carbon-library';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { useTranslation } from 'react-i18next';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useSettingsContext } from '../../Context/SettingsContext/settingsContext';

const InvestmentManagement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'programme']);

  const onNavigateToProgrammeView = (programmeId: any) => {
    navigate('/programmeManagement/view', { state: { id: programmeId } });
  };

  return (
    <InvestmentManagementComponent
      t={t}
      useConnection={useConnection}
      onNavigateToProgrammeView={onNavigateToProgrammeView}
      useUserContext={useUserContext}
      useSettingsContext={useSettingsContext}
    ></InvestmentManagementComponent>
  );
};

export default InvestmentManagement;
