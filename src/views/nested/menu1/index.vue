<template>
  <div style="margin: 20px 20px">

    选择状态：
    <el-select v-model="pageQuery.orderStatus" placeholder="请选择" clearable @change="fetchOrders">
      <el-option
        v-for="item in orderStatus"
        :key="item.id"
        :label="item.name"
        :value="item.id"/>
    </el-select>

    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 30px">
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
        width="200"/>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="220">
        <template slot-scope="scope">
          <el-select v-model="scope.row.orderStatus" clearable="true" placeholder="请选择" @change="pickState(scope.row)">
            <el-option
              v-for="item in orderStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </template>
      </el-table-column>
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
import { getOrderList, deleteOrder, update } from '@/api/order'

export default {
  data() {
    return {
      tableData: [],
      pageQuery: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        orderStatus: null
      },
      orderStatus: [
        {
          id: 1,
          name: '等待发货'
        },
        {
          id: 2,
          name: '等待发货'
        },
        {
          id: 3,
          name: '已发货'
        },
        {
          id: 4,
          name: '已完成'
        },
        {
          id: 5,
          name: '取消订单'
        }
      ]
    }
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      getOrderList(this.pageQuery).then(res => {
        this.pageQuery.total = parseInt(res.content.total)
        const data = res.content.records
        this.tableData = data
      })
    },
    // 更改订单状态
    pickState(row) {
      update(row).then(res => {
        this.$message('更新成功')
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
