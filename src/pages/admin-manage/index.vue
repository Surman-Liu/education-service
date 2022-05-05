<template>
  <div>
    <div class="nav">
      <navigator active="class-manage" />
    </div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">老师管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';

export default {
  components: {
    Navigator,
  },
  data() {
    return {
      router: {
        1: 'student-manage',
        2: 'teacher-manage',
        3: 'manager-manage',
      },
    };
  },
  methods: {
    handleSelect(index) {
      this.$router.push(`/admin-manage/${this.router[index]}`);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-main {
  padding: 10px 20px 0px 20px;
}
.nav {
  top: 0;
  padding: 0 25px;
  margin-bottom: 10px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
