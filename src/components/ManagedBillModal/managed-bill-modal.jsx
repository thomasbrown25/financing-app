import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { useMaterialUIController } from 'context';
import theme from 'assets/theme';
import MDInput from 'components/MDInput';
import MDBox from 'components/MDBox';
import moment from 'moment';
import Currency from 'components/Currency/currency.component';
import MDButton from 'components/MDButton';

// actions
import { updateBill } from 'store/managed-bills/managed-bills.action';

// models
import { defaultModalStyle, defaultManagedBill } from 'models/models';

const ManagedBillModal = ({ open, handleClose, managedBill, updateBill }) => {
  const { palette } = theme;
  const { background } = palette;
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [updatedManagedBill, setUpdatedManagedBill] = useState({
    ...managedBill
  });
  const { name, totalAmount, dueDate, monthlyMin } = updatedManagedBill;

  const handleChange = (e) => {
    setUpdatedManagedBill({
      ...updatedManagedBill,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete bill ${managedBill?.merchantName}`
      )
    ) {
      handleClose();
      setUpdatedManagedBill({ ...defaultManagedBill, ...updatedManagedBill });
    }
  };

  const handleOnClose = () => {
    handleClose();
    setUpdatedManagedBill({ ...defaultManagedBill, ...updatedManagedBill });
  };

  const handleUpdate = () => {
    updateBill({
      ...managedBill,
      ...updatedManagedBill
    });
    handleClose();
    setUpdatedManagedBill({ ...defaultManagedBill, ...updatedManagedBill });
  };

  const [modalStyle, setModalStyle] = useState(defaultModalStyle);

  useEffect(() => {
    if (darkMode) {
      modalStyle.bgcolor = background.dark;
    } else {
      modalStyle.bgcolor = background.white;
    }
  }, [darkMode]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleOnClose}
        closeAfterTransition
        className="bill-modal"
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <MDBox
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
              flexDirection="column"
            >
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  fullWidth
                />
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Total Amount"
                  name="totalAmount"
                  value={totalAmount}
                  onChange={handleChange}
                  fullWidth
                />
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Monthly Min"
                  name="monthlyMin"
                  value={monthlyMin}
                  onChange={handleChange}
                  fullWidth
                />
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Due Date"
                  name="dueDate"
                  onChange={handleChange}
                  value={moment(dueDate).format('YYYY-MM-DD')}
                  style={{ height: '44px', minWidth: '182.88px' }}
                  fullWidth
                />
              </MDBox>
            </MDBox>
            <MDBox mb={2} ml={0} display="flex" justifyContent="center">
              <MDButton
                variant="outlined"
                color="error"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </MDButton>
              <MDButton
                variant="outlined"
                color="info"
                size="small"
                onClick={handleUpdate}
                className="ml-1"
              >
                Save
              </MDButton>
            </MDBox>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

ManagedBillModal.propTypes = {
  updateBill: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  updateBill
})(ManagedBillModal);
