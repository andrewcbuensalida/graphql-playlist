import React, { useState } from "react";
//a little different than functional react
import { useMutation, useQuery } from "@apollo/client";

import {
	GET_AUTHORS_QUERY,
	ADD_BOOK_MUTATION,
	GET_BOOKS_QUERY,
} from "../queries/queries";

export default function AddBook() {
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [isFormIncomplete, setIsFormIncomplete] = useState(false);

	const {
		data: getAuthorsQueryData,
		loading: getAuthorsQueryLoading,
		error: getAuthorsQueryError,
	} = useQuery(GET_AUTHORS_QUERY);
	const [
		addBookMutation,
		{
			data: addBookMutationData,
			loading: addBookMutationLoading,
			error: addBookMutationError,
		},
	] = useMutation(ADD_BOOK_MUTATION);

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
			refetchQueries: [{ query: GET_BOOKS_QUERY }],
		});
		setName("");
		setGenre("");
		setAuthorId("");
	}

	return (
		<form
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

//when you have more than one mutation or query, use compose, which sends data to this.props.getAuthors or BookMutation
// export default compose(
// 	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
// 	graphql(addBookMutation, { name: "addBookMutation" })
// )(AddBook);
