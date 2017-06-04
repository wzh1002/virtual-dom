# virtual-dom
virtual-dom implementation

## usage
```html
<script src="dist/js/bundle.js"></script>
```
```javascript
let h = vd.h,
    diff = vd.diff,
    patch = vd.patch;
    
// 1. generate virtual dom    
let tree = h('div', {'id': 'container', key: '0'}, [
    h('h1', {style: 'color: blue', key: '1'}, ['simple virtual dom']),
    h('ul', {key: '2'}, [h('li')]),
    h('p', { key: '3' }, ['Hhlo, virtual-dom']),
    h('span', ['666']),
    h('input', {value: '666'})
]);

// 2. generate real dom from virtual dom
let root = tree.render();
document.body.appendChild(root);

// 3. generate new virtual dom
let newTree = h('div', {'id': 'container', key: '0'}, [
    h('p', { key: '3',  style: 'color: red'}, ['Hhlo, virtual-dom']),
    h('h2',{ key: '1'}, ['simple virtual dom', '666']),
    h('span', ['666']),
    h('textarea', {value: 233}, ['666']),
    h('ul',{ key: '2'}, [h('li'), h('li')])
]);

// 4. fetch patches by diff vitual dom
let patches = diff(tree, newTree);

// 5. update 
patch(root, patches);
```
