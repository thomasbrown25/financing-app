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

const AddNewBill = ({ categories }) => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState();

  const handleDropdown = () => {
    setVisible(!visible);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
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
                Add new bill
              </MDTypography>

              <MDTypography>
                <Icon>chevron_right</Icon>
              </MDTypography>
            </MDBox>

            <DropdownTransition visible={visible}>
              <MDBox component="form" role="form" mt={2}>
                <MDBox display="flex" mb={2}>
                  <MDInput type="text" label="Name" fullWidth />
                </MDBox>
                <MDBox display="flex" mb={2}>
                  <DropdownSelect
                    label={'Category'}
                    style={{ margin: 0 }}
                    selectStyle={{ height: '44px', minWidth: '182.88px' }}
                    category={category ? category : null}
                    itemList={categories}
                    handleChangeCategory={handleChangeCategory}
                    empty={true}
                  />
                </MDBox>
                <MDBox display="flex" mb={2}>
                  <MDDatePicker input={{ placeholder: 'Select Date' }} />
                </MDBox>
              </MDBox>
            </DropdownTransition>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

export default AddNewBill;
