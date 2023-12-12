export interface Student {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  major: string;
  checkins: number,
  check_in_time: string | Date;
}
