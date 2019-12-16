<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <h3 class="title">V部落博客管理平台</h3>
                <el-dropdown @command="handleCommand">
                       <span class="el-dropdown-link">
                      {{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                       </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="messgae">系统消息</el-dropdown-item>
                        <el-dropdown-item command="article">我的文章</el-dropdown-item>
                        <el-dropdown-item command="myhome">个人主页</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px" style="height: calc(100vh - 60px);">
                    <el-menu router>
                        <!--二级菜单-->
                        <el-submenu :key="index" index="index+''" v-for="(item,index) in this.$router.options.routes"
                                    v-if="!item.hidden && !item.meta.isFirst && hasRoleOrNot(item.meta.roles)">
                            <template slot="title">
                                <i :class="item.meta.icon"></i>
                                <span>{{item.meta.title}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="child.path" v-for="(child,i) in item.children" v-if="hasRoleOrNot(child.meta.roles) &&!child.hidden">
                                    {{child.meta.title}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <!--遍历得到路由中的routes,名为item，在遍历item中的子集名为child，一级菜单-->
                        <div v-for="(item,index) in this.$router.options.routes"
                             v-if="!item.hidden && item.meta.isFirst">
                            <el-menu-item :key="i" :index="child.path" v-for="(child,i) in item.children" v-if="hasRoleOrNot(child.meta.roles) && !child.hidden">
                                <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                                <span slot="title">{{child.meta.title}}</span>
                            </el-menu-item>
                        </div>

                     </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="this.$route.path !='/home'" v-text="this.$router.currentRoute.meta.title"></el-breadcrumb-item>
                    </el-breadcrumb>
                    <div v-if="this.$route.path == '/home'">
                        <h2>欢迎来到java15班博客后台管理</h2>
                    </div>
                    <router-view class="routerViewMargin"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        methods: {
            hasRoleOrNot(roles){
                /*获取当前登录者的 角色*/
              let userRoles=JSON.parse(window.sessionStorage.getItem("user")).authorities;
              // console.log(userRoles)
              for (let i in roles){
                for (let j in userRoles){
                    if (roles[i]==userRoles[j].authority){
                       return true;
                    }
                }
              }
              return false;
            },
            handleCommand(command) {
                if (command == 'logout') {
                    this.$confirm('是否退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!',
                        });
                        /*removeItem删除user*/
                        window.sessionStorage.removeItem("user")
                        this.$router.replace("/")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        });
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .homeHeader {
        background-color: #409EFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .homeHeader .title {
        color: #fff;
    }

    .routerViewMargin{
        margin-top: 8px;
    }
</style>