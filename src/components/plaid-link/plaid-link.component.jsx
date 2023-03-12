import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { publicTokenExchange } from 'store/user/user.action';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';

import { createLinkToken } from 'store/user/user.action';

const PlaidLink = ({
  user: { currentUser, isLinkValid, loading },
  publicTokenExchange,
  header,
  buttonText = 'Re-sync Account'
}) => {
  useEffect(() => {
    if (!currentUser?.linkToken && !loading) {
      createLinkToken();
    }
  }, [createLinkToken, loading]);

  const { open, ready } = usePlaidLink({
    token: currentUser?.linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      console.log('updating token');
      publicTokenExchange(metadata.public_token);
    },
    onExit: (error) => {
      console.log('got an error trying to update link token');
      console.log(error);
    }
  });

  return (
    <div className="plaid-link">
      <MDTypography variant="h6" fontWeight="medium" pt={2} pb={2}>
        {header
          ? header
          : 'To get started, click the Sync account button and add one of your bank accounts.'}
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
    </div>
  );
};

PlaidLink.propTypes = {
  user: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  publicTokenExchange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {
  createLinkToken,
  publicTokenExchange
})(PlaidLink);
