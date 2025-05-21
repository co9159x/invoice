import React from 'react';
import FormSection from '../ui/FormSection';
import Input from '../ui/Input';
import { FormData, FormErrors } from '../../types';

interface ClientSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: FormErrors;
}

const ClientSection: React.FC<ClientSectionProps> = ({ formData, handleInputChange, errors }) => {
  return (
    <FormSection title="Client Information">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <Input
            id="clientName"
            label="Full Name"
            name="clientName"
            type="text"
            value={formData.clientName}
            onChange={handleInputChange}
            error={errors.clientName}
            required
          />
        </div>

        <div className="sm:col-span-6">
          <Input
            id="clientEmail"
            label="Email Address"
            name="clientEmail"
            type="email"
            value={formData.clientEmail}
            onChange={handleInputChange}
            error={errors.clientEmail}
            required
          />
        </div>

        <div className="sm:col-span-6">
          <Input
            id="street"
            label="Street Address"
            name="street"
            type="text"
            value={formData.street}
            onChange={handleInputChange}
            error={errors.street}
            required
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            id="postCode"
            label="Post Code"
            name="postCode"
            type="text"
            value={formData.postCode}
            onChange={handleInputChange}
            error={errors.postCode}
            required
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            id="town"
            label="Town/City"
            name="town"
            type="text"
            value={formData.town}
            onChange={handleInputChange}
            error={errors.town}
            required
          />
        </div>
      </div>
    </FormSection>
  );
};

export default ClientSection;