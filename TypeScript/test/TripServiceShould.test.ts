import "jest";
import userNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import { TripDAOMock } from "../__mocks__/TripDAOMock";
import { UserSessionMock } from "../__mocks__/UserSessionMock";

const userSessionReturnNull = new UserSessionMock(null);
const tripDAOReturnEmpty = new TripDAOMock([]);
const loggedUser = new User();
const userSessionReturnLoggedUser = new UserSessionMock(loggedUser);

describe("TripServiceShould", () => {
  it("should throw an exception if the user is not logged.", () => {
    const user = new User();
    const tripService = new TripService(
      userSessionReturnNull,
      tripDAOReturnEmpty,
    );

    expect(() => {
      tripService.getTripsByUser(user);
    }).toThrow(userNotLoggedInException);
  });

  it("should return the empty trip list if the user does not have friends", () => {
    const user = new User();
    const expectedTripList = [];

    const tripService = new TripService(
      userSessionReturnLoggedUser,
      tripDAOReturnEmpty,
    );

    const tripList = tripService.getTripsByUser(user);

    expect(tripList).toEqual(expectedTripList);
  });

  it("should return the trip list if the user is a friend of the logged user", () => {
    const user = new User();
    user.addFriend(loggedUser);
    const expectedTripList = [new Trip()];

    const tripService = new TripService(
      new UserSessionMock(loggedUser),
      new TripDAOMock(expectedTripList),
    );

    const tripList = tripService.getTripsByUser(user);

    expect(tripList).toEqual(expectedTripList);
  });

  it("should return a empty trip list if the logged user is not a friend of the user", () => {
    const user = new User();
    const friend = new User();
    user.addFriend(friend);
    const emptyTripList = [];
    const tripService = new TripService(
      userSessionReturnLoggedUser,
      tripDAOReturnEmpty,
    );

    const tripList = tripService.getTripsByUser(user);

    expect(tripList).toEqual(emptyTripList);
  });
});
