// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import backgroundImage from 'assets/images/bg-profile.jpeg';

const HeaderImage = () => {
  return (
    <MDBox
      position="relative"
      mb={2}
      display="flex"
      alignItems="center"
      minHeight="18.75rem"
      borderRadius="xl"
      mt={2}
      sx={{
        backgroundImage: ({
          functions: { rgba, linearGradient },
          palette: { gradients }
        }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        overflow: 'hidden'
      }}
    />
  );
};

export default HeaderImage;
