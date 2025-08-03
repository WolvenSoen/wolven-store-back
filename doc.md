---- WOLVENHUT - ECARTPAY TECH TEST ----

# Documentation

## Important Libraries

- **NestJS**: Progressive Node.js framework for building efficient, scalable server-side applications.
- **@nestjs/mongoose**: Integration for MongoDB using Mongoose ODM.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB, schema-based modeling.
- **@nestjs/config**: Environment variable and configuration management.

## MongoDB Implementation

This project uses MongoDB as the main database, integrated via the `@nestjs/mongoose` package. Each entity (such as `User`, `Product`, `Token`) is defined as a Mongoose schema and registered in its respective module. The connection string is managed through environment variables for flexibility and security. All CRUD operations and authentication are performed using Mongoose models, ensuring type safety and schema validation.

## Main Features of This Backend Project

- **User Management**: User credentials are stored securely in MongoDB. (Password hashing is recommended for production.)
- **Product Management**: Full CRUD for products, using Mongoose schemas and controllers.
- **Modular Design**: Each feature (auth, product, token) is encapsulated in its own module for maintainability.
- **Environment Configuration**: Uses `@nestjs/config` for environment variables and configuration management.
- **Extensibility**: Easily add new modules or features thanks to NestJS's modular approach.


