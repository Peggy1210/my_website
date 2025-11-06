<script setup>
const props = defineProps({
    searchbox: {
        type: Boolean,
        required: false,
        default: false
    },
    skills: {
        type: Array(String),
        required: true
    }
});
</script>

<template>
<div class="section-nav">
    <div class="title">Or find some specific keywords?</div>
    <div v-if="props.searchbox" class="searchbox">
        <input type="text" placeholder="Search..." />
    </div>
    <div class="chip-container">
        <div v-for="skill in props.skills" class="chip">{{ skill }}</div>

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
.section-nav .searchbox {
    display: flex;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    height: 48px;
    align-items: center;
    padding: 0 8px;
    margin-bottom: 32px;
}

.section-nav .searchbox input[type="text"] {
    flex: 1;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 10px 16px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 24px;
    transition: border-color 120ms ease;
}

.section-nav .searchbox input[type="text"]:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 4px rgba(25,118,210,0.06);
}

.section-nav .chip-container {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 48px 0;
}
.section-nav .chip-container .chip {
  padding: 6px 12px;
  background-color: #e3f2fd;
  color: #1976d2;
  border-radius: 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.section-nav .chip-container .chip:hover {
  padding: 6px 12px;
  background-color: #1976d2;
  color: #e3f2fd;
  border-radius: 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}
</style>