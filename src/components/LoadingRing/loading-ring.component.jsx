import { ColorRing } from 'react-loader-spinner';

const LoadingRing = () => {
  return (
    <ColorRing
      visible={true}
      height="25"
      width="25"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="center-item"
      colors={['#1A73E8', '#1662C4', '#1A73E8', '#1662C4', '#1A73E8']}
      className="center-item"
    />
  );
};

export default LoadingRing;
