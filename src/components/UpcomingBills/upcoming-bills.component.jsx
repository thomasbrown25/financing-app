import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI Components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import LoadingRing from 'components/LoadingRing/loading-ring.component';
// Billing page components
import Bill from '../Bill/bill.component';
import MDButton from 'components/MDButton';
import { Link } from 'react-router-dom';
import { getCategories } from 'store/categories/categories.action';
import Header from 'components/Header/header.component';

const UpcomingBills = ({
  transactions: { expenses, loading },
  categories: { categories },
  getCategories,
  viewAll = true,
  viewMore = false,
  amount = 6,
  title = '',
  header
}) => {
  const [count, setCount] = useState(amount);

  const handleViewMore = () => {
    setCount(count + 20);
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
    <Card sx={{ height: '100%', mx: 3, px: 2 }}>
      {header && <Header title={header} />}

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
          {loading ? <LoadingRing /> : renderItems}
        </MDBox>
        {viewMore && count <= expenses?.length && (
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
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories })(UpcomingBills);
