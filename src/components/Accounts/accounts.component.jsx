/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from 'context';

import Currency from 'components/Currency/currency.component';
import AccountList from 'components/AccountList/account-list.component';
import Incomes from 'components/Incomes/incomes.component';
import MDButton from 'components/MDButton';
import { Icon } from '@mui/material';
import { refreshAccountsBalance } from 'store/accounts/accounts.action';
import { refreshRecurringTransactions } from 'store/transactions/transactions.action';
import { refreshTransactions } from 'store/transactions/transactions.action';
import { refreshAll } from 'store/refresh/refresh.action';

// const handleSync = () => (async) => {
//   await refreshAccountsBalance();
//   await refreshRecurringTransactions();
//   await refreshTransactions();
// };

const Accounts = ({
  title,
  percentage,
  accounts: { cashAccounts, creditAccounts },
  transactions: { incomes, tithes, totalIncome },
  refreshAll
}) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleSync = () => {
    refreshAll();
  };

  return (
    <Card>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12}>
            <MDBox
              mb={0.5}
              lineHeight={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography
                variant="h6"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {title}
              </MDTypography>
              <MDBox
                display="flex"
                alignItems="center"
                onClick={handleSync}
                className="sync"
              >
                <MDTypography variant="h6" color="info">
                  refresh
                </MDTypography>{' '}
                <Icon color="info">sync</Icon>
              </MDBox>
            </MDBox>

            <MDBox lineHeight={1}>
              {/* CASH ACCOUNTS */}
              <AccountList title="Bank of America" accountList={cashAccounts} />
              <MDTypography
                variant="button"
                fontWeight="bold"
                color={percentage.color}
              >
                {percentage.value}&nbsp;
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={darkMode ? 'text' : 'secondary'}
                >
                  {percentage.label}
                </MDTypography>
              </MDTypography>
            </MDBox>

            <MDBox lineHeight={1}>
              {/* CREDIT ACCOUNTS */}
              <AccountList title="Credit" accountList={creditAccounts} />
              <MDTypography
                variant="button"
                fontWeight="bold"
                color={percentage.color}
              >
                {percentage.value}&nbsp;
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={darkMode ? 'text' : 'secondary'}
                >
                  {percentage.label}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <Incomes
              transactions={incomes}
              tithes={tithes}
              totalIncome={totalIncome}
            />
          </Grid>
          {/* <Grid item xs={5}>
            {dropdown && (
              <MDBox width="100%" textAlign="right" lineHeight={1}>
                <MDTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="regular"
                  sx={{ cursor: 'pointer' }}
                  onClick={dropdown.action}
                >
                  {dropdown.value}
                </MDTypography>
                {dropdown.menu}
              </MDBox>
            )}
          </Grid> */}
        </Grid>
      </MDBox>
    </Card>
  );
};

// Setting default values for the props of Accounts
Accounts.defaultProps = {
  percentage: {
    color: 'success',
    value: '',
    label: ''
  },
  dropdown: false
};

// Typechecking props for the Accounts
Accounts.propTypes = {
  transactions: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'white'
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string
  }),
  refreshAll: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  accounts: state.accounts
});

export default connect(mapStateToProps, {
  refreshAll
})(Accounts);
