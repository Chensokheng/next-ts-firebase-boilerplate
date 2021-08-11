import React from "react";
import type { NextPage } from "next";
import useAuth from "../src/hook/auth";
import { withPublic } from "../src/hook/route";

const Login: NextPage = () => {
	const auth = useAuth();
	const { user, loginWithGoogle, error } = auth;
	return (
		<div>
			{error && <h1>{error}</h1>}
			<h1>Login</h1>
			<button onClick={loginWithGoogle}>Google</button>
			<h1>{user?.id}</h1>
		</div>
	);
};

export default withPublic(Login);
