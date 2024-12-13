import React, { useState } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Select, Checkbox, FormControl, InputLabel, Button, FormControlLabel, Grid, Typography } from '@mui/material';

const AnimalTeethClippingCreate = ({id, userId}) => {
    const [formData, setFormData] = useState({
        appointment_id: id,
        animal_id: '',
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/animal-teeth-clippings', formData);
            alert('Animal teeth clipping record created successfully');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('Error creating record. Please check your input.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <Typography variant="h5" className="mb-4">Animal Teeth Clipping</Typography>
            
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Animal ID"
                        name="animal_id"
                        value={formData.animal_id}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Date of Teeth Clipping"
                        name="date_of_teeth_clipping"
                        type="date"
                        value={formData.date_of_teeth_clipping}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Animal Age"
                        name="animal_age"
                        type="number"
                        value={formData.animal_age}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Age Unit</InputLabel>
                        <Select
                            name="age_unit"
                            value={formData.age_unit}
                            onChange={handleChange}
                            label="Age Unit"
                        >
                            <MenuItem value="Months">Months</MenuItem>
                            <MenuItem value="Years">Years</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Sex of Animal</InputLabel>
                        <Select
                            name="sex_of_animal"
                            value={formData.sex_of_animal}
                            onChange={handleChange}
                            label="Sex of Animal"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Teeth Condition</InputLabel>
                        <Select
                            name="teeth_condition"
                            value={formData.teeth_condition}
                            onChange={handleChange}
                            label="Teeth Condition"
                        >
                            <MenuItem value="Healthy">Healthy</MenuItem>
                            <MenuItem value="Overgrown">Overgrown</MenuItem>
                            <MenuItem value="Damaged">Damaged</MenuItem>
                            <MenuItem value="Infected">Infected</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {formData.teeth_condition === 'Other' && (
                    <Grid item xs={12}>
                        <TextField
                            label="Teeth Condition Notes"
                            name="teeth_condition_notes"
                            value={formData.teeth_condition_notes}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                )}
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Teeth Clipping Method</InputLabel>
                        <Select
                            name="teeth_clipping_method"
                            value={formData.teeth_clipping_method}
                            onChange={handleChange}
                            label="Teeth Clipping Method"
                        >
                            <MenuItem value="Manual">Manual</MenuItem>
                            <MenuItem value="Mechanical">Mechanical</MenuItem>
                            <MenuItem value="Electric">Electric</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Teeth Clipping Procedure</InputLabel>
                        <Select
                            name="teeth_clipping_procedure"
                            value={formData.teeth_clipping_procedure}
                            onChange={handleChange}
                            label="Teeth Clipping Procedure"
                        >
                            <MenuItem value="Full Clip">Full Clip</MenuItem>
                            <MenuItem value="Partial Clip">Partial Clip</MenuItem>
                            <MenuItem value="Grinding">Grinding</MenuItem>
                            <MenuItem value="Shaping">Shaping</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Veterinarian ID"
                        name="veterinarian_id"
                        value={formData.veterinarian_id}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel>Clipping Tools</InputLabel>
                        <Select
                            name="clipping_tools"
                            value={formData.clipping_tools}
                            onChange={handleChange}
                            label="Clipping Tools"
                        >
                            <MenuItem value="Scissors">Scissors</MenuItem>
                            <MenuItem value="Clippers">Clippers</MenuItem>
                            <MenuItem value="Grinder">Grinder</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {formData.clipping_tools === 'Other' && (
                <Grid item xs={12}>
                    <TextField
                        label="Other Clipping Tool"
                        name="other_clipping_tool"
                        value={formData.other_clipping_tool}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
            )}

            <FormControlLabel
                control={<Checkbox name="pain_management_applied" checked={formData.pain_management_applied} onChange={handleChange} />}
                label="Pain Management Applied"
            />
            {formData.pain_management_applied && (
                <TextField
                    label="Pain Management Type"
                    name="pain_management_type"
                    value={formData.pain_management_type}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            )}

            <FormControl fullWidth required>
                <InputLabel>Clipping Outcome</InputLabel>
                <Select
                    name="clipping_outcome"
                    value={formData.clipping_outcome}
                    onChange={handleChange}
                    label="Clipping Outcome"
                >
                    <MenuItem value="Successful">Successful</MenuItem>
                    <MenuItem value="Partial">Partial</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Outcome Notes"
                name="outcome_notes"
                value={formData.outcome_notes}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
            />

            <FormControlLabel
                control={<Checkbox name="follow_up_required" checked={formData.follow_up_required} onChange={handleChange} />}
                label="Follow-up Required"
            />
            {formData.follow_up_required && (
                <>
                    <TextField
                        label="Follow-up Action"
                        name="follow_up_action"
                        value={formData.follow_up_action}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Follow-up Date"
                        name="follow_up_date"
                        type="date"
                        value={formData.follow_up_date}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </>
            )}

            <FormControl fullWidth required>
                <InputLabel>Animal Health Condition</InputLabel>
                <Select
                    name="animal_health_condition"
                    value={formData.animal_health_condition}
                    onChange={handleChange}
                    label="Animal Health Condition"
                >
                    <MenuItem value="Healthy">Healthy</MenuItem>
                    <MenuItem value="Sick">Sick</MenuItem>
                    <MenuItem value="Injured">Injured</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>

            {formData.animal_health_condition === 'Other' && (
                <TextField
                    label="Health Condition Details"
                    name="health_condition_details"
                    value={formData.health_condition_details}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                />
            )}

            <TextField
                label="Additional Notes"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
            />

            <FormControlLabel
                control={<Checkbox name="anesthetic_used" checked={formData.anesthetic_used} onChange={handleChange} />}
                label="Anesthetic Used"
            />
            {formData.anesthetic_used && (
                <TextField
                    label="Anesthetic Type"
                    name="anesthetic_type"
                    value={formData.anesthetic_type}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            )}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Duration of Procedure (minutes)"
                        name="duration_of_procedure"
                        type="number"
                        value={formData.duration_of_procedure}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Procedure Cost"
                        name="procedure_cost"
                        type="number"
                        value={formData.procedure_cost}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>

            <TextField
                label="Responsible Staff"
                name="responsible_staff"
                value={formData.responsible_staff}
                onChange={handleChange}
                fullWidth
                required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </form>
    );
};

export default AnimalTeethClippingCreate;
