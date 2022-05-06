<template>
  <div class="login-bg">
    <el-row>
      <el-col :span="12">
        <div class="grid-content-left">
          <img
            v-show="activeIndex === '1'"
            src="@/assets/images/login.png"
            alt=""
            class="login-img"
          />
          <img
            v-show="activeIndex === '2'"
            src="@/assets/images/register.png"
            alt=""
            class="login-img"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content-right">
          <span class="login-title">Login to Space</span>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">PASSWORD</el-menu-item>
            <el-menu-item index="2">MESSAGE</el-menu-item>
          </el-menu>
          <div class="login-form" v-show="activeIndex === '1'">
            <el-input
              v-model="login.loginPhone"
              placeholder="电话"
              class="input"
            ></el-input>
            <el-select v-model="login.loginJob" placeholder="请选择您的身份">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              placeholder="请输入密码"
              v-model="login.loginPassword"
              show-password
            ></el-input>
            <div class="login-option">
              <el-link type="success" class="forget" @click="register">
                没有账号？去注册
              </el-link>
              <el-link
                type="success"
                class="forget"
                @click="dialogVisible = true"
              >
                Forget Password?
              </el-link>
              <el-dialog
                title="重置密码"
                :visible.sync="dialogVisible"
                width="30%"
                :append-to-body="true"
                :before-close="handleClose"
              >
                <el-form
                  ref="form"
                  :model="form"
                  label-width="80px"
                  label-position="left"
                >
                  <el-form-item label="电话:">
                    <el-input
                      v-model="form.forgetPhone"
                      placeholder="请输入电话号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="身份:" class="dialog">
                    <el-select
                      v-model="form.forgetJob"
                      placeholder="请选择您的身份"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="新密码:">
                    <el-input
                      v-model="form.newPassword"
                      placeholder="请输入新密码"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码:">
                    <el-input
                      v-model="form.newPswCheck"
                      placeholder="请再次输入新密码"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="验证码:">
                    <el-input
                      v-model="form.forgetComfirm"
                      placeholder="请输入短信验证码"
                    ></el-input>
                    <el-link
                      type="success"
                      class="forget"
                      @click="sendMsg(form.forgetPhone)"
                      :disabled="disabled"
                    >
                      {{ btntxt }}
                    </el-link>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="handleClose">取 消</el-button>
                  <el-button type="primary" @click="handleConfirm"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </div>
            <el-button
              type="success"
              round
              class="button"
              @click="passwordLogin"
              >LOGIN</el-button
            >
          </div>
          <div class="register-form" v-show="activeIndex === '2'">
            <el-input
              v-model="message.messagePhone"
              placeholder="电话"
              class="input"
            ></el-input>
            <el-select
              v-model="message.messageJob"
              placeholder="请选择您的身份"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="message.messageConfirm"
              placeholder="短信验证码"
            ></el-input>
            <div class="login-option">
              <el-link type="success" class="forget" @click="register">
                没有账号？去注册
              </el-link>
              <el-link
                type="success"
                class="forget"
                @click="sendMsg(message.messagePhone)"
                :disabled="disabled"
              >
                {{ btntxt }}
              </el-link>
            </div>
            <el-button type="success" round class="button" @click="messageLogin"
              >LOGIN</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
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
      activeIndex: '1',
      dialogVisible: false,
      login: {
        loginPhone: '',
        loginJob: '',
        loginPassword: '',
      },
      message: {
        messagePhone: '',
        messageJob: '',
        messageConfirm: '',
      },
      form: {
        forgetPhone: '',
        forgetComfirm: '',
        forgetJob: '',
        newPassword: '',
        newPswCheck: '',
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
        {
          label: '管理员',
          value: '3',
        },
      ],
    };
  },
  methods: {
    isEmpty,
    validatemobile,
    register() {
      this.$router.push('/register');
    },
    handleSelect(key) {
      this.activeIndex = key;
    },
    sendMsg(phone) {
      if (!this.validatemobile(phone)) {
        this.$message.error('请输入有效的手机号');
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
            phone: phone,
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
    // 使用密码登录
    passwordLogin() {
      let flag = 0;
      let url = '';
      Object.keys(this.login).forEach((key) => {
        if (this.isEmpty(this.login[key])) {
          flag = 1;
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
      if (!this.validatemobile(this.login.loginPhone)) {
        this.$message({
          message: '请输入有效的手机号',
          type: 'warning',
        });
        return;
      }
      if (this.login.loginJob === '0') {
        url = 'student';
      } else if (this.login.loginJob === '1') {
        url = 'teacher';
      } else {
        url = 'admin';
      }
      this.$axios
        .get(`/api/${url}/login`, {
          params: {
            phone: this.login.loginPhone,
            password: this.login.loginPassword,
          },
        })
        .then((res) => {
          if (res.data.code === 'SUCCESS') {
            this.$message({
              message: res.data.msg,
              type: 'success',
            });
            let user = res.data.data;
            this.putStorage(user);
            this.$router.push('/');
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        });
    },
    // 使用短信验证码登录
    messageLogin() {
      let flag = 0;
      let url = '';
      Object.keys(this.message).forEach((key) => {
        if (this.isEmpty(this.message[key])) {
          flag = 1;
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
      if (!this.validatemobile(this.message.messagePhone)) {
        this.$message({
          message: '请输入有效的手机号',
          type: 'warning',
        });
        return;
      }

      if (this.message.messageJob === '0') {
        url = 'student';
      } else if (this.message.messageJob === '0') {
        url = 'teacher';
      } else {
        url = 'admin';
      }
      this.$axios
        .get(`/api/${url}/messageLogin`, {
          params: {
            phone: this.message.messagePhone,
            code: this.message.messageConfirm,
          },
        })
        .then((res) => {
          if (res.data.code === 'SUCCESS') {
            this.$message({
              message: res.data.msg,
              type: 'success',
            });
            let user = res.data.data;
            this.putStorage(user);
            this.$router.push('/');
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        });
    },
    // 关闭重置密码框
    handleClose() {
      this.dialogVisible = false;
      this.btntxt = '获取短信验证码';
      this.time = 0;
      this.disabled = false;
      clearInterval(this.timer);
      this.timer = null;
      // 清除表单
      this.form.forgetPhone = '';
      this.form.forgetComfirm = '';
      this.form.newPassword = '';
      this.form.newPswCheck = '';
    },
    // 提交重置密码
    handleConfirm() {
      let url = '';
      let flag = 0;
      Object.keys(this.form).forEach((key) => {
        if (this.isEmpty(this.form[key])) {
          flag = 1;
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
      if (!this.validatemobile(this.form.forgetPhone)) {
        this.$message({
          message: '请输入有效的手机号',
          type: 'warning',
        });
        return;
      }
      if (this.form.newPassword !== this.form.newPswCheck) {
        this.$message({
          message: '两次密码输入不同',
          type: 'warning',
        });
        return;
      }
      if (this.form.forgetJob === '0') {
        url = 'student';
      } else if (this.form.forgetJob === '1') {
        url = 'teacher';
      } else {
        url = 'admin';
      }
      this.$axios
        .get(`/api/${url}/forgetPassword`, {
          params: {
            phone: this.form.forgetPhone,
            code: this.form.forgetComfirm,
            newPassword: this.form.newPassword,
          },
        })
        .then((res) => {
          if (res.data.code === 'SUCCESS') {
            this.$message({
              message: res.data.msg,
              type: 'success',
            });
            this.handleClose();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        });
    },
    // 缓存用户信息
    putStorage(user) {
      // 将用户信息存入vuex
      this.$store.commit('user/setIsLogin', true);
      this.$store.commit('user/setUser', user);
      this.$localStorage.setItem({
        name: 'user',
        value: user,
        expires: 1000 * 60 * 60 * 24 * 7,
      });
      this.$localStorage.setItem({
        name: 'isLogin',
        value: true,
        expires: 1000 * 60 * 60 * 24 * 7,
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
/deep/.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #5fc690;
}
/deep/.el-link--inner {
  line-height: 18px;
}
.dialog {
  /deep/.el-select {
    width: 259px;
  }
}
.grid-content-right {
  padding: 20px 30px;
  .login-title {
    display: block;
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 15px;
  }
  .input {
    margin-top: 10px;
  }
  /deep/.el-input__inner {
    width: 290px;
    margin: 8px 0;
    &:focus {
      border: 1px solid #5fc690;
    }
  }
  .login-option {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .forget {
      color: #5fc690;
      font-size: 13px;
    }
  }
  .button {
    margin-top: 10px;
    padding: 12px 50px;
    background-color: #5fc690;
    &:hover {
      background-color: #64e0a0;
    }
  }
}
.login-img {
  position: relative;
  top: 30px;
  left: -40px;
  width: 420px;
}
</style>
