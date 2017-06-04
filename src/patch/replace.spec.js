import chai from 'chai';
import replace from './replace';
import h from '../h';

describe('Test replace function', () => {
    it('replace node by text vnode', () => {
        let parent = document.createElement('div');
        let child1 = h('p').render();
        let child2 = '666';

        parent.appendChild(child1);
        replace(child1, child2);
        (child1.parentNode + '').should.be.equal('null');
        parent.childNodes[0].nodeName.should.be.equal('#text');
    });

    it('replace node by normal vnode', () => {
        let parent = document.createElement('div');
        let child1 = h('p').render();
        let child2 = h('span');

        parent.appendChild(child1);
        replace(child1, child2);
        (child1.parentNode + '').should.be.equal('null');
        parent.children[0].nodeName.should.be.equal('SPAN');
    })
});
