import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// react-router-dom components
import { useNavigate, Link } from 'react-router-dom';

// actions
import { register } from 'store/user/user.action';

// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDAlert from 'components/MDAlert';

// Authentication layout components
import BasicLayout from 'layouts/authentication/BasicLayout';
import CoverLayout from 'layouts/authentication/CoverLayout';

// Images
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';
import { AuthResponse } from 'assets/theme/components/authResponse';

const defaultFormData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const RegisterRoute = ({ register, user: { isAuthenticated, error } }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [signupError, setSignupError] = useState();

  const handleLoginError = () => {
    setSignupError(error.message);
    alert('There was an issue logging in. Please contact administration.');
  };

  const [formData, setFormData] = useState(defaultFormData);
  const { firstname, lastname, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate('/dashboard');
  });

  useEffect(() => {
    if (error?.message) {
      handleLoginError();
    }
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (signupError) setSignupError(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return setSignupError('Please enter all the required fields');
    }

    // confirm the password matches
    if (password !== confirmPassword)
      return setSignupError('passwords do not match');

    // Sign in user with email and password
    try {
      register(formData);
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('Incorrect password');
          break;

        case 'auth/user-not-found':
          alert('No account with that email');
          break;

        default:
          console.error(err.message);
      }
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={onSubmit}>
            <MDBox mb={2}>
              <MDInput
                onChange={onChange}
                type="text"
                label="First Name"
                name="firstname"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={onChange}
                type="text"
                label="Last Name"
                name="lastname"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={onChange}
                type="email"
                label="Email"
                name="email"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={onChange}
                type="password"
                label="Password"
                name="password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={onChange}
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <AuthResponse
        style={{
          display: !signupError && !error && 'none'
        }}
      >
        {signupError || error}
      </AuthResponse>
    </CoverLayout>
  );
};

RegisterRoute.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { register })(RegisterRoute);
