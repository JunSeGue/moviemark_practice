import { AuthCredentials, AuthResponse, User } from "@/types/auth";
import { saveTokensToCookie } from "@/utils/token";

import { client } from "../client";

export const login = async (credential: AuthCredentials): Promise<AuthResponse> => {

	const response = await client<AuthResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify(credential),
	});
	await saveTokensToCookie(response);
	return response;
};

export const signup = async (credential: AuthCredentials): Promise<AuthResponse> => {
	return client<AuthResponse>("/auth/signup", {
		method: "POST",
		body: JSON.stringify(credential),
	});
};

export const getUserInfo = async (): Promise<User> => {
	return client<User>("/users", {
		method: "GET",
	});
};