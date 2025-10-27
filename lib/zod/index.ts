import z from "zod";

export const LoginValidationSchema = z.object({
  email: z.email({ message: "please provide a valid email address!" }),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"),
});
export const UsersSchema = z.object({
  

  // --- Core Account Information ---
  fullName: z.string().min(1),
  email: z.string().email(),
  isVerified: z.boolean(),
  phoneNumber: z.string().optional(),
  hashedPassword: z.string().min(1), // hashed, so just require non-empty
  gender: z.enum(["male", "female"]),
  isAdmin: z.boolean(),

  // --- Profile & Personalization ---
  profilePictureUrl: z.string().url().optional(),

  // --- Related Data Collections (Relationships) ---
  
});
