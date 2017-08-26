<template>
    <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    <slot name="title"></slot>
                </h1>
                <h2 class="subtitle">
                    <slot name="subtitle"></slot>
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {

    }
</script>