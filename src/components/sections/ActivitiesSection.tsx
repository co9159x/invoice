import React from 'react';
import FormSection from '../ui/FormSection';
import Input from '../ui/Input';
import { Activity, FormErrors } from '../../types';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: Activity[];
  handleActivityChange: (index: number, field: keyof Activity, value: string | number) => void;
  addActivity: () => void;
  removeActivity: (index: number) => void;
  errors: FormErrors;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  activities,
  handleActivityChange,
  addActivity,
  removeActivity,
  errors
}) => {
  return (
    <FormSection title="Activities">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-end border-b pb-4 last:border-b-0">
            <div className="col-span-12 sm:col-span-1">
              <div className="text-sm font-medium text-gray-700">#{index + 1}</div>
            </div>
            
            <div className="col-span-12 sm:col-span-7">
              <Input
                id={`activity-name-${index}`}
                label="Activity Name"
                name={`activity-name-${index}`}
                type="text"
                value={activity.name}
                onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                error={errors[`activities[${index}].name`]}
                required
              />
            </div>
            
            <div className="col-span-10 sm:col-span-3">
              <Input
                id={`activity-hours-${index}`}
                label="Hours"
                name={`activity-hours-${index}`}
                type="number"
                min="0"
                step="0.5"
                value={activity.hours || ''}
                onChange={(e) => handleActivityChange(index, 'hours', e.target.value)}
                error={errors[`activities[${index}].hours`]}
                required
              />
            </div>
            
            <div className="col-span-2 sm:col-span-1 flex justify-end items-center">
              <button
                type="button"
                onClick={() => removeActivity(index)}
                className={`text-red-500 hover:text-red-700 ${activities.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={activities.length <= 1}
                aria-label="Remove activity"
              >
                <MinusCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
        
        {activities.length < 5 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={addActivity}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Activity
            </button>
          </div>
        )}
      </div>
    </FormSection>
  );
};

export default ActivitiesSection;