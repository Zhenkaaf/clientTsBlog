export const formatDate = (isoDate: string): string => {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(isoDate));
};
