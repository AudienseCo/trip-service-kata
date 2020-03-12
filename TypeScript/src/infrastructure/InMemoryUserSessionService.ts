import CollaboratorCallException from "../domain/exception/CollaboratorCallException";
import { IUserSessionService } from "../domain/IUserSessionService";
import User from "../domain/User";

export class InMemoryUserSessionService implements IUserSessionService {
  public getLoggedUser(): User {
    throw new CollaboratorCallException(
      "UserSession.getLoggedUser() should not be called in an unit test"
    );
  }
}
