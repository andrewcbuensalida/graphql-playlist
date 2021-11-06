import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS_QUERY, DELETE_BOOK_MUTATION } from "../queries/queries";

import BookDetails from "./BookDetails";
export default function BookList() {
	const [selectedBookID, setSelectedBookID] = useState(null);
	const [deleteBookMutation, { data, loading, error }] =
		useMutation(DELETE_BOOK_MUTATION);
	const {
		data: getBooksQueryData,
		loading: getBooksQueryLoading,
		error: getBooksQueryError,
	} = useQuery(GET_BOOKS_QUERY);

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
			refetchQueries: [{ query: GET_BOOKS_QUERY }],
		});
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
							x
						</button>
					</li>
				);
			});
		}
	}

	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
			<BookDetails selectedBookID={selectedBookID} />
		</div>
	);
}
