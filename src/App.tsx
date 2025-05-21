import React from 'react';
import { Toaster } from 'react-hot-toast';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Invoice Generator</h1>
          <p className="mt-3 text-lg text-gray-500">
            Create professional invoices for your clients in seconds
          </p>
        </div>
        <InvoiceForm />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;