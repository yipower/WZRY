import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEite from '../views/CategoryEite.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEite from '../views/ItemEite.vue'
import ItemList from '../views/ItemList.vue'
Vue.use(VueRouter)

const routes = [
 
  {
    path:"/",
    name:"main",
    component: Main,
    children: [
      {
        path:"/categories/create",
        component:CategoryEite
      },
      {
        path:"categories/list",
        component:CategoryList
      },
      {
        path:"categories/edit/:id",
        component:CategoryEite,
        props:true
      },
      {
        path:"/items/create",
        component:ItemEite
      },
      {
        path:"items/list",
        component:ItemList
      },
      {
        path:"items/edit/:id",
        component:ItemEite,
        props:true
      }
    ]
  },
 
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
