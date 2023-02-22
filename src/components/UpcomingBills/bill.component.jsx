import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import Currency from 'components/Currency/currency.component';
import moment from 'moment';

function Bill({ color, icon, name, dueDate, amount }) {
  return (
    <MDBox key={name} component="li" py={1} pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: 'bold' }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom>
              {name} {/*  <Icon fontSize="small">edit</Icon> */}
            </MDTypography>

            <MDTypography variant="caption" color="text" fontWeight="regular">
              {moment(dueDate).format('M/DD')}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography
          variant="button"
          color={color}
          fontWeight="medium"
          textGradient
        >
          <Currency value={amount} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props of the Bill
Bill.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark'
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Bill;
