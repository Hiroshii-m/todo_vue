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

