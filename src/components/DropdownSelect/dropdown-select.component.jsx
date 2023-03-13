import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropdownSelect = ({
  color,
  itemList,
  style,
  handleChangeCategory,
  category,
  disable
}) => {
  const [item, setItem] = useState();

  const renderItems = itemList?.map((item, i) => (
    <MenuItem key={i} value={item.name}>
      {item.name}
    </MenuItem>
  ));

  return (
    <FormControl
      style={
        style
          ? style
          : {
              marginLeft: 'auto',
              position: 'absolute',
              right: '25%',
              borderColor: { color }
            }
      }
      sx={{ m: 1, minWidth: 80 }}
    >
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={category}
        onChange={handleChangeCategory}
        color={color}
      >
        {disable && (
          <MenuItem value={category}>
            <em>{category}</em>
          </MenuItem>
        )}
        {renderItems}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
