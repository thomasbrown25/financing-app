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
import {
  updateRecurringTransactions,
  disableRecurringTransaction
} from 'store/transactions/transactions.action';
import MDButton from 'components/MDButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: colors.background.dark,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const BillModal = ({
  open,
  handleClose,
  transaction,
  categories,
  color,
  updateRecurringTransactions,
  disableRecurringTransaction
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const [transactionName, setTransactionName] = useState();
  const [transactionDueDate, setTransactionDueDate] = useState();
  const [transactionCategory, setTransactionCategory] = useState();

  const handleEditing = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleChangeName = (e) => {
    setTransactionName(e.target.value);
  };
  const handleChangeDate = (e) => {
    setTransactionDueDate(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setTransactionCategory(e.target.value);
  };

  const handleDisable = () => {
    setIsEditing(false);
    handleClose();
    disableRecurringTransaction(transaction?.id);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    setIsEditingDate(false);
    console.log(transaction);
    updateRecurringTransactions({
      id: transaction?.id,
      userId: transaction?.userId,
      merchantName: transactionName ? transactionName : name,
      description: transaction?.description,
      dueDate: transactionDueDate ? transactionDueDate : transaction?.dueDate,
      lastAmount: transaction?.lastAmount,
      category: transactionCategory
        ? transactionCategory
        : transaction?.category,
      frequency: transaction?.frequency,
      isActive: transaction?.isActive,
      status: transaction?.status,
      type: transaction?.type
    });
  };

  const inputStyle = {
    borderColor: color
  };

  const name = transaction?.merchantName
    ? transaction?.merchantName
    : transaction?.description.slice(0, 20);

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
        onClose={handleClose}
        closeAfterTransition
        className="bill-modal"
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* NAME */}
            {!isEditing ? (
              <>
                <MDBox display="flex" justifyContent="space-between">
                  <MDBox display="flex">
                    <MDTypography
                      variant="h5"
                      fontWeight="medium"
                      mr={2}
                      gutterBottom
                    >
                      {name}{' '}
                    </MDTypography>
                    <Icon
                      className="cursor"
                      color="gray"
                      onClick={handleEditing}
                    >
                      edit
                    </Icon>
                  </MDBox>

                  <MDBox
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MDButton
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleDisable}
                    >
                      Disable
                    </MDButton>
                  </MDBox>
                </MDBox>

                <MDBox display="flex">
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    mr={2}
                    gutterBottom
                  >
                    {transaction?.category}{' '}
                  </MDTypography>
                </MDBox>

                <MDBox display="flex">
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    mr={2}
                    gutterBottom
                  >
                    <Currency value={transaction?.lastAmount} /> due on{' '}
                    {moment(transaction?.dueDate).format('MMM Do')}{' '}
                  </MDTypography>
                </MDBox>
              </>
            ) : (
              <>
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h6" mr={1}>
                    Name:
                  </MDTypography>
                  <MDInput
                    type="text"
                    style={inputStyle}
                    value={transactionName ? transactionName : name}
                    onChange={handleChangeName}
                    size="small"
                  />
                  <MDButton
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={handleUpdate}
                    className="ml-1"
                  >
                    Save
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleCancel}
                    className="ml-1"
                  >
                    Cancel
                  </MDButton>
                </MDBox>

                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h6" mr={1}>
                    Category:
                  </MDTypography>
                  <DropdownSelect
                    style={inputStyle}
                    category={
                      transactionCategory
                        ? transactionCategory
                        : transaction?.category
                    }
                    itemList={categories}
                    handleChangeCategory={handleChangeCategory}
                  />
                </MDBox>

                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h6" mr={1}>
                    Date:
                  </MDTypography>
                  <MDInput
                    type="date"
                    size="small"
                    style={inputStyle}
                    onChange={handleChangeDate}
                    value={
                      transactionDueDate
                        ? transactionDueDate
                        : moment(transaction?.dueDate).format('YYYY-MM-DD')
                    }
                  />
                </MDBox>
              </>
            )}

            {/* CATEGORY */}

            {/* DATE */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

BillModal.propTypes = {
  updateRecurringTransactions: PropTypes.func.isRequired,
  disableRecurringTransaction: PropTypes.func.isRequired
};
export default connect(null, {
  updateRecurringTransactions,
  disableRecurringTransaction
})(BillModal);
