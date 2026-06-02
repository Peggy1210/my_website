<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    sideProjects: {
        type: Array,
        required: true
    }
});

// Responsive column-based layout (left-to-right ordering).
// We split items into N columns (round-robin) so visual order is
// left-to-right then top-to-bottom while allowing variable heights.
const containerRef = ref(null)
const columnsCount = ref(3)
let raf = null

function rafUpdateColumns() {
  if (raf) cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    updateColumns()
    raf = null
  })
}

function calcCols(width) {
  if (width <= 480) return 1
  if (width <= 768) return 2
  return 3
}

function updateColumns() {
  const el = containerRef.value
  if (!el) return
  const w = el.clientWidth || window.innerWidth
  columnsCount.value = calcCols(w)
}

let ro = null
onMounted(() => {
  updateColumns()
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => rafUpdateColumns())
    if (containerRef.value) ro.observe(containerRef.value)
  } else {
    // Fallback
    window.addEventListener('resize', rafUpdateColumns)
  }
})
onBeforeUnmount(() => {
  if (ro && containerRef.value) ro.unobserve(containerRef.value)
  window.removeEventListener('resize', rafUpdateColumns)
  if (raf) cancelAnimationFrame(raf)
})

const columns = computed(() => {
  const cols = Array.from({ length: Math.max(1, columnsCount.value) }, () => [])
  props.sideProjects.forEach((item, i) => {
    const idx = i % cols.length
    cols[idx].push(item)
  })
  return cols
})

function openProject(url) {
  if (!url) return
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
<div class="section" id="side-section">
    <h2>More from me...</h2>
    <div class="small-card-container">
      <div class="small-card-items" ref="containerRef">
        <!-- render N columns left-to-right -->
        <div class="small-card-column" v-for="(col, cidx) in columns" :key="cidx">
          <div
            class="small-card-item"
            v-for="(proj, idx) in col"
            :key="`${cidx}-${idx}`"
            tabindex="0"
            role="group"
            @keydown.enter.prevent="openProject(proj.url)"
          >
            <img class="small-card-image" :src="proj.imageUrl" :alt="proj.title || `Project ${idx}`" />
            <div class="small-card-body">
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
              <div class="content" v-for="(p, i) in proj.points" :key="i">
                  {{ p }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="small-card-endmsg">More projects coming soon!</div>
    </div>
    
</div>
</template>

<style scoped>
.small-card-container {
  position: relative;
}

.small-card-endmsg {
  position: relative;
  text-align: center;
  margin-top: 24px;
  font-size: 1.2rem;
  color: #888;

  font-weight: 600; /* Made slightly bolder so the shine is more visible */
  
  /* 1. Setup the gradient background */
  background: linear-gradient(
    to right, 
    #888 20%, 
    #fff 40%, 
    #ffdf00 50%, /* A touch of gold/yellow, or use #fff for pure silver/white shine */
    #fff 60%, 
    #888 80%
  );
  background-size: 200% auto;
  
  /* 2. Clip the background to the text */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* 3. Animate the gradient movement */
  animation: shine 3s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: 0% center;
  }
}

.small-card-items {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  align-items: start;
}
.small-card-column {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.small-card-item {
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  position: relative;
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms;
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
  height: 180px; /* fixed display height */
  object-fit: cover; /* crop the image to fill the box */
  display: block;
}
.small-card-item:hover,
.small-card-item:focus,
.small-card-item:focus-within {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

/* Floating 'Visit' link (initially hidden) */
.proj-link {
  display: inline-block;
  color: #999;
  padding-left: 4px;
  font-size: 1.2rem;
}

.small-card-item:hover .proj-link,
.small-card-item:focus-within .proj-link {
  color: #1976d2;
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