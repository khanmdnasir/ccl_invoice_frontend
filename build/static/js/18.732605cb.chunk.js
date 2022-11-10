(this["webpackJsonpubold-react"]=this["webpackJsonpubold-react"]||[]).push([[18],{1001:function(e,n,t){"use strict";var r=t(2),o=t.n(r),i=t(47),a=t.n(i),u=t(6),c=new Map([["avi","video/avi"],["gif","image/gif"],["ico","image/x-icon"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["mkv","video/x-matroska"],["mov","video/quicktime"],["mp4","video/mp4"],["pdf","application/pdf"],["png","image/png"],["zip","application/zip"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]]);function l(e,n){var t=function(e){var n=e.name;if(n&&-1!==n.lastIndexOf(".")&&!e.type){var t=n.split(".").pop().toLowerCase(),r=c.get(t);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!==typeof t.path){var r=e.webkitRelativePath;Object.defineProperty(t,"path",{value:"string"===typeof n?n:"string"===typeof r&&r.length>0?r:e.name,writable:!1,configurable:!1,enumerable:!0})}return t}var s=[".DS_Store","Thumbs.db"];function f(e){return(null!==e.target&&e.target.files?g(e.target.files):[]).map((function(e){return l(e)}))}function p(e,n){return Object(u.b)(this,void 0,void 0,(function(){var t;return Object(u.d)(this,(function(r){switch(r.label){case 0:return e.items?(t=g(e.items).filter((function(e){return"file"===e.kind})),"drop"!==n?[2,t]:[4,Promise.all(t.map(v))]):[3,2];case 1:return[2,d(b(r.sent()))];case 2:return[2,d(g(e.files).map((function(e){return l(e)})))]}}))}))}function d(e){return e.filter((function(e){return-1===s.indexOf(e.name)}))}function g(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];n.push(r)}return n}function v(e){if("function"!==typeof e.webkitGetAsEntry)return m(e);var n=e.webkitGetAsEntry();return n&&n.isDirectory?h(n):m(e)}function b(e){return e.reduce((function(e,n){return Object(u.f)(e,Array.isArray(n)?b(n):[n])}),[])}function m(e){var n=e.getAsFile();if(!n)return Promise.reject(e+" is not a File");var t=l(n);return Promise.resolve(t)}function y(e){return Object(u.b)(this,void 0,void 0,(function(){return Object(u.d)(this,(function(n){return[2,e.isDirectory?h(e):O(e)]}))}))}function h(e){var n=e.createReader();return new Promise((function(e,t){var r=[];!function o(){var i=this;n.readEntries((function(n){return Object(u.b)(i,void 0,void 0,(function(){var i,a,c;return Object(u.d)(this,(function(u){switch(u.label){case 0:if(n.length)return[3,5];u.label=1;case 1:return u.trys.push([1,3,,4]),[4,Promise.all(r)];case 2:return i=u.sent(),e(i),[3,4];case 3:return a=u.sent(),t(a),[3,4];case 4:return[3,6];case 5:c=Promise.all(n.map(y)),r.push(c),o(),u.label=6;case 6:return[2]}}))}))}),(function(e){t(e)}))}()}))}function O(e){return Object(u.b)(this,void 0,void 0,(function(){return Object(u.d)(this,(function(n){return[2,new Promise((function(n,t){e.file((function(t){var r=l(t,e.fullPath);n(r)}),(function(e){t(e)}))}))]}))}))}var D=t(941),j=t.n(D);function w(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var r,o,i=[],a=!0,u=!1;try{for(t=t.call(e);!(a=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);a=!0);}catch(c){u=!0,o=c}finally{try{a||null==t.return||t.return()}finally{if(u)throw o}}return i}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return F(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return F(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var A="file-invalid-type",E="file-too-large",k="file-too-small",C="too-many-files",S=function(e){e=Array.isArray(e)&&1===e.length?e[0]:e;var n=Array.isArray(e)?"one of ".concat(e.join(", ")):e;return{code:A,message:"File type must be ".concat(n)}},P=function(e){return{code:E,message:"File is larger than ".concat(e," bytes")}},x=function(e){return{code:k,message:"File is smaller than ".concat(e," bytes")}},z={code:C,message:"Too many files"};function R(e,n){var t="application/x-moz-file"===e.type||j()(e,n);return[t,t?null:S(n)]}function T(e,n,t){if(I(e.size))if(I(n)&&I(t)){if(e.size>t)return[!1,P(t)];if(e.size<n)return[!1,x(n)]}else{if(I(n)&&e.size<n)return[!1,x(n)];if(I(t)&&e.size>t)return[!1,P(t)]}return[!0,null]}function I(e){return void 0!==e&&null!==e}function L(e){var n=e.files,t=e.accept,r=e.minSize,o=e.maxSize,i=e.multiple,a=e.maxFiles;return!(!i&&n.length>1||i&&a>=1&&n.length>a)&&n.every((function(e){var n=w(R(e,t),1)[0],i=w(T(e,r,o),1)[0];return n&&i}))}function K(e){return"function"===typeof e.isPropagationStopped?e.isPropagationStopped():"undefined"!==typeof e.cancelBubble&&e.cancelBubble}function B(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,(function(e){return"Files"===e||"application/x-moz-file"===e})):!!e.target&&!!e.target.files}function M(e){e.preventDefault()}function $(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}function _(e){return-1!==e.indexOf("Edge/")}function q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return $(e)||_(e)}function G(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return n.some((function(n){return!K(e)&&n&&n.apply(void 0,[e].concat(r)),K(e)}))}}var J=["children"],N=["open"],U=["refKey","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],W=["refKey","onChange","onClick"];function H(e){return function(e){if(Array.isArray(e))return X(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||V(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==t)return;var r,o,i=[],a=!0,u=!1;try{for(t=t.call(e);!(a=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);a=!0);}catch(c){u=!0,o=c}finally{try{a||null==t.return||t.return()}finally{if(u)throw o}}return i}(e,n)||V(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,n){if(e){if("string"===typeof e)return X(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?X(e,n):void 0}}function X(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function Y(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function Z(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?Y(Object(t),!0).forEach((function(n){ee(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Y(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function ee(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function ne(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var te=Object(r.forwardRef)((function(e,n){var t=e.children,i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Z(Z({},re),e),t=n.accept,o=n.disabled,i=n.getFilesFromEvent,a=n.maxSize,u=n.minSize,c=n.multiple,l=n.maxFiles,s=n.onDragEnter,f=n.onDragLeave,p=n.onDragOver,d=n.onDrop,g=n.onDropAccepted,v=n.onDropRejected,b=n.onFileDialogCancel,m=n.preventDropOnDocument,y=n.noClick,h=n.noKeyboard,O=n.noDrag,D=n.noDragEventsBubbling,j=n.validator,w=Object(r.useRef)(null),F=Object(r.useRef)(null),A=Q(Object(r.useReducer)(ie,oe),2),E=A[0],k=A[1],C=E.isFocused,S=E.isFileDialogActive,P=E.draggedFiles,x=Object(r.useCallback)((function(){F.current&&(k({type:"openDialog"}),F.current.value=null,F.current.click())}),[k]),I=function(){S&&setTimeout((function(){F.current&&(F.current.files.length||(k({type:"closeDialog"}),"function"===typeof b&&b()))}),300)};Object(r.useEffect)((function(){return window.addEventListener("focus",I,!1),function(){window.removeEventListener("focus",I,!1)}}),[F,S,b]);var $=Object(r.useCallback)((function(e){w.current&&w.current.isEqualNode(e.target)&&(32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),x()))}),[w,F]),_=Object(r.useCallback)((function(){k({type:"focus"})}),[]),J=Object(r.useCallback)((function(){k({type:"blur"})}),[]),N=Object(r.useCallback)((function(){y||(q()?setTimeout(x,0):x())}),[F,y]),V=Object(r.useRef)([]),X=function(e){w.current&&w.current.contains(e.target)||(e.preventDefault(),V.current=[])};Object(r.useEffect)((function(){return m&&(document.addEventListener("dragover",M,!1),document.addEventListener("drop",X,!1)),function(){m&&(document.removeEventListener("dragover",M),document.removeEventListener("drop",X))}}),[w,m]);var Y=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),fe(e),V.current=[].concat(H(V.current),[e.target]),B(e)&&Promise.resolve(i(e)).then((function(n){K(e)&&!D||(k({draggedFiles:n,isDragActive:!0,type:"setDraggedFiles"}),s&&s(e))}))}),[i,s,D]),te=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),fe(e);var n=B(e);if(n&&e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(t){}return n&&p&&p(e),!1}),[p,D]),ae=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),fe(e);var n=V.current.filter((function(e){return w.current&&w.current.contains(e)})),t=n.indexOf(e.target);-1!==t&&n.splice(t,1),V.current=n,n.length>0||(k({isDragActive:!1,type:"setDraggedFiles",draggedFiles:[]}),B(e)&&f&&f(e))}),[w,f,D]),ue=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),fe(e),V.current=[],B(e)&&Promise.resolve(i(e)).then((function(n){if(!K(e)||D){var r=[],o=[];n.forEach((function(e){var n=Q(R(e,t),2),i=n[0],c=n[1],l=Q(T(e,u,a),2),s=l[0],f=l[1],p=j?j(e):null;if(i&&s&&!p)r.push(e);else{var d=[c,f];p&&(d=d.concat(p)),o.push({file:e,errors:d.filter((function(e){return e}))})}})),(!c&&r.length>1||c&&l>=1&&r.length>l)&&(r.forEach((function(e){o.push({file:e,errors:[z]})})),r.splice(0)),k({acceptedFiles:r,fileRejections:o,type:"setFiles"}),d&&d(r,o,e),o.length>0&&v&&v(o,e),r.length>0&&g&&g(r,e)}})),k({type:"reset"})}),[c,t,u,a,l,i,d,g,v,D,j]),ce=function(e){return o?null:e},le=function(e){return h?null:ce(e)},se=function(e){return O?null:ce(e)},fe=function(e){D&&e.stopPropagation()},pe=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.refKey,t=void 0===n?"ref":n,r=e.onKeyDown,i=e.onFocus,a=e.onBlur,u=e.onClick,c=e.onDragEnter,l=e.onDragOver,s=e.onDragLeave,f=e.onDrop,p=ne(e,U);return Z(Z(ee({onKeyDown:le(G(r,$)),onFocus:le(G(i,_)),onBlur:le(G(a,J)),onClick:ce(G(u,N)),onDragEnter:se(G(c,Y)),onDragOver:se(G(l,te)),onDragLeave:se(G(s,ae)),onDrop:se(G(f,ue))},t,w),o||h?{}:{tabIndex:0}),p)}}),[w,$,_,J,N,Y,te,ae,ue,h,O,o]),de=Object(r.useCallback)((function(e){e.stopPropagation()}),[]),ge=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.refKey,r=void 0===n?"ref":n,o=e.onChange,i=e.onClick,a=ne(e,W);return Z(Z({},ee({accept:t,multiple:c,type:"file",style:{display:"none"},onChange:ce(G(o,ue)),onClick:ce(G(i,de)),autoComplete:"off",tabIndex:-1},r,F)),a)}}),[F,t,c,ue,o]),ve=P.length,be=ve>0&&L({files:P,accept:t,minSize:u,maxSize:a,multiple:c,maxFiles:l}),me=ve>0&&!be;return Z(Z({},E),{},{isDragAccept:be,isDragReject:me,isFocused:C&&!o,getRootProps:pe,getInputProps:ge,rootRef:w,inputRef:F,open:ce(x)})}(ne(e,J)),a=i.open,u=ne(i,N);return Object(r.useImperativeHandle)(n,(function(){return{open:a}}),[a]),o.a.createElement(r.Fragment,null,t(Z(Z({},u),{},{open:a})))}));te.displayName="Dropzone";var re={disabled:!1,getFilesFromEvent:function(e){return Object(u.b)(this,void 0,void 0,(function(){return Object(u.d)(this,(function(n){return[2,(t=e,t.dataTransfer&&e.dataTransfer?p(e.dataTransfer,e.type):f(e))];var t}))}))},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null};te.defaultProps=re,te.propTypes={children:a.a.func,accept:a.a.oneOfType([a.a.string,a.a.arrayOf(a.a.string)]),multiple:a.a.bool,preventDropOnDocument:a.a.bool,noClick:a.a.bool,noKeyboard:a.a.bool,noDrag:a.a.bool,noDragEventsBubbling:a.a.bool,minSize:a.a.number,maxSize:a.a.number,maxFiles:a.a.number,disabled:a.a.bool,getFilesFromEvent:a.a.func,onFileDialogCancel:a.a.func,onDragEnter:a.a.func,onDragLeave:a.a.func,onDragOver:a.a.func,onDrop:a.a.func,onDropAccepted:a.a.func,onDropRejected:a.a.func,validator:a.a.func};n.a=te;var oe={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,draggedFiles:[],acceptedFiles:[],fileRejections:[]};function ie(e,n){switch(n.type){case"focus":return Z(Z({},e),{},{isFocused:!0});case"blur":return Z(Z({},e),{},{isFocused:!1});case"openDialog":return Z(Z({},e),{},{isFileDialogActive:!0});case"closeDialog":return Z(Z({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":var t=n.isDragActive,r=n.draggedFiles;return Z(Z({},e),{},{draggedFiles:r,isDragActive:t});case"setFiles":return Z(Z({},e),{},{acceptedFiles:n.acceptedFiles,fileRejections:n.fileRejections});case"reset":return Z({},oe);default:return e}}},941:function(e,n,t){"use strict";n.__esModule=!0,n.default=function(e,n){if(e&&n){var t=Array.isArray(n)?n:n.split(","),r=e.name||"",o=(e.type||"").toLowerCase(),i=o.replace(/\/.*$/,"");return t.some((function(e){var n=e.trim().toLowerCase();return"."===n.charAt(0)?r.toLowerCase().endsWith(n):n.endsWith("/*")?i===n.replace(/\/.*$/,""):o===n}))}return!0}}}]);
//# sourceMappingURL=18.732605cb.chunk.js.map