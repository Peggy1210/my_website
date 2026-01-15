<script setup>
import { ref } from 'vue'
import { skills, useSkillSearch } from '../js/skillSearch'

const props = defineProps({
    searchbox: {
        type: Boolean,
        required: false,
        default: false
    }
});

const showModal = ref(false)
const searchQuery = ref('')
const searchResults = ref({})

function onSkillSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;
    
    searchQuery.value = q
    const searchResult = {}
    
    // for (const key in props.data) {
    //     searchResult[key] = props.data[key].filter(item => {
    //         const keywords = item.keywords || [];
    //         return keywords.some(keyword =>
    //             keyword.toLowerCase().includes(q)
    //         );
    //     });
    // }
    useSkillSearch(q).then(result => {
        searchResults.value = result
        showModal.value = true
        console.log('searchResult:', searchResult)
    }).catch(err => {
        console.error('Error during skill search:', err)
    })
}

function closeModal() {
    showModal.value = false
}
</script>

<template>
<div class="section-nav">
    <div class="title">Or find some specific keywords?</div>
  <div v-if="props.searchbox" class="searchbox">
    <input type="text" placeholder="Search..." @keyup.enter="onSkillSearch($event.target.value)" />
  </div>
    <div class="chip-container">
        <div
          v-for="skill in skills"
          :key="skill"
          class="chip"
          role="button"
          tabindex="0"
          @click="onSkillSearch(skill)"
        >
          {{ skill }}
        </div>

    </div>
</div>

<!-- Search Results Modal -->
<Transition name="modal">
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header">
        <h2>Search Results for "{{ searchQuery }}"</h2>
        <button @click="closeModal" class="close-btn" aria-label="Close modal">
          <i class="mdi mdi-close"></i>
        </button>
      </div>

      <!-- Modal Body with Results -->
      <div class="modal-body">
        <div v-for="(items, category) in searchResults" :key="category" class="result-category">
          <h3 v-if="items.length > 0" class="category-title">{{ category }} ({{ items.length }})</h3>
          <div v-if="items.length > 0" class="result-items">
            <div v-for="(item, idx) in items" :key="idx" class="result-item">
              <div class="item-title">
                {{ item.title || item.name || 'Untitled' }}
                <a
                    v-if="item.links || item.doi"
                    :href="item.links ||item.doi"
                    class="item-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    >
                    <i class="mdi mdi-open-in-new"></i>
                </a>
              </div>
              <div v-if="item.description" class="item-description">{{ item.description }}</div>
              <div v-if="item.keywords" class="item-keywords">
                <span v-for="kw in item.keywords" :key="kw" class="keyword-tag">
                  <span class="highlight" v-if="kw.toLowerCase().includes(searchQuery.toLowerCase())">
                    {{ kw }}
                  </span>
                  <span v-else>{{ kw }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="Object.values(searchResults).every(arr => arr.length === 0)" class="no-results">
          <i class="mdi mdi-magnify"></i>
          <p>No results found for "{{ searchQuery }}"</p>
        </div>
      </div>
    </div>
  </div>
</Transition>

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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms ease;
}

.close-btn:hover {
  background: #e0e0e0;
}

.close-btn i {
  font-size: 24px;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.result-category {
  margin-bottom: 32px;
}

.category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 16px;
  text-transform: capitalize;
}

.result-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.item-link {
  margin-left: 4px;
  color: #999;
  text-decoration: none;
  font-size: 1rem;
}
.result-item:hover .item-link,
.result-item:focus-within .item-link {
  color: #1976d2;
}

.item-description {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.5;
}

.item-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.keyword-tag {
  padding: 4px 10px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 0.85rem;
}

.keyword-tag .highlight {
  font-weight: 600;
  color: #1976d2;
  background: #ffeb3b;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.no-results i {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.no-results p {
  font-size: 1.1rem;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 300ms ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content {
  transform: scale(0.9) translateY(-20px);
}

.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

/* Responsive */
@media (max-width: 640px) {
  .modal-content {
    max-height: 90vh;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-header h2 {
    font-size: 1.2rem;
  }
  
  .modal-body {
    padding: 16px;
  }
}
</style>