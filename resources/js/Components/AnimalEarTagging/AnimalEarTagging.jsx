import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

const AnimalEarTaggingCreate = ({ id, userId, closeModal }) => {
  const { errors } = usePage().props;
  const [formData, setFormData] = useState({
    appointment_id: id,
    animal_id: 'tr',
    date_of_ear_tagging: '',
    ear_tag_number: '',
    tagging_method: 'Manual',
    ear_tag_type: 'Plastic',
    ear_tag_color: 'Red',
    custom_color: '',
    animal_age: '',
    age_unit: 'Months',
    sex_of_animal: 'Male',
    ear_condition: 'Normal',
    ear_condition_notes: '',
    health_condition: 'Healthy',
    health_condition_details: '',
    veterinarian_id: userId,
    location: '',
    purpose_of_tagging: 'Identification',
    purpose_notes: '',
    additional_notes: '',
    follow_up_required: false,
    follow_up_action: '',
    follow_up_date: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('animal-ear-taggings.store'), formData, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        alert('Animal ear tagging record created successfully!');
        closeModal();
        },
        onError: (errors) => {
          console.log(errors);
          
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="date_of_ear_tagging" className="block text-sm font-medium text-gray-700">
          Date of Ear Tagging
        </label>
        <input
          type="date"
          name="date_of_ear_tagging"
          id="date_of_ear_tagging"
          value={formData.date_of_ear_tagging}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.date_of_ear_tagging ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.date_of_ear_tagging && (
          <p className="mt-1 text-sm text-red-500">{errors.date_of_ear_tagging}</p>
        )}
      </div>

      <div>
        <label htmlFor="ear_tag_number" className="block text-sm font-medium text-gray-700">
          Ear Tag Number
        </label>
        <input
          type="text"
          name="ear_tag_number"
          id="ear_tag_number"
          value={formData.ear_tag_number}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.ear_tag_number ? 'border-red-500' : ''
          }`}
          required
        />
        {errors.ear_tag_number && (
          <p className="mt-1 text-sm text-red-500">{errors.ear_tag_number}</p>
        )}
      </div>

      <div>
        <label htmlFor="tagging_method" className="block text-sm font-medium text-gray-700">
          Tagging Method
        </label>
        <select
          name="tagging_method"
          id="tagging_method"
          value={formData.tagging_method}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.tagging_method ? 'border-red-500' : ''
          }`}
          required
        >
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
        {errors.tagging_method && (
          <p className="mt-1 text-sm text-red-500">{errors.tagging_method}</p>
        )}
      </div>

      <div>
        <label htmlFor="ear_tag_type" className="block text-sm font-medium text-gray-700">
          Ear Tag Type
        </label>
        <select
          name="ear_tag_type"
          id="ear_tag_type"
          value={formData.ear_tag_type}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.ear_tag_type ? 'border-red-500' : ''
          }`}
          required
        >
          <option value="Plastic">Plastic</option>
          <option value="Metal">Metal</option>
          <option value="RFID">RFID</option>
          <option value="Barcode">Barcode</option>
        </select>
        {errors.ear_tag_type && (
          <p className="mt-1 text-sm text-red-500">{errors.ear_tag_type}</p>
        )}
      </div>

<div>
  <label htmlFor="ear_tag_color" className="block text-sm font-medium text-gray-700">
    Ear Tag Color
  </label>
  <select
    name="ear_tag_color"
    id="ear_tag_color"
    value={formData.ear_tag_color}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.ear_tag_color ? 'border-red-500' : ''
    }`}
    required
  >
    <option value="Red">Red</option>
    <option value="Blue">Blue</option>
    <option value="Green">Green</option>
    <option value="Yellow">Yellow</option>
    <option value="Custom">Custom</option>
  </select>
  {errors.ear_tag_color && (
    <p className="mt-1 text-sm text-red-500">{errors.ear_tag_color}</p>
  )}
</div>

{formData.ear_tag_color === 'Custom' && (
  <div>
    <label htmlFor="custom_color" className="block text-sm font-medium text-gray-700">
      Custom Color
    </label>
    <input
      type="text"
      name="custom_color"
      id="custom_color"
      value={formData.custom_color}
      onChange={handleChange}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
        errors.custom_color ? 'border-red-500' : ''
      }`}
      required
    />
    {errors.custom_color && (
      <p className="mt-1 text-sm text-red-500">{errors.custom_color}</p>
    )}
  </div>
)}

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
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.animal_age ? 'border-red-500' : ''
    }`}
    required
  />
  {errors.animal_age && (
    <p className="mt-1 text-sm text-red-500">{errors.animal_age}</p>
  )}
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
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.age_unit ? 'border-red-500' : ''
    }`}
    required
  >
    <option value="Months">Months</option>
    <option value="Years">Years</option>
  </select>
  {errors.age_unit && (
    <p className="mt-1 text-sm text-red-500">{errors.age_unit}</p>
  )}
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
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.sex_of_animal ? 'border-red-500' : ''
    }`}
    required
  >
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
  {errors.sex_of_animal && (
    <p className="mt-1 text-sm text-red-500">{errors.sex_of_animal}</p>
  )}
