import Vue from 'vue'
import Router from 'vue-router'
import mobile from '../pages/mobile'
import kiosk from '../pages/kiosk'
import main from '../pages/main'
import Map from '../pages/Map'
import map_user from '../pages/map_user'
import register from '../pages/register'
import login from '../pages/login'
import admin from '../pages/admin'
import toapp from '../pages/toapp'
import add from '../pages/add'
Vue.use(Router)

const router = new Router({
  mode: "history", // 브라우저의 HTML5 History 모드를 사용합니다.
  routes: [{
      path: '/', // 루트 경로
      component: main // App 컴포넌트를 표시합니다.
    },
    {
      path:'/add',
      component :add
    },
    {
      path:'/kiosk',
      component :kiosk
    },
    {
      path: '/mobile', // /mobile 경로
      component: mobile // mobile 컴포넌트를 표시합니다.
    },
    {
      path: '/toapp', // /mobile 경로
      component: toapp // mobile 컴포넌트를 표시합니다.
    },
    {
      path: '/map',
      name: 'map',
      component: Map // 변경된 부분
    },
    {
      path: '/map_user',
      name: 'map_user',
      component: map_user // 변경된 부분
    },

    {
      path: '/mobile/register', // /mobile 경로
      component: register // mobile 컴포넌트를 표시합니다.
    },
    {
      path: '/mobile/login', // /mobile 경로
      component: login // mobile 컴포넌트를 표시합니다.
    },
    {
      path: '/admin', // /mobile 경로
      component: admin // mobile 컴포넌트를 표시합니다.
    },

  ]
});

export default router;
