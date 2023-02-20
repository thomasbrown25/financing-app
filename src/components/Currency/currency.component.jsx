import CurrencyFormat from 'react-currency-format';

const Currency = ({ value }) => {
  return (
    <CurrencyFormat
      value={value ? value : 0}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
    />
  );
};

export default Currency;
