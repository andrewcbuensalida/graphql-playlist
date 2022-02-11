(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{53:function(t,e,n){},57:function(t,e,n){"use strict";n.r(e);var c=n(3),r=n(40),a=(n(53),n(67)),i=n(65),o=n(64),d=n(14),s=n(2),j=Object(c.createContext)();function l(t){var e=t.children,n=Object(c.useState)(null),r=Object(d.a)(n,2),a=r[0],i=r[1];return Object(s.jsx)(j.Provider,{value:{selectedBookID:a,setSelectedBookID:i},children:e})}var b,u,O,h,x,v=n(33),k=n.n(v),m=n(41),f=n(69),p=n(68),g=n(21),B=n(66),I=Object(B.a)(b||(b=Object(g.a)(["\n\t{\n\t\tauthors {\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n"]))),D=Object(B.a)(u||(u=Object(g.a)(["\n\t{\n\t\tbooks {\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n"]))),y=Object(B.a)(O||(O=Object(g.a)(["\n\tmutation AddBook($name: String!, $genre: String!, $authorId: ID!) {\n\t\taddBook(name: $name, genre: $genre, authorId: $authorId) {\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n"]))),S=Object(B.a)(h||(h=Object(g.a)(["\n\tquery GetBook($id: ID) {\n\t\tbook(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tgenre\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tage\n\t\t\t\tbooks {\n\t\t\t\t\tname\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"]))),$=Object(B.a)(x||(x=Object(g.a)(["\n\tmutation DeleteBook($id: ID!) {\n\t\tdeleteBook(id: $id) {\n\t\t\tid\n\t\t}\n\t}\n"])));function C(t){var e=t.selectedBookID,n=Object(p.a)(S,{variables:{id:e}}),c=n.data;n.loading,n.error;return Object(s.jsx)("div",{id:"book-details",children:function(){if(c&&c.book){var t=c.book;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:t.name}),Object(s.jsxs)("p",{children:["Genre: ",t.genre]}),Object(s.jsxs)("p",{children:["Author: ",t.author.name]}),Object(s.jsx)("p",{children:"All books by this author:"}),Object(s.jsx)("ul",{className:"other-books",children:t.author.books.map((function(t){return Object(s.jsx)("li",{children:t.name},t.id)}))})]})}return Object(s.jsx)("div",{children:"No book selected..."})}()})}function q(){var t=Object(c.useContext)(j),e=t.selectedBookID,n=t.setSelectedBookID,r=Object(f.a)($),a=Object(d.a)(r,2),i=a[0],o=a[1],l=(o.data,o.loading,o.error,Object(p.a)(D)),b=l.data,u=l.loading;l.error;function O(){return(O=Object(m.a)(k.a.mark((function t(c,r){var a;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.stopPropagation(),t.next=3,i({variables:{id:r},refetchQueries:[{query:D},{query:S,variables:{id:e}}]});case 3:a=t.sent,a.data.deleteBook.id==e&&n(null);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(s.jsxs)("div",{children:[Object(s.jsx)("ul",{id:"book-list",children:u?Object(s.jsx)("div",{children:"Loading books..."}):b.books.map((function(t){return Object(s.jsxs)("li",{onClick:function(e){return n(t.id)},children:[t.name,Object(s.jsx)("button",{onClick:function(e){!function(t,e){O.apply(this,arguments)}(e,t.id)},children:"\xd7"})]},t.id)}))}),Object(s.jsx)(C,{selectedBookID:e})]})}function w(){var t=Object(c.useState)(""),e=Object(d.a)(t,2),n=e[0],r=e[1],a=Object(c.useState)(""),i=Object(d.a)(a,2),o=i[0],l=i[1],b=Object(c.useState)(""),u=Object(d.a)(b,2),O=u[0],h=u[1],x=Object(c.useState)(!1),v=Object(d.a)(x,2),k=v[0],m=v[1],g=Object(c.useContext)(j).selectedBookID,B=Object(p.a)(I),$=B.data,C=B.loading,q=(B.error,Object(f.a)(y)),w=Object(d.a)(q,2),N=w[0],A=w[1];A.data,A.loading,A.error;return Object(s.jsxs)("form",{id:"add-book",onSubmit:function(t){!function(t){t.preventDefault(),""!=n&&""!=o&&""!=O?(m(!1),N({variables:{name:n,genre:o,authorId:O},refetchQueries:[{query:D},{query:S,variables:{id:g}}]}),r(""),l(""),h("")):m(!0)}(t)},children:[k&&Object(s.jsx)("div",{id:"incomplete",children:"Form is incomplete"}),Object(s.jsxs)("div",{className:"field",children:[Object(s.jsx)("label",{children:"Book name:"}),Object(s.jsx)("input",{value:n,type:"text",onChange:function(t){return r(t.target.value)}})]}),Object(s.jsxs)("div",{className:"field",children:[Object(s.jsx)("label",{children:"Genre:"}),Object(s.jsx)("input",{value:o,type:"text",onChange:function(t){return l(t.target.value)}})]}),Object(s.jsxs)("div",{className:"field",children:[Object(s.jsx)("label",{children:"Author:"}),Object(s.jsxs)("select",{value:O,onChange:function(t){return h(t.target.value)},children:[Object(s.jsx)("option",{value:"",children:"Select author"},""),C?Object(s.jsx)("option",{disabled:!0,children:"Loading authors"}):$.authors.map((function(t){return Object(s.jsx)("option",{value:t.id,children:t.name},t.id)}))]})]}),Object(s.jsx)("button",{children:"+"})]})}var N=function(){var t=new a.a,e=new i.a({cache:t,uri:"/graphql"});return Object(s.jsx)(o.a,{client:e,children:Object(s.jsx)(l,{children:Object(s.jsxs)("div",{id:"main",children:[Object(s.jsx)("h1",{children:"Love's Book List"}),Object(s.jsx)(q,{}),Object(s.jsx)(w,{})]})})})};Object(r.render)(Object(s.jsx)(N,{}),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.0a8a2e42.chunk.js.map