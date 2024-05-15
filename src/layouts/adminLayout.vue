<template>
  <div class="admin-layout">
    <header>
      <h1>Admin Panel</h1>
    </header>
    <nav>
      <ul>
        <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
        <li><router-link to="/admin/candidates">candidates</router-link></li>
        <li><router-link to="/admin/employers">employers</router-link></li>
        <li><router-link to="/admin/add-admin">add</router-link></li>
      </ul>
    </nav>
    <main>
        <p>
            lay out
        </p>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 Admin Panel</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout'
}
</script>

<style scoped>

</style>