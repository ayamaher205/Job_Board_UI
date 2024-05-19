# Laravel-Vue Job Board

## To run this project paste these commands in the terminal
```
docker build -t job .
docker run -it -p 8080:8080 --rm --name jobAppContainer job
```

This is the frontend repository for the Laravel-Vue Job Board project. The project is designed to facilitate the job search and recruitment process, allowing employers to post job listings and candidates to apply for those jobs.

## Features
- Employers can create detailed job postings with job title, description, responsibilities, required skills and qualifications, salary range, benefits offered, location, work type, and application deadline.
- Ability to upload company logos or branding elements.
- Candidates can apply for jobs by uploading their resume directly to the platform, providing contact information to be forwarded to the employer, or filling out application forms within the platform.
- Employers can review applications and contact candidates directly.


### Employers
- Register and Create an Account
- Post Job Listings
- Edit and Manage Job Listings
- Review and Respond to Applications
- Access Analytics

### Candidates
- Register and Create an Account
- Search for Jobs
- Apply for Jobs
- Manage Profile and Applications
- Receive Notifications

### Admins
- Approve or Reject Job Postings
- Monitor Platform Activity

## Technologies Used
- Vue.js
- Vue Router
- Bootstrap