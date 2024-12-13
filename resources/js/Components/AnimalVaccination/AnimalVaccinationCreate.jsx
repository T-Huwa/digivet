import React, { useState } from 'react';
import axios from 'axios';
import { Checkbox, FormControlLabel } from '@mui/material';

const AnimalVaccinationCreate = () => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    animal_id: '',
    date_of_vaccination: '',
    animal_age: '',
    age_unit: '',
    sex_of_animal: '',
    vaccination_type: '',
    vaccine_used: '',
    dose_administered: '',
    route_of_administration: '',
    other_administration_route: '',
    vaccine_batch_number: '',
    lot_number: '',
    vaccination_officer_id: '',
    adverse_reactions_observed: false,
    reaction_description: '',
    follow_up_required: false,
    follow_up_actions: '',
    next_due_date: '',
    animal_health_status: '',
    health_status_details: '',
    additional_notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/animal-vaccinations', formData);
      alert('Animal vaccination record created successfully!');
      // Optionally redirect or reset form
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('An error occurred while submitting the form.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="appointment_id" className="block text-sm font-medium text-gray-700">
          Appointment ID
        </label>
        <input
          type="text"
          name="appointment_id"
          id="appointment_id"
          value={formData.appointment_id}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.appointment_id ? 'border-red-500' : ''}`}
          required
        />
        {errors.appointment_id && <p className="mt-1 text-sm text-red-500">{errors.appointment_id[0]}</p>}
      </div>

      <div>
        <label htmlFor="animal_id" className="block text-sm font-medium text-gray-700">
          Animal ID
        </label>
        <input
          type="text"
          name="animal_id"
          id="animal_id"
          value={formData.animal_id}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.animal_id ? 'border-red-500' : ''}`}
          required
        />
        {errors.animal_id && <p className="mt-1 text-sm text-red-500">{errors.animal_id[0]}</p>}
      </div>

      <div>
        <label htmlFor="date_of_vaccination" className="block text-sm font-medium text-gray-700">
          Date of Vaccination
        </label>
        <input
          type="date"
          name="date_of_vaccination"
          id="date_of_vaccination"
          value={formData.date_of_vaccination}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.date_of_vaccination ? 'border-red-500' : ''}`}
          required
        />
        {errors.date_of_vaccination && <p className="mt-1 text-sm text-red-500">{errors.date_of_vaccination[0]}</p>}
      </div>

      <div>
        <label htmlFor="animal_age" className="block text-sm font-medium text-gray-700">
          Animal Age
        </label>
        <input
          type="number"
          name="animal_age"
          id="animal_age"
          value={formData.animal_age}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.animal_age ? 'border-red-500' : ''}`}
          required
        />
        {errors.animal_age && <p className="mt-1 text-sm text-red-500">{errors.animal_age[0]}</p>}
      </div>

      <div>
        <label htmlFor="age_unit" className="block text-sm font-medium text-gray-700">
          Age Unit
        </label>
        <select
          name="age_unit"
          id="age_unit"
          value={formData.age_unit}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.age_unit ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select Unit</option>
          <option value="Months">Months</option>
          <option value="Years">Years</option>
        </select>
        {errors.age_unit && <p className="mt-1 text-sm text-red-500">{errors.age_unit[0]}</p>}
      </div>

      <div>
        <label htmlFor="sex_of_animal" className="block text-sm font-medium text-gray-700">
          Sex of Animal
        </label>
        <select
          name="sex_of_animal"
          id="sex_of_animal"
          value={formData.sex_of_animal}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.sex_of_animal ? 'border-red-500' : ''}`}
          required
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.sex_of_animal && <p className="mt-1 text-sm text-red-500">{errors.sex_of_animal[0]}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="adverse_reactions_observed"
          id="adverse_reactions_observed"
          checked={formData.adverse_reactions_observed}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="adverse_reactions_observed" className="ml-2 text-sm font-medium text-gray-700">
          Adverse Reactions Observed
        </label>
      </div>

      {formData.adverse_reactions_observed && (
        <div>
          <label htmlFor="reaction_description" className="block text-sm font-medium text-gray-700">
            Reaction Description
          </label>
          <input
            type="text"
            name="reaction_description"
            id="reaction_description"
            value={formData.reaction_description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.reaction_description ? 'border-red-500' : ''}`}
            required
          />
          {errors.reaction_description && <p className="mt-1 text-sm text-red-500">{errors.reaction_description[0]}</p>}
        </div>
      )}
      
      <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Vaccination Type</label>
  <input
    type="text"
    name="vaccination_type"
    value={formData.vaccination_type}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.vaccination_type ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.vaccination_type && <p className="text-red-500 text-xs">{errors.vaccination_type[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Vaccine Used</label>
  <input
    type="text"
    name="vaccine_used"
    value={formData.vaccine_used}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.vaccine_used ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.vaccine_used && <p className="text-red-500 text-xs">{errors.vaccine_used[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Dose Administered</label>
  <input
    type="text"
    name="dose_administered"
    value={formData.dose_administered}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.dose_administered ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.dose_administered && <p className="text-red-500 text-xs">{errors.dose_administered[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Route of Administration</label>
  <input
    type="text"
    name="route_of_administration"
    value={formData.route_of_administration}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.route_of_administration ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.route_of_administration && <p className="text-red-500 text-xs">{errors.route_of_administration[0]}</p>}
</div>

{formData.route_of_administration === 'Other' && (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Other Administration Route</label>
    <input
      type="text"
      name="other_administration_route"
      value={formData.other_administration_route}
      onChange={handleChange}
      className={`mt-1 block w-full p-2 border ${errors.other_administration_route ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    />
    {errors.other_administration_route && <p className="text-red-500 text-xs">{errors.other_administration_route[0]}</p>}
  </div>
)}

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Vaccine Batch Number</label>
  <input
    type="text"
    name="vaccine_batch_number"
    value={formData.vaccine_batch_number}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.vaccine_batch_number ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.vaccine_batch_number && <p className="text-red-500 text-xs">{errors.vaccine_batch_number[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Lot Number</label>
  <input
    type="text"
    name="lot_number"
    value={formData.lot_number}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.lot_number ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.lot_number && <p className="text-red-500 text-xs">{errors.lot_number[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Vaccination Officer ID</label>
  <input
    type="text"
    name="vaccination_officer_id"
    value={formData.vaccination_officer_id}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.vaccination_officer_id ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.vaccination_officer_id && <p className="text-red-500 text-xs">{errors.vaccination_officer_id[0]}</p>}
</div>

<div className="mb-4">
  <FormControlLabel
    control={
      <Checkbox
        name="follow_up_required"
        checked={formData.follow_up_required}
        onChange={handleChange}
        className="text-gray-700"
      />
    }
    label="Follow Up Required"
  />
</div>

{formData.follow_up_required && (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Follow Up Actions</label>
    <input
      type="text"
      name="follow_up_actions"
      value={formData.follow_up_actions}
      onChange={handleChange}
      className={`mt-1 block w-full p-2 border ${errors.follow_up_actions ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    />
    {errors.follow_up_actions && <p className="text-red-500 text-xs">{errors.follow_up_actions[0]}</p>}
  </div>
      )}
      
      <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Date of Vaccination</label>
  <input
    type="date"
    name="vaccination_date"
    value={formData.vaccination_date}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.vaccination_date ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.vaccination_date && <p className="text-red-500 text-xs">{errors.vaccination_date[0]}</p>}
</div>


<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Next Due Date</label>
  <input
    type="date"
    name="next_due_date"
    value={formData.next_due_date}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.next_due_date ? 'border-red-500' : 'border-gray-300'} rounded-md`}
  />
  {errors.next_due_date && <p className="text-red-500 text-xs">{errors.next_due_date[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Animal Health Status</label>
  <input
    type="text"
    name="animal_health_status"
    value={formData.animal_health_status}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.animal_health_status ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    required
  />
  {errors.animal_health_status && <p className="text-red-500 text-xs">{errors.animal_health_status[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Health Status Details</label>
  <input
    type="text"
    name="health_status_details"
    value={formData.health_status_details}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.health_status_details ? 'border-red-500' : 'border-gray-300'} rounded-md`}
  />
  {errors.health_status_details && <p className="text-red-500 text-xs">{errors.health_status_details[0]}</p>}
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
  <input
    type="text"
    name="additional_notes"
    value={formData.additional_notes}
    onChange={handleChange}
    className={`mt-1 block w-full p-2 border ${errors.additional_notes ? 'border-red-500' : 'border-gray-300'} rounded-md`}
  />
  {errors.additional_notes && <p className="text-red-500 text-xs">{errors.additional_notes[0]}</p>}
</div>


      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AnimalVaccinationCreate;
