import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "~/providers/user";
import { useNavigate } from "react-router";
import { Routes } from "~/utils/routes";
import { useMessage } from "~/providers/message";
import { pastDateSchema } from "~/utils/date";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100, { message: "Password must be at most 100 characters" }),
    nickname: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }).optional(),
    birthday: pastDateSchema.optional(),
});

type FormData = z.infer<typeof formSchema>;

export const useLoginForm = () => {
    const { signIn, signUp } = useUser();
    const [isSubmitting, setSubmitting] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const { showMessage } = useMessage();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setSubmitting(true);
        if (signingUp) {
            if (!data.nickname || !data.birthday) return;
            const user = await signUp(data.email, data.password, data.nickname, data.birthday);
            if (user) {
                showMessage(`Welcome ${user.name}!`, "success")
                navigate(Routes.HOME);
            }
        } else {
            const user = await signIn(data.email, data.password);
            if (user) {
                showMessage(`Welcome back ${user.name}!`, "success")
                navigate(Routes.HOME);
            }
        }

        setSubmitting(false);
    };

    const toggleMode = () => {
        setSigningUp((prev) => !prev);
        reset();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(
            signingUp
                ? formSchema.extend({
                    nickname: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }),
                    birthday: pastDateSchema,
                })
                : formSchema.pick({ email: true, password: true }),
        ),
        shouldUnregister: true,
    });

    return { signingUp, isSubmitting, handleSubmit, onSubmit, errors, toggleMode, register };
}