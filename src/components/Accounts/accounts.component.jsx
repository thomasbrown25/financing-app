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

import AccountList from 'components/AccountList/account-list.component';
import Header from 'components/Header/header.component';

const Accounts = ({
  title,
  percentage,
  header,
  accounts: { cashAccounts, creditAccounts, loanAccounts }
}) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox p={2}>
      <Grid container>
        <Grid item xs={12}>
          {header && <Header title={header} />}
          <MDBox mb={2} />
          {title && (
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
            </MDBox>
          )}

          {cashAccounts && (
            <MDBox lineHeight={1}>
              {/* CASH ACCOUNTS */}
              <AccountList title="Cash Accounts" accountList={cashAccounts} />
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
          )}

          {/* CREDIT ACCOUNTS */}
          {creditAccounts && (
            <MDBox lineHeight={1}>
              <AccountList
                title="Credit Accounts"
                accountList={creditAccounts}
              />
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
          )}

          {/* LOAN ACCOUNTS */}
          {loanAccounts && (
            <MDBox lineHeight={1}>
              <AccountList title="Loan Accounts" accountList={loanAccounts} />
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
          )}
        </Grid>
      </Grid>
    </MDBox>
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
  accounts: PropTypes.object.isRequired,
  title: PropTypes.string,
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
  })
};

const mapStateToProps = (state) => ({
  accounts: state.accounts
});

export default connect(mapStateToProps, {})(Accounts);
