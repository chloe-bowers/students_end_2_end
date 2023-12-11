import { useState, useEffect } from "react";
import "./App.css";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  check_in_time: string;
}

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/index");
      const data: Student[] = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

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
