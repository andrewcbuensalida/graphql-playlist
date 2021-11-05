import React, { Component } from "react";
// this is used to bind graphql to react
import { graphql } from "react-apollo";
import { getBooksQuery, deleteBookMutation } from "../queries/queries";
import * as compose from "lodash.flowright";

// components
import BookDetails from "./BookDetails";

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
	}
	handleDelete(e, bookId) {
		e.stopPropagation();
		console.log(`This is bookId`);
		console.log(bookId);

		// this.props.deleteBookMutation({
		// 	variables: {
		//      id:bookId
		// },
		// 	refetchQueries: [{ query: getBooksQuery }],
		// });
	}
	displayBooks() {
		// this.props is there because graphql call at the bottom.
		var data = this.props.getBooksQuery;
		if (data.loading) {
			return <div>Loading books...</div>;
		} else {
			return data.books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => this.setState({ selected: book.id })}
					>
						{book.name}
						<button
							onClick={(e) => {
								this.handleDelete(e, book.id);
							}}
						>
							x
						</button>
					</li>
				);
			});
		}
	}
	render() {
		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected} />
			</div>
		);
	}
}

export default compose(
	graphql(getBooksQuery, { name: "getBooksQuery" }),
	graphql(deleteBookMutation, { name: "deleteBooksMutation" })
)(BookList);
