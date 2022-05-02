<template>
  <div class="login-bg">
    <el-row>
      <el-col :span="12">
        <div class="grid-content-left">
          <span class="login-title">Register to Space</span>
          <el-input
            v-model="user.phone"
            placeholder="电话"
            class="input"
          ></el-input>
          <el-input
            placeholder="请输入密码"
            v-model="user.password"
            show-password
          ></el-input>
          <el-input
            v-model="user.message"
            placeholder="短信验证码"
            class="message-input"
            :width="250"
          ></el-input>
          <el-link
            type="success"
            class="forget"
            @click="sendMsg"
            :disabled="disabled"
          >
            {{ btntxt }}
          </el-link>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content-left right">
          <span class="login-title">Basic Info</span>
          <el-input
            placeholder="请输入真实姓名"
            v-model="user.realname"
            class="input"
          ></el-input>
          <el-input placeholder="请输入昵称" v-model="user.username"></el-input>
          <el-select v-model="user.job" placeholder="请选择您的身份">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-if="user.job === '1'"
            placeholder="请输入身份证号"
            v-model="user.idcard"
          ></el-input>
        </div>
      </el-col>
    </el-row>
    <div class="link">
      <el-button type="success" round class="button" @click="register">
        REGISTER
      </el-button>
      <span class="forget go-login" @click="login">已有帐号？去登陆</span>
    </div>
  </div>
</template>

<script>
import { isEmpty, validatemobile } from '@/utils/validator';

export default {
  data() {
    return {
      btntxt: '获取短信验证码',
      disabled: false,
      time: 0,
      user: {
        phone: '',
        realname: '',
        password: '',
        message: '',
        username: '',
        job: '',
        idcard: '',
      },
      options: [
        {
          label: '学生',
          value: '0',
        },
        {
          label: '老师',
          value: '1',
        },
      ],
    };
  },

  methods: {
    isEmpty,
    validatemobile,
    login() {
      this.$router.push('/login');
    },
    register() {
      let flag = 0;
      let url = '';
      Object.keys(this.user).forEach((key) => {
        if (this.isEmpty(this.user[key])) {
          if (key === 'idcard' && this.user.job === '1') {
            flag = 1;
          }
          if (key !== 'idcard') {
            flag = 1;
          }
        }
      });
      if (flag) {
        this.$message({
          message: '请完成信息填写',
          type: 'warning',
        });
        flag = 0;
        return;
      }
      if (!this.validatemobile(this.user.phone)) {
        this.$message({
          message: '请输入有效的手机号',
          type: 'warning',
        });
        return;
      }
      if (this.user.job === '0') {
        url = 'student';
      } else {
        url = 'teacher';
      }

      this.$axios.post(`/api/${url}/register`, this.user).then((res) => {
        if (res.data.code === 'SUCCESS') {
          this.$message({
            message: res.data.msg,
            type: 'success',
          });
          this.$router.replace('/login');
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
    },
    sendMsg() {
      if (!this.validatemobile(this.user.phone)) {
        this.$message({
          message: '请输入有效的手机号',
          type: 'warning',
        });
        return;
      }
      this.time = 60;
      this.disabled = true;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.btntxt = `${this.time}s后重新获取验证码`;
          this.time -= 1;
        } else {
          this.btntxt = '获取短信验证码';
          this.time = 0;
          this.disabled = false;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
      this.$axios
        .get('/api/utils/sendSmsLogin', {
          params: {
            phone: this.user.phone,
          },
        })
        .then((res) => {
          if (res.data.code === 'SUCCESS') {
            this.$message({
              message: res.data.msg,
              type: 'success',
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        });
    },
  },

  beforeRouteEnter(to, from, next) {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#a9c9b9');
    next();
  },

  beforeRouteLeave(to, from, next) {
    document.querySelector('body').setAttribute('style', '');
    next();
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 700px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 1px 1px 20px rgb(212, 212, 212);
  padding: 20px;
}
.grid-content-left {
  padding: 40px 30px;
  .login-title {
    display: block;
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 15px;
  }
  .input {
    margin-top: 20px;
  }
  /deep/.el-input__inner {
    width: 290px;
    margin: 8px 0;
    &:focus {
      border: 1px solid #5fc690;
    }
  }
}
.button {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  // margin-top: 20px;
  padding: 12px 50px;
  background-color: #5fc690;
  &:hover {
    background-color: #64e0a0;
  }
}
.forget {
  float: right;
  color: #5fc690;
  font-size: 13px;
}
.go-login {
  display: inline-block;
  cursor: pointer;
  float: none;
  position: absolute;
  right: 50px;
  bottom: 30px;
  &:hover {
    text-decoration: underline;
  }
}
</style>
