import Trip from "./Trip";
import User from "./User";

export interface ITripRepository {
  findTripsByUser(user: User): Trip[];
}
