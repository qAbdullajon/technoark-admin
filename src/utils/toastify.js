import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ======= Login ========
const login_suc = () => toast.success("Success login");
const signup_suc = () => toast.success("Success sign up");
const login_not = () => toast.error("Login yoki parol noto‘g‘ri!", { autoClose: 3000 });
const login_catch = () => toast.error("Kutilmagan xato yuz berdi!", { autoClose: 3000 });

export { login_suc, login_not, login_catch, signup_suc };
