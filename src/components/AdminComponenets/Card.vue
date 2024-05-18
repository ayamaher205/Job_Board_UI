<template>
  <div class="card d-inline-block " :style="{ backgroundColor: backgroundColor }">
    <div class="card-content">
      <p class="card-description">
        {{ name }} : 
        <span class="card-date" :style="{ color: color}">{{ formattedNumber }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    name: String,
    number: Number,
    color: {
      type: String,
      default: '#000',
    },
    backgroundColor: {
      type: String,
      default: '#000',
    }
  },
  computed: {
    formattedNumber() {
      return this.number > 1000 ? `${(this.number / 1000).toFixed(1)}K` : this.number;
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 5px;
  padding: 15px; 
  width: 200px;
  height: 80px;
}

.card-description {
  margin-bottom: 10px;
}

.card-date {
  font-size: 0.875rem;
}
</style>
