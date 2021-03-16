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
        // {
        //     name: "login",
        //     path: "/login",
        //     meta:{
        //         isAuth:false
        //     },
        //     component: () => import("@/views/Login")
        // },
        {
            name: "register",
            path: "/register",
            meta:{
                isAuth:false
            },
            component: () => import("@/views/Register")
        },
    ]
});