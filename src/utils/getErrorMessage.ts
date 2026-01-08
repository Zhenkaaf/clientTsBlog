export function getErrorMessage(
    error: unknown,
    fallback = "Something went wrong. Please try again later"
): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    return fallback;
}
