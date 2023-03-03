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
import { useState } from 'react';
import Card from '@mui/material/Card';
// import Divider from "@mui/material/Divider";
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from '../Transaction/transaction.component';
import MDButton from 'components/MDButton';
import Currency from 'components/Currency/currency.component';
import { Link } from 'react-router-dom';

const Transactions = ({
  transactions,
  viewMore = false,
  viewAll = true,
  viewBalance = false,
  header = `Transactions`,
  balance = 0,
  uppercase = false
}) => {
  const [count, setCount] = useState(15);

  const handleViewMore = () => {
    setCount(count + 15);
  };

  const renderItems = transactions
    ?.slice(0, count)
    .map(({ name, merchantName, categories, date, amount }, i) => (
      <Transaction
        key={i}
        color={amount > 0 ? 'error' : 'success'}
        icon={amount > 0 ? 'expand_more' : 'expand_less'}
        name={merchantName ? merchantName : name.slice(0, 30)}
        date={date}
        amount={amount * -1}
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
          textTransform={uppercase ? 'uppercase' : 'capitalize'}
        >
          {header}
        </MDTypography>
        {viewBalance && (
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
            color="info"
          >
            <MDTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
            >
              Total:
            </MDTypography>{' '}
            <Currency value={balance} />
          </MDTypography>
        )}
        {viewAll && (
          <MDBox display="flex" alignItems="flex-start">
            <Link to={'/transactions'}>
              <MDButton variant="outlined" color="info" size="small">
                view all
              </MDButton>
            </Link>
          </MDBox>
        )}
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        {/* <MDBox mb={2}>
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            newest
          </MDTypography>
        </MDBox> */}
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

        {viewMore && (
          <MDBox display="flex" justifyContent="center">
            <MDButton
              variant="outlined"
              color="info"
              size="small"
              onClick={handleViewMore}
            >
              view more
            </MDButton>
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
};

export default Transactions;
