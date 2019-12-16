<template>
    <div>
        <div>
          <el-button type="text" class="el-icon-back" @click="returnBack">返回</el-button>
        </div>
        <div>
            <h1 class="artTitle">{{article.title}}</h1>
            <div class="artInfo">
                <span>{{article.user.nickname}}</span>
                <span>浏览 {{article.views}}</span>
                <span>{{article.updatetime}}</span>
            </div>
            <div v-html="article.hmcontent"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return{
              article:{
                  user:{
                      nickname:''
                  }
              },
            }
        },
        mounted(){
            this.articleInfo()
        },
        methods:{
            articleInfo(){
                let aid=this.$route.query.aid;
                if (aid!=null && aid !=undefined){
                    this.getRequest("/getArtByAid?aid="+aid).then(resp=>{
                        if (resp){
                            this.article=resp;
                        }
                    })
                }
            },
            returnBack(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .artInfo{
        text-align: right;
    }
    .artInfo span{
        color: #409EFF;
        font-size: 12px;
        margin-right: 20px;
    }
    .artTitle{
        text-align: center;
    }
</style>