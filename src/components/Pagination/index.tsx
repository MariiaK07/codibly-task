import { IconButton, Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { setPage } from '../../store/page_slice';
import { useAppDispatch, useAppSelector } from '../../hooks';


const Pagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.page.value);
  const itemsPerPage = useAppSelector((state) => state.data.itemsPerPage);
  const totalPages = useAppSelector((state) => state.data.totalPages);
  const totalItems = useAppSelector((state) => state.data.totalItems);

  const startItemsRange = itemsPerPage * (currentPage - 1) + 1;
  const endItemsRange = totalPages === currentPage
    ? totalItems
    : currentPage * itemsPerPage
  ;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 2,
      marginTop: 2
    }}>
      <Box>
        <Typography variant="subtitle2">
          {startItemsRange} - {endItemsRange} of {totalItems}
        </Typography>
      </Box>

      <Box>
        <IconButton
          color="primary"
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage <= 1}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={totalPages === currentPage}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
