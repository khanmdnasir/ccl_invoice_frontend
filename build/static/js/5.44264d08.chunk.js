(this["webpackJsonpubold-react"]=this["webpackJsonpubold-react"]||[]).push([[5],{1017:function(e,t,c){"use strict";c.r(t);var a=c(2),n=c.n(a),o=c(729),r=c(730),l=c(14),s=c(797),i=c(22),u=c(66),h=c(728),O=c(0),b=function(e){var t=e.changeLayoutType,c=e.layoutType,a=e.layoutConstants;return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Layout"}),Object(O.jsxs)(h.a.Check,{className:"form-check form-switch mb-1",children:[Object(O.jsx)(h.a.Check.Input,{type:"radio",onChange:function(e){return t(e.target.value)},name:"layout-type",value:a.LAYOUT_VERTICAL,id:"vertical-layout",checked:c===a.LAYOUT_VERTICAL}),Object(O.jsx)(h.a.Check.Label,{htmlFor:"vertical-layout",children:"Vertical Layout"})]}),Object(O.jsxs)(h.a.Check,{className:"form-check form-switch mb-1",children:[Object(O.jsx)(h.a.Check.Input,{type:"radio",onChange:function(e){return t(e.target.value)},name:"layout-type",value:a.LAYOUT_HORIZONTAL,id:"horizontal-layout",checked:c===a.LAYOUT_HORIZONTAL}),Object(O.jsx)(h.a.Check.Label,{htmlFor:"horizontal-layout",children:"Horizontal Layout"})]}),Object(O.jsxs)(h.a.Check,{className:"form-check form-switch mb-1",children:[Object(O.jsx)(h.a.Check.Input,{type:"radio",onChange:function(e){return t(e.target.value)},name:"layout-type",value:a.LAYOUT_DETACHED,id:"detached-layout",checked:c===a.LAYOUT_DETACHED}),Object(O.jsx)(h.a.Check.Label,{htmlFor:"detached-layout",children:"Detached Layout"})]}),Object(O.jsxs)(h.a.Check,{className:"form-check form-switch mb-1",children:[Object(O.jsx)(h.a.Check.Input,{type:"radio",onChange:function(e){return t(e.target.value)},name:"layout-type",value:a.LAYOUT_TWO_COLUMN,id:"two-column-layout",checked:c===a.LAYOUT_TWO_COLUMN}),Object(O.jsx)(h.a.Check.Label,{htmlFor:"two-column-layout",children:"Two Column Layout"})]})]})},j=function(e){var t=e.changeLayoutColorScheme,c=e.layoutColor,a=e.layoutConstants;return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Color Scheme"}),Object(O.jsxs)(h.a.Check,{className:"form-check form-switch mb-1",children:[Object(O.jsx)(h.a.Check.Input,{type:"radio",name:"layout-color",id:"light-mode-check",value:a.LAYOUT_COLOR_LIGHT,onChange:function(e){return t(e.target.value)},checked:c===a.LAYOUT_COLOR_LIGHT}),Object(O.jsx)(h.a.Check.Label,{htmlFor:"light-mode-check",children:"Light Mode"})]}),Object(O.jsxs)(h.a.Check,{className:"form-check form-switch mb-1",children:[Object(O.jsx)(h.a.Check.Input,{type:"radio",name:"layout-color",id:"dark-mode-check",value:a.LAYOUT_COLOR_DARK,onChange:function(e){return t(e.target.value)},checked:c===a.LAYOUT_COLOR_DARK}),Object(O.jsx)(h.a.Check.Label,{htmlFor:"dark-mode-check",children:"Dark Mode"})]})]})},d=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return{layoutColor:e.Layout.layoutColor,layoutType:e.Layout.layoutType}})),c=t.layoutColor,a=t.layoutType,o=function(t){switch(t){case"horizontal":e(Object(i.e)(u.b.LAYOUT_HORIZONTAL));break;case"detached":e(Object(i.e)(u.b.LAYOUT_DETACHED));break;case"vertical":e(Object(i.e)(u.b.LAYOUT_VERTICAL));break;default:e(Object(i.e)(u.b.LAYOUT_TWO_COLUMN))}},r=function(t){if("dark"===t)e(Object(i.f)(u.a.LAYOUT_COLOR_DARK));else e(Object(i.f)(u.a.LAYOUT_COLOR_LIGHT))},s=function(){o(u.b.LAYOUT_TWO_COLUMN),r(u.a.LAYOUT_COLOR_LIGHT),function(t){var c=t;e(Object(i.C)(c))}(!1)};return Object(O.jsxs)(n.a.Fragment,{children:[Object(O.jsx)("h6",{className:"fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light",children:Object(O.jsx)("span",{className:"d-block py-1",children:"Theme Settings"})}),Object(O.jsxs)("div",{className:"p-3",children:[Object(O.jsxs)("div",{className:"alert alert-warning",role:"alert",children:[Object(O.jsx)("strong",{children:"Customize "})," the overall color scheme, sidebar menu, etc."]}),Object(O.jsx)(b,{changeLayoutType:o,layoutType:a,layoutConstants:u.b}),Object(O.jsx)(j,{changeLayoutColorScheme:r,layoutColor:c,layoutConstants:u.a}),Object(O.jsx)("div",{className:"d-grid mt-4",children:Object(O.jsx)("button",{className:"btn btn-primary",id:"resetBtn",onClick:function(){return s()},children:"Reset to Default"})})]})]})};t.default=function(e){var t=Object(l.b)(),c=Object(a.useRef)(null),u=Object(l.c)((function(e){return{isOpenRightSideBar:e.Layout.isOpenRightSideBar}})).isOpenRightSideBar,h=Object(a.useCallback)((function(e){if(u){if(c&&c.current&&c.current.contains(e.target))return;t(Object(i.w)())}}),[c,t,u]);return Object(a.useEffect)((function(){return document.addEventListener("mousedown",h,!1),function(){document.removeEventListener("mousedown",h,!1)}}),[h]),Object(O.jsxs)(n.a.Fragment,{children:[Object(O.jsx)("div",{className:"right-bar",ref:c,children:Object(O.jsx)(s.a,{style:{maxHeight:"100%",zIndex:1e4},timeout:500,scrollbarMaxSize:320,children:Object(O.jsxs)(o.a.Container,{id:"left-tabs-example",defaultActiveKey:"themecustomizer",children:[Object(O.jsx)(r.a,{variant:"tabs",className:"nav-bordered nav-justified",children:Object(O.jsx)(r.a.Item,{as:"li",children:Object(O.jsx)(r.a.Link,{eventKey:"themecustomizer",className:"py-2 cursor-pointer",children:Object(O.jsx)("i",{className:"mdi mdi-cog-outline d-block font-22 my-1"})})})}),Object(O.jsx)(o.a.Content,{className:"p-0",children:Object(O.jsx)(o.a.Pane,{eventKey:"themecustomizer",children:Object(O.jsx)(d,{})})})]})})}),Object(O.jsx)("div",{className:"rightbar-overlay"})]})}}}]);
//# sourceMappingURL=5.44264d08.chunk.js.map