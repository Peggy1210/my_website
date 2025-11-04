<script setup>
import Profile from '../components/Profile.vue'
import Publication from '../components/Publication.vue'
import Project from '../components/Project.vue'
import Education from '../components/Education.vue'
</script>

<template>
  <div class="root">
    <Profile />
    <Education />
    <Publication />
    <Project />
  </div>
</template>

<style scoped>
.root {
  padding: 120px 160px;
}
</style> 