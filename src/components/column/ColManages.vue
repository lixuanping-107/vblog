<template>
    <div>
        <div class="colManageHeader">
            <el-input prefix-icon="el-icon-plus" class="addinput" placeholder="请输入栏目名称" v-model="addCol.colname"
                      size="mini"></el-input>
            <el-button type="primary" size="mini" class="el-icon-plus" @click="addColHandler"> 新增栏目</el-button>
        </div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark" v-loading="loading"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号">
                </el-table-column>
                <el-table-column
                        prop="colname"
                        label="栏目名称">
                </el-table-column>
                <el-table-column
                        prop="enabletime"
                        label="启用时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 8px;" :disabled="delManyEabled" @click="doDelMany">批量删除</el-button>
        </div>
        <el-dialog
                title="栏目编辑"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <el-tag>栏目名称</el-tag>
                <el-input v-model="updateCol.colname" style="width: 65%;margin-left: 8px;" size="small"
                          placeholder="请输入新栏目名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateHandler">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ColManages",
        data() {
            return {
                addCol: {
                    colname: ''
                },
                tableData: [],
                loading: true,
                dialogVisible: false,
                updateCol: {
                    colname: '',
                    id: '',
                },
                delManyEabled:true,
                delIds:''
            }
        },
        methods: {
            /*批量删除*/
            doDelMany() {
                this.$confirm('此操作将永久删除所选记录, 是否继续?', '批量删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/delManyColumn?'+this.delIds).then(resp => {
                        if (resp) {
                            this.initColumns();
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
            /*修改栏目*/
            updateHandler() {
                this.$confirm('此操作将永久修改【'+this.updateCol.colname+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('/updateColumn', this.updateCol).then(resp => {
                        if (resp) {
                            this.initColumns()
                            this.dialogVisible = false;
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*点击编辑弹出编辑框*/
            handleEdit(row) {
                this.dialogVisible = true;
                this.updateCol.colname = row.colname;
                this.updateCol.id = row.id;
            },
            /*删除栏目*/
            handleDelete(row) {
                this.$confirm('此操作将永久删除【' + row.colname + '】, 是否继续?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest("/" + row.id).then(resp => {
                        if (resp) {
                            this.initColumns();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*新增栏目*/
            addColHandler() {
                if (this.addCol.colname == '' || this.addCol.colname.trim() == '') {
                    this.$message.warning("请正确填写栏目名称")
                } else {
                    this.postRequest("/addColumn", this.addCol).then(resp => {
                        if (resp) {
                            this.initColumns();
                            this.addCol.colname = '';
                        }
                    })
                }
            },
            /*发送查询请求*/
            initColumns() {
                this.getRequest('/getAllColumn').then(resp => {
                    this.tableData = resp;
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.initColumns();
        }
    }
</script>

<style scoped>
    .colManageHeader {
        width: 70%;
    }

    .colManageHeader .addinput {
        width: 300px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>