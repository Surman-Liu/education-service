<template>
  <el-dialog
    ref="dialog"
    title="编辑信息"
    :visible.sync="show"
    width="30%"
    :append-to-body="true"
  >
    <el-form ref="form" :model="info" label-width="80px" label-position="left">
      <el-form-item label="头像:">
        <el-upload
          class="avatar-uploader"
          action="space-service.oss-cn-chengdu.aliyuncs.com"
          :http-request="fnUploadRequest"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="info.touxiang" :src="info.touxiang" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名:">
        <el-input v-model="info.username" placeholder="请输入你的用户名">
        </el-input>
      </el-form-item>
      <el-form-item label="科目:">
        <el-input v-model="info.words" :placeholder="wordsPlaceholder">
        </el-input>
      </el-form-item>
      <el-form-item label="简介:">
        <el-input v-model="info.introduce" placeholder="请输入你的简介">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
  props: {
    show: false,
    job: '',
  },
  data() {
    return {
      wordsPlaceholder: '',
      info: {
        touxiang: '',
        username: '',
        words: '',
        introduce: '',
        phone: this.$store.state.user.user.phone,
      },
    };
  },
  methods: {
    //图片上传成功回调
    handleAvatarSuccess(res) {
      if (res) this.info.touxiang = res.url;
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
        client.put('headerimages/' + fileNames, file).then((res) => {
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
    handleConfirm() {
      let url = '';
      if (this.job === '0') {
        url = 'student';
      } else {
        url = 'teacher';
      }
      this.$axios.post(`/api/${url}/editInfo`, this.info).then((res) => {
        if (res.data.code === 'SUCCESS') {
          this.$message({
            message: res.data.msg,
            type: 'success',
          });
          this.show = false;
          this.info = {};
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
    },
    handleClose() {
      this.show = false;
    },
  },
  beforeMount() {
    let user = this.$store.state.user.user;
    this.info.touxiang = user.touxiang;
    this.info.username = user.username;
    this.info.words = user.words;
    this.info.introduce = user.introduce;
    if (user.job === 0) {
      this.wordsPlaceholder = '请输入你感兴趣的科目';
    } else if (user.job === 1) {
      this.wordsPlaceholder = '请输入教学的科目';
    }
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader,
.el-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
