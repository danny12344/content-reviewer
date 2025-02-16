# Brand Content Reviewer App

### To start locally:

Run:
```bash
cd frontend
npm install
# or create .env.local file to store env variable
export "NEXT_PUBLIC_API_URL=http://localhost:5001/api 
npm run dev
```

Seperate terminal

```bash
cd backend
npm install
npm run dev
```

```bash
curl -X POST http://localhost:5001/api/upload -F "file=@/Users/dansimons/Downloads/six.pdf"
```


## GCP deployment instructions:

#### BE
```bash
gcloud builds submit --tag gcr.io/content-review-451017/content-reviewer-backend

gcloud run deploy content-reviewer-backend \
  --image gcr.io/content-review-451017/content-reviewer-backend \
  --platform managed \
  --region europe-west2 \
  --allow-unauthenticated \
  --port 5001
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