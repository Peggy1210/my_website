<script setup>
import { computed } from 'vue'
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
import NavButton from '../components/NavButton.vue'

const sectionIds = [
  { id: 'education-section', name: 'Education' },
  { id: 'experience-section', name: 'Experience' },
  { id: 'publications-section', name: 'Publications' },
  { id: 'projects-section', name: 'Projects' }
]

import skills from '../data/skills.json'
import sideProjectData from '../data/side-project.json'
import publications from '../data/publication.json'
import projects from '../data/project.json'
import updatesData from '../data/updates.json'
import experience from '../data/experience.json'
import educationData from '../data/education.json'

const sideProjects = computed(() => {
  return sideProjectData.map(s => ({
    ...s,
    imageUrl: new URL(`../assets/side_project_img/${s.image}`, import.meta.url).href
  }))
})

const updates = computed(() => {
  return updatesData.map(u => ({
    ...u,
    imageUrl: new URL(`../assets/updates_img/${u.image}`, import.meta.url).href
  }))
})

const educations = computed(() => {
  return educationData.map(e => ({
    ...e,
    imageUrl: new URL(`../assets/education_img/${e.logo}`, import.meta.url).href
  }))
})
</script>

<template>
  <div class="root">
    <Profile />
    <Navigation :sectionId="sectionIds" />
    <SkillSet
      :searchbox="true"
      :skills="skills"
      :data="{
        educations: educations,
        experience: experience,
        publications: publications,
        projects: projects,
        sideProjects: sideProjects
      }"
    />
    <Updates :updates="updates" />
    <NavButton :nextSectionId="'education-section'" />
    <Education :educations="educations" />
    <Experience :experience="experience" />
    <Publication :publications="publications" />
    <Project :projects="projects" />
    <SideProject :sideProjects="sideProjects" />
    <Fab />
  </div>
</template>

<style scoped>
.root {
  padding: 120px 160px;
  padding-bottom: 40px;
}

@media (max-width: 900px) {
  .root {
    padding: 80px 40px;
  }
}

@media (max-width: 560px) {
  .root {
    padding: 40px 20px;
  }
}
</style> 