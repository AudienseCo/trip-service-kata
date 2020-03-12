package org.craftedsw.tripservicekata.user

import org.craftedsw.tripservicekata.infrastructure.UnitSpec

class UserSpec extends UnitSpec {


  "User" should "check if another user is friend" in {
    val myUser = new User()
    val anotherUser = new User()
    myUser.addFriend(anotherUser)

    assert(myUser.isFriendOf(anotherUser))
  }

  "User" should "check if another user is not friend" in {
    val myUser = new User()
    val anotherUser = new User()
    assert(!myUser.isFriendOf(anotherUser))
  }
}
