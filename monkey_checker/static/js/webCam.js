const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;

const resolution = { w: w, h: h };

let video;
let img;
let btn_text;
let media;

let toggleStopButton = 0;

// video要素をつくる
video = document.getElementById('video');
img = document.getElementById('img');
btn_text = document.getElementById('stop_btn').firstChild;

img.style.display = 'none';

// video要素にWebカメラの映像を表示させる
media = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: { ideal: resolution.w },
    height: { ideal: resolution.h }
  }
}).then(function(stream) {
  video.srcObject = stream;
}).then(()=>{ // enable the button
  const btn = document.getElementById('stop_btn');
  btn.disabled = false;
  btn.onclick = e => {
    if(toggleStopButton == 0){
      takeASnap()
      .then(stop);
      toggleStopButton = 1;
    }else{
      start();
      toggleStopButton = 0;
    }
  };
})

function takeASnap(){
  const canvas = document.createElement('canvas'); // create a canvas
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = video.videoWidth; // set its size to the one of the video
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0,0); // the video
  return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}
function stop(blob){
  video.style.display = 'none';
  img.src = URL.createObjectURL(blob);
  img.style.display = 'block'
  btn_text.data = '撮り直す'
}
function start(){
  video.style.display = 'block';
  img.style.display = 'none';
  btn_text.data = 'ストップ'
}
