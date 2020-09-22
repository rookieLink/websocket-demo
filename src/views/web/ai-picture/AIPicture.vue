<style lang="less" scoped>
  .picture-container {
    height: 100vh;
    width: 100vw;
    position: relative;
    .upload-image {
      height: 200px;
      width: 200px;
      margin: 0 auto;
      background: pink;
      .img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    #qrcodeDefault {
      position: absolute;
      bottom: 100px;
      left: 100px;
    }
  }
</style>

<template>
  <div class="picture-container">
    web端页面
    <!-- <button @click="sendMessage()">发送信息</button> -->
    <div id="qrcodeDefault" style="height:100px; width: 100px; margin: 0 auto"></div>
    <div v-if="imageUrl" class="upload-image">
      <img :src="imageUrl" class="img" alt="手机端上传图片" />
    </div>
    <div>
      {{waiting ? '等待图片上传中...' : (uploading ? '图片上传中...': (picturing ? '识图中...' : ''))}}
    </div>
  </div>
</template>

<script>
import {createWebsocket} from './../../../share/websocket.js'
import QRcode from './../../../share/qrcode.js'
import uuid from './../../../share/uuid'

export default {
  data() {
    return {
      ws: null,
      // connID: uuid(15),
      connID: 'zhang123456',
      index: 1,
      imageUrl: '',
      waiting: true,
      uploading: false,
      picturing: false
    }
  },

  methods: {
    deal(e) {
      console.log('message回包', e)
      this.ws.send('123')
    },
    sendMessage() {
      const params = {
        conn_id: '123456',
        message: `测试${this.index++}`,
      }
      this.ws.send(JSON.stringify(params))
    },

    paintCode() {
      var qrcode = new QRcode({
        text: `http://192.168.202.170:8080/mobile/ai-picture?conn_id=${this.connID}`,
        size: 100
        // render: '#test'
      })
      const qrcodeEL = document.getElementById('qrcodeDefault');
      qrcodeEL.innerHTML = '';
      qrcodeEL.appendChild(qrcode);
      console.log(qrcode);
    }
  },

  mounted() {
    // const ws = createWebsocket('ws://123.207.136.134:9010/ajaxchattest', (e) => {
    const ws = createWebsocket(`ws://192.168.201.219:5001/ws`, (e) => {
      const result = JSON.parse(e.data);
      console.log(result)
      // this.sendMessage();
      if (result.type = "conn_id") {
        this.connID = result.key;
        this.paintCode();
      }
      if (result.data && result.data.type === 'image') {
        this.imageUrl = result.data.image;
        this.waiting = false;
        this.uploading = true;

        setTimeout(() => {
          this.uploading = false;
          this.picturing = true;
          setTimeout(() => {
            this.picturing = false;
            this.$router.push('/web/picture-result?imageUrl=' + this.imageUrl)
          })
        }, 2000);

      }
    });

    this.ws = ws;

    console.log('mounted');
    // this.paintCode()
    // this.sendHeart(ws);
  },

  beforeDestroy() {
    if (this.ws) {
      this.ws.close()
    }
  },
  
}
</script>