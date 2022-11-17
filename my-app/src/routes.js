import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import ClientWelcome from './routes/clientWelcome';
import ClientDashboard from './routes/clientDashboard';
import ClientRequisicao from './routes/clientRequisicao';
import { UserContextProvider } from "./context/userContext";
import ClientLoginPage from "./routes/clientLogin";
import { PrivateRouter } from "./context/privateRouter";
import ClientRegister from "./routes/clientCadastro";
import { auth } from "./context/firebase";
import ClientDashboardWithoutLogin from './routes/clientDashboardWithoutLogin';

export default function Routess() {
	const [user, setUser] = useState('');
	const [logado, setLogado] = useState(false); 

	useEffect(() => {
		const logar = auth.onAuthStateChanged(userAuth => {
		  if (userAuth) {
			const user = {
			  uid: userAuth.uid,
			  email: userAuth.email,
			};
			setLogado(true);
			setUser(user);
		  } else {
			setUser(null);
			setLogado(false); 
		  }
		});
		return logar;
	  }, []);

	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ClientWelcome />} />				
					<Route path="/login" element={<ClientLoginPage />} />
					{logado ?<Route path="/dashboard" element={<ClientDashboard />} /> : <Route path="/dashboard" element={<ClientDashboardWithoutLogin />} />}
					{logado ?<Route path="/requisicao" element={<ClientRequisicao />} /> : <Route path="/requisicao" element={<ClientDashboardWithoutLogin />} />}
					<Route path="/cadastro" element={<ClientRegister />} />
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	);
}