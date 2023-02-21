// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import Moment from 'react-moment';
import moment from 'moment';

import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import MDInput from 'components/MDInput';
import MDDatePicker from 'components/MDDatePicker';
import { TextField } from '@mui/material';
import { useMaterialUIController } from 'context';
import theme from 'assets/theme';

const defaultModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 12,
  p: 4
};

const defaultFormData = {
  company: '',
  newDate: ''
};

const Income = ({ dueDate, title, price, noGutter }) => {
  const { palette } = theme;
  const { primary, background } = palette;
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [modalStyle, setModalStyle] = useState(defaultModalStyle);

  useEffect(() => {
    if (darkMode) {
      modalStyle.bgcolor = background.dark;
    } else {
      modalStyle.bgcolor = background.white;
    }
    console.log('checking dark mode');
  }, [darkMode]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log('edit click');
    setOpen(true);
  };
  const handleClose = () => {
    console.log('edit click');
    setOpen(false);
  };

  const [formData, setFormData] = useState(defaultFormData);
  const { company, nextpayment } = formData;
  const onChange = (e) => {
    console.log('setting data: ' + e.target.name + ' ' + e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        pr={1}
        mb={noGutter ? 0 : 1}
      >
        <MDBox lineHeight={1.125}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {title}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="regular" color="text">
            Next Payment: <Moment date={dueDate} format={'M/D'} />
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center">
          <MDTypography variant="button" fontWeight="regular" color="text">
            <Currency value={price} />
          </MDTypography>
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            ml={3}
            sx={{ cursor: 'pointer' }}
          >
            <Icon fontSize="small">picture_as_pdf</Icon>
            <MDTypography variant="button" fontWeight="bold">
              &nbsp;PDF
            </MDTypography>{' '}
            <Icon fontSize="small" onClick={handleOpen}>
              edit
            </Icon>
          </MDBox>
        </MDBox>
      </MDBox>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={modalStyle}>
          <MDTypography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            <TextField
              label="Company"
              name="company"
              defaultValue={title}
              onChange={onChange}
            />
          </MDTypography>{' '}
          <MDTypography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            <TextField
              label="Next Payment (month/day)"
              name="nextpayment"
              defaultValue={moment(dueDate).format('MM/DD')}
              onChange={onChange}
            />
          </MDTypography>{' '}
          {/* <MDTypography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            <MDDatePicker
              label="Next Payment"
              id="modal-modal-title"
              variant="h6"
              component="h2"
              name="newDate"
              onChange={onChange}
              value={newDate}
              defaultValue={date}
            ></MDDatePicker>
          </MDTypography>{' '} */}
        </MDBox>
      </Modal>
    </>
  );
};

// Setting default values for the props of Income
Income.defaultProps = {
  noGutter: false
};

// Typechecking props for the Income
Income.propTypes = {
  dueDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  noGutter: PropTypes.bool
};

export default Income;
