<template>
  <el-container class="container">
    <el-aside :width="isOpen?'200px':'62px'">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <div class="logo" :class="{logomin:!isOpen}"></div>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客有限公司</span>
        <!-- 下拉菜单 -->
        <!-- 组件提供的方法  @command  -->
        <el-dropdown @command="handleClick">
          <div class="dropdown">
            <!-- 获取用户头像 -->
            <img :src="userInfo.photo" alt />
            <span class="el-dropdown-link">
              <!-- 用户名 -->
              {{userInfo.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="setting">
              <i class="el-icon-setting" ></i>个人设置
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <i class="el-icon-unlock"></i>退出登录
            </el-dropdown-item>-->

            <!-- 组件提供的方法 -->
            <el-dropdown-item command="setting">
              <i class="el-icon-setting"></i>个人设置
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <i class="el-icon-unlock"></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      isOpen: true,
      // 对象
      userInfo: {
        name: '',
        photo: null
      }
    }
  },
  created () {
    // 获取用户信息
    const user = local.getUser() || {}
    // 传入对象
    this.userInfo.name = user.name
    this.userInfo.photo = user.photo
    eventBus.$on('updateName', name => {
      this.userInfo.name = name
    })
    eventBus.$on('updataphoto', photo => {
      this.userInfo.photo = photo
    })
  },
  methods: {
    toggleMenu () {
      // 切换左菜单 展开与收起
      this.isOpen = !this.isOpen
    },
    // 个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handleClick (command) {
      this[command]()
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  //   侧边栏
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url('../../assets/logo_admin.png') no-repeat center /
        140px auto;
    }
    .logomin {
      background: #002244 url(../../assets/logo_admin_01.png) no-repeat center /
        36px auto;
    }
  }
  //   顶部导航
  .el-header {
    border: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .el-dropdown {
      .dropdown {
        height: 60px;
        line-height: 60px;
        img {
          width: 40px;
          height: 40px;
          float: left;
          margin: 8px 10px 0 0;
        }
      }
      float: right;
      margin-right: 20px;

      .el-dropdown-link {
        display: inline-block;
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
  //   视图内容
  // .el-main {
  // }
}
</style>
