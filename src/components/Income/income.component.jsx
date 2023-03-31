// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import Moment from 'react-moment';
import moment from 'moment';

import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useMaterialUIController } from 'context';
import theme from 'assets/theme';
import BasicTooltip from 'components/Tooltip/tooltip.component';
import { setIncomeActive } from 'store/transactions/transactions.action';
import IncomeModal from 'components/IncomeModal/income-modal.component';

const defaultModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 12,
  p: 4
};

const Income = ({ income, noGutter, setIncomeActive }) => {
  const { palette } = theme;
  const { primary, background } = palette;
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [modalStyle, setModalStyle] = useState(defaultModalStyle);

  useEffect(() => {
    if (darkMode) {
      modalStyle.bgcolor = background.dark;
    } else {
      modalStyle.bgcolor = background.white;
    }
  }, [darkMode]);

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

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
        onClick={handleModalOpen}
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
          >
            {income?.frequency}
          </MDTypography>
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

      {/* MODAL */}
      <IncomeModal
        open={openModal}
        handleClose={handleModalClose}
        income={income}
      />
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

export default connect(null, { setIncomeActive })(Income);
