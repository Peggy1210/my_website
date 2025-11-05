<script setup>
const props = defineProps({
    nextSectionId: {
        type: String,
        required: true
    }
});
const scrollTo = (sectionId) => {
  // Scroll to the divider if present, otherwise scroll one viewport height
  const el = document.querySelector(`#${sectionId}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }
};
</script>

<template>
<div class="section-nav">
    <button class="scroll-button" @click="scrollTo(nextSectionId)" aria-label="Scroll down">
    <i class="mdi mdi-chevron-down"></i>
    </button>
</div>
</template>

<style scoped>
.section-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  padding: 16px;
}
.scroll-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(180deg,#ffffff,#f1f1f1);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 140ms ease, box-shadow 140ms ease;
  color: #333;
}

.scroll-button:hover { transform: translateY(-3px); box-shadow: 0 6px 14px rgba(0,0,0,0.12); }
.scroll-button:active { transform: translateY(0); }
.scroll-button:focus { outline: 3px solid rgba(21,156,228,0.18); outline-offset: 3px; }

/* subtle bounce animation to draw attention */
@keyframes scroll-bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
  60% { transform: translateY(-3px); }
}
.scroll-button { animation: scroll-bounce 2.6s infinite; }
</style>