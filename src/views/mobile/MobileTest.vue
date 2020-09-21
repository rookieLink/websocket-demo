<style lang="less" scoped>
  .mobile-main {
    height: 100vh;
    width: 100vh;
  }
</style>

<template>
  <div class="mobile-main">
    手机端页面
  </div>
</template>

<script>
import {createWebsocket} from '../../share/websocket.js'

export default {
  data() {
    return {
      ws: null
    }
  },

  methods: {
    sendHeart(e) {
      console.log(e)
      // this.ws.send('123')
    }
  },

  mounted() {
    const ws = createWebsocket('ws://123.207.136.134:9010/ajaxchattest', (e) => {
      setTimeout(() => {
        // console.log(e);
        this.sendHeart(e)
        // this,
      }, 3000)
    });

    this.ws = ws;

    console.log('mounted');
    // this.sendHeart(ws);
  }
  
}
</script>