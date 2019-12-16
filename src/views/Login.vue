<template>
    <div>
        <el-form :model="loginInfo" :rules="rules" class="loginForm" status-icon ref="loginForm">
            <el-card class="box-card" shadow="hover">
                <h3>系统登录</h3>
                <el-form-item prop="username">
                    <el-input placeholder="用户名" prefix-icon="el-icon-user-solid" type="text" size="small"
                              v-model="loginInfo.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="用户密码" prefix-icon="el-icon-lock" type="password" size="small"
                              v-model="loginInfo.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </el-form-item>
                <el-button type="primary" class="loginBtn" @click="submitLogin">登录</el-button>
            </el-card>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                rules: {
                    username: [
                        {required: true, message: '请填写用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写用户密码', trigger: 'blur'},
                    ]
                },
                loginInfo: {
                    username: 'root',
                    password: '123'
                },
                checked: true
            }
        },
        methods: {
            submitLogin() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.postKeyVauleRequest('/doLogin', this.loginInfo).then(resp => {
                            if (resp) {
                                // 获取登录者信息 存进 sessionStorage
                                window.sessionStorage.setItem("user",JSON.stringify(resp.data));
                                //页面跳转
                                //replace push
                                this.$router.replace("/home")
                            }
                        })
                    } else {
                        this.$message.error('请填写正确的密码和用户名');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .loginBtn {
        width: 100%;
    }

    .loginForm {
        width: 430px;
        margin: 200px auto;
    }

    .loginForm h3 {
        color: dimgrey;
        text-align: center;
    }

    .box-card {
        width: 480px;
        box-shadow: 0 2px 20px dimgrey;
    }
</style>