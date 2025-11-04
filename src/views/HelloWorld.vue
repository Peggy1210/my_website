<script setup>
import Profile from '../components/Profile.vue'
import Publication from '../components/Publication.vue'
import Project from '../components/Project.vue'
import Education from '../components/Education.vue'
import Experience from '../components/Experience.vue'
import SideProject from '../components/SideProject.vue'
</script>

<template>
  <div class="root">
    <Profile />
    <Education />
    <Experience />
    <Publication />
    <Project />
    <SideProject />
  </div>
</template>

<style scoped>
.root {
  padding: 120px 160px;
}
</style> 