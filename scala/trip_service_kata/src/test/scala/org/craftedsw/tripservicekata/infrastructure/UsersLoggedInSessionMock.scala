package org.craftedsw.tripservicekata.infrastructure

import org.craftedsw.tripservicekata.user.{Session, User}

object UsersLoggedInSessionMock extends Session {
  private val user = new User()
  override def getLoggedUser(): Option[User] = {
    Some(user)
  }
}
