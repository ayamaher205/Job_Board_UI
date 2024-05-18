import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';


export const useCandidateStore = defineStore('candidates', {
  state: () => ({
    candidates: [],
    activatedCandidate:[],
    deactivatedCandidate:[],
    errorMessage:""
  }),
  actions: {
    async fetchCandidates() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/usersprofile',
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
            }
        );
        this.candidates = response.data.data.data;
        console.log(this.candidates)
        return this.candidates;
      } catch (error) {
        console.log(error.response.data.data)
        if (error.response.data.data) {
            this.errorMessage = error.response.data.data.name[0];
        } else {
          this.errorMessage = 'An error occurred while fetching candidates.';
          console.error('Error:', error.response.data);
        }
      }
    },

    async deactivateCandidate(candidateId) {
      try {
        console.log(candidateId)
        await axios.delete(`http://127.0.0.1:8000/api/users/${candidateId}/deactivate`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
            }
        );
        const candidate = this.candidates.find(c => c.id === candidateId);
        if (candidate) {
          candidate.active = false;
        }
        // this.fetchCandidates();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error deactivating candidate`
        });
      }
    },


    async activateCandidate(candidateId) {
      try {
        await axios.patch(`/api/candidates/${candidateId}/activate`);
        const candidate = this.candidates.find(c => c.id === candidateId);
        if (candidate) {
          candidate.active = true;
        }
      } catch (error) {
        console.error('Error activating candidate:', error);
      }
    },
  },
});
