import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "~/providers/user";
import { useNavigate } from "react-router";
import { Routes } from "~/utils/routes";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3, { message: "Password must be at least 8 characters" }),
    nickname: z.string().optional(),
    birthday: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const useLoginForm = () => {
    const { signIn } = useUser();
    const [isSubmitting, setSubmitting] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setSubmitting(true);
        console.log("Form data is valid:", data);
        if (signingUp) {
            // alert(`Registering: ${JSON.stringify(data, null, 2)}`);
        } else {
            // alert(
            //     `Logging in: ${JSON.stringify({ email: data.email, password: data.password }, null, 2)}`,
            // );

            const user = await signIn(data.email, data.password);
            if (user) {
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
                    nickname: z.string().min(3, { message: "Nickname must be at least 3 characters" }),
                    birthday: z.string().refine((val) => val, { message: "Birthday is required" }),
                })
                : formSchema.pick({ email: true, password: true }),
        ),
        shouldUnregister: true,
    });

    return { signingUp, isSubmitting, handleSubmit, onSubmit, errors, toggleMode, register };
}