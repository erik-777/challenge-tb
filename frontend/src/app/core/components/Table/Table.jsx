import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";

export default function TableComponent({ data }) {
  return (
    <Container className="table-container">
      <Table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.file}</td>
              <td>{item.text}</td>
              <td>{item.number}</td>
              <td>{item.hex}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
