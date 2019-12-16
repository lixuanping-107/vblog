<template>
    <div>
        <div id="main" style="width: 600px;height:400px;margin: 100px auto"></div>
    </div>
</template>

<script>
    export default {
        name: "DataManages",
        data() {
            return {
                textArr: [],
                dataArr: []
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                this.getRequest("/getColumnData").then(resp => {
                    if (resp) {
                        for (let i in resp) {
                            this.textArr.push(resp[i].colname)
                            this.dataArr.push(resp[i].counts)
                        }
                        // 基于准备好的dom，初始化echarts实例
                        var myChart = this.echarts.init(document.getElementById('main'));

                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: '栏目文章展示'
                            },
                            xAxis: {
                                type: 'category',
                                data: this.textArr,
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: this.dataArr,
                                type: 'line',
                                smooth: true
                            }]
                        };
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>