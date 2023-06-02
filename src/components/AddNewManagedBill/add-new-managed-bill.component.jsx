import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

// layout
import { Card, Grid, Icon } from '@mui/material';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import DropdownTransition from 'components/DropdownTransition/dropdown-transition.component';
import MDInput from 'components/MDInput';
import DropdownSelect from 'components/DropdownSelect/dropdown-select.component';
import MDDatePicker from 'components/MDDatePicker';
import DatePicker from 'components/DatePicker/date-picker.component';
import moment from 'moment';
import MDButton from 'components/MDButton';

// actions
import { addBill } from 'store/managed-bills/managed-bills.action';

// models
import { defaultManagedBill } from 'models/models';

const AddNewManagedBill = ({ addBill }) => {
  const [newManagedBill, setNewManagedBill] = useState(defaultManagedBill);
  const { name, totalAmount, dueDate, monthlyMin } = newManagedBill;

  const handleChange = (e) => {
    setNewManagedBill({ ...newManagedBill, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addBill(newManagedBill);
    setNewManagedBill(defaultManagedBill);
  };

  const handleClear = () => {
    setNewManagedBill(defaultManagedBill);
  };

  return (
    <Card>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12}>
            <MDBox
              mb={0}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography
                variant="h6"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Add new bill
              </MDTypography>
            </MDBox>

            <MDBox component="form" role="form" mt={2}>
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
                  onClick={handleClear}
                >
                  Clear
                </MDButton>
                <MDButton
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={handleAdd}
                >
                  Add
                </MDButton>
              </MDBox>
            </MDBox>
            {/* </DropdownTransition> */}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

AddNewManagedBill.propTypes = {
  addBill: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addBill
})(AddNewManagedBill);
