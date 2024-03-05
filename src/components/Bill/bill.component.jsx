import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import Currency from 'components/Currency/currency.component';
import moment from 'moment';

const Bill = ({ color, icon, transaction }) => {
  const name = transaction?.merchantName
    ? transaction?.merchantName
    : transaction?.description
    ? transaction?.description?.slice(0, 35)
    : transaction?.name;

  return (
    <MDBox key={transaction?.id} component="li" py={1} pr={2} mb={1}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ cursor: 'pointer' }}
      >
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: 'bold' }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom>
              {name}{' '}
            </MDTypography>

            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
              mb={1}
            >
              {transaction?.category}
            </MDTypography>

            <MDTypography variant="caption" color="text" fontWeight="regular">
              {moment(transaction?.dueDate).format('M/DD')}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography
          variant="button"
          color={color}
          fontWeight="medium"
          textGradient
          className="ml-auto"
        >
          <Currency value={transaction?.amount} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
};

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
  icon: PropTypes.node.isRequired
};

export default connect(null, {})(Bill);
