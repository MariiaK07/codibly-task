import { useState } from 'react';
import {
  Box,
  Input,
  IconButton,
  Alert,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchData } from '../../store/data_slice';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const Search = () => {
  const [id, setId] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.page.value);
  const items = useAppSelector((state) => state.data.items);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if(e.target.value.match('^[0-9]+$')) {
      setShowMessage(false);
      setId(e.target.value);
    } else {
      setShowMessage(true);
      setId('');
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (id.length > 1) {
        dispatch(fetchData(id));
      }

      setId('');
    }
  };

  const handleClick = (id: string) => {
    dispatch(fetchData(id));
    setId('');
  };


  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Input
          type="text"
          placeholder="Search by Id"
          value={id}
          color="primary"
          sx={{ flexGrow: 1 }}
          onChange={handleChange}
          onBlur={() => setShowMessage(false)}
          onKeyDown={(e) => handleKeyDown(e, `/${id}`)}
        />
        <IconButton
          color="primary"
          onClick={() => handleClick(`/${id}`)}
          disabled={!id}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => handleClick(`?page=${currentPage}`)}
          disabled={items.length > 1}
        >
          <ClearIcon />
        </IconButton>
      </Box>
      {showMessage && (
        <Alert sx={{ marginTop: 2 }} severity="warning">
          <Typography variant="subtitle2">
            Numbers only!
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default Search;
