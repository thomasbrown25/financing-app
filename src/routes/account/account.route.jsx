import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';
import Transactions from 'components/Transactions/transactions.component';

const AccountRoute = ({
  transactions: { selectedTransactions },
  accounts: { account }
}) => {
  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header
          title={`${account?.name}`}
          subTitle={`${account?.officialName}`}
        />

        <Grid item xs={12} sm={12} md={12} lg={3} />

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Transactions
            transactions={selectedTransactions}
            viewAll={false}
            viewMore={true}
            viewBalance={true}
            header={`${account?.name} \u2022
            \u2022 \u2022 ${account?.mask}`}
            balance={
              account?.type.toLowerCase().includes('savings')
                ? 22450
                : account?.type.toLowerCase().includes('credit')
                ? account?.balanceCurrent
                : account?.balanceAvailable
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3} />
      </Grid>
    </MainLayout>
  );
};
AccountRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  accounts: state.accounts
});

export default connect(mapStateToProps, {})(AccountRoute);