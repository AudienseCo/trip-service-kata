import { ITripRepository } from "../src/domain/ITripRepository";
import Trip from "../src/domain/Trip";

export class TripDAOMock implements ITripRepository {
  constructor(private trips: Trip[]) {}
  public findTripsByUser() {
    return this.trips;
  }
}
