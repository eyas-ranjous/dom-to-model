/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

/**
 * @description cast data content of an html element to a type
 * @param {HTMLElement} element
 * @param {string} dataType
 * @param {string} dataAttr - optional data attribute name
 * @return {number|boolean|string}
 */
exports.mapElementToValue = (element, dataType = 'string', dataAttr) => {
  if (element.length === 0) return null;

  /**
   * @description cast a string value
   * @param {string} value
   * @return {number|boolean|string}
   */
  const cast = (value) => {
    if (dataType === 'number') return +value;
    if (dataType === 'boolean') return !!value;
    return value;
  };

  if (dataAttr) return cast(element.data(dataAttr));

  const tagName = element.prop('tagName').toLowerCase();
  if (tagName === 'input') return cast(element.val());

  return cast(element
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim());
};
