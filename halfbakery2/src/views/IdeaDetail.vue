<template>
  <div class="idea-detail">
    <div v-if="loading" class="text-center py-8">
      <p>Loading idea...</p>
    </div>
    
    <div v-else-if="idea" class="max-w-4xl mx-auto">
      <header class="mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ idea.title }}</h1>
        <div class="text-sm text-gray-600 mb-2">
          <span>by {{ idea.authorId?.username || 'Unknown' }}</span>
          <span class="mx-2">•</span>
          <span>in {{ idea.fieldId?.name || 'Unknown Category' }}</span>
          <span class="mx-2">•</span>
          <span>{{ formatDate(idea.createdAt) }}</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="rating">
            <span v-if="idea.netScore > 0" class="text-green-600">
              {{ getPastryDisplay(idea.netScore) }}
            </span>
            <span v-else-if="idea.netScore < 0" class="text-red-600">
              {{ getFishboneDisplay(idea.netScore) }}
            </span>
            <span v-else class="text-gray-500">No votes yet</span>
          </div>
          
          <div v-if="idea.mfdFlags > 0" class="text-red-600 text-sm">
            🚩 Flagged for deletion ({{ idea.mfdFlags }} flags)
          </div>
          
          <button 
            @click="flagAsMFD"
            class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
            :disabled="flagging"
          >
            {{ flagging ? 'Flagging...' : 'Flag as MFD' }}
          </button>
        </div>
      </header>
      
      <main class="prose max-w-none">
        <div class="bg-gray-50 p-4 rounded mb-6">
          <h3>Summary</h3>
          <p>{{ idea.summary || idea.description.substring(0, 200) + '...' }}</p>
        </div>
        
        <div class="mb-6">
          <h3>Description</h3>
          <p>{{ idea.description }}</p>
        </div>
        
        <div v-if="idea.links && idea.links.length > 0" class="mb-6">
          <h3>Related Links</h3>
          <ul>
            <li v-for="link in idea.links" :key="link.url">
              <a :href="link.url" target="_blank" class="text-blue-600 hover:underline">
                {{ link.title }}
              </a>
              <p v-if="link.description" class="text-sm text-gray-600">{{ link.description }}</p>
            </li>
          </ul>
        </div>
      </main>
      
      <footer class="mt-8 pt-4 border-t">
        <router-link to="/" class="text-blue-600 hover:underline">← Back to Homepage</router-link>
      </footer>
    </div>
    
    <div v-else class="text-center py-8">
      <p>Idea not found.</p>
      <router-link to="/" class="text-blue-600 hover:underline">← Back to Homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IdeaDetail',
  data() {
    return {
      idea: null,
      loading: true,
      flagging: false
    }
  },
  async mounted() {
    await this.loadIdea();
  },
  methods: {
    async loadIdea() {
      try {
        // Use dynamic API base URL that works in both local and Codespace environments
        const apiBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : `${window.location.protocol}//${window.location.hostname.replace(/-3000\./, '-8000.')}`;
        
        const response = await fetch(`${apiBase}/api/ideas/${this.$route.params.id}`);
        if (response.ok) {
          this.idea = await response.json();
        } else {
          this.idea = null;
        }
      } catch (error) {
        console.error('Error loading idea:', error);
        this.idea = null;
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    
    getPastryDisplay(score) {
      const pastries = Math.floor(score / 4) || 1;
      return '🥐'.repeat(pastries) + ` (+${score})`;
    },
    
    getFishboneDisplay(score) {
      const fishbones = Math.floor(Math.abs(score) / 4) || 1;
      return '🦴'.repeat(fishbones) + ` (${score})`;
    },
    
    async flagAsMFD() {
      if (!confirm('Are you sure you want to flag this idea for deletion (MFD)?')) {
        return;
      }
      
      try {
        this.flagging = true;
        // Use dynamic API base URL that works in both local and Codespace environments
        const apiBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : `${window.location.protocol}//${window.location.hostname.replace(/-3000\./, '-8000.')}`;
        
        const response = await fetch(`${apiBase}/api/ideas/${this.idea._id}/flag-mfd`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: 'sample-user-id' }) // In real app, get from auth
        });
        
        if (response.ok) {
          const result = await response.json();
          alert(`Idea flagged successfully. Total flags: ${result.mfdFlags}`);
          // Reload the idea to show updated flag count
          await this.loadIdea();
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (error) {
        console.error('Error flagging idea:', error);
        alert('Error flagging idea');
      } finally {
        this.flagging = false;
      }
    }
  }
}
</script>

<style scoped>
.idea-detail {
  padding: 2rem;
}
</style>