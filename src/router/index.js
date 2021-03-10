import Vue from "vue";
import VueRouter from "vue-router";
import Agreement from "../views/Agreement.vue";
import SensorData from "../views/SensorData.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Agreement",
    component: Agreement
  },
  {
    path: "/sensorData",
    name: "SensorData",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SensorData
  }
];

const router = new VueRouter({
  routes
});

export default router;
