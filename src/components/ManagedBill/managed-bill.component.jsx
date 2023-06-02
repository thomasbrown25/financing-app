import { useState } from 'react';
import moment from 'moment';

// components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import Icon from '@mui/material/Icon';
import BasicTooltip from 'components/Tooltip/tooltip.component';
import MDButton from 'components/MDButton';
import Menu from '@mui/material/Menu';
import NotificationItem from 'components/NotificationItem';

import ManagedBillModal from 'components/ManagedBillModal/managed-bill-modal';

const ManagedBill = ({ managedBill, deleteBill }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const closeModalandMenu = () => {
    handleCloseMenu();
    handleModalOpen();
  };

  const handleDeleteBill = () => {
    console.log(managedBill?.id);
    deleteBill(managedBill?.id);
    handleCloseMenu();
  };
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
        onClick={closeModalandMenu}
      />
      <NotificationItem
        icon={<Icon>delete</Icon>}
        title="Delete"
        onClick={handleDeleteBill}
      />
    </Menu>
  );

  return (
    <>
      <MDBox
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
                {managedBill?.name}{' '}
              </MDTypography>

              <MDTypography variant="caption" color="text">
                <>
                  {'Total'} -{' '}
                  <MDTypography
                    variant="caption"
                    color="info"
                    fontWeight="medium"
                  >
                    <Currency value={managedBill?.totalAmount} />
                  </MDTypography>
                </>
              </MDTypography>

              <MDTypography variant="caption" color="text">
                Due Date -{' '}
                <MDTypography
                  variant="caption"
                  color="info"
                  fontWeight="medium"
                >
                  {moment(managedBill?.dueDate).format('M/DD')}
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
                    <Currency value={managedBill?.monthlyMin} />
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
      <ManagedBillModal
        open={openModal}
        handleClose={handleModalClose}
        managedBill={managedBill}
      />
    </>
  );
};

export default ManagedBill;
