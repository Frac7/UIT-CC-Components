import * as prototypes from './prototypes';
import { SINGLE_CHOICE, SELECTION_CHOICE, DATA_ACQUISITION, NAVIGATION, LABEL, OPTION } from './map';

/**
 * Dictionary with library prototypes used after components validation.
 * @function
 * @param {object} param0 Attributes for choosing the correct prototype
 * @param {string} param0.type Button type/input type
 * @param {boolean} param0.expanded Flag for compact or expanded view
 * @param {boolean} param0.multiple Flag for multiple or single choice, both compact and expanded
 * @param {string} param0.to Link "to" for navigating
 * @param {string} param0.value Value for expanded choice/option in case of compact choice (both multiple and single)
 * @param {string} param0.text Label text
 * @param {string} param0.element Reference to the element (e.g. label "for" attribute)
 * @param {boolean} param0.disabled Disabled flag
 * @param {boolean} param0.checked Checked flag
 * @param {boolean} param0.required Required flag
 * @param {boolean} param0.readonly Readonly flag
 * @param {boolean} param0.selected Selected flag
 * @param {string} param0.name Name attribute
 */
const dictionary = (semantics, { type, expanded, multiple, to, value, text, element, disabled, checked, required, readonly, selected, name }) => {
    //Before this function call, the validator has already checked the parameters provided by the user via html
    switch(semantics) {
        case SINGLE_CHOICE: 
            return new prototypes.SingleChoice({ type, text, disabled, value, name, element });
        case SELECTION_CHOICE: 
            return new prototypes.SelectionChoice({ expanded, multiple, element, value, disabled, checked, required, name });
        case DATA_ACQUISITION: 
            return new prototypes.DataAcquisition({ type, expanded, element, disabled, required, readonly, value, name });
        case NAVIGATION: 
            return new prototypes.Navigation({ to, text, element });
        case LABEL: 
            return new prototypes.Label({ text, element });
        case OPTION: 
            return new prototypes.Option({ value, text, disabled, selected });
        default:
            throw new Error('Invalid semantics.');
    };
};

export default dictionary;
