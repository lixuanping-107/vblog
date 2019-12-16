<template>
    <div>
        <template>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="全部文章" name="all">
                    <blog-list status="0" :showEdit="false" :showDelete="false" :activeName="activeName"></blog-list>
                </el-tab-pane>
                <el-tab-pane label="已发表" name="published">
                    <blog-list status="1" :showEdit="true" :showDelete="true" :activeName="activeName"></blog-list>
                </el-tab-pane>
                <el-tab-pane label="草稿箱" name="draft">
                    <blog-list status="2" :showEdit="true" :showDelete="true" :activeName="activeName"></blog-list>
                </el-tab-pane>
                <el-tab-pane label="回收站" name="collec">
                    <blog-list status="3" :showEdit="false" :showDelete="true" :activeName="activeName"></blog-list>
                </el-tab-pane>
                <el-tab-pane label="博客管理" name="manage">
                    <blog-list status="-1" :showEdit="false" :showDelete="true" :activeName="activeName"></blog-list>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>
    import BlogList from "../../components/article/BlogList";
    export default {
        name: "List",
        data(){
            return{
                activeName: 'published'
            }
        },
        components:{
            BlogList
        }
    }
</script>

<style scoped>

</style>