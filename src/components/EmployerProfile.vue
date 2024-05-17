<template>
    <!-- component -->
    <div class="w-90 px-4 bg-white rounded-xl shadow-lg">
        <div class="grid gap-8 grid-cols-1">
            <div class="flex flex-col">
                <div class="flex flex-col sm:flex-row items-center">
                    <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit" method="post">
                        <div class="md:space-y-2 mb-3">
                            <label class="text-xs font-semibold text-gray-600 py-2">Logo<abbr class="hidden"
                                    title="required">*</abbr></label>
                            <div class="flex items-center py-4">
                                <div class="w-20 h-20 mr-4 flex-none rounded-lg border overflow-hidden">
                                    <img class="mr-4 object-cover" alt="Avatar Upload"
                                        :src="'http://127.0.0.1:8000/images/users/' + loggedEmployer.user.image" />
                                </div>
                                <label class="cursor-pointer">
                                    <span
                                        class="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-500 hover:bg-green-600 hover:shadow-lg">Browse</span>
                                    <input type="file" class="hidden" accept="image/*" name="image"
                                        @change="handleImageChange" />
                                </label>
                            </div>
                        </div>
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Name <abbr
                                        title="required"></abbr></label>
                                <input placeholder="Name" v-model="employer.name"
                                    class="appearance-none form-control block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                    required="required" type="text" name="integration[shop_name]"
                                    id="integration_shop_name" />
                                <p class="text-red text-xs hidden">
                                    Please fill out this field.
                                </p>
                                <p class="dark:text-red-500 font-xl" v-if="errorList['name']">
                                    {{ errorList['name'][0] }}
                                </p>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Email <abbr
                                        title="required"></abbr></label>
                                <input placeholder="Email" v-model="employer.email"
                                    class="form-control appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                    required="required" type="text" name="integration[shop_name]"
                                    id="integration_shop_name" />
                                <p class="text-red text-xs hidden">
                                    Please fill out this field.
                                </p>
                                <p class="dark:text-red-500 font-xl" v-if="errorList['email']">
                                    {{ errorList['email'][0] }}
                                </p>
                            </div>
                        </div>
                        <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                            <div class="w-full flex flex-col mb-3">
                                <label class="font-semibold text-gray-600 py-2">Password</label>
                                <input placeholder="Password"
                                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                    type="password" name="branches" id="branches" v-model="employer.password" />
                                <p class="dark:text-red-500 font-xl" v-if="errorList['password']">
                                    {{ errorList['password'][0] }}
                                </p>
                            </div>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs">
                            <label class="font-semibold text-gray-600 py-2">Industry<abbr
                                    title="required"></abbr></label>
                            <input placeholder="Industry" v-model="employer.industry"
                                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 form-control"
                                required="required" type="text" name="integration[shop_name]"
                                id="integration_shop_name" />
                            <p class="text-red text-xs hidden">Please fill out this field.</p>
                            <p class="dark:text-red-500 font-xl" v-if="errorList['industry']">
                                {{ errorList['industry'][0] }}
                            </p>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs">
                            <label class="font-semibold text-gray-600 py-2">Branches<abbr
                                    title="required"></abbr></label>
                            <input placeholder="Branches" v-model="employer.branches"
                                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 form-control"
                                required="required" type="text" name="integration[shop_name]"
                                id="integration_shop_name" />
                            <p class="text-red text-xs hidden">Please fill out this field.</p>
                            <p class="dark:text-red-500 font-xl" v-if="errorList['branches']">
                                {{ errorList['branches'][0] }}
                            </p>
                        </div>
                        <div class="flex-auto w-full mb-1 text-xs space-y-2">
                            <label class="font-semibold text-gray-600 py-2">Branding Elements</label>
                            <textarea required="" name="message" id="" v-model="employer.branding_elements"
                                class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4"
                                placeholder="Enter your comapny Branding Elements" spellcheck="false"></textarea>
                            <p class="dark:text-red-500 font-xl" v-if="errorList['branding_elements']">
                                {{ errorList['branding_elements'][0] }}
                            </p>
                        </div>
                        <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                            <button
                                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button type="submit"
                                class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getEmployer, updateEmployer } from "../services/EmployerService.js";
import { useLoggedUser } from '@/stores/User.js';
import { useEmployer } from '@/stores/EmployerStore.js'
import router from "@/router/index.js";

export default {
    mounted() {
        this.fetchEmployer();
    },
    data() {
        return {
            employer: {
                name: '',
                email: '',
                password: '',
                industry: '',
                branches: '',
                branding_elements: '',
                image: '',
                employer_id: ''
            },
            errorList: [],
            loggedEmployer: useLoggedUser(),
            employerData: useEmployer()
        }
    },
    methods: {
        handleImageChange(event) {
            const selectedFile = event.target.files[0];
            this.employer.image = selectedFile;
        },
        async fetchEmployer() {
            try {
                if (Object.keys(this.loggedEmployer.user).length == 0 || !this.employerData.posts.length == 0) {
                    const response = await getEmployer(localStorage.getItem('id'));
                    this.employer = {
                        id: response.data.data.id,
                        employer_id: response.data.data.employer_id,
                        name: response.data.data.name,
                        email: response.data.data.email,
                        password: response.data.data.password,
                        industry: response.data.data.industry,
                        branches: response.data.data.branches,
                        image: response.data.data.image,
                        branding_elements: response.data.data.branding_elements,
                        '_method': 'put'
                    };
                    this.loggedEmployer.setUser(response.data.data);
                    if (response.data.posts) {
                        this.employerData.setPosts(response.data.posts)
                        this.employerData.setNumberOfApplications(response.data.NumberOfApplications)
                        this.employerData.setNumberOfPosts(response.data.NumberOfPosts)
                    }
                    console.log(this.loggedEmployer.user)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async handleSubmit() {
            try {
                if (!this.employer.image) { delete this.employer.image; }
                //delete this.employer.employer_id;
                const response = await updateEmployer(this.loggedEmployer.user.employer_id, this.employer);
                router.push({ path: '/employer' })
                this.loggedEmployer.setUser(response.data.data);
                this.errorList = [];
            } catch (error) {
                if (error.response) {
                    this.errorList = [];
                    this.errorList = error.response.data.errors;
                } else if (error.request) {
                    this.errorList = error.request;
                    console.log('Error', this.errorList);
                } else {
                    this.errorList = error;
                    console.log('Error', this.errorList);
                }
            }
        }
    }
}
</script>
