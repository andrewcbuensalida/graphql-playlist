import { gql } from "apollo-boost";

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
//AddBook is just for naming and is optional
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

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
