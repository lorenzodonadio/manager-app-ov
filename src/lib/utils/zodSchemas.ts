import { z } from 'zod';
import type { ZodError } from 'zod';
// Helper function to format Zod errors
export const formatZodError = (error: ZodError) => {
	// You can customize this function to format the error message however you like
	return error.errors.map((e) => e.message).join(', ');
};
