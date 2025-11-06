<script setup>
import projects from '../data/project.json'
</script>

<template>
<div class="section" id="projects-section">
  <h2>Projects</h2>
  <div class="card-container">
    <div class="card-items">
      <div class="card-item" v-for="(proj, idx) in projects" :key="idx">
      <div class="card-label" v-if="proj.label">{{ proj.label }}</div>
        <div class="card-body">
          <p class="title">
            {{ proj.title }}
            <a
            v-if="proj.links"
            :href="proj.links"
            class="proj-link"
            target="_blank"
            rel="noopener noreferrer"
            @click.stop
            >
            <i class="mdi mdi-open-in-new"></i>
            </a>
          </p>
          <p class="subtitle">{{ proj.keywords.slice(0, 5).join('∙') }} | {{ proj.dates }}</p>
          <div class="content">
          <ul>
            <li v-for="(point, idx) in proj.points" :key="idx">{{ point }}</li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.section {
  margin-top: 40px;
}
.card-container {
  position: relative;
}
.card-items {
  display: block;
}
.card-item {
  position: relative;
  margin-bottom: 22px;
}
.card-body {
  background: #fff;
  border: 1px solid #ececec;
  padding: 0 24px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms;
}
.card-body:hover,
.card-body:focus,
.card-body:focus-within {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}
.proj-link {
  display: inline-block;
  color: #999;
  padding-left: 4px;
  font-size: 1.2rem;
}
.card-item:hover .proj-link,
.card-item:focus-within .proj-link {
  color: #1976d2;
}
.card-body .title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0px;
}
.card-body .subtitle {
  font-size: 1rem;
  color: #888;
  margin-top: 4px;
  margin-bottom: 4px;
}
.card-body .content {
    margin-bottom: 24px
}
.card-label {
  position: absolute;
  left: -140px;
  right: auto;
  top: 24px;
  width: 120px;
  font-size: 1rem;
  color: red;
  text-align: right;
  z-index: 10;
}

@media (max-width: 900px) {
  .card-label {
    left: auto;
    right: -10px;
    top: -20px;
    transform: rotate(30deg);
  }
}
</style>