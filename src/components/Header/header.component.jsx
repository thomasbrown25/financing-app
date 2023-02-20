import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

const Header = ({ user: { currentUser } }) => {
  return (
    <Grid item xs={12} xl={12}>
      Hi, {currentUser?.firstname}
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
