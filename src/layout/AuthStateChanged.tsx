import firebase from "firebase/app";
import "firebase/auth";
import { FC, ReactElement, useEffect, useState } from "react";
import useAuth from "../hook/auth";
import { User } from "../types/User";

type Props = {
	children: ReactElement;
};

const AuthStateChanged: FC<Props> = ({ children }) => {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userCred) => {
			const user: User = {
				username: userCred?.displayName,
				email: userCred?.email,
				id: userCred?.uid,
				avatar: userCred?.photoURL,
			};
			setUser(user);
			setLoading(false);
		});
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return children;
};

export default AuthStateChanged;
