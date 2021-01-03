import Artyom from 'artyom.js';

import { 
    createCommand, 
    executeCommand,
    status
} from './map';
import createFeedbackObject from './utils';

const vocalInstance = new Artyom();

//TODO: remove this, it is only for debug purpose
window.artyom = vocalInstance;
//artyom.simulateInstruction('...');

/**
 * Add command based on parameters.
 * 
 * @param {string} event HTML DOM event
 * @param {string} keyword Trigger word
 * @param {string} ref Attribute "element" in the widget
 * @param {string} semantics Semantics component type in the widget
 * @param {string} element HTML event
 */
const addKeyword = (event, keyword, ref, semantics, element) => {
    const { command, isSmart } = createCommand(keyword, ref, semantics, element);
    
    vocalInstance.on([ command ], isSmart).then((i, wildcard) => {
        if (!element.hasAttribute('disabled') && !element.hasAttribute('readonly')) {
            executeCommand(event, wildcard, element);
        }
    });
};

/**
 * Artyom initialization.
 */
vocalInstance.initialize({
    lang: "en-GB", // GreatBritain english
    continuous: true, // Listen forever
    soundex: true,// Use the soundex algorithm to increase accuracy
    listen: true, // Start to listen commands !
}).then(() => {
    createFeedbackObject(status['READY']);
}).catch((err) => {
    createFeedbackObject(status['ERROR']);
});

/**
 * Vocal feedbacks based on Artyom events.
 */
/*vocalInstance.when('ERROR', (error) => {
    console.log(error);
    
    const vocalFeedback = document.querySelector('#vocal-feedback');
    vocalFeedback && document.body.removeChild(vocalFeedback);

    createFeedbackObject(status['ERROR']);
});*/
vocalInstance.when('COMMAND_RECOGNITION_START', () => {
    setTimeout(() => {
        const vocalFeedback = document.querySelector('#vocal-feedback');
        vocalFeedback && document.body.removeChild(vocalFeedback);
        createFeedbackObject(status['READY']);
    }, 10000);
});
vocalInstance.when('TEXT_RECOGNIZED', () => {
    const vocalFeedback = document.querySelector('#vocal-feedback');
    vocalFeedback && document.body.removeChild(vocalFeedback);

    createFeedbackObject(status['LISTENING']);
});
vocalInstance.when('COMMAND_MATCHED', () => {
    const vocalFeedback = document.querySelector('#vocal-feedback');
    vocalFeedback && document.body.removeChild(vocalFeedback);

    createFeedbackObject(status['MATCHED']);
});
vocalInstance.when('NOT_COMMAND_MATCHED', () => {
    const vocalFeedback = document.querySelector('#vocal-feedback');
    vocalFeedback && document.body.removeChild(vocalFeedback);

    createFeedbackObject(status['NOT_MATCHED']);
});

export {
    vocalInstance,
    addKeyword
};
