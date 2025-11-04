<script setup>
import projects from '../data/project.json'
</script>

<template>
<div class="section">
    <h2>Projects</h2>
    <div class="card-container">
        <div class="card-items">
            <div class="card-item" v-for="(proj, idx) in projects" :key="idx">
                <div class="card-body">
                    <p class="title">{{ proj.title }}</p>
                    <p class="subtitle">{{ proj.keywords.join('∙') }} | {{ proj.dates }}</p>
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
.pub-link {
  display: inline-block;
  color: #999;
  padding-left: 4px;
  font-size: 1.2rem;
}
.card-item:hover .pub-link,
.card-item:focus-within .pub-link {
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
</style>