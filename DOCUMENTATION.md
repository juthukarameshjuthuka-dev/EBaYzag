# LUXORA Technical Documentation

## Architecture Overview
Luxora is built as a high-fidelity Single Page Application (SPA) using React, Tailwind CSS, and TypeScript. It follows a modular component-based architecture designed for scalability and performance.

### Core Stack
- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4 (Utility-first)
- **Animations**: Motion (Framer Motion)
- **State**: React Context API for Auth and Cart
- **Charts**: Recharts (Admin Dashboard)
- **Icons**: Lucide React

## Data Models (Database Schema)

### Products
```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "stock": "number",
  "category": "string",
  "images": "string[]",
  "features": "string[]"
}
```

### Orders
```json
{
  "id": "string",
  "userId": "string",
  "items": "CartItem[]",
  "totalPrice": "number",
  "status": "pending | shipped | delivered"
}
```

## API Structure (Proposed)
The application is currently using a mock service layer in `src/data/mock.ts`. For production, these endpoints are recommended:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List all products with filters |
| `/api/products/:id` | GET | Get single product details |
| `/api/orders` | POST | Create a new order |
| `/api/auth/login` | POST | Authenticate user |
| `/api/admin/stats` | GET | Dashboard analytics data |

## Deployment Instructions
1. **Build**: Run `npm run build` to generate the production bundle in `/dist`.
2. **Platform**: Optimized for Cloud Run or Vercel. 
3. **Environment**: Ensure `GEMINI_API_KEY` is set for AI features.

---
*Created for Luxora International by Google AI Studio.*
