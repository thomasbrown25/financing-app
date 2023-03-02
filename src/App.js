import { useState, useEffect } from 'react';

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import store from 'store/store';
import { setAuthToken } from 'utils/api.utils';
import { loadUser } from 'store/user/user.action';
import { USER_ACTION_TYPES } from 'store/user/user.types';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 PRO React examples
import Sidenav from 'components/Sidenav';
import Configurator from 'components/Configurator';

import theme from 'assets/theme';
import themeDark from 'assets/theme-dark';

// Utils
import PrivateRoutes from 'utils/private-route';

// Material Dashboard 2 PRO React routes

import './assets/global.css';

// Material Dashboard 2 PRO React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator
} from 'context';

// Images
import brandWhite from 'assets/images/favicon.png';
import brandDark from 'assets/images/favicon.png';

// Pages
import LoginRoute from 'routes/login/login.route';
import DashboardRoute from 'routes/dashboard/dashboard.route';
import navbarRoutes from 'navbar.routes';
import AccountRoute from 'routes/account/account.route';
import UpcomingRoute from 'routes/upcoming/upcoming.route';
import MainLayout from 'layouts/main-layout';
import TransactionsRoute from 'routes/transactions/transactions.route';
import RegisterRoute from 'routes/register/register.route';
import SettingsRoute from 'routes/settings/settings.route';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      console.log('we have a token in local storage');
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    } else {
      console.log('no token');
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token)
        store.dispatch({ type: USER_ACTION_TYPES.SIGN_OUT });
    });
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2.5rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Financing App"
            routes={navbarRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <Routes>
        <Route path="sign-in" element={<LoginRoute />} />
        <Route path="sign-up" element={<RegisterRoute />} />
        <Route element={<PrivateRoutes />}>
          <Route index path="/dashboard" element={<DashboardRoute />} />
          <Route path="/accounts/account" element={<AccountRoute />} />
          <Route path="/upcoming" element={<UpcomingRoute />} />
          <Route path="/transactions" element={<TransactionsRoute />} />
          <Route path="/settings" element={<SettingsRoute />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
