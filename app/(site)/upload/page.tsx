export default function UploadPage() {
  return (
    <main className="page">
      <h1>Upload</h1>

      <form className="upload-form">
        <label>
          Title
          <input type="text" placeholder="Series title" />
        </label>

        <label>
          Type
          <select>
            <option>Manhwa</option>
            <option>Novel</option>
          </select>
        </label>

        <label>
          Upload File
          <input type="file" />
        </label>

        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
