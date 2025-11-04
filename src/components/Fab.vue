<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// FAB visible only when at least one element with class "section" is in viewport
const fabVisible = ref(false)
const fabExpanded = ref(false)

const toggleFab = () => {
  fabExpanded.value = !fabExpanded.value
}

const collapseFab = () => { fabExpanded.value = false }
const resumeUrl = '/public/Resume.pdf'

let intersectionObserver = null
let mutationObserver = null
const observedSections = new Map()

onMounted(() => {
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      observedSections.set(entry.target, entry.isIntersecting)
    })
    
    fabVisible.value = Array.from(observedSections.values()).some(isIntersecting => isIntersecting)
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  })

  const sections = document.querySelectorAll('.section')
  sections.forEach(section => intersectionObserver.observe(section))

  mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return
        if (node.classList && node.classList.contains('section')) {
          intersectionObserver.observe(node)
        }
        if (node.querySelectorAll) {
          const childSections = node.querySelectorAll('.section')
          childSections.forEach(section => intersectionObserver.observe(section))
        }
      })
    })
  })
  mutationObserver.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
  if (mutationObserver) {
    mutationObserver.disconnect()
    mutationObserver = null
  }
})
</script>

<template>
<div class="fab-wrapper" :class="{visible: fabVisible}" aria-hidden="false">
    <div class="fab-actions" :class="{expanded: fabExpanded}" role="menu" :aria-hidden="!fabExpanded">
    <a class="fab-action" href="mailto:peichi@umich.edu" @click="collapseFab" aria-label="Send email" role="menuitem"><i class="mdi mdi-email-outline"></i></a>
    <a class="fab-action" href="https://www.linkedin.com/in/peichi-huang-5033632b1" target="_blank" rel="noopener" aria-label="LinkedIn" role="menuitem"><i class="mdi mdi-linkedin"></i></a>
    <a class="fab-action" href="https://github.com/Peggy1210" target="_blank" rel="noopener" aria-label="GitHub" role="menuitem"><i class="mdi mdi-github"></i></a>
    <a class="fab-action" :href="resumeUrl" download @click="collapseFab" aria-label="Download resume" role="menuitem"><i class="mdi mdi-file-pdf-box"></i></a>
    </div>
    <button class="fab main" @click="toggleFab" :aria-expanded="fabExpanded" aria-haspopup="true" aria-label="Open quick actions">
    <i class="mdi" :class="fabExpanded ? 'mdi-close' : 'mdi-share-variant'"></i>
    </button>
</div>
</template>

<style scoped>
.fab-wrapper {
  position: fixed;
  right: 60px;
  bottom: 60px;
  z-index: 80;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transform: translateX(120%);
  opacity: 0;
  transition: transform 360ms cubic-bezier(.2,.9,.2,1), opacity 360ms ease;
  pointer-events: none; /* disable while hidden */
}
.fab-wrapper.visible {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}
.fab-actions {
  display: flex;
  flex-direction: column-reverse; /* render top-to-bottom when expanded */
  gap: 10px;
  align-items: center;
}
.fab-action {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: none;
  background: #fff;
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
  text-decoration: none;
  opacity: 0;
  transform: translateY(8px) scale(.96);
  transition: opacity 220ms ease, transform 220ms ease;
  pointer-events: none;
}
.fab-actions.expanded .fab-action {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.fab.main {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(180deg,#1976d2,#1565c0);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(21,101,192,0.18);
  cursor: pointer;
}
.fab.main:focus { outline: 3px solid rgba(21,156,228,0.12); }
.fab-action:focus { outline: 2px solid rgba(21,156,228,0.14); }

@media (max-width: 560px) {
  .fab-wrapper { right: 12px; bottom: 16px; }
  .fab.main { width: 48px; height: 48px; }
  .fab-action { width: 40px; height: 40px; }
}
</style>