import cat2Alias from '../data/skills.json';

function normalize(s) {
  return s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function expandQuery(q) {
  q = normalize(q);
  const expanded = new Set([q]);
  for (const [cat, aliases] of Object.entries(cat2Alias)) {
    let found = false;
    for (const alias of aliases) {
      const normalizedAlias = normalize(alias);
      if (normalizedAlias === q) {
        found = true;
        break;
      }
    }
    if (found) {
      aliases.forEach(x => expanded.add(normalize(x)));
    }
  }
  return [...expanded];
}

import sideProjectData from '../data/side-project.json'
import publicationData from '../data/publication.json'
import projectData from '../data/project.json'
import experienceData from '../data/experience.json'
import educationData from '../data/education.json'

const keywords = []
for (const item of [...sideProjectData, ...publicationData, ...projectData, ...experienceData, ...educationData]) {
  if (item.keywords) {
    item.keywords.forEach(k => {
      keywords.push(k);
    });
  }
}
const skills = keywords.sort(() => Math.random() - 0.5).slice(0, 30);

function matchesQuery(item, expandedQueries) {
  if (!item.keywords) return false;
  const keywords = item.keywords.map(normalize);
  return expandedQueries.some(q =>
    keywords.some(kw => kw === q)
  );
}

function useSkillSearch(q) {
  const expandedQueries = expandQuery(q);

  let results = {
    "Experience": experienceData.filter(item => matchesQuery(item, expandedQueries)),
    "Publications": publicationData.filter(item => matchesQuery(item, expandedQueries)),
    "Projects": projectData.filter(item => matchesQuery(item, expandedQueries)),
    "Side Projects": sideProjectData.filter(item => matchesQuery(item, expandedQueries)),
  };

  if (Object.values(results).every(arr => arr.length === 0)) {
    console.log("No results found for query:", q);
  } else {
    console.log("Search results:", results);
  }
  return Promise.resolve(results);
}

export { skills, useSkillSearch };