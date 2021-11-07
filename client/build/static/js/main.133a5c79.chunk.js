(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{53:function(t,e,n){},57:function(t,e,n){"use strict";n.r(e);var c=n(3),o=n(40),r=(n(53),n(67)),a=n(65),i=n(64),s=n(14),d=n(2),j=Object(c.createContext)();function l(t){var e=t.children,n=Object(c.useState)(null),o=Object(s.a)(n,2),r=o[0],a=o[1];return Object(d.jsx)(j.Provider,{value:{selectedBookID:r,setSelectedBookID:a},children:e})}var b,u,O,h,x,v=n(33),k=n.n(v),m=n(41),f=n(69),p=n(68),g=n(21),B=n(66),I=Object(B.a)(b||(b=Object(g.a)(["\n\t{\n\t\tauthors {\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n"]))),D=Object(B.a)(u||(u=Object(g.a)(["\n\t{\n\t\tbooks {\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n"]))),y=Object(B.a)(O||(O=Object(g.a)(["\n\tmutation AddBook($name: String!, $genre: String!, $authorId: ID!) {\n\t\taddBook(name: $name, genre: $genre, authorId: $authorId) {\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n"]))),S=Object(B.a)(h||(h=Object(g.a)(["\n\tquery GetBook($id: ID) {\n\t\tbook(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tgenre\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tage\n\t\t\t\tbooks {\n\t\t\t\t\tname\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"]))),$=Object(B.a)(x||(x=Object(g.a)(["\n\tmutation DeleteBook($id: ID!) {\n\t\tdeleteBook(id: $id) {\n\t\t\tid\n\t\t}\n\t}\n"])));function C(t){var e=t.selectedBookID,n=Object(p.a)(S,{variables:{id:e}}),c=n.data;n.loading,n.error;return Object(d.jsx)("div",{id:"book-details",children:function(){if(c&&c.book){var t=c.book;return console.log("This is book.author.books"),console.log(t.author.books),Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:t.name}),Object(d.jsxs)("p",{children:["Genre: ",t.genre]}),Object(d.jsxs)("p",{children:["Author: ",t.author.name]}),Object(d.jsx)("p",{children:"All books by this author:"}),Object(d.jsx)("ul",{className:"other-books",children:t.author.books.map((function(t){return Object(d.jsx)("li",{children:t.name},t.id)}))})]})}return Object(d.jsx)("div",{children:"No book selected..."})}()})}function q(){var t=Object(c.useContext)(j),e=t.selectedBookID,n=t.setSelectedBookID,o=Object(f.a)($),r=Object(s.a)(o,2),a=r[0],i=r[1],l=(i.data,i.loading,i.error,Object(p.a)(D)),b=l.data,u=l.loading;l.error;function O(){return(O=Object(m.a)(k.a.mark((function t(c,o){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.stopPropagation(),t.next=3,a({variables:{id:o},refetchQueries:[{query:D},{query:S,variables:{id:e}}]});case 3:r=t.sent,r.data.deleteBook.id==e&&n(null);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(d.jsxs)("div",{children:[Object(d.jsx)("ul",{id:"book-list",children:u?Object(d.jsx)("div",{children:"Loading books..."}):b.books.map((function(t){return Object(d.jsxs)("li",{onClick:function(e){return n(t.id)},children:[t.name,Object(d.jsx)("button",{onClick:function(e){!function(t,e){O.apply(this,arguments)}(e,t.id)},children:"x"})]},t.id)}))}),Object(d.jsx)(C,{selectedBookID:e})]})}function w(){var t=Object(c.useState)(""),e=Object(s.a)(t,2),n=e[0],o=e[1],r=Object(c.useState)(""),a=Object(s.a)(r,2),i=a[0],l=a[1],b=Object(c.useState)(""),u=Object(s.a)(b,2),O=u[0],h=u[1],x=Object(c.useState)(!1),v=Object(s.a)(x,2),k=v[0],m=v[1],g=Object(c.useContext)(j).selectedBookID,B=Object(p.a)(I),$=B.data,C=B.loading,q=(B.error,Object(f.a)(y)),w=Object(s.a)(q,2),N=w[0],A=w[1];A.data,A.loading,A.error;return Object(d.jsxs)("form",{id:"add-book",onSubmit:function(t){!function(t){t.preventDefault(),""!=n&&""!=i&&""!=O?(m(!1),N({variables:{name:n,genre:i,authorId:O},refetchQueries:[{query:D},{query:S,variables:{id:g}}]}),o(""),l(""),h("")):m(!0)}(t)},children:[k&&Object(d.jsx)("div",{id:"incomplete",children:"Form is incomplete"}),Object(d.jsxs)("div",{className:"field",children:[Object(d.jsx)("label",{children:"Book name:"}),Object(d.jsx)("input",{value:n,type:"text",onChange:function(t){return o(t.target.value)}})]}),Object(d.jsxs)("div",{className:"field",children:[Object(d.jsx)("label",{children:"Genre:"}),Object(d.jsx)("input",{value:i,type:"text",onChange:function(t){return l(t.target.value)}})]}),Object(d.jsxs)("div",{className:"field",children:[Object(d.jsx)("label",{children:"Author:"}),Object(d.jsxs)("select",{value:O,onChange:function(t){return h(t.target.value)},children:[Object(d.jsx)("option",{value:"",children:"Select author"},""),C?Object(d.jsx)("option",{disabled:!0,children:"Loading authors"}):$.authors.map((function(t){return Object(d.jsx)("option",{value:t.id,children:t.name},t.id)}))]})]}),Object(d.jsx)("button",{children:"+"})]})}var N=function(){var t=new r.a,e=new a.a({cache:t,uri:"/graphql"});return Object(d.jsx)(i.a,{client:e,children:Object(d.jsx)(l,{children:Object(d.jsxs)("div",{id:"main",children:[Object(d.jsx)("h1",{children:"Love's Book List"}),Object(d.jsx)(q,{}),Object(d.jsx)(w,{})]})})})};Object(o.render)(Object(d.jsx)(N,{}),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.133a5c79.chunk.js.map