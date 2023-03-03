// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Billing page components
import Income from 'components/Income/income.component';
import Moment from 'react-moment';
import Currency from 'components/Currency/currency.component';

const Incomes = ({ transactions, tithes, totalIncome }) => {
  return (
    <>
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="uppercase"
        >
          Income
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          view all
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {transactions?.slice(0, 5).map((transaction, i) => (
            <Income
              key={i}
              id={i}
              title={
                transaction.merchantName
                  ? transaction.merchantName
                  : transaction.description
              }
              dueDate={transaction.dueDate}
              price={transaction.lastAmount}
              incomeId={transaction.streamId}
            />
          ))}
        </MDBox>

        <MDTypography display="block" variant="button" fontWeight="medium">
          Total Income:
        </MDTypography>
        <MDBox display="flex" alignItems="center" pb={2}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            <Currency value={totalIncome} />
          </MDTypography>
        </MDBox>
        <MDTypography display="block" variant="button" fontWeight="medium">
          Tithes:
        </MDTypography>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" fontWeight="regular" color="text">
            <Currency value={tithes} />
          </MDTypography>
        </MDBox>
      </MDBox>
    </>
  );
};

export default Incomes;
