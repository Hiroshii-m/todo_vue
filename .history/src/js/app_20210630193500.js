import Vue from 'vue';
import vuetify from '../plugins/vuetify';
import _ from 'lodash';

new Vue({
  vuetify,
})

// ********************************
// Component
// ********************************
// Task
// ================================
Vue.component('todo-task', {
    props: ['task'],
    template: `
    <li class="c-list__item" :class="{ done: task.isDone }">
        <i @click="$emit('toggle')" class="far c-list__icon" :class='{ "fa-check-square": task.isDone, "fa-square": !task.isDone }' ></i>
        <span v-show="!task.isEdit" @click="$emit('edit')" class="c-list__text">{{ task.text }}</span>
        <input v-show="task.isEdit" @keydown.shift.enter="$emit('close-edit')" class="c-list__input" type="text" v-model="task.text">
        <i @click="$emit('remove')" class="fas fa-trash-alt c-list__icon"></i>
    </li>
    `
});

// *********************************
// Vue Instance
// *********************************
// Todo List
// =================================
new Vue({
    el: '#js-app',
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
        ],
        addText: ''
    },
    methods: {
        // 編集モードをtrueへ変更する
        handleEdit(id) {
            this.tasks.filter(function(el) {
                if(el.id === id) {
                    el.isEdit = true;
                }
            })
        },
        // 編集モードをfalseへ変更する
        handleCloseEdit(id) {
            this.tasks.filter(function(el) {
                if(el.id === id) {
                    el.isEdit = false;
                }
            })
        },
        // isDoneをtoggleする
        handleToggle(id) {
            this.tasks.filter(function(el) {
                if(el.id === id) {
                    const reverseDone = !el.isDone;
                    el.isDone = reverseDone;
                }
            })
        },
        handleRemove(id) {
            const data = _.reject(this.tasks, {'id': id});
            this.tasks = data;
        },
        // テキストを追加する
        handleAddText() {
            console.log(this.addText);
        }
    }
});
// Add Form
// =================================
// new Vue({
//     el: '#l-addTask',
//     data: {
//         addText: ''
//     },
//     methods: {
//         handleAddTask() {
//             console.log(this.addText);
//         }
//     }
// });

