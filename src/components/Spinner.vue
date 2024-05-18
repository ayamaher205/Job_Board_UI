<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style scoped>
.spinner {
    margin: 200px 300px;
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top-color: #217742;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
