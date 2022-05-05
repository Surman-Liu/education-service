<template>
  <div>
    <div class="toobar">
      <div class="button">
        <el-button type="primary" plain>批量删除</el-button>
      </div>
      <div class="search">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" circle @click="search"></el-button>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="id" label="用户ID" width="100"> </el-table-column>
      <el-table-column prop="realname" label="真实姓名" width="130">
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            :content="`简介：${scope.row.introduce || '无'}`"
            placement="top-start"
          >
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <div
            id="btn"
            class="btn"
            :data-clipboard-text="scope.row.phone"
            @click="copy"
          >
            <i class="el-icon-phone-outline"></i>
            <el-tooltip effect="dark" content="点击复制" placement="top-start">
              <span id="phone">{{ scope.row.phone }}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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
import Clipboard from 'clipboard';
export default {
  data() {
    return {
      pageNum: 1,
      pageTotal: '',
      input: '',
      tableData: [],
    };
  },
  methods: {
    loadData() {
      this.$axios
        .get('/api/student/student-all', {
          params: {
            page: this.pageNum,
            pageSize: 8,
          },
        })
        .then((res) => {
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
    copy() {
      var clipboard = new Clipboard('#btn');
      clipboard.on('success', (e) => {
        this.$message.success('复制成功！');
        clipboard.destroy();
      });
      clipboard.on('error', (e) => {
        this.$message.error('复制失败，请手动复制！');
        clipboard.destroy();
      });
    },
    search() {
      let params = {
        input: this.input,
        page: this.pageNum,
        pageSize: 8,
      };
      this.$axios.post('/api/student/search', params).then((res) => {
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
  },
  beforeMount() {
    this.loadData();
    this.clipboard();
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