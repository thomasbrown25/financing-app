import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';
import Transactions from 'components/Transactions/transactions.component';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import AccountList from 'components/AccountList/account-list.component';
import ItemContainer from 'components/ItemContainer/item-container.component';
import PlaidLink from 'components/plaid-link/plaid-link.component';

const ManageAccountsRoute = ({
  transactions: { selectedTransactions, todaySpend },
  accounts: { cashAccounts, creditAccounts, loanAccounts }
}) => {
  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header title={`Manage Accounts`} />

        <ItemContainer xs={12} sm={12} md={12} lg={6}>
          <PlaidLink header="Add or delete accounts" buttonText="Add Account" />
        </ItemContainer>

        <ItemContainer xs={12} sm={12} md={12} lg={6}>
          <AccountList title="Cash Accounts" accountList={cashAccounts} />
        </ItemContainer>

        <ItemContainer xs={12} sm={12} md={12} lg={6}>
          <AccountList title="Credit Accounts" accountList={creditAccounts} />
        </ItemContainer>

        <ItemContainer xs={12} sm={12} md={12} lg={6}>
          <AccountList title="Loan Accounts" accountList={loanAccounts} />
        </ItemContainer>
      </Grid>
    </MainLayout>
  );
};
ManageAccountsRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  accounts: state.accounts
});

export default connect(mapStateToProps, {})(ManageAccountsRoute);
