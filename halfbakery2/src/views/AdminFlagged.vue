<template>
  <div class="admin-flagged">
    <header class="mb-6">
      <h1 class="text-3xl font-bold">Admin: Flagged Ideas (MFD)</h1>
      <p class="text-gray-600">Review ideas that have been flagged for deletion by users</p>
    </header>
    
    <div v-if="loading" class="text-center py-8">
      <p>Loading flagged ideas...</p>
    </div>
    
    <div v-else-if="flaggedIdeas.length === 0" class="text-center py-8">
      <p>No flagged ideas at this time.</p>
    </div>
    
    <div v-else class="space-y-6">
      <div 
        v-for="idea in flaggedIdeas" 
        :key="idea._id"
        class="border rounded-lg p-6 bg-white shadow-sm"
        :class="{
          'border-red-300 bg-red-50': idea.status === 'mfd',
          'border-yellow-300 bg-yellow-50': idea.mfdFlags > 0 && idea.status !== 'mfd'
        }"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-2">
              <router-link :to="`/idea/${idea._id}`" class="text-blue-600 hover:underline">
                {{ idea.title }}
              </router-link>
            </h3>
            <div class="text-sm text-gray-600 mb-2">
              <span>by {{ idea.authorId?.username || 'Unknown' }}</span>
              <span class="mx-2">•</span>
              <span>in {{ idea.fieldId?.name || 'Unknown Field' }}</span>
              <span class="mx-2">•</span>
              <span>{{ formatDate(idea.createdAt) }}</span>
            </div>
            <p class="text-gray-700 mb-3">{{ idea.summary || idea.description.substring(0, 200) + '...' }}</p>
          </div>
          
          <div class="ml-4 text-right">
            <div class="mb-2">
              <span class="inline-block px-2 py-1 rounded text-xs font-semibold"
                    :class="{
                      'bg-red-100 text-red-800': idea.status === 'mfd',
                      'bg-yellow-100 text-yellow-800': idea.status === 'active' && idea.mfdFlags > 0,
                      'bg-gray-100 text-gray-800': idea.status === 'archived'
                    }">
                {{ idea.status.toUpperCase() }}
              </span>
            </div>
            <div class="text-sm">
              <div>Net Score: {{ idea.netScore }}</div>
              <div class="font-semibold text-red-600">MFD Flags: {{ idea.mfdFlags }}</div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-2 pt-4 border-t">
          <button 
            @click="performAction(idea._id, 'delete')"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Delete
          </button>
          <button 
            @click="performAction(idea._id, 'archive')"
            class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
          >
            Archive
          </button>
          <button 
            @click="performAction(idea._id, 'clear-flags')"
            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Clear Flags
          </button>
        </div>
      </div>
    </div>
    
    <footer class="mt-8 pt-4 border-t">
      <router-link to="/" class="text-blue-600 hover:underline">← Back to Homepage</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AdminFlagged',
  data() {
    return {
      flaggedIdeas: [],
      loading: true
    }
  },
  async mounted() {
    await this.loadFlaggedIdeas();
  },
  methods: {
    async loadFlaggedIdeas() {
      try {
        // Use dynamic API base URL that works in both local and Codespace environments
        const apiBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : `${window.location.protocol}//${window.location.hostname.replace(/-3000\./, '-8000.')}`;
        
        const response = await fetch(`${apiBase}/api/admin/flagged-ideas`);
        this.flaggedIdeas = await response.json();
      } catch (error) {
        console.error('Error loading flagged ideas:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async performAction(ideaId, action) {
      try {
        // Use dynamic API base URL that works in both local and Codespace environments
        const apiBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : `${window.location.protocol}//${window.location.hostname.replace(/-3000\./, '-8000.')}`;
        
        const response = await fetch(`${apiBase}/api/admin/flagged-ideas/${ideaId}/action`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ action })
        });
        
        if (response.ok) {
          // Reload the list
          await this.loadFlaggedIdeas();
          alert(`Action '${action}' completed successfully`);
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error('Error performing action:', error);
        alert('Error performing action');
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  }
}
</script>

<style scoped>
.admin-flagged {
  padding: 2rem;
  max-width: 6xl;
  margin: 0 auto;
}
</style>