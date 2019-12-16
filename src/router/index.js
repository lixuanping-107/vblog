import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import List from "../views/Article/List";
import Publish from "../views/Article/Publish";
import ColManage from "../views/Column/ColManage";
import DataManage from "../views/Data/DataManage";
import UserManage from "../views/User/UserManage";
import Detail from "../views/Article/Detail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    hidden:true
  },
  //文章管理(文章列表，发布文章，【二级菜单】)
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      isFirst:false,
      title:'文章管理',
      icon:'el-icon-document',
      roles:['ROLE_dba','ROLE_admin','ROLE_user']
    },
    children:[
      {
        path: '/articleList',
        name: 'list',
        component: List,
        meta:{
          title:'文章列表',
          roles:['ROLE_dba','ROLE_admin','ROLE_user']
        }
      },
      {
        path: '/articlePubilsh',
        name: 'publish',
        component: Publish,
        meta:{
          title:'发布文章',
          roles:['ROLE_dba','ROLE_admin','ROLE_user']
        }
      },
      {
        path: '/editBlog',
        name: 'publish',
        component: Publish,
        hidden:true,
        meta:{
          title:'编辑文章',
          roles:['ROLE_dba','ROLE_admin','ROLE_user']
        }
      },
    ]
  },
  //  栏目管理，用户管理，数据统计(一级菜单)
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      isFirst: true
    },
    children:[
      {
        path: '/colManage',
        name: 'colmanage',
        component: ColManage,
        meta:{
          title:'栏目管理',
          icon:'el-icon-menu',
          roles:['ROLE_dba','ROLE_admin']
        }
      },
      {
        path: '/dataManage',
        name: 'datamanage',
        component: DataManage,
        meta:{
          title:'数据统计',
          icon:'el-icon-s-data',
          roles:['ROLE_dba','ROLE_admin']
        }
      },
      {
        path: '/userManage',
        name: 'usermanage',
        component: UserManage,
        meta:{
          title:'用户管理',
          icon:'el-icon-s-custom',
          roles:['ROLE_dba','ROLE_admin']
        }
      },
      {
        path: '/detail',
        name: 'detail',
        component: Detail,
        hidden:true,
        meta:{
          title:'文章详情',
          roles:['ROLE_dba','ROLE_admin','ROLE_user']
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
