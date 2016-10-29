/**
 * Created by sange on 23/10/2016.
 */
interface Reservation {
  id: number;
  flight: number;
  seats: number;
  password: string;
  state: any;
  created: Date;
  url: string;
}