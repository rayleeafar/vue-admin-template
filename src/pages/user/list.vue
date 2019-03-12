<template>
  <div class="container">
    <section class="filters">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入关键字" v-model="params.keyword">
            <el-button slot="append" icon="el-icon-search" @click="getUsers()"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </section>
    <section class="table-data">
      <el-table :data="users">
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="200"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="200"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column label="注册时间" width="230">
          <template slot-scope="scope">
            <!-- 使用全局日期过滤器格式化日期展示 -->
            {{scope.row.createTime|date}}
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="pager">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageIndex"
        :page-sizes="[5, 10, 15, 30]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="params.totalCount"
      ></el-pagination>
    </section>
  </div>
</template>

<style scoped>
</style>
<script>
import apis from "../../server/apis";
export default {
  name: "UserList",
  data() {
    return {
      users: [],
      params: {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0
      }
    };
  },
  methods: {
    async getUsers() {
      let list = (await this.$ajax({
        url: apis.userManage.list,
        type: "GET",
        params:Object.assign({},this.params) 
      })).data;
      this.users = list.data;
      this.params.pageIndex = list.pageIndex;
      this.params.pageSize = list.pageSize;
      this.params.totalCount = list.totalCount;
    },
    handleSizeChange(val){
        this.params.pageSize= val;
        this.getUsers();
    },
    handleCurrentChange(val){
        this.params.pageIndex = val;
        this.getUsers();
    }
  },
  async created() {
    await this.getUsers();
  }
};
</script>
