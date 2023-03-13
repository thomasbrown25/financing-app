import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';
import Transactions from 'components/Transactions/transactions.component';
import MDTypography from 'components/MDTypography';
import Currency from 'components/Currency/currency.component';
import AccountList from 'components/AccountList/account-list.component';
import ItemContainer from 'components/ItemContainer/item-container.component';
import PlaidLink from 'components/plaid-link/plaid-link.component';
import MDButton from 'components/MDButton';

import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';

import { getAccountTransactions } from 'store/transactions/transactions.action';
import { getAccountBalance } from 'store/accounts/accounts.action';
import BasicTooltip from 'components/Tooltip/tooltip.component';
import { deleteAccount } from 'store/accounts/accounts.action';
import { getCategories } from 'store/categories/categories.action';
import MDInput from 'components/MDInput';
import { useState } from 'react';
import { addCategory } from 'store/categories/categories.action';

const ManageCategoriesRoute = ({
  transactions: { selectedTransactions, todaySpend },
  accounts: { cashAccounts, creditAccounts },
  categories: { categories },
  addCategory,
  getCategories
}) => {
  const [newCategory, setNewCategory] = useState();
  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    addCategory(newCategory);
    setNewCategory('');
  };

  const handleCategoryDelete = () => {};

  const renderItems = categories?.map(({ id, name }, key) => (
    <MDBox
      key={key}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
      mb={1}
    >
      <MDTypography
        component={Link}
        variant="button"
        color={'dark'}
        to={`/accounts/account`}
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
              {name}
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
        <BasicTooltip text="Delete">
          <Icon
            fontSize="small"
            dataid={id}
            onClick={() => handleCategoryDelete(id)}
            color="text"
          >
            delete
          </Icon>
        </BasicTooltip>
      </MDTypography>
    </MDBox>
  ));
  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header title={`Manage Categories`} />

        <ItemContainer xs={12} sm={12} md={12} lg={6}>
          <MDTypography variant="h6" fontWeight="medium" pt={2} pb={2}>
            Add or delete categories
          </MDTypography>
          <MDBox display="flex" alignItems="center">
            <MDInput
              type="text"
              label="Add Category"
              value={newCategory}
              onChange={handleChange}
              mr={2}
            />
            <Icon
              size="large"
              color="success"
              className="cursor ml-1"
              onClick={handleAddCategory}
            >
              add
            </Icon>
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            pt={2}
            m={0}
          >
            {renderItems}
          </MDBox>
        </ItemContainer>
      </Grid>
    </MainLayout>
  );
};
ManageCategoriesRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  accounts: state.accounts,
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories, addCategory })(
  ManageCategoriesRoute
);
