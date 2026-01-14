export function getErrorMessage(
    error: unknown,
    fallback = "Something went wrong. Please try again later"
): string {
    if (!error) return fallback;

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }
    // rejectWithValue({ general: string })
    if (typeof error === "object" && "general" in error) {
        return String((error as { general: string }).general);
    }

    return fallback;
}
