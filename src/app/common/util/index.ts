export const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getFileExtension = (filename: string) => filename.split(".").pop();
