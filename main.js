const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const clickBtn = document.getElementById("clickBtn");
const retakeBtn = document.getElementById("retakeBtn");
const nextBtn = document.getElementById("nextBtn");
const filterButtons = document.querySelectorAll(".filter-buttons button");

let currentFilter = "none";
let photos = [];
let photoCount = 0;

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    alert("Camera access denied or not supported!");
    console.error(err);
  });

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.getAttribute("data-filter");
    video.style.filter = currentFilter;
  });
});

clickBtn.addEventListener("click", () => {
  canvas.classList.remove("hidden");
  video.classList.add("hidden");
  retakeBtn.classList.remove("hidden");
  clickBtn.classList.add("hidden");
  filterButtons.forEach((fb)=>{
    fb.classList.add("hidden");
  });
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.filter = currentFilter;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");
  photos[photoCount] = imageData;
  nextBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  filterButtons.forEach((fb)=>{
    fb.classList.remove("hidden");
  });
  photoCount++;
  if (photoCount < 3) {
    canvas.classList.add("hidden");
    video.classList.remove("hidden");
    retakeBtn.classList.add("hidden");
    clickBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    localStorage.setItem("photobooth_images", JSON.stringify(photos));
    window.location.href = "preview.html";
  }
});

retakeBtn.addEventListener("click", () => {
  canvas.classList.add("hidden");
  video.classList.remove("hidden");
  clickBtn.classList.remove("hidden");
  retakeBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  filterButtons.forEach((fb)=>{
    fb.classList.remove("hidden");
  });
});