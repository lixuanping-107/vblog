/*根据用户角色 得到用户可访问的 路径数组，根据 访问的路径对比，如果能对上返回true,否则返回false*/
export const operatUrl = (to,router) =>{
    let path = [];// 用户可以访问的路径
    let userRoles=JSON.parse(window.sessionStorage.getItem("user")).authorities;
    router.options.routes.forEach((item,i)=>{
        if (item.children){
            for (let i in item.children){
                for (let j in item.children[i].meta.roles){
                    let bool =true;
                    for (let k in userRoles){
                        if (userRoles[k].authority ==item.children[i].meta.roles[j]){
                            path.push(item.children[i].path);
                            bool=false
                        }
                    }
                    if (!bool){
                        break;
                    }
                }
            }
        }else {
            path.push(item.path);
        }
    })
    for(let i in path){
        if (to.path == path[i]) {
            return true;
        }
    }
    return false;
}

export const allUrl = (to,router) =>{
    let path = [];// 得到 router 中所有的 path
    router.options.routes.forEach((item,i) => {
        // item 就是 router中 每一个 路由对象
        if (item.children) {
            for (let i in item.children) {
                path.push(item.children[i].path);
            }
        }else{
            path.push(item.path);
        }
    })

    for(let i in path){
        if (to.path == path[i]) {
            return true;
        }
    }
    return false;
}