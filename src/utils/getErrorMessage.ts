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
    /*  if (typeof error === "object" && "general" in error) {
        return String((error as { general: string }).general);
    } */
    // rejectWithValue({ general: string })
    if (typeof error === "object" && error !== null) {
        const errObj = error as Record<string, unknown>;

        if (typeof errObj.general === "string") {
            return errObj.general;
        }

        // rejectWithValue({ email: "...", password: "..." })
        const values = Object.values(errObj).filter(
            (v): v is string => typeof v === "string"
        );

        if (values.length > 0) {
            return values[0];
        }
    }

    return fallback;
}
