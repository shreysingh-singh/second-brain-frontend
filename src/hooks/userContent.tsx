import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document";
  userId: string;
  tags: string[];
}

interface UseContentReturn {
  contents: Content[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useContent(): UseContentReturn {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContents = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please sign in first.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Contents fetched:", response.data.content);
      setContents(response.data.content || []);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error("❌ Error fetching contents:", err);

      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 403) {
        setError("Unauthorized: Your session has expired. Please sign in again.");
      } else if (err.message === "Network Error") {
        setError("Network error: Unable to reach server");
      } else {
        setError(err.message || "An error occurred while fetching contents");
      }
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return {
    contents,
    loading,
    error,
    refetch: fetchContents,
  };
}