## 项目初始化
>1.将不需要的组件删除

>2.在views目录下创建Login组件

>3.安装 element-ui `npm i element-ui -S`

>4.制作登录页面

>5.在路由中设置路由访问规则
## 前端封装api
>1.安装axios 
`npm i axios`
 
>2.新建utils api.js 封装api
 
>3.新建 vue.config.js 配置node.js代理
 
>4.在登录页导入 postKeyValueRequest 发登录请求
## 前端请求完善
>1.为使用 api 方便，我们将 api 注册成插件
```javascript
import {getRequest,postRequest,postKeyValueRequest,putRequest,delRequest} from "./utils/api";
Vue.prototype.getRequest=getRequest
Vue.prototype.postRequest=postRequest
Vue.prototype.postKeyValueRequest=postKeyValueRequest
Vue.prototype.putRequest=putRequest
Vue.prototype.delRequest=delRequest
```
>2.为了统一处理响应信息，添加响应拦截器
```javascript
// 拦截器-处理响应信息
axios.interceptors.response.use(resp => {
    if (resp.data && resp.status == 200 && resp.data.code == 500) {
        Message.error({message: resp.data.msg});
        return;
    }
    if (resp.data.msg) {
        Message.success({message: resp.data.msg});
    }
    return resp.data;
},error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了!o(╯□╰)o'});
    }else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'});
    }else if (error.response.status == 401) {
        Message.error({message: '用户未登录，请先登录'});
    }else{
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg});
        }else{
            Message.error({message: '未知错误'});
        }
    }
    return;
})
```
>3.前端登录跳转
```vue
this.postKeyValueRequest('/doLogin',this.loginInfo).then(resp => {
        if (resp) {
           // 获取登录者信息 存进 sessionStorage
           window.sessionStorage.setItem("user", JSON.stringify(resp.data));
           // 页面跳转
           // replace push
           this.$router.replace("/home");
        }
})
```
