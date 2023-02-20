// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import Moment from 'react-moment';
import moment from 'moment';

import Modal from '@mui/material/Modal';

function Invoice({ date, title, price, noGutter }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          Next Payment: <Moment date={date} format={'M/D'} />
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" fontWeight="regular" color="text">
          <Currency value={price} />
        </MDTypography>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: 'pointer' }}
        >
          <Icon fontSize="small">picture_as_pdf</Icon>
          <MDTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  noGutter: PropTypes.bool
};

export default Invoice;
