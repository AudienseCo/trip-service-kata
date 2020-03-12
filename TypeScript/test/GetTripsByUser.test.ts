import "jest";
import { TripDAOMock } from "../__mocks__/TripDAOMock";
import { UserSessionMock } from "../__mocks__/UserSessionMock";
import {GetTripsByUser} from "../src/application/GetTripsByUser";
import userNotLoggedInException from "../src/domain/exception/UserNotLoggedInException";
import Trip from "../src/domain/Trip";
import User from "../src/domain/User";

const userSessionReturnNull = new UserSessionMock(null);
const tripDAOReturnEmpty = new TripDAOMock([]);
const loggedUser = new User();
const userSessionReturnLoggedUser = new UserSessionMock(loggedUser);

describe("GetTripsByUser", () => {
  it("should throw an exception if the user is not logged.", () => {
    const user = new User();
    const getTripsByUser = new GetTripsByUser(
      userSessionReturnNull,
      tripDAOReturnEmpty,
    );

    expect(() => {
      getTripsByUser.run(user);
    }).toThrow(userNotLoggedInException);
  });

  it("should return the empty trip list if the user does not have friends", () => {
    const user = new User();
    const expectedTripList = [];

    const getTripsByUser = new GetTripsByUser(
      userSessionReturnLoggedUser,
      tripDAOReturnEmpty,
    );

    const tripList = getTripsByUser.run(user);

    expect(tripList).toEqual(expectedTripList);
  });

  it("should return the trip list if the user is a friend of the logged user", () => {
    const user = new User();
    user.addFriend(loggedUser);
    const expectedTripList = [new Trip()];

    const getTripsByUser = new GetTripsByUser(
      new UserSessionMock(loggedUser),
      new TripDAOMock(expectedTripList),
    );

    const tripList = getTripsByUser.run(user);

    expect(tripList).toEqual(expectedTripList);
  });

  it("should return a empty trip list if the logged user is not a friend of the user", () => {
    const user = new User();
    const friend = new User();
    user.addFriend(friend);
    const emptyTripList = [];
    const getTripsByUser = new GetTripsByUser(
      userSessionReturnLoggedUser,
      tripDAOReturnEmpty,
    );

    const tripList = getTripsByUser.run(user);

    expect(tripList).toEqual(emptyTripList);
  });
});
