import PropTypes from 'prop-types';

// react-flatpickr components
import Flatpickr from 'react-flatpickr';

// react-flatpickr styles
import 'flatpickr/dist/flatpickr.css';

// Material Dashboard 2 PRO React components
import MDInput from 'components/MDInput';

function DatePicker({ input, handleChange, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MDInput
          {...input}
          defaultValue={defaultValue}
          inputRef={ref}
          onChange={handleChange}
        />
      )}
    />
  );
}

// Setting default values for the props of DatePicker
DatePicker.defaultProps = {
  input: {}
};

// Typechecking props for the DatePicker
DatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any)
};

export default DatePicker;
