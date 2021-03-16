<template>
    <div class="page-content">
        <div class="form-v7-content">
            <div class="form-left">
                <img src="images/form-v7.png" alt="form">
                <p class="text-1">Sign Up</p>
                <p class="text-2">Privacy Policy & Term of service</p>
            </div>



            <div class="form-detail">
                <div v-if="!loading_chat" class="chat-box form-row mb-3 d-flex align-items-center">
                    <img class="b-avatar" src="./../../public/images/person.jpg"/>
                    <span class="chat-box-text">
                        {{ chats.text }}
                    </span>
                </div>

                <div v-if="loading_chat" class="form-row mb-3 d-flex align-items-center">
                    <b-card>
                        <b-skeleton animation="fade" width="85%"></b-skeleton>
                        <b-skeleton animation="wave" width="55%"></b-skeleton>
                        <b-skeleton animation="fade" width="70%"></b-skeleton>
                    </b-card>
                </div>

                <form v-if="step === 'one'" :id="step">
                    <div class="form-row">
                        <label for="first_name">FIRST NAME</label>
                        <input type="text" name="first_name" id="first_name" v-model="register_form.first_name" class="input-text">
                    </div>
                    <div class="form-row-last">
                        <input type="button" @click="changeStep('two',register_form.first_name)" class="register" value="Send">
                    </div>
                </form>


                <form v-if="step === 'two'" :id="step">

                    <div class="form-row">
                        <label for="organization_name">Organization Name</label>
                        <input type="text" name="username" id="organization_name" v-model="register_form.organization_name" class="input-text">
                    </div>
                    <div class="form-row-last">
                        <input type="button" @click="changeStep('three',register_form.organization_name)" class="register" value="Send">
                        <input type="button" @click="changeStep('one')" class="register yellow" value="Previous">

                    </div>
                </form>


                <form v-if="step === 'three'" :id="step">

                    <div class="form-row">
                        <label for="organization_email">Organization Email</label>
                        <input type="text" name="username" id="organization_email" v-model="register_form.organization_email" class="input-text">
                    </div>
                    <div class="form-row-last">
                        <input type="button" @click="changeStep('four',register_form.organization_email,'email')" class="register" value="Send">
                        <input type="button" @click="changeStep('two')" class="register yellow" value="Previous">

                    </div>
                </form>

                <form v-if="step === 'four'" :id="step">
                    <div class="form-row">
                        <label for="organization_phone">Organization Phone</label>
                        <input type="number" name="organization_phone" id="organization_phone" v-model="register_form.organization_phone" class="input-text">
                    </div>
                    <div class="form-row-last">
                        <input type="button" @click="changeStep('five',register_form.organization_phone)" class="register" value="Send">
                        <input type="button" @click="changeStep('three')" class="register yellow" value="Previous">
                    </div>
                </form>

            </div>

        </div>

    </div>

</template>

<script>
    import {mapGetters} from "vuex";
    import {SET_CHATS, SET_STEP} from "../store/mutations.type";
    import {REGISTER_USER} from "../store/actions.type";

    export default {
        name: 'register',
        data(){
            return{
                register_form:{
                    first_name:'',
                    organization_name:'',
                    organization_email:'',
                    organization_phone:'',
                },
                loading_chat:false,
            }
        },
        computed:{
            ...mapGetters(["step","chats"]),
        },
        created(){
            this.$store.commit(SET_STEP,'one')
        },
        methods:{
            changeStep(value,entered,type=''){
                let _this = this;
                this.$store.dispatch('validation',{value:entered,type:type}).then(function () {
                    switch (value){
                        case 'one':
                            _this.toggleLoading();
                            _this.sleep(1000).then(function () {
                                _this.$store.dispatch(REGISTER_USER,{register:_this.register_form,type:'first_name'}).then(function () {
                                    _this.$store.commit(SET_CHATS,{text:"Hello, I'm Sam,for register at WERBYLO please enter Username"})
                                    _this.$store.commit(SET_STEP,value)
                                    _this.toggleLoading();
                                }).catch(function () {
                                    _this.toggleLoading();
                                })
                            }).catch(function (err) {
                                console.log('err',err)
                            });

                            break;
                        case 'two':
                            _this.toggleLoading();
                            _this.sleep(1000).then(function () {
                                _this.$store.dispatch(REGISTER_USER,{register:_this.register_form,type:'first_name'}).then(function () {
                                    _this.$store.commit(SET_STEP,value);
                                    _this.$store.commit(SET_CHATS,{text:'Thanks '+_this.register_form.first_name+',Now please enter organization name '})
                                    _this.toggleLoading();
                                }).catch(function () {
                                    _this.toggleLoading();
                                })
                            });

                            break;
                        case 'three':
                            _this.toggleLoading();
                            _this.sleep(1000).then(function () {
                                _this.$store.dispatch(REGISTER_USER,{register:_this.register_form,type:'organization_name'}).then(function () {
                                    _this.$store.commit(SET_CHATS,{text:"It's nice,Please enter organization email "})
                                    _this.$store.commit(SET_STEP,value);
                                    _this.toggleLoading();
                                }).catch(function () {
                                    _this.toggleLoading();
                                })
                            });
                            break;
                        case 'four':
                            _this.toggleLoading();
                            _this.sleep(1000).then(function () {
                                _this.$store.dispatch(REGISTER_USER,{register:_this.register_form,type:'organization_email'}).then(function () {
                                    _this.$store.commit(SET_STEP,value);
                                    _this.$store.commit(SET_CHATS,{text:"Thanks,Please enter organization phone number "})
                                    _this.toggleLoading();
                                }).catch(function () {
                                    _this.toggleLoading();
                                })
                            });
                            break;
                        case 'five':
                            _this.toggleLoading();
                            _this.sleep(1000).then(function () {
                                _this.$store.dispatch(REGISTER_USER,{register:_this.register_form,type:'organization_phone'}).then(function () {
                                    _this.$store.commit(SET_STEP,value);
                                    _this.$store.commit(SET_CHATS,{text:"Thanks Dear "+_this.register_form.first_name+" for register at Werbylo. Now you can use customers panel at werbylo"})
                                    _this.toggleLoading();
                                }).catch(function () {
                                    _this.toggleLoading();
                                })
                            });
                            break;
                    }
                }).catch(function (err) {
                    _this.toggleLoading();
                    _this.sleep(1000).then(function () {
                        _this.$store.commit(SET_CHATS,{text:err})
                        _this.toggleLoading();
                    })
                })


            },
            sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            },
            toggleLoading(){
                if(!this.loading_chat) this.loading_chat = true
                else this.loading_chat = false
            },
        }
    }
</script>

<style>
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .b-avatar{
        border-radius: 50%;
        border: 1px solid #23bfb1;
    }

    .chat-box{
        border: 1px solid #d8cfcf;
        border-radius: 20px;
        background: #eee6;
    }

    .chat-box-text{
        padding: 5px;
    }

    .register{
        text-align: center;
    }

    .card{
        min-width: 100% !important;
    }

    .register{
        width: 120px !important;
        margin: 10px !important;
    }
    .yellow{
        background-color: #fb8689 !important;
    }
</style>

