import React, { Component } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "react-apollo";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const uri =
	process.env.NODE_ENV === "production"
		? "/graphql"
		: "http://localhost:4000/graphql";
// apollo client setup
const cache = new InMemoryCache();
const client = new ApolloClient({
	cache,
	uri: uri,
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div id="main">
					<h1>Love's Book List</h1>
					<BookList />
					<AddBook />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
