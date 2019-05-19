<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="150"/>
      <el-table-column
        prop="name"
        label="姓名"
        header-align="center"
        align="center"
        width="300"/>
      <el-table-column
        prop="email"
        label="邮箱"
        header-align="center"
        align="center"
        width="300"/>
      <el-table-column
        prop="address"
        label="地址"
        header-align="center"
        align="center"
        width="300"/>
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pageQuery.total"
      layout="total, prev, pager, next"
      background="#16202D"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import { getUserList, deleteUser, editUser } from '@/api/user'

export default {
  data() {
    return {
      tableData: [],
      pageQuery: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.pageQuery.pageSize = 9
      getUserList(this.pageQuery).then(res => {
        this.pageQuery.total = parseInt(res.content.total)
        this.tableData = res.content.records
      })
    },
    // 翻页
    currentChange(val) {
      this.pageQuery.pageNum = val
      this.fetchUsers()
    },
    deleteUser(row) {
      deleteUser(row).then(res => {
        if (res.code === '0') {
          this.$message('删除成功')
          this.fetchUsers()
        }
      })
    },
    // 编辑
    edit(row) {
      editUser(row)
    }
  }
}
</script>

<style>

</style>
