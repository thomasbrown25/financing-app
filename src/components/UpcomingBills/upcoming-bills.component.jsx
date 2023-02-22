import Card from '@mui/material/Card';
// import Divider from "@mui/material/Divider";
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// import MDButton from "components/MDButton";

// Billing page components
import Bill from './bill.component';
import MDButton from 'components/MDButton';

const UpcomingBills = ({ transactions }) => {
  const renderItems = transactions
    ?.slice(0, 9)
    .map(({ merchantName, description, dueDate, lastAmount }) => (
      <Bill
        color="info"
        icon="expand_less"
        name={merchantName ? merchantName : description.slice(0, 20)}
        dueDate={dueDate}
        amount={lastAmount}
      />
    ));

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          Upcoming Bills
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDButton variant="outlined" color="info" size="small">
            view all
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: 'none' }}
        >
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default UpcomingBills;
