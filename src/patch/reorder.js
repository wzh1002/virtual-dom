import { KEY } from '../type';
import { getType } from '../utils';

const reorder = (node, moves) => {
    // get node childNodes save in array
  const nodeList = Array.from(node.childNodes);
  const maps = {};

    // generate key map for child nodes
  nodeList.forEach((node) => {
    if (node.nodeType === 1) {
      const key = node.getAttribute(KEY);
      key && (maps[key] = node);
    }
  });

  moves.forEach((move) => {
    const index = move.index;
    if (move.type === 0) {
      if (nodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index]);
      }
      nodeList.splice(index, 1);
    } else if (move.type === 1) {
            // if key is same, reuse old child
      const insertNode = maps[move.item[KEY]]
                ? maps[move.item[KEY]]
                : (getType(move.item) === 'object')
                    ? move.item.render()
                    : document.createTextNode(move.item);
      nodeList.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null);
    }
  });
};

export default reorder;
