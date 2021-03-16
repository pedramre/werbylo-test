import {SET_STEP} from "./mutations.type";
import {VALIDATION} from "./actions.type";

const state = {
    step:'',
    stepError:''
};

const getters = {
    step(state) {
        return state.step;
    },
};

const setters={
    step(value) {
        state.step = value
        return state.step;
    },
};


const actions = {
    [VALIDATION](commit,payload) {
        return new Promise((resolve,reject) => {
            if(payload.value === '') return reject("Dear friend please fill the input")
            if(payload.type === 'email'){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(payload.value)) return resolve();
                else return reject("Dear friend please enter correct format for email");
            }
            else return resolve()
        });
    }
};

const mutations = {
    [SET_STEP](state, step){
        state.step = step
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
    setters
};