package org.craftedsw.tripservicekata.trip

import org.craftedsw.tripservicekata.exception.UserNotLoggedInException
import org.craftedsw.tripservicekata.user.{Session, User}

import scala.util.control.Breaks._

class TripService(tripDao: TripDAOTrait, session: Session) {

  def getTripsByUser(user: User): List[Trip] = {
    var tripList: List[Trip] = List()
    val loggedInUser = session getLoggedUser ()

    if (loggedInUser != null) {
      if (user.isFriendOf(loggedInUser)) {
        tripList = tripDao.findTripsByUser(user)
      }
      tripList
    } else {
      throw new UserNotLoggedInException
    }
  }
}
