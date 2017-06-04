!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=13)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return Object.prototype.toString.call(e).replace(/\[object\s/,"").replace(/\]/,"").toLowerCase()},o=function(e){return"string"===r(e)},u=function(e,t,n){if("style"===t)return e.style.cssText=n;if("value"===t){var r=e.tagName.toLowerCase();"input"!==r&&"textarea"!==r||(e.value=n)}e.setAttribute(t,n)},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.props&&e.props.hasOwnProperty("ignore")};t.getType=r,t.setAttr=u,t.isString=o,t.isIgnoreChildren=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.REPLACE=0,t.REORDER=1,t.PROPS=2,t.TEXT=3,t.KEY="key"},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.patch=t.diff=t.h=void 0;var o=n(7),u=r(o),i=n(5),c=r(i),a=n(8),f=r(a),s={h:u.default,diff:c.default,patch:f.default};window&&(window.vd=s),t.default=s,t.h=u.default,t.diff=c.default,t.patch=f.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),u=n(0),i=n(6),c=r(i),a=n(4),f=r(a),s=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=[];if(null===t);else if((0,u.isString)(e)&&(0,u.isString)(t))e!==t&&i.push({type:o.TEXT,content:t});else if(e.tagName===t.tagName&&e[o.KEY]===t[o.KEY]){var c=(0,f.default)(e,t);c&&i.push({type:o.PROPS,props:c}),(0,u.isIgnoreChildren)(t)||l(e.children,t.children,n,r,i)}else i.push({type:o.REPLACE,node:t});return i.length&&(r[n]=i),r},l=function(e,t,n,r,u){var i=(0,c.default)(e,t,o.KEY);t=i.children,i.moves.length&&u.push({type:o.REORDER,moves:i.moves});var a=null,f=n;e.forEach(function(e,n){var o=t[n];f=a&&a.count?f+a.count+1:f+1,s(e,o,f,r),a=e})};t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){var n=0,r=e.props,o=t.props,u={};return Object.keys(r).forEach(function(e){r[e]!==o[e]&&(u[e]=o[e],n++)}),Object.keys(o).forEach(function(e){r.hasOwnProperty(e)||(u[e]=o[e],n++)}),0===n?null:u};t.default=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(3);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(o).default}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n){var r=a(e,n),o=a(t,n),u=f(e,t,o,n);return{moves:s(e,t,r,u,n),children:u}},o=function(e,t){return e&&t?e[t]:void 0},u=function(e){return{index:e,type:0}},i=function(e,t){return{index:e,item:t,type:1}},c=function(e,t){return e.splice(t,1)},a=function(e,t){var n={};return e.forEach(function(e,r){e.hasOwnProperty(t)&&(n[e[t]]=r)}),n},f=function(e,t,n,r){return e.map(function(e){var u=o(e,r);return u&&n.hasOwnProperty(u)?t[n[u]]:null})},s=function(e,t,n,r,a){for(var f=[],s=r.slice(),l=0;l<s.length;)null===s[l]?(f.push(u(l)),c(s,l)):l++;return l=0,t.forEach(function(e,t){var r=o(e,a),c=s[l],d=o(c,a);if(c)if(r===d)l++;else if(n.hasOwnProperty(r)){var p=o(s[l+1],a);p===r?(f.push(u(t)),l+=2):f.push(i(t,e))}else f.push(i(t,e));else f.push(i(t,e))}),f};t.default=r,t.getItemKey=o,t.getInsertAction=i,t.getRemoveAction=u,t.removeArrItemByIndex=c,t.getListMap=a,t.getReuseList=f,t.getDiffMoves=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.VNode=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(1),i=n(0),c=function(){function e(t,n,o){if(r(this,e),void 0===t)return null;void 0===o&&Array.isArray(n)&&(o=n,n={}),this.tagName=t,this.props=n||{},this.children=o||[],n&&void 0!==n[u.KEY]&&(this[u.KEY]=n[u.KEY]);var i=0;this.children.forEach(function(t,n){t instanceof e?i+=t.count:o[n]=""+t,i++}),this.count=i}return o(e,[{key:"render",value:function(){var t=document.createElement(this.tagName),n=this.props,r=this.children||[];for(var o in n)(0,i.setAttr)(t,o,n[o]);return r.forEach(function(n){var r=n instanceof e?n.render():document.createTextNode(n);t.appendChild(r)}),t}}]),e}(),a=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return new(Function.prototype.bind.apply(c,[null].concat(t)))};t.default=a,t.VNode=c},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),u=n(10),i=r(u),c=n(9),a=r(c),f=n(11),s=r(f),l=n(12),d=r(l),p=function e(t,n){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{index:0},u=n[r.index],c=t.childNodes?t.childNodes.length:0,f=0;f<c;f++){var l=t.childNodes[f];r.index++,e(l,n,r)}u&&u.forEach(function(e){switch(e.type){case o.REPLACE:(0,i.default)(t,e.node);break;case o.REORDER:(0,a.default)(t,e.moves);break;case o.PROPS:(0,s.default)(t,e.props);break;case o.TEXT:(0,d.default)(t,e.text);break;default:throw new Error("Unknown patch type "+e.type)}})};t.default=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o=n(0),u=function(e,t){var n=Array.from(e.childNodes),u={};n.forEach(function(e){if(1===e.nodeType){var t=e.getAttribute(r.KEY);t&&(u[t]=e)}}),t.forEach(function(t){var i=t.index;if(0===t.type)n[i]===e.childNodes[i]&&e.removeChild(e.childNodes[i]),n.splice(i,1);else if(1===t.type){var c=u[t.item[r.KEY]]?u[t.item[r.KEY]]:"object"===(0,o.getType)(t.item)?t.item.render():document.createTextNode(t.item);n.splice(i,0,c),e.insertBefore(c,e.childNodes[i]||null)}})};t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e,t){var n=(0,r.isString)(t)?document.createTextNode(e):t.render();e.parentNode.replaceChild(n,e)};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e,t){Object.keys(t).forEach(function(n){void 0===t[n]?e.removeAttribute(n):(0,r.setAttr)(e,n,t[n])})};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){return e.setTextContent?e.setTextContent=t:e.nodeValue=t};t.default=r},function(e,t,n){e.exports=n(2)}]);
//# sourceMappingURL=bundle.js.map