/**
 * Created by sange on 23/10/2016.
 */
interface Flight {
  id: number;
  name: string;
  dateOfDeparture: Date;
  distance: number;
  seats: number;
  price: number;
  from: number;
  fromName?: string;
  to: number;
  toName?: string;
  url: string;
}
