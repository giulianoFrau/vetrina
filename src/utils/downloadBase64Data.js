export const downloadBase64Data = (base64Data, fileName) => {
  // Convert base64 to Blob
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });

  // Create a temporary URL
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Programmatically click the link to trigger the download
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
  link.remove();
};
