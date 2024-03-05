import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';

// components
import Transactions from 'components/Transactions/transactions.component';
import MDBox from 'components/MDBox';

// actions
import { getTransactions } from 'store/transactions/transactions.action';

const TransactionsRoute = ({
  transactions: { transactions },
  getTransactions
}) => {
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <MainLayout>
      <Grid container spacing={2} className="jc-center">
        <Grid item xs={12} lg={12}>
          <MDBox
            sx={{
              position: 'relative',
              mt: -8,
              mx: -2,
              px: 2
            }}
          >
            <Transactions
              header="Transactions"
              transactions={transactions}
              viewAll={false}
              viewMore={true}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
TransactionsRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  getTransactions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions
});

export default connect(mapStateToProps, { getTransactions })(TransactionsRoute);
