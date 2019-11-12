<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="120px">
        <!-- 标题 -->
        <el-form-item label="标题: ">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <!-- 内容 | 富文本-->
        <el-form-item label="内容: ">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态: ">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <el-form-item>
            <el-radio-group v-if="articleForm.cover.type===1">
              <my-image v-model="articleForm.cover.images[0]"></my-image>
            </el-radio-group>
            <el-radio-group v-if="articleForm.cover.type===3">
              <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 频道 -->
        <el-form-item label="频道: ">
          <!-- 频道组件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 修改 -->
        <el-form-item v-if="$route.query.id">
          <el-button type="primary" @click="update(false)">修改</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
        <!-- 发表 -->
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本呢配置
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  // 注册富文本
  components: {
    quillEditor
  },
  data () {
    return {
      // 需要提交的数据
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      //   富文本配置对象
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  watch: {
    // 监听地址栏的变化
    '$route.query.id': function () {
      this.toggleAArticleStatus()
    }
  },
  created () {
    // 修改
    this.toggleAArticleStatus()
  },
  methods: {
    // 修改
    toggleAArticleStatus () {
      const articleId = this.$route.query.id
      if (articleId) {
        this.getArticle(articleId)
      } else {
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    },
    // 获取指定id列表
    async getArticle (id) {
      const {
        data: { data }
      } = await this.$http.get('articles/' + id)
      this.articleForm = data
    },
    // 修改
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleForm.id}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.articleForm.cover.images = []
      this.$router.push('/article')
    },
    // 提交
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '提交成功')
      this.articleForm.cover.images = []
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 10px;
}
</style>
