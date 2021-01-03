/**
 * Creates vocal feedback.
 * 
 * @param {{text: string, status: string}} param0
 * @param {string} param0.text Status text
 * @param {string} param0.status Status icon, HTML string 
 */
const createFeedbackObject = ({ text, status }) => {
    const container = document.createElement('div');

    if (status) {
        container.innerHTML = status;
    }

    const caption = document.createElement('span');
    caption.innerText = text;
    caption.style.verticalAlign = 'super';
    caption.style.fontFamily = 'sans-serif';
    caption.style.fontSize = '1.25rem';

    container.appendChild(caption);

    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.right = '10px';
    container.id = 'vocal-feedback';

    document.body.appendChild(container);
};

export default createFeedbackObject;