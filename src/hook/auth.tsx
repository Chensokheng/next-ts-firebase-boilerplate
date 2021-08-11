import React, {
	createContext,
	useContext,
	useState,
	SetStateAction,
	Dispatch,
} from "react";
import AuthService from "../service/AuthService";
import { User } from "../types/User";

type AuthContextState = {
	user?: User;
	loginWithGoogle: () => void;
	error: string;
	setUser: Dispatch<SetStateAction<User | undefined>>;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextState>({
	user: {},
	loginWithGoogle: () => {},
	error: "",
	setUser: () => {},
	logout: () => {},
});

export default function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | undefined>({});
	const [error, setError] = useState<string>("");

	const loginWithGoogle = async () => {
		const { user, error } = await AuthService.loginWithGoogle();
		setUser(user);
		setError(error);
	};
	const logout = async () => {
		await AuthService.logout();
	};

	return (
		<AuthContext.Provider
			value={{ user, loginWithGoogle, error, setUser, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
