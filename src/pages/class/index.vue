<template>
  <div>
    <div class="nav">
      <navigator active="class" />
    </div>
    <el-row>
      <el-col :span="5">
        <div class="grid-content">
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @select="selectMenu"
            active-text-color="#5fc690"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-collection"></i>
                <span>计算机</span>
              </template>
              <el-menu-item index="1-1">计算机网络</el-menu-item>
              <el-menu-item index="1-2">数据库</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-collection"></i>
              <span slot="title">外国语</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-collection"></i>
                <span>理学</span>
              </template>
              <el-menu-item index="3-1">数学</el-menu-item>
              <el-menu-item index="3-2">物理</el-menu-item>
              <el-menu-item index="3-3">线性代数</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-collection"></i>
                <span>政治</span>
              </template>
              <el-menu-item index="4-1">马克思主义</el-menu-item>
              <el-menu-item index="4-2">毛泽东概论</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="content-right-top">
          <div class="banner">
            <el-carousel trigger="click" height="300px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="banner-content">
                  <img
                    src="@/assets/images/banner.png"
                    alt=""
                    class="banner-img"
                  />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="user-info">
            <div class="center" @click="myProfile">
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              <div class="name">{{ isLogin ? user.username : '请登录' }}</div>
            </div>
            <div class="my-class">
              <div v-for="item in navList" :key="item.id" class="class-name">
                {{ item.class }}
              </div>
            </div>
            <el-button round class="my-class-button" @click="myProfile"
              >我的课程</el-button
            >
          </div>
        </div>
        <div class="class-satisfy">
          <i class="el-icon-d-arrow-right title"> 计算机网络</i>
          <div class="list">
            <div class="class-info" v-for="item in classList" :key="item.id">
              <classpanel
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

export default {
  components: {
    Navigator,
    Classpanel,
  },
  data() {
    return {
      user: this.$store.state.user.user,
      isLogin: this.$store.state.user.isLogin,
      navList: [
        {
          id: 1,
          class: '计算机网络',
        },
        {
          id: 2,
          class: '数据库',
        },
        {
          id: 3,
          class: '数据结构',
        },
      ],
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
    };
  },
  methods: {
    myProfile() {
      if (!this.isLogin) {
        this.$router.push('/login');
      } else {
        this.$router.push(`/profile/${this.user.job}/${this.user.id}`);
      }
    },
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
  margin-left: 10px;
  .banner {
    width: 750px;
    border-radius: 10px;
    overflow: hidden;
    .banner-img {
      flex: 8;
      width: 750px;
      object-fit: cover;
    }
  }
  .user-info {
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
    .my-class {
      margin-top: 30px;
      .class-name {
        margin: 10px 20px;
        color: #666;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #5fc690;
        }
      }
    }
    .my-class-button {
      display: block;
      width: 180px;
      background-color: #5fc690;
      border: 0;
      color: #fff;
      margin: 20px auto;
      &:hover {
        background-color: #54b181;
      }
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
    cursor: pointer;
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
