const diffProps = (oldNode, newNode) => {
  let count = 0,
    oldProps = oldNode.props,
    newProps = newNode.props,
    propsPatches = {};

  Object.keys(oldProps).forEach((key) => {
    if (oldProps[key] !== newProps[key]) {
      propsPatches[key] = newProps[key];
      count++;
    }
  });

  Object.keys(newProps).forEach((key) => {
    if (!oldProps.hasOwnProperty(key)) {
      propsPatches[key] = newProps[key];
      count++;
    }
  });

  if (count === 0) {
    return null;
  }
  return propsPatches;
};

export default diffProps;
