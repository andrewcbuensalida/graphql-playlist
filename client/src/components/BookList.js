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
			selected: null,
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
	// componentDidMount() {}
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
		console.log(`This is `);
		console.log(this.props.getBookQuery);

		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails book={this.props.getBookQuery} />
			</div>
		);
	}
}

export default compose(
	graphql(getBooksQuery, { name: "getBooksQuery" }),
	graphql(getBookQuery, {
		options: (props) => {
			return {
				variables: {
					id: props.bookId,
				},
			};
		},
		// fetchPolicy: "no-cache",
	}),
	graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(BookList);
