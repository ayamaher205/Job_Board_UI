<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, CategoryScale, LinearScale, Title } from 'chart.js/auto';
import { reactive, watch } from 'vue';

export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) {
    const chart = reactive(null);

    watch(() => props.chartData, () => {
      if (chart.value) {
        chart.value.data = props.chartData;
        chart.value.update();
      }
    });

    return {
      chart
    };
  },
  mounted() {
    
    const ctx = this.$refs.chartCanvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: this.options,
      plugins: [BarController, CategoryScale, LinearScale, Title]
    });
  },
  unmounted() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
