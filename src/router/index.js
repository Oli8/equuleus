import Vue from 'vue'
import Router from 'vue-router'

import Levels from '@/components/Levels.vue'
import Game from '@/components/Game.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'levels',
          component: Levels
        },
        {
          path: '/game/:level_id',
          name: 'Game',
          component: Game
        },
  ]
})
