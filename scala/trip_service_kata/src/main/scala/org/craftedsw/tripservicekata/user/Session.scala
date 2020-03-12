package org.craftedsw.tripservicekata.user
import org.craftedsw.tripservicekata.exception.CollaboratorCallException

trait Session {

  def getLoggedUser(): User = {
    throw new CollaboratorCallException(
      "UserSession.getLoggedUser() should not be called in an unit test"
    );
  }
}
