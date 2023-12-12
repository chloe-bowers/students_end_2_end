export interface Student {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  major: string;
  number_of_check_ins: number;
  check_in_time: string | Date;
}
