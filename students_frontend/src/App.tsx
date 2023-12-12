import { useState, useEffect } from "react";
import { fetchData } from "./utils/fetch_students";
import { fetchMajors } from "./utils/fetch_majors";
import { postData } from "./utils/post_students";
import "./App.css";
import { Major, Student } from "./interfaces";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [showInputFields, setShowInputFields] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [inputValues, setInputValues] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    numberOfCheckins: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));

    fetchMajors()
      .then((data) => setMajors(data.majors))
      .catch((error) => console.log(error));
  }, []);

  const handleButtonClick = () => {
    setShowInputFields(true);
    setError(null);
    setShowTable(!showTable);
  };

  const handleSaveClick = async () => {
    try {
      if (
        !inputValues.firstName ||
        !inputValues.lastName ||
        !inputValues.email ||
        !selectedMajor
      ) {
        throw new Error("Please fill in all fields.");
      }

      const emailRegex = /\.edu(?:\..+)?$/;

      if (!emailRegex.test(inputValues.email)) {
        throw new Error("Please use a valid .edu email address.");
      }

      const newStudent = {
        id: students.length + 1,
        first_name: inputValues.firstName,
        last_name: inputValues.lastName,
        email: inputValues.email,
        number_of_check_ins: inputValues.numberOfCheckins,
        major: selectedMajor,
      };

      await postData(newStudent);

      setInputValues({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        numberOfCheckins: 0,
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
      <div>
        {showInputFields && (
          <div>
            <select
              name="major"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value="" disabled>
                Select a Major
              </option>
              {majors.map((major) => (
                <option key={major.name} value={major.name}>
                  {major.name}
                </option>
              ))}
            </select>
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
              type="text"
              name="email"
              placeholder=".edu email"
              value={inputValues.email}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>Submit</button>
          </div>
        )}
        <button onClick={handleButtonClick}>
          {showTable ? "Hide Table" : "Show Table"}
        </button>
      </div>
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Major</th>
              <th>No. of checkins</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td>{student.major}</td>
                <td>{student.number_of_check_ins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
