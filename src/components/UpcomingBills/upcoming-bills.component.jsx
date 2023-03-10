import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import { getCategories } from 'store/categories/categories.action';

const UpcomingBills = ({
  transactions: { expenses },
  user: { currentUser, loading },
  categories: { categories },
  viewAll = true,
  viewMore = false
}) => {
  const [count, setCount] = useState(12);

  const handleViewMore = () => {
    setCount(count + 10);
  };

  const renderItems = expenses
    ?.slice(0, count)
    .map((transaction, i) => (
      <Bill
        key={i}
        color="info"
        icon="expand_less"
        transaction={transaction}
        categories={categories}
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
        {/* <MDTypography variant="h7" fontWeight="light">
          (click to edit)
        </MDTypography> */}
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

UpcomingBills.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  categories: state.categories
});

export default connect(mapStateToProps, {})(UpcomingBills);
