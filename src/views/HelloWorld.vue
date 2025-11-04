<script setup>
import Profile from '../components/Profile.vue'
import Publication from '../components/Publication.vue'
import Project from '../components/Project.vue'
import Education from '../components/Education.vue'
import Experience from '../components/Experience.vue'
import SideProject from '../components/SideProject.vue'
import Updates from '../components/Updates.vue'
import Fab from '../components/Fab.vue'
</script>

<template>
  <div class="root">
    <Profile />
    <Updates />
    <Education />
    <Experience />
    <Publication />
    <Project />
    <SideProject />
    <Fab />
  </div>
</template>

<style scoped>
.root {
  padding: 120px 160px;
}
</style> 