import Card from '@mui/material/Card';
// import Divider from "@mui/material/Divider";
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// import MDButton from "components/MDButton";

// Billing page components
import Bill from '../Bill/bill.component';
import MDButton from 'components/MDButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UpcomingBills = ({ transactions, viewAll = true, viewMore = false }) => {
  const [count, setCount] = useState(12);

  const handleViewMore = () => {
    setCount(count + 10);
  };

  const renderItems = transactions
    ?.slice(0, count)
    .map(({ merchantName, description, dueDate, lastAmount, category }, i) => (
      <Bill
        key={i}
        color="info"
        icon="expand_less"
        name={merchantName ? merchantName : description.slice(0, 20)}
        dueDate={dueDate}
        amount={lastAmount}
        category={category}
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
          textTransform="uppercase"
        >
          Upcoming Bills
        </MDTypography>
        {viewAll && (
          <MDBox display="flex" alignItems="flex-start">
            <Link to="/upcoming">
              <MDButton variant="outlined" color="info" size="small">
                view all
              </MDButton>
            </Link>
          </MDBox>
        )}
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Date
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

export default UpcomingBills;
