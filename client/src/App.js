import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo client setup
const client = new ApolloClient({
	// uri: "https://54.169.202.39:4000/graphql",
	uri: "http://localhost:4000/graphql",
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id="main">
					<h1>Mr. Love's Book List</h1>
					<BookList />
					<AddBook />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
