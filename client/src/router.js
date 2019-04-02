import Vue from 'vue'
import Router from 'vue-router'
import Runs from './views/Runs.vue'
import Fours from './views/Fours.vue'
import Sixes from './views/Sixes.vue'
import ManOfTheMatch from './views/ManOfTheMatch.vue'
import SuccessfulTeams from './views/SuccessfulTeams.vue'
import Toss from './views/Toss.vue'
import Decision from './views/Decision.vue'
import Dots from './views/Dots.vue'
import Extras from './views/Extras.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'runs',
      component: Runs
    },
    {
      path: '/fours',
      name: 'fours',
      component: Fours
    },
    {
      path: '/sixes',
      name: 'sixes',
      component: Sixes
    },
    {
      path: '/man-of-the-match',
      name: 'ManOfTheMatch',
      component: ManOfTheMatch
    },
    {
      path: '/successful-teams',
      name: 'SuccessfulTeams',
      component: SuccessfulTeams
    },
    {
      path: '/toss',
      name: 'Toss',
      component: Toss
    },
    {
      path: '/decision',
      name: 'Decision',
      component: Decision
    },
    {
      path: '/dots',
      name: 'Dots',
      component: Dots
    },
    {
      path: '/extras',
      name: 'Extras',
      component: Extras
    },
  
  ]
})
