!function(e,t,n){function o(e,t){return typeof e===t}function s(){var e,t,n,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],t=c[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(s=o(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?f[r[0]]=s:(!f[r[0]]||f[r[0]]instanceof Boolean||(f[r[0]]=new Boolean(f[r[0]])),f[r[0]][r[1]]=s),u.push((s?"":"no-")+r.join("-"))}}function a(e){var t=p.className,n=f._config.classPrefix||"";if(h&&(t=t.baseVal),f._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}f._config.enableClasses&&(t+=" "+n+e.join(" "+n),h?p.className.baseVal=t:p.className=t)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):h?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function r(){var e=t.body;return e||(e=i(h?"svg":"body"),e.fake=!0),e}function l(e,n,o,s){var a,l,c,d,f="modernizr",u=i("div"),h=r();if(parseInt(o,10))for(;o--;)c=i("div"),c.id=s?s[o]:f+(o+1),u.appendChild(c);return a=i("style"),a.type="text/css",a.id="s"+f,(h.fake?h:u).appendChild(a),h.appendChild(u),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(t.createTextNode(e)),u.id=f,h.fake&&(h.style.background="",h.style.overflow="hidden",d=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),l=n(u,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=d,p.offsetHeight):u.parentNode.removeChild(u),!!l}var c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){c.push({name:e,fn:t,options:n})},addAsyncTest:function(e){c.push({name:null,fn:e})}},f=function(){};f.prototype=d,f=new f;var u=[],p=t.documentElement,h="svg"===p.nodeName.toLowerCase();f.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var v=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];d._prefixes=v,f.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=i("a");return n.style.cssText=e+v.join(t+e),!!n.style.length});var m=d.testStyles=l;m("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),o=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);f.addTest("cssvwunit",o==n)}),f.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var o=["@media (",v.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){n=9===e.offsetTop})}return n}),s(),a(u),delete d.addTest,delete d.addAsyncTest;for(var w=0;w<f._q.length;w++)f._q[w]();e.Modernizr=f}(window,document);