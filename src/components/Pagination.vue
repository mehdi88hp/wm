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
        name: 'pagination',
        props: {

        },
        data() {
            return {
            }
        },
        computed: {},

        methods: {

        },
        created() {


        },
        destroyed() {

        },
        mounted() {

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    *:focus {
        outline: 0;
    }


</style>
