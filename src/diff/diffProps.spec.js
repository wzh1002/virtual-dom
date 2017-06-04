import chai from 'chai';
import diffProps from './diffProps';

describe('Test diffProps', () => {
    it('Test diffProps function', () => {
        let vnode1 = {tagName: 'div', props: {key: 1, name: 1}};
        let vnode2 = {tagName: 'div', props: {key: 2}};
        diffProps(vnode1, vnode2).should.be.deep.equal({key: 2, name: undefined});
        vnode2.props.value = 666;
        diffProps(vnode1, vnode2).should.be.deep.equal({key: 2, name: undefined, value: 666});
    })
});