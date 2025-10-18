import { createRouter, createWebHashHistory } from 'vue-router';
import BlogList from '../views/BlogList.vue';
import BlogPost from '../views/BlogPost.vue';

const routes = [
  { path: '/', name: 'home', component: BlogList },
  { path: '/post/:slug', name: 'post', component: BlogPost, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; },
});

export default router;
