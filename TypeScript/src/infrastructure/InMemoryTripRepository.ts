import { ITripRepository } from "../domain/ITripRepository";
import Trip from "../domain/Trip";
import User from "../domain/User";
import CollaboratorCallException from "./CollaboratorCallException";

export class InMemoryTripRepository implements ITripRepository {
  public findTripsByUser(user: User): Trip[] {
    throw new CollaboratorCallException(
      "TripDAO should not be invoked on an unit test.",
    );
  }
}
