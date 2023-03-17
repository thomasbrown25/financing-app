import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropdownSelect = ({
  color,
  itemList,
  style,
  handleChange,
  item,
  name,
  disable,
  selectStyle,
  label,
  empty
}) => {
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
      <InputLabel id="dropdown-label">{label}</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown-label"
        name={name}
        value={item ? item : 'None'}
        onChange={handleChange}
        color={color}
        style={selectStyle}
        label={label}
      >
        {disable && (
          <MenuItem value={item}>
            <em>{item}</em>
          </MenuItem>
        )}
        {empty && (
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
        )}
        {renderItems}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
