export const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const dateToString = (date: Date) =>
	date.toLocaleTimeString([], {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
