import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import { router } from '@inertiajs/react';
import { Input, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';

export default function KholaBuildingCreate() {
  const [formData, setFormData] = useState({
    appointment_id: '',
    animal_id: '',
    construction_start_date: '',
    construction_officer_id: '',
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
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitError('');

    try {
      const response = await axios.post('/api/khola-buildings', formData);
      router.push(`/khola-buildings/${response.data.id}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Khola Building Record</h1>
      {submitError && (
        <Alert severity="error" className="mb-4">
          {submitError}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormControl fullWidth error={Boolean(errors.appointment_id)}>
            <InputLabel htmlFor="appointment_id">Appointment ID</InputLabel>
            <Input
              id="appointment_id"
              name="appointment_id"
              value={formData.appointment_id}
              onChange={handleChange}
            />
            {errors.appointment_id && <p className="text-red-500 text-sm mt-1">{errors.appointment_id[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.animal_id)}>
            <InputLabel htmlFor="animal_id">Animal ID</InputLabel>
            <Input
              id="animal_id"
              name="animal_id"
              value={formData.animal_id}
              onChange={handleChange}
            />
            {errors.animal_id && <p className="text-red-500 text-sm mt-1">{errors.animal_id[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.construction_start_date)}>
            <InputLabel htmlFor="construction_start_date">Construction Start Date</InputLabel>
            <Input
              id="construction_start_date"
              name="construction_start_date"
              type="date"
              value={formData.construction_start_date}
              onChange={handleChange}
            />
            {errors.construction_start_date && <p className="text-red-500 text-sm mt-1">{errors.construction_start_date[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.construction_officer_id)}>
            <InputLabel htmlFor="construction_officer_id">Construction Officer ID</InputLabel>
            <Input
              id="construction_officer_id"
              name="construction_officer_id"
              value={formData.construction_officer_id}
              onChange={handleChange}
            />
            {errors.construction_officer_id && <p className="text-red-500 text-sm mt-1">{errors.construction_officer_id[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.khola_type)}>
            <InputLabel htmlFor="khola_type">Khola Type</InputLabel>
            <Select
              name="khola_type"
              value={formData.khola_type}
              onChange={(e) => handleSelectChange('khola_type', e.target.value)}
            >
              <MenuItem value="">Select Khola Type</MenuItem>
              <MenuItem value="Traditional">Traditional</MenuItem>
              <MenuItem value="Modern">Modern</MenuItem>
              <MenuItem value="Semi-modern">Semi-modern</MenuItem>
            </Select>
            {errors.khola_type && <p className="text-red-500 text-sm mt-1">{errors.khola_type[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.material_used)}>
            <InputLabel htmlFor="material_used">Material Used</InputLabel>
            <Select
              name="material_used"
              value={formData.material_used}
              onChange={(e) => handleSelectChange('material_used', e.target.value)}
            >
              <MenuItem value="">Select Material Used</MenuItem>
              <MenuItem value="Wood">Wood</MenuItem>
              <MenuItem value="Mud">Mud</MenuItem>
              <MenuItem value="Thatch">Thatch</MenuItem>
              <MenuItem value="Cement">Cement</MenuItem>
              <MenuItem value="Steel">Steel</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
            {errors.material_used && <p className="text-red-500 text-sm mt-1">{errors.material_used[0]}</p>}
          </FormControl>
        </div>

        {formData.material_used === 'Others' && (
          <div>
            <FormControl fullWidth error={Boolean(errors.other_material)}>
              <InputLabel htmlFor="other_material">Other Material</InputLabel>
              <Input
                id="other_material"
                name="other_material"
                value={formData.other_material}
                onChange={handleChange}
              />
              {errors.other_material && <p className="text-red-500 text-sm mt-1">{errors.other_material[0]}</p>}
            </FormControl>
          </div>
        )}

        <div>
          <FormControl fullWidth error={Boolean(errors.khola_size)}>
            <InputLabel htmlFor="khola_size">Khola Size</InputLabel>
            <Input
              id="khola_size"
              name="khola_size"
              value={formData.khola_size}
              onChange={handleChange}
            />
            {errors.khola_size && <p className="text-red-500 text-sm mt-1">{errors.khola_size[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.number_of_compartments)}>
            <InputLabel htmlFor="number_of_compartments">Number of Compartments</InputLabel>
            <Input
              id="number_of_compartments"
              name="number_of_compartments"
              type="number"
              value={formData.number_of_compartments}
              onChange={handleChange}
            />
            {errors.number_of_compartments && <p className="text-red-500 text-sm mt-1">{errors.number_of_compartments[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.ventilation_type)}>
            <InputLabel htmlFor="ventilation_type">Ventilation Type</InputLabel>
            <Select
              name="ventilation_type"
              value={formData.ventilation_type}
              onChange={(e) => handleSelectChange('ventilation_type', e.target.value)}
            >
              <MenuItem value="">Select Ventilation Type</MenuItem>
              <MenuItem value="Natural">Natural</MenuItem>
              <MenuItem value="Artificial">Artificial</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
            {errors.ventilation_type && <p className="text-red-500 text-sm mt-1">{errors.ventilation_type[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.flooring_type)}>
            <InputLabel htmlFor="flooring_type">Flooring Type</InputLabel>
            <Select
              name="flooring_type"
              value={formData.flooring_type}
              onChange={(e) => handleSelectChange('flooring_type', e.target.value)}
            >
              <MenuItem value="">Select Flooring Type</MenuItem>
              <MenuItem value="Concrete">Concrete</MenuItem>
              <MenuItem value="Wood">Wood</MenuItem>
              <MenuItem value="Tiles">Tiles</MenuItem>
              <MenuItem value="Dirt">Dirt</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
            {errors.flooring_type && <p className="text-red-500 text-sm mt-1">{errors.flooring_type[0]}</p>}
          </FormControl>
        </div>

        {formData.flooring_type === 'Others' && (
          <div>
            <FormControl fullWidth error={Boolean(errors.other_flooring)}>
              <InputLabel htmlFor="other_flooring">Other Flooring</InputLabel>
              <Input
                id="other_flooring"
                name="other_flooring"
                value={formData.other_flooring}
                onChange={handleChange}
              />
              {errors.other_flooring && <p className="text-red-500 text-sm mt-1">{errors.other_flooring[0]}</p>}
            </FormControl>
          </div>
        )}

        <div>
          <FormControl fullWidth error={Boolean(errors.roof_type)}>
            <InputLabel htmlFor="roof_type">Roof Type</InputLabel>
            <Select
              name="roof_type"
              value={formData.roof_type}
              onChange={(e) => handleSelectChange('roof_type', e.target.value)}
            >
              <MenuItem value="">Select Roof Type</MenuItem>
              <MenuItem value="Thatch">Thatch</MenuItem>
              <MenuItem value="Metal">Metal</MenuItem>
              <MenuItem value="Concrete">Concrete</MenuItem>
              <MenuItem value="Plastic">Plastic</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
            {errors.roof_type && <p className="text-red-500 text-sm mt-1">{errors.roof_type[0]}</p>}
          </FormControl>
        </div>

        {formData.roof_type === 'Others' && (
          <div>
            <FormControl fullWidth error={Boolean(errors.other_roof)}>
              <InputLabel htmlFor="other_roof">Other Roof</InputLabel>
              <Input
                id="other_roof"
                name="other_roof"
                value={formData.other_roof}
                onChange={handleChange}
              />
              {errors.other_roof && <p className="text-red-500 text-sm mt-1">{errors.other_roof[0]}</p>}
            </FormControl>
          </div>
        )}

        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.drainage_system_installed}
                onChange={handleChange}
                name="drainage_system_installed"
                color="primary"
              />
            }
            label="Drainage System Installed"
          />
        </div>

        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.animal_health_safety_features}
                onChange={handleChange}
                name="animal_health_safety_features"
                color="primary"
              />
            }
            label="Animal Health Safety Features"
          />
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.estimated_cost)}>
            <InputLabel htmlFor="estimated_cost">Estimated Cost</InputLabel>
            <Input
              id="estimated_cost"
              name="estimated_cost"
              value={formData.estimated_cost}
              onChange={handleChange}
            />
            {errors.estimated_cost && <p className="text-red-500 text-sm mt-1">{errors.estimated_cost[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.construction_method)}>
            <InputLabel htmlFor="construction_method">Construction Method</InputLabel>
            <Input
              id="construction_method"
              name="construction_method"
              value={formData.construction_method}
              onChange={handleChange}
            />
            {errors.construction_method && <p className="text-red-500 text-sm mt-1">{errors.construction_method[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.completion_date)}>
            <InputLabel htmlFor="completion_date">Completion Date</InputLabel>
            <Input
              id="completion_date"
              name="completion_date"
              type="date"
              value={formData.completion_date}
              onChange={handleChange}
            />
            {errors.completion_date && <p className="text-red-500 text-sm mt-1">{errors.completion_date[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.completion_status)}>
            <InputLabel htmlFor="completion_status">Completion Status</InputLabel>
            <Select
              name="completion_status"
              value={formData.completion_status}
              onChange={(e) => handleSelectChange('completion_status', e.target.value)}
            >
              <MenuItem value="">Select Completion Status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
            {errors.completion_status && <p className="text-red-500 text-sm mt-1">{errors.completion_status[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.animal_accommodation_capacity)}>
            <InputLabel htmlFor="animal_accommodation_capacity">Animal Accommodation Capacity</InputLabel>
            <Input
              id="animal_accommodation_capacity"
              name="animal_accommodation_capacity"
              type="number"
              value={formData.animal_accommodation_capacity}
              onChange={handleChange}
            />
            {errors.animal_accommodation_capacity && <p className="text-red-500 text-sm mt-1">{errors.animal_accommodation_capacity[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.follow_up_action_required}
                onChange={handleChange}
                name="follow_up_action_required"
                color="primary"
              />
            }
            label="Follow-Up Action Required"
          />
        </div>

        {formData.follow_up_action_required && (
          <div>
            <FormControl fullWidth error={Boolean(errors.follow_up_action_details)}>
              <InputLabel htmlFor="follow_up_action_details">Follow-Up Action Details</InputLabel>
              <Input
                id="follow_up_action_details"
                name="follow_up_action_details"
                value={formData.follow_up_action_details}
                onChange={handleChange}
              />
              {errors.follow_up_action_details && <p className="text-red-500 text-sm mt-1">{errors.follow_up_action_details[0]}</p>}
            </FormControl>
          </div>
        )}

        <div>
          <FormControl fullWidth error={Boolean(errors.additional_notes)}>
            <InputLabel htmlFor="additional_notes">Additional Notes</InputLabel>
            <Input
              id="additional_notes"
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
            />
            {errors.additional_notes && <p className="text-red-500 text-sm mt-1">{errors.additional_notes[0]}</p>}
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth error={Boolean(errors.construction_method)}>
            <InputLabel htmlFor="construction_method">Construction Method</InputLabel>
            <Input
              id="construction_method"
              name="construction_method"
              value={formData.construction_method}
              onChange={handleChange}
            />
            {errors.construction_method && <p className="text-red-500 text-sm mt-1">{errors.construction_method[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.completion_date)}>
            <InputLabel htmlFor="completion_date">Completion Date</InputLabel>
            <Input
              id="completion_date"
              name="completion_date"
              type="date"
              value={formData.completion_date}
              onChange={handleChange}
            />
            {errors.completion_date && <p className="text-red-500 text-sm mt-1">{errors.completion_date[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.completion_status)}>
            <InputLabel htmlFor="completion_status">Completion Status</InputLabel>
            <Select
              name="completion_status"
              value={formData.completion_status}
              onChange={(e) => handleSelectChange('completion_status', e.target.value)}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
            </Select>
            {errors.completion_status && <p className="text-red-500 text-sm mt-1">{errors.completion_status[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.animal_accommodation_capacity)}>
            <InputLabel htmlFor="animal_accommodation_capacity">Animal Accommodation Capacity</InputLabel>
            <Input
              id="animal_accommodation_capacity"
              name="animal_accommodation_capacity"
              type="number"
              value={formData.animal_accommodation_capacity}
              onChange={handleChange}
            />
            {errors.animal_accommodation_capacity && <p className="text-red-500 text-sm mt-1">{errors.animal_accommodation_capacity[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={Boolean(errors.post_construction_inspection)}>
            <InputLabel htmlFor="post_construction_inspection">Post Construction Inspection</InputLabel>
            <Input
              id="post_construction_inspection"
              name="post_construction_inspection"
              value={formData.post_construction_inspection}
              onChange={handleChange}
            />
            {errors.post_construction_inspection && <p className="text-red-500 text-sm mt-1">{errors.post_construction_inspection[0]}</p>}
          </FormControl>
        </div>

        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.follow_up_action_required}
                onChange={handleChange}
                name="follow_up_action_required"
                color="primary"
              />
            }
            label="Follow Up Action Required"
          />
        </div>

        {formData.follow_up_action_required && (
          <div>
            <FormControl fullWidth error={Boolean(errors.follow_up_action_details)}>
              <InputLabel htmlFor="follow_up_action_details">Follow Up Action Details</InputLabel>
              <Input
                id="follow_up_action_details"
                name="follow_up_action_details"
                value={formData.follow_up_action_details}
                onChange={handleChange}
              />
              {errors.follow_up_action_details && <p className="text-red-500 text-sm mt-1">{errors.follow_up_action_details[0]}</p>}
            </FormControl>
          </div>
        )}

        <div>
          <FormControl fullWidth error={Boolean(errors.additional_notes)}>
            <InputLabel htmlFor="additional_notes">Additional Notes</InputLabel>
            <Input
              id="additional_notes"
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
            />
            {errors.additional_notes && <p className="text-red-500 text-sm mt-1">{errors.additional_notes[0]}</p>}
          </FormControl>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
