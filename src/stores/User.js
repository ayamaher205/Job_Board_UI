import { defineStore } from "pinia";

export const useLoggedUser = defineStore('user', {
    state: () => ({
        user: {},
    }),
    actions: {
        setUser(user) {
            this.user = {...user}
            console.log(this.user.image)
            console.log(this.user.name)
            console.log(this.user.avatar)


        },
        unsetUser() {
            this.user = {}
        },
    },

});
