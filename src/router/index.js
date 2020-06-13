import Vue from "vue";
import Router from "vue-router";
import CircleLoader from "@/components/CircleLoader";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "CircleLoader",
      component: CircleLoader
    }
  ]
});
