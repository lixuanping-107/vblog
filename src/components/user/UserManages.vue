<template>
    <div>
        <div class="colManageHeader">
            <el-input prefix-icon="el-icon-search" class="addinput" placeholder="请输入搜索的用户"
                      size="mini" v-model="nickname"></el-input>
            <el-button type="primary" size="mini" class="el-icon-search" @click="searchUser">搜索</el-button>
        </div>
        <el-card :key="index" class="box-card" v-for="(item,index) in UserDate" v-loading="loading">
            <div slot="header" class="clearfix">
                <span>{{item.nickname}}</span>
                <el-button style="float: right; padding: 3px 0; color: red" type="text" class="el-icon-delete" @click="delUser(item.id)">删除</el-button>
            </div>
            <div class="text item">
                <p>用户名：{{item.username}}</p>
                <p>电子邮箱：{{item.email}}</p>
                <p>注册时间：{{item.regtime}}</p>
                <p>用户状态：<el-switch
                        style="display: inline"
                        v-model="item.enabled"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="启用"
                        inactive-text="禁用"
                @change="change(item.id,item.enabled)">
                </el-switch></p>
                用户角色：<p :key="i" v-for="(role,i) in item.roles" style="display: inline"><el-tag size="small" style="margin: 3px;" type="success">{{role.nameZh}}</el-tag></p>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "UserManages",
        data() {
            return {
                UserDate: [],
                loading: true,
                delUserId:{
                    id:''
                },
                updateInfo:{
                    id:'',
                    enabled:'',
                },
                nickname:''
            }
        },
        methods: {
            /*模糊查询名字*/
            searchUser(){
                this.getRequest("/getAllUser?nickname="+this.nickname).then(resp=>{
                    // console.log(resp)
                    if (resp){
                        this.UserDate=resp;
                    }
                })
            },
            /*更改用户*/
            change(i,j){
                this.updateInfo.id=i;
                this.updateInfo.enabled=j;
                this.putRequest("/updateUser",this.updateInfo).then(resp=>{
                    if (resp){
                        this.initUsers();
                    }
                })
            },
            /*删除用户*/
            delUser(data){
                this.delUserId.id=data
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest("/delUser",this.delUserId).then(resp=>{
                        if (resp){
                            this.initUsers();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*发送查询请求*/
            initUsers() {
                this.getRequest("/getAllUser").then(resp => {
                    if (resp){
                        this.UserDate = resp;
                        this.loading=false;
                    }

                })
            }
        },
        mounted() {
            this.initUsers()
        }
    }
</script>

<style scoped>
    .box-card {
        width: 30%;
        margin: 0 3% 20px 0;
        display: inline-block;
    }
    .colManageHeader {
        width: 70%;
        margin: 8px 300px;
    }

    .colManageHeader .addinput {
        width: 300px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>