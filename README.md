# Brand Content Reviewer App


Next.js / express app hosted on Google Cloud Run. Avaible at this url:

https://content-reviewer-frontend-91734819578.europe-west2.run.app


### Overview
The Content Reviewer Web App is a full-stack web application designed to streamline content review and feedback for influencer marketing campaigns. The system enables users to submit content (such as scripts or documents), receive AI-generated feedback, and view structured creative briefs to guide their content creation.

The application consists of:
- A frontend built with Next.js (React)
- A backend built with Express (Node.js)
- Cloud-hosted deployment using Google Cloud Run & Cloud Build
- AI-powered feedback powered by OpenAI's gpt-3.5-turbo api


## Features
### Frontend (Next.js)
- User-friendly interface to upload content and receive AI feedback
- Dynamic brief selection for guiding content creation
- Rich text display using ReactMarkdown
- Responsive design using Tailwind CSS


### Backend (Express & Node.js)
- API for handling content submissions
- AI integration for automated content review using OpenAI GPT
- Cloud storage support for managing file uploads

### Deployment & Infrastructure
- Google Cloud Run for scalable backend hosting
  - I chose cloud run for hosting the app as I am most familiar with Google's services so I thought this would be the quickest to get up and running. Plus, since cloud run is fully managed I dont have to worry about the underlying hardware infrastructure / any VM config. Moreover, since it's configured to scale to zero instances it means that I don't have to worry about any billing charges when it's not in use. 
  - One drawback of having the instances scale to zero is if the app has not been used in a while sometimes it can take a while to load as the instance has to scale up to >0. However, the cost saving is significant to make min scale = 0 worth it for a project like this.
- Google Cloud Build for building the fe/be images
- Google Artifact Registry for storing Docker images
- Next.js static site generation for optimized frontend performance

### Development process
- started with building the backend APIs 
- Then built FE app. Created briefs page to show user the different briefs available
- Then created the page to display the activity data from past campaigns
  - to clean the data I created `backend/src/scripts/cleanCSV.ts` script that I ran in my terminal to generate a cleaned CSV. This script removes duplicates & ensures each id was unique, trimmed whitespace from text filed, ensured all boolean fields were formatted correctly, converted the stageId values to integers and formatted headers correctly
- To create the feedback bot I first setup the OpenAI api call in `backend/src/controllers/submissionsController.ts` file which extracts text from the uploaded file which can be plain text, pdf or word document. The `fetchBriefContent` extracts text from the HTML pages from the links to the notion page. 
- `processSubmission` function creates the promopt to submit to OpenAI and then does the actual api call and returns the response.
- some challenges I faced here were generating a prompt that wasn't too large for the API call. Initially wihtou the `fetchBriefContent` and the use of cheerio library to extract actual text from the html pages the token limit was being hit as there was too much being submitted. The use of cheerio library resolved this.
- Another challenge I faced was setting up the NEXT_PUBLIC_API_URL variable to dynamically use either localhost url for local dev & the backend's deployed url for when the app is deployed. Didn't end up having time to resolve this issue but with more time I'm sure it would be resolved. If this was a production ready application my plan would be to build a CI/CD pipeline using github actions that would feed in the API URLs dynamically as the app was being built.



### If I had more time
- I would have setup a postgresql database to store the data in a more secure better way - I understand that the way I'm storing data is not ideal at all right now. However, I chose to focus my efforts more on FE / BE features & getting the app deployed. 
- I would also enable file uploads to be stored in GCS buckets rather than in the backend cloud run instance directly which I also know is not great. 
- Added more file upload formats so the AI feedback could provide feedback on videos and images
- Created better security e.g. at the moment CORS setup is quite insecure and the frontend commmuncaites with the backned cloud run instance over an insecure connection
- I would also work on the UI to improve aesthetics & mobile compatability - it works ok on mobile however, the nav bar does not look great

Thanks for taking the time to review my work :) please let me know if you have any questions!

## Personal dev notes

### GCP deployment instructions:

#### BE
```bash
gcloud builds submit --tag gcr.io/content-review-451017/content-reviewer-backend

gcloud run deploy content-reviewer-backend \
  --image gcr.io/content-review-451017/content-reviewer-backend \
  --platform managed \
  --region europe-west2 \
  --allow-unauthenticated \
  --port 8080
```

#### FE

```bash
gcloud builds submit --tag gcr.io/content-review-451017/content-reviewer-frontend

gcloud run deploy content-reviewer-frontend \
  --image gcr.io/content-review-451017/content-reviewer-frontend \
  --platform managed \
  --region europe-west2 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_API_URL=https://content-reviewer-backend-91734819578.europe-west2.run.app
```