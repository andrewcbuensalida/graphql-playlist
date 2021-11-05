import { gql } from "@apollo/client";

const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

const getBooksQuery = gql`
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
const addBookMutation = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const getBookQuery = gql`
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

const deleteBookMutation = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id) {
			id
		}
	}
`;
export {
	getAuthorsQuery,
	getBooksQuery,
	addBookMutation,
	getBookQuery,
	deleteBookMutation,
};
