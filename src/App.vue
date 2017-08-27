<template>
    <div id="app">
        <hero-section>
            <p slot="title">Currency Exchange App</p>
            <p slot="subtitle">Made with <a href="https://vuejs.org/" target="_blank"
                                            class="has-text-success">Vue.js 2</a>
                and <span class="has-text-danger">♥</span> by <b><a
                        href="https://github.com/edmilsonrobson/" target="_blank" class="has-text-warning">Edmilson Rocha</a></b></p>
        </hero-section>
        <div class="container">
            <div class="section">
                <div class="box">
                    <tab-list>
                        <tab v-for="(currency, index) in supportedCurrencies" :key="`currency-${index}`"
                             :name="currency" :currency="currency" :selected="index == 0">
                            <currency-exchange-panel :currency="currency" :supported-currencies="supportedCurrenciesOrdered"></currency-exchange-panel>
                        </tab>
                    </tab-list>
                </div>
            </div>
        </div>

        <app-footer></app-footer>
    </div>
</template>

<script>

    import CurrencyExchangePanel from './components/CurrencyExchangePanel.vue';
    import HeroSection from './components/HeroSection.vue';
    import TabList from './components/TabList.vue';
    import AppFooter from './components/AppFooter.vue';
    import Tab from './components/Tab.vue';

    export default {
        name: 'app',

        components: {
            HeroSection, TabList, Tab, CurrencyExchangePanel, AppFooter
        },

        data() {
            return {
                supportedCurrencies: ['USD', 'AUD', 'BRL', 'CAD', 'GBP', 'JPY'],
            }
        },

        computed: {
            supportedCurrenciesOrdered() {
                return this.supportedCurrencies.sort();
            }
        },

    }
</script>

<style lang="scss">
    @import './sass/app.scss';
</style>
