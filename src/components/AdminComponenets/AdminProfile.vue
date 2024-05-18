<template>
    <!-- component -->
    <div class="w-100 px-4 bg-white rounded-xl shadow-lg mx-auto d-center">
        <div class="grid gap-8 grid-cols-1">
            <div class="flex flex-col">
                <div class="flex flex-col sm:flex-row items-center">
                    <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit" method="post">
                        <div class="md:space-y-2 mb-3">
                            <div class="flex items-center py-4">
                                <div class="w-20 h-20 mr-4 flex-none rounded-lg border overflow-hidden">
                                    <img class="mr-4 object-cover" alt="Avatar Upload"
                                        :src="'http://127.0.0.1:8000/images/users/' + loggedAdmin.user.image" />
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
                                <input placeholder="Name" v-model="admin.name"
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
                                <input placeholder="Email" v-model="admin.email"
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
                                    type="password" name="branches" id="branches" v-model="admin.password" />
                                <p class="dark:text-red-500 font-xl" v-if="errorList['password']">
                                    {{ errorList['password'][0] }}
                                </p>
                            </div>
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
import { getUser, updateAdmin } from "@/services/Admin.js";
import { useLoggedUser } from '@/stores/User.js';
import router from "@/router/index.js";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default {
    mounted() {
        this.fetchAdmin();
    },
    data() {
        return {
            admin: {
                name: '',
                email: '',
                password: '',
                image: '',
            },
            errorList: [],
            loggedAdmin: useLoggedUser(),
        }
    },
    methods: {
        handleImageChange(event) {
            const selectedFile = event.target.files[0];
            this.admin.image = selectedFile;
        },
        async fetchAdmin() {
            try {
                const response = await getUser(localStorage.getItem('id'));
                this.admin = {
                    name: response.data.data.name,
                    email: response.data.data.email,
                    password: response.data.data.password,
                    image: response.data.data.image,
                    '_method': 'put'
                };
                this.loggedAdmin.setUser(response.data.data);
                console.log(this.loggedAdmin.user)
            } catch (error) {
                console.log(error)
            }
        },
        async handleSubmit() {
            try {
                if (!this.admin.image) { delete this.admin.image; }
                //delete this.employer.employer_id;
                const response = await updateAdmin(localStorage.getItem('id'), this.admin);
                this.loggedAdmin.setUser(response.data.admin);
                router.push({ path: '/admin-profile' })
                this.errorList = [];
                this.$swal({
                    title:'profile updated successfully',
                    icon:'success'
                })
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
