import toast from 'svelte-french-toast';

export const errorToast = (message: string) => {
	toast.error(message, { duration: 3000, className: 'bg-error' });
};
export const successToast = (message: string) => {
	//
	toast.success(message, { duration: 3000 });
};
export const warnToast = (message: string) => {
	toast(message, { duration: 3000, className: 'bg-warning' });
};
