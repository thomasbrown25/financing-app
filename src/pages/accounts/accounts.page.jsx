import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import MainLayout from 'layouts/main-layout';
import MDBox from 'components/MDBox';
import { Grid } from '@mui/material';
import AccountList from 'components/AccountList/account-list.component';
import PlaidLink from 'components/plaid-link/plaid-link.component';

const ManageAccountsRoute = ({
  accounts: { cashAccounts, creditAccounts, loanAccounts }
}) => {
  return (
    <MainLayout>
      <MDBox mx={3}>
        <Grid container spacing={2} className="jc-center">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AccountList
              header="Accounts"
              title="Cash Accounts"
              accountList={cashAccounts}
              mt={-8}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AccountList title="Credit Accounts" accountList={creditAccounts} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AccountList title="Loan Accounts" accountList={loanAccounts} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <PlaidLink buttonText="Add Accounts" />
          </Grid>
        </Grid>
      </MDBox>
    </MainLayout>
  );
};
ManageAccountsRoute.propTypes = {
  accounts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  accounts: state.accounts
});

export default connect(mapStateToProps, {})(ManageAccountsRoute);
