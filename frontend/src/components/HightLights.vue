<script setup>
import { ref } from 'vue'
import { skills, useSkillSearch } from '../js/skillSearch'
import { formatJsonString } from '../js/utils'

const props = defineProps({
    highlights: {
        type: Array,
        required: true
    }
});
</script>

<template>
<div class="section-nav">
    <div class="title">Highlights</div>

    <div class="highlights-list" ref="updatesList">
        <div class="highlights-item" v-for="(h, i) in props.highlights" :key="i">
            <div class="highlights-title" :style="{ color: h.color }">
                <i :class="h.icon"></i>
                {{ h.title }}
            </div>
            <div class="h-divider"></div>
            <div v-if="h.type === 'bullet-points'" class="highlights-bullet-points">
              <ul>
                <li v-for="(item, j) in h.content" :key="j" v-html="formatJsonString(item)"></li>
              </ul>
            </div>
            <div v-if="h.type === 'list'" class="highlights-content" v-html="formatJsonString(h.content.join(' ∙ '))"></div>
            <div v-if="h.type === 'text'" class="highlights-content" v-html="formatJsonString(h.content)"></div>
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

.highlights-list {
  display: grid;
  flex-direction: row;
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 80%;
}

@media (max-width: 1800px) {
  .highlights-list {
    width: 100%;
  }
}

@media (max-width: 1000px) {
  .highlights-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .highlights-list {
    grid-template-columns: 1fr;
  }
}

.highlights-item {
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  
  padding: 16px 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms;
}

.highlights-item:hover,
.highlights-item:focus,
.highlights-item:focus-within {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.highlights-title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
}

.highlights-content {
  text-align: center;
  font-size: 1rem;
  color: #555;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
}

.highlights-bullet-points {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  color: #555;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
}

.highlights-bullet-points ul {
  margin: 0;
  padding-left: 1.2rem;
  list-style-position: outside;
  text-align: center;
}

.highlights-bullet-points li {
  margin: 0;
}
</style>