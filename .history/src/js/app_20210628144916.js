import Vue from 'vue'
import vuetify from '../plugins/vuetify'

new Vue({
  vuetify,
})

// Task Component
// ********************************
Vue.component('todo-task', {
    props: ['task'],
    template: `
    <li class="c-list__item">
        <i class="far fa-square c-list__icon"></i>
        <span v-show="!task.isEdit" @click="$emit('edit')" class="c-list__text">{{ task.text }}</span>
        <input v-show="task.isEdit" class="c-list__input" type="text" v-model="task.text">
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
                isDone: false
            }
        ]
    },
    methods: {
        handleEdit(id) {
            console.log(id);
            console.log(this.tasks[id]);
        }
    }
})
