!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(window,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=5)}([function(t,e,n){var i=n(1);"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(3)(i,o);i.locals&&(t.exports=i.locals)},function(t,e,n){(t.exports=n(2)(!1)).push([t.i,"*{-webkit-box-sizing:border-box;box-sizing:border-box}body{margin:0}body,html{height:100%}body{font-size:0}canvas{width:100%;height:100%;display:inline-block}\n",""])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=(a=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=i.sources.map((function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"}));return[n].concat(r).concat([o]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(o=0;o<t.length;o++){var a=t[o];null!=a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var i,o,r={},a=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=i.apply(this,arguments)),o}),s=function(t,e){return e?e.querySelector(t):document.querySelector(t)},l=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var i=s.call(this,t,n);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}}(),f=null,c=0,u=[],d=n(4);function h(t,e){for(var n=0;n<t.length;n++){var i=t[n],o=r[i.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](i.parts[a]);for(;a<i.parts.length;a++)o.parts.push(b(i.parts[a],e))}else{var s=[];for(a=0;a<i.parts.length;a++)s.push(b(i.parts[a],e));r[i.id]={id:i.id,refs:1,parts:s}}}}function p(t,e){for(var n=[],i={},o=0;o<t.length;o++){var r=t[o],a=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}function v(t,e){var n=l(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=u[u.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),u.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=l(t.insertAt.before,n);n.insertBefore(e,o)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function m(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var i=function(){0;return n.nc}();i&&(t.attrs.nonce=i)}return y(e,t.attrs),v(t,e),e}function y(t,e){Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])}))}function b(t,e){var n,i,o,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var a=c++;n=f||(f=m(e)),i=S.bind(null,n,a,!1),o=S.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),v(t,e),e}(e),i=T.bind(null,n,e),o=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(e),i=k.bind(null,n),o=function(){g(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return h(n,e),function(t){for(var i=[],o=0;o<n.length;o++){var a=n[o];(s=r[a.id]).refs--,i.push(s)}t&&h(p(t,e),e);for(o=0;o<i.length;o++){var s;if(0===(s=i[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete r[s.id]}}}};var w,x=(w=[],function(t,e){return w[t]=e,w.filter(Boolean).join("\n")});function S(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=x(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function k(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function T(t,e,n){var i=n.css,o=n.sourceMap,r=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||r)&&(i=d(i)),o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([i],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var o,r=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(t,e,n){"use strict";function i(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(n,!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e);var l=function(t){return((t=new Date(t)).getHours()<10?"0"+t.getHours():t.getHours())+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":"+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())},f=function t(e,n){for(var i in n)try{n[i].constructor==Object?e[i]=t(e[i],n[i]):e[i]=n[i]}catch(t){e[i]=n[i]}return e},c=function(){function t(e){var n=e.canvas,i=void 0!==n&&n,o=e.data,a=void 0===o?[]:o,s=e.settings,l=void 0===s?{}:s,f=e.offset,c=void 0===f?{left:30,right:50,top:20,bottom:40}:f;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas={element:i,context:i.getContext("2d"),isCanvas:(i instanceof Element||i instanceof HTMLDocument)&&"canvas"===i.tagName.toLowerCase()},this.data=a,this.settings={data:{offset:0,limit:{value:20}},indicator:{styles:{color:"#27ca5d",width:2},animation:{time:1e3,scaleTo:5}},offset:r({},c),line:{styles:{color:"#ffffff",width:1,gradient:{from:"#ffffff",to:"#000000",enable:!1}},offset:r({},c)},view:{styles:{background:"#000000"}},target:{enable:!0,coords:{x:0,y:0},styles:{lineColor:"rgb(60,60,60)",lineWidth:1,dotColor:"#fff",dotWidth:4,panelBackground:"rgb(60, 60, 60)",panelColor:"#fff"}},grid:{enable:!0,steps:{x:10,y:5},styles:{color:"rgb(20, 20, 20)",width:1}},timeLine:{enable:!0,resize:!0,count:5},valuesLine:{enable:!0,resize:!0,count:10,digits:2},timeStamp:+new Date},this.setSettings(l),this.checkErrors(),this.init()}var e,n,o;return e=t,(n=[{key:"setSettings",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.offset&&(t.line={},t.line.offset=t.offset),f(this.settings,t)}},{key:"getSettings",value:function(){return this.settings}},{key:"setData",value:function(t){this.data=t}},{key:"getData",value:function(){return this.data}},{key:"getLast",value:function(){return this.getDots("last")}},{key:"checkErrors",value:function(){var t=this.canvas;if(!t.isCanvas)throw new Error(t.element+" is not a canvas element")}},{key:"newDot",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.value,n=void 0!==e&&e,i=t.time,o=void 0!==i&&i,r=this.getDots("all"),a=r.dots,s=this.settings,l=s.data,f=a[a.length-1],c=f?f.value:0,u=Math.random()*(Math.random()>.5?-1:1),d=+new Date;o=o||d,n=parseFloat(n)||0===n?n:c+u,l.offset&&l.offset++,a.push({value:n,time:o})}},{key:"clearCanvas",value:function(){var t=this.canvas,e=t.element.width;t.context.clearRect(0,0,t.width,t.height),t.element.width=1,t.element.width=e}},{key:"init",value:function(){this.listeners(),this.render()}},{key:"render",value:function(){this.clearCanvas(),this.drawBackground(),this.drawGrid(),this.drawLine(),this.drawTime(),this.drawValues(),this.drawTarget(),this.drawIndicator(),requestAnimationFrame(this.render.bind(this))}},{key:"getDots",value:function(t){var e=this.settings.data,n=this.data,o=i(this.data);if(e.offset){var r=o.length-e.offset,a=r>e.limit.value;a||(e.offset=o.length-e.limit.value),o=o.slice(0,a?r:e.limit.value)}o.length>e.limit.value&&(o=o.slice(o.length-e.limit.value,o.length));for(var s=o.length?o[0].value:0,l=o.length?o[0].value:0,f=e.length?e[0].value:0,c=e.length?e[0].value:0,u=0;u<=n.length-1;u++){var d=n[u].value;d>f&&(f=d),d<c&&(c=d)}for(var h=0;h<=o.length-1;h++){var p=o[h].value;p>s&&(s=p),p<l&&(l=p)}var v={all:{dots:n,max:f,min:c},draw:{dots:o,max:s,min:l},last:n[n.length-1],first:n[0]};return t&&v[t]?v[t]:v}},{key:"getIndicatorCoords",value:function(){var t,e=this.canvas,n=this.settings,i=n.indicator,o=n.line.offset,r=e.element,a=(i.styles,i.animation,this.getDots()),s=a.draw,l=a.last,f=this.getLineDrawCoords(),c=(f.lineStart,f.lineEnd,f.lineTop),u=f.lineBottom,d=f.lineHeight;return l&&((t=c+d-d*(100*(l.value-s.min)/(s.max-s.min)/100))||(t=d/2+c),t>u&&(t=u),t<c&&(t=c)),{x:r.clientWidth-(o.right||0),y:t}}},{key:"drawIndicator",value:function(){var t=this.getIndicatorCoords(),e=t.x,n=t.y,i=this.settings,o=this.canvas,r=i.indicator,a=r.styles,s=r.animation,l=o.context;l.strokeStyle="transparent",l.save(),(!this.indicatorAnimatedState||this.indicatorAnimatedState>=1)&&(this.indicatorAnimatedState=0),l.globalAlpha=1-this.indicatorAnimatedState,l.beginPath(),l.arc(e,n,a.width*this.indicatorAnimatedState*s.scaleTo,0,2*Math.PI),l.fillStyle=a.color,l.fill(),l.stroke(),this.indicatorAnimatedState+=1/60/(s.time/1e3),l.restore(),l.beginPath(),l.arc(e,n,a.width,0,2*Math.PI),l.fillStyle=a.color,l.fill(),l.stroke()}},{key:"drawBackground",value:function(){var t=this.canvas,e=this.settings.view,n=t.context,i=t.element,o=e.styles.background;i.width=i.clientWidth,i.height=i.clientHeight,n.fillStyle=o,n.fillRect(0,0,i.width,i.height)}},{key:"getLineDrawCoords",value:function(){var t=this.canvas,e=this.settings.line.offset,n=t.element,i=n.clientWidth-e.right,o=e.left,r=i-o,a=e.top,s=n.clientHeight-e.bottom;return{lineStart:i,lineEnd:o,lineView:r,lineTop:a,lineBottom:s,lineHeight:s-a}}},{key:"drawTime",value:function(){var t=this.getDots("draw"),e=this.getLineDrawCoords(),n=(e.lineStart,e.lineEnd,e.lineView,e.lineTop,e.lineBottom,e.lineHeight,this.canvas),o=this.settings,r=o.timeLine,a=o.timeStamp,s=o.offset,f=r.enable,c=r.count,u=n.element,d=n.context,h=i(t.dots),p=[];if(f){for(var v=Math.ceil(h.length/c),g=0,m=h.length-1;m>=0;m--)h.length<=c?p.push(h[m]):(g===v&&(g=0),g||p.push(h[m]),g++,0===m&&g/v>=1&&p.push(h[m]));for(var y=0;y<=p.length-1;y++){var b=p[y];d.font="100 12px sans-serif",d.fillStyle="#fff",d.textAlign="center",d.textBaseline="middle",d.fillText(l(b&&b.time?b.time:a),b?b.x:0,u.clientHeight-s.bottom/2+2)}}}},{key:"drawValues",value:function(){var t=this.getDots("draw"),e=t.max,n=t.min,i=this.getLineDrawCoords(),o=(i.lineStart,i.lineEnd,i.lineView,i.lineTop),r=i.lineBottom,a=i.lineHeight,s=this.canvas,l=this.settings,f=l.valuesLine,c=l.offset,u=f.count,d=f.enable,h=f.digits,p=s.element,v=s.context,g=[];if(d){var m=a/(u-1),y=o+m,b=(p.clientHeight+c.top-c.bottom)/2;if(n===e){g.push({text:e,y:b});for(var w=(b-c.top)/m,x=(b-c.top)/m,S=1;S<=w;S++)g.push({text:e+e*S,y:b-m*S});for(var k=1;k<=x;k++)g.push({text:e-e*k,y:b+m*k})}else{g.push({text:e,y:o});for(var T=(e-n)/(u-1),O=1;O<=u-2;O++)g.push({text:e-T*O,y:y}),y+=m;g.push({text:n,y:r})}for(var E=0;E<=g.length-1;E++){var j=g[E];v.font="100 12px sans-serif",v.fillStyle="#fff",v.textAlign="center",v.textBaseline="middle",v.fillText(j.text.toFixed(h),p.clientWidth-c.right/2,j.y+2)}}}},{key:"drawLine",value:function(){for(var t=this.canvas,e=this.settings,n=e.line,i=e.view,o=n.styles,r=o.gradient,a=o.color,s=o.width,l=i.styles.background,f=t.context,c=t.element,u=this.getLineDrawCoords(),d=u.lineStart,h=u.lineEnd,p=u.lineView,v=u.lineTop,g=u.lineBottom,m=u.lineHeight,y=this.getDots("draw"),b=y.dots,w=y.min,x=y.max,S=d,k=b.length-1,T=k;T>=0;T--){var O=b[T],E=O.value,j=p/k;O.x=S,O.y=v+m-m*(100*(E-w)/(x-w)/100),O.y||(O.y=m/2+v),S-=j}if(f.beginPath(),f.lineWidth=s,f.strokeStyle=a,f.lineJoin="round",r.enable){var L=f.createLinearGradient(0,v,0,m);L.addColorStop(0,r.from),L.addColorStop(1,r.to),f.fillStyle=L,f.lineTo(d,m)}for(var C=k;C>=0;C--){var P=b[C];f.lineTo(P.x,P.y)}r.enable&&(f.lineTo(h,g),f.fill()),f.stroke(),r.enable&&(f.beginPath(),f.lineWidth=s+1,f.strokeStyle=l,f.lineTo(h,0),f.lineTo(h,c.clientHeight),f.lineTo(d,c.clientHeight),f.lineTo(d,0),f.stroke())}},{key:"drawTarget",value:function(){var t=this.canvas,e=this.settings,n=e.target,o=e.offset,r=e.valuesLine,a=e.timeStamp,s=n.styles,f=n.coords,c=f.x,u=f.y,d=t.element,h=t.context,p=i(this.getDots("draw").dots),v=!1;if(n.enable&&c&&u){for(var g=0;g<=p.length-1;g++){var m=p[g],y=p[g+1];y&&c>=m.x&&c<=y.x&&(v=(y.x+m.x)/2<=c?y:m)}if(v){h.lineWidth=s.lineWidth,h.strokeStyle=s.lineColor,h.beginPath(),h.moveTo(0+o.left,v.y),h.lineTo(d.clientWidth-o.right,v.y),h.stroke(),h.beginPath(),h.moveTo(v.x,0+o.top),h.lineTo(v.x,d.clientHeight-o.bottom),h.stroke(),h.beginPath(),h.strokeStyle=h.fillStyle=s.dotColor,h.arc(v.x,v.y,s.dotWidth,0,2*Math.PI),h.fill(),h.stroke();var b={bottom:{background:s.panelBackground,color:s.panelColor,width:80,height:o.bottom,x:v.x-40,y:d.clientHeight-o.bottom,text:l(v&&v.time?v.time:a)},right:{background:s.panelBackground,color:s.panelColor,width:o.right,height:20,x:d.clientWidth-o.right,y:v.y-10,text:v.value.toFixed(r.digits||2)}};Object.values(b).forEach((function(t){h.strokeStyle=h.fillStyle=t.background,h.beginPath(),h.rect(t.x,t.y,t.width,t.height),h.fill(),h.stroke(),h.font="100 12px sans-serif",h.fillStyle=t.color,h.textAlign=t.textAlign,h.textBaseline="center",h.fillText(t.text,t.x+t.width/2,t.y+t.height/2+2)}))}}}},{key:"drawGrid",value:function(){var t=this.canvas,e=this.settings,n=e.grid,i=e.offset,o=t.element,r=t.context,a=n.enable,s=n.steps,l=n.styles,f=n.type;if(a){r.lineWidth=l.width,r.strokeStyle=l.color,r.beginPath(),r.lineTo(0+i.left,0+i.top),r.lineTo(o.clientWidth-i.right,0+i.top),r.lineTo(o.clientWidth-i.right,o.clientHeight-i.bottom),r.lineTo(0+i.left,o.clientHeight-i.bottom),r.lineTo(0+i.left,0+i.top),r.stroke();var c=[],u=[],d="px"===f,h=(o.clientWidth-i.right-i.left)/s.x,p=0+i.left,v=(o.clientHeight-i.top-i.bottom)/s.y,g=0+i.top;if(d){for(var m=1;m<h;m++){var y=p+m*s.x;c.push(y)}for(var b=1;b<v;b++){var w=g+b*s.y;u.push(w)}}else{for(var x=1;x<s.x;x++){var S=p+x*h;c.push(S)}for(var k=1;k<s.y;k++){var T=g+k*v;u.push(T)}}for(var O=0;O<=c.length-1;O++)r.beginPath(),r.lineTo(c[O],0+i.top),r.lineTo(c[O],o.clientHeight-i.bottom),r.stroke();for(var E=0;E<=u.length-1;E++)r.beginPath(),r.lineTo(0+i.left,u[E]),r.lineTo(o.clientWidth-i.right,u[E]),r.stroke()}}},{key:"listeners",value:function(){var t=this,e=this.canvas,n=this.settings.target,i=e.element,o=!1,r=0,a=0,s=function(){n.coords={x:!1,y:!1}},l=function(t){o=!1,r=0,a=0};i.addEventListener("mouseup",(function(){l()})),i.addEventListener("mouseleave",(function(){l(),s()})),i.addEventListener("mousedown",(function(t){o={x:t.clientX,y:t.clientY},r=t.clientX,a=t.clientY})),i.addEventListener("mousemove",(function(e){var l=t.settings,f=l.valuesLine,c=l.timeLine,u=l.data,d=l.line,h=l.offset,p=t.getDots("all").dots,v=i.getBoundingClientRect();if(s(),i.style.cursor="default",e.clientX>=v.left+h.left+1&&e.clientX<=v.left+v.width-h.right&&e.clientY>=v.top+h.top&&e.clientY<=v.bottom-h.bottom&&(n.enable&&(i.style.cursor="crosshair"),n.coords={x:e.clientX-v.left,y:e.clientY-v.top}),e.clientX>=v.left+d.offset.left&&e.clientX<=v.left+v.width-d.offset.right&&e.clientY>=v.top+h.top&&e.clientY<=v.bottom-h.bottom&&o){var g=u.offset+e.clientX-r;g<0&&(g=0),g>p.length-u.limit.value&&(g=p.length-u.limit.value),u.offset=g}if(f.enable&&f.resize&&e.clientX>=v.left+v.width-h.right&&(i.style.cursor="row-resize",o)){var m=a-e.clientY,y=e.clientY-a,b=e.clientY>a,w=e.clientY<a;if(b){var x=(v.height+h.top-h.bottom)/2-60,S=(v.height+h.bottom-h.top)/2-60;d.offset.top=d.offset.top-m<x?d.offset.top-m:x,d.offset.bottom=d.offset.bottom+y<S?d.offset.bottom+y:S}w&&(d.offset.top=d.offset.top-m>h.top?d.offset.top-m:h.top,d.offset.bottom=d.offset.bottom+y>h.bottom?d.offset.bottom+y:h.bottom)}if(c.enable&&c.resize&&e.clientX>=v.left+d.offset.left&&e.clientX<=v.left+v.width-d.offset.right&&e.clientY>=v.bottom-h.bottom&&(i.style.cursor="col-resize",o)){var k=u.limit.value+e.clientX-r;u.limit.value=u.limit.min&&k<u.limit.min?u.limit.min:u.limit.max&&k>u.limit.max?u.limit.max:p.length<k?p.length:k<=2?2:k}o&&(r=e.clientX,a=e.clientY)}))}}])&&s(e.prototype,n),o&&s(e,o),t}();n(0);const u=function(t,e){return new Promise((function(n,i){e||i("Empty request"),e.start&&e.start();let o=new XMLHttpRequest,r=e.url?e.url:"",a=!e.async||e.async,s=e.data,l=!!e.clearData,f=!!e.responseHeaders,c=0;if("GET"===t)for(let t in s)r+=c?"&"+t+"="+s[t]:"?"+t+"="+s[t],c++;if(o.open(t,r,a),e.headers)for(let t in e.headers)o.setRequestHeader(t,e.headers[t]);o.send(JSON.stringify(s)),o.onreadystatechange=function(){if(f&&this.readyState==this.HEADERS_RECEIVED){f=o.getAllResponseHeaders().trim().split(/[\r\n]+/);let t={};f.forEach((function(e){let n=e.split(": "),i=n.shift(),o=n.join(": ");t[i]=o})),f=t}if(4==o.readyState)if(o.status<200||o.status>300){e.end&&e.end();let t=l?JSON.parse(o.response):o;i(t)}else{e.end&&e.end();let t=l?JSON.parse(o.response):o;f&&(t.headers=f),n(t)}}}))};const d=function(){this.getParams=()=>{let t=window.location.search;return t?(/^[?#]/.test(t)?t.slice(1):t).split("&").reduce((t,e)=>{let[n,i]=e.split("=");return t[n]=i?decodeURIComponent(i.replace(/\+/g," ")):"",t},{}):{}},this.getParam=t=>this.getParams()[t]||null,this.getParamSingle=function(t){return(t=new RegExp("[?&]"+encodeURIComponent(t)+"=([^&]*)").exec(location.search))?decodeURIComponent(t[1]):null},this.updateQueryString=(t,e,n=!1)=>{n||(n=window.location.href);var i,o=new RegExp("([?&])"+t+"=.*?(&|#|$)(.*)","gi");if(o.test(n))return null!=e?n.replace(o,"$1"+t+"="+e+"$2$3"):(i=n.split("#"),n=i[0].replace(o,"$1$3").replace(/(&|\?)$/,""),void 0!==i[1]&&null!==i[1]&&(n+="#"+i[1]),n);if(null!=e){var r=-1!==n.indexOf("?")?"&":"?";return i=n.split("#"),n=i[0]+r+t+"="+e,void 0!==i[1]&&null!==i[1]&&(n+="#"+i[1]),n}return n},this.setParam=(t,e)=>{let n=this.updateQueryString(t,e);window.history.pushState({path:n},"",n)}};var h=new function(){this.post=function(t){return u("POST",t)},this.get=function(t){return u("GET",t)},this.put=function(t){return u("PUT",t)},this.delete=function(t){return u("DELETE",t)}},p=new d;window.addEventListener("load",(function(){document.querySelectorAll("canvas").forEach((function(t){var e=new c({canvas:t}),n=p.getParam("symbol");setInterval((function(){n?h.get({url:"https://quotes.instaforex.com/api/quotesTick",clearData:!0,data:{q:n}}).then((function(t){t&&t[0]&&e.newDot({value:(t[0].ask+t[0].bid)/2})})):e.newDot()}),100)}))}))}])}));