import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropdownSelect = ({ color, defaultItem, itemList }) => {
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    console.log(defaultItem);
    setItems(event.target.value);
  };

  // useEffect(() => {
  //   if (!items?.includes(defaultItem)) {
  //     setItems({ ...items, defaultItem });
  //   }
  // }, [defaultItem]);

  const renderItems = itemList?.map((item, i) => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
  ));

  return (
    <FormControl
      style={{
        marginLeft: 'auto',
        position: 'absolute',
        right: '20%',
        borderColor: { color }
      }}
      sx={{ m: 1, minWidth: 80 }}
    >
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={defaultItem}
        onChange={handleChange}
        color={color}
      >
        <MenuItem value={defaultItem}>
          <em>{defaultItem}</em>
        </MenuItem>
        {renderItems}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
