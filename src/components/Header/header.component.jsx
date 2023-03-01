import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const Header = ({ user: { currentUser }, title, subTitle }) => {
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
        </MDTypography>
      </MDBox>
    </Grid>
  );
};
Header.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps, {})(Header);
