(this["webpackJsonpubold-react"]=this["webpackJsonpubold-react"]||[]).push([[22],{1004:function(e,t,a){"use strict";a.r(t);var s=a(5),c=a(1),r=a(613),n=a(609),l=a(9),i=a(35),o=a(607),m=a(91),b=a(208),j=a(13),d=a(72),u=a(127),h=a(0),O=new j.a,x=function(){var e=Object(o.a)().t;return Object(h.jsx)("footer",{className:"footer footer-alt",children:Object(h.jsxs)("p",{className:"text-muted",children:[e("Back to")," ",Object(h.jsx)(l.b,{to:"/auth/login",className:"text-muted ms-1",children:Object(h.jsx)("b",{children:e("Log in")})})]})})};t.default=function(){var e=Object(o.a)().t,t=Object(i.g)(),a=Object(c.useState)(null),l=Object(s.a)(a,2),j=l[0],p=(l[1],Object(b.a)(m.b().shape({email:m.c().required(e("Please enter email"))})));return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(u.a,{bottomLinks:Object(h.jsx)(x,{}),children:[Object(h.jsx)("h4",{className:"mt-0",children:e("Recover Password")}),Object(h.jsx)("p",{className:"text-muted mb-4",children:e("Enter your email address and we'll send you an email with instructions to reset your password")}),j&&Object(h.jsx)(r.a,{variant:"danger",className:"my-2",children:j}),Object(h.jsxs)(d.b,{onSubmit:function(e){try{O.create("/api/password_reset/",{email:e.email}).then((function(a){t.push({pathname:"/auth/confirm",state:{email:e.email}})})).catch((function(e){console.log(e)}))}catch(j){console.log(j)}},resolver:p,children:[Object(h.jsx)(d.a,{label:e("Email"),type:"email",name:"email",placeholder:e("Enter your email"),containerClass:"mb-3"}),Object(h.jsx)("div",{className:"mb-0 text-center d-grid",children:Object(h.jsx)(n.a,{variant:"primary",type:"submit",children:e("Reset Password")})})]})]})})}}}]);
//# sourceMappingURL=22.2391f530.chunk.js.map