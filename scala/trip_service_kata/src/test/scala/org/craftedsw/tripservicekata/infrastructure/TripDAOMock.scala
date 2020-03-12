package org.craftedsw.tripservicekata.infrastructure

import org.craftedsw.tripservicekata.trip.{Trip, TripDAOTrait}
import org.craftedsw.tripservicekata.user.User

object TripDAOMock extends TripDAOTrait {
  override def findTripsByUser(user: User): List[Trip] = {
    user.tripList.toList
  }
}
