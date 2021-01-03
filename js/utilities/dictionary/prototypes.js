//This file contains semantics prototypes according to our abstract definition
//These prototypes can be used by the validator function
//to return an object containing the tag and attributes based on the input semantics

/**
 * Base prototype having the HTML tag property.
 * @constructor
 * @param {object} pram0 Base element parameters
 * @param {string} param0.tag HTML tag
 * @param {boolean} param0.disabled Disabled flag
 */
function BaseElement ({ tag, disabled }) {
    this.tag = tag;
    this.disabled = disabled;
};

/**
 * SingleChoice prototype represents the button element.
 * This prototype uses the composition pattern (BaseElement prototype).
 * @constructor
 * @param {object} param0 SingleChoice parameters for tag name and button type 
 * @param {string} param0.tag HTML tag
 * @param {string} param0.type Button type
 * @param {string} param0.text Button label
 * @param {boolean} param0.disabled Disabled flag
 * @param {string} param0.value Value attribute
 * @param {string} param0.name Name attribute
 * @param {string} param0.element Element ID
 */
function SingleChoice ({ tag = 'button', type = 'submit', text, disabled, value, name, element }) {
    //Single choice is button tag. The type attribute is implicitly "submit", but it can be also "reset" or "button".
    BaseElement.call(this, { tag, disabled: Boolean(disabled) }); //a kind of composition: with or without BaseElement extension, SingleChoice has the tag attribute

    this.type = type;
    this.innerText = text;

    if (value) {
        this.value = value;
    }

    if (element) {
        this.id = element;
    }
    if (name) {
        this.name = name;
    }
};

/**
 * SelectionChoice prototype represet each kind of selection, such as single and multiple select and checkbox and radio button.
 * This prototype uses the composition pattern (BaseElement prototype).
 * @constructor
 * @param {object} param0 SelectionChoice parameters
 * @param {boolean} param0.expanded Expanded flag for compact or expanded widget
 * @param {boolean} param0.multiple Multiple or single flag for selection choice (select/multiselect for compact parameter true, radio/checkbox for compact parameter false)
 * @param {string} param0.element Identifier
 * @param {boolean} param0.checked Checked flag
 * @param {boolean} param0.disabled Disabled flag
 * @param {boolean} param0.required Required flag
 * @param {string} param0.name Name attribute
 */
function SelectionChoice ({ expanded, multiple, element, value, checked, disabled, required, name }) {
    const tag = expanded? 'input' : 'select';

    BaseElement.call(this, { tag, disabled: Boolean(disabled) });

    if (expanded && multiple) {
        this.type = 'checkbox'; //type attribute in input
        this.checked = Boolean(checked);
    }

    if (expanded && !multiple) {
        this.type = 'radio'; //type attribute in input
        this.value = value;
    }
    
    if (!expanded && multiple) {
        this.multiple = true; //multiple attribute in select
    }

    this.required = Boolean(required);

    if (element) {
        this.id = element;
    }
    if (name) {
        this.name = name;
    }
};

/**
 * Prototype for data acquisition, such as number, color, date, datetime.
 * This prototype uses composition (BaseElement prototype).
 * @constructor
 * @param {object} param0 DataAcquisition parameters
 * @param {string} param0.type Data type to acquire
 * @param {boolean} param0.expanded Expanded flag for choosing between input or textarea
 * @param {string} param0.element Identifier
 * @param {boolean} param0.disabled Disabled flag
 * @param {boolean} param0.required Required flag
 * @param {boolean} param0.readonly Readonly flag
 * @param {string} param0.value Value attribute
 * @param {string} param0.name Name attribute
 */
function DataAcquisition ({ type = 'text', expanded, element, disabled, required, readonly, value, name }) {
    let tag = 'textarea';

    if(!expanded) {
        tag = 'input';
        this.type = type;
    }

    if (value) {
        this.value = value;
    }

    this.required = Boolean(required);
    this.readOnly = Boolean(readonly);

    BaseElement.call(this, { tag, disabled: Boolean(disabled) });

    if (element) {
        this.id = element;
    }
    if (name) {
        this.name = name;
    }
};

/**
 * Prototype for navigation.
 * This prototype uses composition (BaseElement prototype).
 * @constructor
 * @param {object} param0 Navigation semantics parameters
 * @param {string} param0.to Link for navigation
 * @param {string} param0.text Link label
 * @param {string} param0.element Element ID
 */
function Navigation ({ to, text, element }) {
    BaseElement.call(this, { tag: 'a' });

    this.href = to;
    this.innerText = text

    if (element) {
        this.id = element;
    }
};

/**
 * Prototype for label, used for SingleChoice, SelectionChoice, DataAcquisition, Navigation.
 * @constructor
 * @param {object} param0 Label parameters
 * @param {string} param0.text Label content
 * @param {string} param0.element Element identifier
 */
function Label ({ text, element }) {
    BaseElement.call(this, { tag: 'label' });

    this.innerText = text;
    this.htmlFor = element;
};

/**
 * Prototype for single option, used for SelectionChoice.
 * @constructor
 * @param {object} param0 Option parameter
 * @param {string} param0.value Option value, used also as label
 * @param {string} param0.text Label content
 * @param {boolean} param0.disabled Disabled flag
 * @param {boolean} param0.selected Selected flag
 */
function Option ({ value, text, disabled, selected }) {
    BaseElement.call(this, { tag: 'option', disabled: Boolean(disabled) });

    this.selected = Boolean(selected);
    this.value = value;
    this.innerText = text;
};

export {
    SingleChoice,
    SelectionChoice,
    DataAcquisition,
    Navigation,
    Label,
    Option
};
