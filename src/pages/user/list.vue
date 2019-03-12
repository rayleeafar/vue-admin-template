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
      <el-button @click="showDialog('add')">
        <i class="el-icon-plus"></i>添加用户
      </el-button>
      <el-table :data="users">
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="160"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column label="注册时间" width="180">
          <template slot-scope="scope">
            <!-- 使用全局日期过滤器格式化日期展示 -->
            {{scope.row.createTime|date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="primary" size="mini">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button @click="deleteUser(scope.row.id)" type="danger" size="mini">
              <i class="el-icon-delete"></i>
            </el-button>
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

    <el-dialog
      :modal="true"
      :visible="dialog.visible"
      :title="dialog.type=='add'?'添加':'编辑'"
      :before-close="closeDialog"
      :append-to-body="false"
      :modal-append-to-body="false"
      width="30%"
    >
      <el-form :model="dialog.form" :rules="dialog.formRules" ref="dialogForm">
        <el-form-item prop="userName" label="用户名">
          <el-input type="text" v-model="dialog.form.userName"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
          <el-input type="number" v-model="dialog.form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input type="email" v-model="dialog.form.email"></el-input>
        </el-form-item>
      </el-form>
      <footer>
        <el-row>
          <el-col :span="12">&nbsp;</el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              :loading="dialog.btnLoading"
              @click="submitDialogForm('dialogForm')"
              class="dialog-btn-submit"
            >提交</el-button>
            <el-button @click="closeDialog()">取消</el-button>
          </el-col>
        </el-row>
      </footer>
    </el-dialog>
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
      },
      dialog: {
        type: "",
        visible: false,
        btnLoading: false,
        form: {
          id: "",
          userName: "",
          email: "",
          phone: ""
        },
        formRules: {
          userName: [
            { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
          phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
        }
      }
    };
  },
  methods: {
    async getUsers() {
      let list = (await this.$ajax({
        url: apis.userManage.list,
        type: "GET",
        params: Object.assign({}, this.params)
      })).data;
      this.users = list.data;
      this.params.pageIndex = list.pageIndex;
      this.params.pageSize = list.pageSize;
      this.params.totalCount = list.totalCount;
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.params.pageIndex = val;
      this.getUsers();
    },
    showDialog(type) {
      this.dialog.type = type;
      this.dialog.visible = true;
    },
    closeDialog() {
      this.dialog.type = "";
      this.dialog.form = {
        userName: "",
        email: "",
        phone: ""
      };
      this.dialog.btnLoading = false;
      this.dialog.visible = false;
    },
    async submitDialogForm(form) {
      this.$refs[form].validate(async isValid => {
        if (isValid) {
          this.dialog.btnLoading = true;
          try {
            let res = await this.$ajax({
              url:
                this.dialog.type == "add"
                  ? apis.userManage.add
                  : apis.userManage.edit,
              params: Object.assign({}, this.dialog.form),
              type: "POST"
            });
            this.$message({
              message: "操作成功",
              center: true
            });
            this.getUsers();
          } catch (err) {
            console.log(err);
          } finally {
            this.closeDialog();
          }
        }
      });
    },
    async deleteUser(id) {
      const h = this.$createElement;
      await this.$msgbox({
        title: "警告",
        message: h("p", "确定要删除吗？", []),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";
            await this.$ajax({
              url: apis.userManage.delete,
              type: "POST",
              params: { id: id }
            });
            instance.confirmButtonLoading = false;
            done();
          } else {
            done();
          }
        }
      });
      this.$message({
        message: "删除成功",
        center: true
      });
      this.getUsers();
    },
    editUser(row) {
      this.dialog.form = row;
      this.showDialog("edit");
    }
  },
  async created() {
    await this.getUsers();
  }
};
</script>
