<template>
  <div>
    <div class="nav">
      <navigator active="class-manage" />
    </div>
    <el-row>
      <el-col :span="5">
        <div class="grid-content">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="selectMenu"
            active-text-color="#5fc690"
          >
            <el-menu-item index="1">
              <i class="el-icon-s-management"></i>
              <span>课程管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-s-data"></i>
              <span>考试管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-mouse"></i>
              <span>实验管理</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="content-right-top">
          <div class="chart">
            <div class="pie" id="pie"></div>
            <div class="scatter" id="scatter"></div>
          </div>
          <div class="user-info">
            <div class="center" @click="myProfile">
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              <div class="name">{{ isLogin ? user.username : '请登录' }}</div>
            </div>
            <el-button round class="my-class-button" @click="add">
              <i class="el-icon-folder-add"></i>
              {{ optionMenu[index].add }}
            </el-button>
            <el-button round class="my-class-button" @click="edit">
              <i class="el-icon-edit-outline"></i>
              {{ optionMenu[index].edit }}
            </el-button>
            <el-button round class="my-class-button" @click="delet">
              <i class="el-icon-folder-remove"></i>
              {{ optionMenu[index].delete }}
            </el-button>
            <span class="cancel" v-if="showCancel === true" @click="cancel"
              >取消</span
            >
          </div>
        </div>
        <div class="class-satisfy">
          <i class="el-icon-d-arrow-right title">{{ title }}</i>
          <div class="list">
            <div class="class-info" v-for="item in classList" :key="item.id">
              <classpanel
                :type="type"
                :name="item.name"
                :time="item.time"
                :author="item.author"
                :price="item.price"
                :followers="item.followers"
              />
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :total="50"
            class="pagination"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';
import Classpanel from '@/components/classpanel';
import * as echarts from 'echarts';

export default {
  components: {
    Navigator,
    Classpanel,
  },
  data() {
    return {
      user: this.$store.state.user.user,
      isLogin: this.$store.state.user.isLogin,
      title: '课程管理',
      type: '',
      showCancel: false,
      index: 1,
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
      classList: [
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
        {
          img: '@/assets/images/class.jpg',
          name: '高等数学',
          time: '2020-03-30',
          author: 'Surman',
          price: 100,
          followers: 1000,
        },
      ],
      pieData: [
        {
          value: 335,
          name: '已发布',
        },
        {
          value: 148,
          name: '已拒绝',
        },
        {
          value: 188,
          name: '审核中',
        },
      ],
    };
  },
  methods: {
    selectMenu(index) {
      this.title = this.optionMenu[index].title;
      this.index = index;
      this.initPieChart();
      this.initScatterChart();
    },
    myProfile() {
      if (!this.isLogin) {
        this.$router.push('/login');
      } else {
        this.$router.push(`/profile/${this.user.job}/${this.user.id}`);
      }
    },
    initPieChart() {
      let myChart = echarts.init(document.getElementById('pie'));
      let option = {
        title: {
          text: this.optionMenu[this.index].pie,
          left: '10px',
          top: '10px',
        },
        color: ['#91cc75', '#5470c6', '#ee6666', '#fac858'],
        legend: {
          orient: 'vertical',
          y: 'middle',
          left: '60%',
          formatter: (name) => {
            let _name = name;
            let item = this.pieData.filter((item) => item.name === name);
            return `{name|${_name}}{item|${
              typeof item[0]['value'] !== 'undefined'
                ? item[0]['value'] + '个'
                : '-'
            }}`;
          },
          textStyle: {
            rich: {
              name: {
                width: 45,
              },
              item: {
                width: 35,
              },
            },
          },
        },
        series: [
          {
            type: 'pie',
            data: this.pieData,
            radius: ['40%', '50%'],
            center: ['30%', '50%'],
            label: {
              show: false,
              position: 'center',
              emphasis: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    initScatterChart() {
      let myChart = echarts.init(document.getElementById('scatter'));
      let option = {
        title: {
          text: '浏览人数',
          left: '10px',
          top: '10px',
        },
        xAxis: {
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        yAxis: {},
        series: [
          {
            type: 'scatter',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      };
      myChart.setOption(option);
    },
    add() {
      this.$router.push(`/add`);
    },
    edit() {
      this.type = 'edit';
      this.showCancel = true;
    },
    delet() {
      this.showCancel = true;
      this.type = 'delete';
    },
    cancel() {
      this.showCancel = false;
      this.type = '';
    },
    loadData(){
    }
  },
  mounted() {
    this.initPieChart();
    this.initScatterChart();
  },
};
</script>

<style lang="less" scoped>
.nav {
  top: 0;
  padding: 0 25px;
  margin-bottom: 10px;
}
/deep/.el-menu-vertical-demo {
  height: calc(100vh - 60px);
  border: 0;
}
.content-right-top {
  display: flex;
  margin: 0 10px;
  .chart {
    width: 750px;
    height: 314px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid grey;
    display: flex;
    padding-top: 10px;
    box-sizing: border-box;
    .pie {
      padding: 0 10px;
      flex: 1;
    }
    .scatter {
      padding: 0 10px;
      flex: 1;
    }
  }
  .user-info {
    position: relative;
    width: 200px;
    margin-left: 10px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 1px 1px 10px #ccc;
    .center {
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #5fc690;
      }
      .name {
        margin-top: 5px;
      }
    }
    .my-class-button {
      display: block;
      width: 170px;
      background-color: #5fc690;
      border: 0;
      color: #fff;
      margin: 16px auto;
      &:hover {
        background-color: #54b181;
      }
    }
    .cancel {
      font-size: 14px;
      color: grey;
      text-decoration: underline;
      cursor: pointer;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.class-satisfy {
  margin: 20px 10px;
  .title {
    font-style: 18px;
    font-weight: 600;
    color: rgb(82, 82, 82);
    margin-bottom: 20px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 30px;
  }
  .pagination {
    text-align: right;
    background: none !important;
    padding-bottom: 30px;
    /deep/.el-pager li.active {
      color: #5fc690;
    }
  }
}
</style>
