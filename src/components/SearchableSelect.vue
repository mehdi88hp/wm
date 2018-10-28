<template>

    <div class="dropDown">
        <div class="row">
            <input id="search_input" class="form-control" type="text" :placeholder="title" v-model="search"
                   @mousedown="openDropDown()" @input="doSearch()"/>
        </div>
        <div class="dropDown-content" :class="{ 'd-none': !dropDown_opened }">
            <a class="dropDown-row text-right" v-for="(option, key) in searchedOptions" :key="option+key"
               :data-value="option.value" @click="Choose(option.value)">
                {{ option.key }}
            </a>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'searchable_select',
        props: {
            options: Array,
            title: String,
            value: String,
        },
        data() {
            return {
                search: '',
                chosen: '',
                dropDown_opened: false,

                searchedOptions: [],
            }
        },
        computed: {},

        methods: {
            doSearch: function () {

                const array = [];
                const word = document.getElementById('search_input').value;

                let i = 0;
                for (i; i < this.options.length; i++) {
                    if (this.options[i].key.search(new RegExp(word, "i")) > -1) {
                        array.push(this.options[i]);
                    }
                }

                this.searchedOptions = array;
            },

            openDropDown: function () {
                this.dropDown_opened = true;
            },

            Choose: function (value) {
                this.$emit('choose', value);
                this.dropDown_opened = false;
                this.chosen = value;
                this.search = value;
            },

            documentClick: function (event) {
                if (document.getElementById('search_input') !== event.target) {
                    this.dropDown_opened = false;

                    this.search = this.chosen;
                }
            },
        },
        created() {
            document.addEventListener('click', this.documentClick);

        },
        destroyed() {
            document.removeEventListener('click', this.documentClick);
        },
        mounted() {
            this.search = this.chosen = this.value;
            this.searchedOptions = this.options;
        },
    }
</script>

<style scoped>

    *:focus {
        outline: 0;
    }

    .dropDown {
        position: relative;
        display: inline-block;
    }

    .dropDown-content {
        right: 0;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 230px;
        width: 100%;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        z-index: 1;
        max-height: 300px;
        overflow-y: auto;
    }

    .dropDown-content a {
        color: black;
        padding: 15px;
        font-size: 12px;
        text-decoration: none;
        display: block;

        -o-transition: .3s;
        -ms-transition: .3s;
        -moz-transition: .3s;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .dropDown-content a:hover {
        cursor: pointer;
        color: white;
        background-color: #6c757d;
    }
</style>
