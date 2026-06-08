import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { entryApi } from "../utils/api";

export default function ImportRegisterPage() {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleImport =
    async () => {
      if (!file) {
        toast.error(
          "Select an Excel file"
        );
        return;
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const res =
          await entryApi.importRegister(
            formData
          );

        toast.success(
          `Imported ${res.data.imported} records`
        );

        console.log(
          res.data
        );
      } catch (err) {
        console.error(err);

        toast.error(
          err?.response?.data
            ?.error ||
            "Import failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Import Historical Register
        </h1>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) =>
            setFile(
              e.target.files?.[0]
            )
          }
        />

        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white"
        >
          {loading
            ? "Importing..."
            : "Import Excel"}
        </button>
      </div>
    </Layout>
  );
}