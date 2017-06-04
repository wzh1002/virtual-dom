import { REPLACE, REORDER, PROPS, TEXT, KEY } from '../type';
import { getType, setAttr, isString, isIgnoreChildren } from '../utils';
import listDiff from './listDiff';
import diffProps from './diffProps';

const diff = (oldNode, newNode, index = 0, patches = {}) => {
  const currentPatch = [];

  if (newNode === null) {  // remove oldNode

  } else if (isString(oldNode) && isString(newNode)) {  // replace textNode
    oldNode !== newNode && currentPatch.push({ type: TEXT, content: newNode });
  } else if (
        oldNode.tagName === newNode.tagName &&
        oldNode[KEY] === newNode[KEY]
    ) {   // nodes are same, diff props and children
    const propsPatches = diffProps(oldNode, newNode);
    propsPatches && currentPatch.push({ type: PROPS, props: propsPatches });

    if (!isIgnoreChildren(newNode)) {
      diffChildren(
                oldNode.children,
                newNode.children,
                index,
                patches,
                currentPatch
            );
    }
  } else {
    currentPatch.push({ type: REPLACE, node: newNode });
  }

  currentPatch.length && (patches[index] = currentPatch);

  return patches;
};

let diffChildren = (oldChildren, newChildren, index, patches, currentPatch) => {
  const diffs = listDiff(oldChildren, newChildren, KEY);
    // diffs.children are can reuse children, others children will be replace
  newChildren = diffs.children;

  if (diffs.moves.length) {
    currentPatch.push({ type: REORDER, moves: diffs.moves });
  }
  let leftNode = null;
  let currentNodeIndex = index;
  oldChildren.forEach((child, index) => {
    const newChild = newChildren[index];
    currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1;
    diff(child, newChild, currentNodeIndex, patches);
    leftNode = child;
  });
};

export default diff;
