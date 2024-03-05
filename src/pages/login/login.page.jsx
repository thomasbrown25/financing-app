import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// react-router-dom components
import { useNavigate, Link } from 'react-router-dom';

// actions
import { login, clearLoginError } from 'store/user/user.action';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import BasicLayout from 'layouts/auth-layout/basic.layout';

// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';

const defaultFormData = {
  email: '',
  password: ''
};

const LoginRoute = ({
  login,
  clearLoginError,
  user: { isAuthenticated, error }
}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [loginError, setLoginError] = useState('');
  const handleLoginError = () => {
    setLoginError(error);
  };

  const [formData, setFormData] = useState(defaultFormData);
  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate('/dashboard');
  });

  useEffect(() => {
    if (error) {
      handleLoginError();
    }
  });

  const onChange = (e) => {
    if (error) clearLoginError();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert('Must provide email and password');

    // Sign in user with email and password
    try {
      login(formData);
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          setLoginError('Incorrect password');
          break;

        case 'auth/user-not-found':
          setLoginError('No account with that email');
          break;

        default:
          setLoginError(err.message);
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={onSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
                onChange={onChange}
                fullWidth
              />
            </MDBox>

            <MDBox mb={1}>
              <MDInput
                type="password"
                name="password"
                label="Password"
                onChange={onChange}
                fullWidth
              />
            </MDBox>

            <Collapse in={loginError != ''}>
              <MDBox>
                {loginError && (
                  <MDTypography variant="h7" fontWeight="bold" color="error">
                    {loginError}
                  </MDTypography>
                )}
              </MDBox>
            </Collapse>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  ml: -1
                }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            <MDBox display="flex" flexDirection="column" alignItems="left">
              <MDTypography variant="h7" fontWeight="regular" color="text">
                This web app is in demo mode. To test it, just create a user
                account and login.
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth>
                sign in
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

LoginRoute.propTypes = {
  login: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { login, clearLoginError })(LoginRoute);
