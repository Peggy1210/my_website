<script setup>
import { computed } from 'vue'
import updatesData from '../data/updates.json'
const updates = computed(() => {
  return updatesData.map(u => ({
    ...u,
    imageUrl: new URL(`../assets/updates_img/${u.image}`, import.meta.url).href
  }))
})
</script>

<template>
<div class="section" id="update-section">
    <h2>Quick Updates</h2>
    <div class="updates-list">
    <!-- Add update items here -->
    <div class="updates-item" v-for="(u, i) in updates" :key="i">
        <img class="updates-img" :src="u.imageUrl" :alt="`Update ${i}`" />
        <p class="updates-description"><span class="update-description-title">{{ u.dates }}</span>{{ u.description }}</p>
    </div>
    </div>
</div>
</template>

<style scoped>
.section {
    margin-top: 40px;
}

.updates-list {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 16px;
}

.updates-item {
  /* make three equal columns; allow children to clip overflow */
  flex: 1 1 0;
  min-width: 0; /* allow flex items to shrink properly */
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms;
}
.updates-item:hover,
.updates-item:focus,
.updates-item:focus-within {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.updates-img {
  width: 100%;
  height: 200px; /* fixed display height */
  object-fit: cover; /* crop the image to fill the box */
  display: block;
}

.updates-description {
  padding: 0px 12px;
  font-size: 0.95rem;
  color: #555;
}

.update-description-title {
  font-weight: 600;
  margin-right: 4px;
}
</style>