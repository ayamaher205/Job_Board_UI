<template>
    <!-- component -->
    <div class="max-w-xl w-75 h-25 space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div class="grid gap-8 grid-cols-1">
            <div class="flex flex-col">
                <div class="flex flex-col sm:flex-row items-center">
                    <h2 class="font-semibold text-lg mr-auto text-green-900">Profile</h2>
                    <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                </div>
                <div class="mt-5">
                    <div class="form">
                        <div class="md:space-y-2 mb-3">
                            <label class="text-xs font-semibold text-gray-600 py-2">Logo<abbr class="hidden"
                                    title="required">*</abbr></label>
                            <div class="flex items-center py-4">
                                <div class="w-20 h-20 mr-4 flex-none rounded-lg border overflow-hidden">
                                    <img class="mr-4 object-cover"
                                        src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww"
                                        alt="Avatar Upload" />
                                </div>
                                <label class="cursor-pointer">
                                    <span
                                        class="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">Browse</span>
                                    <input type="file" class="hidden" :multiple="multiple" :accept="accept" />
                                </label>
                            </div>
                        </div>
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Name <abbr
                                        title="required"></abbr></label>
                                <input placeholder="Name"
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
                                <input placeholder="Email"
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
                                    type="password" name="branches" id="branches" />
                            </div>
                        </div>
                        <div class="mb-3 space-y-2 w-full text-xs">
                            <label class="font-semibold text-gray-600 py-2">Industry<abbr
                                    title="required"></abbr></label>
                            <input placeholder="Industry"
                                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                required="required" type="text" name="integration[shop_name]"
                                id="integration_shop_name" />
                            <p class="text-red text-xs hidden">Please fill out this field.</p>
                        </div>
                        <div class="flex-auto w-full mb-1 text-xs space-y-2">
                            <label class="font-semibold text-gray-600 py-2">Branding Elements</label>
                            <textarea required="" name="message" id=""
                                class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4"
                                placeholder="Enter your comapny Branding Elements" spellcheck="false"></textarea>
                        </div>
                        <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                            <button @click="employer"
                                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button
                                class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEmployer } from "../services/EmployerService.js";

export default {
    data() {
        return {
            employers: {}
        }
    },
    methods: {
        async employer() {
            try {
                this.employers = await getEmployer(); 
                console.log(this.employers.data);
            } catch (error) {
                console.error('Error fetching employer:', error);
            }
        },
    }
};
</script>
