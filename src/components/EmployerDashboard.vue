<template>
    <section class="text-green-700 body-font">
        <div class="container px-5 py-24 mx-auto">

            <div class="flex flex-wrap -m-4 text-center">
                <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div
                        class="border-2 border-green-500 px-1 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="text-green-500 w-12 h-12 mb-3 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        <h2 class="title-font font-medium text-3xl text-green-900">{{employerData.NumberOfPosts}}</h2>
                        <p class="leading-relaxed">Posts</p>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div
                        class="border-2 border-green-500 px-1 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" class="text-green-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                        </svg>
                        <h2 class="title-font font-medium text-3xl text-green-900">{{ employerData.NumberOfUsers }}</h2>
                        <p class="leading-relaxed">Users</p>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div
                        class="border-2 border-green-500 px-1 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="text-green-500 w-12 h-12 mb-3 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                        <h2 class="title-font font-medium text-3xl text-green-900">{{ employerData.NumberOfApplications }}</h2>
                        <p class="leading-relaxed">Applications</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useLoggedUser } from '@/stores/User.js';
import { useEmployer } from '@/stores/EmployerStore';
import { getEmployer } from "../services/EmployerService.js";

export default {
    mounted() {
        this.fetchEmployer();
    },
    data() {
        return {
            loggedEmployer: useLoggedUser(),
            employerData: useEmployer(),
        }
    },
    methods: {
        async fetchEmployer() {
            try {
                if (Object.keys(this.loggedEmployer.user).length == 0 || !this.employerData.posts.length == 0) {
                    const response = await getEmployer(localStorage.getItem('id'));
                    this.loggedEmployer.setUser(response.data.data);
                    if (response.data.posts) {
                        this.employerData.setPosts(response.data.posts)
                        this.employerData.setNumberOfApplications(response.data.NumberOfApplications)
                        this.employerData.setNumberOfPosts(response.data.NumberOfPosts)
                        this.employerData.setNumberOfUsers(response.data.NumberOfUsers)

                    }
                }
                console.log(this.loggedEmployer.user)
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>