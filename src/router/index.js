import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/common/index.vue'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  console.log(to)
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    children: [{
      path: '/index/test',
      name: 'test',
      component:  () => import('../views/common/test.vue'),
    },
    {
      path: '/index/error',
      name: 'error',
      component: () => import('../views/common/error.vue'),
    },
    {
      path: '/index/HelloWorld',
      name: 'HelloWorld',
      component: () => import('../components/HelloWorld.vue'),
    }
  ]
  }
]

const router = new VueRouter({
  routes
})

export default router
//前置处理
// router.beforeEach((to, from, next) => {
//   //白名单
//   if (to.path == "/" || to.path == "/sessionerr") {
//     next();//放行
//   } else {
//     //利用全局缓存
//     if(store.getters.getUsers){
//       next();
//     }else{
//       next('/sessionerr');
//     }
//   }
// })
