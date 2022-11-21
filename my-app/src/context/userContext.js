import { createContext, useState, useEffect } from "react";
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

	const registerUser = (email, firstName, lastName, password, role) => {
		///
		let fullName = firstName + " " + lastName
		setLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				updateProfile(auth.currentUser, {
					displayName: fullName,
				});
				setUser(res.user);
				/*doRegisterAWS(res.user.uid, res.user.email, firstName, lastName, role)*/
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	};

	const signInUser = (email, password) => {
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				console.log(res)
				fetchUser(res.user.email)
				window.location.href = '/dashboard';
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	};

	function fetchUser(email) {
		fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?email=${email}`,{ mode: 'no-cors'}) 
		.then(
		  (result) => {
			console.log(result);
			this.setUser(result);
		  },
		  (error) => {
			console.error(error)
		  }
		)
	}

	async function doRegisterBackEnd(user) {
		console.log("registrar " + JSON.stringify(user));
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		};
		let result = await fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario`,requestOptions) 
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