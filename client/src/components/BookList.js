import React, { Component } from "react";
// this is used to bind graphql to react
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
	}
	handleDelete(e) {
		e.stopPropagation();
		console.log(`hello`);
	}
	displayBooks() {
		// this.props is there because graphql call at the bottom.
		var data = this.props.data;
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
								this.handleDelete(e);
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

export default graphql(getBooksQuery)(BookList);
