import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
	GET_AUTHORS_QUERY,
	ADD_BOOK_MUTATION,
	GET_BOOKS_QUERY,
	GET_BOOK_QUERY,
} from "../queries/queries";

import { SelectedBookContext } from "./SelectedBookContext";

export default function AddBook() {
	const [name, setName] = useState(""); // name of the book
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [isFormIncomplete, setIsFormIncomplete] = useState(false);

	const { selectedBookID } = useContext(SelectedBookContext); // this is so it updates the books of the author of the selected book

	const {
		data: getAuthorsQueryData, // renaming the data property, which was received from the server, to getAuthorsQueryData
		loading: getAuthorsQueryLoading, // boolean to see if it's loading or not
		error: getAuthorsQueryError,
	} = useQuery(GET_AUTHORS_QUERY); // GET_AUTHORS_QUERY is imported from queries.js

	const [
		addBookMutation, // getting the function to add a book from ADD_BOOK_MUTATION from queries.js
		{
			data: addBookMutationData,
			loading: addBookMutationLoading,
			error: addBookMutationError,
		},
	] = useMutation(ADD_BOOK_MUTATION);

	//load others into the drop down select box
	function displayAuthors() {
		if (getAuthorsQueryLoading) {
			return <option disabled>Loading authors</option>;
		} else {
			return getAuthorsQueryData.authors.map((author) => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	}
	function submitForm(e) {
		e.preventDefault();
		if (name == "" || genre == "" || authorId == "") {
			setIsFormIncomplete(true);
			return;
		}
		setIsFormIncomplete(false);
		// use the addBookMutation. has addBookMutation name because in the name in the compose down below
		// variables name genre authorId go to the queries AddBook
		addBookMutation({
			variables: {
				name: name,
				genre: genre,
				authorId: authorId,
			},
			// after adding a new book, refetch queries
			refetchQueries: [
				{ query: GET_BOOKS_QUERY },
				{
					query: GET_BOOK_QUERY,
					variables: {
						id: selectedBookID,
					},
				},
			],
		});
		setName("");
		setGenre("");
		setAuthorId("");
	}

	return (
		<form
			// didnt really need to have id
			id="add-book"
			onSubmit={(e) => {
				submitForm(e);
			}}
		>
			{isFormIncomplete && <div id="incomplete">Form is incomplete</div>}
			<div className="field">
				<label>Book name:</label>
				<input
					value={name}
					type="text"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="field">
				<label>Genre:</label>
				<input
					value={genre}
					type="text"
					onChange={(e) => setGenre(e.target.value)}
				/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select
					value={authorId}
					onChange={(e) => setAuthorId(e.target.value)}
				>
					<option key="" value="">
						Select author
					</option>
					{displayAuthors()}
				</select>
			</div>
			<button>+</button>
		</form>
	);
}
