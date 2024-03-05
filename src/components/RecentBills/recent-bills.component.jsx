import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
// import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// import MDButton from "components/MDButton";

// Billing page components
import Bill from '../Bill/bill.component';
import MDButton from 'components/MDButton';
import { Link } from 'react-router-dom';
import { getCategories } from 'store/categories/categories.action';
import { getRecentBills } from 'store/transactions/transactions.action';

const RecentBills = ({
  transactions: { recentBills },
  user: { currentUser, loading },
  categories: { categories },
  getCategories,
  getRecentBills,
  viewAll = true,
  viewMore = false,
  amount = 10,
  title = 'Upcoming Bills'
}) => {
  const [count, setCount] = useState(amount);

  const handleViewMore = () => {
    setCount(count + 10);
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    // getRecentBills();
  }, [getRecentBills]);

  const renderItems = recentBills
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
    <Card sx={{ height: '100%', mx: 3, px: 2 }}>
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
          {title}
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

RecentBills.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getRecentBills: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  categories: state.categories
});

export default connect(mapStateToProps, {
  getCategories,
  getRecentBills
})(RecentBills);
