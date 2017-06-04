import { REPLACE, REORDER, PROPS, TEXT } from '../type';
import replace from './replace';
import reorder from './reorder';
import setProps from './setProps';
import setText from './setText';

const patch = (node, patches, walker = { index: 0 }) => {
  let currentPatches = patches[walker.index],
    len = node.childNodes ? node.childNodes.length : 0;

  for (let i = 0; i < len; i++) {
    const child = node.childNodes[i];
    walker.index++;
    patch(child, patches, walker);
  }

  if (currentPatches) {
    currentPatches.forEach((currentPatch) => {
      switch (currentPatch.type) {
        case REPLACE:
          replace(node, currentPatch.node);
          break;
        case REORDER:
          reorder(node, currentPatch.moves);
          break;
        case PROPS:
          setProps(node, currentPatch.props);
          break;
        case TEXT:
          setText(node, currentPatch.text);
          break;
        default :
          throw new Error(`Unknown patch type ${currentPatch.type}`);
      }
    });
  }
};

export default patch;
