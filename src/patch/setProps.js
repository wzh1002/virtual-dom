import { setAttr } from '../utils';

const setProps = (node, props) => {
  Object.keys(props).forEach((key) => {
    props[key] === undefined ? node.removeAttribute(key) : setAttr(node, key, props[key]);
  });
};

export default setProps;
