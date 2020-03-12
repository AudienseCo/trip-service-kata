package org.craftedsw.tripservicekata.trip

import org.craftedsw.tripservicekata.exception.UserNotLoggedInException
import org.craftedsw.tripservicekata.user.{User, UserSession}

import scala.util.control.Breaks._

class TripService(tripDao: TripDAOTrait, session: UserSession.type) {

  def getTripsByUser(user: User): List[Trip] = {
    var tripList: List[Trip] = List()
//    val loggedInUser = session getLoggedUser ()
    val loggedInUser = session getLoggedUser ()

    var isFriend = false
    if (loggedInUser != null) {
      breakable {
        for (friend <- user.friends()) {
          if (friend == loggedInUser) {
            isFriend = true
            break
          }
        }
      }
      if (isFriend) {
        tripList = tripDao.findTripsByUser(user)
      }
      tripList
    } else {
      throw new UserNotLoggedInException
    }
  }
}
