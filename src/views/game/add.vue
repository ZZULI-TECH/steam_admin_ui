<template>
  <el-form ref="form" :model="form" label-width="80px" style="width: 50%; margin-top: 20px">
    <el-form-item label="游戏名称">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="游戏类型">
      <el-select v-model="form.type" placeholder="请选择游戏类型">
        <el-option label="数字游戏" value="1"/>
        <el-option label="实体游戏" value="2"/>
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
    <el-form-item label="封面">
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        class="avatar-uploader"
        action="http://localhost:8080/api/file/image">
        <img v-if="form.cover" :src="form.cover" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { saveGame } from '@/api/game'

export default {
  data() {
    return {
      form: {
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
  methods: {
    onSubmit() {
      saveGame(this.form).then(res => {
        if (res.code === '0') {
          this.$message('新增成功')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '0') {
        this.form.cover = res.content.url
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
