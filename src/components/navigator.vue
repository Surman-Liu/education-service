<template>
  <div>
    <div class="navigator">
      <span class="title" @click="title">Space</span>
      <div class="content">
        <!-- <span @click="teacher" :class="{ active: active === 'teacher' }">
        Teacher
      </span> -->
        <span :class="{ active: active === 'lading' }" @click="goToClass">
          首页
        </span>
        <span> 教学平台 </span>
        <span> 考试平台 </span>
        <span> 实验平台 </span>
        <span> 教学评价 </span>
        <span
          :class="{ active: active === 'class-manage' }"
          v-if="user.job == 1"
          @click="$router.push('/class-manage')"
        >
          课程管理
        </span>
        <span
          :class="{ active: active === 'admin-manage' }"
          v-if="user.job == 2"
          @click="$router.push('/admin-manage/student-manage')"
        >
          管理平台
        </span>
        <div class="login-option" v-if="isLogin === false">
          <el-button type="success" round class="login" @click="login">
            Log in
          </el-button>
          <el-button type="success" round @click="register">Sign up</el-button>
        </div>
        <div class="user-info" v-if="isLogin === true">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                :src="user.touxiang || circleUrl"
                alt=""
                class="touxiang"
                @click="profile"
              />
              <span>{{ user.username }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-collection"
                @click.native="profile"
              >
                我的主页
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-guide"
                @click.native="$router.push('/class-manage')"
                v-if="user.job == 1"
              >
                课程管理
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-unlock"
                @click.native="dialogVisible = true"
              >
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 确认退出的对话框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>确定退出登陆吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exit"> 确 定 </el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: '',
  },
  data() {
    return {
      isLogin: false,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      user: {},
      dialogVisible: false,
    };
  },
  methods: {
    title() {
      this.$router.push('/');
    },
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
    },
    teacher() {
      this.$router.push('/teacher');
    },
    goToClass() {
      this.$router.push('/lading');
    },
    profile() {
      this.$router.push(`/profile/${this.user.job}/${this.user.id}`);
    },
    exit() {
      // 将用户信息存入vuex
      this.dialogVisible = false;
      this.$store.commit('user/setIsLogin', false);
      this.$store.commit('user/setUser', {});
      this.isLogin = false;
      this.$router.push('/');
    },
  },
  // 挂在前检查用户是否登录
  beforeMount() {
    this.isLogin = this.$store.state.user.isLogin;
    this.user = this.$store.state.user.user;
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog__body {
  padding: 0 20px;
}
.active {
  font-size: 17px;
  color: #67c23a;
  border-bottom: 3px solid #67c23a;
}
.navigator {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  .title {
    font-size: 20px;
    color: #5fc690;
    font-weight: 600;
    cursor: pointer;
  }
  .content {
    display: flex;
    > span {
      box-sizing: border-box;
      display: inline-block;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      color: #8c8d8d;
      cursor: pointer;
      &:hover {
        font-size: 17px;
        color: #67c23a;
        border-bottom: 3px solid #67c23a;
      }
    }
    /deep/.el-button.is-round {
      padding: 8px 23px;
    }
    .login {
      background-color: #fff;
      color: #67c23a;
      margin-left: 10px;
      &:hover {
        background-color: #eaf8e3;
      }
    }
    .user-info {
      padding: 0 20px;
      cursor: pointer;
      .touxiang {
        vertical-align: middle;
        width: 35px;
        height: 35px;
        border-radius: 60px;
        border: 2px solid #fff;
      }
    }
  }
}
</style>
