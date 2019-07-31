<template>
<!-- 用户管理页面 -->
  <div class="container">
    
    <!-- 条件筛选 -->
    <section class="filters">
      <el-row>
        <el-col :span="18">&nbsp;</el-col>
        <el-col :span="6">
          <!-- <el-input placeholder="请输入关键字" v-model="params.keyword">
            <el-button slot="append" icon="el-icon-search" @click="getUsers()"></el-button>
          </el-input> -->
        </el-col>
      </el-row>
    </section>
    <!-- /条件筛选 -->

    <!-- 数据表格 -->
    <section class="table-data">
      <el-button size="mini" @click="showAddUserDialog()" type="primary">
        添加程序进程
      </el-button>
      <el-table :data="users">
        <el-table-column prop="programID" label="程序ID" width="100"></el-table-column>
        <el-table-column prop="deltaDiff" label="偏离值" width="120"></el-table-column>
        <el-table-column prop="leverage" label="杠杆" width="120"></el-table-column>
        <el-table-column prop="openPositionBuyA" label="A多仓使能" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.openPositionBuyA=='0'">不开多仓</span>
            <span v-if="scope.row.openPositionBuyA=='1'">可开多仓</span>
          </template>
        </el-table-column>
        <el-table-column prop="openPositionSellA" label="A空仓使能" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.openPositionSellA=='0'">不开空仓</span>
            <span v-if="scope.row.openPositionSellA=='1'">可开空仓</span>
          </template>
        </el-table-column>
        <el-table-column prop="profitRange" label="网格范围" width="120">
          <template slot-scope="scope">
            <span >{{ scope.row.profitRange.s }}-</span>
            <span >{{ scope.row.profitRange.e }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            <!-- 使用全局日期过滤器格式化日期展示 -->
            {{scope.row.createTime|date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="showEditUserDialog(scope.row)" type="primary" size="mini">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button @click="deleteUser(scope.row.id)" type="danger" size="mini">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- /数据表格 -->

    <!-- 分页组件 -->
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
    <!-- /分页组件 -->

<!-- 添加/编辑弹层 -->
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
        <el-form-item prop="programID" label="程序ID:">
          <el-input type="text" v-model="dialog.form.programID"></el-input>
        </el-form-item>
        <el-form-item prop="deltaDiff" label="偏离值:">
          <el-input type="text" v-model="dialog.form.deltaDiff"></el-input>
        </el-form-item>
        <el-form-item prop="leverage" label="杠杆:">
          <el-input type="text" v-model="dialog.form.leverage"></el-input>
        </el-form-item>
        <el-form-item prop="openPositionBuyA" label="A多仓使能:">
          <el-radio-group v-model="dialog.form.openPositionBuyA">
            <el-radio :label="0">不开多仓</el-radio>
            <el-radio :label="1">可开多仓</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="openPositionSellA" label="A空仓使能:">
          <el-radio-group v-model="dialog.form.openPositionSellA">
            <el-radio :label="0">不开空仓</el-radio>
            <el-radio :label="1">可开空仓</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item prop="profitRange" label="网格范围:" >
          <div id="profitRangeWrap" display="flex">
              <div id="div1"><el-input type="text" v-model="dialog.form.profitRange.s"></el-input></div>
              <div id="div3">-</div>
              <div id="div2"><el-input type="text" v-model="dialog.form.profitRange.e"></el-input></div>
          </div>
        </el-form-item>
        <el-form-item prop="remark" label="备注:">
          <el-input type="text" v-model="dialog.form.remark"></el-input>
        </el-form-item>
      </el-form>
      <footer>
        <el-row>
          <el-col :span="12">&nbsp;</el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              :loading="dialog.btnLoading"
              @click="submitDialogForm()"
              class="dialog-btn-submit"
            >提交</el-button>
            <el-button @click="closeDialog()">取消</el-button>
          </el-col>
        </el-row>
      </footer>
    </el-dialog>
    <!-- / 添加/编辑弹层 -->
  </div>
  <!-- /用户管理页面 -->
</template>

<script>
import apis from "../../server/apis";
export default {
  name: "ArbitrageList",
  data() {
    return {
      // 用户列表数据
      users: [],
      // 查询和分页参数
      params: {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0
      },
      // 弹层
      dialog: {
        type: "", // 弹层类型 添加还是编辑
        visible: false, // 是否展示弹层
        btnLoading: false, // 提交表单按钮是否loading
        // 添加用户和编辑用户需要用到的表单字段
        form:{
          programID:"",
          deltaDiff:"",
          leverage:"",
          openPositionBuyA:1,
          openPositionSellA:1,
          profitRange:{
            s:"",
            e:""
          },
          remark:""
        },
        // 表单验证规则
        formRules: {
          programID: [{ required: true, message: "请输入程序ID", trigger: "blur" }],
          deltaDiff: [{ required: true, message: "请输入偏离值", trigger: "blur" }],
          leverage: [{ required: true, message: "请输入杠杆倍数", trigger: "blur" }],
          profitRange: [{ required: true, message: "请输入网格范围上下限", trigger: "blur" }]
        }
      }
    };
  },
  methods: {
    // 根据关键字、分页参数获取用户分页列表
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
    // 分页大小改变事件
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getUsers();
    },
    // 当前页码改变事件
    handleCurrentChange(val) {
      this.params.pageIndex = val;
      this.getUsers();
    },
    // 展示弹层
    showDialog(type) {
      this.dialog.type = type;
      this.dialog.visible = true;
    },
    // 关闭弹层
    closeDialog() {
      // this.$refs['dialogForm'].resetFields();
      this.dialog.type = "";
      this.dialog.btnLoading = false;
      this.dialog.visible = false;
    },
    // 提交弹层中的表单
    async submitDialogForm() {
      this.$refs['dialogForm'].validate(async isValid => {
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
    // 删除数据
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
    // 展示编辑弹层
    showEditUserDialog(row) {
      this.dialog.form = row;
      this.showDialog("edit");
    },
    // 展示添加弹层
    showAddUserDialog(){
      this.showDialog('add');
    }
  },
  async created() {
    await this.getUsers();
  }
};
</script>

<style>
  #profitRangeWrap{
      display: flex;
      justify-content: flex-start;
  }
</style>

