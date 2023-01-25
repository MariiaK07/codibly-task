import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useAppSelector } from '../../hooks';
import { IProduct } from '../../types/IProduct';
import Pagination from '../Pagination';


const BasicTable = () => {
  const items = useAppSelector((state) => state.data.items);

  return <>
    <TableContainer sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: IProduct) => (
            <TableRow
              key={item.id}
              sx={{ backgroundColor: `${item.color}` }}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {items.length > 1 && <Pagination />}
  </>;
};

export default BasicTable;
