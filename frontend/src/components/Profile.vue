<script setup>
import { computed } from 'vue'
import FlashCard from './FlashCard.vue'
import profileImagesData from '../data/profile_img.json'

// Convert image filenames to full paths
const profileImages = computed(() => {
  return profileImagesData.map(filename => {
    return new URL(`../assets/profile_img/${filename}`, import.meta.url).href
  })
})
</script>

<template>
<div class="profile">
    <div class="profile-description">
      <div class="title">Hi! I'm Peggy!</div>
      <div class="subtitle">ML Engineer • Software Engineer • Data Scientist</div>
      <div class="statement">
          I'm an active learner deeply passionate about <b>Machine Learning and Data Engineering</b>. 
          I have experience working with big data, natural language processing, and full-stack 
          development, and love building AI solutions to solve real-world problems.
      </div>
      <div class="statement">
          Not long ago, I realized my resume alone couldn't fully capture my enthusiasm 
          and dedication. So, I created this personal website to quickly 
          showcase my skills, experiences, and commitment. This website is a <b>living portfolio</b> 
          that will be continuously updated as I grow in my career. It's great to see you 
          here! I hope you have a delightful time exploring my workspace :D
      </div>
      <div class="contact-icons">
          <a href="https://www.linkedin.com/in/peggy-huang/" target="_blank"><i class="mdi mdi-linkedin"></i></a> 
          <a href="https://github.com/Peggy1210" target="_blank"><i class="mdi mdi-github"></i></a>
          <a href="mailto:peichi@umich.edu"><i class="mdi mdi-email-outline"></i></a>
      </div>
    </div>
    <FlashCard :images="profileImages" :autoplay="4000" />
</div>
</template>

<style scoped>
.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  text-align: left;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.profile-description {
  max-width: calc(100% - 400px);
}

.profile .title {
  /* responsive heading */
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.profile .subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.profile .statement {
  margin-top: 10px;
  margin-bottom: 12px;
  color: #444;
}

.contact-icons {
  display: flex;
  flex-direction: row;
}

.contact-icons a {
  margin-right: 32px;
  color: inherit;
  text-decoration: none;
  font-size: 1.4rem;
  color: #1976d2;
}

@media (max-width: 1000px) {
  .profile {
    flex-direction: column;
  }

  .profile-description {
    max-width: 100%;
  }
}
</style>
