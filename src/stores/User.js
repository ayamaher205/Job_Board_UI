import { defineStore } from "pinia";

export const useLoggedUser = defineStore('user', {
    state: () => ({
        user: {},
    }),
    actions: {
        setUser(user) {
            this.user = {...user}
            console.log(this.user)
        },
        unsetUser() {
            this.user = {}
        },
    },

});
