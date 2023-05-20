import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';

// components
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';
import AddNewBill from 'components/AddNewBill/add-new-bill.component';
import Bill from 'components/Bill/bill.component';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDComponent from 'components/MDComponent';
import Currency from 'components/Currency/currency.component';
import Icon from '@mui/material/Icon';
import BasicTooltip from 'components/Tooltip/tooltip.component';

// actions
import { getExpenses } from 'store/transactions/transactions.action';
import { addRecurringTransaction } from 'store/transactions/transactions.action';
import ManagedBill from 'components/ManagedBill/managed-bill.component';
import MDInput from 'components/MDInput';
import DropdownSelect from 'components/DropdownSelect/dropdown-select.component';
import MDButton from 'components/MDButton';

const ManageBillsRoute = ({
  transactions: { expenses },
  managedBills: { bills },
  categories: { categories },
  frequencies: { frequencies },
  getExpenses,
  addRecurringTransaction
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderItems = bills?.map((bill, i) => <ManagedBill />);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header title={'Bills'} />
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <MDComponent title={'Manage Your Bills'}>
            <MDBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >
              {isEditing ? (
                <MDBox component="form" role="form" mt={2}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Name"
                      name="merchantName"
                      // value={merchantName}
                      // onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Total"
                      name="total"
                      //value={amount}
                      //onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="date"
                      name="dueDate"
                      // onChange={handleChange}
                      /// value={moment(dueDate).format('YYYY-MM-DD')}
                      style={{ height: '44px', minWidth: '182.88px' }}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={4}>
                    <MDInput
                      type="text"
                      label="Monthly Min"
                      name="monthlyMin"
                      //value={amount}
                      //onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox
                    mb={2}
                    ml={0}
                    display="flex"
                    justifyContent="space-between"
                  >
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
                      //onClick={handleAdd}
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              ) : (
                <ManagedBill
                  key={1}
                  name={'Ashley Furniture'}
                  totalAmount={45000}
                  handleEditing={handleEditing}
                />
              )}
            </MDBox>
          </MDComponent>
          {/* <AddNewBill
            categories={categories}
            frequencies={frequencies}
            addRecurringTransaction={addRecurringTransaction}
          /> */}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
      </Grid>
    </MainLayout>
  );
};
ManageBillsRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  managedBills: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getExpenses: PropTypes.func.isRequired,
  frequencies: PropTypes.object.isRequired,
  addRecurringTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  managedBills: state.managedBills,
  categories: state.categories,
  frequencies: state.frequencies
});

export default connect(mapStateToProps, {
  getExpenses,
  addRecurringTransaction
})(ManageBillsRoute);
