import React from 'react';
import FormSection from '../ui/FormSection';
import Input from '../ui/Input';
import { FormData, FormErrors } from '../../types';

interface TotalsSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: FormErrors;
}

const TotalsSection: React.FC<TotalsSectionProps> = ({ formData, handleInputChange, errors }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  return (
    <FormSection title="Totals">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <Input
            id="lunchMoney"
            label="Lunch Money (Optional)"
            name="lunchMoney"
            type="number"
            min="0"
            step="0.01"
            value={formData.lunchMoney || ''}
            onChange={handleInputChange}
            error={errors.lunchMoney}
            prefix="£"
          />
        </div>

        <div className="sm:col-span-2">
          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Total Hours
            </label>
          </div>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm sm:leading-6"
              value={formData.totalHours.toFixed(1)}
              readOnly
              aria-readonly="true"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <Input
            id="totalCost"
            label="Total Cost"
            name="totalCost"
            type="number"
            min="0"
            step="0.01"
            value={formData.totalCost || ''}
            onChange={handleInputChange}
            error={errors.totalCost}
            required
            prefix="£"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default TotalsSection;