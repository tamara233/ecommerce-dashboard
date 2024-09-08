Store Dashboard - E-commerce Product Management Application
This is a product management dashboard built using React.js, Redux Toolkit, and TypeScript. 
For logging in as an admin user please use 'admin' credential for both username and password. The application allows admin users to:

-View a paginated list of products
-Add new products
-Edit existing products
-Delete products

Project Structure
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AddProductForm.tsx
│   │   │   ├── EditProductForm.tsx
│   │   └── shared
│   │       └── Header.tsx
│   ├── redux
│   │   ├── productsSlice.ts
│   │   └── store.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── types.ts
│   └── styles.css
└── README.md

How to Run the Project:
- Remotely:
Please follow the URL for live deployment in Vercel: 

-Locally:
1. Clone the repository: git clone https://github.com/your-username/store-dashboard.git
2. Navigate to the project directory: cd store-dashboard
3. Install dependencies: npm install
4. Run the project: npm start
This will start a development server and you can view the project at http://localhost:3000/.

Assumptions and Decisions
-Protected route /dashboard for admin users only 
-Mock API for Products: The products are fetched from a fake JSON API using Axios for requests. 
-State Management: Redux Toolkit together with Thunk is used for managing state.
-Local updates: All product changes (add, edit, delete) are done locally in memory, not persisted to a backend, so they won't survive a page refresh.
-Material-UI: The UI is styled using Material-UI components for faster development and consistent UI elements.
-Form Validation: Basic validation is applied to all forms to ensure required fields are filled.
-Pagination: The product list supports pagination with 10 products per page.
-Loading state for products.

Future Improvements
-Integrate a backend for data persistence.
-Enhance form validation to handle more advanced cases (price must be positive, etc.).
-Add user authentication and role-based access control, persist token.
-Make components more reusable (forms, buttons etc.)
-Enhance pagination.

It's the first version of the project and future changes and updates can be expected upon requirement. For further clarifiations please contact the owner directly at tamara.sirakanyan@gmail.com