import Vue from 'vue'
import Router from 'vue-router'
// import note from '../view/note.vue'
// import comment from '../view/App.vue'
// import noteDiary from '../view/note/diary.vue'
import noteEssay from '../view/note/essay.vue'
import addNote from '../view/note/addNote.vue'
import noteDetail from '../view/note/noteDetail.vue'
import testHeight from '../view/note/testHeight.vue'
import chat from '../view/chat.vue'
import chatManager from '../view/chatManager.vue'
import mine from '../view/mine.vue'
import personal from '../view/mine/personal.vue'
import account from '../view/mine/account.vue'
import home from '../view/home.vue'
import login from '../view/login.vue'
import register from '../view/register.vue'
import noteSquare from '../view/note/noteSquare.vue'
import proficient from '../view/note/proficient.vue'
import proficientApply from '../view/note/proficientApply.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: home
    },
    // {
    //   path: '/note',
    //   name: 'note',
    //   component: note,
    //   redirect: '/essay',
    //   children: [
    //     {path: '/diary', component: noteDiary},
    //     {path: '/essay', component: noteEssay}
    //   ]
    // },
    {path: '/essay', component: noteEssay},
    {path: '/addNote', component: addNote},
    {path: '/noteDetail', component: noteDetail},
    {path: '/testHeight', component: testHeight},
    {path: '/chat', component: chat},
    {path: '/chatManager', component: chatManager},
    {path: '/mine', component: mine},
    {path: '/home', component: home},
    {path: '/login', component: login},
    {path: '/register', component: register},
    {path: '/personal', component: personal},
    {path: '/account', component: account},
    {path: '/noteSquare', component: noteSquare},
    {path: '/proficient', component: proficient},
    {path: '/proficientApply', component: proficientApply}
  ]
})
