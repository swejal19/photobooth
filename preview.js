const generateBtn = document.getElementById("generateBtn");
const finalCanvas = document.getElementById("finalCanvas");
const downloadLink = document.getElementById("downloadLink");

const bgImages = [];
for (let i = 1; i <= 16; i++) {
  bgImages.push(`bg${i}`);
}

let currentIndex = 0;
let selectedBG = bgImages[currentIndex];

const bgPreview = document.getElementById("bgPreview");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let photos = JSON.parse(localStorage.getItem("photobooth_images")) || [];

function updatePreview() {
  selectedBG = bgImages[currentIndex];
  bgPreview.src =
    selectedBG === "none"
      ? "./assets/backgrounds/bg1.jpg"
      : `./assets/backgrounds/${selectedBG}.jpg`;

  drawFinal();
}

leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + bgImages.length) % bgImages.length;
  updatePreview();
});

rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % bgImages.length;
  updatePreview();
});

function drawFinal() {
  const ctx = finalCanvas.getContext("2d");

  const width = 320;
  const height = 260;

  const padding = 20;
  const totalHeight = height * 3 + padding * 4;

  finalCanvas.width = width + padding * 2;
  finalCanvas.height = totalHeight;

  if (selectedBG !== "none") {
    const bg = new Image();
    bg.src = `assets/backgrounds/${selectedBG}.jpg`;
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, finalCanvas.width, finalCanvas.height);
      drawPhotos();
    };
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    drawPhotos();
  }
}

function drawPhotos() {
  const ctx = finalCanvas.getContext("2d");
  const width = 320;
  const height = 260;
  const padding = 20;

  photos.forEach((imgData, index) => {
    const img = new Image();
    img.src = imgData;

    img.onload = () => {
      const x = padding;
      const y = padding + index * (height + padding);

      ctx.save(); 
      ctx.translate(x + width, y);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, width, height);
      ctx.restore();

      if (index === photos.length - 1) {
        const finalImg = finalCanvas.toDataURL("image/png");
        downloadLink.href = finalImg;
        downloadLink.classList.remove("hidden");
        downloadLink.innerText = "Download";
      }
    };
  });
}

updatePreview();
