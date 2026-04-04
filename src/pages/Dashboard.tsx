import { useState } from "react";
import "../App.css";
import { Button } from "../ui/Button";
import { PlusIcon } from "../icons/plusIcon";
import { ShareIcon } from "../icons/shareIcon";
import { Card } from "../ui/Card";
import { CreateContentModel } from "../ui/CreateContentModel";
import { SideBar } from "../ui/SideBar";
import { useContent } from "../hooks/userContent";
import axios from "axios";
import { BACKEND_URL } from "../Config";

export function DashBoard() {
  const [openModel, setModelOpen] = useState(false);
  const { contents, loading, error, refetch } = useContent();

  const handleContentAdded = async () => {
    setModelOpen(false);
    // Refresh contents after adding
    await refetch();
  };

  const handleDelete = async (contentId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authenticated. Please sign in first.");
        return;
      }

      await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Content deleted successfully");
      alert("Content deleted successfully! 🎉");
      // Refresh contents after deletion
      await refetch();
    } catch (err: any) {
      console.error("❌ Error deleting content:", err);
      if (err.response?.data?.msg) {
        alert(`Error: ${err.response.data.msg}`);
      } else {
        alert("Failed to delete content. Please try again.");
      }
    }
  };

  // Map type to icon name
  const getIconName = (type: string): "youtube" | "twitter" | "notes" => {
    switch (type) {
      case "youtube":
        return "youtube";
      case "twitter":
        return "twitter";
      case "document":
        return "notes";
      default:
        return "notes";
    }
  };
  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex-col md:flex-row">
        <SideBar />
        <div className="flex-1 md:ml-72 overflow-y-auto">
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent truncate">
                  All Notes
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 hidden sm:block">
                  Organize your thoughts
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <Button
                  variants="secondary"
                  text="Share"
                  startIcon={<ShareIcon />}
                />
                <Button
                  onClick={() => {
                    setModelOpen(true);
                  }}
                  variants="primary"
                  text="Add Content"
                  startIcon={<PlusIcon />}
                />
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <p className="font-medium">Error loading content</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}
            {!loading && !error && contents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No content yet</p>
                <p className="text-slate-400 text-sm mt-1">
                  Add your first note to get started
                </p>
              </div>
            )}
            {!loading && !error && contents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {contents.map((content) => (
                  <Card
                    key={content._id}
                    type={content.type}
                    link={content.link}
                    title={content.title}
                    icon={getIconName(content.type)}
                    onDelete={() => handleDelete(content._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <CreateContentModel
          open={openModel}
          onClose={() => {
            setModelOpen(false);
          }}
          onSuccess={handleContentAdded}
        />
      </div>
    </>
  );
}
