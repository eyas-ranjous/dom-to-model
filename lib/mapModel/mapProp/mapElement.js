/**
 * dom-to-model
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license ISC
 */

/**
 * @description retrieves and cast data content of an html element
 * @param {object} element
 * @param {string} dataType - "number", "boolean" or "string"
 * @param {string} dataAttr - optional, data attribute name
 * @return {number|boolean|string|null}
 */
const mapElement = (element, dataType = 'string', dataAttr) => {
  if (element.length === 0) return null;

  const cast = (value) => {
    if (dataType === 'number') return +value;
    if (dataType === 'boolean') return !!value;
    return value;
  };

  if (dataAttr) return cast(element.data(dataAttr));

  const tagName = element.prop('tagName').toLowerCase();
  if (tagName === 'input') return cast(element.val());

  return cast(
    element
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim()
  );
};

module.exports = mapElement;
