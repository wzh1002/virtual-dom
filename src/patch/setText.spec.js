import chai from 'chai';
import setText from './setText';

describe('Test setText function', () => {
    it('setText', () => {
        let node = document.createTextNode('6666');
        let text = '233';
        setText(node, text);
        node.nodeValue.should.be.equal(text);
    })
});
