<script setup>
import publications from '../data/publication.json'
</script>

<template>
<div class="section">
    <h2>Publications</h2>
    <div class="card-items">
        <div class="card-item" v-for="(pub, idx) in publications" :key="idx">
            <div class="card-body">
                <div class="title">{{ pub.title }}</div>
                <div class="subtitle">{{ pub.publisher }} | {{ pub.dates }}</div>
                <div class="content">
                  <ul>
                    <li v-for="(point, idx) in pub.points" :key="idx">{{ point }}</li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.section {
  margin-top: 80px;
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
  padding: 24px 28px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.card-body .title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.card-body .subtitle {
  font-size: 1rem;
  color: #888;
  margin-bottom: 16px;
}
.card-body .content {
}
</style>