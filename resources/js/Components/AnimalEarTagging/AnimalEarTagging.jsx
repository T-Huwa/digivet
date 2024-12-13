import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Alert,
} from '@mui/material';

const AnimalEarTaggingCreate = () => {
    const [formData, setFormData] = useState({
        animal_id: '',
        date_of_ear_tagging: '',
        appointment_id: '',
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
        veterinarian_id: '',
        location: '',
        purpose_of_tagging: 'Identification',
        purpose_notes: '',
        additional_notes: '',
        follow_up_required: false,
        follow_up_action: '',
        follow_up_date: '',
    });

    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages({});
        setSuccessMessage('');

        try {
            const response = await axios.post('/animal-ear-taggings', formData);
            setSuccessMessage(response.data.message || 'Animal ear tagging record created successfully.');
            setFormData({
                ...formData,
                animal_id: '',
                date_of_ear_tagging: '',
                appointment_id: '',
                ear_tag_number: '',
                custom_color: '',
                follow_up_required: false,
                follow_up_action: '',
                follow_up_date: '',
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessages(error.response.data.errors);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Create Animal Ear Tagging Record
            </Typography>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Animal ID"
                    name="animal_id"
                    value={formData.animal_id}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errorMessages.animal_id}
                    helperText={errorMessages.animal_id?.[0]}
                    required
                />

                <TextField
                    label="Date of Ear Tagging"
                    name="date_of_ear_tagging"
                    type="date"
                    value={formData.date_of_ear_tagging}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={!!errorMessages.date_of_ear_tagging}
                    helperText={errorMessages.date_of_ear_tagging?.[0]}
                    required
                />

                <TextField
                    label="Appointment ID"
                    name="appointment_id"
                    value={formData.appointment_id}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errorMessages.appointment_id}
                    helperText={errorMessages.appointment_id?.[0]}
                    required
                />

                <TextField
                    label="Ear Tag Number"
                    name="ear_tag_number"
                    value={formData.ear_tag_number}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errorMessages.ear_tag_number}
                    helperText={errorMessages.ear_tag_number?.[0]}
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Tagging Method</InputLabel>
                    <Select
                        name="tagging_method"
                        value={formData.tagging_method}
                        onChange={handleChange}
                    >
                        <MenuItem value="Manual">Manual</MenuItem>
                        <MenuItem value="Automatic">Automatic</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Ear Tag Type</InputLabel>
                    <Select
                        name="ear_tag_type"
                        value={formData.ear_tag_type}
                        onChange={handleChange}
                    >
                        <MenuItem value="Plastic">Plastic</MenuItem>
                        <MenuItem value="Metal">Metal</MenuItem>
                        <MenuItem value="RFID">RFID</MenuItem>
                        <MenuItem value="Barcode">Barcode</MenuItem>
                    </Select>
                </FormControl>

                {formData.ear_tag_color === 'Custom' && (
                    <TextField
                        label="Custom Color"
                        name="custom_color"
                        value={formData.custom_color}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                )}

                <FormControlLabel
                    control={
                        <Checkbox
                            name="follow_up_required"
                            checked={formData.follow_up_required}
                            onChange={handleChange}
                        />
                    }
                    label="Follow-Up Required"
                />

                {formData.follow_up_required && (
                    <>
                        <TextField
                            label="Follow-Up Action"
                            name="follow_up_action"
                            value={formData.follow_up_action}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />

                        <TextField
                            label="Follow-Up Date"
                            name="follow_up_date"
                            type="date"
                            value={formData.follow_up_date}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </>
                )}

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Create Record
                </Button>
            </form>
        </Box>
    );
};

export default AnimalEarTaggingCreate;
