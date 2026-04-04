import { useRef, useState } from "react";
import { InputFunction } from "./InputFunction";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";

export function SignUpPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confPassRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function signup() {
    try {
      setError("");
      setLoading(true);

      const email = emailRef.current?.value;
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      const confPass = confPassRef.current?.value;

      // Validation
      if (!email || !username || !password || !confPass) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (password !== confPass) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        email,
        username,
        password,
        confPass,
      });

      setSuccess(true);
      setError("");
      navigate("/signin");
      alert("You have signed up successfully!");

      // Clear form
      if (emailRef.current) emailRef.current.value = "";
      if (usernameRef.current) usernameRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
      if (confPassRef.current) confPassRef.current.value = "";
    } catch (err: any) {
      setSuccess(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError(
          "Network error: Unable to reach server. Make sure backend is running on " +
            BACKEND_URL,
        );
      } else {
        setError(err.message || "An error occurred during signup");
      }
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
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
              Create Account
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">
                Account created successfully!
              </p>
            </div>
          )}

          {/* Form Section */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <InputFunction
                refrence={emailRef}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
              />
            </div>

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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Confirm Password
              </label>
              <InputFunction
                refrence={confPassRef}
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

          {/* Sign Up Button */}
          <button
            onClick={signup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-200 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
          By signing up, you agree to our{" "}
          <a
            href="#"
            className="text-purple-600 hover:text-purple-700 transition-colors"
          >
            policies
          </a>
        </p>
      </div>
    </div>
  );
}
