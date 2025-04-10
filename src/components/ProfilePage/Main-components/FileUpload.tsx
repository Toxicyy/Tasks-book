
function FileUpload() {
  return (
    <form className="cursor-pointer">
      <div className="relative inline-block">
        {/* Скрытый input */}
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Видимая ссылка */}
        <label
          htmlFor="file-upload"
          className="text-green-600 underline text-sm cursor-pointer hover:no-underline"
        >
          изменить фото
        </label>
      </div>
    </form>
  );
}

export default FileUpload;