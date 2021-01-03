import { SMALL, MEDIUM, LARGE } from '../utilities/graphics/map';
import { semantics } from '../utilities/dictionary/map';

/**
 * Graphics widget.
 * @extends HTMLElement
 */
class Graphics extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback () {
    this.validator();
  }

  static get observedAttributes() {
    return [ 'expanded', 'color', 'background', 'size', 'border', 'font', 'shadow' ];
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  /**
   * Get expanded flag.
   * @return {boolean} Expanded flag
   */
  get expanded () {
    return this.hasAttribute('expanded');
  }
  /**
   * Set expanded flag.
   * @param {boolean} expanded Expanded flag
   */
  set expanded (expanded) {
    this.setAttribute('expanded', expanded);
  }

  /**
   * Get text color.
   * @return {string} Text color
   */
  get color () {
    return this.getAttribute('color');
  }
  /**
   * Set text color.
   * @param {string} color Text color
   */
  set color (color) {
    this.setAttribute('color', color);
  }

  /**
   * Get background color.
   * @return {string} Background color
   */
  get background () {
    return this.getAttribute('background');
  }
  /**
   * Set background color.
   * @param {string} background Background color
   */
  set background (background) {
    this.setAttribute('background', background);
  }

  /**
   * Get element size.
   * @return {string} Element size
   */
  get size () {
    return this.getAttribute('size');
  }
  /**
   * Set element size.
   * @param {string} size Element size
   */
  set size (size) {
    this.setAttribute('size', size);
  }

  /**
   * Get element border.
   * @return {string} Element border
   */
  get border () {
    return this.getAttribute('border');
  }
  /**
   * Set element border.
   * @param {string} border Element border
   */
  set border (border) {
    this.setAttribute('border', border);
  }

  /**
   * Get element font.
   * @return {string} Element font
   */
  get font () {
    return this.getAttribute('font');
  }
  /**
   * Set element font.
   * @param {string} font Element font
   */
  set font (font) {
    this.setAttribute('font', font);
  }

  /**
   * Get element shadow.
   * @return {string} Element shadow
   */
  get shadow () {
    return this.getAttribute('shadow');
  }
  /**
   * Set element shadow.
   * @param {string} shadow Element shadow
   */
  set shadow (shadow) {
    this.setAttribute('shadow', shadow);
  }

  /**
   * Get semantics target.
   * @return {string} Element shadow
   */
  get target () {
    return this.getAttribute('target');
  }
  /**
   * Set semantics target.
   * @param {string} target Semantics target
   */
  set target (target) {
    this.setAttribute('target', target);
  }

  /**
   * Graphics attributes validator.
   * @method
   * @memberof Graphics
   */
  validator () {
    const hasValidSize = this.size ? this.size === SMALL || this.size === LARGE || this.size === MEDIUM : true;
    const hasValidTarget = this.target ? semantics.includes(this.target) : true;
    const isValidComponent = hasValidSize && hasValidTarget;

    if (isValidComponent) {
      return true;
    }

    throw new Error('Invalid graphic attributes.');
  }
}

export default Graphics;
