<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Admins" :number="adminCount" color="#40916c" backgroundColor="#d8f3dc" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Employers" :number="employerCount" color="#2d6a4f" backgroundColor="#b7e4c7" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Candidates" :number="candidateCount" color="#1b4332" backgroundColor="#95d5b2" />
      <Card class="w-full sm:w-auto mb-4 sm:mb-0" name="Posts" :number="postsCount" color="#081c15" backgroundColor="#74c69d" />
    </div>
    <div class="flex flex-wrap justify-between">
    <div>
      <CategoryTable />
    </div >
    <div>
    <BarChart :chartData="chartData" :options="chartOptions"></BarChart>
    </div>
  </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Card from '@/components/AdminComponenets/Card.vue';
import CategoryTable from '@/components/AdminComponenets/CategoryTable.vue';

import BarChart from '@/components/BarChart.vue';
import { useUserstore } from '@/stores/users';
import { usePostsstore } from '@/stores/posts';

export default {
  name: 'Dashboard',
  components: {
    Card,
    BarChart,
    CategoryTable
  },
    data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data 1',
            backgroundColor: '#f87979',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  setup() {
    const userstore = useUserstore();
    const postsstore = usePostsstore();
    onMounted(async () => {
      try {
        const users = await userstore.fetchUsers();
        const posts = await postsstore.fetchPostsCount();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
    const adminCount = computed(() => userstore.Adminscount);
    const candidateCount = computed(() => userstore.Candidatescount);
    const employerCount = computed(() => userstore.Employerscount);
    const postsCount = computed(() => postsstore.PostsCount);

    return {
      adminCount,
      candidateCount,
      employerCount,
      postsCount


    };
  }
}
</script>
