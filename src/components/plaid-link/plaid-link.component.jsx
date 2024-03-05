import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { publicTokenExchange } from 'store/user/user.action';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';

import { createLinkToken } from 'store/user/user.action';
import { updateLinkToken } from 'store/user/user.action';

import { ItemLoginRequired } from 'utils/plaid-errors';
import MDBox from 'components/MDBox';

const PlaidLink = ({
  user: { currentUser, loading },
  refreshError,
  createLinkToken,
  updateLinkToken,
  publicTokenExchange,
  gettingStarted,
  buttonText = 'Sync Account'
}) => {
  useEffect(() => {
    if (!currentUser?.linkToken && !loading && !refreshError) {
      createLinkToken();
    }
  }, [createLinkToken, loading]);

  useEffect(() => {
    if (refreshError) updateLinkToken();
  }, [refreshError, loading]);

  const { open, ready } = usePlaidLink({
    token: currentUser?.linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      if (!refreshError) {
        publicTokenExchange(metadata.public_token);
      } else {
        window.location.reload();
      }
    },
    onExit: (error) => {
      console.log('got an error trying to update link token');
      console.log(error);
    }
  });

  const getStartedText =
    'To get started, click the Sync account button and add one of your bank accounts. For testing, you can add an account using the sandbox credentials. Username: user_good, Password: pass_good';

  const headerText = 'Click the button below to add more accounts';

  return (
    <MDBox className="plaid-link" textAlign="center" m={3}>
      <MDTypography variant="h6" fontWeight="regular" pt={2} pb={2}>
        {refreshError
          ? ItemLoginRequired.message
          : gettingStarted
          ? getStartedText
          : headerText}
      </MDTypography>

      <MDButton
        variant="outlined"
        color="info"
        size="small"
        component="a"
        onClick={() => open()}
      >
        {buttonText}
      </MDButton>
    </MDBox>
  );
};

PlaidLink.propTypes = {
  user: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  updateLinkToken: PropTypes.func.isRequired,
  publicTokenExchange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {
  createLinkToken,
  updateLinkToken,
  publicTokenExchange
})(PlaidLink);
