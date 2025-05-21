import React from 'react';
import FormSection from '../ui/FormSection';
import Input from '../ui/Input';
import { FormData, FormErrors } from '../../types';

interface InvoiceMetadataSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: FormErrors;
}

const InvoiceMetadataSection: React.FC<InvoiceMetadataSectionProps> = ({ 
  formData, 
  handleInputChange, 
  errors 
}) => {
  return (
    <FormSection title="Invoice Metadata">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Input
            id="invoiceNumber"
            label="Invoice Number"
            name="invoiceNumber"
            type="text"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            error={errors.invoiceNumber}
            required
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            id="invoiceDate"
            label="Invoice Date"
            name="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            error={errors.invoiceDate}
            required
          />
        </div>
      </div>
    </FormSection>
  );
};

export default InvoiceMetadataSection;