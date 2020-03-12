import "jest";
import userNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

describe("TripServiceShould", () => {
  class TripServiceMock extends TripService {
    constructor(private loggedUser: User, private userTrips: Trip[]) {
      super();
    }

    protected getLoggedUsers() {
      return this.loggedUser;
    }

    protected findUserTrips() {
      return this.userTrips;
    }
  }

  it("should throw an exception if the user is not logged.", () => {
    const user = new User();
    const tripService = new TripServiceMock(null, []);

    expect(() => {
      tripService.getTripsByUser(user);
    }).toThrow(userNotLoggedInException);
  });

  it("should return the empty trip list if the user does not have friends", () => {
    const user = new User();
    const loggedUser = new User();
    const expectedTripList = [];
    const tripService = new TripServiceMock(loggedUser, expectedTripList);
    const tripList = tripService.getTripsByUser(user);

    expect(tripList).toEqual(expectedTripList);
  });

  it("should return the trip list if the user is a friend", () => {
    const user = new User();
    const friend = new User();
    user.addFriend(friend);
    const expectedTripList = [new Trip()];
    const tripService = new TripServiceMock(friend, expectedTripList);
    
    const tripList = tripService.getTripsByUser(user);

    expect(tripList).toEqual(expectedTripList);
  });

  it("should return a empty trip list if the logged user is not a friend of the user", () => {
    const user = new User();
    const friend = new User();
    user.addFriend(friend);
    const loggedUser = new User();
    const emptyTripList = [];
    const tripService = new TripServiceMock(loggedUser, emptyTripList);

    const tripList = tripService.getTripsByUser(user);

    expect(tripList).toEqual(emptyTripList);
  });
});
