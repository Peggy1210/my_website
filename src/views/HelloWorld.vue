<script setup>
import Profile from '../components/Profile.vue'
import Publication from '../components/Publication.vue'
import Project from '../components/Project.vue'
import Education from '../components/Education.vue'
import Experience from '../components/Experience.vue'
import SideProject from '../components/SideProject.vue'
import Updates from '../components/Updates.vue'
import Fab from '../components/Fab.vue'
import Navigation from '../components/Navigation.vue'
import SkillSet from '../components/SkillSet.vue'

const sectionIds = [
  { id: 'education-section', name: 'Education' },
  { id: 'experience-section', name: 'Experience' },
  { id: 'publications-section', name: 'Publications' },
  { id: 'projects-section', name: 'Projects' }
]
</script>

<template>
  <div class="root">
    <Profile />
    <Navigation :sectionId="sectionIds" />
    <SkillSet />
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