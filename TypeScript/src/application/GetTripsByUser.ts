import UserNotLoggedInException from "../domain/exception/UserNotLoggedInException";
import { ITripRepository } from "../domain/ITripRepository";
import { IUserSessionService } from "../domain/IUserSessionService";
import Trip from "../domain/Trip";
import User from "../domain/User";

export class GetTripsByUser {
  constructor(private userSession: IUserSessionService, private tripRepository: ITripRepository) {}

  public run(user: User): Trip[] {
    const loggedUser = this.getLoggedUsers();

    if (loggedUser == null) {
      throw new UserNotLoggedInException();
    }

    return this.getTripList(user, loggedUser);
  }

  private findUserTrips(user: User): Trip[] {
    return this.tripRepository.findTripsByUser(user);
  }

  private getLoggedUsers(): User {
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
