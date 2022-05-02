<template>
  <div class="center-layout">
    <navigator />
    <div class="add-content">
      <el-page-header @back="goBack" content="新增教学活动"> </el-page-header>
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择新增教学类型">
            <el-option label="新增课程" :value="0"></el-option>
            <el-option label="新增考试" :value="1"></el-option>
            <el-option label="新增实验" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否付费">
          <el-switch v-model="pay"></el-switch>
        </el-form-item>
        <el-form-item label="费用" v-if="pay === true">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="内容简介">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传封面">
          <el-upload
            class="upload-demo"
            drag
            :show-file-list="false"
            action="space-service.oss-cn-chengdu.aliyuncs.com"
            :http-request="fnUploadRequest"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.poster" :src="form.poster" class="avatar" />
            <div v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';
import { getDate } from '@/utils/date';
import { isEmpty } from '@/utils/validator';

const OSS = require('ali-oss');
const client = new OSS({
  accessKeyId: 'LTAI5tJXqHPwRVYAUix5pE9Q', // 查看你自己的阿里云KEY
  accessKeySecret: '2UFEERI6KmbTmaWaFSN8yzb8DjfEKH', // 查看自己的阿里云KEYSECRET
  bucket: 'space-service', // 你的 OSS bucket 名称
  region: 'oss-cn-chengdu', // bucket 所在地址，我的是 华东2 杭州
  cname: true, // 开启自定义域名上传
  endpoint: 'space-service.oss-cn-chengdu.aliyuncs.com', // 自己的域名
});

export default {
  components: {
    Navigator,
  },
  data() {
    return {
      title: '新增',
      pay: false,
      form: {
        name: '',
        type: '',
        money: '',
        desc: '',
        poster: '',
        status: 2, //审核中的状态，不变
      },
      optionMenu: {
        1: {
          title: '课程管理',
          pie: '课程情况',
          add: '新增课程',
          edit: '编辑课程',
          delete: '删除课程',
        },
        2: {
          title: '考试管理',
          pie: '考试情况',
          add: '新增考试',
          edit: '编辑考试',
          delete: '删除考试',
        },
        3: {
          title: '实验管理',
          pie: '实验情况',
          add: '新增实验',
          edit: '编辑实验',
          delete: '删除实验',
        },
      },
    };
  },
  methods: {
    getDate,
    isEmpty,
    goBack() {
      this.$router.go(-1);
    },

    //图片上传成功回调
    handleAvatarSuccess(res) {
      if (res) this.form.poster = res.url;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    async fnUploadRequest(options) {
      try {
        let file = options.file; // 拿到 file
        let fileName = file.name.substr(0, file.name.lastIndexOf('.'));
        let date = new Date().getTime();
        let fileNames = `${date}_${fileName}`; // 拼接文件名，保证唯一，这里使用时间戳+原文件名
        // 上传文件,这里是上传到OSS的 uploads文件夹下
        client.put('poster/' + fileNames, file).then((res) => {
          if (res.res.statusCode === 200) {
            options.onSuccess(res);
          } else {
            options.onError('上传失败');
          }
        });
      } catch (e) {
        options.onError('上传失败');
      }
    },

    onSubmit(type) {
      let user = this.$store.state.user.user;
      if (JSON.stringify(user) === '{}') {
        this.$message({
          message: '请先登录',
          type: 'warning',
        });
        return;
      }
      if (this.pay === false) {
        this.form.money = 0;
      }
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
      this.form.teacher_id = user.id;
      this.form.teacher_name = user.username;
      this.form.create_time = this.getDate();

      // 发送给后台
      this.$axios.post('/api/class/add', this.form).then((res) => {
        if (res.data.code === 'SUCCESS') {
          this.$message({
            message: res.data.msg,
            type: 'success',
          });
          this.$router.push('/class-manage');
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add-content {
  margin-top: 10px;
}
/deep/.el-page-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.form {
  padding: 30px 220px;
  .avatar {
    width: 360px;
    height: 180px;
    object-fit: cover;
  }
}
</style>
