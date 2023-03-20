import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// react-router-dom components
import { useLocation } from 'react-router-dom';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 PRO React context
import { useMaterialUIController, setLayout } from 'context';

const MainLayout = ({ children }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, 'dashboard');
  }, [pathname]);

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: 'relative',
        minHeight: '97vh',

        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(['margin-left', 'margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard
          })
        }
      })}
    >
      {children}
    </MDBox>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default connect(null, {})(MainLayout);
