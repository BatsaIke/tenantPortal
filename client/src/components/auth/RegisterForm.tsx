import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address").optional(),  
    phone: z.string().regex(/^0\d{9}$/, "Phone must be 10 digits starting with 0"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error, resetError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      await registerUser({
        fullName: formData.name,
        email: formData.email ?? "",
        phone: formData.phone,
        password: formData.password,
      });
      navigate('/login'); // Redirect after successful registration
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Create Account
      </Typography>

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        onChange={() => error && resetError()}
      />

      <TextField
        label="Phone (e.g. 0543869957)"
        variant="outlined"
        fullWidth
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        onChange={() => error && resetError()}
      />

      <TextField
        label="Email (Optional)"
        variant="outlined"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        onChange={() => error && resetError()}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        onChange={() => error && resetError()}
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        onChange={() => error && resetError()}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </Box>
  );
};