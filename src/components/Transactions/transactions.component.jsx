/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from '@mui/material/Card';
// import Divider from "@mui/material/Divider";
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from './transaction.component';
import MDButton from 'components/MDButton';

const Transactions = ({ transactions }) => {
  const renderItems = transactions
    ?.slice(0, 15)
    .map(({ name, merchantName, categories, date, amount }) => (
      <Transaction
        color="error"
        icon={amount < 0 ? 'expand_more' : 'expand_less'}
        name={merchantName ? merchantName : name.slice(0, 15)}
        date={date}
        amount={amount}
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
          Your Transaction&apos;s
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

export default Transactions;
