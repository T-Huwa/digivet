import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function Create() {
  const { errors } = usePage().props;
  const [values, setValues] = useState({
    appointment_id: '',
    animal_id: '',
    date_of_treatment: '',
    treatment_type: '',
    targeted_pests: [],
    chemical_product: '',
    chemical_concentration: '',
    solution_volume: '',
    animals_treated_count: '',
    pre_treatment_health: '',
    skin_conditions: [],
    post_treatment_observations: '',
    environmental_conditions: '',
    follow_up_date: '',
    extension_officer_id: '',
    additional_notes: ''
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.type === 'select-multiple'
        ? Array.from(e.target.selectedOptions, option => option.value)
        : e.target.value;

    setValues(values => ({
      ...values,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    Inertia.post('/animal-dippings', values);
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Animal Dipping Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="appointment_id" className="block text-sm font-medium text-gray-700">Appointment ID</label>
          <input
            id="appointment_id"
            type="text"
            value={values.appointment_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.appointment_id && <div className="text-red-500">{errors.appointment_id}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="animal_id" className="block text-sm font-medium text-gray-700">Animal ID</label>
          <input
            id="animal_id"
            type="text"
            value={values.animal_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.animal_id && <div className="text-red-500">{errors.animal_id}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="date_of_treatment" className="block text-sm font-medium text-gray-700">Date of Treatment</label>
          <input
            id="date_of_treatment"
            type="date"
            value={values.date_of_treatment}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.date_of_treatment && <div className="text-red-500">{errors.date_of_treatment}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="treatment_type" className="block text-sm font-medium text-gray-700">Treatment Type</label>
          <select
            id="treatment_type"
            value={values.treatment_type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select treatment type</option>
            <option value="Dipping">Dipping</option>
            <option value="Spraying">Spraying</option>
          </select>
          {errors.treatment_type && <div className="text-red-500">{errors.treatment_type}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="targeted_pests" className="block text-sm font-medium text-gray-700">Targeted Pests</label>
          <select
            id="targeted_pests"
            multiple
            value={values.targeted_pests}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="Ticks">Ticks</option>
            <option value="Fleas">Fleas</option>
            <option value="Mites">Mites</option>
            <option value="Lice">Lice</option>
          </select>
          {errors.targeted_pests && <div className="text-red-500">{errors.targeted_pests}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="chemical_product" className="block text-sm font-medium text-gray-700">Chemical Product</label>
          <input
            id="chemical_product"
            type="text"
            value={values.chemical_product}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.chemical_product && <div className="text-red-500">{errors.chemical_product}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="chemical_concentration" className="block text-sm font-medium text-gray-700">Chemical Concentration (%)</label>
          <input
            id="chemical_concentration"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={values.chemical_concentration}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.chemical_concentration && <div className="text-red-500">{errors.chemical_concentration}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="solution_volume" className="block text-sm font-medium text-gray-700">Solution Volume</label>
          <input
            id="solution_volume"
            type="number"
            min="0"
            step="0.1"
            value={values.solution_volume}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.solution_volume && <div className="text-red-500">{errors.solution_volume}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="animals_treated_count" className="block text-sm font-medium text-gray-700">Number of Animals Treated</label>
          <input
            id="animals_treated_count"
            type="number"
            min="1"
            value={values.animals_treated_count}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.animals_treated_count && <div className="text-red-500">{errors.animals_treated_count}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="pre_treatment_health" className="block text-sm font-medium text-gray-700">Pre-treatment Health</label>
          <select
            id="pre_treatment_health"
            value={values.pre_treatment_health}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select pre-treatment health</option>
            <option value="Healthy">Healthy</option>
            <option value="Sick">Sick</option>
            <option value="Injured">Injured</option>
          </select>
          {errors.pre_treatment_health && <div className="text-red-500">{errors.pre_treatment_health}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="skin_conditions" className="block text-sm font-medium text-gray-700">Skin Conditions</label>
          <select
            id="skin_conditions"
            multiple
            value={values.skin_conditions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="Rash">Rash</option>
            <option value="Lesions">Lesions</option>
            <option value="Hair loss">Hair loss</option>
            <option value="Inflammation">Inflammation</option>
          </select>
          {errors.skin_conditions && <div className="text-red-500">{errors.skin_conditions}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="post_treatment_observations" className="block text-sm font-medium text-gray-700">Post-treatment Observations</label>
          <textarea
            id="post_treatment_observations"
            value={values.post_treatment_observations}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
          {errors.post_treatment_observations && <div className="text-red-500">{errors.post_treatment_observations}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="environmental_conditions" className="block text-sm font-medium text-gray-700">Environmental Conditions</label>
          <select
            id="environmental_conditions"
            value={values.environmental_conditions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select environmental conditions</option>
            <option value="Sunny">Sunny</option>
            <option value="Rainy">Rainy</option>
            <option value="Overcast">Overcast</option>
            <option value="Windy">Windy</option>
          </select>
          {errors.environmental_conditions && <div className="text-red-500">{errors.environmental_conditions}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="follow_up_date" className="block text-sm font-medium text-gray-700">Follow-up Date</label>
          <input
            id="follow_up_date"
            type="date"
            value={values.follow_up_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.follow_up_date && <div className="text-red-500">{errors.follow_up_date}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="extension_officer_id" className="block text-sm font-medium text-gray-700">Extension Officer ID</label>
          <input
            id="extension_officer_id"
            type="text"
            value={values.extension_officer_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.extension_officer_id && <div className="text-red-500">{errors.extension_officer_id}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            id="additional_notes"
            value={values.additional_notes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
          {errors.additional_notes && <div className="text-red-500">{errors.additional_notes}</div>}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Treatment Record
          </button>
        </div>
      </form>
    </div>
  );
}

