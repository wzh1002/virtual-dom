import { KEY } from '../type';
import { setAttr } from '../utils';

class VNode {
  constructor(tagName, props, children) {
    if (tagName === undefined) {
      return null;
    }
    if (children === undefined && Array.isArray(props)) {
      children = props;
      props = {};
    }
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    if (props && props[KEY] !== undefined) {
      this[KEY] = props[KEY];
    }

    let count = 0;
    this.children.forEach((child, index) => {
      if (child instanceof VNode) {
        count += child.count;
      } else {
        children[index] = `${child}`;
      }
      count++;
    });
    this.count = count;
  }

  render() {
    let el = document.createElement(this.tagName),
      props = this.props,
      children = this.children || [];

    for (const propName in props) {
      setAttr(el, propName, props[propName]);
    }

    children.forEach((child) => {
      const childEl = child instanceof VNode
                ? child.render()
                : document.createTextNode(child);
      el.appendChild(childEl);
    });

    return el;
  }
}

const h = (...arg) => new VNode(...arg);

export default h;
export {
    VNode,
};
