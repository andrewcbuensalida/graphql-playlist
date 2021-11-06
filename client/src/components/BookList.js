import React, { useState } from "react";
// this is used to bind graphql to react
import { useQuery, useMutation } from "@apollo/client";
import {
	getBooksQuery,
	deleteBookMutation,
	getBookQuery,
} from "../queries/queries";
import * as compose from "lodash.flowright";

// components
import BookDetails from "./BookDetails";
//could either be class component of functional component
export default function BookList() {
	const [selectedBook, setSelectedBook] = useState(null);
	const [deleteBookMutation, { data, loading, error }] =
		useMutation(deleteBookMutation);
	const [getBooksQuery, { data, loading, error }] = useQuery(getBooksQuery);
	const [getBookQuery, { data, loading, error }] = useQuery(getBookQuery);

	async function handleDelete(e, bookId) {
		e.stopPropagation();

		let {
			data: {
				deleteBook: { id: deletedBookID },
			},
		} = await deleteBookMutation({
			variables: {
				id: bookId,
			},
			refetchQueries: [
				{ query: getBooksQuery },
				{ query: getBookQuery, fetchPolicy: "no-cache" },
			],
			fetchPolicy: "no-cache",
		});
		if (deletedBookID == selectedBook)
			setSelectedBook({
				selected:
					deletedBookID == this.state.selected ? null : selected,
			});
	}
	async function handleSelect(id) {
		const selectedBook = await getBookQuery.fetchMore({
			variables: {
				id,
			},
		});
		this.setState({ selectedBook: selectedBook.data.book });
	}
	function displayBooks() {
		// this.props is there because graphql call at the bottom.
		var data = getBooksQuery;
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

	console.log(`This is this.selectedBook inside render`);
	console.log(this.state.selectedBook);

	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
			<BookDetails book={selectedBook} />
		</div>
	);
}
