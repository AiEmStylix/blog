import AdminPage from '@/views/AdminPage.vue';
import ErrorPage from '@/views/ErrorPage.vue';
import HomePage from '@/views/HomePage.vue';
import PostDetails from '@/views/PostDetails.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/posts/:id',
      name: 'PostDetails',
      component: PostDetails,
      props: true,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage,
    },
    //Page not found component
    {
      path: '/:pathMatch(.*)*',
      component: ErrorPage,
    },
  ],
});

export default router;
