import { useEffect } from 'react';
import {
  Box,
  Alert,
  CircularProgress,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchData } from './store/data_slice';
import Search from './components/Search';
import BasicTable from './components/BasicTable';

const App = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.data);
  const currentPage = useAppSelector((state) => state.page.value);

  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    dispatch(fetchData(`?page=${currentPage}`));
  }, [dispatch, currentPage]);


  return (
    <Box sx={{ paddingX: 2 }}>
      <Box sx={{
        width: `${matches && '560px'}`,
        marginX: 'auto',
        marginY: 6
      }}>
        <Search />

        {loading === 'pending' && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,
          }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            <Typography variant="subtitle2">
              Error: {error.message}
            </Typography>
          </Alert>
        )}

        {items.length > 0 && <BasicTable />}
      </Box>
    </Box>
  );
};

export default App;
