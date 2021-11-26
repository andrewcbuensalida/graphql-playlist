import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SelectedBookContextProvider } from "./components/SelectedBookContext";
// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

function App() {
	const uri =
		process.env.NODE_ENV === "production"
			? "/graphql"
			: "http://localhost:4000/graphql";
	// apollo client setup
	const cache = new InMemoryCache();
	const client = new ApolloClient({
		cache,
		uri,
	});
	return (
		<ApolloProvider client={client}>
			<SelectedBookContextProvider>
				<div id="main">
					<h1>Love's Books</h1>
					<BookList />
					<AddBook />
				</div>
			</SelectedBookContextProvider>
		</ApolloProvider>
	);
}

export default App;
