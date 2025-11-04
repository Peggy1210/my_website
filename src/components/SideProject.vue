<script setup>
import { computed } from 'vue'
import sideProjectData from '../data/side-project.json'
const sideProjects = computed(() => {
  return sideProjectData.map(s => ({
    ...s,
    imageUrl: new URL(`../assets/side_project_img/${s.image}`, import.meta.url).href
  }))
})
</script>

<template>
<div class="section" id="side-section">
    <h2>More from me...</h2>
    <div class="small-card-container small">
    <div class="small-card-items">
        <div class="small-card-item" v-for="(proj, idx) in sideProjects" :key="idx">
        <img class="small-card-image" :src="proj.imageUrl" :alt="`Project ${idx}`" />
        <div class="small-card-body">
            <p class="title">{{ proj.title }}</p>
            <div class="content" v-for="(p, i) in proj.points" :key="i">
            {{ p }}
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<style scoped>
.small-card-container {
  position: relative;
}

.small-card-items {
  column-count: 3;
  column-gap: 12px;
  margin-top: 16px;
}
.small-card-item {
  display: inline-block; /* required for column layout */
  width: 100%;
  margin: 0 0 12px 0; /* vertical gap between items */
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ccc;
  background: #fff;
}

/* Responsive column counts */
@media (max-width: 900px) {
  .small-card-items { column-count: 2; }
}

@media (max-width: 560px) {
  .small-card-items { column-count: 1; }
}
.small-card-label {
  position: absolute;
  left: -140px;
  top: 24px;
  width: 120px;
  font-size: 1rem;
  color: red;
  text-align: right;
}

.small-card-body {
  padding: 0 24px;
}

.small-card-image {
  width: 100%;
  height: 100%; /* fixed display height */
  object-fit: cover; /* crop the image to fill the box */
  display: block;
}
.small-card-body .title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0px;
}
.small-card-body .title .supplemental {
  font-size: 0.9rem;
  color: #999;
  font-weight: 400;
  margin-left: 16px;
}
.small-card-body .subtitle {
  font-size: 1rem;
  color: #666;
  margin-top: 4px;
  margin-bottom: 4px;
}
.small-card-body .content {
  margin-bottom: 28px;
  color: #666
}
</style>