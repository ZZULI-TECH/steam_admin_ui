<template>
  <div style="padding:30px;">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          {{ props.row.msg }}
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/msg'
export default {
  data() {
    return {
      tableData: [],
      page: {
        total: null,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList(this.page.pageNum, this.page.pageSize).then(res => {
        this.tableData = res.content.records
        this.page.total = res.content.total
      })
    }
  }
}
</script>
