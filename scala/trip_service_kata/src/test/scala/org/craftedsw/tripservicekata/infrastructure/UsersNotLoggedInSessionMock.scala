package org.craftedsw.tripservicekata.infrastructure

import org.craftedsw.tripservicekata.user.{Session, User}

object UsersNotLoggedInSessionMock extends Session {
  override def getLoggedUser(): Option[User] = {
    None
  }
}
