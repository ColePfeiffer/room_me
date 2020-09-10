<template>
    <div id="app">
        <!--        catch emit-->
        <AddTodo v-on:add-todo="addTodo"/>
        <!--
          v-bind: We are passing our data sas a prop to the component using v-bind
          v-on: We are catching an event that was sent-off and call a method.

          -->
        <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
        Blabla

    </div>
</template>

<script>
    // Components need to be imported and listed under Components
    import Todos from "../TodoItem/Todos";
    import AddTodo from "../TodoItem/AddTodo";
    import axios from "axios";

    export default {
        name: 'App',
        components: {
            Todos,
            AddTodo
        },
        // This stores our data
        data() {
            return {
                // It's accessable by using {{todo}}
                todos: []
            }
        },
        methods: {
            deleteTodo(id) {
                // filter loops through and it will return the array based on a condition
                // in this case everything but that one item
                //     axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
                //         .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
                //         .catch(err => console.log(err));
                // },

                this.todos = this.todos.filter(todo => todo.id !== id);
            },

            addTodo(newTodo) {
                const {title, completed} = newTodo;

                // Post request sends ur data and then returns you the new todo-list, including the new object
                axios.post("https://jsonplaceholder.typicode.com/todos",
                    {title, completed})
                    .then(res => this.todos = [...this.todos, res.data])
                    .catch(err => console.log(err));

                // Copying the existing array and adding the new item

            }
        },
        // once upon creation
        created() {
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
                // res = response, array wird damit gefüllt...
                .then(res => this.todos = res.data)
                .catch(err => console.log(err));
        }

    }
</script>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    /*body {*/
    /*    font-family: Arial, Helvetica, sans-serif;*/
    /*    line-height: 1.4;*/
    /*    color: #ff0000;*/
    /*    background-color: #22273a;*/
    /*}*/

    .btn {
        display: inline-block;
        border: none;
        background: #555;
        color: #fff;
        padding: 7px 20px;
        cursor: pointer;
    }

    .btn:hover {
        background: #666;
    }
</style>
