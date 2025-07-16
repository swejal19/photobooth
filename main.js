const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const clickBtn = document.getElementById("clickBtn");
const retakeBtn = document.getElementById("retakeBtn");
const nextBtn = document.getElementById("nextBtn");
const filterbuttons = document.querySelectorAll(".filter-buttons button");

let currentfilter = "none";
let photos = [];
let photocount = 0;

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    alert("Camera access denied or not supported!");
    console.error(err);
  });

filterbuttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentfilter = btn.getAttribute("data-filter");
    video.style.filter = currentfilter;
  });
});

clickBtn.addEventListener("click", () => {
  canvas.classList.remove("hidden");
  video.classList.add("hidden");
  retakeBtn.classList.remove("hidden");
  clickBtn.classList.add("hidden");
  filterbuttons.forEach((fb)=>{
    fb.classList.add("hidden");
  });
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.filter = currentfilter;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imagedata = canvas.toDataURL("image/png");
  photos[photocount] = imagedata;
  nextBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  filterbuttons.forEach((fb)=>{
    fb.classList.remove("hidden");
  });
  photocount++;
  if (photocount < 3) {
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
  filterbuttons.forEach((fb)=>{
    fb.classList.remove("hidden");
  });
});