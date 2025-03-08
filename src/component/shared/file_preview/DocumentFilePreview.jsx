import PropTypes from "prop-types";
const DocumentFilePreview = ({ fileUrl, fileType }) => {
  if (!fileUrl || !fileType) {
    return <div>No file to preview</div>;
  }

  // For PDF
  if (fileType === "pdf") {
    return (
      <iframe
        src={fileUrl}
        title="PDF Preview"
        style={{ width: "80vw", height: "80vh", border: "none" }}
      />
    );
  }

  // For Word Documents (doc, docx)
  if (fileType === "doc" || fileType === "docx") {
    return (
      <iframe
        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
        title="Word Document Preview"
        style={{ width: "100%", height: "500px", border: "none" }}
      />
    );
  }

  // For CSV
  if (fileType === "csv") {
    return (
      <iframe
        src={fileUrl}
        title="CSV Preview"
        style={{ width: "100%", height: "500px", border: "none" }}
      />
    );
  }

  // Fallback for unsupported file types
  return <div>Preview not supported for this file type.</div>;
};

export default DocumentFilePreview;

DocumentFilePreview.propTypes = {
  fileUrl: PropTypes.any,
  fileType: PropTypes.any,
};
