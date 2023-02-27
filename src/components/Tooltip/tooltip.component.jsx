import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

const BasicTooltip = ({ text, children }) => {
  return <Tooltip title={text}>{children}</Tooltip>;
};

export default BasicTooltip;
