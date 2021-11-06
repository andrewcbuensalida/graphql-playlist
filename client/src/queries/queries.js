import { gql } from "@apollo/client";

const GET_AUTHORS_QUERY = gql`
	{
		authors {
			name
			id
		}
	}
`;

const GET_BOOKS_QUERY = gql`
	{
		books {
			name
			id
		}
	}
`;
// $ is query variable, ! requires that it is that type and not null
//AddBook is just for naming and is optional. the name id under the addBook is the returned
// promise result in data
const ADD_BOOK_MUTATION = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const GET_BOOK_QUERY = gql`
	query GetBook($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;

const DELETE_BOOK_MUTATION = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id) {
			id
		}
	}
`;
export {
	GET_AUTHORS_QUERY,
	GET_BOOKS_QUERY,
	ADD_BOOK_MUTATION,
	GET_BOOK_QUERY,
	DELETE_BOOK_MUTATION,
};
