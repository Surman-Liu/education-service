<template>
  <div class="profile-page">
    <div class="nav">
      <navigator />
    </div>
    <div class="profile-content">
      <div class="img">
        <img src="@/assets/images/profile-bg.jpg" alt="" class="bg-img" />
      </div>
      <div class="basic-info">
        <img :src="user.touxiang || circleUrl" alt="" class="touxiang" />
        <div class="name">{{ user.username || '游客' }}</div>
        <div class="subject">{{ user.words || 'secret subject' }}</div>
        <div class="description">{{ user.introduce || '这个人很神秘' }}</div>
        <span
          class="edit"
          @click="
            showEdit = false;
            showEdit = true;
          "
          v-if="allowEdit"
        >
          编辑
          <i class="el-icon-edit"></i>
        </span>
        <settings :show="showEdit" :job="job" />
      </div>
      <div class="basic-data">
        <div class="data-content">
          <div class="data-items">
            <div
              :class="{ 'data-item': true, active: index === 1 ? true : false }"
              @click="handleClick(1)"
            >
              <div class="num">{{ classNum }}</div>
              <div class="text">课程</div>
            </div>
            <div
              :class="{ 'data-item': true, active: index === 2 ? true : false }"
              @click="handleClick(2)"
            >
              <div class="num">{{ examNum }}</div>
              <div class="text">考试</div>
            </div>
            <div
              :class="{ 'data-item': true, active: index === 3 ? true : false }"
              @click="handleClick(3)"
            >
              <div class="num">{{ trailNum }}</div>
              <div class="text">实验</div>
            </div>
          </div>
        </div>
      </div>
      <div class="class-list">
        <div class="center">
          <div class="toolbar">
            <div class="title">{{ title }}</div>
          </div>
          <div class="list" v-if="classList.length !== 0">
            <div class="class-info" v-for="item in classList" :key="item.id">
              <classpanel
                :type="type"
                :id="item.id"
                :name="item.class_name"
                :time="item.create_time"
                :author="item.teacher_name"
                :price="item.money"
                :status="item.status"
                :poster="item.poster"
              />
            </div>
          </div>
          <el-empty v-else description="内容为空哦~"></el-empty>
          <el-pagination
            layout="prev, pager, next"
            :total="pageTotal"
            class="pagination"
            :page-size="8"
            :current-page="pageNum"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';
import Classpanel from '@/components/classpanel';
import Settings from './components/setting.vue';

export default {
  components: {
    Navigator,
    Classpanel,
    Settings,
  },
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      showEdit: false,
      showMore: false,
      sortOrder: 0,
      index: 1,
      title: '我的课程',
      user: {},
      allowEdit: false,
      id: this.$route.params.id,
      job: this.$route.params.job,
      pageNum: 1,
      pageTotal: 0,
      classList: [],
      indexOption: {
        1: '我的课程',
        2: '我的考试',
        3: '我的实验',
      },
      classNum: 0,
      examNum: 0,
      trailNum: 0,
    };
  },
  methods: {
    handleClick(index) {
      this.index = index;
      this.title = this.indexOption[index];
      this.loadData();
    },
    pageChange(page) {
      this.pageNum = page;
      this.loadData();
    },
    loadData() {
      if (!this.user.id) {
        this.$message({
          message: '请登录',
          type: 'warning',
        });
      }
      let params = {
        class_type: this.index,
        page: this.pageNum,
        pageSize: 8,
      };
      let url = '';
      if (this.user.job == 1) {
        // 教师
        params.teacher_id = this.user.id;
        url = '/api/class/searchClass';
      } else if (this.user.job == 0) {
        // 学生
        params.student_id = this.user.id;
        url = 'api/student/selectedClass';
      } else {
        return;
      }
      this.$axios.post(url, params).then((res) => {
        if (res.data.code === 'SUCCESS') {
          this.pageTotal = res.data.data.total;
          this.classList = res.data.data.content;
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
    },
    loadClassCount() {
      let params = {};
      let url = '';
      if (this.user.job == 1) {
        // 教师
        params.teacher_id = this.user.id;
        url = '/api/class/typeCount';
      } else if (this.user.job == 0) {
        // 学生
        params.student_id = this.user.id;
        url = '/api/student/typeCount';
      } else {
        return;
      }
      this.$axios
        .get(url, {
          params,
        })
        .then((res) => {
          if (res.data.code === 'SUCCESS') {
            let data = res.data.data;
            this.classNum = data.classes;
            this.examNum = data.exam;
            this.trailNum = data.trail;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        });
    },
  },
  beforeMount() {
    this.user = this.$localStorage.getItem('user');
    this.allowEdit = this.id == this.user.id && this.job == this.user.job;
    this.loadClassCount();
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.profile-page {
  .nav {
    padding: 0 25px;
  }
  .img {
    padding: 0 25px;
    margin-top: 10px;
    .bg-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
  .basic-info {
    padding: 0 25px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .touxiang {
      cursor: pointer;
      margin-top: -60px;
      width: 120px;
      height: 120px;
      border-radius: 60px;
      border: 2px solid #fff;
    }
    .name {
      font-weight: 800;
      font-size: 20px;
      color: rgb(14, 13, 13);
    }
    .subject {
      font-weight: 300;
      font-size: 12px;
      color: grey;
      margin-top: 2px;
      width: 400px;
      text-align: center;
    }
    .description {
      font-weight: 500;
      font-size: 15px;
      color: rgb(14, 13, 13);
      margin-top: 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      width: 500px;
      text-align: center;
    }
    .edit {
      font-weight: 300;
      font-size: 13px;
      color: grey;
      position: absolute;
      right: 156px;
      bottom: 0px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .basic-data {
    display: flex;
    margin-top: 20px;
    padding: 10px 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .data-content {
      width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .data-items {
        display: flex;
        .data-item {
          padding: 10px;
          width: 50px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 50px;
          border: 1px solid transparent;
          &:hover {
            border: 1px solid #5fc690;
          }
          .num {
            font-weight: 600;
            font-size: 18px;
            line-height: 20px;
            color: #5fc690;
          }
          .text {
            margin-top: 10px;
            color: grey;
          }
        }
        .active {
          border: 1px solid #5fc690;
          background-color: #cef7e2;
        }
      }
    }
    .manage-button {
      margin: auto 0;
      height: 50px;
      width: 90px;
      border: 2px solid #5fc690;
      color: #5fc690;
    }
  }
  .class-list {
    background-color: #f0f2f3;
    .center {
      margin: auto;
      width: 1000px;
      .toolbar {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        .title {
          font-weight: 600;
          font-size: 18px;
          color: #0c0c2d;
          line-height: 40px;
        }
        .sort {
          font-size: 14px;
          color: grey;
        }
        .sort-selector {
          width: 120px;
          /deep/.el-input__inner {
            border: none;
            background-color: #f0f2f3;
          }
        }
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 30px;
        .class-info {
          margin-right: 20px;
        }
      }
      .pagination {
        text-align: right;
        background: none !important;
        padding-bottom: 30px;
        /deep/.el-pager li.active {
          color: #5fc690;
        }
        /deep/.btn-next,
        /deep/.btn-prev {
          background-color: #f0f2f3 !important;
        }

        /deep/.el-pager li {
          background: #f0f2f3;
        }
      }
    }
  }
}
</style>
