import { useEffect, useState } from "react";

import TableComponent from "../../core/components/Table/Table";
import { useFiles } from "./services/fileService";

const File = () => {
  const [data, setData] = useState([]);
  const { getDataFiles } = useFiles();
  const getData = async () => {
    try {
      const data = await getDataFiles();
      console.log("data", data);
       const flattened = data.flatMap((file) =>
          file.lines.map((line) => ({
            file: file.file,
            ...line
          }))
        );
      setData(flattened);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <TableComponent data={data} />
    </div>
  );
};

export default File;
