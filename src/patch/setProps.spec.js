import chai from 'chai';
import setProps from './setProps';

describe('Test setProps function', () => {
    it('setProps', () => {
        let node = document.createElement('div');
        let props = {
            key: '2',
            value: '666',
            'class': undefined
        };
        node.setAttribute('class', '666');
        node.setAttribute('key', '1');
        setProps(node, props);
        (node.getAttribute('class') + '').should.be.equal('null');
        node.getAttribute('key').should.be.equal('2');
        node.getAttribute('value').should.be.equal('666');
    });
});
