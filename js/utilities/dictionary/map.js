/**
 * Widget container
 * @constant
 */
const CONTAINER = 'widget-container';
/**
 * Semantics component
 * @constant
 */
const SEMANTICS = 'widget-semantic';
/**
 * Graphics component
 * @constant
 */
const GRAPHICS = 'widget-graphic';
/**
 * Vocal component
 * @constant
 */
const VOCAL = 'widget-vocal';
/** 
 * Single choice prototype (button)
 * @constant
 */
const SINGLE_CHOICE = 'single-choice';
/** 
 * Selection choice prototype (select, multiselect, checkbox and radio button)
 * @constant
 */
const SELECTION_CHOICE = 'selection-choice';
/** 
 * Data acquisition prototype (each type of input tag + textarea)
 * @constant
 */
const DATA_ACQUISITION = 'data-acquisition';
/** 
 * Navigation prototype (links)
 * @constant
 */
const NAVIGATION = 'navigation';
/** 
 * Label prototype
 * @constant
 */
const LABEL = 'label';
/** 
 * Option prototype (related to each kind of selection choice)
 * @constant
 */
const OPTION = 'option';

const semantics = [ SINGLE_CHOICE, SELECTION_CHOICE, LABEL, OPTION, NAVIGATION, DATA_ACQUISITION ];

const singleChoiceTypes = [ 'submit', 'reset', 'button' ];
const dataAcquisitionTypes = [ 
    'text', 
    'color', 
    'date', 
    'datetime', 
    'datetime-local', 
    'email', 
    'file', 
    'image', 
    'month', 
    'number', 
    'password', 
    'range', 
    'search', 
    'tel', 
    'text', 
    'time', 
    'url', 
    'week'
];

export { 
    CONTAINER,
    SEMANTICS,
    GRAPHICS,
    VOCAL,
    SINGLE_CHOICE, 
    SELECTION_CHOICE, 
    DATA_ACQUISITION, 
    NAVIGATION, 
    LABEL, 
    OPTION,
    semantics,
    singleChoiceTypes,
    dataAcquisitionTypes
};