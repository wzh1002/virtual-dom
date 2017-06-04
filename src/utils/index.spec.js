import chai from 'chai';
import { getType, setAttr, isString, isIgnoreChildren } from './index';

describe('Test utils', () => {
    it('Test getType function', () => {
        getType('666').should.be.equal('string');
        getType(233).should.be.equal('number');
        getType({}).should.be.equal('object');
        getType([]).should.be.equal('array');
        getType(null).should.be.equal('null');
        getType(undefined).should.be.equal('undefined');
        getType(function(){}).should.be.equal('function');
        getType(/1/).should.be.equal('regexp');
        getType(new Date()).should.be.equal('date');
        getType(new Error()).should.be.equal('error');
    });

    it('Test isString function', () => {
        isString('666').should.be.equal(true);
        isString(233).should.be.equal(false);
    });

    it('Test setAttr function of normal ele', () => {
        let dom = document.createElement('div');
        let key = 'name',
            value = '666';
        setAttr(dom, 'key', key);
        setAttr(dom, 'value', value);
        dom.getAttribute('key').should.be.equal(key);
        dom.getAttribute('value').should.be.equal(value);
        (typeof dom.value).should.be.equal('undefined');
    });

    it('Test setAttr function of input and textarea', () => {
        let dom = document.createElement('input');
        let dom1 = document.createElement('textarea');
        let value = '666';
        setAttr(dom, 'value', value);
        setAttr(dom1, 'value', value);
        dom.getAttribute('value').should.be.equal(value);
        dom1.getAttribute('value').should.be.equal(value);
        dom.value.should.be.equal(value);
        dom1.value.should.be.equal(value);
    });

    it('Test isIgnoreChildren function', () => {
        let vnode = {tagName: 'div', props: {}};
        isIgnoreChildren(vnode).should.be.equal(false);
        vnode.props.ignore = true;
        isIgnoreChildren(vnode).should.be.equal(true);
    })
});
