import DashboardCategory from '@/components/admin/DashboardCategory.vue';
import DashboardMainPanel from '@/components/admin/DashboardMainPanel.vue';
import DashboardPostPanel from '@/components/admin/DashboardPostPanel.vue';
import AdminPage from '@/views/AdminPage.vue';
import ErrorPage from '@/views/ErrorPage.vue';
import HomePage from '@/views/HomePage.vue';
import PostDetails from '@/views/PostDetails.vue';
import path from 'path';
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
      children: [
        {
          path: '',
          component: DashboardMainPanel,
          name: 'Main',
        },
        {
          path: 'posts',
          component: DashboardPostPanel,
          name: 'Posts',
        },

        {
          path: 'categories',
          component: DashboardCategory,
          name: 'Category',
        },
      ],
    },
    //Page not found component
    {
      path: '/:pathMatch(.*)*',
      component: ErrorPage,
    },
  ],
});

export default router;
