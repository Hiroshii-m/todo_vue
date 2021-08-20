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
    <li v-show="task.isShow" class="c-list__item" :class="{ done: task.isDone }">
        <i @click="$emit('toggle')" class="far c-list__icon" :class='{ "fa-check-square": task.isDone, "fa-square": !task.isDone }' ></i>
        <span v-show="!task.isEdit" @click="$emit('edit')" class="c-list__text">{{ task.text }}</span>
        <input v-show="task.isEdit" @keydown.shift.enter="$emit('close-edit')" class="c-list__input" type="text" v-model="task.text">
        <i @click="$emit('remove')" class="fas fa-trash-alt c-list__icon"></i>
    </li>
    `
});

Vue.component('todo-app', require('./component/App.Vue').default);

// *********************************
// Vue Instance
// *********************************
// Task
// =================================
new Vue({
    el: '#js-app',
    
});

// header
// =================================
new Vue({
    el: '#l-header',
    data: {
        isShow: false
    },
    methods: {
        handleClickOpen() {
            const reverseShow = !this.isShow;
            this.isShow = reverseShow;
        },
        mouseover: function() {
            this.isShow = true;
        },
        mouseleave: function() {
            this.isShow = false;
        }
    }
});
