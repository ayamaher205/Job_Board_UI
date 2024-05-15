import { defineStore } from "pinia";

export const useLoggedUser = defineStore('user',
{
    state:()=>({
        user:{},        
    })
})