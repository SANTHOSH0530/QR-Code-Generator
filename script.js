document.addEventListener("DOMContentLoaded", () => {
  const qrText = document.getElementById("qr-text");
  const generateBtn = document.getElementById("generate-btn");
  const downloadBtn = document.getElementById("download-btn");
  const qrcodeDiv = document.getElementById("qrcode");
  let qrcode = null;

  generateBtn.addEventListener("click", () => {
    const text = qrText.value.trim();

    if (!text) {
      alert("Please enter some text or URL");
      return;
    }

    // Clear previous QR code
    qrcodeDiv.innerHTML = "";

    // Generate new QR code
    qrcode = new QRCode(qrcodeDiv, {
      text: text,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H, //30% recovery capacity
    });

    // Show download button
    downloadBtn.style.display = "block";
  });

  downloadBtn.addEventListener("click", () => {
    // Get the canvas element
    //Finds the canvas element inside the QR code div. The QR code is rendered on this canvas.
    const canvas = qrcodeDiv.querySelector("canvas");
    //Safety check to ensure the canvas exists before proceeding.
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement("a");
    //Sets the name of the file that will be downloaded.
    link.download = "qrcode.png";
    //Generates a data URL for the QR code image.
    // It converts the HTML canvas into a downloadable PNG
    link.href = canvas.toDataURL("image/png");
    //Adds the link to the document body.
    document.body.appendChild(link);
    //Clicks the link, triggering the download.
    link.click();
    //Removes the link from the document body after the download is triggered.
    document.body.removeChild(link);
  });

  // Generate QR code on Enter key press
  qrText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      generateBtn.click();
    }
  });
});
