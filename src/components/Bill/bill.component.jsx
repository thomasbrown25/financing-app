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
import AccountDetails from 'components/AccountDetails/account-details.component';
import BillModal from 'components/BillModal/bill-modal.component';

const Bill = ({
  color,
  icon,
  transaction,
  categories,
  updateRecurringTransactions
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const name = transaction?.merchantName
    ? transaction?.merchantName
    : transaction?.description.slice(0, 20);

  return (
    <MDBox key={transaction?.id} component="li" py={1} pr={2} mb={1}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={handleModalOpen}
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

            <MDTypography variant="caption" color="text" fontWeight="regular">
              {moment(transaction?.dueDate).format('M/DD')}
            </MDTypography>
          </MDBox>
        </MDBox>
        <DropdownSelect
          color={color}
          category={transaction?.category}
          disable={true}
        />
        <MDTypography
          variant="button"
          color={color}
          fontWeight="medium"
          textGradient
          className="ml-auto"
        >
          <Currency value={transaction?.lastAmount} />
        </MDTypography>
      </MDBox>
      <BillModal
        open={openModal}
        handleClose={handleModalClose}
        transaction={transaction}
        categories={categories}
        color={color}
      />
      {/* {isDropDown && (
        <AccountDetails
          name={'text'}
          company={'company'}
          email={'email'}
          vat={'vat'}
        />
      )} */}
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
