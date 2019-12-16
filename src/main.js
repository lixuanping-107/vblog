import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//---------------------注册api插件
import {getRequest,postKeyVauleRequest,postRequest,putRequest,delRequest} from "./utils/api";
Vue.prototype.getRequest=getRequest
Vue.prototype.postKeyVauleRequest=postKeyVauleRequest
Vue.prototype.postRequest=postRequest
Vue.prototype.putRequest=putRequest
Vue.prototype.delRequest=delRequest
//--------------------

//------------利用导航守卫防止没有登录直接访问项目组件
import {allUrl} from "./utils/menus";
import {operatUrl} from "./utils/menus";
import {Message} from "element-ui";
import el from "element-ui/src/locale/lang/el";
router.beforeEach((to, from, next) => {
    if(to.path == '/'){
        next();
    }
    else{
        if(window.sessionStorage.getItem("user")){
            if(operatUrl(to, router)){
                next();
            }else{
                if(allUrl(to, router)){
                    Message.warning({message: '您无权访问该页面'});
                    next('/home');
                }else{
                    Message.error({message: '页面不存在'});
                    next('/home');
                }
            }
        }else{
            Message.warning({message:'请先登录'})
            next("/");
        }
    }
})
//-------------------------------------------------

//----------------------引入echarts---------------
import echarts from 'echarts'
Vue.prototype.echarts=echarts
//------------------------------------
//-----------------------引入movonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
//------------------------------------
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
