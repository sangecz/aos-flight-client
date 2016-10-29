import {reservationStates} from "./reservation-states";
/**
 * Created by sange on 29/10/2016.
 */

export let reservations = [
  {
    id: 1,
    flight: 1,
    created: '2016-10-29T10:15:28.173Z',
    password: 'pwd0',
    seats: 10,
    state: reservationStates.NEW,
    url: '/reservation/1'
  },
  {
    id: 2,
    flight: 1,
    created: '2016-10-18T20:24:28.173Z',
    password: 'pwd1',
    seats: 20,
    state: reservationStates.PAID,
    url: '/reservation/2'
  },
  {
    id: 3,
    flight: 1,
    created: '2016-10-29T14:15:25.173Z',
    password: 'pwd2',
    seats: 10,
    state: reservationStates.CANCELED,
    url: '/reservation/3'
  },
  {
    id: 4,
    flight: 1,
    created: '2016-10-28T19:16:28.173Z',
    password: 'pwd3',
    seats: 10,
    state: reservationStates.PAID,
    url: '/reservation/4'
  },
  {
    id: 5,
    flight: 3,
    created: '2016-10-29T10:34:55.173Z',
    password: 'pwd4',
    seats: 30,
    state: reservationStates.NEW,
    url: '/reservation/5'
  },
  {
    id: 6,
    flight: 3,
    created: '2016-10-24T10:13:23.173Z',
    password: 'pwd5',
    seats: 40,
    state: reservationStates.NEW,
    url: '/reservation/6'
  }

];
