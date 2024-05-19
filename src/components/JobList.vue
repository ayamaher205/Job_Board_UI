<template>
  <div class="col-xl-9 col-lg-9 col-md-8">

    <section class="featured-job-area">
      <div class="container">

        <div class="row">
          <div class="col-lg-12">
            <div class="count-job mb-35">
              <span class="pretty-jobs-count">{{ jobs.length }} jobs found</span>

              <div class="select-job-items">
                <span>Sort by</span>
                <select v-model="selectedSort" @change="sortJobs" class="pretty-select">
                  <option value="">None</option>
                  <option value="title">Title</option>
                  <option value="salary">Salary</option>
                  <option value="date">Date</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        <div v-for="job in sortedJobs" :key="job.id" class="single-job-items mb-30">
          <div class="job-items">
            <div class="company-img">
              <router-link :to="{ name: 'job-details', params: { id: job.id } }"> <img v-if="job.employer.image" :src="job.employer.image" width="70px" height="70px"
                  alt="Logo" />
                <img v-else
                  src="https://5.imimg.com/data5/SELLER/Default/2023/9/340980630/YL/AL/SM/59465795/company-logo-design-service-500x500.jpg"
                  width="70px" height="70px" alt="Default Logo" /></router-link>
            </div>
            <div class="job-tittle job-tittle2">
              <router-link  :to="{ name: 'job-details', params: { id: job.id } }">
                <h4>{{ job.title }}</h4>
              </router-link>
              <ul>
                <li>{{ job.employer.name }}</li>
                <li><i class="bi bi-geo-alt-fill"></i>{{ job.location }}</li>
                <li>Salary: {{ job.salary_range }}</li>
              </ul>
            </div>
          </div>
          <div class="items-link items-link2 f-right">

            <router-link :to="{ name: 'job-details', params: { id: job.id } }">{{ job.work_type }}</router-link>
            <span class="job-deadline">Deadline: {{ job.deadline }}</span>
          </div>
        </div>


        <div class="pagination-area pb-115 text-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="single-wrap d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-start">
                      <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
                        <a class="page-link" @click.prevent="search(pagination.currentPage - 1)">Previous</a>
                      </li>
                      <li class="page-item" v-for="page in pagination.lastPage" :key="page"
                        :class="{ active: pagination.currentPage === page }">
                        <a class="page-link" @click.prevent="search(page)">{{ page }}</a>
                      </li>
                      <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.lastPage }">
                        <a class="page-link" @click.prevent="search(pagination.currentPage + 1)">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>

  </div>







</template>

<script>
import JobService from '../services/JobService.js';
export default {
  props: {
    jobs: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    },

  },
  data() {
    return {
      selectedSort: '',
    };
  },
  computed: {
    sortedJobs() {

      if (this.selectedSort) {

        return this.jobs.sort((a, b) => {

          if (this.selectedSort === 'title') {
            return a.title.localeCompare(b.title);
          } else if (this.selectedSort === 'salary') {
            return a.salary_range - b.salary_range;
          } else if (this.selectedSort === 'date') {
            return new Date(a.deadline) - new Date(b.deadline);
          }
        });
      } else {

        return this.jobs;
      }
    }
  },
  methods: {
    async search(page = 1) {
      try {
        const response = await JobService.searchJobs(this.filters, page);
        console.log(response);
        this.$emit('search-results', response, this.filters);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.items-link a {
  color: #244034 !important;
  border: 1px solid #d2f34c !important;
}

.items-link a:hover {
  color: #244034 !important;
  background-color: #d2f34c !important;
}

img {
  border: 1px solid #244034 !important;
}


.pretty-jobs-count {
  color: #4a4a4a;
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Helvetica', sans-serif;
  display: inline-block;
  margin: 5px;
}


.select-job-items {
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;
  margin-bottom: 10px;
}

.select-job-items span {
  margin-right: 10px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

.pretty-select {
  padding: 8px 12px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
}

.pretty-select:focus {
  outline: none;
  border-color: #d2f34c;
}

.pretty-select:hover {
  border-color: #d2f34c;
}

.job-deadline {
  font-size: 14px;
  color: #888;
  font-style: italic;

}
</style>