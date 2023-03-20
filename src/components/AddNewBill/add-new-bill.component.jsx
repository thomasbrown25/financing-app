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

// models
import { defaultTransaction } from 'models/models';

const AddNewBill = ({ categories, frequencies, addRecurringTransaction }) => {
  const [visible, setVisible] = useState(false);
  const [newBill, setNewBill] = useState(defaultTransaction);
  const { merchantName, description, category, frequency, dueDate, amount } =
    newBill;

  const handleDropdown = () => {
    setVisible(!visible);
  };

  const handleChange = (e) => {
    setNewBill({ ...newBill, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addRecurringTransaction(newBill);
    setNewBill(defaultTransaction);
  };

  const handleCancel = () => {
    setVisible(false);
    setNewBill(defaultTransaction);
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
              onClick={handleDropdown}
            >
              <MDTypography
                variant="h6"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Add bill
              </MDTypography>

              <MDTypography>
                <Icon>chevron_right</Icon>
              </MDTypography>
            </MDBox>

            {/* <DropdownTransition visible={visible}> */}
            {visible && (
              <MDBox component="form" role="form" mt={2}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Name"
                    name="merchantName"
                    value={merchantName}
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <DropdownSelect
                    name="category"
                    label={'Category'}
                    style={{ margin: 0, minWidth: '100%' }}
                    selectStyle={{ height: '44px', minWidth: '100%' }}
                    item={category ? category : null}
                    itemList={categories}
                    handleChange={handleChange}
                    empty={true}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <DropdownSelect
                    name="frequency"
                    label={'Frequency'}
                    style={{ margin: 0, minWidth: '100%' }}
                    selectStyle={{ height: '44px', minWidth: '100%' }}
                    item={frequency ? frequency : null}
                    itemList={frequencies}
                    handleChange={handleChange}
                    empty={true}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="date"
                    name="dueDate"
                    onChange={handleChange}
                    value={moment(dueDate).format('YYYY-MM-DD')}
                    style={{ height: '44px', minWidth: '182.88px' }}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={4}>
                  <MDInput
                    type="text"
                    label="Amount"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
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
                    onClick={handleAdd}
                  >
                    Save
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
            {/* </DropdownTransition> */}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

export default AddNewBill;
