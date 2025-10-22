<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- HEADER -->
    <header class="mb-8">
      <h1 class="text-3xl font-black mb-2">{{ fieldName }} Categories</h1>
      <p class="text-gray-600">Browse all categories and subcategories in the {{ fieldName }} field</p>
    </header>

    <!-- LOADING STATE -->
    <div v-if="loading" class="text-center py-8">
      <p>Loading categories...</p>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="text-center py-8 bg-red-50 border border-red-200 rounded">
      <p class="text-red-700 font-semibold">⚠️ Unable to load categories</p>
      <p class="text-red-600 text-sm">{{ error }}</p>
    </div>

    <!-- CATEGORIES LIST -->
    <div v-else class="space-y-6">
      <div v-for="category in categories" :key="category.id" class="border rounded-lg p-4">
        <h2 class="text-xl font-bold mb-2">{{ category.name }}</h2>
        <p class="text-gray-600 mb-3">{{ category.description }}</p>
        
        <!-- SUBCATEGORIES (placeholder) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <router-link 
            v-for="subcategory in category.subcategories" 
            :key="subcategory.id"
            :to="`/category/${subcategory.slug}`"
            class="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            {{ subcategory.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- BACK LINK -->
    <div class="mt-8 pt-4 border-t">
      <router-link 
        to="/" 
        class="text-blue-600 hover:text-blue-800 underline"
      >
        ← Back to Recent 3
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldView',
  data() {
    return {
      loading: true,
      error: null,
      fieldName: '',
      categories: []
    }
  },
  async mounted() {
    await this.loadFieldData();
  },
  watch: {
    '$route'() {
      this.loadFieldData();
    }
  },
  methods: {
    async loadFieldData() {
      try {
        this.loading = true;
        this.error = null;
        
        const fieldSlug = this.$route.params.slug;
        
        // Use dynamic API base URL that works in both local and Codespace environments
        const apiBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : `${window.location.protocol}//${window.location.hostname.replace(/-3000\./, '-8000.')}`;
        
        // For now, create placeholder data based on field slug
        // TODO: Replace with actual API call when field/category endpoints are ready
        this.fieldName = this.formatFieldName(fieldSlug);
        this.categories = this.getPlaceholderCategories(fieldSlug);
        
        this.loading = false;
      } catch (error) {
        console.error('Error loading field data:', error);
        this.error = error.message;
        this.loading = false;
      }
    },
    
    formatFieldName(slug) {
      return slug.charAt(0).toUpperCase() + slug.slice(1);
    },
    
    getPlaceholderCategories(fieldSlug) {
      // Placeholder categories for each field
      const placeholderData = {
        business: [
          { id: 1, name: 'Marketing', description: 'Advertising and promotional ideas', subcategories: [
            { id: 11, name: 'Digital Marketing', slug: 'digital-marketing' },
            { id: 12, name: 'Print Advertising', slug: 'print-advertising' },
            { id: 13, name: 'Viral Campaigns', slug: 'viral-campaigns' }
          ]},
          { id: 2, name: 'Finance', description: 'Money and investment concepts', subcategories: [
            { id: 21, name: 'Cryptocurrency', slug: 'cryptocurrency' },
            { id: 22, name: 'Banking', slug: 'banking' },
            { id: 23, name: 'Investment', slug: 'investment' }
          ]}
        ],
        computer: [
          { id: 1, name: 'Software', description: 'Applications and programs', subcategories: [
            { id: 11, name: 'Mobile Apps', slug: 'mobile-apps' },
            { id: 12, name: 'Web Development', slug: 'web-development' },
            { id: 13, name: 'AI & Machine Learning', slug: 'ai-ml' }
          ]},
          { id: 2, name: 'Hardware', description: 'Physical computing devices', subcategories: [
            { id: 21, name: 'Processors', slug: 'processors' },
            { id: 22, name: 'Storage', slug: 'storage' },
            { id: 23, name: 'Peripherals', slug: 'peripherals' }
          ]}
        ],
        fashion: [
          { id: 1, name: 'Clothing', description: 'Garments and apparel', subcategories: [
            { id: 11, name: 'Casual Wear', slug: 'casual-wear' },
            { id: 12, name: 'Formal Wear', slug: 'formal-wear' },
            { id: 13, name: 'Sportswear', slug: 'sportswear' }
          ]},
          { id: 2, name: 'Accessories', description: 'Fashion accessories', subcategories: [
            { id: 21, name: 'Jewelry', slug: 'jewelry' },
            { id: 22, name: 'Bags', slug: 'bags' },
            { id: 23, name: 'Shoes', slug: 'shoes' }
          ]}
        ]
      };
      
      return placeholderData[fieldSlug] || [
        { id: 1, name: 'General', description: `General ${fieldSlug} categories`, subcategories: [
          { id: 11, name: 'Category A', slug: 'category-a' },
          { id: 12, name: 'Category B', slug: 'category-b' },
          { id: 13, name: 'Category C', slug: 'category-c' }
        ]}
      ];
    }
  }
}
</script>