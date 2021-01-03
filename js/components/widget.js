import { CONTAINER, SEMANTICS, LABEL, GRAPHICS, VOCAL, OPTION, SINGLE_CHOICE, NAVIGATION, SELECTION_CHOICE, semantics as semanticTypes, DATA_ACQUISITION } from '../utilities/dictionary/map';
import { BACKGROUND, BORDER } from '../utilities/graphics/map';

import dictionary from '../utilities/dictionary';
import getTranslatedCSSProperty from '../utilities/graphics';
import { addKeyword } from '../utilities/vocal';

/**
 * Parent widget.
 * @extends HTMLElement
 */
class Widget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.validator();
    this.createWidget();
  }

  /**
   * Creates widget based on children components
   */
  createWidget () {
    const shadow = this.shadowRoot || this.parentElement.shadowRoot || this.attachShadow({ 'mode': 'open' });

    const children = [...this.children];

    const components = {
      [SEMANTICS]: [],
      [GRAPHICS]: [],
      [VOCAL]: []
    };

    //First collect component name and attributes from each child
    children.forEach((child) => {
      const tagName = child.tagName.toLowerCase();
      if (tagName !== CONTAINER) {
        //These are all the possibile attributes

        //semantics
        const semantics = child.getAttribute('semantics');
        const type = child.getAttribute('type');
        const multiple = child.hasAttribute('multiple');
        const to = child.getAttribute('to');
        const value = child.getAttribute('value');
        const text = child.getAttribute('text');
        const element = child.getAttribute('element');

        //graphics
        const expanded = child.hasAttribute('expanded');
        const color = child.getAttribute('color');
        const background = child.getAttribute('background');
        const size = child.getAttribute('size');
        const border = child.getAttribute('border');
        const font = child.getAttribute('font');
        const shadow = child.getAttribute('shadow');
        const target = child.getAttribute('target');

        //vocal
        const event = child.getAttribute('event');
        const keyword = child.getAttribute('keyword');

        //DOM default flags (validated by default from the DOM)
        const disabled = child.hasAttribute('disabled');
        const checked = child.hasAttribute('checked');
        const required = child.hasAttribute('required');
        const readonly = child.hasAttribute('readonly');
        const selected = child.hasAttribute('selected');

        components[tagName].push(Object.assign({}, 
          semantics && { semantics },
          type && { type },
          multiple && { multiple },
          to && { to },
          value && { value },
          text && { text },
          element && { element },
          expanded && { expanded },
          target && { target },
          event && { event },
          keyword && { keyword },
          disabled && { disabled },
          checked && { checked },
          required && { required },
          readonly && { readonly },
          selected && { selected },
          {
            style: Object.assign({}, 
              color && { color },
              background && { background },
              size && { size },
              border && { border },
              font && { font },
              shadow && { shadow }
            )
          })
        );
      }
    });
    
    //Then create prototypes combining children and using dictionary
    const widget = components[SEMANTICS].reduce((accumulator, { semantics, ...attrs }) => ({ //reducer
      semantics: [ ...accumulator.semantics, ...[ semantics ]], 
      attrs: { ...accumulator.attrs, ...attrs }
    }), { //accumulator
        semantics: [],
        attrs: {}
      }
    );

    if (widget.semantics.length > 1) {
      if (widget.semantics.includes(LABEL) && 
        (widget.semantics.includes(OPTION) || widget.semantics.includes(SINGLE_CHOICE) || widget.semantics.includes(NAVIGATION))) {
        //Label is inner text
        widget.semantics = [widget.semantics[widget.semantics.length - widget.semantics.indexOf(LABEL) - 1]];
      }
    }

    //This step adds graphics (both style (and eventually target) attributes and expanded attribute, used for dictionary)
    const graphics = components[GRAPHICS].reduce((accumulator, { target, ...attrs }) => ({
      ...accumulator,
      ...attrs,
      style: { 
        ...accumulator.style, 
        ...Object.assign({}, !target && { '*': { ...accumulator.style['*'], ...attrs.style }}), //without target
        ...Object.assign({}, target && { [target]: { ...accumulator.style[target], ...attrs.style } }) //with target
      } //add nested style attrs
    }), {
        style: {
          '*': {} //default selector for all elements
        }
    });

    widget.attrs = {
      ...widget.attrs,
      ...graphics
    };

    //Create the widget starting from each semantics
    widget.semantics.forEach((semantics) => {
      const prototype = dictionary((semantics), widget.attrs);

      const { tag, ...attributes } = prototype;
      const element = document.createElement(tag);
  
      Object.keys(attributes).forEach((key) => {
        element[key] = attributes[key];
      });
      
      //Apply style
      if (Object.keys(widget.attrs.style).length > 0) {
        const target = widget.attrs.style[semantics] ? semantics : '*';
        const cssSelector = widget.attrs.style[semantics] ? tag : '*';

        const styleKeys = Object.keys(widget.attrs.style[target]);

        if (styleKeys.length > 0) {
          const style = shadow.querySelector('style') || document.createElement('style');
          style.type = 'text/css';

          const styleTextNode = `\n${cssSelector} {${styleKeys.reduce((accumulator, key) => 
            `${accumulator}\n\t${getTranslatedCSSProperty(key, widget.attrs.style[target][key], tag)};`, '')}
}\n`;

          !style.innerText.includes(styleTextNode) && style.appendChild(document.createTextNode(styleTextNode)); //workaround
          
          //Another step to add visual feedback, hidden by customization (:hover, [disabled])
          if ((styleKeys.includes(BACKGROUND) || styleKeys.includes(BORDER)) && (tag === 'button' || tag === 'select')) {
            style.appendChild(document.createTextNode(
              `${tag}:hover:not([disabled]) {\n\tcursor: pointer;
}\n${tag}[disabled] {\n\tbox-shadow: none;\n\tborder: none;\n\tbackground: gainsboro;\n\tcolor: gray;\n\t
}`
            ));
          }

          shadow.appendChild(style);
        }
      }
  
      //Finally bind events and keywords based on vocal components
      if (semantics !== LABEL && semantics !== OPTION) {
        components[VOCAL].forEach(({ event, keyword }) => {
          addKeyword(event, keyword, widget.attrs.element, semantics, element);
    
          //TODO: this line is only for debug purpose, remove this
          element.addEventListener(event, (e) => console.log(e));
        });
      }
  
      semantics === OPTION ? shadow.querySelector(`#${widget.attrs.element}`).appendChild(element) : shadow.appendChild(element);
    });
  }

  /**
   * Parent widget children validator.
   * @method
   * @memberof Widget
   */
  validator () {
    const children = [...this.children];

    const semantics = children
    .filter((item) => item.tagName.toLowerCase() === SEMANTICS);
    const semanticsAttrs = semantics.map((item) => item.getAttributeNames()).flat();
    const semanticTargets = semantics.reduce((accumulator, item) => [ ...accumulator, item.getAttribute('semantics')], []);

    const differentSemantics = semanticTargets.length === new Set(semanticTargets).size;

    //Validate combination of semantics
    if (!differentSemantics || (semanticTargets.length > 1 && !semanticTargets.includes(LABEL)) || semanticTargets.length > 2) {
      //The maximum number of semantics is 2 when there is LABEL, otherwise it is 1
      throw new Error('Invalid combination of semantics. A maximum of 2 semantics are allowed only if the label is present, otherwise only 1.');
    }

    const hasMultipleChoice = semantics.some((item) => item.hasAttribute('multiple'));

    //most of attrs validation (related to semantics), is made by CSS (except for expanded/compact, only for selection choice and target, only if target semantics is in)
    const graphics = children
      .filter((item) => item.tagName.toLowerCase() === GRAPHICS);
    const graphicAttrs = graphics.map((item) => item.getAttributeNames()).flat();

    //Expanded management (only for selection choice)
    if (graphicAttrs.includes('expanded') && !semanticTargets.includes(SELECTION_CHOICE) && !semanticTargets.includes(DATA_ACQUISITION)) {
      throw new Error('Graphic component "expanded" is not allowed with this semantics.');
    }

    //Value management for selection choice: value is valid only if the expanded graphic component is in
    if (semanticTargets.includes(SELECTION_CHOICE)) {
      if (semanticsAttrs.includes('value') && (!graphicAttrs.includes('expanded') || hasMultipleChoice)) {
        throw new Error('Invalid combination: only expanded single selection-choice must have "value" attribute.');
      }
      if (!semanticsAttrs.includes('value') && (graphicAttrs.includes('expanded') && !hasMultipleChoice)) {
        throw new Error('Invalid combination: expanded single selection-choice must have "value" attribute.');
      }
    }

    //Graphic target (semantics) validation
    const graphicTargets = graphicAttrs.includes('target') && graphics.reduce((accumulator, item) => {
      const target = item.getAttribute('target');
      return target ? [ ...accumulator, target ] : accumulator;
    }, []);

    //Is the target semantics in the graphic component valid?
    const hasValidTargetSemantics = graphicTargets ? 
      graphicTargets.reduce((accumulator, item) => 
        semanticTypes.some((semantics) => item.includes(semantics)) && accumulator, true) : 
      true;
    //Is the target semantics in?
    const isTargetSemanticsIn = graphicTargets ? semanticTargets.reduce((accumulator, item) => graphicTargets.includes(item) || accumulator, false) : true;

    if (graphicTargets && (!hasValidTargetSemantics || !isTargetSemanticsIn)) {
      throw new Error('Invalid target semantics.');
    }

    //Vocal validation
    const vocal = children
      .filter((item) => item.tagName.toLowerCase() === VOCAL);

    const hasCleanEvent = vocal.some((item) => item.getAttribute('event') === 'clean');
    if (!semanticTargets.includes('data-acquisition') && hasCleanEvent) {
      throw new Error('"Clean" event is available only for data-acquisition semantics.');
    }

    const hasOpenEvent = vocal.some((item) => item.getAttribute('event') === 'open');
    const hasExpandedAttr = graphicAttrs.includes('expanded');
    if (!semanticTargets.includes('selection-choice') && !hasExpandedAttr && hasOpenEvent) {
      throw new Error('"Open" event is available only for expanded selection-choice semantics.');
    }

    return true;
  }
}

export default Widget;