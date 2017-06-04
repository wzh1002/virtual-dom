import { isString } from '../utils';

const replace = (node, vnode) => {
  const newNode = isString(vnode) ? document.createTextNode(node) : vnode.render();
  node.parentNode.replaceChild(newNode, node);
};

export default replace;
