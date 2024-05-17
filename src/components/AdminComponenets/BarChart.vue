<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chart) {
          this.chart.data = newData
          this.chart.update()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.renderChart()
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chart = new ChartJS(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions
      })
    }
  }
}
</script>

<style scoped>
</style>
