import { useState } from "react";

function FileUpload({ onFileChange }: any) {
  const [error, setError] = useState("");

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError("Можно загрузить только JPG, PNG, GIF или WEBP");
      if (onFileChange) onFileChange(null);
      return;
    }

    const ext = file.name.split('.').pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      setError("Можно загрузить только JPG, PNG, GIF или WEBP");
      if (onFileChange) onFileChange(null);
      return;
    }

    setError("");
    if (onFileChange) onFileChange(file);
  };

  return (
    <div>
      <form className="cursor-pointer" onSubmit={e => e.preventDefault()}>
        <div className="relative inline-block">
          <input
            type="file"
            id="file-upload"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
          />
          <label
            htmlFor="file-upload"
            className="text-green-600 underline text-sm cursor-pointer hover:no-underline"
          >
            изменить фото
          </label>
        </div>
      </form>
      {error && (
        <div className="text-red-500 text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUpload;