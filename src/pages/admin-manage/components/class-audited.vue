<template>
  <div>
    <div class="toobar">
      <div class="search">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" circle @click="search"></el-button>
      </div>
      <div class="selector">
        <el-select
          v-model="classType"
          placeholder="课程类型"
          @change="handleChange"
          clearable
        >
          <el-option
            v-for="item in classTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="classStatus"
          placeholder="课程状态"
          @change="handleChange"
          clearable
        >
          <el-option
            v-for="item in classStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="id" label="课程ID" width="100"> </el-table-column>
      <el-table-column label="课程名">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            :content="`简介：${scope.row.description || '无'}`"
            placement="top-start"
          >
            <el-tag type="info" size="medium">{{
              scope.row.class_name
            }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="授课人">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            :content="`老师id：${scope.row.teacher_id || '无'}`"
            placement="top-start"
          >
            <el-tag type="info" size="medium">{{
              scope.row.teacher_name
            }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="100">
      </el-table-column>
      <el-table-column prop="money" label="课程售价" width="100">
      </el-table-column>
      <el-table-column label="课程类型" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.class_type == 1">
            {{ typeText[scope.row.class_type] }}
          </el-tag>
          <el-tag v-if="scope.row.class_type != 1" type="warning">
            {{ typeText[scope.row.class_type] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="课程状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">已发布</el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      pageTotal: '',
      input: '',
      tableData: [],
      classType: '',
      classStatus: '',
      classTypeOptions: [
        {
          value: '1',
          label: '课程',
        },
        {
          value: '2',
          label: '考试',
        },
        {
          value: '3',
          label: '实验',
        },
      ],
      classStatusOptions: [
        {
          value: '1',
          label: '已发布',
        },
        {
          value: '3',
          label: '已拒绝',
        },
      ],
      typeText: {
        1: '课程',
        2: '考试',
        3: '实验',
      },
    };
  },
  methods: {
    loadData() {
      let params = {
        page: this.pageNum,
        pageSize: 8,
        input: this.input,
        status: this.classStatus,
        class_type: this.classType,
      };
      this.$axios.post('/api/class/class-audited', params).then((res) => {
        if (res.data.code === 'SUCCESS') {
          let data = res.data.data;
          this.pageTotal = data.total;
          this.tableData = data.content;
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
    },
    pageChange(page) {
      this.pageNum = page;
      this.loadData();
    },
    search() {
      this.loadData();
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$axios
          .get('/api/class/delete', {
            params: {
              id,
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
    handleChange() {
      this.loadData();
    },
  },
  beforeMount() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table__cell {
  padding: 6px 0;
}
.toobar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  .search {
    display: flex;
    /deep/.el-button {
      border: none;
    }
  }
}
.btn {
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>