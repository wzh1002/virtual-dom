import chai from 'chai';
import h, { VNode } from './index';

import jsdom from 'mocha-jsdom';

jsdom();

chai.should();

describe('Test h', () => {

    it('Test h with no props', () => {
        let children = [
            h('li', [h('span')]),
            h('li', [h('span')]),
            h('li', [h('span')]),
            h('li', [h('span')])
        ];
        let root = h('ul', children);
        root.count.should.be.equal(8);
        root.children[0].count.should.be.equal(1);
        root.children[1].count.should.be.equal(1);
        root.props.should.be.deep.equal({});
        root.children.should.be.equal(children);
        root.tagName.should.be.equal('ul');
        root.children[0].tagName.should.be.equal('li');
    });

    it('Test h with props', () => {
        let children = [
            h('li', [h('span')]),
            h('li', [h('span')]),
            h('li', [h('span')]),
            h('li', [h('span')])
        ];
        let props = {key: '1', value: '666'};
        let root = h('ul', props, children);
        root.key.should.be.equal(props.key);
        root.props.value.should.be.equal(props.value);
    });

    it('Test normal render function', () => {
        let children = [
            h('li', {style: 'color: yellow'}, [h('span')]),
            h('li', [h('span')]),
            h('li', [h('span')]),
            h('li', [h('span')])
        ];
        let props = {key: '1', value: '666'};
        let root = h('ul', props, children);
        let ul = root.render();
        ul.nodeName.should.be.equal('UL');
        ul.getAttribute('key').should.be.equal(props.key);
        ul.getAttribute('value').should.be.equal(props.value);
        ul.children[0].nodeName.should.be.equal('LI');
        ul.children[0].getAttribute('style').should.be.equal('color: yellow;');
    });
});
