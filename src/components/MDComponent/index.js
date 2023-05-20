import Card from '@mui/material/Card';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';

const MDComponent = ({ children, title }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="uppercase"
        >
          {title}
        </MDTypography>
      </MDBox>

      <MDBox pt={3} pb={2} px={2}>
        {children}
      </MDBox>
    </Card>
  );
};

export default MDComponent;
