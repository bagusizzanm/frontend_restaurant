import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { AlertCircleIcon, Eye, EyeOff, Loader } from "lucide-react";
import { validateForm } from "../../../utils/helper";
import { axiosInstance } from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formState.errors[name] || formState.errors.password) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "", password: "" },
      }));
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    if (!validateForm(setFormState, formData)) return;

    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
        message: response.data.message,
      }));

      toast.success(response.data.message, toastStyleSuccess);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: false,
        errors: {
          ...prev.errors,
          submit:
            error.response?.data?.message ||
            "Terjadi kesalahan. Silahkan coba lagi",
        },
      }));
    }
  };
  const toastStyleSuccess = {
    position: "top-right",
    duration: 5000,
    style: {
      background: "#15803d",
      color: "#fff",
      padding: "10px",
      borderRadius: "10px",
    },
  };
  const toastStyleError = {
    position: "top-right",
    duration: 5000,
    style: {
      background: "#b91c1c",
      color: "#fff",
      padding: "10px",
      borderRadius: "10px",
    },
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-16">
      <div className="container mx-auto rounded-lg overflow-hidden flex items-center bg-white border border-gray-100">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="gambar"
            className="object-cover size-full"
          />
        </div>
        {/* Form login di sebelah kanan */}
        <div className="w-full md:w-1/2">
          <div className="p-8 space-y-2">
            <h3 className="text-3xl text-center font-semibold">Login</h3>
            <p className="text-sm text-center">
              Masuk sebagai server atau kasir.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="font-semibold">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Masukkan Email"
                  onChange={handleInputChange}
                  className={`${
                    formState.errors.email
                      ? "border-red-500"
                      : "border-blue-300"
                  }`}
                />
              </div>
              {/* password */}
              <div className="space-y-1 mb-5">
                <Label htmlFor="password" className="font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={formState.showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Masukkan Password"
                    onChange={handleInputChange}
                    className={`${
                      formState.errors.password
                        ? "border-red-500"
                        : "border-blue-300"
                    }`}
                  />
                  <Button
                    variant="none"
                    type="button"
                    onClick={() =>
                      setFormState((prev) => ({
                        ...prev,
                        showPassword: !prev.showPassword,
                      }))
                    }
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 cursor-pointer"
                    tabIndex={-1}
                  >
                    <motion.span
                      key={formState.showPassword ? "eyeoff" : "eye"}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formState.showPassword ? (
                        <EyeOff
                          strokeWidth={1}
                          className="size-5 text-zinc-400"
                        />
                      ) : (
                        <Eye strokeWidth={1} className="size-5 text-zinc-400" />
                      )}
                    </motion.span>
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={formState.loading}
                className="w-full font-semibold cursor-pointer"
              >
                {formState.loading ? (
                  <>
                    <Loader className="size-5 animate-spin" />
                    <span>Tunggu Sebentar...</span>
                  </>
                ) : (
                  <span>Masuk</span>
                )}
              </Button>
              {(formState.errors.email || formState.errors.password) && (
                <Alert variant="destructive" className="bg-red-50 border-none">
                  <AlertCircleIcon />
                  <AlertTitle className="font-semibold">
                    Silahkan periksa kembali inputan anda :
                  </AlertTitle>
                  <AlertDescription>
                    <ul className="list-inside list-disc text-sm">
                      {Object.entries(formState.errors).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
