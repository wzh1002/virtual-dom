const getType = obj => Object.prototype.toString.call(obj).replace(/\[object\s/, '').replace(/\]/, '').toLowerCase();

const isString = obj => getType(obj) === 'string';

const setAttr = (node, key, value) => {
  if (key === 'style') {
    return node.style.cssText = value;
  }
  if (key === 'value') {
    const tagName = node.tagName.toLowerCase();
    if (
            tagName === 'input' || tagName === 'textarea'
        ) {
      node.value = value;
    }
  }
  node.setAttribute(key, value);
};

const isIgnoreChildren = (node = {}) => node.props && node.props.hasOwnProperty('ignore');

export {
    getType,
    setAttr,
    isString,
    isIgnoreChildren,
};
