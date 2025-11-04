<script setup>
import publications from '../data/publication.json'

// Open publication URL in a new tab when Enter is pressed or the link is clicked
function openPublication(url) {
  if (!url) return
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
<div class="section">
  <h2>Publications</h2>
  <div class="card-container">
    <div class="card-items">
      <div
        class="card-item"
        v-for="(pub, idx) in publications"
        :key="idx"
        tabindex="0"
        role="group"
        @keydown.enter.prevent="openPublication(pub.url)"
      >
        <div class="card-label" v-if="pub.label">{{ pub.label }}</div>
        <div class="card-body">
          <p class="title">
            {{ pub.title }}
            <a
              v-if="pub.doi"
              :href="pub.doi"
              class="pub-link"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
              >
              <i class="mdi mdi-open-in-new"></i>
            </a>
          </p>
          <p class="subtitle">{{ pub.publisher }} | {{ pub.dates }}</p>
          <div class="content">
            <ul>
              <li v-for="(point, pidx) in pub.points" :key="pidx">{{ point }}</li>
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
  margin-bottom: 24px;
}
.card-label {
  position: absolute;
  left: -140px;
  top: 24px;
  width: 120px;
  font-size: 1rem;
  color: red;
  text-align: right;
}
</style>