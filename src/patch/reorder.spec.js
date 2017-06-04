import chai from 'chai';
import reorder from './reorder';
import h from '../h';
import { KEY } from '../type';
import listDiff from '../diff/listDiff';

describe('Test reorder function', () => {
    it('reorder node\'s children', () => {
        let tree = h('div', {'id': 'container', key: '0'}, [
            h('h1', {style: 'color: blue', key: '1'}, ['simple virtual dom']),
            h('ul', { key: '2'}, [h('li')]),
            h('p', { key: '3' }, ['Hhlo, virtual-dom']),
            h('span', ['666']),
            h('input', {value: '666'})
        ]);
        let newTree= h('div', {'id': 'container', key: '0'}, [
            h('p', { key: '3',  style: 'color: red'}, ['Hhlo, virtual-dom']),
            h('h2',{ key: '1'}, ['simple virtual dom', '666']),
            h('span', ['666']),
            h('textarea', {value: '233'}, ['666']),
            h('ul',{ key: '2'}, [h('li'), h('li')])
        ]);
        let dom = tree.render();
        let child0 = dom.childNodes[0],
            child1 = dom.childNodes[1],
            child2 = dom.childNodes[2],
            child3 = dom.childNodes[3],
            child4 = dom.childNodes[4];

        let moves = listDiff(tree.children, newTree.children, KEY).moves;

        reorder(dom, moves);

        (child0 === dom.childNodes[0]).should.be.equal(false);
        (child1 === dom.childNodes[1]).should.be.equal(false);
        (child2 === dom.childNodes[2]).should.be.equal(false);
        (child3 === dom.childNodes[3]).should.be.equal(false);
        (child4 === dom.childNodes[4]).should.be.equal(false);

        (child0 === dom.childNodes[1]).should.be.equal(true);
        (child1 === dom.childNodes[4]).should.be.equal(true);
        (child2 === dom.childNodes[0]).should.be.equal(true);
        (child3.parentNode !== dom).should.be.equal(true);
        (child4.parentNode !== dom).should.be.equal(true);
    });
});
