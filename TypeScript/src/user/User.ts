import Trip from "../trip/Trip";

export default class User {
  private trips: Trip[] = [];
  private friends: User[] = [];

  public getFriends(): User[] {
    return this.friends;
  }

  public addFriend(user: User): void {
    this.friends.push(user);
  }

  public addTrip(trip: Trip): void {
    this.trips.push(trip);
  }

  public getTrips(): Trip[] {
    return this.trips;
  }

  public isFriend(user) {
    for (const friend of this.getFriends()) {
      if (friend === user) {
        return true;
      }
    }

    return false;
  }
}
