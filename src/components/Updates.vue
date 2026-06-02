<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { formatJsonString } from '../js/utils'

const props = defineProps({
    updates: {
        type: Array,
        required: true
    }
});

const updatesList = ref(null);
let autoScrollInterval = null;

onMounted(() => {
    if (updatesList.value && props.updates.length > 3) {
        autoScrollInterval = setInterval(() => {
            const container = updatesList.value;
            const itemWidth = container.scrollWidth / props.updates.length;
            
            // Scroll by one item width
            container.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
            
            // Reset to start if we've reached the end
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                setTimeout(() => {
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }, 3000);
    }
});

onUnmounted(() => {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
});
</script>

<template>
<div class="section" id="update-section">
    <h2>Quick Updates</h2>

    <div class="updates-scroll">
      <div class="updates-list" ref="updatesList">
        <div class="updates-item" v-for="(u, i) in props.updates" :key="i">
          <img class="updates-img" :src="u.imageUrl" :alt="`Update ${i}`" />
          <p class="updates-description">
            <span class="update-description-title">{{ u.dates }}</span>
            <span v-html="formatJsonString(u.description)"></span>
          </p>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
.section {
    margin-top: 40px;
}

.updates-scroll {
  padding: 16px 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: thin;
}
.updates-list {
  display: flex;
  gap: 16px;
  margin-bottom: 0;
}

.updates-item {
  flex: 0 0 calc(33.333% - 12px);
  min-width: calc(33.333% - 12px);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms;
  scroll-snap-align: start;
}
.updates-item:hover,
.updates-item:focus,
.updates-item:focus-within {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

@media (max-width: 900px) {
  .updates-item {
    flex: 0 0 calc(50% - 12px);
    min-width: calc(50% - 12px);
  }
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