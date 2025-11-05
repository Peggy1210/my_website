<script setup>
const skills = [
  "Machine Learning",
  "Data Engineering",
  "SQL",
  "Cloud Computing",
  "JavaScript",
  "Web Development",
  "AI",
  "Deep Learning",
  "C/C++",
  "C#",
  "Python",
  "JavaScript",
  "Java",
  "HTML",
  "CSS",
  "R",
  "Kotlin",
  "Google Cloud Platform",
  "GitHub",
  "git",
  "GitLab",
  "PyTorch",
  "Tensorflow",
  "scikit-learn",
  "keras",
  "spark",
  "CUDA",
  "EDA",
  "NLP",
  "UI/UX",
  "Data Analysis",
  "Data Science",
  "Data Visualization",
  "Microsoft Azure",
  "Distributed System"
]
</script>

<template>
<div class="section-nav">
    <div class="title">Or find some specific keywords?</div>
    <!-- <div class="searchbox">
        <input type="text" placeholder="Search..." />
    </div> -->
    <div class="chip-container">
        <div v-for="skill in skills" class="chip">{{ skill }}</div>

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
  display: block;
}
.section-nav .searchbox input[type="text"] {
  width: 600px;
  height: 24px;
  padding: 8px 24px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 24px;
  transition: border-color 120ms ease;
}

.section-nav .chip-container {
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 24px
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