import { Widget, Semantics, Vocal, Graphics } from './components';

document.addEventListener('DOMContentLoaded', () => {
    customElements.define('widget-container', Widget);
    customElements.define('widget-semantic', Semantics);
    customElements.define('widget-vocal', Vocal);
    customElements.define('widget-graphic', Graphics);
});