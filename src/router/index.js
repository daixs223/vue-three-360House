import Vue  from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";
Vue.use(VueRouter);

 const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "index",
      component: Home
    }
  ]
});
export default router;