</div>

<div>
  <label htmlFor="ear_condition" className="block text-sm font-medium text-gray-700">
    Ear Condition
  </label>
  <input
    type="text"
    name="ear_condition"
    id="ear_condition"
    value={formData.ear_condition}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.ear_condition ? 'border-red-500' : ''
    }`}
    required
  />
  {errors.ear_condition && (
    <p className="mt-1 text-sm text-red-500">{errors.ear_condition}</p>
  )}
</div>

<div>
  <label htmlFor="ear_condition_notes" className="block text-sm font-medium text-gray-700">
    Ear Condition Notes
  </label>
  <textarea
    name="ear_condition_notes"
    id="ear_condition_notes"
    value={formData.ear_condition_notes}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.ear_condition_notes ? 'border-red-500' : ''
    }`}
    rows="3"
  />
  {errors.ear_condition_notes && (
    <p className="mt-1 text-sm text-red-500">{errors.ear_condition_notes}</p>
  )}
</div>

<div>
  <label htmlFor="health_condition" className="block text-sm font-medium text-gray-700">
    Health Condition
  </label>
  <input
    type="text"
    name="health_condition"
    id="health_condition"
    value={formData.health_condition}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.health_condition ? 'border-red-500' : ''
    }`}
    required
  />
  {errors.health_condition && (
    <p className="mt-1 text-sm text-red-500">{errors.health_condition}</p>
  )}
</div>

<div>
  <label htmlFor="health_condition_details" className="block text-sm font-medium text-gray-700">
    Health Condition Details
  </label>
  <textarea
    name="health_condition_details"
    id="health_condition_details"
    value={formData.health_condition_details}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.health_condition_details ? 'border-red-500' : ''
    }`}
    rows="3"
  />
  {errors.health_condition_details && (
    <p className="mt-1 text-sm text-red-500">{errors.health_condition_details}</p>
  )}
</div>

<div>
  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
    Location
  </label>
  <input
    type="text"
    name="location"
    id="location"
    value={formData.location}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.location ? 'border-red-500' : ''
    }`}
    required
  />
  {errors.location && (
    <p className="mt-1 text-sm text-red-500">{errors.location}</p>
  )}
</div>

<div>
  <label htmlFor="purpose_of_tagging" className="block text-sm font-medium text-gray-700">
    Purpose of Tagging
  </label>
  <input
    type="text"
    name="purpose_of_tagging"
    id="purpose_of_tagging"
    value={formData.purpose_of_tagging}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.purpose_of_tagging ? 'border-red-500' : ''
    }`}
    required
  />
  {errors.purpose_of_tagging && (
    <p className="mt-1 text-sm text-red-500">{errors.purpose_of_tagging}</p>
  )}
</div>

<div>
  <label htmlFor="purpose_notes" className="block text-sm font-medium text-gray-700">
    Purpose Notes
  </label>
  <textarea
    name="purpose_notes"
    id="purpose_notes"
    value={formData.purpose_notes}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.purpose_notes ? 'border-red-500' : ''
    }`}
    rows="3"
  />
  {errors.purpose_notes && (
    <p className="mt-1 text-sm text-red-500">{errors.purpose_notes}</p>
  )}
</div>

<div>
  <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">
    Additional Notes
  </label>
  <textarea
    name="additional_notes"
    id="additional_notes"
    value={formData.additional_notes}
    onChange={handleChange}
    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors.additional_notes ? 'border-red-500' : ''
    }`}
    rows="3"
  />
  {errors.additional_notes && (
    <p className="mt-1 text-sm text-red-500">{errors.additional_notes}</p>
  )}
</div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="follow_up_required"
          id="follow_up_required"
          checked={formData.follow_up_required}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="follow_up_required" className="ml-2 text-sm font-medium text-gray-700">
          Follow Up Required
        </label>
      </div>

      {formData.follow_up_required && (
        <>
          <div>
            <label htmlFor="follow_up_action" className="block text-sm font-medium text-gray-700">
              Follow Up Action
            </label>
            <input
              type="text"
              name="follow_up_action"
              id="follow_up_action"
              value={formData.follow_up_action}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.follow_up_action ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.follow_up_action && (
              <p className="mt-1 text-sm text-red-500">{errors.follow_up_action}</p>
            )}
          </div>

          <div>
            <label htmlFor="follow_up_date" className="block text-sm font-medium text-gray-700">
              Follow Up Date
            </label>
            <input
              type="date"
              name="follow_up_date"
              id="follow_up_date"
              value={formData.follow_up_date}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.follow_up_date ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.follow_up_date && (
              <p className="mt-1 text-sm text-red-500">{errors.follow_up_date}</p>
            )}
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AnimalEarTaggingCreate;