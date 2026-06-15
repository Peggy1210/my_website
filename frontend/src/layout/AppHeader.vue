<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import { loadAnalyticsSummary } from '@/services/analytics'

dayjs.extend(relativeTime)
dayjs.extend(utc)
const VITE_BUILD_TIME = import.meta.env.VITE_BUILD_TIME

const messages = [
  'people hiring me today?',
  'people should hire me today',
  'people deciding my fate today',
  'people judging me today',
]

const randomMessage =
  messages[Math.floor(Math.random() * messages.length)]

const totalUsers = ref(0)
const todayUsers = ref(0)

onMounted(async () => {
  const data = await loadAnalyticsSummary()
  totalUsers.value = data.totalUsers
  todayUsers.value = data.todayUsers
})
</script>

<template>
    <header class="site-header">
        <p class="title">Peggy's Workspace</p>
        <div class="spanner"></div>
        <div class="header-content">
            <div class="status">Last updated {{ dayjs.utc(VITE_BUILD_TIME).local().fromNow() }}<span class="collapsible-status"> • {{ todayUsers }} {{ randomMessage }}</span></div>
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

@media (max-width: 767px) {
    .header-content .collapsible-status {
        display: none;
    }
}
</style>