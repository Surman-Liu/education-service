<template>
  <div class="teacher-page">
    <navigator active="teacher" />
    <div class="teacher-content">
      <div class="filter-block">
        <div class="filter-text">Teacher Filter</div>
        <div class="selector">
          <div class="selector-title">SCHOOL</div>
          <el-input
            placeholder="请输入学校"
            suffix-icon="el-icon-search"
            v-model="school"
          >
          </el-input>
        </div>
        <div class="selector">
          <div class="selector-title">SUBJECT</div>
          <el-input
            placeholder="请输入课程名"
            suffix-icon="el-icon-search"
            v-model="subjectName"
          >
          </el-input>
        </div>
        <div class="selector">
          <div class="selector-title">NAME</div>
          <el-input
            placeholder="请输入老师姓名"
            suffix-icon="el-icon-search"
            v-model="teacherName"
          >
          </el-input>
        </div>
      </div>
      <div class="teacher-list">
        <div class="match-count">{{ matchNum }} MATCHES</div>
        <div class="teacher-satisfy">
          <div
            class="teacher"
            v-for="item in teacherList"
            :key="item.id"
            @click="goToProfile(item.id)"
          >
            <img :src="item.img" alt="" class="portrait" />
            <div class="teacher-name">
              {{ item.name }}
              <span class="teacher-description">{{ item.description }}</span>
            </div>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          class="pagination"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/navigator';
import Img from '@/assets/images/touxiang.jpg';

export default {
  components: {
    Navigator,
  },
  data() {
    return {
      school: '',
      subjectName: '',
      teacherName: '',
      matchNum: 0,
      Img,
      teacherList: [
        {
          id: 1,
          name: 'Sur',
          description: ' im a good teacher!!! please pick me!',
          img: Img,
        },
        {
          id: 2,
          name: 'Sur',
          description: ' im a good teacher!!! please pick me!',
          img: Img,
        },
        {
          id: 3,
          name: 'Sur',
          description: ' im a good teacher!!! please pick me!',
          img: Img,
        },
        {
          id: 3,
          name: 'Sur',
          description: ' im a good teacher!!! please pick me!',
          img: Img,
        },
        {
          id: 3,
          name: 'Sur',
          description: ' im a good teacher!!! please pick me!',
          img: Img,
        },
        {
          id: 3,
          name: 'Sur',
          description:
            ' im a good teacher!!! please pick me!aaaaaaaaaaaaaaaaaaaaaaaaaa',
          img: Img,
        },
        {
          id: 3,
          name: 'Sur',
          description:
            ' im a good teacher!!! please pick me!aaaaaaaaaaaaaaaaaaaaaaaaaa',
          img: Img,
        },
      ],
    };
  },
  methods: {
    goToProfile(id) {
      // this.$router.push(`/profile/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.teacher-page {
  padding: 0 35px;
}
.teacher-content {
  height: calc(100% - 60px);
  display: flex;
  margin-top: 10px;
  .filter-block {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 20px;
    border: 2px solid rgb(182, 182, 182);
    border-radius: 5px;
    &:hover {
      border: 2px solid #ffdf80;
      .filter-text {
        color: #ffdf80;
      }
      .selector {
        /deep/.el-input__inner {
          border: 2px solid #ffdf80;
        }
      }
    }
    .filter-text {
      font-weight: 600;
      color: rgb(109, 109, 109);
      margin-bottom: 10px;
      font-size: 18px;
    }
    .selector {
      margin: 30px 0;
      .selector-title {
        font-weight: 600;
        color: #5fc690;
        margin-bottom: 10px;
      }
      /deep/.el-select__input {
        color: #005c3a;
      }
      /deep/.el-input__inner {
        border: 2px solid rgb(182, 182, 182);
      }
      &:hover {
        .selector-title {
          color: #ff9595;
        }
      }
    }
  }
  .teacher-list {
    margin-left: 10px;
    width: calc(100% - 210px);
    padding: 20px;
    border: 2px solid rgb(182, 182, 182);
    border-radius: 5px;
    &:hover {
      border: 2px solid #ffdf80;
      .match-count {
        color: #ffdf80;
      }
    }
    .match-count {
      font-weight: 600;
      font-size: 18px;
      color: rgb(109, 109, 109);
    }
    .teacher-satisfy {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 15px;
      .teacher {
        margin: 20px 16px;
        cursor: pointer;
        border-radius: 20px;
        box-shadow: 1px 1px 10px #ddd;
        &:hover {
          .teacher-name {
            margin-top: -150px;
            height: 150px;
          }
        }
        .portrait {
          width: 150px;
          height: 150px;
          vertical-align: middle;
        }
        .teacher-name {
          position: relative;
          z-index: 999;
          margin-top: -30px;
          width: 150px;
          height: 30px;
          background-color: #ffdf80;
          color: #fff;
          text-align: center;
          line-height: 30px;
          transition: all 1s;
          overflow: hidden;
          .teacher-description {
            line-height: 21px;
            padding: 0 10px;
            display: block;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .pagination {
    text-align: right;
    /deep/.el-pager li.active {
      color: #ffdf80;
    }
  }
}
</style>
