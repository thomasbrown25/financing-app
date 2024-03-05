import CurrencyFormat from 'react-currency-format';

const Currency = ({ value }) => {
  const amount = new Intl.NumberFormat('USD', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

  return (
    <CurrencyFormat
      value={amount ? amount : 0}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
    />
  );
};

export default Currency;
