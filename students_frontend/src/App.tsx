import { useState, useEffect } from "react";
import { Student, fetchData } from "./utils/fetch_students";

import "./App.css";

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchData()
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Student Data</h1>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Check in time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.check_in_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
