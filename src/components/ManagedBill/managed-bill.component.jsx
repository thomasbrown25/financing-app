import { useState } from 'react';

// components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import Icon from '@mui/material/Icon';
import BasicTooltip from 'components/Tooltip/tooltip.component';
import MDButton from 'components/MDButton';
import Menu from '@mui/material/Menu';
import NotificationItem from 'components/NotificationItem';

// actions
import { deleteBill } from 'store/managed-bills/managed-bills.action';

const ManagedBill = ({ key, name, totalAmount, handleEditing }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the  menu
  const EditMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<Icon>edit</Icon>}
        title="Edit"
        onClick={handleEditing}
      />
      <NotificationItem icon={<Icon>delete</Icon>} title="Delete" />
    </Menu>
  );

  return (
    <MDBox
      key={key}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
      //mb={accounts.length - 1 === key ? 0 : 1}
    >
      <MDTypography
        // onClick={() => handleAccountSelect(accountId, subtype)}
        variant="button"
        color={'dark'}
        sx={{
          lineHeight: 0,
          transition: 'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
          p: 0.5,

          '&:hover, &:focus': {
            transform: 'translateX(5px)'
          }
        }}
      >
        <MDBox display="flex" alignItems="center">
          <MDBox display="flex" flexDirection="column">
            <MDTypography
              variant="button"
              color={'dark'}
              fontWeight="medium"
              gutterBottom
            >
              {name}{' '}
            </MDTypography>

            <MDTypography variant="caption" color="text">
              <>
                {'Total'} -{' '}
                <MDTypography
                  variant="caption"
                  color="info"
                  fontWeight="medium"
                >
                  <Currency value={totalAmount} />
                </MDTypography>
              </>
            </MDTypography>

            <MDTypography variant="caption" color="text">
              Due Date -{' '}
              <MDTypography variant="caption" color="info" fontWeight="medium">
                4/8
              </MDTypography>
            </MDTypography>

            <MDTypography variant="caption" color="text">
              <>
                {'Monthly Min'} -{' '}
                <MDTypography
                  variant="caption"
                  color="info"
                  fontWeight="medium"
                >
                  <Currency value={'50'} />
                </MDTypography>
              </>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDTypography>
      <MDTypography
        variant="button"
        color={'dark'}
        sx={{
          lineHeight: 0,
          transition: 'all 0.2s cubic-bezier(.34,1.61,.7,1.3)',
          p: 0.5,

          '&:hover, &:focus': {
            transform: 'translateX(5px)'
          }
        }}
      >
        <MDButton
          variant="outlined"
          color="info"
          iconOnly
          circular
          onClick={handleOpenMenu}
        >
          <Icon sx={{ fontWeight: 'bold' }}>more_horiz</Icon>
        </MDButton>
        {EditMenu()}
      </MDTypography>
    </MDBox>
  );
};

export default ManagedBill;
