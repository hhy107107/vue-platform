import Vue from 'vue'
import Router from 'vue-router'
import note from '../view/note.vue'
import comment from '../view/App.vue'
import noteDiary from '../view/note/diary.vue'
import noteEssay from '../view/note/essay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: comment
    },
    {
      path: '/note',
      name: 'note',
      component: note,
      redirect: '/diary',
      children: [
        {path: '/diary', component: noteDiary},
        {path: '/essay', component: noteEssay}
      ]
    }
  ]
})
