import React, { Component } from "react";
// this is used to bind graphql to react
import { graphql } from "react-apollo";
import {
	getBooksQuery,
	deleteBookMutation,
	getBookQuery,
} from "../queries/queries";
import * as compose from "lodash.flowright";

// components
import BookDetails from "./BookDetails";
//could either be class component of functional component
class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBook: null,
		};
	}
	async handleDelete(e, bookId) {
		e.stopPropagation();

		let {
			data: {
				deleteBook: { id: deletedBookID },
			},
		} = await this.props.deleteBookMutation({
			variables: {
				id: bookId,
			},
			refetchQueries: [{ query: getBooksQuery }, { query: getBookQuery }],
		});
		this.setState({
			selected:
				deletedBookID == this.state.selected
					? null
					: this.state.selected,
		});
	}
	async handleSelect(id) {
		const selectedBook = await this.props.getBookQuery.fetchMore({
			variables: {
				id: id,
			},
		});
		this.setState({ selectedBook: selectedBook.data.book });
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
						onClick={(e) => this.handleSelect(book.id)}
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
		console.log(`This is this.selectedBook inside render`);
		console.log(this.state.selectedBook);

		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails book={this.state.selectedBook} />
			</div>
		);
	}
}

export default compose(
	graphql(getBooksQuery, { name: "getBooksQuery" }),
	graphql(getBookQuery, { name: "getBookQuery" }),
	graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookList);
