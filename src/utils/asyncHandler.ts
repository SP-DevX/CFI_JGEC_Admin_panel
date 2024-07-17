import { setLoading } from "@/redux/slices/AdminSlice";
import { useAppDispatch } from "@/redux/Store";
import toast from "react-hot-toast";

const useAsyncHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
    const dispatch = useAppDispatch();
    return async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
        try {
            dispatch(setLoading(true));
            return await fn(...args);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.message || "Internal Server Error");
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export { useAsyncHandler };
