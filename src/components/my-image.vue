<template>
  <div class="my-image">
    <div class="btn_box" @click="open">
      <img :src="value || btnImage " alt />
    </div>
    <el-dialog title :visible.sync="dialogVisible" width="700px">
      <!-- 素材库 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 素材库 -->
        <el-tab-pane label="素材库" name="image">
          <!-- 全部和收藏 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in image"
              :key="item.id"
              @click="selectedImage(item.url)"
              :class="{selected: selectedImageUrl === item.url}"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action=" http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <!-- 按钮 -->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'
// 导入图片
import defaultImage from '../assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      reqParams: {
        collect: false,
        // 每页显示的条数
        per_page: 8,
        // 显示的页数
        page: 1
      },
      // 当前激活选项卡列表
      activeName: 'image',
      //   添加素材总条数
      total: 0,
      //   素材列表
      image: [],
      //   请求头
      headers: { Authorization: `Bearer ${local.getUser().token}` },
      //   上传的图片地址
      uploadImageUrl: null,
      //   记录选中的图片
      selectedImageUrl: null,
      // 选中要显示到页面的图
      btnImage: defaultImage
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 弹出对话框
    open () {
      this.dialogVisible = true
      this.selectedImageUrl = null
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.image = data.results
      this.total = data.total_count
    },
    //   激活切换页
    pager (newPage) {
      // 获取当前页数传递给显示页数
      this.reqParams.page = newPage
      // 重新加载页面
      this.getArticles()
    },
    // 收藏和全部的切换
    toggleList () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 上传完成后执行
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    //   选中素材图片的样式
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        // this.btnImage = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        // this.btnImage = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.el-pagination {
  text-align: center;
}
.img_list {
  margin-top: 20px;
  margin-bottom: 10px;
  .list {
    width: 150px;
    height: 120px;
    display: inline-block;
    position: relative;
    margin-right: 15px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25px;
    line-height: 25px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    span {
      margin: 0 10px;
      color: #fff;
    }
    .red {
      color: red;
    }
  }
}
// 选中的效果
.img_item {
  width: 150px;
  height: 120px;
  position: relative;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  //   &.selected::after {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     background: rgba(0, 0, 0, 0.3) url('../assets/selected.png') no-repeat center /
  //       50px 50px;
  //   }
  &.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
      50px 50px;
  }
}
</style>
