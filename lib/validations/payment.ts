import { z } from "zod";

export const paymentRegistrationSchema = z.object({
  registrationId: z.string().trim().min(1, "Registration ID is required"),
});

export type PaymentRegistrationInput = z.infer<typeof paymentRegistrationSchema>;
