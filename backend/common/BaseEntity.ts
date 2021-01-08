export abstract class BaseEntity<D> {
  abstract serialize(): D;
}
