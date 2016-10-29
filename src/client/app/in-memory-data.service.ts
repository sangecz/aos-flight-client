/**
 * Created by sange on 29/10/2016.
 */
import { InMemoryDbService } from 'angular2-in-memory-web-api';
import {destinations} from "./destination/destination.mock";
import {reservations} from "./reservation/reservation.mock";
import {flights} from "./flight/flight.mock";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {destinations, flights, reservations};
  }
}
