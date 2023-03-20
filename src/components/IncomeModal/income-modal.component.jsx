import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useMaterialUIController } from 'context';
import colors from 'assets/theme-dark/base/colors';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDBox from 'components/MDBox';
import { Icon } from '@mui/material';
import moment from 'moment';
import DropdownSelect from 'components/DropdownSelect/dropdown-select.component';
import Currency from 'components/Currency/currency.component';
import { updateIncome } from 'store/transactions/transactions.action';
import { setIncomeActive } from 'store/transactions/transactions.action';
import MDButton from 'components/MDButton';

import { getFrequencies } from 'store/frequencies/frequencies.action';

// models
import { defaultIncome } from 'models/models';

const style = {
  position: 'absolute',
  top: '50%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: colors.background.dark,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const IncomeModal = ({
  open,
  handleClose,
  income,
  frequencies: { frequencies },
  getFrequencies,
  updateIncome,
  setIncomeActive
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [isEditing, setIsEditing] = useState(false);
  const [newIncome, setNewIncome] = useState({
    ...defaultIncome,
    ...income
  });
  const { merchantName, description, category, frequency, dueDate, amount } =
    newIncome;

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleDisable = () => {
    if (
      window.confirm(
        `Are you sure you want to delete income ${income?.merchantName}`
      )
    ) {
      setIsEditing(false);
      handleClose();
      setIncomeActive(income?.streamId, false);
      setNewIncome({ ...defaultIncome, ...newIncome });
    }
  };

  const handleOnClose = () => {
    setIsEditing(false);
    handleClose();
    setNewIncome({ ...defaultIncome, ...newIncome });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    updateIncome({
      ...income,
      ...newIncome
    });
    handleClose();
    setNewIncome({ ...defaultIncome, ...newIncome });
  };

  useEffect(() => {
    getFrequencies();
  }, [getFrequencies]);

  useEffect(() => {
    if (darkMode) {
      console.log(colors.background.dark);
      style.bgcolor = colors.background.dark;
    } else {
      style.bgcolor = colors.background.white;
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
          <Box sx={style}>
            {!isEditing ? (
              <>
                <MDBox display="flex" justifyContent="flex-end">
                  <MDTypography>
                    <Icon onClick={handleOnClose} className="cursor">
                      close
                    </Icon>
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="center" mb={2}>
                  <MDBox flexDirection="column">
                    <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                      {income?.merchantName}{' '}
                    </MDTypography>
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      mr={2}
                      gutterBottom
                    >
                      {income?.frequency}{' '}
                    </MDTypography>

                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      mr={2}
                      gutterBottom
                    >
                      <Currency value={income?.lastAmount} />
                    </MDTypography>
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      mr={2}
                      gutterBottom
                    >
                      Next Payment on {moment(income?.dueDate).format('MMM Do')}{' '}
                    </MDTypography>
                  </MDBox>
                </MDBox>

                <MDBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MDButton
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={handleEditing}
                  >
                    edit
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleDisable}
                    className="ml-1"
                  >
                    Disable
                  </MDButton>
                </MDBox>
              </>
            ) : (
              <>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  mb={2}
                  flexDirection="column"
                >
                  <MDInput
                    type="text"
                    label="Name"
                    name="merchantName"
                    value={merchantName}
                    onChange={handleChange}
                    size="small"
                  />

                  <DropdownSelect
                    label="Frequency"
                    name="frequency"
                    selectStyle={{ height: '37px', minWidth: '155px' }}
                    item={frequency}
                    itemList={frequencies}
                    handleChange={handleChange}
                  />

                  <MDInput
                    type="date"
                    label="Next Payment"
                    size="small"
                    name="dueDate"
                    style={{ height: '37px', minWidth: '155px' }}
                    onChange={handleChange}
                    value={moment(dueDate).format('YYYY-MM-DD')}
                  />
                </MDBox>
                <MDBox mb={2} ml={0} display="flex" justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleCancel}
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
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

IncomeModal.propTypes = {
  getFrequencies: PropTypes.func.isRequired,
  updateIncome: PropTypes.func.isRequired,
  setIncomeActive: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  frequencies: state.frequencies
});

export default connect(mapStateToProps, {
  getFrequencies,
  updateIncome,
  setIncomeActive
})(IncomeModal);
