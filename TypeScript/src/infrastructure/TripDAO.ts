import CollaboratorCallException from "../domain/exception/CollaboratorCallException";
import { ITripRepository } from "../domain/ITripRepository";
import Trip from "../domain/Trip";
import User from "../domain/User";

export default class TripDAO implements ITripRepository {
  public findTripsByUser(user: User): Trip[] {
    throw new CollaboratorCallException(
      "TripDAO should not be invoked on an unit test."
    );
  }
}
