<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="150"/>
      <el-table-column
        prop="name"
        label="游戏名称"
        width="120"/>
      <el-table-column
        prop="province"
        label="游戏类型"
        width="120"/>
      <el-table-column
        prop="englishName"
        label="英文名称"
        width="120"/>
      <el-table-column
        prop="price"
        label="价格"
        width="300"/>
      <el-table-column
        prop="remark"
        label="简介"
        width="120"/>
      <el-table-column
        prop="downloadUrl"
        label="下载链接"
        width="120"/>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
import { getGameList, deleteGame } from '@/api/game'

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
    this.fetchGames()
  },
  methods: {
    fetchGames() {
      this.pageQuery.pageSize = 9
      getGameList(this.pageQuery).then(res => {
        this.pageQuery.total = parseInt(res.content.total)
        this.tableData = res.content.records
      })
    },
    // 翻页
    currentChange(val) {
      this.pageQuery.pageNum = val
      this.fetchGames()
    },
    handleDelete(row) {
      deleteGame(row).then(res => {
        if (res.code === '0') {
          this.$message('删除成功')
          this.fetchUsers()
        }
      })
    }
  }
}
</script>

<style>

</style>
