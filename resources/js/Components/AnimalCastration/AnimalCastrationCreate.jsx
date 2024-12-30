import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const AnimalCastrationCreate = ({id, userId, closeModal}) => {
  const [values, setValues] = useState({
    appointment_id: id,
    animal_id: '9',
    date_of_castration: '',
    animal_age: '',
    age_unit: 'Months',
    castration_method: '',
    method_details: '',
    anesthesia_used: 'None',
    anesthesia_details: '',
    duration_of_procedure: '',
    castration_officer_id: userId,
    equipment_used: '',
    complications_observed: false,
    complication_details: '',
    follow_up_treatment_required: false,
    follow_up_treatment_details: '',
    post_procedure_monitoring: false,
    post_procedure_health_status: 'Healthy',
    health_status_details: '',
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
    router.post(route('animal-castrations.store'), values, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        alert('Animal castration record created successfully');
        closeModal();
      },
      onError: (errors) => {
        setErrors(errors);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Create Animal Castration Record</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_of_castration">
            Date of Castration
          </label>
          <input
            type="date"
            id="date_of_castration"
            value={values.date_of_castration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.date_of_castration && <p className="text-red-500 text-xs italic">{errors.date_of_castration}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_age">
            Animal Age
          </label>
          <input
            type="number"
            id="animal_age"
            value={values.animal_age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.animal_age && <p className="text-red-500 text-xs italic">{errors.animal_age}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age_unit">
            Age Unit
          </label>
          <select
            id="age_unit"
            value={values.age_unit}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </select>
          {errors.age_unit && <p className="text-red-500 text-xs italic">{errors.age_unit}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="castration_method">
            Castration Method
          </label>
          <select
            id="castration_method"
            value={values.castration_method}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select method</option>
            <option value="Surgical">Surgical</option>
            <option value="Banding">Banding</option>
            <option value="Burdizzo">Burdizzo</option>
            <option value="Chemical">Chemical</option>
          </select>
          {errors.castration_method && <p className="text-red-500 text-xs italic">{errors.castration_method}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="method_details">
            Method Details
          </label>
          <textarea
            id="method_details"
            value={values.method_details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
          {errors.method_details && <p className="text-red-500 text-xs italic">{errors.method_details}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="anesthesia_used">
            Anesthesia Used
          </label>
          <select
            id="anesthesia_used"
            value={values.anesthesia_used}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="None">None</option>
            <option value="Local Anesthesia">Local Anesthesia</option>
            <option value="General Anesthesia">General Anesthesia</option>
          </select>
          {errors.anesthesia_used && <p className="text-red-500 text-xs italic">{errors.anesthesia_used}</p>}
        </div>

        {values.anesthesia_used !== 'None' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="anesthesia_details">
              Anesthesia Details
            </label>
            <input
              type="text"
              id="anesthesia_details"
              value={values.anesthesia_details}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.anesthesia_details && <p className="text-red-500 text-xs italic">{errors.anesthesia_details}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration_of_procedure">
            Duration of Procedure (minutes)
          </label>
          <input
            type="number"
            id="duration_of_procedure"
            value={values.duration_of_procedure}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.duration_of_procedure && <p className="text-red-500 text-xs italic">{errors.duration_of_procedure}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipment_used">
            Equipment Used
          </label>
          <input
            type="text"
            id="equipment_used"
            value={values.equipment_used}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.equipment_used && <p className="text-red-500 text-xs italic">{errors.equipment_used}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="complications_observed"
              checked={values.complications_observed}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Complications Observed</span>
          </label>
          {errors.complications_observed && <p className="text-red-500 text-xs italic">{errors.complications_observed}</p>}
        </div>

        {values.complications_observed && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complication_details">
              Complication Details
            </label>
            <textarea
              id="complication_details"
              value={values.complication_details}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            />
            {errors.complication_details && <p className="text-red-500 text-xs italic">{errors.complication_details}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="follow_up_treatment_required"
              checked={values.follow_up_treatment_required}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Follow-up Treatment Required</span>
          </label>
          {errors.follow_up_treatment_required && <p className="text-red-500 text-xs italic">{errors.follow_up_treatment_required}</p>}
        </div>

        {values.follow_up_treatment_required && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="follow_up_treatment_details">
              Follow-up Treatment Details
            </label>
            <textarea
              id="follow_up_treatment_details"
              value={values.follow_up_treatment_details}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            />
            {errors.follow_up_treatment_details && <p className="text-red-500 text-xs italic">{errors.follow_up_treatment_details}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="post_procedure_monitoring"
              checked={values.post_procedure_monitoring}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Post-Procedure Monitoring</span>
          </label>
          {errors.post_procedure_monitoring && <p className="text-red-500 text-xs italic">{errors.post_procedure_monitoring}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post_procedure_health_status">
            Post-Procedure Health Status
          </label>
          <select
            id="post_procedure_health_status"
            value={values.post_procedure_health_status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Healthy">Healthy</option>
            <option value="Mild Complication">Mild Complication</option>
            <option value="Severe Complication">Severe Complication</option>
            <option value="Other">Other</option>
          </select>
          {errors.post_procedure_health_status && <p className="text-red-500 text-xs italic">{errors.post_procedure_health_status}</p>}
        </div>

        {values.post_procedure_health_status === 'Other' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="health_status_details">
              Health Status Details
            </label>
            <textarea
              id="health_status_details"
              value={values.health_status_details}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            />
            {errors.health_status_details && <p className="text-red-500 text-xs italic">{errors.health_status_details}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additional_notes">
            Additional Notes
          </label>
          <textarea
            id="additional_notes"
            value={values.additional_notes}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          />
          {errors.additional_notes && <p className="text-red-500 text-xs italic">{errors.additional_notes}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Castration Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimalCastrationCreate;

