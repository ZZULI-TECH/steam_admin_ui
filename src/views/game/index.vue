<template>
  <div style="margin-left: 20px;margin-top: 20px">
    <el-input v-model="pageQuery.name" placeholder="输入游戏名搜索" style="width: 300px;margin-top: 30px;margin-right: 20px;margin-bottom: 20px"/>
    <el-button type="success" @click="search">搜索</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        fixed
        width="150"/>
      <el-table-column
        prop="name"
        label="游戏名称"
        fixed
        width="120"/>
      <el-table-column
        prop="englishName"
        label="英文名称"
        width="200"/>
      <el-table-column
        prop="price"
        label="价格"
        width="100"/>
      <el-table-column
        prop="remark"
        label="简介"
        width="600"/>
      <el-table-column
        prop="downloadUrl"
        label="下载链接"/>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="handleAddImgClick(scope.row)">上传图片</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pageQuery.total"
      layout="total, prev, pager, next"
      background="#16202D"
      @current-change="currentChange"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      width="700px"
      style="height: 1000px">
      <el-form ref="form" :model="form" label-width="80px" style="width: 80%; margin-top: 20px">
        <el-form-item label="游戏名称">
          <el-input v-model="form.name" disabled/>
        </el-form-item>
        <el-form-item label="游戏类型">
          <el-select v-model="form.type" placeholder="请选择游戏类型" disabled>
            <el-option :value= "type1" label="数字游戏"/>
            <el-option :value= "type2" label="实体游戏"/>
          </el-select>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="form.englishName"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"/>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="form.keywords"/>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.remark"/>
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input v-model="form.content"/>
        </el-form-item>
        <el-form-item label="下载链接">
          <el-input v-model="form.downloadUrl"/>
        </el-form-item>
        <el-form-item label="封面" style="width: 60%">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="/api/file/image">
            <img v-if="form.cover" :src="form.cover" width="300px" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">更新</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="imgDialogVisible"
      width="700px"
      style="height: 1000px">
      <div>
        <el-image v-for="url in imgUrls" :key="url" :src="url" lazy/>
        <el-upload
          :on-preview="handlePictureCardPreview"
          :on-remove="handlePictureRemove"
          :on-success="handlePictureSuccess"
          action="/api/file/image"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="prevDialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getGameList, deleteGame, update, get } from '@/api/game'
import { saveGameImage } from '@/api/gameimage'

export default {
  data() {
    return {
      tableData: [],
      pageQuery: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        name: ''
      },
      type1: 1,
      type2: 2,
      dialogVisible: false,
      imgDialogVisible: false,
      prevDialogVisible: false,
      dialogImageUrl: '',
      imgUrls: [],
      currentGame: {},
      form: {
        id: '',
        name: '',
        type: 1,
        englishName: '',
        price: 0,
        cover: '',
        keywords: '',
        remark: '',
        content: '',
        downloadUrl: ''
      }
    }
  },
  created() {
    this.fetchGames()
  },
  methods: {
    search() {
      getGameList(this.pageQuery).then(res => {
        this.pageQuery.total = parseInt(res.content.total)
        const data = res.content.records
        this.tableData = data
      })
    },
    fetchGames() {
      getGameList(this.pageQuery).then(res => {
        this.pageQuery.total = parseInt(res.content.total)
        const data = res.content.records
        this.tableData = data
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
    },
    handleClick(row) {
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    onSubmit() {
      update(this.form).then(res => {
        this.dialogVisible = false
        this.$message('更新成功')
      })
    },
    handleAddImgClick(row) {
      get(row.id).then(res => {
        const data = res.content
        if (data) {
          this.currentGame = data
          this.imgUrls = data.images
        }
      })
      this.imgDialogVisible = true
    },
    handlePictureRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.prevDialogVisible = true
    },
    handlePictureSuccess(res, file) {
      if (res.code === '0') {
        this.imgUrls.push(res.content.url)
        saveGameImage({
          gameId: this.currentGame.id,
          imageUrl: res.content.url
        }).then(res => {
          if (res.code === '0') {
            this.$message('上传成功')
            this.fetchUsers()
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
