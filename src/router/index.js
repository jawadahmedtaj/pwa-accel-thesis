import Vue from "vue";
import VueRouter from "vue-router";
import Agreement from "../views/Agreement.vue";
import DifficultySelection from "../views/DifficultySelection.vue";
import Easy from "../views/Easy.vue";
import Medium from "../views/Medium.vue";
import Hard from "../views/Hard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Agreement",
    component: Agreement
  },
  {
    path: "/DifficultySelection",
    name: "DifficultySelection",
    component: DifficultySelection
  },
  {
    path: "/Easy",
    name: "Easy",
    component: Easy
  },
  {
    path: "/Medium",
    name: "Medium",
    component: Medium
  },
  {
    path: "/Hard",
    name: "Hard",
    component: Hard
  },
];

const router = new VueRouter({
  routes
});

export default router;
