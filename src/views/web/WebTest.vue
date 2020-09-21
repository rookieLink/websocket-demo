<style lang="less" scoped>
  .websocket-main {
    height: 100vh;
    width: 100vh;
  }
</style>

<template>
  <div class="websocket-main">
    web端页面
    <button @click="sendMessage()">发送信息</button>
    <div id="qrcodeDefault" style="height:100px; width: 100px; margin: 0 auto"></div>
  </div>
</template>

<script>
import {createWebsocket} from './../../share/websocket.js'
import QRcode from './../../share/qrcode.js'

export default {
  data() {
    return {
      ws: null
    }
  },

  methods: {
    deal(e) {
      console.log(e)
      // this.ws.send('123')
    },
    sendMessage() {
      this.ws.send('发送消息')
    },
    paintCode() {
      var qrcode = new QRcode({
        text: 'http://www.baidu.com',
        size: 100
        // render: '#test'
      })
      document.getElementById('qrcodeDefault').appendChild(qrcode);
      console.log(qrcode);
    }

  },

  mounted() {
    // const ws = createWebsocket('ws://123.207.136.134:9010/ajaxchattest', (e) => {
    const ws = createWebsocket('ws://192.168.201.219:5001/ws', (e) => {

      setTimeout(() => {
        this.deal(e)
      }, 3000)
    });

    this.ws = ws;

    console.log('mounted');
    this.paintCode()
    // this.sendHeart(ws);
  }
  
}
</script>