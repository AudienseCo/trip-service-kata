import User from "./User";

export interface IUserSessionService {
  getLoggedUser(): User;
}
