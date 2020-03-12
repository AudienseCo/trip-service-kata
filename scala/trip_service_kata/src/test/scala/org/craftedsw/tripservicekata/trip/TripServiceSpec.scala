package org.craftedsw.tripservicekata.trip

import org.craftedsw.tripservicekata.exception.UserNotLoggedInException
import org.craftedsw.tripservicekata.infrastructure.{
  TripDAOMock,
  UnitSpec,
  UsersLoggedInSessionMock,
  UsersNotLoggedInSessionMock
}
import org.craftedsw.tripservicekata.user.User

class TripServiceSpec extends UnitSpec {
  "The getTripsByUser" should "return a UserNotLoggedInException if the user is not logged in" in {
    val user = new User()
    val service = new TripService(session = UserSession)
    assertThrows[UserNotLoggedInException] {
      service.getTripsByUser(user)
    }
  }

  "The getTripsByUser" should "return an empty List[Trip] if the given user doens't have any friends" in {
    val user = new User()
    val service = new TripService(session = UserSession)
    val result = service.getTripsByUser(user)
    assert(result == List())
  }

  "The getTripsByUser" should "return an empty List[Trip] if the given user is not friend with the users's session" in {
    val user = new User()
    val friend = new User
    user.addFriend(friend)
    val service = new TripService(session = UserSession)
    val result = service.getTripsByUser(user)
    assert(result == List())
  }
  "The getTripsByUser" should "return the list of trips from a User if the given user is friend with the users's session" in {
    val user = new User()
    val trip = new Trip
    user.addTrip(trip)
    val sessionUser = UsersLoggedInSessionMock
    user.addFriend(sessionUser.getLoggedUser())
    val service = new TripService(session = UserSession)
    val result = service.getTripsByUser(user)
    assert(result == List(trip))
  }
}
