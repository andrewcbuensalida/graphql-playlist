import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

export default class BookDetails extends Component {
	displayBookDetails() {
		const { book } = this.props;
		// console.log(`This is book`);
		// console.log(book);

		if (book) {
			return (
				<div>
					<h2>{book.name}</h2>
					<p>{book.genre}</p>
					<p>{book.author.name}</p>
					<p>All books by this author:</p>
					<ul className="other-books">
						{book.author.books.map((item) => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		} else {
			return <div>No book selected...</div>;
		}
	}
	render() {
		console.log(`in book details render`);

		return <div id="book-details">{this.displayBookDetails()}</div>;
	}
}

//whenever prop updates, variable resets for query. props comes from BookList passing the bookId. then sends a query to
//the server, then returns props used in BookDetails. HOC.
// export default graphql(getBookQuery, {
// 	options: (props) => {
// 		return {
// 			variables: {
// 				id: props.bookId,
// 			},
// 		};
// 	},
// 	// fetchPolicy: "no-cache",
// })(BookDetails);
