<template>
  <div class="class-info">
    <img :src="poster" alt="" class="class-img" />
    <div class="icon" v-if="type === 'edit'" @click="edit">
      <i class="el-icon-edit-outline"></i>
      <span>编辑</span>
    </div>
    <div class="icon" v-if="type === 'delete'" @click="remove">
      <i class="el-icon-folder-remove"></i>
      <span>删除</span>
    </div>
    <div class="class-content">
      <div class="name">{{ name }}</div>
      <div class="info">
        <span>{{ time }}</span>
        <span>{{ author }}</span>
      </div>
      <div class="buttom">
        <span class="price">￥{{ price }}</span>
        <span
          v-if="user.job == 1"
          class="status"
          :style="{
            color: statusObj[status].color,
          }"
          >{{ statusObj[status].text }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: '',
    id: '',
    name: '',
    time: '',
    author: '',
    price: '',
    status: '',
    poster: '',
  },
  data() {
    return {
      statusObj: {
        1: {
          color: '#91cc75',
          text: '已发布',
        },
        2: {
          color: '#5470c6',
          text: '待审核',
        },
        3: {
          color: '#fe6f6f',
          text: '已拒绝',
        },
      },
      user: {},
    };
  },
  methods: {
    edit() {
      this.$router.push(`edit/${this.id}`);
    },
    remove() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$axios
          .get('/api/class/delete', {
            params: {
              id: this.id,
            },
          })
          .then((res) => {
            if (res.data.code === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: res.data.msg,
              });
              this.$router.go(0);
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          });
      });
    },
  },
  mounted() {
    this.user = this.$localStorage.getItem('user');
  },
};
</script>

<style lang="less" scoped>
.class-info {
  margin: 10px 10px;
  width: 200px;
  position: relative;
  box-shadow: 1px 1px 10px #ddd;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    .name,
    .price {
      color: #5fc690 !important;
    }
  }
  .class-img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    vertical-align: middle;
  }
  .icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    border-radius: 20px;
    padding: 1px 10px;
    background-color: rgba(256, 256, 256, 0.9);
    color: grey;
    > i {
      vertical-align: middle;
    }
    > span {
      font-size: 14px;
    }
  }
  .class-content {
    cursor: pointer;
    padding: 10px;
    background-color: #fff;
    .name {
      font-size: 16px;
      line-height: 18px;
      font-weight: 600;
      color: #535353;
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-top: 7px;
      color: gray;
    }

    .buttom {
      margin: 10px 0;
      .price {
        font-size: 16px;
        font-weight: 600;
        color: #535353;
      }
      .status {
        float: right;
        font-size: 14px;
        padding: 0 5px;
      }
    }
  }
}
</style>
