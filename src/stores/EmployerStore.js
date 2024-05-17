import { defineStore } from "pinia";

export const useEmployer = defineStore('employer',
    {
        state: () => ({
            posts: [],
            NumberOfPosts: null,
            NumberOfApplications: null,
        }),
        actions: {
            setPosts(posts) {
                this.posts = { ...posts }
            },
            setNumberOfPosts(n) {
                this.NumberOfPosts = n
            },
            setNumberOfApplications(n) {
                this.NumberOfApplications = n
            },
        }
    })