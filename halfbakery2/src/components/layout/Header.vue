<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <h1><router-link to="/" class="logo-link">halfbakery</router-link></h1>
      </div>
      
      <nav class="main-nav">
        <div class="nav-section">
          <span class="nav-label">idea:</span>
          <router-link to="/add" class="nav-link">add</router-link>
          <router-link to="/search" class="nav-link">search</router-link>
          <router-link to="/overview" class="nav-link">overview</router-link>
          <router-link to="/recent" class="nav-link">recent</router-link>
          <router-link to="/by-name" class="nav-link">by name</router-link>
          <router-link to="/random" class="nav-link">random</router-link>
        </div>
        
        <div class="nav-section">
          <span class="nav-label">meta:</span>
          <router-link to="/news" class="nav-link">news</router-link>
          <router-link to="/help" class="nav-link">help</router-link>
          <router-link to="/about" class="nav-link">about</router-link>
          <router-link to="/links" class="nav-link">links</router-link>
          <router-link to="/report" class="nav-link">report a problem</router-link>
        </div>
      </nav>
      
      <div class="user-section">
        <template v-if="isLoggedIn">
          <span>Welcome, {{ username }}!</span>
          <router-link to="/profile" class="nav-link">profile</router-link>
          <button @click="logout" class="logout-btn">logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">login</router-link>
          <router-link to="/register" class="nav-link">register</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false, // TODO: Connect to auth store
      username: 'baker123' // TODO: Connect to auth store
    }
  },
  methods: {
    logout() {
      // TODO: Implement logout functionality
      this.isLoggedIn = false;
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #e8e8e0;
  border-bottom: 2px solid #d0d0c0;
  padding: 10px 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-wrap: wrap;
}

.logo h1 {
  margin: 0;
  font-size: 28px;
  color: #654321;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.main-nav {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-label {
  font-weight: bold;
  color: #654321;
  margin-right: 5px;
}

.nav-link {
  color: #654321;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 3px;
}

.nav-link:hover {
  background-color: #d0d0c0;
  text-decoration: underline;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.logout-btn {
  background: none;
  border: none;
  color: #654321;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.logout-btn:hover {
  background-color: #d0d0c0;
}

/* Responsive design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 10px;
  }
  
  .main-nav {
    justify-content: center;
  }
}
</style>