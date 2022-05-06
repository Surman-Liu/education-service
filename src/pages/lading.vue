<template>
  <div class="center-layout">
    <navigator active="lading" />
    <full-page :options="options">
      <div class="section content">
        <!-- <el-alert v-if="showWarning" type="warning">{{ warningText }}</el-alert> -->
        <el-row>
          <el-col :span="12">
            <div class="content-left">
              <div class="name">"Space"</div>
              <div class="name name1">智慧教学服务平台</div>
              <div class="title">Let Study</div>
              <div class="title">Stay intelligence</div>
              <div class="sub-title">Space | 智慧教学服务平台</div>
              <div class="search">
                <!-- <el-input
                  v-model="search"
                  placeholder="快输入感兴趣的内容吧"
                  maxlength="18"
                ></el-input> -->
                <el-button round @click="start" v-if="!isLogin"
                  >Get started</el-button
                >
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content-right">
              <lottie
                :options="defaultOptions"
                :height="500"
                :width="500"
                class="lottie"
              /></div
          ></el-col>
        </el-row>
      </div>
      <div class="section content content-sub">
        <el-row>
          <el-col :span="12">
            <div class="content-right">
              <lottie
                :options="teachOptions"
                :height="480"
                :width="480"
                class="lottie"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content-left section2">
              <div class="name">智慧教学平台</div>
              <div class="name name1">在线考试平台</div>
              <div class="title">Let education</div>
              <div class="title">Stay personalized</div>
              <div class="sub-title">Space | 智慧教学服务平台</div>
              <el-button round class="button" @click="start" v-if="!isLogin"
                >Get Started</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="section content content-sub">
        <el-row>
          <el-col :span="12">
            <div class="content-left">
              <div class="name">实验实践云平台</div>
              <div class="name name1">教学质量评价系统</div>
              <div class="title">Let quality</div>
              <div class="title">Stay transparent</div>
              <div class="sub-title">Space | 智慧教学服务平台</div>
              <el-button round class="button" @click="start" v-if="!isLogin"
                >Get Started</el-button
              >
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content-right">
              <lottie
                :options="trailOptions"
                :height="500"
                :width="500"
                class="lottie"
              /></div
          ></el-col>
        </el-row>
      </div>
    </full-page>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';
import * as animationData from '@/assets/lotties/lading.json';
import * as teachData from '@/assets/lotties/teach.json';
import * as trailData from '@/assets/lotties/trail.json';

export default {
  data() {
    return {
      isLogin: false,
      showWarning: false,
      warningText: '',
      options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        scrollOverflow: true,
        scrollBar: false,
        onLeave: this.onLeave,
        afterLoad: this.afterLoad,
        scrollingSpeed: 1300,
      },
      teachOptions: {
        animationData: teachData,
      },
      trailOptions: {
        animationData: trailData,
      },
      defaultOptions: {
        animationData,
      },
      search: '',
    };
  },
  components: {
    Navigator,
  },
  methods: {
    start() {
      this.$router.push('/login');
    },
  },
  beforeMount() {
    this.isLogin = this.$localStorage.getItem('isLogin');
    // let user = this.$store.state.user.user;
    // let isLogin = this.$store.state.user.isLogin;
    // let status = user.status;
    // if (isLogin && status !== 3 && user.job === 1) {
    //   this.showWarning = true;
    // }
    // if (isLogin && status === 1) {
    //   this.warningText =
    //     '亲爱的老师，您的信息正在审核中，暂时不支持发布课程等功能哦';
    // }
    // if (isLogin && status === 2) {
    //   this.warningText = '亲爱的老师，您的信息未通过审核，请去主页查看详情吧';
    // }
  },
};
</script>

<style lang="less" scoped>
/deep/.el-alert {
  width: 1000px;
}
.content {
  height: calc(100vh - 50px);
  display: flex;
  position: relative;
}
.content-sub {
  height: 100vh;
  margin-top: 50px;
}
.title {
  color: #005c3a;
  font-weight: 600;
  font-size: 50px;
}
.name {
  color: #ff9595;
  font-weight: 600;
  font-size: 50px;
  margin-bottom: 20px;
  margin-top: 40px;
}
.name1 {
  margin-top: 20px;
  color: #61d8ba;
}
.sub-title {
  color: #b3b3b3;
  margin-top: 10px;
}
// 搜索框样式
.search {
  position: relative;
  width: 360px;
  margin-top: 50px;
  /deep/.el-input__inner {
    width: 300px;
    border: 2px solid #ffdf80;
    border-radius: 20px;
    color: #005c3a;
  }
  button {
    // position: absolute;
    // left: 265px;
    border: none;
    background-color: #ffd75f;
    color: #fff;
    font-size: 16px;
    &:hover {
      background-color: #ffdf80;
    }
  }
}
.content-right {
  margin-left: 15px;
  margin-top: -10px;
}
.section2 {
  margin-left: 20px;
}
.button {
  margin-top: 50px;
  background-color: #ffd75f;
  color: #fff;
  font-size: 16px;
  border: none;
  &:hover {
    background-color: #ffdf80;
  }
}
</style>
