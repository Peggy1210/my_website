<script setup>
import publications from '../data/publication.json'
</script>

<template>
<div class="section">
    <h2>Publications</h2>
    <div class="card-container">
        <div class="card-items">
            <div class="card-item" v-for="(pub, idx) in publications" :key="idx">
                <div class="card-body">
                    <p class="title">{{ pub.title }}</p>
                    <p class="subtitle">{{ pub.publisher }} | {{ pub.dates }}</p>
                    <div class="content">
                      <ul>
                        <li v-for="(point, idx) in pub.points" :key="idx">{{ point }}</li>
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
</style>