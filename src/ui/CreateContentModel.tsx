import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { InputFunction } from "./InputFunction";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../Config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
}

export function CreateContentModel({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function addContent() {
    try {
      setError("");
      setLoading(true);

      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      // Validation
      if (!title || !link || !type) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please sign in first.");
        setLoading(false);
        return;
      }

      console.log(
        "📤 Sending request with token:",
        token?.substring(0, 20) + "...",
      );

      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("✅ Content added successfully");
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setType(ContentType.Youtube);

      alert("Content added successfully! 🎉");
      if (onSuccess) {
        await onSuccess();
      }
      onClose();
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error("❌ Error adding content:", err);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);

      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 403) {
        setError(
          "Unauthorized: Your session has expired. Please sign in again.",
        );
      } else if (err.message === "Network Error") {
        setError("Network error: Unable to reach server");
      } else {
        setError(err.message || "An error occurred");
      }
    }
  }

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Add Content
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-lg"
                >
                  <CrossIcon />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Title
                    </label>
                    <InputFunction
                      refrence={titleRef}
                      placeholder={"Enter title"}
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      Link
                    </label>
                    <InputFunction
                      refrence={linkRef}
                      placeholder={"Enter link"}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-3">
                <h1 className="font-medium shadow-sm">Types</h1>
              </div>
              <div className="flex items-center justify-center gap-6 mb-4">
                <Button
                  text="Youtube"
                  variants={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Youtube);
                  }}
                />
                <Button
                  text="Twitter"
                  variants={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Twitter);
                  }}
                />
                {/* <Button text="Document" variants={type === ContentType.Youtube ? "primary" : "secondary"} /> */}
              </div>
              <div className="px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 sm:py-2.5 text-slate-700 font-medium rounded-lg border-2 border-slate-200 hover:bg-slate-100 transition-colors text-sm sm:text-base order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={addContent}
                  disabled={loading}
                  className="flex-1 px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm sm:text-base order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {loading ? "Adding..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
