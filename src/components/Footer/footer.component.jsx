import PropTypes from 'prop-types';

// @mui material components
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React base styles
import typography from 'assets/theme/base/typography';

const Footer = ({ light }) => {
  const { size } = typography;
  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? 'white' : 'text'}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, Created by Thomas Brown
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              listStyle: 'none',
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up('lg')]: {
                mt: 0
              }
            })}
          >
            {/* <MDBox component="li" pr={2} lineHeight={1}>
              <Link href="https://thomasbrownportfolio.com/" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  Thomas' Portfolio
                </MDTypography>
              </Link>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  );
};
