const listDiff = (oldList, newList, key) => {
  let oldMap = getListMap(oldList, key),
    newMap = getListMap(newList, key);

  const children = getReuseList(oldList, newList, newMap, key);
  const moves = getDiffMoves(oldList, newList, oldMap, children, key);

  return {
    moves,
    children,
  };
};

const getItemKey = (item, key) => item && key ? item[key] : undefined;

const getRemoveAction = index => ({ index, type: 0 });

const getInsertAction = (index, item) => ({ index, item, type: 1 });

const removeArrItemByIndex = (arr, index) => arr.splice(index, 1);

// return item collection for has key
let getListMap = (list, key) => {
  const listMap = {};
  list.forEach((item, index) => {
    item.hasOwnProperty(key) && (listMap[item[key]] = index);
  });
  return listMap;
};

let getReuseList = (oldList, newList, newMap, key) => oldList.map((item) => {
  const itemKey = getItemKey(item, key);
        // new collection has itemKey, current position need return new item
  if (itemKey && newMap.hasOwnProperty(itemKey)) {
    return newList[newMap[itemKey]];
  }
        // new collection not has itemKey, current position need return null (null will remove)
  return null;
});

let getDiffMoves = (oldList, newList, oldMap, reuseList, key) => {
  const moves = [];
  const simulateList = reuseList.slice();

    // remove null item in simulateList , i is simulateList cursor
    // fetch diff remove actions
  let i = 0;
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      moves.push(getRemoveAction(i));
      removeArrItemByIndex(simulateList, i);
    } else {
      i++;
    }
  }
    // fetch actions by diff simulateList and newList
    // i is simulateList cursor
  i = 0;
  newList.forEach((item, index) => {
    const itemKey = getItemKey(item, key);
    const simulateItem = simulateList[i];
    const simulateItemKey = getItemKey(simulateItem, key);

    if (simulateItem) {
            // position are same , don't need move, move cursor next
      if (itemKey === simulateItemKey) {
        i++;
      } else {
                // new item, add insert action
        if (!oldMap.hasOwnProperty(itemKey)) {
          moves.push(getInsertAction(index, item));
        } else {
                    // if remove current simulateItem make next item in right position, remove it
                    // cursor next next
          const nextSimulateItemKey = getItemKey(simulateList[i + 1], key);
          if (nextSimulateItemKey === itemKey) {
            moves.push(getRemoveAction(index));
            i += 2;
          } else {
            moves.push(getInsertAction(index, item));
          }
        }
      }
    } else {
      moves.push(getInsertAction(index, item));
    }
  });
  return moves;
};

export default listDiff;
export {
    getItemKey,
    getInsertAction,
    getRemoveAction,
    removeArrItemByIndex,
    getListMap,
    getReuseList,
    getDiffMoves,
};

