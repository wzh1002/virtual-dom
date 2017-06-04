import chai from 'chai';
import diff from './diff';
import h from '../h';
import { REPLACE, REORDER, PROPS, TEXT, KEY } from '../type';

describe('Test diff', () => {
    it('Test Node replace', () => {
        let oldNode = h('div', [h('p'), '666']);
        let newNode = h('p', [h('ul')]);

        let patch = diff(oldNode, newNode);
        patch[0][0].type.should.be.equal(REPLACE);
    });

    it('Test Node reorder', () => {
        let oldNode = h('div', [h('p'), '666']);
        let newNode = h('div', [h('ul')]);

        let patch = diff(oldNode, newNode);
        patch[0][0].type.should.be.equal(REORDER);
    });

    it('Test Node props', () => {
        let oldNode = h('div', {name: 233}, [h('p'), '666']);
        let newNode = h('div', {value: 666}, [h('ul')]);

        let patch = diff(oldNode, newNode);
        patch[0][0].type.should.be.equal(PROPS);
    });

    // text replace isn't exist, because remove old and insert new
    //it('Test Node text', () => {
    //    let oldNode = h('div', ['555', '666']);
    //    let newNode = h('div', ['233']);
    //
    //    let patch = diff(oldNode, newNode);
    //    patch[1][0].type.should.be.equal(TEXT);
    //})

});