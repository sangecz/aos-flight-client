import { destinationReducer } from './shared/destination/destination.reducer';
import { FlightState } from './shared/flight/flight.state';
import { flightReducer } from './shared/flight/flight.reducer';
import { DestinationState } from './shared/destination/destination.state';
/**
 * Created by sange on 27/11/2016.
 */

export interface State {
  destination: DestinationState;
  flight: FlightState;
}

export const appState = {
  destination: destinationReducer,
  flight: flightReducer
};