<template>
    <div class="page-content">
        <div class="form-v7-content">
            <div class="form-detail flex-column-reverse">
                <form class="form-row flex-row-reverse" @submit.prevent="sendMessage()">
                    <button type="submit" v-if="!isLoading" class="send-btn"><i class="la la-arrow-up"></i></button>
                    <button v-if="isLoading" @click="sendMessage()" class="send-btn"><i class="las la-spinner rotating"></i></button>
                    <input type="text" v-model="current.text" name="chat-input" id="chat-input" class="chat-input">
                </form>

                <div v-for="(chat,index) in chats" :key="index" :class="['form-row', chat.type==='me'?'flex-row-reverse':'flex-row', 'chat-box-'+chat.type]" :id="chat.type+index">
                    <span class="chat-avatar">
                        <i :class="['las','la-2x',chat.type==='me'?'la-smile':'la-robot']"></i>
                    </span>
                    <span :class="['chat-text',chat.status === 'error'?'text-danger':'']">
                        <i @click="edit(index)" v-if="chat.type === 'me'" class="la la-edit chat-edit"></i>
                        {{ chat.text }}
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {REGISTER_USER_CHAT} from "../store/actions.type";

    export default {
        name:'conversationalRegister',
        data(){
            return{
                chats:[
                    {
                        type:'you',
                        text:"Hello, I'm Sam, Please enter your first name",
                        status:'done',
                        field:'first_name_q',
                        edit:false
                    }
                ],
                previous:{},
                current:{text:'',field:'first_name'},
                register_form:{},
                isLoading:false
            }
        },
        methods:{
            edit(index){
                for(let i=this.chats.length - 1;i>=0;i--){
                    if(this.chats[i].type === 'you'){
                        this.previous = Object.create(this.chats[i]);
                    }
                }
                this.current = {text:this.chats[index].text,field:this.chats[index].field};

                this.chats.unshift({
                    type:'you',
                    text:'Please enter new value instead of: '+this.chats[index].text,
                    edit:true,
                    status:'done',
                    field:this.chats[index].field+'_q'
                });

            },
            sendMessage(){
                let _this = this;

                this.isLoading=true;
                let inputField = this.chats[0].field.replace('_q','');
                this.register_form[inputField] = this.current.text;

                this.$store.dispatch(REGISTER_USER_CHAT,{register:this.register_form,type:inputField}).then(function () {
                    if(_this.chats[0].edit){
                        _this.chats.unshift({
                            type:'me',
                            text:_this.current.text,
                            edit:false,
                            status:'done',
                            field:inputField
                        });
                        _this.sleep(1000).then(function () {
                            _this.isLoading=false;
                            _this.chats.unshift(_this.previous);
                        });
                    }
                    else{
                        _this.chats.unshift({
                            type:'me',
                            text:_this.current.text,
                            edit:false,
                            status:'done',
                            field:inputField
                        });
                        _this.sleep(1000).then(function () {
                            _this.isLoading=false;
                            _this.selectChatText().then(function(){
                                _this.current = {text:'',field:_this.chats[0].field.replace('_q','')}
                            });
                        });
                    }

                }).catch(function(err){
                    _this.sleep(1000).then(function () {
                        _this.isLoading=false;
                        _this.chats.unshift({
                            type:'you',
                            text:err,
                            edit:false,
                            status:'error',
                            field:inputField+'_q'
                        });

                    });

                });

            },
            selectChatText(){
                return new Promise((resolve) => {
                    switch(this.chats[0].field){
                        case 'first_name':
                            this.chats.unshift({
                                type:'you',
                                text:'Please enter organization name',
                                edit:false,
                                status:'done',
                                field:'organization_name_q'
                            });
                            break;
                        case 'organization_name':
                            this.chats.unshift({
                                type:'you',
                                text:'Please enter organization email',
                                edit:false,
                                status:'done',
                                field:'organization_email_q'
                            });
                            break;
                        case 'organization_email':
                            this.chats.unshift({
                                type:'you',
                                text:'Please enter organization phone',
                                edit:false,
                                status:'done',
                                field:'organization_phone_q'
                            });
                            break;
                        case 'organization_phone':
                            this.chats.unshift({
                                type:'you',
                                text:'Thanks your register has been done',
                                edit:false,
                                status:'done',
                                field:'done'
                            });
                            this.current = {text:'',field:''}

                            break;
                    }
                    resolve()
                });
            },
            sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
        }
    }
</script>

<style>
    
    #you0{
        animation-name: chat-animate-me;
        animation-duration: 2s;
    }

    #me0{
        animation-name: chat-animate-me;
        animation-duration: 2s;
    }
    
    @keyframes chat-animate-me {
        0%   {left:50px; top:0px;}
        100% {left:0px; top:0px;}
    }

    .form-v7-content{
        margin: 20px 0px !important;
    }

    @keyframes chat-animate-you {
        0%   {right:50px; top:0px;}
        100% {right:0px; top:0px;}
    }
    
    .form-detail{
        height: 500px !important;
        margin: 50px 0px !important;
        display: flex;
        align-items: flex-end;
        overflow-y: auto;
        border-top: 20px solid #eeeeee;
        border-radius: 5px 5px 0px 0px;
    }

    .chat-input{
        border: 2px solid #e5e5e5 !important;
        border-right: unset !important;
    }
    .form-row {
        flex-wrap: unset !important;
    }
    .send-btn{
        background: #eee;
        padding: 12px;
        cursor: pointer;
        border: unset;
    }

    .chat-box-me{
        margin: 15px 0px;
    }

    .chat-text{
        margin: 10px;
        border: 1px solid #d8d6d6;
        padding: 10px;
        background: #eee;
    }

    .chat-avatar{
        border: 1px solid #eee;
        background: #eee;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        padding: 10px;
    }

    .chat-box-me .chat-text{
        border-radius: 10px 0px 10px 10px;
    }

    .chat-box-me .chat-edit{
        cursor: pointer;
        border-right: 1px solid #10a5ad;
        padding: 0px 5px 0px 0px;
        color: #10a5ad;
    }

    .chat-box-me .chat-avatar{
        color: red;
    }

    .chat-box-you .chat-text{
        border-radius: 0px 10px 10px 10px;
    }

    .chat-box-you .chat-avatar{
        color:blue;
    }
</style>