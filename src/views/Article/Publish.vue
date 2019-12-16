<template>
    <div>
        <div>
            <el-select v-model="articleInfo.cid" placeholder="请选择" size="small">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.colname"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input placeholder="请输入标题..." v-model="articleInfo.title" size="small"
                      style="width: 350px;margin-left: 3px;"></el-input>
        </div>
        <div class="mavonEditor">
            <mavon-editor style="height: 100%" v-model="articleInfo.mdcontent" @change="change" @save="save"/>
        </div>
        <el-button style="float:right" type="primary" @click="show" v-if="from">发表文章</el-button>
        <el-button v-if="!from" style="float:right" type="primary" @click="saveChange">保存修改</el-button>
        <el-button v-if="!from" style="float:right" @click="returnBack">放弃修改</el-button>
    </div>
</template>

<script>
    export default {
        name: "Publish",
        data() {
            return {
                articleInfo: {
                    id: 0,
                    mdcontent: '',
                    cid: '',
                    title: '',
                    hmcontent: '',
                    status: 1,
                },
                options: [],
                /*from与前面的from无关主要判断是否显示按钮*/
                from: true,
            }
        },
        methods: {
            /*放弃修改*/
            returnBack() {
                this.$router.go(-1);
            },
            /*编辑文章*/
            saveChange() {
                this.putRequest("/updateArtContent", this.articleInfo).then(resp => {
                    if (resp) {
                        this.$router.push("/articleList")
                    }
                })
            },
            save(value, render) {
                this.articleInfo.status = 2;
                this.articleInfo.mdcontent = value;
                this.articleInfo.hmcontent = render;
                this.show();
            },
            change(value, render) {
                this.articleInfo.status = 1;
                this.articleInfo.mdcontent = value;
                this.articleInfo.hmcontent = render;
            },
            show() {
                this.postRequest("/addArticle", this.articleInfo).then(resp => {
                    /*push可以返回上一个页面，replace返回上上个页面*/
                    this.$router.push("/articleList")
                })
            },
            initColumns() {
                this.getRequest('/getAllColumn').then(resp => {
                    this.options = resp;
                })
            }
        },
        mounted() {
            let from = this.$route.query.from;
            if (from != null && from != '' && from != undefined) {
                this.from = false;
                let id = this.$route.query.id;
                /*编辑栏中有数据*/
                this.getRequest("/getArtByAid?aid=" + id).then(resp => {
                    if (resp) {
                        this.articleInfo.mdcontent = resp.mdcontent
                        this.articleInfo.id = resp.id
                        this.articleInfo.hmcontent = resp.hmcontent
                        this.articleInfo.cid = resp.cid
                        this.articleInfo.title = resp.title
                    }
                })
            }
            this.initColumns()
        }
    }
</script>

<style scoped>
    .mavonEditor {
        width: 100%;
        height: 480px;
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>