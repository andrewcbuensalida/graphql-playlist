import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
	GET_BOOKS_QUERY,
	DELETE_BOOK_MUTATION,
	GET_BOOK_QUERY,
} from "../queries/queries";

import BookDetails from "./BookDetails";
import { SelectedBookContext } from "./SelectedBookContext";

export default function BookList() {
	// selectedBookID initially null
	const { selectedBookID, setSelectedBookID } =
		useContext(SelectedBookContext);
	// getting the function from queries.js
	const [deleteBookMutation, { data, loading, error }] =
		useMutation(DELETE_BOOK_MUTATION);
	const {
		// getting all the books as data and renaming it to getBooksQueryData
		data: getBooksQueryData,
		// is true when it hasn't finished loading yet
		loading: getBooksQueryLoading,
		error: getBooksQueryError,
		// this gets called automatically on component mount
	} = useQuery(GET_BOOKS_QUERY);

	async function handleDelete(e, bookId) {
		e.stopPropagation();
		// delete book and get deletedBookID in return
		let {
			data: {
				deleteBook: { id: deletedBookID },
			},
		} = await deleteBookMutation({
			variables: {
				id: bookId,
			},
			refetchQueries: [
				{ query: GET_BOOKS_QUERY },
				{
					query: GET_BOOK_QUERY,
					variables: {
						id: selectedBookID,
					},
				},
			],
			// fetchPolicy: "no-cache",
		});
		// if the deleted book was the selectedBook, selectedBook becomes null and book details sidebar empties
		if (deletedBookID == selectedBookID) setSelectedBookID(null);
	}

	function displayBooks() {
		if (getBooksQueryLoading) {
			return <div>Loading books...</div>;
		} else {
			return getBooksQueryData.books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => setSelectedBookID(book.id)}
					>
						{book.name}
						<button
							onClick={(e) => {
								handleDelete(e, book.id);
							}}
						>
							&times;
						</button>
					</li>
				);
			});
		}
	}

	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
			{/* this is the sidebar component */}
			<BookDetails selectedBookID={selectedBookID} />
		</div>
	);
}
