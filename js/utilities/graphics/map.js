/**
 * Text color, same as CSS property
 * @constant
 */
const COLOR = 'color';
/**
 * Background color, same as CSS property
 * @constant
 */
const BACKGROUND = 'background';
/**
 * Element size, one of SMALL, MEDIUM, LARGE
 * @constant
 */
const SIZE = 'size';
/**
 * Element border, same as CSS property
 */
const BORDER = 'border';
/**
 * Font
 * @constant
 */
const FONT = 'font';
/**
 * Box shadow
 * @constant
 */
const SHADOW = 'shadow';
/**
 * Size value LARGE
 * @constant
 */
const LARGE = 'large';
/**
 * Size value MEDIUM
 * @constant
 */
const MEDIUM = 'medium';
/**
 * Size value SMALL
 * @constant
 */
const SMALL = 'small';

/**
 * Map for size values
 */
const scaleValues = {
    [SMALL]: 0,
    [MEDIUM]: 0.25,
    [LARGE]: 0.5
};

/**
 * Shadow property translation based on target element.
 * 
 * @param {string} target HTML element tag 
 * @returns {string} Shadow property, one of 'text-shadow', 'box-shadow'
 */
const getShadowProperty = (target) => {
    switch (target) {
        case 'label':
        case 'a':
            return 'text-shadow';
        default:
            return 'box-shadow';
    }
};

export {
    COLOR,
    BACKGROUND,
    SIZE,
    BORDER,
    FONT,
    SHADOW,
    LARGE,
    MEDIUM,
    SMALL,
    scaleValues,
    getShadowProperty
};