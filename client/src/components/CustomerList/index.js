import { TableData, ShowButton } from './styledComponents';
import { Link } from 'react-router-dom';


const CustomerList = ({ customer, displayId }) => {
  const { id, first_name, last_name, phone_number } = customer;

  return (
    <tr>
      <TableData>{displayId}</TableData>
      <TableData>{first_name}</TableData>
      <TableData>{last_name}</TableData>
      <TableData>{phone_number}</TableData>
      <TableData>
        <Link to={`/customers/${id}`}>
          <ShowButton>View More</ShowButton>
        </Link>{" "}
      </TableData>
    </tr>
  );
};

export default CustomerList;
