<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small" @click="open">添加素材</el-button>
        <!-- 素材列表 -->
        <div class="img_list">
          <div class="list" v-for="item in image" :key="item.id">
            <img :src="item.url" alt />
            <div class="footer">
              <span
                @click="toggleStatus(item)"
                class="el-icon-star-off"
                :class="{red:item.is_collected}"
              ></span>
              <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页栏 -->
      <el-pagination
        v-if="total>10"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px" style="padding:10px 0 0 10px">
      <span>
        <!-- :on-success 运行结束后执行的函数 -->
        <el-upload
          class="avatar-uploader"
          action=" http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        // false 全部  true 收藏
        collect: false,
        // 每页显示的条数
        per_page: 10,
        // 显示的页数
        page: 1
      },
      // 总条数
      total: 0,
      // 素材列表
      image: [],
      //   对话框显示状态
      dialogVisible: false,
      //   默认地址
      imageUrl: null,
      // 上传的请求头
      headers: { Authorization: `Bearer ${local.getUser().token}` }
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    //   渲染页面
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.image = data.results
      this.total = data.total_count
    },
    // 切换显示页
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
    // 实现收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.getArticles()
      item.is_collected = data.collect
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 删除
    deleteImage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {
          this.$message.success('取消删除')
        })
    },
    // 对话框显示收藏图片
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 重新加载
        this.getArticles()
        this.dialogVisible = false
      }, 2000)
    },
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.imageUrl = ''
    }
  }
}
</script>

<style scoped lang='less'>
.container-image {
  .img_list {
    margin-top: 20px;
    margin-bottom: 10px;
    .list {
      width: 180px;
      height: 180px;
      display: inline-block;
      position: relative;
      margin-right: 30px;
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
}
</style>
