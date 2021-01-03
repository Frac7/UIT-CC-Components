import { singleChoiceTypes, dataAcquisitionTypes, semantics, SINGLE_CHOICE, DATA_ACQUISITION, SELECTION_CHOICE, NAVIGATION, OPTION, LABEL } from '../utilities/dictionary/map';

/**
 * Semantics widget.
 * @extends HTMLElement
 */
class Semantics extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.validator();
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  /**
   * Get semantics type.
   * @return {string} Semantics type
   */
  get semantics () {
    return this.getAttribute('semantics');
  }
  /**
   * Set semantics type.
   * @param {string} semantics Semantics type
   */
  set semantics (semantics) {
    this.setAttribute('semantics', semantics);
  }
  
  /**
   * Get single choice/data acquisition type.
   * @return {string} Type
   */
  get type () {
    return this.getAttribute('type');
  }
  /**
   * Set single choice/data acquisition type.
   * @param {string} type Type
   */
  set type (type) {
    this.setAttribute('type', type);
  }
  
  /**
   * Get multiple flag for selection choice.
   * @return {boolean} Multiple flag
   */
  get multiple () {
    return this.hasAttribute('multiple');
  }
  /**
   * Set multiple flag for selection choice.
   * @param {boolean} multiple Multiple flag
   */
  set multiple (multiple) {
    this.setAttribute('multiple', multiple);
  }

  /**
   * Get link for navigating.
   * @return {string} Link
   */
  get to () {
    return this.getAttribute('to');
  }
  /**
   * Set link for navigating.
   * @param {string} to Link
   */
  set to (to) {
    this.setAttribute('to', to);
  }

  /**
   * Get label text.
   * @return {string} Label text
   */
  get text () {
    return this.getAttribute('text');
  }
  /**
   * Set label text.
   * @param {string} text Label text
   */
  set text (text) {
    this.setAttribute('text', text);
  }

  /**
   * Get element reference.
   * @return {string} Element reference
   */
  get element () {
    return this.getAttribute('element');
  }
  /**
   * Set element reference.
   * @param {string} element Element reference
   */
  set element (element) {
    this.setAttribute('element', element);
  }

  /**
   * Get element value.
   * @return {string} Element value
   */
  get value () {
    return this.getAttribute('value');
  }
  /**
   * Set element value.
   * @param {string} value Element reference
   */
  set value (value) {
    this.setAttribute('value', value);
  }

  /**
 * Semantics attributes validator.
 * @method
 * @memberof Semantics
 */
  validator() {
    const semanticsAttrError = (attrs) => `This type of semantics can only have: ${attrs} attribute(s).`;

    const isValidSemantics = semantics.includes(this.semantics);
    if (!isValidSemantics) {
      throw new Error('Incorrect "semantics" attribute.');
    }

    const hasTypeAttr = this.type && !this.to && !this.text && !this.multiple; //could have element and must have semantics

    const isSingleChoice = singleChoiceTypes.includes(this.type) && this.semantics === SINGLE_CHOICE; //button types
    const isDataAcquisition = dataAcquisitionTypes.includes(this.type) && this.semantics && DATA_ACQUISITION; //input types

    if (hasTypeAttr && (isSingleChoice || isDataAcquisition)) {
      return true;
    } else if (this.type && !hasTypeAttr) {
      throw new Error(semanticsAttrError('"type", "semantics", "element", "value"'));
    } else if (hasTypeAttr && (!isSingleChoice && !isDataAcquisition)) {
      throw new Error('Incorrect "type" attribute.');
    }

    const isSelectionChoice = this.element && !this.type && !this.to && !this.text; //all the selection choice types must have element (for label and option) and could have value
    if (isSelectionChoice && this.semantics === SELECTION_CHOICE) {
      return true;
    } else if (this.semantics === SELECTION_CHOICE) {
      throw new Error(semanticsAttrError('"multiple", "semantics", "element"'));
    }

    const isNavigation = this.to && !this.type && !this.value && !this.text && !this.multiple; //could have element and must have semantics
    if (isNavigation && this.semantics === NAVIGATION) {
      return true;
    } else if (this.to) {
      throw new Error(semanticsAttrError('"to", "semantics", "element"'));
    }

    const labelOrOption = !this.type && !this.to && !this.multiple && 
      ((this.text && !this.value && this.semantics === LABEL) || (this.value && !this.text && this.element && this.semantics === OPTION)); //label could not have element attr 
    if (labelOrOption) {
      return true;
    } else if (this.element || labelOrOption) {
      throw new Error(semanticsAttrError('"element", "text"/"value", "semantics"'));
    }

    throw new Error('Invalid semantic attributes.');
  }

  static get observedAttributes() {
    return [ 
      'semantics', 
      'type', 
      'multiple',
      'text',
      'to',
      'element',
      'value'
    ];
  }
}

export default Semantics;
