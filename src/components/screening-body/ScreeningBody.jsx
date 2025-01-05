import React, { useState, useEffect} from "react";
import "./ScreeningBody.scss";
import AxiosInstance from "../Axios";



const ScreeningBody = () => {
 
  const [myData, setMyData] = useState([])
  const [year, setYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log('MyData', myData)
  
  const GetData = () => {
    AxiosInstance.get('diabetesdata/')
      .then((res) => {
        const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMyData(sortedData);
      });
  };


  useEffect(() => {
    GetData()
  }, [])

  useEffect(() => {
    if (myData.length > 0) {
      const years = [...new Set(myData.map((row) => row.date.split("-")[0]))].sort((a, b) => b - a);
      setYear(years[0]); // Set the latest year as default
    }
  }, [myData]);

  const years = [...new Set(myData.map((row) => row.date.split("-")[0]))].sort();
  
  

  const filteredData = myData.filter((row) => row.date.includes(year));
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  console.log("Filtered Data", filteredData)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("Paginated", paginatedData)

  return (
    <div className="table-container">
      <div className="dropdown right-aligned">
        <label htmlFor="year"></label>
        <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Region</th>
            <th>Result</th>
            <th>Confidence Level</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row}>
              <td>{row.date}</td>
              <td>{row.person_name}</td>
              <td>{row.age}</td>
              <td>{row.gender}</td>
              <td>{row.region}</td>
              <td>{row.results}</td>
              <td>{row.confidence_level}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScreeningBody;
