import { useRouter } from "next/router";
import type { NextPage } from "next";
import useAuth from "./auth";

export function withPublic(Component: NextPage) {
	return function WithPublic(props: any) {
		const auth = useAuth();
		const router = useRouter();
		if (auth.user?.id) {
			router.replace("/");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}

export function withProtected(Component: NextPage) {
	return function WithPublic(props: any) {
		const auth = useAuth();
		const router = useRouter();

		if (!auth.user?.id) {
			router.replace("/login");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}
