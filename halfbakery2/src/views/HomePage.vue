<template>
  <div class="home-page" :data-theme="currentTheme">
    <!-- HEADER -->
    <header class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 class="text-2xl font-bold">halfbakery</h1>
        <p class="italic text-sm">The halfway house for at-risk ideas</p>
      </div>
      <div class="mt-3 md:mt-0 space-x-2">
        <button @click="switchTheme('classic')" class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">🕰️ Classic</button>
        <button @click="switchTheme('dark')" class="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600">🌙 Dark</button>
        <button @click="switchTheme('clean')" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">🌿 Clean</button>
        <button @click="switchTheme('colorful')" class="px-3 py-1 rounded bg-gradient-to-r from-sky-400 to-violet-500 text-white hover:opacity-90">🎨 Colorful</button>
      </div>
    </header>

    <!-- SEARCH -->
    <div class="mb-6 flex flex-col sm:flex-row items-center gap-3">
      <input 
        v-model="searchTerm" 
        @input="filterIdeas" 
        placeholder="🔍 Search ideas or categories..."
        class="border border-gray-400 rounded px-3 py-2 w-full sm:w-1/2"
      >
      <p class="text-sm text-gray-500 italic">Type to filter instantly</p>
    </div>

    <!-- INTRO -->
    <p class="mb-6 max-w-3xl">Ideas are divided into major categories. Ideas in <b>bold</b> were created this week.</p>

    <!-- MAIN GRID -->
    <div v-if="loading" class="text-center py-8">
      <p>Loading ideas...</p>
    </div>
    
    <div v-else-if="apiError" class="text-center py-8 bg-red-50 border border-red-200 rounded">
      <p class="text-red-700 font-semibold">⚠️ A problem occurred</p>
      <p class="text-red-600 text-sm">Unable to connect to the backend server (port 5000)</p>
      <p class="text-red-600 text-sm">Please start the backend server to see ideas</p>
    </div>
    
    <div v-else class="category-grid">
      <div 
        v-for="category in filteredCategories" 
        :key="category.name" 
        class="category"
        v-show="category.visible"
      >
        <h2>{{ category.name }}</h2>
        <ul>
          <li 
            v-for="idea in category.visibleIdeas" 
            :key="idea.id"
            :class="{ 'font-bold': idea.isUnread }"
          >
            <router-link :to="`/idea/${idea.id}`" @click="console.log('Clicking idea ID:', idea.id)">{{ idea.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="mt-10 pt-4 text-sm">
      <div class="flex flex-wrap gap-2 mb-2">
        <router-link 
          v-for="field in fields" 
          :key="field._id"
          :to="`/field/${field.slug}`"
          class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-xs text-gray-800 hover:text-gray-900 no-underline"
        >
          {{ field.name.toLowerCase() }}
        </router-link>
      </div>
      <p>
        <router-link to="/" class="underline">back: main index</router-link> | 
        <a href="#" class="underline">[more]</a>
      </p>
    </footer>
  </div>
</template>

<script>
import categoriesData from '../data/categories.json'

export default {
  name: 'HomePage',
  data() {
    return {
      currentTheme: 'classic',
      searchTerm: '',
      categoriesConfig: categoriesData,
      loading: true,
      apiError: false,
      fields: [],
      categories: []
    }
  },
  computed: {
    filteredCategories() {
      if (!this.searchTerm) {
        return this.categories.map(category => ({
          ...category,
          visible: true,
          visibleIdeas: category.ideas
        }));
      }

      const term = this.searchTerm.toLowerCase();
      return this.categories.map(category => {
        const categoryMatch = category.name.toLowerCase().includes(term);
        const visibleIdeas = category.ideas.filter(idea => 
          idea.title.toLowerCase().includes(term)
        );
        
        return {
          ...category,
          visible: categoryMatch || visibleIdeas.length > 0,
          visibleIdeas: categoryMatch ? category.ideas : visibleIdeas
        };
      });
    },
    categoryTags() {
      return this.categoriesConfig.fields
        .filter(field => field.isActive)
        .sort((a, b) => a.order - b.order)
        .map(field => field.name.toLowerCase());
    }
  },
  async mounted() {
    await this.loadFieldsWithIdeas();
  },
  methods: {
    async loadFieldsWithIdeas() {
      try {
        this.loading = true;
        
        // Use dynamic API base URL that works in both local and Codespace environments
        const apiBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : `${window.location.protocol}//${window.location.hostname.replace(/-3000\./, '-8000.')}`;
        
        // Fetch fields from API
        const fieldsResponse = await fetch(`${apiBase}/api/fields`);
        const fields = await fieldsResponse.json();
        
        // Fetch recent ideas for each field
        const fieldsWithIdeas = await Promise.all(
          fields.map(async (field) => {
            const ideasResponse = await fetch(`${apiBase}/api/fields/${field._id}/recent-ideas`);
            const ideas = await ideasResponse.json();
            
            return {
              name: field.name,
              ideas: ideas.map(idea => ({
                id: idea._id,
                title: idea.title,
                isUnread: this.isIdeaUnread(idea)
              }))
            };
          })
        );
        
        this.categories = fieldsWithIdeas;
        this.fields = fields;
        this.loading = false;
      } catch (error) {
        console.error('Error loading data:', error);
        this.loading = false;
        this.apiError = true;
        this.categories = []; // No fallback data
      }
    },
    
    isIdeaUnread(idea) {
      // Placeholder - will implement proper read tracking later
      return Math.random() > 0.5; // Random for now
    },
    
    switchTheme(theme) {
      this.currentTheme = theme;
    },
    
    filterIdeas() {
      // This is handled by the computed property
    }
  }
}
</script>

<style scoped>
/* === THEMES === */
[data-theme='classic'] {
  background-color: #f3f2e9;
  color: #222;
  font-family: "Verdana", sans-serif;
}
[data-theme='classic'] h2 {
  background-color: #d4d3b8;
  color: #000;
  padding: 2px 8px;
}

[data-theme='dark'] {
  background-color: #0f172a;
  color: #f1f5f9;
  font-family: "Inter", sans-serif;
}
[data-theme='dark'] h2 {
  background-color: #1e293b;
  color: #38bdf8;
  border-left: 3px solid #38bdf8;
}

[data-theme='clean'] {
  background-color: #ffffff;
  color: #111;
  font-family: "Inter", sans-serif;
}
[data-theme='clean'] h2 {
  background-color: #f1f5f9;
  color: #111;
  border-left: 3px solid #475569;
}

[data-theme='colorful'] {
  background: linear-gradient(180deg, #fdfbfb 0%, #ebedee 100%);
  color: #1e293b;
  font-family: "Poppins", sans-serif;
}
[data-theme='colorful'] h2 {
  background: linear-gradient(90deg, #7dd3fc, #a78bfa);
  color: white;
  border-radius: 4px;
  padding: 3px 8px;
}

/* Common Layout */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.home-page {
  padding: 1.5rem;
  transition: all 0.5s ease;
}

li::before {
  content: "☞ ";
}
li {
  margin-left: 8px;
}

.category {
  transition: all 0.3s ease;
}

.category h2 {
  cursor: pointer;
  transition: all 0.2s ease;
}

.category h2:hover {
  opacity: 0.8;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}
</style>