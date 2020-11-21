const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;

const resolution = { w: w, h: h };
let video;
let media;

// video要素をつくる
video = document.getElementById('video');

// video要素にWebカメラの映像を表示させる
media = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: { ideal: resolution.w },
    height: { ideal: resolution.h }
  }
}).then(function(stream) {
  video.srcObject = stream;
});
