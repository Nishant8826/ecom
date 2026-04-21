import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocs = () => {
    // Construct the Swagger JSON URL from base URL
    const swaggerUrl = `${import.meta.env.VITE_BASE_URL}/api-docs.json`;

    return (
        <div className="api-docs-container bg-white min-h-screen">
            <div className="p-6 border-b bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-800">System API Documentation</h1>
                <p className="text-gray-500 mt-1">Explore and test our backend endpoints.</p>
            </div>
            <div className="swagger-wrapper">
                <SwaggerUI url={swaggerUrl} />
            </div>
        </div>
    );
};

export default ApiDocs;
