<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <h3>Page Layouts</h3>
      <ul class="layout-links">
        <li><router-link to="/recent" class="layout-link">Recent Ideas</router-link></li>
        <li><router-link to="/top-rated" class="layout-link">Top Rated</router-link></li>
        <li><router-link to="/most-discussed" class="layout-link">Most Discussed</router-link></li>
        <li><router-link to="/random" class="layout-link">Random Walk</router-link></li>
        <li><router-link to="/by-category" class="layout-link">By Category</router-link></li>
        <li><router-link to="/alphabetical" class="layout-link">Alphabetical</router-link></li>
      </ul>
    </div>
    
    <div class="sidebar-section">
      <h3>My Layouts</h3>
      <ul class="layout-links">
        <li v-if="!isLoggedIn" class="login-prompt">
          <a href="/login">Login to see your layouts</a>
        </li>
        <li v-else>
          <a href="/my-ideas" class="layout-link">My Ideas</a>
          <a href="/my-annotations" class="layout-link">My Annotations</a>
          <a href="/create-layout" class="layout-link">+ Create Layout</a>
        </li>
      </ul>
    </div>
    
    <div class="sidebar-section">
      <h3>Categories</h3>
      <ul class="category-links">
        <li><a href="/category/general" class="category-link">General</a></li>
        <li><a href="/category/transportation" class="category-link">Transportation</a></li>
        <li><a href="/category/food" class="category-link">Food</a></li>
        <li><a href="/category/technology" class="category-link">Technology</a></li>
        <li><a href="/category/home" class="category-link">Home & Garden</a></li>
        <li><a href="/category/business" class="category-link">Business</a></li>
        <li><a href="/category/other" class="category-link">Other</a></li>
      </ul>
    </div>
    
    <div class="sidebar-section">
      <h3>AI Search</h3>
      <div class="search-box">
        <textarea 
          v-model="searchQuery" 
          placeholder="Ask me to find ideas..."
          rows="3"
          class="ai-search-input"
        ></textarea>
        <button @click="performAISearch" class="search-btn">
          Smart Search
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isLoggedIn: false, // TODO: Connect to auth store
      searchQuery: ''
    }
  },
  methods: {
    performAISearch() {
      if (this.searchQuery.trim()) {
        // TODO: Implement AI search functionality
        console.log('AI Search:', this.searchQuery);
        // Navigate to AI search results
        this.$router.push({ 
          path: '/ai-search', 
          query: { q: this.searchQuery } 
        });
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f5f5f0;
  border: 1px solid #ddd;
  padding: 15px;
  font-size: 13px;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-section h3 {
  font-size: 16px;
  color: #654321;
  margin-bottom: 10px;
  border-bottom: 1px solid #d0d0c0;
  padding-bottom: 5px;
}

.layout-links,
.category-links {
  list-style: none;
  padding: 0;
}

.layout-links li,
.category-links li {
  margin-bottom: 5px;
}

.layout-link,
.category-link {
  color: #654321;
  text-decoration: none;
  display: block;
  padding: 3px 5px;
  border-radius: 2px;
}

.layout-link:hover,
.category-link:hover {
  background-color: #e8e8e0;
  text-decoration: underline;
}

.login-prompt {
  font-style: italic;
  color: #888;
}

.search-box {
  margin-top: 10px;
}

.ai-search-input {
  width: 100%;
  resize: vertical;
  font-family: inherit;
  font-size: 12px;
  margin-bottom: 8px;
}

.search-btn {
  width: 100%;
  background-color: #e8e8e0;
  border: 1px solid #ccc;
  padding: 6px;
  font-size: 12px;
}

.search-btn:hover {
  background-color: #d0d0c0;
}

/* Responsive design */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>