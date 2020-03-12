import User from "../src/user/User";
import { UserSession } from "../src/user/UserSession";
export class UserSessionMock extends UserSession {
    constructor(private loggedUser: User) {
        super();
    }
    public getLoggedUser() {
        return this.loggedUser;
    }
}
