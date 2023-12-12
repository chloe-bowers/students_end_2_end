import { Major } from "../interfaces";

export const fetchMajors = async (): Promise<Major[]> => {
  try {
    const response = await fetch(
      "https://ios-interview.joinhandshake-internal.com/majors"
    );
    const data: Major[] = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data", error);
    throw null;
  }
};
