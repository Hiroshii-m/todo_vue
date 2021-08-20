import { reverse } from 'lodash'
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
    <li class="c-list__item" :class="{ c-list__item--done: isDone }">
        <i @click="$emit('toggle')" class="far c-list__icon fa-square" ></i>
        <span v-show="!task.isEdit" @click="$emit('edit')" class="c-list__text">{{ task.text }}</span>
        <input v-show="task.isEdit" @keydown.shift.enter="$emit('close-edit')" class="c-list__input" type="text" v-model="task.text">
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
        // 編集モードをtrueへ変更する
        handleEdit(id) {
            this.tasks.filter(function(el){
                if(el.id === id) {
                    el.isEdit = true;
                }
            })
        },
        // 編集モードをfalseへ変更する
        handleCloseEdit(id) {
            this.tasks.filter(function(el){
                if(el.id === id) {
                    el.isEdit = false;
                }
            })
        },
        // isDoneをtoggleする
        handleToggle(id) {
            this.tasks.filter(function(el){
                if(el.id === id) {
                    const reverseDone = !el.isDone;
                    el.isDone = reverseDone;
                }
            })
        }
    }
})
