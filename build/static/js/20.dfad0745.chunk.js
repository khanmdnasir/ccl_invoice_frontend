(this["webpackJsonpubold-react"]=this["webpackJsonpubold-react"]||[]).push([[20],{1006:function(e,t,c){"use strict";c.r(t);var n=c(5),a=c(1),s=c(13),i=c(605),r=c(203),l=c(606),o=c(613),b=c(617),j=c(609),u=c(81),d=c(60),O=c(29),m=c(9),h=c(6),x=c(12),p=c(78),f=c(0),g=new s.a,v=[{Header:"Name",accessor:"basic_info",sort:!0,Cell:function(e){var t=e.row;return Object(f.jsx)(f.Fragment,{children:Object(f.jsx)(m.b,{to:"#",className:"text-body fw-semibold",children:t.original.name})})},className:"table-user"},{Header:"Action",accessor:"action",sort:!1,Cell:Object(u.withSwal)((function(e){var t=e.row,c=e.swal,n=Object(h.b)(),a=Object(h.c)((function(e){return e.Role.user_role}));return Object(f.jsxs)(f.Fragment,{children:[a.includes("change_group")?Object(f.jsx)(m.b,{to:{pathname:"/app/add_role",state:t.original},className:"action-icon",children:Object(f.jsx)("i",{className:"mdi mdi-square-edit-outline"})}):Object(f.jsx)(m.b,{to:"#",className:"action-icon",style:{pointerEvents:"none"},children:Object(f.jsx)("i",{className:"mdi mdi-square-edit-outline"})}),a.includes("delete_group")?Object(f.jsx)(m.b,{to:"#",className:"action-icon",onClick:function(){return t.original.id,void c.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#28bb4b",cancelButtonColor:"#f34e4e",confirmButtonText:"Yes, delete it!"}).then((function(e){e.value?g.delete("/api/groups/".concat(t.original.id,"/")).then((function(e){n(Object(x.t)(10,1)),c.fire("Deleted!","Item has been deleted.","success")})).catch((function(e){c.fire({title:e})})):"cancel"===e.dismiss&&console.log("cancel")}))},children:Object(f.jsx)("i",{className:"mdi mdi-delete"})}):Object(f.jsx)(m.b,{to:"#",className:"action-icon",style:{pointerEvents:"none"},children:Object(f.jsx)("i",{className:"mdi mdi-delete"})})]})}))}];t.default=function(){var e=Object(h.b)(),t=Object(h.c)((function(e){return e.Role.roles})),c=Object(h.c)((function(e){return e.Role.previous})),s=Object(h.c)((function(e){return e.Role.next})),u=Object(h.c)((function(e){return e.Role.current_page})),g=Object(h.c)((function(e){return e.Role.total_page})),N=Object(h.c)((function(e){return e.Role.active})),w=Object(h.c)((function(e){return e.Role.loading})),_=Object(h.c)((function(e){return e.Role.error})),R=Object(h.c)((function(e){return e.Role.user_role})),y=Object(a.useState)(6),C=Object(n.a)(y,2),B=C[0],S=C[1];return Object(a.useEffect)((function(){e(Object(x.t)(B,1))}),[B]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(O.a,{breadCrumbItems:[{label:"Roles",path:"/app/roles",active:!0}],title:"Roles"}),Object(f.jsx)(i.a,{children:Object(f.jsx)(r.a,{children:Object(f.jsx)(l.a,{children:Object(f.jsxs)(l.a.Body,{children:[!w&&_&&Object(f.jsx)(o.a,{variant:"danger",className:"my-2",children:_}),Object(f.jsxs)(i.a,{className:"mb-2",children:[Object(f.jsx)(r.a,{sm:4,children:Object(f.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(f.jsx)("span",{className:"me-2",children:"Short By:"}),Object(f.jsxs)(b.a.Select,{style:{width:"40%"},onChange:function(e){return S(e.target.value)},children:[Object(f.jsx)("option",{value:"6",children:"6"}),Object(f.jsx)("option",{value:"10",children:"10"}),Object(f.jsx)("option",{value:"15",children:"15"}),Object(f.jsx)("option",{value:"20",children:"20"})]})]})}),Object(f.jsx)(r.a,{sm:8,children:Object(f.jsx)("div",{className:"text-sm-end mt-2 mt-sm-0",children:R.includes("add_group")?Object(f.jsx)(m.b,{to:"/app/add_role",children:Object(f.jsxs)(j.a,{className:"btn btn-success mb-2 me-1",children:[Object(f.jsx)("i",{className:"mdi mdi-plus-circle me-1"})," Add New"]})}):""})})]}),w?Object(f.jsx)("p",{children:"Loading..."}):Object(f.jsx)(f.Fragment,{children:t.length>0?Object(f.jsx)(d.a,{columns:v,data:t,pageSize:B,isSortable:!0,pagination:!1,isSearchable:!0,tableClass:"table-nowrap table-hover",searchBoxClass:""}):"No role available!"}),Object(f.jsx)(p.a,{visitPage:function(t){e(Object(x.t)(B,t))},previous_number:function(){e(Object(x.t)(B,c))},next_number:function(){e(Object(x.t)(B,s))},total_page:g,current_page:u,active:N})]})})})})]})}}}]);
//# sourceMappingURL=20.dfad0745.chunk.js.map