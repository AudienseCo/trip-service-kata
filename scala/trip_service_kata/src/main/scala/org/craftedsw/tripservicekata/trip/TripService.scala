package org.craftedsw.tripservicekata.trip

import org.craftedsw.tripservicekata.exception.UserNotLoggedInException
import org.craftedsw.tripservicekata.user.{Session, User}

import scala.util.control.Breaks._

class TripService(tripDao: TripDAOTrait, session: Session) {

  def getTripsByUser(myUser: User): List[Trip] = {
      session getLoggedUser() match {
      case None => throw new UserNotLoggedInException
      case Some(anotherUser) => getTripsCheckingFriendship(myUser, anotherUser)
    }
  }

  private def getTripsCheckingFriendship(myUser: User, anotherUser: User) = {
    if (myUser.isFriendOf(anotherUser)) tripDao.findTripsByUser(myUser)
    else List()
  }
}
