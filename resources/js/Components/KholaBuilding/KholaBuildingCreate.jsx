import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function KholaBuildingCreate({id, userId, closeModal}) {
  const [formData, setFormData] = useState({
    appointment_id: id,
    animal_id: '4',
    construction_start_date: '',
    construction_officer_id: userId,
    khola_type: '',
    material_used: '',
    other_material: '',
    khola_size: '',
    number_of_compartments: '',
    ventilation_type: '',
    flooring_type: '',
    other_flooring: '',
    roof_type: '',
    other_roof: '',
    drainage_system_installed: false,
    animal_health_safety_features: false,
    estimated_cost: '',
    construction_method: '',
    completion_date: '',
    completion_status: '',
    animal_accommodation_capacity: '',
    post_construction_inspection: '',
    follow_up_action_required: false,
    follow_up_action_details: '',
    additional_notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await router.post(route('khola.store'), formData);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Khola Building Record</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="appointment_id" className="block text-sm font-medium text-gray-700">Appointment ID</label>
            <input
              type="text"
              id="appointment_id"
              name="appointment_id"
              value={formData.appointment_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.appointment_id && <p className="mt-1 text-sm text-red-600">{errors.appointment_id}</p>}
          </div>

          <div>
            <label htmlFor="animal_id" className="block text-sm font-medium text-gray-700">Animal ID</label>
            <input
              type="text"
              id="animal_id"
              name="animal_id"
              value={formData.animal_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.animal_id && <p className="mt-1 text-sm text-red-600">{errors.animal_id}</p>}
          </div>

          <div>
            <label htmlFor="construction_start_date" className="block text-sm font-medium text-gray-700">Construction Start Date</label>
            <input
              type="date"
              id="construction_start_date"
              name="construction_start_date"
              value={formData.construction_start_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.construction_start_date && <p className="mt-1 text-sm text-red-600">{errors.construction_start_date}</p>}
          </div>

          <div>
            <label htmlFor="construction_officer_id" className="block text-sm font-medium text-gray-700">Construction Officer ID</label>
            <input
              type="text"
              id="construction_officer_id"
              name="construction_officer_id"
              value={formData.construction_officer_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.construction_officer_id && <p className="mt-1 text-sm text-red-600">{errors.construction_officer_id}</p>}
          </div>

          <div>
            <label htmlFor="khola_type" className="block text-sm font-medium text-gray-700">Khola Type</label>
            <select
              id="khola_type"
              name="khola_type"
              value={formData.khola_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Khola Type</option>
              <option value="Traditional">Traditional</option>
              <option value="Modern">Modern</option>
              <option value="Semi-modern">Semi-modern</option>
            </select>
            {errors.khola_type && <p className="mt-1 text-sm text-red-600">{errors.khola_type}</p>}
          </div>

          <div>
            <label htmlFor="material_used" className="block text-sm font-medium text-gray-700">Material Used</label>
            <select
              id="material_used"
              name="material_used"
              value={formData.material_used}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Material</option>
              <option value="Wood">Wood</option>
              <option value="Mud">Mud</option>
              <option value="Thatch">Thatch</option>
              <option value="Cement">Cement</option>
              <option value="Steel">Steel</option>
              <option value="Others">Others</option>
            </select>
            {errors.material_used && <p className="mt-1 text-sm text-red-600">{errors.material_used}</p>}
          </div>

          {formData.material_used === 'Others' && (
            <div>
              <label htmlFor="other_material" className="block text-sm font-medium text-gray-700">Other Material</label>
              <input
                type="text"
                id="other_material"
                name="other_material"
                value={formData.other_material}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.other_material && <p className="mt-1 text-sm text-red-600">{errors.other_material}</p>}
            </div>
          )}

          <div>
            <label htmlFor="khola_size" className="block text-sm font-medium text-gray-700">Khola Size</label>
            <input
              type="text"
              id="khola_size"
              name="khola_size"
              value={formData.khola_size}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.khola_size && <p className="mt-1 text-sm text-red-600">{errors.khola_size}</p>}
          </div>

          <div>
            <label htmlFor="number_of_compartments" className="block text-sm font-medium text-gray-700">Number of Compartments</label>
            <input
              type="number"
              id="number_of_compartments"
              name="number_of_compartments"
              value={formData.number_of_compartments}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.number_of_compartments && <p className="mt-1 text-sm text-red-600">{errors.number_of_compartments}</p>}
          </div>

          <div>
            <label htmlFor="ventilation_type" className="block text-sm font-medium text-gray-700">Ventilation Type</label>
            <select
              id="ventilation_type"
              name="ventilation_type"
              value={formData.ventilation_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Ventilation Type</option>
              <option value="Natural">Natural</option>
              <option value="Artificial">Artificial</option>
              <option value="Both">Both</option>
            </select>
            {errors.ventilation_type && <p className="mt-1 text-sm text-red-600">{errors.ventilation_type}</p>}
          </div>

          <div>
            <label htmlFor="flooring_type" className="block text-sm font-medium text-gray-700">Flooring Type</label>
            <select
              id="flooring_type"
              name="flooring_type"
              value={formData.flooring_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Flooring Type</option>
              <option value="Concrete">Concrete</option>
              <option value="Soil">Soil</option>
              <option value="Wood">Wood</option>
              <option value="Other">Other</option>
            </select>
            {errors.flooring_type && <p className="mt-1 text-sm text-red-600">{errors.flooring_type}</p>}
          </div>

          {formData.flooring_type === 'Other' && (
            <div>
              <label htmlFor="other_flooring" className="block text-sm font-medium text-gray-700">Other Flooring</label>
              <input
                type="text"
                id="other_flooring"
                name="other_flooring"
                value={formData.other_flooring}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.other_flooring && <p className="mt-1 text-sm text-red-600">{errors.other_flooring}</p>}
            </div>
          )}

          <div>
            <label htmlFor="roof_type" className="block text-sm font-medium text-gray-700">Roof Type</label>
            <select
              id="roof_type"
              name="roof_type"
              value={formData.roof_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Roof Type</option>
              <option value="Thatch">Thatch</option>
              <option value="Corrugated Metal">Corrugated Metal</option>
              <option value="Tile">Tile</option>
              <option value="Others">Others</option>
            </select>
            {errors.roof_type && <p className="mt-1 text-sm text-red-600">{errors.roof_type}</p>}
          </div>

          {formData.roof_type === 'Others' && (
            <div>
              <label htmlFor="other_roof" className="block text-sm font-medium text-gray-700">Other Roof</label>
              <input
                type="text"
                id="other_roof"
                name="other_roof"
                value={formData.other_roof}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.other_roof && <p className="mt-1 text-sm text-red-600">{errors.other_roof}</p>}
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="drainage_system_installed"
              name="drainage_system_installed"
              checked={formData.drainage_system_installed}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="drainage_system_installed" className="ml-2 block text-sm text-gray-900">
              Drainage System Installed
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="animal_health_safety_features"
              name="animal_health_safety_features"
              checked={formData.animal_health_safety_features}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="animal_health_safety_features" className="ml-2 block text-sm text-gray-900">
              Animal Health Safety Features
            </label>
          </div>

          <div>
            <label htmlFor="estimated_cost" className="block text-sm font-medium text-gray-700">Estimated Cost</label>
            <input
              type="number"
              id="estimated_cost"
              name="estimated_cost"
              value={formData.estimated_cost}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.estimated_cost && <p className="mt-1 text-sm text-red-600">{errors.estimated_cost}</p>}
          </div>

          <div>
            <label htmlFor="construction_method" className="block text-sm font-medium text-gray-700">Construction Method</label>
            <select
              id="construction_method"
              name="construction_method"
              value={formData.construction_method}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Construction Method</option>
              <option value="Manual">Manual</option>
              <option value="Mechanical">Mechanical</option>
            </select>
            {errors.construction_method && <p className="mt-1 text-sm text-red-600">{errors.construction_method}</p>}
          </div>

          <div>
            <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700">Completion Date</label>
            <input
              type="date"
              id="completion_date"
              name="completion_date"
              value={formData.completion_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.completion_date && <p className="mt-1 text-sm text-red-600">{errors.completion_date}</p>}
          </div>

          <div>
            <label htmlFor="completion_status" className="block text-sm font-medium text-gray-700">Completion Status</label>
            <select
              id="completion_status"
              name="completion_status"
              value={formData.completion_status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Completion Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.completion_status && <p className="mt-1 text-sm text-red-600">{errors.completion_status}</p>}
          </div>

          <div>
            <label htmlFor="animal_accommodation_capacity" className="block text-sm font-medium text-gray-700">Animal Accommodation Capacity</label>
            <input
              type="number"
              id="animal_accommodation_capacity"
              name="animal_accommodation_capacity"
              value={formData.animal_accommodation_capacity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.animal_accommodation_capacity && <p className="mt-1 text-sm text-red-600">{errors.animal_accommodation_capacity}</p>}
          </div>

          <div>
            <label htmlFor="post_construction_inspection" className="block text-sm font-medium text-gray-700">Post Construction Inspection</label>
            <select
              id="post_construction_inspection"
              name="post_construction_inspection"
              value={formData.post_construction_inspection}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Inspection Status</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.post_construction_inspection && <p className="mt-1 text-sm text-red-600">{errors.post_construction_inspection}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="follow_up_action_required"
              name="follow_up_action_required"
              checked={formData.follow_up_action_required}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="follow_up_action_required" className="ml-2 block text-sm text-gray-900">
              Follow Up Action Required
            </label>
          </div>

          {formData.follow_up_action_required && (
            <div>
              <label htmlFor="follow_up_action_details" className="block text-sm font-medium text-gray-700">Follow Up Action Details</label>
              <textarea
                id="follow_up_action_details"
                name="follow_up_action_details"
                value={formData.follow_up_action_details}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
              {errors.follow_up_action_details && <p className="mt-1 text-sm text-red-600">{errors.follow_up_action_details}</p>}
            </div>
          )}

          <div>
            <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              id="additional_notes"
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            {errors.additional_notes && <p className="mt-1 text-sm text-red-600">{errors.additional_notes}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

