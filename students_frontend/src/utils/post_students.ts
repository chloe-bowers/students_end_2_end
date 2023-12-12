import { Student } from "../interfaces";

export const postData = async (newStudent: Student): Promise<void> => {
  try {
    await fetch("http://localhost:3000/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
  } catch (error) {
    console.error("Error posting data", error);
    throw null;
  }
};
