<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="articles">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row.id,false)"
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
            >关闭评论</el-button>
            <el-button
              @click="toggleStatus(scope.row.id,true)"
              v-else
              type="success"
              size="small"
            >打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        response_type: 'comment',
        // 每页显示的条数
        per_page: 20,
        // 显示的页数
        page: 1
      },
      //   总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 同步页面和分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 切换评论状态
    toggleStatus (id, status) {
      const text = status
        ? '你确定要打开评论吗?'
        : '你确定关闭评论吗? 关闭后用户将无法对该文章进行评论'
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${id}`, { allow_comment: status })
          this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
          this.getArticles()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'></style>
