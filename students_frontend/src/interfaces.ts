export type Major = {
  name: string;
};

export interface Student {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  major: Major["name"];
  number_of_check_ins: number;
}
