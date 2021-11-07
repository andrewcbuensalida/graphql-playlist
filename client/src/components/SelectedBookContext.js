import { createContext, useState } from "react";
import React from "react";

export const SelectedBookContext = createContext();

export function SelectedBookContextProvider({ children }) {
	const [selectedBookID, setSelectedBookID] = useState(null);

	return (
		<SelectedBookContext.Provider
			value={{ selectedBookID, setSelectedBookID }}
		>
			{children}
		</SelectedBookContext.Provider>
	);
}
