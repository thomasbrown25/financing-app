import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// react-router components
import { useLocation, Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';

// Material Dashboard 2 PRO React examples
import NotificationItem from 'components/NotificationItem';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu
} from 'components/Navbar/DashboardNavbar/styles';

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator
} from 'context';

import { logout } from 'store/user/user.action';
import MDTypography from 'components/MDTypography';

function DashboardNavbar({ absolute, light, isMini, logout }) {
  const [navbarType, setNavbarType] = useState('static');
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, openConfigurator, darkMode } =
    controller;
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const route = useLocation().pathname.split('/').slice(1);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const handleProfileOpenMenu = (event) =>
    setOpenProfileMenu(event.currentTarget);
  const handleProfileCloseMenu = () => setOpenProfileMenu(false);

  // Render the profile menu
  const profileMenu = () => (
    <Menu
      anchorEl={openProfileMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={Boolean(openProfileMenu)}
      onClose={handleProfileCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>person</Icon>} title="Profile" />
      <NotificationItem
        icon={<Icon>control_point</Icon>}
        title="Link New Account"
      />
      <NotificationItem
        icon={<Icon>logout</Icon>}
        title="Logout"
        onClick={logout}
      />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba }
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    }
  });

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? 'menu_open' : 'menu'}
            </Icon>
          </IconButton>
          <MDTypography variant="h3" textTransform="uppercase" pl={1}>
            Financing App
          </MDTypography>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>
            <MDBox color={light ? 'white' : 'inherit'}>
              <IconButton
                sx={navbarIconButton}
                onClick={handleProfileOpenMenu}
                size="small"
                disableRipple
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              {profileMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  logout: PropTypes.func
};

export default connect(null, { logout })(DashboardNavbar);
