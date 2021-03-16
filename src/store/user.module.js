import {REGISTER_USER} from "./actions.type";
import {RegisterService} from "../common/api.service";
import {SET_CHATS} from "./mutations.type";

const state = {
    register:'',
    errors:'',
    chats:{
        text:"Hello, I'm Sam,for register at WERBYLO please enter Username"
    }
};

const getters = {
    register(state) {
        return state.register;
    },
    chats(state){
        return state.chats
    }
};

const setters={
    register(value) {
        state.register = value
        return state.register;
    },
};

const actions = {
    [REGISTER_USER](context,payload) {
        return RegisterService.post(payload)
            .then(() => {
                return true;
            })
            .catch(error => {
                if(error.response.status === 422){
                    if(payload.type === 'first_name'){
                        context.commit(SET_CHATS,{text:error.response.data['first_name'][0]});
                    }
                    if(payload.type === 'organization_name'){
                        context.commit(SET_CHATS,{text:error.response.data['organization_name'][0]});
                    }
                    if(payload.type === 'organization_email'){
                        context.commit(SET_CHATS,{text:error.response.data['organization_email'][0]});
                    }
                    if(payload.type === 'organization_phone'){
                        context.commit(SET_CHATS,{text:error.response.data['organization_phone'][0]});
                    }
                }

                throw new Error(error);
            });
    }
};

const mutations = {
    [SET_CHATS](state,chats){
        state.chats = chats
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
    setters
};