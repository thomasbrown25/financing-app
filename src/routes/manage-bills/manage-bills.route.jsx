import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Card, Grid } from '@mui/material';
import Header from 'components/Header/header.component';

// components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDComponent from 'components/MDComponent';
import Currency from 'components/Currency/currency.component';

// actions
import { getBills, deleteBill } from 'store/managed-bills/managed-bills.action';

import ManagedBill from 'components/ManagedBill/managed-bill.component';
import AddNewManagedBill from 'components/AddNewManagedBill/add-new-managed-bill.component';

const ManageBillsRoute = ({
  managedBills: { bills, totalAmounts, totalMinMonthly },
  getBills,
  deleteBill
}) => {
  useEffect(() => {
    getBills();
  }, [getBills]);

  const renderItems = bills?.map((bill, i) => (
    <ManagedBill key={i} managedBill={bill} deleteBill={deleteBill} />
  ));

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
              <>{renderItems}</>
              <MDBox display="flex" justifyContent="flex-end" mt={5}>
                <span
                  style={{ borderTop: '1px solid green', width: '100px' }}
                ></span>
              </MDBox>

              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
                mr={1}
              >
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                >
                  Total Owed:
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" color="error">
                  <Currency value={totalAmounts} />
                </MDTypography>
              </MDBox>

              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
                mr={1}
              >
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                >
                  Total Monthly:
                </MDTypography>
                <MDTypography variant="button" fontWeight="bold" color="error">
                  <Currency value={totalMinMonthly} />
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDComponent>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3}>
          {/* ADD MANAGED BILL COMPONENT */}
          <AddNewManagedBill />
        </Grid>
      </Grid>
    </MainLayout>
  );
};
ManageBillsRoute.propTypes = {
  managedBills: PropTypes.object.isRequired,
  getBills: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  managedBills: state.managedBills
});

export default connect(mapStateToProps, {
  getBills,
  deleteBill
})(ManageBillsRoute);
