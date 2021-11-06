import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_QUERY } from "../queries/queries";

export default function BookDetails({ selectedBookID }) {
	const {
		data: getBookQueryData,
		loading: getBookQueryLoading,
		error: getBookQueryError,
	} = useQuery(GET_BOOK_QUERY, {
		variables: {
			id: selectedBookID,
		},
	});

	function displayBookDetails() {
		if (getBookQueryData && getBookQueryData.book) {
			let { book } = getBookQueryData;
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

	return <div id="book-details">{displayBookDetails()}</div>;
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
