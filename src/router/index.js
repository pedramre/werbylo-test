import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    base: '/',
    routes: [
        {

            path: "/",
            name:"home",
            meta:{
                isAuth:false
            },
            component: () => import("@/views/Register"),
        },
        {
            name: "conversationalRegister",
            path: "/conversational-register",
            meta:{
                isAuth:false
            },
            component: () => import("@/views/ConversationalRegister")
        },
    ]
});