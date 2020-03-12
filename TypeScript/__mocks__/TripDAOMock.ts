import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
export class TripDAOMock extends TripDAO {
    constructor(private trips: Trip[]) {
        super();
    }
    public findTripsByUser() {
        return this.trips;
    }
}
