<template>
  <div class="class-info">
    <img src="@/assets/images/class.jpg" alt="" class="class-img" />
    <div class="icon" v-if="type === 'edit'">
      <i class="el-icon-edit-outline"></i>
      <span>编辑</span>
    </div>
    <div class="icon" v-if="type === 'delete'">
      <i class="el-icon-folder-remove"></i>
      <span>删除</span>
    </div>
    <div class="class-content">
      <div class="name">{{ name }}</div>
      <div>
        <span class="time">{{ time }}</span>
        <span class="author">{{ author }}</span>
      </div>
      <div class="buttom">
        <span class="price">￥{{ price }}</span>
        <span class="follow">{{ followers }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: '',
    name: '',
    time: '',
    author: '',
    price: 0,
    followers: 0,
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
    .time {
      font-size: 12px;
      color: gray;
    }
    .author {
      color: #5fc690;
      font-size: 12px;
    }
    .buttom {
      margin: 10px 0;
      .price {
        font-size: 16px;
        font-weight: 600;
        color: #535353;
      }
      .follow {
        line-height: 20px;
        float: right;
        font-size: 12px;
        color: gray;
      }
    }
  }
}
</style>
