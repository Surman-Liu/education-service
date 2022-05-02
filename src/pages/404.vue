<template>
  <div class="center-layout">
    <navigator />
    <img src="@/assets/images/404.png" alt="" class="img" />
    <div class="explain">It looks like you're lost...</div>
    <el-button round class="home-button">GO BACK HOME</el-button>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';

export default {
  components: {
    Navigator,
  },

  beforeRouteEnter(to, from, next) {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#d1effa');
    next();
  },

  beforeRouteLeave(to, from, next) {
    document.querySelector('body').setAttribute('style', '');
    next();
  },
};
</script>

<style lang="less" scoped>
.img {
  display: block;
  width: 800px;
  margin: auto;
  margin-top: 35px;
  color: #d1effa;
}
.explain {
  color: #0a5d7b;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
.home-button {
  display: block;
  margin: 20px auto;
  background-color: #0a5d7b;
  border: none;
  color: #fff;
  &:hover {
    background-color: #1082ac;
  }
}
</style>
