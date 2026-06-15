<template>
  <div class="flashcard-container">
    <div class="flashcard" v-if="images && images.length > 0">
      <div class="flashcard-image-wrapper">
        <transition :name="transitionName" mode="out-in">
          <img 
            :key="currentIndex" 
            :src="images[currentIndex]" 
            :alt="`Slide ${currentIndex + 1}`"
            class="flashcard-image"
            @error="handleImageError"
          />
        </transition>
      </div>

      <!-- Navigation Controls -->
      <div class="flashcard-controls">
        <button 
          @click="prev" 
          :disabled="currentIndex === 0 && !loop"
          class="control-btn prev-btn"
          aria-label="Previous slide"
        >
          <i class="mdi mdi-chevron-left"></i>
        </button>

        <!-- Indicator Dots -->
        <div class="flashcard-indicators">
          <button
            v-for="(img, index) in images"
            :key="index"
            @click="goToSlide(index)"
            :class="['indicator-dot', { active: index === currentIndex }]"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>

        <button 
          @click="next" 
          :disabled="currentIndex === images.length - 1 && !loop"
          class="control-btn next-btn"
          aria-label="Next slide"
        >
          <i class="mdi mdi-chevron-right"></i>
        </button>
      </div>

      <!-- Counter -->
      <div v-if="counter" class="flashcard-counter">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flashcard-empty">
      <p>No images to display</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  autoplay: {
    type: Number,
    default: null
  },
  loop: {
    type: Boolean,
    default: true
  },
  initialSlide: {
    type: Number,
    default: 0
  },
  counter: {
    type: Boolean,
    default: false
  }
})

const currentIndex = ref(props.initialSlide)
const isPlaying = ref(false)
const transitionName = ref('slide-next')
let autoplayTimer = null

// Navigate to previous slide
const prev = () => {
  transitionName.value = 'slide-prev'
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

// Navigate to next slide
const next = () => {
  transitionName.value = 'slide-next'
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

// Jump to specific slide
const goToSlide = (index) => {
  transitionName.value = index > currentIndex.value ? 'slide-next' : 'slide-prev'
  currentIndex.value = index
}

// Handle image load errors
const handleImageError = (event) => {
  console.error('Failed to load image:', props.images[currentIndex.value])
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E'
}

// Autoplay functionality
const startAutoplay = () => {
  if (props.autoplay && props.images.length > 1) {
    isPlaying.value = true
    autoplayTimer = setInterval(() => {
      next()
    }, props.autoplay)
  }
}

const stopAutoplay = () => {
  isPlaying.value = false
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prev()
  } else if (event.key === 'ArrowRight') {
    next()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (props.autoplay) {
    startAutoplay()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopAutoplay()
})

// Watch for changes in images prop
watch(() => props.images, () => {
  if (currentIndex.value >= props.images.length) {
    currentIndex.value = Math.max(0, props.images.length - 1)
  }
})
</script>

<style scoped>
.flashcard-container {
  width: 100%;
  max-width: 100%;
}

.flashcard {
  width: 100%;
  overflow: hidden;
}

.flashcard-image-wrapper {
  width: 80%;
  max-width: 80%;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.flashcard-image {
  /* Allow image to resize proportionally when constrained by max-height */
  max-width: 100%;
  max-height: 360px; /* Match wrapper max-height */
  display: block;
  object-fit: contain;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.flashcard-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 12px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms ease, opacity 200ms ease;
  flex-shrink: 0;
}

.control-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn i {
  font-size: 24px;
}

.flashcard-indicators {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #d0d0d0;
  cursor: pointer;
  transition: background 200ms ease, transform 200ms ease;
  padding: 0;
}

.indicator-dot:hover {
  background: #a0a0a0;
  transform: scale(1.2);
}

.indicator-dot.active {
  background: #1976d2;
  transform: scale(1.3);
}

.flashcard-counter {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
}

.autoplay-btn {
  position: absolute;
  bottom: 72px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms ease;
}

.autoplay-btn:hover {
  background: rgba(0,0,0,0.8);
}

.autoplay-btn i {
  font-size: 20px;
}

.flashcard-empty {
  padding: 60px 20px;
  text-align: center;
  color: #999;
  background: #f9f9f9;
  border-radius: 12px;
  border: 2px dashed #ddd;
}

/* Slide Transitions */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .flashcard-controls {
    padding: 12px;
  }

  .control-btn {
    width: 36px;
    height: 36px;
  }

  .control-btn i {
    font-size: 20px;
  }

  .flashcard-counter {
    font-size: 12px;
    padding: 4px 10px;
  }

  .indicator-dot {
    width: 6px;
    height: 6px;
  }
}
</style>
