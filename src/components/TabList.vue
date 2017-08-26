<template>
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabList" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.currency }}</a>
                </li>
            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'TabList',

        data() {
            return {
                tabList: []
            };
        },

        methods: {

            selectTab(selectedTab) {
                this.tabList.forEach(tab => {
                    tab.isActive = (tab == selectedTab);
                })
            }
        },

        mounted() {
            this.tabList = this.$children;
        }
    }
</script>