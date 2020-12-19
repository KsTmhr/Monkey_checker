$(function(){

const w = document.documentElement.clientWidth;
const h = document.documentElement.clientHeight;

const resolution = { w: w, h: h };

let video;
let img;
let btn_text;
let media;
let img_url

let imgIsTaken = false;


video = document.getElementById('video'); // video要素をつくる
img = document.getElementById('img'); // 撮った写真表示エリア
btn_text = document.getElementById('stop_btn').firstChild; // 停止ボタンの文字
detect_btn = document.getElementById('detect_btn'); // 分析開始のボタン

img.style.display = 'none'; // 写真表示エリアの不可視化

// video要素にWebカメラの映像を表示させる
media = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: { ideal: resolution.w },
    height: { ideal: resolution.h }
  }

}).then(function(stream) {
  video.srcObject = stream; // videoをwebCamの映像にする

}).then(()=>{ // enable the button
  const stop_btn = document.getElementById('stop_btn');
  stop_btn.disabled = false;

  stop_btn.onclick = e => {  // ボタンが押されたら
    if(!imgIsTaken){          // 写真が撮ってない場合、撮って、imgIsTakenを切り替える
      //takeASnap().then(stop);
      takeASnap()
      stop()
      imgIsTaken = true;

    }else{                   // 撮ってある場合、カメラリリース後、imgIsTakenを切り替える
      start();
      imgIsTaken = false;
    }
  };
})

// 撮影
function takeASnap(){
  const canvas = document.createElement('canvas'); // canvasを作る
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth; // サイズをcanvasに合わせる
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0,0); // the video
  /* return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // canvasを blob に変換する
  }); */
  img_url = canvas.toDataURL("image/jpeg")
}

// 撮った画像表示
//function stop(blob){
function stop(){
  //img_url = URL.createObjectURL(blob);// blobの url を作る
  img.src = img_url; // imgを指定
  img.style.display = 'block'; // imgを可視化
  video.style.display = 'none'; // videoを不可視化
  btn_text.data = '撮り直す' // btnの文字を変更
}

// カメラリリース
function start(){
  video.style.display = 'block'; // videoを可視化
  img.style.display = 'none'; // imgを不可視化
  btn_text.data = 'ストップ' // btnの文字を変更
}

// 分析開始
$("#detect_btn").on('click', function() {

  // csrf？対策
  function getCookie(name) {
    var cookieValue = null;

    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);

        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });
  // ここまで csrf対策


  // ajax通信
  $.ajax({
    url: '/start_detect/', // データ送信先
    method: "POST",
    data: {
      'detect_img':img_url, // 撮った写真のURLを送る
    },
    dataType: "image/jpeg",
  })
  .done( function(data) { // 成功した場合の処理
    img.src = '/static/js/result/new_img.jpg'; // imgを指定
    img.style.display = 'block'; // imgを可視化
    video.style.display = 'none'; // videoを不可視化
    btn_text.data = '撮り直す' // btnの文字を変更
  })
});

});
