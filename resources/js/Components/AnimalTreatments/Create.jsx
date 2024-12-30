import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function AnimalTreatmentCreate({id, userId, closeModal}) {
  const [values, setValues] = useState({
    appointment_id: id,
    animal_id: '',
    date_of_treatment: '',
    disease_condition: '',
    symptoms_observed: '',
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
    extension_officer_name: toString(userId),
    additional_notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    
    router.post(route('animal-treatments.store'), values, {
      onSuccess: (response) => {
        console.log(response);
        alert("Completed Successfully");
        closeModal();
      },
      onError: (errors) => {
        setErrors(errors);
        console.log(errors);
      },
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Create Animal Treatment Record</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_id">
            Animal
          </label>
          <input
            type="text"
            id="animal_id"
            value={values.animal_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.animal_id && <p className="text-red-500 text-xs italic">{errors.animal_id}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_of_treatment">
            Date of Treatment
          </label>
          <input
            type="date"
            id="date_of_treatment"
            value={values.date_of_treatment}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.date_of_treatment && <p className="text-red-500 text-xs italic">{errors.date_of_treatment}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="disease_condition">
            Disease Condition
          </label>
          <input
            type="text"
            id="disease_condition"
            value={values.disease_condition}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.disease_condition && <p className="text-red-500 text-xs italic">{errors.disease_condition}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symptoms_observed">
            Symptoms Observed
          </label>
          <textarea
            id="symptoms_observed"
            value={values.symptoms_observed}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.symptoms_observed && <p className="text-red-500 text-xs italic">{errors.symptoms_observed}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperature">
            Temperature
          </label>
          <input
            type="number"
            step="0.1"
            id="temperature"
            value={values.temperature}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.temperature && <p className="text-red-500 text-xs italic">{errors.temperature}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heart_rate">
            Heart Rate
          </label>
          <input
            type="number"
            id="heart_rate"
            value={values.heart_rate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.heart_rate && <p className="text-red-500 text-xs italic">{errors.heart_rate}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="respiratory_rate">
            Respiratory Rate
          </label>
          <input
            type="number"
            id="respiratory_rate"
            value={values.respiratory_rate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.respiratory_rate && <p className="text-red-500 text-xs italic">{errors.respiratory_rate}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment_administered">
            Treatment Administered
          </label>
          <input
            type="text"
            id="treatment_administered"
            value={values.treatment_administered}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.treatment_administered && <p className="text-red-500 text-xs italic">{errors.treatment_administered}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="drug_name">
            Drug Name
          </label>
          <input
            type="text"
            id="drug_name"
            value={values.drug_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.drug_name && <p className="text-red-500 text-xs italic">{errors.drug_name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dosage">
            Dosage
          </label>
          <input
            type="text"
            id="dosage"
            value={values.dosage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dosage && <p className="text-red-500 text-xs italic">{errors.dosage}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="route_of_administration">
            Route of Administration
          </label>
          <select
            id="route_of_administration"
            value={values.route_of_administration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select route</option>
            <option value="Oral">Oral</option>
            <option value="Intravenous">Intravenous</option>
            <option value="Intramuscular">Intramuscular</option>
            <option value="Topical">Topical</option>
          </select>
          {errors.route_of_administration && <p className="text-red-500 text-xs italic">{errors.route_of_administration}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency_of_administration">
            Frequency of Administration
          </label>
          <select
            id="frequency_of_administration"
            value={values.frequency_of_administration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select frequency</option>
            <option value="Once">Once</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Other">Other</option>
          </select>
          {errors.frequency_of_administration && <p className="text-red-500 text-xs italic">{errors.frequency_of_administration}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration_of_treatment">
            Duration of Treatment (days)
          </label>
          <input
            type="number"
            id="duration_of_treatment"
            value={values.duration_of_treatment}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.duration_of_treatment && <p className="text-red-500 text-xs italic">{errors.duration_of_treatment}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="follow_up_date">
            Follow-up Date
          </label>
          <input
            type="date"
            id="follow_up_date"
            value={values.follow_up_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.follow_up_date && <p className="text-red-500 text-xs italic">{errors.follow_up_date}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="side_effects_observed">
            Side Effects Observed
          </label>
          <textarea
            id="side_effects_observed"
            value={values.side_effects_observed}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.side_effects_observed && <p className="text-red-500 text-xs italic">{errors.side_effects_observed}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment_outcome">
            Treatment Outcome
          </label>
          <select
            id="treatment_outcome"
            value={values.treatment_outcome}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select outcome</option>
            <option value="Resolved">Resolved</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Worsened">Worsened</option>
            <option value="Unknown">Unknown</option>
          </select>
          {errors.treatment_outcome && <p className="text-red-500 text-xs italic">{errors.treatment_outcome}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additional_notes">
            Additional Notes
          </label>
          <textarea
            id="additional_notes"
            value={values.additional_notes}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.additional_notes && <p className="text-red-500 text-xs italic">{errors.additional_notes}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Treatment Record
          </button>
        </div>
      </form>
    </div>
  );
}

