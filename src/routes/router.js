// import Vue from "vue";
// import VueRouter from "vue-router";
import {createWebHistory, createRouter} from "vue-router";

import ProductList from "../pages/product/ProductList"
import ProductAdd from "../pages/product/ProductAdd";
import ProductEdit from "../pages/product/ProductEdit";

import CategoryList from "../pages/category/CategoryList";
import CategoryAdd from "../pages/category/CategoryAdd";
import CategoryEdit from "../pages/category/CategoryEdit";
import HelloWorld from "@/components/HelloWorld";

// Vue.use(VueRouter);

const routes = [
    {
        name: 'Index',
        path: '/',
        component: HelloWorld
    },
    {
        name: 'Home',
        path: '/home',
        component: HelloWorld
    },
    {
        name: 'ProductList',
        path: '/products',
        component: ProductList
    },
    {
        name: 'ProductAdd',
        path: '/products/add',
        component: ProductAdd
    },
    {
        name: 'ProductEdit',
        path: '/products/edit/:id',
        component: ProductEdit
    },
    {
        name: 'CategoryList',
        path: '/categories/:category_id?',
        component: CategoryList,
    },
    {
        name: 'CategoryAdd',
        path: '/categories/add',
        component: CategoryAdd
    },
    {
        name: 'CategoryEdit',
        path: '/categories/edit/:id',
        component: CategoryEdit
    }
];

// const router = new VueRouter({ mode: 'history', routes: routes });
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;