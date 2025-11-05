<script setup>
const props = defineProps({
    sectionId: {
        type: Array({
            id: String,
            name: String
        }),
        required: true,
        default: () => []
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
    <div class="title">Check these out!</div>
    <div class="container">
        <div
            v-for="section in sectionId"
            :key="section.id"
            class="nav"
            role="button"
            tabindex="0"
            @click="scrollTo(section.id)">
            #{{ section.name }}
            <span class="nav-icon" aria-hidden="true">↗</span>
        </div>
    </div>
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
.section-nav .title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 40px;
}
.section-nav .container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  margin-left: 24px;
}
.section-nav .nav {
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  color: #1976d2;
  text-decoration: none;
  transition: color 120ms ease, background-color 120ms ease, transform 120ms ease;
}
.section-nav .nav:hover,
.section-nav .nav:focus {
  color: #0d47a1;
  cursor: pointer;
  background-color: rgba(25,118,210,0.04);
  transform: translateY(-2px);
  outline: none;
}

.section-nav .nav:focus {
  box-shadow: 0 0 0 4px rgba(25,118,210,0.08);
}

.section-nav .nav-icon {
  display: inline-block;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 140ms ease, transform 140ms ease;
  font-size: 0.95rem;
  color: currentColor;
}
.section-nav .nav:hover .nav-icon,
.section-nav .nav:focus .nav-icon {
  opacity: 1;
  transform: translateX(0);
}
</style>