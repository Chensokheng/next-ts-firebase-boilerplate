import React from "react";
import type { NextPage } from "next";
import useAuth from "../src/hook/auth";
import { withProtected } from "../src/hook/route";

const Admin: NextPage = () => {
	const auth = useAuth();
	const { logout, user } = auth;
	return (
		<div>
			<button onClick={logout}>Logout</button>
			<h1>{user?.username}</h1>
		</div>
	);
};

export default withProtected(Admin);
