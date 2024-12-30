import { router } from '@inertiajs/react';
import React, { useState } from 'react';

const AnimalTeethClippingCreate = ({ id, userId, closeModal }) => {
  const [values, setValues] = useState({
    appointment_id: id,
    animal_id: 6,
    date_of_teeth_clipping: '',
    animal_age: '',
    age_unit: 'Months',
    sex_of_animal: 'Male',
    teeth_condition: 'Healthy',
    teeth_condition_notes: '',
    teeth_clipping_method: 'Manual',
    teeth_clipping_procedure: 'Full Clip',
    veterinarian_id: userId,
    clipping_tools: 'Scissors',
    other_clipping_tool: '',
    pain_management_applied: false,
    pain_management_type: '',
    clipping_outcome: 'Successful',
    outcome_notes: '',
    follow_up_required: false,
    follow_up_action: '',
    follow_up_date: '',
    animal_health_condition: 'Healthy',
    health_condition_details: '',
    additional_notes: '',
    anesthetic_used: false,
    anesthetic_type: '',
    duration_of_procedure: '',
    procedure_cost: '',
    responsible_staff: userId,
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { id, type, value, checked } }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('animal-teeth-clippings.store'), values, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
          alert('Animal teeth clipping record created successfully');
          closeModal();
      },
        onError: (errors) => {
          console.log(errors);
          
        setErrors(errors);
        }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Create Animal Teeth Clipping Record</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_of_teeth_clipping">
            Date of Teeth Clipping
          </label>
          <input
            type="date"
            id="date_of_teeth_clipping"
            value={values.date_of_teeth_clipping}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.date_of_teeth_clipping && <p className="text-red-500 text-xs italic">{errors.date_of_teeth_clipping}</p>}
        </div>

  <div>
    <label htmlFor="teeth_condition_notes" className="block text-sm font-medium text-gray-700">
      Teeth Condition Notes
    </label>
    <textarea
      id="teeth_condition_notes"
      value={values.teeth_condition_notes}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    ></textarea>
    {errors.teeth_condition_notes && <p className="text-red-500 text-xs italic">{errors.teeth_condition_notes}</p>}
  </div>

  <div>
    <label htmlFor="pain_management_type" className="block text-sm font-medium text-gray-700">
      Pain Management Type
    </label>
    <input
      type="text"
      id="pain_management_type"
      value={values.pain_management_type}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.pain_management_type && <p className="text-red-500 text-xs italic">{errors.pain_management_type}</p>}
  </div>

  <div>
    <label htmlFor="clipping_outcome" className="block text-sm font-medium text-gray-700">
      Clipping Outcome
    </label>
    <select
      id="clipping_outcome"
      value={values.clipping_outcome}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Successful">Successful</option>
      <option value="Unsuccessful">Unsuccessful</option>
    </select>
    {errors.clipping_outcome && <p className="text-red-500 text-xs italic">{errors.clipping_outcome}</p>}
  </div>

  <div>
    <label htmlFor="follow_up_action" className="block text-sm font-medium text-gray-700">
      Follow-Up Action
    </label>
    <textarea
      id="follow_up_action"
      value={values.follow_up_action}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    ></textarea>
    {errors.follow_up_action && <p className="text-red-500 text-xs italic">{errors.follow_up_action}</p>}
  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
  <div>
    <label htmlFor="animal_age" className="block text-sm font-medium text-gray-700">
      Animal Age
    </label>
    <input
      type="number"
      id="animal_age"
      value={values.animal_age}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.animal_age && <p className="text-red-500 text-xs italic">{errors.animal_age}</p>}
  </div>

  <div>
    <label htmlFor="age_unit" className="block text-sm font-medium text-gray-700">
      Age Unit
    </label>
    <select
      id="age_unit"
      value={values.age_unit}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Days">Days</option>
      <option value="Months">Months</option>
      <option value="Years">Years</option>
    </select>
    {errors.age_unit && <p className="text-red-500 text-xs italic">{errors.age_unit}</p>}
  </div>

  <div>
    <label htmlFor="sex_of_animal" className="block text-sm font-medium text-gray-700">
      Sex of Animal
    </label>
    <select
      id="sex_of_animal"
      value={values.sex_of_animal}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    {errors.sex_of_animal && <p className="text-red-500 text-xs italic">{errors.sex_of_animal}</p>}
  </div>

  <div>
    <label htmlFor="teeth_condition" className="block text-sm font-medium text-gray-700">
      Teeth Condition
    </label>
    <select
      id="teeth_condition"
      value={values.teeth_condition}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Healthy">Healthy</option>
      <option value="Damaged">Damaged</option>
      <option value="Broken">Broken</option>
    </select>
    {errors.teeth_condition && <p className="text-red-500 text-xs italic">{errors.teeth_condition}</p>}
  </div>

  <div>
    <label htmlFor="teeth_clipping_method" className="block text-sm font-medium text-gray-700">
      Teeth Clipping Method
    </label>
    <select
      id="teeth_clipping_method"
      value={values.teeth_clipping_method}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Manual">Manual</option>
      <option value="Electric">Electric</option>
    </select>
    {errors.teeth_clipping_method && <p className="text-red-500 text-xs italic">{errors.teeth_clipping_method}</p>}
  </div>

  <div>
    <label htmlFor="teeth_clipping_procedure" className="block text-sm font-medium text-gray-700">
      Teeth Clipping Procedure
    </label>
    <select
      id="teeth_clipping_procedure"
      value={values.teeth_clipping_procedure}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Full Clip">Full Clip</option>
      <option value="Partial Clip">Partial Clip</option>
    </select>
    {errors.teeth_clipping_procedure && <p className="text-red-500 text-xs italic">{errors.teeth_clipping_procedure}</p>}
  </div>

  <div>
    <label htmlFor="clipping_tools" className="block text-sm font-medium text-gray-700">
      Clipping Tools
    </label>
    <input
      type="text"
      id="clipping_tools"
      value={values.clipping_tools}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.clipping_tools && <p className="text-red-500 text-xs italic">{errors.clipping_tools}</p>}
  </div>

  <div>
    <label htmlFor="other_clipping_tool" className="block text-sm font-medium text-gray-700">
      Other Clipping Tool (if any)
    </label>
    <input
      type="text"
      id="other_clipping_tool"
      value={values.other_clipping_tool}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.other_clipping_tool && <p className="text-red-500 text-xs italic">{errors.other_clipping_tool}</p>}
  </div>

  <div>
    <label htmlFor="animal_health_condition" className="block text-sm font-medium text-gray-700">
      Animal Health Condition
    </label>
    <select
      id="animal_health_condition"
      value={values.animal_health_condition}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="Healthy">Healthy</option>
      <option value="Unhealthy">Unhealthy</option>
    </select>
    {errors.animal_health_condition && <p className="text-red-500 text-xs italic">{errors.animal_health_condition}</p>}
  </div>

  <div>
    <label htmlFor="health_condition_details" className="block text-sm font-medium text-gray-700">
      Health Condition Details
    </label>
    <textarea
      id="health_condition_details"
      value={values.health_condition_details}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    ></textarea>
    {errors.health_condition_details && <p className="text-red-500 text-xs italic">{errors.health_condition_details}</p>}
  </div>

  <div>
    <label htmlFor="outcome_notes" className="block text-sm font-medium text-gray-700">
      Outcome Notes
    </label>
    <textarea
      id="outcome_notes"
      value={values.outcome_notes}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    ></textarea>
    {errors.outcome_notes && <p className="text-red-500 text-xs italic">{errors.outcome_notes}</p>}
  </div>

  <div>
    <label htmlFor="follow_up_date" className="block text-sm font-medium text-gray-700">
      Follow-Up Date
    </label>
    <input
      type="date"
      id="follow_up_date"
      value={values.follow_up_date}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.follow_up_date && <p className="text-red-500 text-xs italic">{errors.follow_up_date}</p>}
  </div>

  <div>
    <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">
      Additional Notes
    </label>
    <textarea
      id="additional_notes"
      value={values.additional_notes}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    ></textarea>
    {errors.additional_notes && <p className="text-red-500 text-xs italic">{errors.additional_notes}</p>}
  </div>

  <div>
    <label htmlFor="duration_of_procedure" className="block text-sm font-medium text-gray-700">
      Duration of Procedure (in minutes)
    </label>
    <input
      type="number"
      id="duration_of_procedure"
      value={values.duration_of_procedure}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.duration_of_procedure && <p className="text-red-500 text-xs italic">{errors.duration_of_procedure}</p>}
  </div>

  <div>
    <label htmlFor="procedure_cost" className="block text-sm font-medium text-gray-700">
      Procedure Cost
    </label>
    <input
      type="number"
      id="procedure_cost"
      value={values.procedure_cost}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.procedure_cost && <p className="text-red-500 text-xs italic">{errors.procedure_cost}</p>}
  </div>

  <div>
    <label htmlFor="anesthetic_used" className="block text-sm font-medium text-gray-700">
      Anesthetic Used
    </label>
    <input
      type="checkbox"
      id="anesthetic_used"
      checked={values.anesthetic_used}
      onChange={handleChange}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    {errors.anesthetic_used && <p className="text-red-500 text-xs italic">{errors.anesthetic_used}</p>}
  </div>

  <div>
    <label htmlFor="anesthetic_type" className="block text-sm font-medium text-gray-700">
      Anesthetic Type
    </label>
    <input
      type="text"
      id="anesthetic_type"
      value={values.anesthetic_type}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    {errors.anesthetic_type && <p className="text-red-500 text-xs italic">{errors.anesthetic_type}</p>}
  </div>
</div>


        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Teeth Clipping Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimalTeethClippingCreate;
