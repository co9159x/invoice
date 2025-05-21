import { FormData, FormErrors } from '../types';

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Client validation
  if (!data.clientName.trim()) {
    errors.clientName = 'Full name is required';
  }

  if (!data.clientEmail.trim()) {
    errors.clientEmail = 'Email address is required';
  } else if (!isValidEmail(data.clientEmail)) {
    errors.clientEmail = 'Please enter a valid email address';
  }

  if (!data.street.trim()) {
    errors.street = 'Street address is required';
  }

  if (!data.postCode.trim()) {
    errors.postCode = 'Post code is required';
  }

  if (!data.town.trim()) {
    errors.town = 'Town/City is required';
  }

  // Invoice metadata validation
  if (!data.invoiceNumber.trim()) {
    errors.invoiceNumber = 'Invoice number is required';
  }

  if (!data.invoiceDate) {
    errors.invoiceDate = 'Invoice date is required';
  }

  // Activities validation
  data.activities.forEach((activity, index) => {
    if (!activity.name.trim()) {
      errors[`activities[${index}].name`] = 'Activity name is required';
    }
    
    if (activity.hours <= 0) {
      errors[`activities[${index}].hours`] = 'Hours must be greater than 0';
    }
  });

  // Total cost validation
  if (data.totalCost <= 0) {
    errors.totalCost = 'Total cost must be greater than 0';
  }

  // Lunch money validation (optional)
  if (data.lunchMoney && data.lunchMoney < 0) {
    errors.lunchMoney = 'Lunch money cannot be negative';
  }

  return errors;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};