import moment from 'moment';

export const defaultTransaction = {
  merchantName: '',
  description: '',
  category: '',
  frequency: '',
  dueDate: null,
  amount: ''
};

export const defaultIncome = {
  merchantName: '',
  description: '',
  lastDate: '',
  dueDate: '',
  frequency: '',
  lastAmount: ''
};

export const defaultManagedBill = {
  name: '',
  totalAmount: '',
  dueDate: moment(Date.now()).format('YYYY-MM-DD'),
  monthlyMin: ''
};

export const defaultSettings = {
  fontSize: '',
  language: '',
  messages: '',
  darkMode: false,
  sidenavMini: false,
  navbarFixed: true,
  sidenavType: ''
};

export const defaultModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 12,
  p: 4
};
