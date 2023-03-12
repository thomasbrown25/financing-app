// Material Dashboard 2 PRO React components
import MDAvatar from 'components/MDAvatar';

// @mui icons
import Icon from '@mui/material/Icon';

// Images
//import profilePicture from 'assets/images/team-3.jpg';
import { logout } from 'store/user/user.action';

const navbarRoutes = [
  {
    type: 'collapse',
    name: 'Account',
    key: 'user-name',
    icon: <MDAvatar src={''} alt="Thomas Brown" size="sm" />,
    collapse: [
      {
        name: 'Manage Accounts',
        key: 'manage-accounts',
        route: '/manage-accounts'
      },
      {
        name: 'My Profile',
        key: 'my-profile',
        route: '/profile'
      },
      {
        name: 'Settings',
        key: 'profile-settings',
        route: '/settings'
      },
      {
        name: 'Logout',
        key: 'logout',
        route: '/sign-in',
        action: logout()
      }
    ]
  },
  { type: 'divider', key: 'divider-0' },
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    route: '/dashboard',
    icon: <Icon fontSize="medium">dashboard</Icon>,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Upcoming',
    key: 'upcoming',
    route: '/upcoming',
    icon: <Icon fontSize="medium">today</Icon>,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Spending',
    key: 'spending',
    route: '/spending',
    icon: <Icon fontSize="medium">payments</Icon>,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Budget',
    key: 'budget',
    route: '/budget',
    icon: <Icon fontSize="medium">article</Icon>,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Transactions',
    key: 'transactions',
    route: '/transactions',
    icon: <Icon fontSize="medium">web_stories</Icon>,
    noCollapse: true
  },
  { type: 'divider', key: 'divider-1' },
  { type: 'title', title: 'Docs', key: 'title-docs' },
  {
    type: 'collapse',
    name: 'Change Log',
    key: 'changelog',
    href: 'https://github.com/creativetimofficial/ct-material-dashboard-pro-react/blob/main/CHANGELOG.md',
    icon: <Icon fontSize="medium">receipt_long</Icon>,
    noCollapse: true
  }
];

export default navbarRoutes;
