import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Lading from '@/pages/lading';
import Wrong from '@/pages/404';
import Teacher from '@/pages/teacher/index';
import Profile from '@/pages/profile/index';
import Class from '@/pages/class/index';
import ClassManage from '@/pages/class-manage/index';
import Add from '@/pages/class-manage/components/add.vue';
import AdminManage from '@/pages/admin-manage/index';
import StudentManage from '@/pages/admin-manage/components/student-manage.vue';
import TeacherManage from '@/pages/admin-manage/components/teacher-manage.vue';
import ManagerManage from '@/pages/admin-manage/components/manager-manage.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/lading',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/lading',
      name: 'Lading',
      component: Lading,
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher,
    },
    {
      path: '/class',
      name: 'Class',
      component: Class,
    },
    {
      path: '/404',
      name: 'Wrong',
      component: Wrong,
    },
    {
      path: '/profile/:job/:id',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/class-manage',
      name: 'ClassManage',
      component: ClassManage,
    },
    {
      path: '/add',
      name: 'Add',
      component: Add,
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Add,
    },
    {
      path: '/admin-manage',
      name: 'AdminManage',
      component: AdminManage,
      children: [
        {
          path: 'student-manage',
          component: StudentManage,
        },
        {
          path: 'teacher-manage',
          component: TeacherManage,
        },
        {
          path: 'manager-manage',
          component: ManagerManage,
        },
      ]
    }
  ],
});
