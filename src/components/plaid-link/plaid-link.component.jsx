import { usePlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

import { publicTokenExchange } from 'store/user/user.action';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';

const PlaidLink = ({ linkToken, isLinkValid, publicTokenExchange, header }) => {
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
        Re-Sync Account
      </MDButton>
    </div>
  );
};

PlaidLink.propTypes = {
  publicTokenExchange: PropTypes.func.isRequired
};

export default connect(null, { publicTokenExchange })(PlaidLink);
