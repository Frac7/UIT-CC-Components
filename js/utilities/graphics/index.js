import * as graphicComponents from './map';

/**
 * Map parameters to CSS property.
 * 
 * @param {string} graphicComponent Property of graphic component
 * @param {string} value Value specified in the graphic component
 * @param {string} target HTML tag
 */
const getTranslatedCSSPropery = (graphicComponent, value, target) => {
    switch (graphicComponent) {
        case graphicComponents.SIZE:
            const factor = graphicComponents.scaleValues[value];
            return `padding: ${factor}em`;
        case graphicComponents.SHADOW:
            return `${graphicComponents.getShadowProperty(target)}: ${value};`;
        case graphicComponents.COLOR:
        case graphicComponents.BACKGROUND:
        case graphicComponents.BORDER:
        case graphicComponents.FONT:
            return `${graphicComponent}: ${value}`;
        default:
            throw new Error('Invalid graphics.');
    };
};

export default getTranslatedCSSPropery;