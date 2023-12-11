import { fetchData, Student } from "./fetch_students";

describe("fetchData", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches successfully data from an API", async () => {
    const mockData: Student[] = [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        check_in_time: "2023-01-01 08:00:00",
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await fetchData();

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/index");
    expect(result).toEqual(mockData);
  });
});
