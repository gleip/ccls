export abstract class BaseEntity<D = Object> {
  abstract getView(): D;
}
