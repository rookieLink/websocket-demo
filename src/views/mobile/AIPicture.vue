<style lang="less" scoped>
  .picture-container {
    height: 100vh;
    width: 100vw;
    .add-picture {
      height: 200px;
      width: 200px;
      background-color: pink;
      position: relative;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
      .camera {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
      }
      .exmple-img {
        position: absolute;
        display: block;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
    .desp {
      margin-top: 10px
    }
    .upload-btn {
      height: 50px;
      width: 200px;
      font-size: 24px;
      background-color: yellow;
      color: black;
      margin: 20px auto 0;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

<template>
  <div class="picture-container">
    <h3>AI识包</h3>
    <div class="add-picture">
      <input type="file" accept="image/*" class="camera" @change="uploadImage($event)" capture="camera"/>
      <h1 v-if="!imageUrl">点我上传
      
      </h1>
      <template v-if="imageUrl">
        <img class="exmple-img" :src="imageUrl" alt="当前上传图片" />
      </template>
    </div>
    <div class="desp">请拍摄包袋的正面清晰图</div>
    <div class='upload-btn' @click="sendImage()">点击上传</div>
  </div>
</template>

<script>
import getBase64 from './../../share/img2Base64'
import {createWebsocket} from './../../share/websocket'
import parseUrl from './../../share/parseUrl.js';

export default {
  data() {
    return {
      imageUrl: '',
      conn_id: '',  // 大屏id
      connID: '', // 本地手机id，先预留，暂时未用到
      ws: null,
    }
  },
  methods: {
    uploadImage(e) {
      console.log(e);
      const file = e.target.files[0];
      getBase64(file).then(result => {
        console.log(result)
        this.imageUrl = result;
        // this.sendImage();
      })
    },

    sendImage() {
      if (this.ws) {
        const params = {
          conn_id: this.conn_id,
          data: {
            type: 'image',
            image: this.imageUrl
          }
        }
        this.ws.send(JSON.stringify(params));
      } else {
        alert('请等待通信连接完成')
      }
    },
    init() {}
  },
  mounted() {
    const urlObj = parseUrl();
    this.conn_id = urlObj.conn_id;
    // this.conn_id="5f69aab28cf3a07c6700001d";
    const ws = createWebsocket(`ws://192.168.201.219:5001/ws`, (e) => {
      const result = JSON.parse(e.data);
      console.log(result)
      // this.sendMessage();
      if (result.type = "conn_id") {
        this.connID = result.key;
      }
    });
    this.ws = ws;
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close()
    }
  }
}
</script>