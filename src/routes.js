import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientWelcome from './routes/clientWelcome';
import ClientDashboard from './routes/clientDashboard';
import { UserContextProvider } from "./context/userContext";
import ClientLoginPage from "./routes/clientLogin";
import ClientRegister from "./routes/clientCadastro";
import { auth } from "./context/firebase";
import ClientDashboardWithoutLogin from './routes/clientDashboardWithoutLogin';
import ProviderDetails from './components/providerDetails';
import ClientContactPage from './routes/clientContactPage';
import ClientAvaliacao from './components/avaliacaoPrestadora';


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
					<Route path="/prestadora/:id" element={<ProviderDetails />} />
					<Route path="/avaliacao/:id" element={<ClientAvaliacao />} />
					<Route path="/cadastro" element={<ClientRegister />} />
					<Route path="/faleconosco" element={<ClientContactPage />} />
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	);
}