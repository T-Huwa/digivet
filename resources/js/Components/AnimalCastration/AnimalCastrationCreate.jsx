import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Typography, Alert, AlertTitle, Box as AlertDescription } from '@mui/material';
import { router } from '@inertiajs/react';

export default function AnimalCastrationCreate() {
  const [formData, setFormData] = useState({
    appointment_id: '',
    animal_id: '',
    castration_date: '',
    veterinarian_id: '',
    castration_method: '',
    anesthesia_used: '',
    anesthesia_type: '',
    pain_management: '',
    complications: false,
    complication_details: '',
    post_operative_care: '',
    recovery_period: '',
    follow_up_date: '',
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
      const response = await axios.post('/api/animal-castrations', formData);
      router.push(`/animal-castrations/${response.data.id}`);
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
      <Typography variant="h5" className="font-bold mb-4">Create Animal Castration Record</Typography>
      {submitError && (
        <Alert severity="error" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Appointment ID"
          name="appointment_id"
          value={formData.appointment_id}
          onChange={handleChange}
          fullWidth
          error={Boolean(errors.appointment_id)}
          helperText={errors.appointment_id && errors.appointment_id[0]}
        />

        <TextField
          label="Animal ID"
          name="animal_id"
          value={formData.animal_id}
          onChange={handleChange}
          fullWidth
          error={Boolean(errors.animal_id)}
          helperText={errors.animal_id && errors.animal_id[0]}
        />

        <TextField
          label="Castration Date"
          name="castration_date"
          type="date"
          value={formData.castration_date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.castration_date)}
          helperText={errors.castration_date && errors.castration_date[0]}
        />

        <TextField
          label="Veterinarian ID"
          name="veterinarian_id"
          value={formData.veterinarian_id}
          onChange={handleChange}
          fullWidth
          error={Boolean(errors.veterinarian_id)}
          helperText={errors.veterinarian_id && errors.veterinarian_id[0]}
        />

        <FormControl fullWidth error={Boolean(errors.castration_method)} variant="outlined">
          <InputLabel>Castration Method</InputLabel>
          <Select
            name="castration_method"
            value={formData.castration_method}
            onChange={(e) => handleSelectChange('castration_method', e.target.value)}
            label="Castration Method"
          >
            <MenuItem value="Surgical">Surgical</MenuItem>
            <MenuItem value="Chemical">Chemical</MenuItem>
            <MenuItem value="Banding">Banding</MenuItem>
          </Select>
          {errors.castration_method && <p className="text-red-500 text-sm mt-1">{errors.castration_method[0]}</p>}
        </FormControl>

        <FormControl fullWidth error={Boolean(errors.anesthesia_used)} variant="outlined">
          <InputLabel>Anesthesia Used</InputLabel>
          <Select
            name="anesthesia_used"
            value={formData.anesthesia_used}
            onChange={(e) => handleSelectChange('anesthesia_used', e.target.value)}
            label="Anesthesia Used"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          {errors.anesthesia_used && <p className="text-red-500 text-sm mt-1">{errors.anesthesia_used[0]}</p>}
        </FormControl>

        {formData.anesthesia_used === 'Yes' && (
          <TextField
            label="Anesthesia Type"
            name="anesthesia_type"
            value={formData.anesthesia_type}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.anesthesia_type)}
            helperText={errors.anesthesia_type && errors.anesthesia_type[0]}
          />
        )}

        <TextField
          label="Pain Management"
          name="pain_management"
          value={formData.pain_management}
          onChange={handleChange}
          fullWidth
          error={Boolean(errors.pain_management)}
          helperText={errors.pain_management && errors.pain_management[0]}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="complications"
              checked={formData.complications}
              onChange={(e) => handleSelectChange('complications', e.target.checked)}
            />
          }
          label="Complications"
        />
        {errors.complications && <p className="text-red-500 text-sm mt-1">{errors.complications[0]}</p>}

        {formData.complications && (
          <TextField
            label="Complication Details"
            name="complication_details"
            value={formData.complication_details}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            error={Boolean(errors.complication_details)}
            helperText={errors.complication_details && errors.complication_details[0]}
          />
        )}

        <TextField
          label="Post-operative Care"
          name="post_operative_care"
          value={formData.post_operative_care}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          error={Boolean(errors.post_operative_care)}
          helperText={errors.post_operative_care && errors.post_operative_care[0]}
        />

        <TextField
          label="Recovery Period (in days)"
          name="recovery_period"
          type="number"
          value={formData.recovery_period}
          onChange={handleChange}
          fullWidth
          error={Boolean(errors.recovery_period)}
          helperText={errors.recovery_period && errors.recovery_period[0]}
        />

        <TextField
          label="Follow-up Date"
          name="follow_up_date"
          type="date"
          value={formData.follow_up_date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={Boolean(errors.follow_up_date)}
          helperText={errors.follow_up_date && errors.follow_up_date[0]}
        />

        <TextField
          label="Additional Notes"
          name="additional_notes"
          value={formData.additional_notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          error={Boolean(errors.additional_notes)}
          helperText={errors.additional_notes && errors.additional_notes[0]}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Animal Castration Record'}
        </Button>
      </form>
    </div>
  );
}
