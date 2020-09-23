<style lang="less" scoped>
.video {
  width: 100%;
}

.is-hidden {
  display: none;
}

.iconfont {
  font-size: 24px;
}

.btns {
  margin-bottom: 10px;
}

button {
  font-size: 22px;
  padding: 8px 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.video-screenshot {
  width: 50%;
  // height: 400px;
  margin: 20px auto 0;
  // overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }

}

footer {
  margin: 20px 0;
  font-size: 16px;
}
.url-address {
  color: pink;
}

</style>

<template>
  <div class="camera-h5">
    <h1>使用JavaScript的webRTC访问前后摄像头</h1>
    <div class="btns">
      <button :class="`button ${!!imageData ? 'is-hidden' : ''}`" @click="screenShot()">
        拍照
      </button>
      <button :class="`button ${!imageData ? 'is-hidden' : ''}`" @click="init()">
        重拍
      </button>
      <button class="button" @click="toggleFront()" style="padding: 6px 10px;">
        切换摄像头
      </button>
    </div>
    <div class="video-screenshot">
      <video :class="`video ${!!imageData ? 'is-hidden' : ''}`" autoplay ref="video"></video>
      <div class="screenshotsContainer">
        <canvas ref="canvas" class="is-hidden"></canvas>
        <template v-if="imageData">
          <img :src="imageData" alt="拍摄照片" />
        </template>
      </div>
    </div>
    <div class="upload-container">
      <button :class="`button ${!imageData ? 'is-hidden' : ''}`" @click="uploadImage()">{{uploadMsg}}</button>
    </div>
    <div class="url-address">
      {{imageUrl}}
    </div>
  </div>
</template>

<script>
import {uploadImageFromBase64} from './../../service/api/common'

export default {
  data() {
    return {
      videoStream: null,  // 视频流
      useFrontCamera: true, // 前置摄像头标志
      constraints: {  //  摄像头配置
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          }
        },
      },
      imageData: null,
      imageUrl: '',
      uploadMsg: '上传图片'
    }
  },
  methods: {
    stopVideoStream() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    },

    async init() {
      this.uploadMsg = '上传图片'

      console.log(this.$refs);
      this.imageData = null;
        const {video} = this.$refs;
        this.stopVideoStream();
        this.constraints.video.facingMode = this.useFrontCamera ? "user" : "environment";
        try {
          this.videoStream = await navigator.mediaDevices.getUserMedia(this.constraints);
          video.srcObject = this.videoStream;
        } catch (error) {
          console.log(error)
        }
    },

    toggleFront() {
      this.useFrontCamera = !this.useFrontCamera;
      this.init();
    },
    screenShot() {
      const {canvas, video} = this.$refs;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      this.imageData = canvas.toDataURL("image/png");
    },
    uploadImage() {
      console.log('上传图片');
      this.uploadMsg = '上传中...'
      uploadImageFromBase64(this.imageData.split(',')[1])
      .then(result => {
        console.log(result);
        this.uploadMsg = '上传成功'
        if (result && result.errorCode === 0)
        this.imageUrl = result.imageUrl;
      }, err => {
        this.uploadMsg='上传失败';
      })


    }
  },
  mounted () {
    if (
      !("mediaDevices" in navigator) ||
      !("getUserMedia" in navigator.mediaDevices)
    ) {
      window.confirm('当前浏览器不支持Camera API，请更换或升级浏览器。');
      return;
    } else {
    }
    this.init()
  }
}
</script>