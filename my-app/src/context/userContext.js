import { createContext, useState, useEffect, useCallback } from "react";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth, storage } from "../context/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [awsUser, setAwsUser] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoURL, setPhotoURL] = useState(
		"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
	);

	const [error, setError] = useState("");

	async function upload(file, user, setLoading) {
		if (photo == null) return;
		const fileRef = ref(storage, "images/users/" + user.uid);

		setLoading(true);

		const snapshot = await uploadBytes(fileRef, file);

		const photoURL = await getDownloadURL(fileRef);

		updateProfile(user, {
			photoURL,
		});

		setLoading(false);
		window.location.reload();
	}

	function handleChange(e) {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	}

	function handleClick() {
		upload(photo, user, setLoading);
	}

	useEffect(() => {
		if (user?.photoURL) {
			setPhotoURL(user.photoURL);
		}
	}, [user]);


	useEffect(() => {
		setLoading(true);
		const unsubscribe = onAuthStateChanged(auth, (res) => {
			res ? setUser(res) : setUser(null);
			setError("");
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	function registerUser (user) {
		console.log(user);
		setLoading(true);
		createUserWithEmailAndPassword(auth, user.email, user.pass)
			.then((res) => {
				updateProfile(auth.currentUser, {
					displayName: user.nome,
				});
				setUser(res.user);
				user.userId = res.user.uid;
				doRegisterBackEnd(user)
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	};

	const signInUser = (email, password) => {
		console.log("signInUser")
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				console.log(res.user);
				let userLogado = res.user;
				fetchUser(userLogado.email).then((result)=>{
					if(result==null) {
					let userInsert = {nome: userLogado.displayName,
						pass: 'nenhuma senha',
						userId: userLogado.uid,
						email: userLogado.email,
						cliente: true};
					doRegisterBackEnd(userInsert)
										.then((result)=>
										{
											if(result != null)
											setUser(result)
										})
										.catch((err)=>setError(err.message));
									}
					else setUser(result);
			})
			.catch((err) => setError(err.message))
		}).catch((err) => setError(err.message))
		.finally(() => setLoading(false));
	};

	async function fetchUser(email) {
		console.log("fetchUser");
		//http://whm.joao1866.c41.integrator.host:9206
		let result = await fetch(`http://localhost:8080/usuario?email=${email}`, { mode: 'no-cors' })
		.catch(error => console.error(error));
			   if (result.ok)
				 return result;
			   else
			   return null;
	   }

	async function doRegisterBackEnd(user) {
		console.log("registrar " + JSON.stringify(user));
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		};
		//http://whm.joao1866.c41.integrator.host:9206
		let result = await fetch(`http://localhost:8080/usuario`,requestOptions) 
		.catch(error => console.error(error));
			   if (result.ok)
			return result;
			else return null;
	}

	const logoutUser = () => {
		signOut(auth);
	};

	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const contextValue = {
		user,
		awsUser,
		photoURL,
		setPhoto,
		fetchUser,
		loading,
		error,
		registerUser,
		signInUser,
		logoutUser,
		forgotPassword,
		handleChange,
		handleClick,
	};
	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};