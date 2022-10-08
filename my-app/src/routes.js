import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientWelcome from './pages/clientWelcome';

import { UserContextProvider } from "./context/userContext";
import { PrivateRouter } from "./context/PrivateRouter";

export default function Routess() {
	return (
		<UserContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/login" element={<Login />} />
					<Route path="/editprofile" element={<PrivateRouter />}>
						<Route path="/editprofile" element={<EditProfileScreen />} />
					</Route>
					<Route path="/request" element={<PrivateRouter />}>
						<Route path="/request" element={<Request />} />
					</Route>
					<Route path="/SearchTeacher" element={<PrivateRouter />}>
						<Route path="/SearchTeacher" element={<SearchTeacherScreen />} />
					</Route>
					<Route path="/posts" element={<PrivateRouter />}>
						<Route path="/posts" element={<PostsScreen />} />
					</Route>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</UserContextProvider>
	);
}