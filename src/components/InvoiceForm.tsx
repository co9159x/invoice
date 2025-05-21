import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ClientSection from './sections/ClientSection';
import InvoiceMetadataSection from './sections/InvoiceMetadataSection';
import ActivitiesSection from './sections/ActivitiesSection';
import TotalsSection from './sections/TotalsSection';
import { Activity, FormData, FormErrors } from '../types';
import { validateForm } from '../utils/validation';

// Get webhook URL from environment variables
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/generate-invoice';

// Log the webhook URL during development
if (import.meta.env.DEV) {
  console.log('Using webhook URL:', N8N_WEBHOOK_URL);
}

const InvoiceForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    street: '',
    postCode: '',
    town: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    activities: [{ name: '', hours: 0 }],
    lunchMoney: 0,
    totalCost: 0,
    totalHours: 0
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const totalHours = formData.activities.reduce((total, activity) => {
      return total + activity.hours;
    }, 0);
    
    setFormData(prev => ({
      ...prev,
      totalHours: totalHours
    }));
  }, [formData.activities]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalCost' || name === 'lunchMoney' ? Number(value) || 0 : value
    }));
  };

  const handleActivityChange = (index: number, field: keyof Activity, value: string | number) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: field === 'hours' ? Number(value) || 0 : value
    };

    setFormData(prev => ({
      ...prev,
      activities: updatedActivities
    }));
  };

  const addActivity = () => {
    if (formData.activities.length < 5) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, { name: '', hours: 0 }]
      }));
    }
  };

  const removeActivity = (index: number) => {
    if (formData.activities.length > 1) {
      const updatedActivities = formData.activities.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        activities: updatedActivities
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('n8n response:', responseData);
        
        toast.success('Invoice generated successfully! 🎉', {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            clientName: '',
            clientEmail: '',
            street: '',
            postCode: '',
            town: '',
            invoiceNumber: '',
            invoiceDate: new Date().toISOString().split('T')[0],
            activities: [{ name: '', hours: 0 }],
            lunchMoney: 0,
            totalCost: 0,
            totalHours: 0
          });
        }, 3000);
      } else {
        const errorData = await response.text();
        console.error('n8n error response:', errorData);
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to generate invoice. Please try again.', {
        duration: 4000,
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ClientSection 
        formData={formData} 
        handleInputChange={handleInputChange}
        errors={errors}
      />
      
      <InvoiceMetadataSection 
        formData={formData} 
        handleInputChange={handleInputChange}
        errors={errors}
      />
      
      <ActivitiesSection 
        activities={formData.activities}
        handleActivityChange={handleActivityChange}
        addActivity={addActivity}
        removeActivity={removeActivity}
        errors={errors}
      />
      
      <TotalsSection 
        formData={formData} 
        handleInputChange={handleInputChange}
        errors={errors}
      />
      
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            onClick={() => {
              setFormData({
                clientName: '',
                clientEmail: '',
                street: '',
                postCode: '',
                town: '',
                invoiceNumber: '',
                invoiceDate: new Date().toISOString().split('T')[0],
                activities: [{ name: '', hours: 0 }],
                lunchMoney: 0,
                totalCost: 0,
                totalHours: 0
              });
              setErrors({});
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
              ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 relative`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : submitSuccess ? (
              'Submitted!'
            ) : (
              'Generate Invoice'
            )}
          </button>
        </div>
      </div>
      
      {submitSuccess && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600">
            Invoice data submitted successfully!
          </div>
        </div>
      )}
    </form>
  );
};

export default InvoiceForm;