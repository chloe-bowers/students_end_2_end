import { useState, useEffect } from "react";
import { fetchData } from "./utils/fetch_students";
import { postData } from "./utils/post_students";
import "./App.css";
import { Student } from "./interfaces";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showInputFields, setShowInputFields] = useState(false);
  const [inputValues, setInputValues] = useState({
    id: null,
    firstName: "",
    lastName: "",
    checkInTime: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));
  }, []);

  const handleButtonClick = () => {
    setShowInputFields(true);
    setError(null);
  };

  const handleSaveClick = async () => {
    try {
      if (
        !inputValues.firstName ||
        !inputValues.lastName ||
        !inputValues.checkInTime
      ) {
        throw new Error("Please fill in all fields.");
      }

      const newStudent = {
        id: students.length + 1,
        first_name: inputValues.firstName,
        last_name: inputValues.lastName,
        check_in_time: inputValues.checkInTime,
      };

      await postData(newStudent);

      setInputValues({
        id: null,
        firstName: "",
        lastName: "",
        checkInTime: "",
      });

      setShowInputFields(false);

      const updatedData = await fetchData();
      setStudents(updatedData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error saving data", error.message);
      setError(error.message);
    }
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Student Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
              <td>{new Date(student.check_in_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showInputFields && (
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={inputValues.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={inputValues.lastName}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="checkInTime"
            placeholder="Check In Time"
            value={inputValues.checkInTime}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
      <button onClick={handleButtonClick}>Add Student</button>
    </div>
  );
}

export default App;
