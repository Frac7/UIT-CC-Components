# UIT - CCComponents
[Demo](https://uit-demo.frac7.repl.co/)
# Getting started
## Technologies
- [Webpack](https://webpack.js.org/) and [Parcel](https://parceljs.org/)
- [WebComponents](https://www.webcomponents.org/)
- [Artyom.js](https://sdkcarlos.github.io/sites/artyom.html)
- [JSDoc](https://jsdoc.app/)
## Project structure
- `index.html`: Demonstration of using components to create widgets
- js: Javascript library files
  - `main.js`: Definition of components (WebComponents API)
  - components: Definition of components (classes) to build widgets
    - `graphics.js`
    - `semantics.js`
    - `vocal.js`
    - `widget.js`
  - utilities: Utilities used from components
    - dictionary: Semantics related utilities
      - `map.js`: Constants and allowed values (eg allowed button types)
      - `prototypes.js`: Prototypes used to build HTML elements after the validation of the components
    - graphics: Graphics related utilities
      - `map.js`: Constants and utility functions (eg CSS rule creation)
    - vocal: Vocal related utilities
      - `map.js`: Constants and utility functions (eg command mapping)
      - `utils.js`: Feedback creation
## Commands from package.json
This project uses Webpack for development and for building the library script.
First of all, run `yarn install` in the project root.
### Development
Open two terminals:
- In the former run `yarn watch`: this command watches for changes in Javascript files;
- In the latter run `yarn start`: this command starts the development server at `localhost:1234`, it shows the `index.html` and the Webpack build (library script for dev).
### Build
Run `yarn build` for creating a unique script containing the library. This script can be added as a `<script>` to an HTML page. The build will be placed in the `dist` directory.
### Documentation
Run `yarn docs`for generating the documentation as HTML pages. These files will be placed under the `out` directory, open the `out/index.html` file to view the documentation.
# Using the library
## Widget structure
```html
<widget-container>
 <widget-semantic … /> <!-- required -->
 <widget-graphic … />
 <widget-vocal … />
</widget-container>
```
## Allowed semantic attributes
- semantics, *string*
- element, *string*
  - used as `id` attribute in all cases except in the case of `label` and `option`
  - used as `for` attribute in the case of `label`
  - used for finding the correct select in the case of `option`
- text, *string*: label text
- to, *string*: path for navigating
### Allowed semantics
- selection-choice (radio button, checkbox, select and multiselect)
- single-choice (button)
- data-acquisition (input and textarea)
- label (label or simply inner text)
- option (option)
- navigation (a)
### Allowed existing HTML attributes
These attributes follow the default behaviour.
- disabled, *boolean*
- required, *boolean*
- name, *string*
- readonly, *boolean*
- value, *string*
- checked, *boolean*
- multiple, *boolean*
- selected, *boolean*
- type, *string*
  - in case of `single-choice`:
    - submit
    - reset
    - button
  - in case of `data-acquisition`:
    - text
    - number
    - ... [others](https://www.w3schools.com/tags/att_input_type.asp)
## Allowed graphic attributes
These attributes, except for `expanded`, `shadow`, `size`, follow the default behaviour because they are treated as CSS shorthands.
- expanded, *boolean*: used in combination with `selection-choice` and `data-acquisition` semantics for discriminating between radio/checkbox and selection and between input and textarea
- background, *string*
- color, *string*
- font, *string*
- border, *string*
- shadow, *string*: internal discrimination between `box-shadow` and `text-shadow`
- size, *string*
  - SMALL
  - MEDIUM
  - LARGE
## Allowed vocal attributes
- event, *string*
- keyword, *string*
### Allowed events
These events, except for `clean` and `open` that are custom, follow the default behaviour.
- click
- focus
- blur
- input
- change
- open: action relating to the voice mode corresponding to the opening of the select to view the available options
- clean: delete `data-acquisition` content
### Command building
Each widget having a semantics and a vocal component, must have the semantic `element` attribute because it is used for identifying the widget on wich act.
The following is the command structure:
- `single-choice`, `navigation`: **[keyword]** **[element]**
  - for example [navigate to] [home], or [press] [red button]
- `data-acquisition`: **[keyword] * in [element]**
  - for example [write] hello in [text field], or [clean content] in [text field]
- `selection-choice`: **[keyword] * from [element]**
  - for example [choose] option 1 from [blue select], or [read options] from [blue select]
  
Vocal components associated to `label` or `options` semantics are not allowed.
# Usage example
[Demo](https://uit-demo.frac7.repl.co/)
# Other details
- [Graph](https://drive.google.com/file/d/13zzB8m_lA-phV9HPU1Po8oLx9L4nV53J/view?usp=sharing)
- [Presentation](https://docs.google.com/presentation/d/1I-JlcDKAEBMU8Fd2On-m3BRgM3pLqpf2fJ41xKKtz2s/edit?usp=sharing)
