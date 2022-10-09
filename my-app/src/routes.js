import React from "react";

import ClientWelcome from './pages/clientWelcome';
import ClientLogin from './pages/clientLogin';

import { UserContextProvider } from "./context/userContext";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import  ClientWelcome  from './routes/clientWelcome';
import { UserContextProvider } from "./context/userContext";
import ClientLoginPage from "./routes/clientLogin";

export default function Routess() {
	return (
<UserContextProvider>
	<BrowserRouter>
    	<Routes>
 	    	<Route path="/" element={<ClientWelcome/>} />
   			<Route path="/login" element={<ClientLoginPage/>} />
    	</Routes>
	</BrowserRouter>
</UserContextProvider>
	);
}