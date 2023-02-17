import CurrencyFormat from 'react-currency-format';

const Currency = ({ value }) => {
  return (
    <CurrencyFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
    />
  );
};

export default Currency;
