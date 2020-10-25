export default class SearchStatus {
  constructor({container, props}) {
    this.container = container;
    this.props = props;
  }

  open() {
    this.container.classList.remove(this.props.disabled);
  }

  close() {
    this.container.classList.add(this.props.disabled);
  }
}
