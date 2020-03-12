import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import { UserSession } from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
  constructor(private userSession: UserSession, private tripDAO: TripDAO) {}

  public getTripsByUser(user: User): Trip[] {
    const loggedUser = this.getLoggedUsers();

    if (loggedUser == null) {
      throw new UserNotLoggedInException();
    }

    return this.getTripList(user, loggedUser);
  }

  protected findUserTrips(user: User): Trip[] {
    return this.tripDAO.findTripsByUser(user);
  }

  protected getLoggedUsers(): User {
    return this.userSession.getLoggedUser();
  }

  private getTripList(user: User, loggedUser: User) {
    const isFriend = user.isFriend(loggedUser);
    if (isFriend) {
      return this.findUserTrips(user);
    }
    return [];
  }
}
