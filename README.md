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