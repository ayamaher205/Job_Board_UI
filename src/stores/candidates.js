import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';


export const useCandidateStore = defineStore('candidates', {
  state: () => ({
    candidates: [],
    deactivatedCandidates: [],
    activatedCandidates:[],
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
        console.log("dgfdgfffff",this.candidates)
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
    async fetchDeactivatedCandidates() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/trashed-users', {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
    
        const deactivatedCandidates = response.data.filter(user => user.role === 'candidate');
        console.log(deactivatedCandidates)
        return deactivatedCandidates;
      } catch (error) {
        console.error('Error fetching deactivated candidate:', error);
        this.errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching deactivated candidate'
        });
        return []; 
      }
    },
    

    async activateCandidate(candidateId) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/users/${candidateId}/activate`, null,{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const candidate = this.candidate.find(c => c.id === candidateId);
        if (candidate) {
          candidate.active = TRUE;
          candidate.deleted_at = NULL;
          this.activatedCandidates.push(candidate);
          
        }      
      } catch (error) {
        console.error('Error activating candidate:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error activating candidate'
        });
      }
    
    },
  },
});
