import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { ItemLoginRequired } from 'utils/plaid-errors';
import PlaidLink from 'components/plaid-link/plaid-link.component';

const Header = ({
  user: { currentUser },
  refresh: { refreshError },
  title,
  subTitle
}) => {
  return (
    <Grid item xs={12} xl={12}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}
      >
        <MDTypography
          variant="h4"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title
            ? title
            : currentUser?.firstname
            ? `Hi, ${currentUser?.firstname}`
            : 'Welcome to the financing App'}
          {subTitle && (
            <MDTypography variant="h6" fontWeight="medium">
              {subTitle}
            </MDTypography>
          )}
          {refreshError && (
            <>
              <PlaidLink
                header={ItemLoginRequired.message}
                linkToken={currentUser?.linkToken}
              />
            </>
          )}
        </MDTypography>
      </MDBox>
    </Grid>
  );
};
Header.propTypes = {
  user: PropTypes.object.isRequired,
  refresh: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  user: state.user,
  refresh: state.refresh
});
export default connect(mapStateToProps, {})(Header);
