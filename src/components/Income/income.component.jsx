// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import Moment from 'react-moment';

import Modal from '@mui/material/Modal';
import { useMaterialUIController } from 'context';
import theme from 'assets/theme';
import { defaultModalStyle } from 'models/models';

const Income = ({ income, noGutter, setIncomeActive }) => {
  const { palette } = theme;
  const { background } = palette;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  let modalStyle = defaultModalStyle;

  useEffect(() => {
    if (darkMode) {
      modalStyle.bgcolor = background.dark;
    } else {
      modalStyle.bgcolor = background.white;
    }
  }, [darkMode]);

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        pr={1}
        mb={noGutter ? 0 : 1}
        className="cursor"
      >
        <MDBox lineHeight={1.125}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {income?.merchantName}
          </MDTypography>
          <MDTypography
            display="block"
            variant="caption"
            fontWeight="regular"
            color="text"
            mt={0.5}
          ></MDTypography>
          <MDTypography
            display="block"
            variant="caption"
            fontWeight="regular"
            color="text"
            mt={0.5}
          >
            Next Payment: <Moment date={income?.dueDate} format={'M/D'} />
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" fontWeight="bold" color="info">
            <Currency value={income?.lastAmount} />
          </MDTypography>
        </MDBox>
      </MDBox>
    </>
  );
};

// Setting default values for the props of Income
Income.defaultProps = {
  noGutter: false
};

// Typechecking props for the Income
Income.propTypes = {
  noGutter: PropTypes.bool,
  setIncomeActive: PropTypes.func.isRequired
};

export default connect(null)(Income);
