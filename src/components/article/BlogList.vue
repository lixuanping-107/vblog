<template>
    <div>
        <div class="bloglistHeader">
            <el-input prefix-icon="el-icon-search" class="addinput" placeholder="通过标题搜索该分类下博客..."
                      size="mini" v-model="keywords"></el-input>
            <el-button type="primary" size="mini" class="el-icon-search" @click="initArticles"> 搜索</el-button>
        </div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection" v-if="showEdit ||showDelete">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题">
                    <template slot-scope="scope">
                        <span style="color: #409EFF;cursor: pointer" @click="handleClick(scope.row)" type="text" size="small">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="updatetime"
                        label="最近编辑时间">
                </el-table-column>
                <el-table-column
                        prop="user.nickname"
                        label="作者">
                </el-table-column>
                <el-table-column
                        prop="column.colname"
                        label="所属分类">
                </el-table-column>
                <el-table-column label="操作" v-if="showEdit ||showDelete">
                    <template slot-scope="scope">
                        <el-button
                                v-if="showEdit"
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                v-if="showDelete"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    :page-size="pageSize"
                    :page-count="pageNum"
                    @current-change="currentchange"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
            <el-button type="danger" size="small" style="margin-top: 8px;" :disabled="delManyEabled" @click="doDelMany">批量删除</el-button>
            <el-button type="primary" size="small" style="margin-top: 8px;" @click="refresh">刷新</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['status', 'showEdit', 'showDelete','activeName'],
        name: "BlogList",
        data() {
            return {
                tableData: [],
                keywords: '',
                pageNum: 1,
                pageSize:5,
                total: 1,
                delManyEabled:true,
                delIds:'',
                views:''
            }
        },
        methods: {
            /*刷新*/
            refresh(){
                this.initArticles();
            },
            /*删除文章*/
            handleDelete(row){
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.activeName == 'collec') {
                        this.delRequest("/delArtById?id="+row.id).then(resp=>{
                            this.initArticles();
                        })
                    } else {
                        this.putRequest("/updateArtById?id="+row.id).then(resp=>{
                            this.initArticles();
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*点击编辑跳转页面*/
            handleEdit(row){
                this.$router.push({
                    path:"/editBlog",
                    query:{
                        id:row.id,
                        from:this.activeName,
                    }
                })
            },
            /*点击文章标题跳转到详情*/
            handleClick(row){
                // console.log(row)
                this.putRequest("/updateViewsById?id="+row.id).then(resp=>{
                    if (resp){
                        this.views=resp.views
                    }
                })
                this.$router.push({
                    path:"/detail",
                    query:{
                        aid:row.id,
                    }
                })
            },
            /*批量删除*/
            doDelMany(){
                this.$confirm('此操作将永久删除所选记录, 是否继续?', '批量删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/delMangArticle?'+this.delIds).then(resp => {
                        if (resp) {
                            this.initArticles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*多选框监听,回调函数*/
            handleSelectionChange(data){
                if (data.length>0){
                    this.delManyEabled=false;
                    this.delIds='';
                    for (let i in data){
                        this.delIds+='ids='+data[i].id+'&'
                        // console.log(this.delIds)
                    }
                }else{
                    this.delManyEabled=true;
                }
            },
            currentchange(num) {
                this.pageNum=num;
                this.initArticles();
            },
            initArticles() {
                let url = '/getAllArticles?status=' + this.status + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&keywords=' + this.keywords;
                this.getRequest(url).then(resp => {
                    if (resp) {
                        this.tableData = resp.list;
                        this.total = resp.total;
                    }
                })
            }
        },
        mounted() {
            this.initArticles();
        }
    }
</script>

<style scoped>
    .bloglistHeader {
        width: 70%;
        margin: 8px 300px;
    }

    .bloglistHeader .addinput {
        width: 300px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>