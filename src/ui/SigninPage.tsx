import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../Config";
import { InputFunction } from "./InputFunction";
import { useNavigate } from "react-router-dom";

export function SigninPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signin() {
    try {
      setError("");
      setLoading(true);

      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        setError("Username and password are required");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      // Clear inputs
      if (usernameRef.current) usernameRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";

      alert("Sign in successful! 🎉");
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.message === "Network Error") {
        setError("Network error: Unable to reach server");
      } else {
        setError(err.message || "An error occurred during sign in");
      }
      console.error("Signin error:", err);
    }
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg  mb-4">
              <span className="text-2xl font-bold text-white">
                <img src="./public/logo.png" alt="" />
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Second Brain
            </h1>
            <p className="text-slate-600">
              Save your ideas, organize your thoughts
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Wellcome Back
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                You don't have any account?{" "}
                <a
                  href="/signup"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form Section */}
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Username
                </label>
                <InputFunction
                  refrence={usernameRef}
                  type="text"
                  placeholder="your_username"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Password
                </label>
                <InputFunction
                  refrence={passwordRef}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 rounded border-2 border-slate-200 text-purple-600 focus:ring-purple-500 cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              onClick={signin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-200 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-600">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700">
                <span>🐙</span>
                GitHub
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700">
                <span>🔵</span>
                Google
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 mt-6">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              policies
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
