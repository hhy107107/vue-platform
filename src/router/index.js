import Vue from 'vue'
import Router from 'vue-router'
import note from '../view/note.vue'
import comment from '../view/App.vue'
import noteDiary from '../view/note/diary.vue'
import noteEssay from '../view/note/essay.vue'
import addNote from '../view/note/addNote.vue'
import noteDetail from '../view/note/noteDetail.vue'
import testHeight from '../view/note/testHeight.vue'
import chat from '../view/chat.vue'
import chatManager from '../view/chatManager.vue'
import mine from '../view/mine.vue'
import personal from '../view/mine/personal.vue'
import account from '../view/mine/account.vue'

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
    },
    {path: '/addNote', component: addNote},
    {path: '/noteDetail', component: noteDetail},
    {path: '/testHeight', component: testHeight},
    {path: '/chat', component: chat},
    {path: '/chatManager', component: chatManager},
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      redirect: '/personal',
      children: [
        {path: '/personal', component: personal},
        {path: '/account', component: account}
      ]
    }
  ]
})
