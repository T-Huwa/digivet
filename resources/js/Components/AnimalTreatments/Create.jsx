import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const AnimalTreatmentCreate = () => {
  const { errors } = usePage().props;
  const { data, setData, post, processing } = useForm({
    appointment_id: '',
    animal_id: '',
    date_of_treatment: '',
    disease_condition: '',
    symptoms_observed: [],
    temperature: '',
    heart_rate: '',
    respiratory_rate: '',
    treatment_administered: '',
    drug_name: '',
    dosage: '',
    route_of_administration: '',
    frequency_of_administration: '',
    duration_of_treatment: '',
    follow_up_date: '',
    side_effects_observed: '',
    treatment_outcome: '',
    extension_officer_name: '',
    additional_notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('animal-treatments.store'));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedSymptoms = checked
        ? [...data.symptoms_observed, value]
        : data.symptoms_observed.filter(symptom => symptom !== value);
      setData('symptoms_observed', updatedSymptoms);
    } else {
      setData(name, value);
    }
  };

  return (
    
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">New Animal Treatment</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="appointment_id" className="block text-sm font-medium text-gray-700">Appointment ID</label>
              <input
                type="text"
                id="appointment_id"
                name="appointment_id"
                value={data.appointment_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.appointment_id && <div className="text-red-500 text-xs mt-1">{errors.appointment_id}</div>}
            </div>

            <div>
              <label htmlFor="animal_id" className="block text-sm font-medium text-gray-700">Animal ID</label>
              <input
                type="text"
                id="animal_id"
                name="animal_id"
                value={data.animal_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.animal_id && <div className="text-red-500 text-xs mt-1">{errors.animal_id}</div>}
            </div>

            <div>
              <label htmlFor="date_of_treatment" className="block text-sm font-medium text-gray-700">Date of Treatment</label>
              <input
                type="date"
                id="date_of_treatment"
                name="date_of_treatment"
                value={data.date_of_treatment}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.date_of_treatment && <div className="text-red-500 text-xs mt-1">{errors.date_of_treatment}</div>}
            </div>

            <div>
              <label htmlFor="disease_condition" className="block text-sm font-medium text-gray-700">Disease/Condition</label>
              <select
                id="disease_condition"
                name="disease_condition"
                value={data.disease_condition}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a condition</option>
                <option value="Mastitis">Mastitis</option>
                <option value="Foot Rot">Foot Rot</option>
                <option value="Worm Infestation">Worm Infestation</option>
                <option value="Foot and Mouth">Foot and Mouth</option>
                <option value="Bovine Leukemia">Bovine Leukemia</option>
                <option value="Bloating">Bloating</option>
                <option value="Brucellosis">Brucellosis</option>
                <option value="Other">Other</option>
              </select>
              {errors.disease_condition && <div className="text-red-500 text-xs mt-1">{errors.disease_condition}</div>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Symptoms Observed</label>
              <div className="mt-2 space-y-2">
                {['Fever', 'Diarrhoea', 'Lameness'].map((symptom) => (
                  <div key={symptom} className="flex items-center">
                    <input
                      id={`symptom-${symptom}`}
                      name="symptoms_observed"
                      type="checkbox"
                      value={symptom}
                      checked={data.symptoms_observed.includes(symptom)}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`symptom-${symptom}`} className="ml-2 block text-sm text-gray-900">
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
              {errors.symptoms_observed && <div className="text-red-500 text-xs mt-1">{errors.symptoms_observed}</div>}
            </div>

            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                id="temperature"
                name="temperature"
                value={data.temperature}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.temperature && <div className="text-red-500 text-xs mt-1">{errors.temperature}</div>}
            </div>

            <div>
              <label htmlFor="heart_rate" className="block text-sm font-medium text-gray-700">Heart Rate (BPM)</label>
              <input
                type="number"
                id="heart_rate"
                name="heart_rate"
                value={data.heart_rate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.heart_rate && <div className="text-red-500 text-xs mt-1">{errors.heart_rate}</div>}
            </div>

            <div>
              <label htmlFor="respiratory_rate" className="block text-sm font-medium text-gray-700">Respiratory Rate (RPM)</label>
              <input
                type="number"
                id="respiratory_rate"
                name="respiratory_rate"
                value={data.respiratory_rate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.respiratory_rate && <div className="text-red-500 text-xs mt-1">{errors.respiratory_rate}</div>}
            </div>

            <div>
              <label htmlFor="treatment_administered" className="block text-sm font-medium text-gray-700">Treatment Administered</label>
              <input
                type="text"
                id="treatment_administered"
                name="treatment_administered"
                value={data.treatment_administered}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.treatment_administered && <div className="text-red-500 text-xs mt-1">{errors.treatment_administered}</div>}
            </div>

            <div>
              <label htmlFor="drug_name" className="block text-sm font-medium text-gray-700">Drug Name</label>
              <select
                id="drug_name"
                name="drug_name"
                value={data.drug_name}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a drug</option>
                <option value="Cystorelin">Cystorelin</option>
                <option value="Dariclox">Dariclox</option>
                <option value="Dexamethasone">Dexamethasone</option>
                <option value="Vibarmax first drench">Vibarmax first drench</option>
                <option value="Other">Other</option>
              </select>
              {errors.drug_name && <div className="text-red-500 text-xs mt-1">{errors.drug_name}</div>}
            </div>

            <div>
              <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosage</label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={data.dosage}
                onChange={handleChange}
                placeholder="e.g., 10 mg/kg"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.dosage && <div className="text-red-500 text-xs mt-1">{errors.dosage}</div>}
            </div>

            <div>
              <label htmlFor="route_of_administration" className="block text-sm font-medium text-gray-700">Route of Administration</label>
              <select
                id="route_of_administration"
                name="route_of_administration"
                value={data.route_of_administration}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a route</option>
                <option value="Oral">Oral</option>
                <option value="Intravenous">Intravenous (IV)</option>
                <option value="Intramuscular">Intramuscular (IM)</option>
                <option value="Topical">Topical</option>
              </select>
              {errors.route_of_administration && <div className="text-red-500 text-xs mt-1">{errors.route_of_administration}</div>}
            </div>

            <div>
              <label htmlFor="frequency_of_administration" className="block text-sm font-medium text-gray-700">Frequency of Administration</label>
              <select
                id="frequency_of_administration"
                name="frequency_of_administration"
                value={data.frequency_of_administration}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a frequency</option>
                <option value="Once">Once</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Other">Other</option>
              </select>
              {errors.frequency_of_administration && <div className="text-red-500 text-xs mt-1">{errors.frequency_of_administration}</div>}
            </div>

            <div>
              <label htmlFor="duration_of_treatment" className="block text-sm font-medium text-gray-700">Duration of Treatment (days)</label>
              <input
                type="number"
                id="duration_of_treatment"
                name="duration_of_treatment"
                value={data.duration_of_treatment}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.duration_of_treatment && <div className="text-red-500 text-xs mt-1">{errors.duration_of_treatment}</div>}
            </div>

            <div>
              <label htmlFor="follow_up_date" className="block text-sm font-medium text-gray-700">Follow-Up Date</label>
              <input
                type="date"
                id="follow_up_date"
                name="follow_up_date"
                value={data.follow_up_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.follow_up_date && <div className="text-red-500 text-xs mt-1">{errors.follow_up_date}</div>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="side_effects_observed" className="block text-sm font-medium text-gray-700">Side Effects Observed</label>
              <textarea
                id="side_effects_observed"
                name="side_effects_observed"
                rows="3"
                value={data.side_effects_observed}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.side_effects_observed && <div className="text-red-500 text-xs mt-1">{errors.side_effects_observed}</div>}
            </div>

            <div>
              <label htmlFor="treatment_outcome" className="block text-sm font-medium text-gray-700">Treatment Outcome</label>
              <select
                id="treatment_outcome"
                name="treatment_outcome"
                value={data.treatment_outcome}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select an outcome</option>
                <option value="Resolved">Resolved</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Worsened">Worsened</option>
                <option value="Unknown">Unknown</option>
              </select>
              {errors.treatment_outcome && <div className="text-red-500 text-xs mt-1">{errors.treatment_outcome}</div>}
            </div>

            <div>
              <label htmlFor="extension_officer_name" className="block text-sm font-medium text-gray-700">Extension Officer Name</label>
              <input
                type="text"
                id="extension_officer_name"
                name="extension_officer_name"
                value={data.extension_officer_name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.extension_officer_name && <div className="text-red-500 text-xs mt-1">{errors.extension_officer_name}</div>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                rows="3"
                value={data.additional_notes}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.additional_notes && <div className="text-red-500 text-xs mt-1">{errors.additional_notes}</div>}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {processing ? 'Saving...' : 'Save Treatment'}
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default AnimalTreatmentCreate;

