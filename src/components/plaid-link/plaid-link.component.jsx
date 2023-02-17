import { usePlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { publicTokenExchange } from 'store/user/user.action';
import MDButton from 'components/MDButton';

const PlaidLink = ({ linkToken, isLinkValid, publicTokenExchange }) => {
  console.log('link token: ' + linkToken);
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      console.log(metadata);
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
      {isLinkValid ? (
        <>
          <h3>Link your desired bank account to get started. </h3>
          {/* <p>
            For demo purposes, link your account to my Sandbox testing
            environment.
          </p>
          <p>
            To do this, choose any banking institution and use username
            "user_good" and password "pass_good".
          </p> */}
        </>
      ) : (
        <>
          <h3>Link token expired.</h3>
          <p>Sync your account by clicking the button below.</p>
        </>
      )}
      <MDButton
        component="a"
        variant="gradient"
        onClick={() => open()}
        color="dark"
      >
        Sync Account
      </MDButton>
    </div>
  );
};

PlaidLink.propTypes = {
  publicTokenExchange: PropTypes.func.isRequired
};

export default connect(null, { publicTokenExchange })(PlaidLink);
