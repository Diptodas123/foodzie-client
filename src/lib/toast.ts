import { toast } from "sonner";

type ToastPosition =
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";

interface ToastOptions {
    duration?: number;
    position?: ToastPosition;
}

const defaultOptions: ToastOptions = {
    duration: 3000,
    position: "top-right",
};

export const showToast = {
    success: (message: string, options?: ToastOptions) =>
        toast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: ToastOptions) =>
        toast.error(message, { ...defaultOptions, duration: 4000, ...options }),

    warning: (message: string, options?: ToastOptions) =>
        toast.warning(message, { ...defaultOptions, ...options }),

    info: (message: string, options?: ToastOptions) =>
        toast.info(message, { ...defaultOptions, ...options }),
};
