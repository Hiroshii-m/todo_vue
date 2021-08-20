<template>
    <div id="l-addTask">
        <div class="c-addTask">
            <div class="c-addTask__form">
                <input v-model="addText" type="text" class="c-addTask__input" placeholder="ここに追加したいタスクを書く">
                <button @click="handleAddText" class="c-addTask__add">
                    <i class="fas fa-plus"></i>
                    追加
                </button>
            </div>
            <p v-show="isAddError" class="c-addTask__error">入力が空です</p>
        </div>
    </div>
    <div id="l-search">
        <div class="c-search">
            <i class="fas fa-search c-search__icon"></i>
            <input v-model="searchText" @keyup="handleSearch()" type="text" class="c-search__input" placeholder="ここに検索したいワードを入力してください">
        </div>
    </div>
    <div id="l-list">
        <ul id="todo-list" class="c-list">
            <todo-task
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @edit="handleEdit(task.id)"
                @close-edit="handleCloseEdit(task.id)"
                @toggle="handleToggle(task.id)"
                @remove="handleRemove(task.id)"
            ></todo-task>
        </ul>
    </div>
</template>

<script>
    export default {
        data: {
        tasks: [
            {
                id: 1,
                text: 'sample todo1',
                isEdit: false,
                isDone: false,
                isShow: true
            },
            {
                id: 2,
                text: 'sample todo2',
                isEdit: false,
                isDone: false,
                isShow: true
            }
        ],
        addText: '',
        isAddError: false,
        searchText: ''
    },
    methods: {
        createHashId() {
            return _.uniqueId('created_');
        },
        hasError() {
            this.isAddError = false;
            if(this.addText == '' || this.addText == null) {
                this.isAddError = true;
                return;
            }
        },
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
            this.hasError();
            
            if(this.isAddError === false) {
                const nextData = {id: this.createHashId(), text: this.addText, isEdit: false, isDone: false, isShow: true};
                this.tasks.push(nextData);
                this.addText = '';
            }
        },
        // 検索キーワードを元にタスクを検索する
        handleSearch() {
            const reg = new RegExp('^(?=.*' + this.searchText + ').*$', 'i');
            this.tasks.filter(function(el) {
                el.isShow = true;
                if(!reg.test(el.text)){
                    el.isShow = false;
                }
            });
        }
    }
    }
</script>