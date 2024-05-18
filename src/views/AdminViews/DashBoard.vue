<template>
  <div class="w-100">
    <div class="flex flex-wrap justify-between">
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Admins" :number="adminCount" color="#40916c" backgroundColor="#d8f3dc" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Employers" :number="employerCount" color="#2d6a4f" backgroundColor="#b7e4c7" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Candidates" :number="candidateCount" color="#1b4332" backgroundColor="#95d5b2" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Posts" :number="postsCount" color="#081c15" backgroundColor="#74c69d" />
    </div>
    <div class="flex flex-wrap justify-between">
      <div>
        <CategoryTable />
      </div>
      <div>
        <DoughnutChart v-if="isDataReady" :chartData="doughnutChartData" :chartOptions="chartOptions"></DoughnutChart>
      </div>
    </div>
    <br>
    <div>
      <BarChart v-if="isDataReady" :chartData="employerChartData" :options="barChartOptions"></BarChart>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import Card from '@/components/AdminComponenets/Card.vue'
import CategoryTable from '@/components/AdminComponenets/CategoryTable.vue'
import BarChart from '@/components/AdminComponenets/BarChart.vue'
import DoughnutChart from '@/components/AdminComponenets/DoughnutChart.vue'
import { useUserstore } from '@/stores/users'
import { usePostsstore } from '@/stores/posts'
import { useCategorystore } from '@/stores/categories'
import { useEmployerstore } from '@/stores/employer'



export default {
  name: 'Dashboard',
  components: {
    Card,
    BarChart,
    DoughnutChart,
    CategoryTable
  },

  setup() {
    const userstore = useUserstore()
    const postsstore = usePostsstore()
    const categorystore = useCategorystore()
    const employerstore = useEmployerstore()

    const adminCount = computed(() => userstore.Adminscount)
    const candidateCount = computed(() => userstore.Candidatescount)
    const employerCount = computed(() => userstore.Employerscount)
    const postsCount = computed(() => postsstore.PostsCount)
    const categoriesWithPostsCount = computed(() => categorystore.categoriesWithPostsCount)
    const employersWithPostsCount = computed(() => employerstore.employersWithPostsCount)


    const doughnutChartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Number of Posts',
          backgroundColor: [],
          data: []
        }
      ]
    })

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true
      }
    })

    const employerChartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Posts by Employers',
          backgroundColor: '#588157',
          borderColor: '#d9ed92',
          borderWidth: 1,
          data: []
        }
      ]
    })

  const barChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    })

    const isDataReady = ref(false)

   onMounted(async () => {
  try {
    await userstore.fetchUsers()
    await postsstore.fetchPostsCount()
    await categorystore.fetchCategories()

    const categories = categoriesWithPostsCount.value
    const employers = employersWithPostsCount.value
    
        const topCategories = categories.slice(0, 10)
        doughnutChartData.value.labels = topCategories.map(category => category.name)
        doughnutChartData.value.datasets[0].data = topCategories.map(category => category.postsCount)
        doughnutChartData.value.datasets[0].backgroundColor = topCategories.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`)

        const topEmployers = employers.slice(0, 10)
        employerChartData.value.labels = topEmployers.map(employer => employer.name)
        employerChartData.value.datasets[0].data = topEmployers.map(employer => employer.postsCount)

    isDataReady.value = true 
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

    return {
      adminCount,
      candidateCount,
      employerCount,
      postsCount,
      doughnutChartData,
      chartOptions,
      isDataReady,
      employerChartData,
      barChartOptions
    }
  }
}
</script>


