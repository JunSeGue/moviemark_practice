import { useState, useCallback, ChangeEvent, FormEvent } from "react";

import { signup } from "@/api/auth/index";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { validateEmail, validatePassword } from "@/utils/validate";

import { SignUpFormProps } from "./SignUpForm";

type FormType = "email" | "password" | "passwordConfirm";
interface FormState {
	email: string;
	password: string;
	passwordConfirm: string;
  }
interface FormErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export const useSignUpForm = ({ onSuccess, onError }: SignUpFormProps) => {

	const [formState, setFormState]  = useState<FormState> ({
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isLoading, setIsLoading] = useState(false);
	const { showToastMessage } = useToastMessageContext();

	const validateForm = useCallback(() => {
		const newErrors: FormErrors = {};

		const emailError = validateEmail(formState.email);
		if (emailError) newErrors.email = emailError;

		const passwordError = validatePassword(formState.password);
		if (passwordError) newErrors.password = passwordError;

		if (formState.password !== formState.passwordConfirm) newErrors.passwordConfirm = "비밀번호가 다릅니다.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formState.email, formState.password, formState.passwordConfirm]);

	const handleFormChange = useCallback(
		(key : FormType) => (e: ChangeEvent<HTMLInputElement>)=> {
			const { value } = e.target;
			setFormState(prev => ({ ...prev, [key]: value }));
			setErrors(prev => ({ ...prev, [key]: "" }));
		},
		[]
	);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);
		try {
			await signup({ email: formState.email, password: formState.password });
			showToastMessage({ type: "success", message: "회원가입 성공!" });
			onSuccess?.();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "회원가입 실패";
			showToastMessage({ type: "error", message: errorMessage });
			onError?.(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formState,
		errors,
		isLoading,
		handleSubmit,
		handleFormChange,

	};
};