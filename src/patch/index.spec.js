import chai from 'chai';
import patch from './index';
import h from '../h';
import { KEY } from '../type';
import diff from '../diff';

describe('Test patch function', () => {
    it('node patch', () => {
        let tree = h('div', {'id': 'container', key: '0', 'data-id': '0'}, [
            h('h1', {style: 'color: blue', key: '1'}, ['simple virtual dom']),
            h('ul', {key: '2'}, [h('li')]),
            h('p', { key: '3' }, ['Hhlo, virtual-dom']),
            h('span', ['666']),
            h('input', {value: '666'})
        ]);
        let newTree= h('div', {'id': 'container', key: '0', 'class': '666'}, [
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

        let patches = diff(tree, newTree);

        patch(dom, patches);

        (child0 === dom.childNodes[0]).should.be.equal(false);
        (child1 === dom.childNodes[1]).should.be.equal(false);
        (child2 === dom.childNodes[2]).should.be.equal(false);
        (child3 === dom.childNodes[3]).should.be.equal(false);
        (child4 === dom.childNodes[4]).should.be.equal(false);

        dom.childNodes[0].nodeName.should.be.equal('P');
        dom.childNodes[1].nodeName.should.be.equal('H2');
        dom.childNodes[2].nodeName.should.be.equal('SPAN');
        dom.childNodes[3].nodeName.should.be.equal('TEXTAREA');
        dom.childNodes[4].nodeName.should.be.equal('UL');

        (child0.parentNode !== dom).should.be.equal(true);
        (child1 === dom.childNodes[4]).should.be.equal(true);
        (child2 === dom.childNodes[0]).should.be.equal(true);
        (child3.parentNode !== dom).should.be.equal(true);
        (child4.parentNode !== dom).should.be.equal(true);

        (dom.getAttribute('data-id') === null).should.be.equal(true);
        dom.className.should.be.equal('666');
        child1.childNodes.length.should.be.equal(2);
        child2.getAttribute('style').should.be.equal('color: red;');
    });
});
