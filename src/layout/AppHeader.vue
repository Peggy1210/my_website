<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
dayjs.extend(relativeTime)
dayjs.extend(utc)
const VITE_BUILD_TIME = import.meta.env.VITE_BUILD_TIME
</script>

<template>
    <header class="site-header">
        <p class="title">Peggy's Workspace</p>
        <div class="spanner"></div>
        <div class="header-content">
            <div class="status">Last update: {{ dayjs.utc(VITE_BUILD_TIME).local().fromNow() }}</div>
        </div>
    </header>
</template>

<style scoped>
.spanner {
    flex-grow: 1;
}
.site-header {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    text-align: left;
    height: 40px;
    padding: 10px 28px;
    background-color: white;
}

.site-header .title {
    font-size: 1em;
    font-weight: 700;
    margin-bottom: 5px;
    color: #2c3e50;
}

.site-header h1 {
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 5px;
}

.site-header p {
    font-size: 1.2em;
    color: #7f8c8d;
    margin: 0;
}

.header-content .status {
    font-size: 0.9em;
    color: #95a5a6;
}
</style>