<style lang="less" scoped>
  .websocket-main {
    height: 100vh;
    width: 100vw;
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
import uuid from './../../share/uuid'

export default {
  data() {
    return {
      ws: null,
      // connID: uuid(15),
      connID: 'zhang123456',
      index: 1
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
        text: `http://www.baidu.com?conn_id=${this.connID}`,
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
    });

    this.ws = ws;

    console.log('mounted');
    // this.paintCode()
    // this.sendHeart(ws);
  },

  beforeDestroy() {
    if (ws) {
      ws.close()
    }
  },
  
}
</script>