<style lang="less" scoped>
  .result-container {
    height: 100vh;
    width: 100vw;
    background-color: pink;
    overflow: hidden;
    .back-btn {
      height: 30px;
      width: 150px;
      margin: 20px auto 0;
      font-size: 24px;
      color: black;
      background-color: yellow;
      border-radius: 8px
    }
    .img-container {
      height:200px;
      width: 200px;
      margin: 0 auto;
      img {
        height:100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }
</style>
<template>
  <div class="result-container">
    <h1 style="margin-top: 50px">识别结果</h1>
    <div class="img-contianer">
      <img v-if="imageUrl" :src="imageUrl" alt="结果图片" />
    </div>
    <p v-if="real" style="margin-top: 50px">您这包可这是绝了，比真的还真！</p>
    <p v-if="!real" style="margin-top: 50px">这种假货就别来识包了，根本识别不出来，拿走拿走，浪费包小鉴感情！</p>
    <div class="back-btn" @click="goBack()"> 返回</div>
  </div>

</template>

<script>
export default {
 data() {
   return {
     real: Math.random() > 0.1 ? true : false,
     imageUrl: ''
   }
 },
 methods: {
   goBack() {
     this.$router.go(-1);
   }
 },
 mounted () {
   this.imageUrl = this.$route.params.imageUrl
 }
}
</script>