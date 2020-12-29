<template>
<v-btn :type="type" :class="mode">
    <slot></slot>
</v-btn>
</template>

<script>
export default {
    props: ["type", "mode"]
}
</script>

<style scoped>
v-btn{
    padding: 0.75rem;
    background-color: red;
    color: white;
    cursor: pointer;
}
</style>