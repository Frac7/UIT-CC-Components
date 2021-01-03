import { events } from '../utilities/vocal/map';

/**
 * Vocal widget.
 */
class Vocal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback () {
    this.validator();
  }

  static get observedAttributes() {
    return [ 'event', 'keyword' ];
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  /**
   * Get the event to trigger.
   * @returns {string} Event
   */
  get event () {
    return this.getAttribute('event');
  }
  /**
   * Set the event to trigger.
   * @param {string} event Event
   */
  set event (event) {
    this.setAttribute('event', event);
  }

  /**
   * Get the keyowrd for triggering the event.
   * @returns {string} Keyword
   */
  get keyword () {
    return this.getAttribute('keyword');
  }
  /**
   * Set the keyowrd for triggering the event.
   * @param {string} keyword Keyword
   */
  set keyword (keyword) {
    this.setAttribute('keyword', keyword);
  }

  /**
   * Vocal attributes validator.
   * @method
   * @memberof Vocal
   */
  validator () {
    const isValidEvent = events.includes(this.event);
    if (isValidEvent && typeof this.keyword === 'string') {
        return true;
    }

    throw new Error('Invalid "event" and "keyword" attributes.');
  }
}

export default Vocal;