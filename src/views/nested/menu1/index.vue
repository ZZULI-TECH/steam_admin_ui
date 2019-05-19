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
        prop="orderSn"
        label="流水号"
        width="350"/>
      <el-table-column
        prop="uid"
        label="用户id"
        width="300"/>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="120"/>
      <!--TODO 字改为选择框改变订单状态-->
      <el-table-column
        prop="payCode"
        label="支付号"
        width="350"/>
      <el-table-column
        prop="payName"
        label="支付方式名称"
        width="120"/>
      <el-table-column
        prop="orderAmount"
        label="应付款金额"
        width="120"/>
      <el-table-column
        prop="totalAmount"
        label="实付款"
        width="120"/>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
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
import { getOrderList, deleteOrder } from '@/api/order'

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
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      this.pageQuery.pageSize = 9
      getOrderList(this.pageQuery).then(res => {
        this.pageQuery.total = parseInt(res.content.total)
        const data = res.content.records
        data.map(item => {
          if (item.orderStatus === 1) {
            item.orderStatus = '订单生成'
          } else if (item.orderStatus === 2) {
            item.orderStatus = '等待发货'
          } else if (item.orderStatus === 3) {
            item.orderStatus = '已发货'
          } else if (item.orderStatus === 4) {
            item.orderStatus = '已完成'
          } else if (item.orderStatus === 4) {
            item.orderStatus = '取消订单'
          }
        })
        this.tableData = data
      })
    },
    // 翻页
    currentChange(val) {
      this.pageQuery.pageNum = val
      this.fetchOrders()
    },
    handleDelete(row) {
      deleteOrder(row).then(res => {
        if (res.code === '0') {
          this.$message('删除成功')
          this.fetchOrders()
        }
      })
    }
  }
}
</script>

<style>

</style>
