import Vue from 'vue'
import vuetify from '../plugins/vuetify'

new Vue({
  vuetify,
}).$mount('#app')

// Task Component
// ********************************
Vue.component('todo-task', {
    props: ['task'],
    template: `
    <li class="c-list__item">
        <i class="far fa-square c-list__icon"></i>
        <span class="c-list__text">{{ task.text }}</span>
        <i class="fas fa-trash-alt c-list__icon"></i>
    </li>
    `
})
new Vue({
    el: '#todo-list',
    data: {
        tasks: [
            {
                id: 1,
                text: 'sample todo1',
                isEdit: false,
                isDone: false
            },
            {
                id: 2,
                text: 'sample todo2',
                isEdit: false,
                isDone
            }
        ]
    }
})
