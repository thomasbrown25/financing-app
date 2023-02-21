// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Billing page components
import Income from './income.component';
import Moment from 'react-moment';

const Incomes = ({ transactions }) => {
  return (
    <>
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
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
              title={transaction.description}
              dueDate={transaction.dueDate}
              price={transaction.lastAmount}
            />
          ))}
        </MDBox>
      </MDBox>
    </>
  );
};

export default Incomes;
