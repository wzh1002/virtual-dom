import chai from 'chai';
import * as list from './listDiff';
import h from '../h';

describe('Test listDiff', () => {
    const KEY = 'id';
    let oldList = [{id: 1}, {id: 2}, {id: 3}, 4, 5];
    let newList = [{id: 3}, 2, 1, 4, {id: 2}];
    let oldMap = {
        [1]: 0,
        [2]: 1,
        [3]: 2
    };
    let newMap = {
        [2]: 4,
        [3]: 0
    };
    let reuseList = [null, {id: 2}, {id: 3}, null, null];
    let moves = [
        list.getRemoveAction(0),
        list.getRemoveAction(2),
        list.getRemoveAction(2),
        list.getRemoveAction(0),
        list.getInsertAction(1, newList[1]),
        list.getInsertAction(2, newList[2]),
        list.getInsertAction(3, newList[3]),
        list.getInsertAction(4, newList[4])
    ];

    let getKeyMap = (list, key) => {
        let map = {};
        list.forEach(item => {
            item.hasOwnProperty(key) && (map[item[key]] = item);
        });
        return map;
    };

    let reorder = (list, moves) => {
        let keyMap = getKeyMap(list, KEY);
        moves.forEach(move => {
            if (move.type === 0) {
                return list.splice(move.index, 1)
            }
            let item = keyMap[move.item[KEY]] ? keyMap[move.item[KEY]] : move.item;
            list.splice(move.index, 0, item);
        });
    };

    it('getItemKey function', () => {
        list.getItemKey({a: 1}, 'a').should.be.equal(1);
        (typeof list.getItemKey({a: 1})).should.be.equal('undefined');
    });

    it('getRemoveAction function', () => {
        list.getRemoveAction(1).should.be.deep.equal({type:0, index: 1});
        list.getRemoveAction(233).should.be.deep.equal({type:0, index: 233});
    });

    it('getInsertAction function', () => {
        list.getInsertAction(1, null).should.be.deep.equal({type:1, index: 1, item: null});
        list.getInsertAction(233, h('li')).should.be.deep.equal({type:1, index: 233, item: h('li')});
    });

    it('removeArrItemByIndex function', () => {
        let arr = [1,2,3,4];
        list.removeArrItemByIndex(arr, 2);
        arr.should.be.deep.equal([1, 2, 4]);
    });

    it('getListMap function', () => {
        list.getListMap(oldList, 'id').should.be.deep.equal(oldMap);
        list.getListMap(newList, 'id').should.be.deep.equal(newMap);
    });

    it('getReuseList function', () => {
        list.getReuseList(oldList, newList, newMap, 'id').should.be.deep.equal(reuseList);
    });

    it('getDiffMoves function', () => {
        list.getDiffMoves(oldList, newList, oldMap, reuseList, 'id').should.be.deep.equal(moves);
        let cloneList = oldList.slice();
        reorder(cloneList, moves);
        cloneList.should.be.deep.equal(newList);
        // refer are same
        oldList[1].should.be.equal(cloneList[4]);
        oldList[2].should.be.equal(cloneList[0]);
    });

    it('listDiff function', () => {
        list.default(oldList, newList, 'id').should.be.deep.equal({
            moves: moves,
            children: reuseList
        })
    })
});