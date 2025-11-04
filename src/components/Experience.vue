<script setup>
import experience from '../data/experience.json'
</script>

<template>
<div class="section">
    <h2>Experience</h2>
    <div class="timeline-container">
        <div class="timeline-line" aria-hidden="true"></div>
        <div class="timeline-items">
            <div class="timeline-item" v-for="(exp, idx) in experience" :key="idx">
                <div class="timeline-marker" aria-hidden="true"></div>
                <div class="timeline-card-body">
                    <p class="title">{{ exp.title }}</p>
                    <p class="subtitle">{{ exp.company }} | {{ exp.dates }}</p>
                    <div class="content">
                      <ul>
                        <li v-for="(point, idx) in exp.points" :key="idx">{{ point }}</li>
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
.timeline-container {
  position: relative;
  padding-left: 28px;
}
.timeline-line {
  position: absolute;
  left: 28px;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-right: 48px;
  background: #e8e8e8;
}
.timeline-items {
  display: block;
}
.timeline-item {
  position: relative;
  margin-bottom: 22px;
  padding-left: 32px;
}
.timeline-marker {
  position: absolute;
  left: -10px;
  top: 28px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1976d2;
  border: 3px solid #fff;
  box-shadow: 0 0 0 6px rgba(25,118,210,0.06);
}
.timeline-card-body {
  background: #fff;
  border: 1px solid #ececec;
  padding: 0 24px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms;
}
.timeline-card-body:hover,
.timeline-card-body:focus,
.timeline-card-body:focus-within {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}
.timeline-card-body .title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0px;
}
.timeline-card-body .subtitle {
  font-size: 1rem;
  color: #888;
  margin-top: 4px;
  margin-bottom: 4px;
}
.timeline-card-body .content {
    margin-bottom: 24px
}
</style>