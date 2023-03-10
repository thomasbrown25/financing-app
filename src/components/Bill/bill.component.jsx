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
import DropdownSelect from 'components/DropdownSelect/dropdown-select.component';
import MDInput from 'components/MDInput';
import { useState } from 'react';

import { updateRecurringTransactions } from 'store/transactions/transactions.action';

const Bill = ({
  color,
  icon,
  transaction: {
    id,
    userId,
    merchantName,
    description,
    dueDate,
    lastAmount,
    category,
    frequency,
    isActive,
    status,
    type
  },
  categories,
  updateRecurringTransactions
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const [transactionName, setTransactionName] = useState();
  const [transactionDueDate, setTransactionDueDate] = useState();

  const name = merchantName ? merchantName : description.slice(0, 20);

  const handleEditName = () => {
    setIsEditingName(true);
  };
  const handleEditDate = () => {
    setIsEditingDate(true);
  };
  const handleCancelName = () => {
    setIsEditingName(false);
  };
  const handleCancelDate = () => {
    setIsEditingDate(false);
  };

  const handleUpdate = () => {
    setIsEditingName(false);
    setIsEditingDate(false);
    updateRecurringTransactions({
      id: id,
      userId: userId,
      merchantName: transactionName ? transactionName : name,
      description: description,
      dueDate: transactionDueDate ? transactionDueDate : dueDate,
      lastAmount: lastAmount,
      category: category,
      frequency: frequency,
      isActive: isActive,
      status: status,
      type: type
    });
  };

  const handleChangeName = (e) => {
    setTransactionName(e.target.value);
  };

  const handleChangeDate = (e) => {
    setTransactionDueDate(e.target.value);
  };

  return (
    <MDBox key={id} component="li" py={1} pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: 'bold' }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            {isEditingName ? (
              <>
                <MDBox>
                  <MDInput
                    type="text"
                    value={transactionName ? transactionName : name}
                    onChange={handleChangeName}
                    size="small"
                  />{' '}
                  <Icon
                    className="cursor"
                    color="success"
                    onClick={handleUpdate}
                  >
                    done
                  </Icon>
                  <Icon
                    className="cursor"
                    color="error"
                    onClick={handleCancelName}
                  >
                    close
                  </Icon>
                </MDBox>
              </>
            ) : (
              <MDTypography
                variant="button"
                fontWeight="medium"
                gutterBottom
                onClick={handleEditName}
              >
                {name}{' '}
              </MDTypography>
            )}
            {isEditingDate ? (
              <MDBox>
                <MDInput
                  type="date"
                  onChange={handleChangeDate}
                  value={
                    transactionDueDate
                      ? transactionDueDate
                      : moment(dueDate).format('YYYY-MM-DD')
                  }
                />
                <Icon className="cursor" color="success" onClick={handleUpdate}>
                  done
                </Icon>
                <Icon
                  className="cursor"
                  color="error"
                  onClick={handleCancelDate}
                >
                  close
                </Icon>
              </MDBox>
            ) : (
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="regular"
                onClick={handleEditDate}
              >
                {moment(dueDate).format('M/DD')}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
        <DropdownSelect
          color={color}
          defaultItem={category}
          itemList={categories}
        />
        <MDTypography
          variant="button"
          color={color}
          fontWeight="medium"
          textGradient
          className="ml-auto"
        >
          <Currency value={lastAmount} />
        </MDTypography>
      </MDBox>
      {/* <Icon className="cursor" color="error" onClick={handleCancelDate}>
        close
      </Icon> */}
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
  icon: PropTypes.node.isRequired,
  updateRecurringTransactions: PropTypes.func.isRequired
};

export default connect(null, { updateRecurringTransactions })(Bill);
