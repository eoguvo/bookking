import { z } from "zod";

const userSchema = z.object({

    name: z.string().min(3, "Name is too short").max(100, "Name is too long"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Password should have at 8 digits and least one letter, one number and one special character"),
    email: z.string().email("Email invalid").min(1, "Email is Required"),

});

export default userSchema;