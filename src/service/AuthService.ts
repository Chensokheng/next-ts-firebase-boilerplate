import firebase from "firebase/app";
import "firebase/auth";
import { User } from "../types/User";

export const AuthService = {
	loginWithGoogle: async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			const userCred = await firebase.auth().signInWithPopup(provider);

			const user: User = {
				username: userCred.user?.displayName,
				email: userCred.user?.email,
				id: userCred.user?.uid,
				avatar: userCred.user?.photoURL,
			};

			return {
				user: user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	logout: async () => {
		await firebase.auth().signOut();
	},
};

export default AuthService;
