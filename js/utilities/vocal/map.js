import { SINGLE_CHOICE, NAVIGATION, DATA_ACQUISITION, SELECTION_CHOICE } from '../dictionary/map';
import { vocalInstance } from '../vocal';

const events = [
    'blur',
    'change',
    'click',
    'focus',
    'input',
    'clean',
    'open'
];

/**
 * Map parameters to vocal command.
 * 
 * @param {string} keyword Command trigger
 * @param {string} ref Element reference
 * @param {string} semantics Referred element semantics
 * @param {string} element HTML Element
 */
const createCommand = (keyword, ref = '', semantics, element) => {
    switch (semantics) {
        case SINGLE_CHOICE:
        case NAVIGATION:
            return {
                command: `${keyword} ${ref}`,
                isSmart: false
            };
        case DATA_ACQUISITION:
            return {
                command: `${keyword} * in ${ref}`,
                isSmart: true
            };
        case SELECTION_CHOICE:
            if (element.type === 'checkbox' || element.type === 'radio') {
                return {
                    command: `${keyword} ${ref}`,
                    isSmart: false
                };
            } else {
                return {
                    command: `${keyword} * from ${ref}`,
                    isSmart: true
                };
            }
        default:
            throw new Error('Invalid semantics.');
    };
};

/**
 * Map parameters to command to execute
 * @param {string} event Event to emit
 * @param {string} wildcard Option/text pronounced by the user
 * @param {string} element HTML Element
 */
const executeCommand = (event, wildcard, element) => {
    switch (event) {
        case 'open':
            vocalInstance.say(`You can select... ${[...element.options].reduce((accumulator, option) => accumulator + '..., ' + option.value, '')}.`);
            break;
        case 'click':
            element.click();
            break;
        case 'blur':
            element.blur();
            break;
        case 'focus':
            element.focus();
            break;
        case 'change':
        case 'input':
            console.log(element)
            if (element.type === 'text' || element.tagName.toLowerCase() === 'textarea') {
                element.value = wildcard;
            } else if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = !element.checked;
            } else {
                //mapping options/labels
                const mapping = [...element.options].reduce((accumulator, option) => ({
                    ...accumulator,
                    [option.innerText.toLowerCase()]: option.value
                }), {});

                element.value = mapping[wildcard];
            }
            element.dispatchEvent(new Event(event));
            break;
        case 'clean':
            element.value = '';
            element.dispatchEvent(new Event(event));
            break;
        default:
            throw new Error('Invalid event.');
    };
};

const READY = {
    text: 'Ready!',
};
const LISTENING = {
    text: 'Listening...',
    status:
        `<svg height="24" width="24">
            <circle cx="12" cy="12" r="6" fill="red" />
        </svg>`
};
const MATCHED = {
    text: 'Command matched!',
    status:
        `<svg height="24" width="24">
            <line x1="4" y1="12" x2="8" y2="20" stroke="green" stroke-width="3" stroke-linecap="round"></line>
            <line x1="20" y1="4" x2="8" y2="20" stroke="green" stroke-width="3" stroke-linecap="round"></line>
        </svg>`
};
const NOT_MATCHED = {
    text: 'Command not matched.',
    status:
        `<svg height="24" width="24">
            <line x1="4" y1="4" x2="20" y2="20" stroke="red" stroke-width="3" stroke-linecap="round"></line>
            <line x1="20" y1="4" x2="4" y2="20" stroke="red" stroke-width="3" stroke-linecap="round"></line>
        </svg>`
};
const ERROR = {
    text: 'Voice commands not available.',
    status:
        `<svg height="24" width="24">
            <line x1="12" y1="4" x2="12" y2="16" stroke="red" stroke-width="3" stroke-linecap="round"></line>
            <line x1="12" y1="22" x2="12" y2="22" stroke="red" stroke-width="3" stroke-linecap="round"></line>
        </svg>`
}

/**
 * Vocal commands recognition status
 * @constant
 */
const status = {
    READY,
    LISTENING,
    MATCHED,
    NOT_MATCHED,
    ERROR
}

export {
    createCommand,
    executeCommand,
    status,
    events
};