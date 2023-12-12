import { Student } from "../interfaces";

export const fetchData = async (): Promise<Student[]> => {
  try {
    const response = await fetch("http://localhost:3000/index");
    const data: Student[] = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data", error);
    throw null;
  }
};
