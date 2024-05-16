<template>
    <!-- component -->
    <div class="w-90 px-4 bg-white rounded-xl shadow-lg">
        <div class="grid gap-8 grid-cols-1">
            <div class="flex flex-col">
                <div class="flex flex-col sm:flex-row items-center">
                    <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                        <div class="md:space-y-2 mb-3">
                            <label class="text-xs font-semibold text-gray-600 py-2">Logo<abbr class="hidden"
                                    title="required">*</abbr></label>
                            <div class="flex items-center py-4">
                                <div class="w-20 h-20 mr-4 flex-none rounded-lg border overflow-hidden">
                                    <img class="mr-4 object-cover" :src="employer.image" alt="Avatar Upload" />
                                </div>
                                <label class="cursor-pointer">
                                    <span
                                        class="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-500 hover:bg-green-600 hover:shadow-lg">Browse</span>
                                    <input type="file" class="hidden" accept="image/*" name="image"
                                        @change="handleImageSelected" />
                                </label>
                            </div>
                        </div>
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Name <abbr
                                        title="required"></abbr></label>
                                <input placeholder="Name" v-model="employer.name"
                                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                    required="required" type="text" name="integration[shop_name]"
                                    id="integration_shop_name" />
                                <p class="text-red text-xs hidden">
                                    Please fill out this field.
                                </p>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Email <abbr
                                        title="required"></abbr></label>
                                <input placeholder="Email" v-model="employer.email"
                                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                    required="required" type="text" name="integration[shop_name]"
                                    id="integration_shop_name" />
                                <p class="text-red text-xs hidden">
                                    Please fill out this field.
                                </p>
                            </div>
                        </div>
                        <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                            <div class="w-full flex flex-col mb-3">
                                <label class="font-semibold text-gray-600 py-2">Password</label>
                                <input placeholder="Password"
                                    class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                    type="password" name="branches" id="branches" v-model="employer.password" />
                            </div>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs">
                            <label class="font-semibold text-gray-600 py-2">Industry<abbr
                                    title="required"></abbr></label>
                            <input placeholder="Industry" v-model="employer.industry"
                                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                required="required" type="text" name="integration[shop_name]"
                                id="integration_shop_name" />
                            <p class="text-red text-xs hidden">Please fill out this field.</p>
                        </div>
                        <div class="flex-auto w-full mb-1 text-xs space-y-2">
                            <label class="font-semibold text-gray-600 py-2">Branding Elements</label>
                            <textarea required="" name="message" id="" v-model="employer.branding_elements"
                                class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4"
                                placeholder="Enter your comapny Branding Elements" spellcheck="false"></textarea>
                        </div>
                        <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                            <button
                                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button 
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
import { useLoggedUser } from '@/stores/User.js'
import { useImageUpload } from "@/Helpers/useImageUpload.js";

export default {
    created() {
        this.fetchEmployer();
    },
    data() {
       const { imageFile, imageUrl, handleImageSelected } = useImageUpload();
        return {
            employer: {},
            loggedEmployer: useLoggedUser(),
            imageFile,
            imageUrl,
            handleImageSelected
        }
    },
    methods: {
        handleImageChange(event) {
            const selectedFile = event.target.files[0];
            this.employer.image = selectedFile;
        },
        async fetchEmployer() {
            try {
                const response = await getEmployer(this.loggedEmployer.user.id);
                this.employer = {
                    ...response.data.data
                };
            } catch (error) {
                console.error('Error fetching employer:', error);
            }
        },
        async handleSubmit() {
            try {

                let formData = new FormData();
                formData.append("image", this.imageFile);
                formData.append("name", this.employer.name)
                formData.append("email", this.employer.email)
                formData.append("_method", 'put')
                if (this.employer.password&&this.employer.password.trim() != '')
                    formData.append("password", this.employer.password)
                formData.append("industry", this.employer.industry)
                formData.append("branding_elements", this.employer.branding_elements)
                console.log(formData.values().toArray());
                const response = await updateEmployer(this.employer.id,formData);
                console.log(response);
                /* imageUrl.value = "";
                imageFile.value = "";
                message.value = response.data.message;
                images.value = response.data.images; */
            } catch (e) {
                console.log(`can't update ${e}`);
            }
        }
    }
};
</script>
