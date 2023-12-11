export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  check_in_time: string;
}

export const fetchData = async (): Promise<Student[]> => {
  try {
    const response = await fetch("http://localhost:3000/index");
    const data: Student[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw new Error("Failed to fetch data");
  }
};
