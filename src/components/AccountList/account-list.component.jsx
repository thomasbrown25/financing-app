// react-router-dom components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';

function AccountList({ title, accounts, cashAmount, ...rest }) {
  const renderItems = accounts?.map(
    ({ name, balance: { available }, officialName }, key) => (
      <MDBox
        key={name}
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="lg"
        py={1}
        pr={2}
        mb={accounts.length - 1 === key ? 0 : 1}
      >
        <MDBox display="flex" alignItems="center">
          <MDBox
            display="grid"
            alignItems="center"
            justifyContent="center"
            bgColor={'dark'}
            borderRadius="lg"
            shadow="md"
            color="white"
            width="2rem"
            height="2rem"
            mr={2}
            variant="gradient"
            fontSize="0.875rem"
          >
            <Icon
              sx={{
                display: 'grid',
                placeItems: 'center'
              }}
            >
              {'currency_exchange'}
            </Icon>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography
              variant="button"
              color={'dark'}
              fontWeight="medium"
              gutterBottom
            >
              {name}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              <>
                {officialName} -{' '}
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Currency value={available} />
                </MDTypography>
              </>
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex">
          <MDTypography
            component={Link}
            variant="button"
            color={'dark'}
            to={'/'}
            sx={{
              lineHeight: 0,
              transition: 'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
              p: 0.5,

              '&:hover, &:focus': {
                transform: 'translateX(5px)'
              }
            }}
          >
            <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
          </MDTypography>
        </MDBox>
      </MDBox>
    )
  );

  return (
    <Card {...rest}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="bold" color="success">
          <MDTypography component="span" variant="h6" fontWeight="bold">
            {title}:{' '}
          </MDTypography>
          <Currency value={cashAmount} />
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the AccountList
AccountList.propTypes = {
  title: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object)
};

export default AccountList;