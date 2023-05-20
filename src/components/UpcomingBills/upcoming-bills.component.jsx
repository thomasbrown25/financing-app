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
import { getFrequencies } from 'store/frequencies/frequencies.action';
import { getCategories } from 'store/categories/categories.action';

const UpcomingBills = ({
  transactions: { expenses },
  user: { currentUser, loading },
  categories: { categories },
  frequencies: { frequencies },
  getCategories,
  getFrequencies,
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
    getFrequencies();
  }, [getFrequencies]);

  const renderItems = expenses
    ?.slice(0, count)
    .map((transaction, i) => (
      <Bill
        key={i}
        color="info"
        icon="expand_less"
        transaction={transaction}
        categories={categories}
        frequencies={frequencies}
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
          {title}
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
  categories: PropTypes.object.isRequired,
  frequencies: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getFrequencies: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  categories: state.categories,
  frequencies: state.frequencies
});

export default connect(mapStateToProps, { getCategories, getFrequencies })(
  UpcomingBills
);
