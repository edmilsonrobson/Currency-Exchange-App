<template>
    <div class="div">
        <div class="field has-addons">
            <div class="control">
                <label for="amount"></label>
                <input min="0" max="9007199254740991" id="amount" v-model="amount" class="input" type="number"
                       :placeholder="this.currency + ' amount...'">
            </div>
            <div class="control">
                <a @click="fetchExchange(amount)" class="button is-info">
                    Calculate
                </a>
            </div>
            <div class="control">
                <a @click="forceError()" class="button is-danger">
                    Force Error
                </a>
            </div>
        </div>

        <div v-show="!broken">
            <br>
            <p v-if='this.amount' class="is-size-6">
                <b>{{ amount }} {{ currency }} is equivalent to...</b>
            </p>
            <p v-else class="is-size-6 has-text-danger">
                <b>Please insert an amount (in {{ currency }})</b>
            </p>
            <br>
        </div>
        <div v-show="!loading && !broken">
            <table class="table is-fullwidth">
                <thead>
                <tr>
                    <th v-for="supportedCurrency in otherCurrencies">{{ supportedCurrency }}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td v-for="newAmount in exchangeList">{{ newAmount.toFixed(2) }}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-if="loading && !broken" class="has-text-centered">
            <br>
            <sync-loader :loading="true" color="#4c4c6e"></sync-loader>
            <br>
        </div>

        <div v-if="broken" class="has-text-centered">
            <p class="has-text-grey-light is-size-3">
                I broke. Sorry! :(
            </p>
            <p class="has-text-grey-light is-size-3">
                Try calculating again?
            </p>
        </div>
    </div>
</template>

<script>
    import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
    import axios from 'axios';

    export default {
        props: {
            currency: {type: String, required: true},
            defaultAmount: {type: Number, default: 1},
            supportedCurrencies: {type: Array, required: true},
        },

        components: {
            SyncLoader
        },

        computed: {
            otherCurrencies() {
                return this.supportedCurrencies.filter(someCurrency => (someCurrency !== this.currency));
            }
        },

        data() {
            return {
                amount: this.defaultAmount,
                exchangeList: [],
                loading: false,
                broken: false,
            }
        },

        mounted() {
            this.exchangeList = this.fetchExchange(this.amount);
        },

        methods: {
            forceError(){
                this.triggerError(new Error("This is a sample error. Oh no!"));
            },

            triggerError(error) {
                swal("Something terrible happened!", 'Quickly, call my programmer!\n\nThe error was:\n\n' + error.message, 'error');
                this.broken = true;
            },

            fetchExchange(baseAmount) {
                this.broken = false;
                const that = this;
                baseAmount = parseFloat(baseAmount);
                if(isNaN(baseAmount)) {
                    swal("Bad input, friend!", 'Did you insert a number?', 'warning');
                    return;
                }
                this.loading = true;
                if (this.currency) {
                    // Shameless artificial loading because of reasons :P
                    return setTimeout(function () {
                        axios.get('http://api.fixer.io/latest?base=' + that.currency)
                            .then(response => response.data.rates)
                            .then(rates => {
                                const updatedRates = {};
                                for (let key in rates) {
                                    if (rates.hasOwnProperty(key) && that.supportedCurrencies.includes(key)) {
                                        updatedRates[key] = rates[key] * baseAmount;
                                    }
                                }
                                const associativeArray = [];
                                for(let property in updatedRates){
                                    associativeArray[property] = updatedRates[property];
                                }
                                associativeArray.sort();
                                that.exchangeList = updatedRates;
                            })
                            .catch(error => {
                                that.triggerError(error);
                            })
                            .then(() => {
                                that.loading = false;
                            });
                    }, 1000);
                }
                this.loading = false;
            }
        },
    }
</script>