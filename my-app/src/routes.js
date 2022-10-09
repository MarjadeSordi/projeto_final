import React from "react";
import {Routes,Route} from 'react-router'

import ClientWelcome from './pages/clientWelcome';
import ClientLogin from './pages/clientLogin';

import { UserContextProvider } from "./context/userContext";

export default function Routess() {
	return (
		<UserContextProvider>
			
				<Routes>
					<Route path="/welcome" element={<ClientWelcome />} />
					<Route path="/login" element={<ClientLogin />} />
				</Routes>
		</UserContextProvider>
	);
}