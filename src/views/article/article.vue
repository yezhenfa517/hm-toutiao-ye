<template>
  <div class="container-article">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- 频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <!-- v-model 这里绑定的是数组  [起始时间,结束时间]-->
          <!-- value-format 转换为正常格式 -->
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <page>
      <div slot="content" slot-scope="scope">123{{scope.fn}}</div>
      <div slot="footer">321</div>
    </page>-->
    <el-card class="footer">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面" prop="cover.images[0]">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <!-- scope.row 是当前行的数据 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <!-- 默认封面图 -->
              <div slot="error">
                <img src="../../assets/error.gif" width="150px" height="100px;" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="150px">
          <!-- 通过id跳转 -->
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
            <!-- <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- :current-page 动态激活当前页面对应的内容 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev,pager,next"
        :total="total"
        :page-size="reqParams.par_page"
        :current-page="reqParams.page"
        @current-change="parger"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import Page from '@/test/page'
export default {
  // components: { Page },
  data () {
    return {
      // 筛选参数对象
      // 使用axios提交数据时  如果数据的值为null时不会提交该字段
      reqParams: {
        // 状态
        status: null,
        // 频道
        channel_id: null,
        // 起始日期
        begin_pubdate: null,
        // 截止日期
        end_pubdate: null,
        // 当前显示的页数
        page: 1,
        // 每页显示的内容条数
        par_page: 20
      },
      // 文章列表
      articles: [],
      // 文章总条数
      total: 0,
      // 频道选项
      options: [
        {
          value: '1',
          label: 'jsva'
        },
        {
          value: '2',
          label: 'javascript'
        }
      ],
      // value: '',
      //   日期
      dataArr: []
    }
  },
  created () {
    // 渲染频道列表
    this.getOptions()
    this.getArticles()
  },
  methods: {
    // 获取频道选项数据
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    // 获取文章列表
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 分页功能
    parger (newPage) {
      // 获取最新的页数传递给当前页数
      this.reqParams.page = newPage
      // 重新查询
      this.getArticles()
    },
    // 按时间筛选
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
      // console.log(dateArr)
    },
    // 筛选
    search () {
      // 筛选如果为空 就默认为null 要不然会报错
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getArticles()
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: 'publish', query: { id } })
    },
    // 删除
    // async del (id) {
    //   // 请求
    //   await this.$http.delete(`articles/${id}`)
    //   // 提示
    //   this.$message.success('删除成功')
    //   // 更新文章
    //   this.getArticles()
    // },
    // 是否删除
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {
          this.$message.success('取消删除')
        })
    }
  }
}
</script>

<style scoped lang='less'>
.footer {
  margin-top: 20px;
}
</style>
