import { IUserSessionService } from "../src/domain/IUserSessionService";
import User from "../src/domain/User";

export class UserSessionMock implements IUserSessionService {
  constructor(private loggedUser: User) {
  }
  public getLoggedUser() {
    return this.loggedUser;
  }
}
