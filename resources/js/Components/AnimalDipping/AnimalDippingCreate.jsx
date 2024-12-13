import React, { useState } from 'react';
import axios from 'axios';

const AnimalDippingCreate = () => {
    const [formData, setFormData] = useState({
        appointment_id: '',
        animal_id: '',
        date_of_treatment: '',
        treatment_type: 'Dipping',
        targeted_pests: [],
        chemical_product: '',
        chemical_concentration: '',
        solution_volume: '',
        animals_treated_count: '',
        pre_treatment_health: 'Healthy',
        skin_conditions: [],
        post_treatment_observations: '',
        environmental_conditions: 'Sunny',
        follow_up_date: '',
        extension_officer_id: '',
        additional_notes: ''
    });

    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.split(',').map(item => item.trim()),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages({});
        setSuccessMessage('');

        try {
            const response = await axios.post('/animal-dippings', formData);
            setSuccessMessage(response.data.message || 'Treatment record created successfully.');
            setFormData({
                appointment_id: '',
                animal_id: '',
                date_of_treatment: '',
                treatment_type: 'Dipping',
                targeted_pests: [],
                chemical_product: '',
                chemical_concentration: '',
                solution_volume: '',
                animals_treated_count: '',
                pre_treatment_health: 'Healthy',
                skin_conditions: [],
                post_treatment_observations: '',
                environmental_conditions: 'Sunny',
                follow_up_date: '',
                extension_officer_id: '',
                additional_notes: ''
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
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Animal Dipping Record</h2>
            {successMessage && (
                <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Appointment ID:
                    </label>
                    <input
                        type="text"
                        name="appointment_id"
                        value={formData.appointment_id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                    {errorMessages.appointment_id && (
                        <div className="text-red-600 text-sm mt-1">{errorMessages.appointment_id[0]}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Animal ID:
                    </label>
                    <input
                        type="text"
                        name="animal_id"
                        value={formData.animal_id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                    {errorMessages.animal_id && (
                        <div className="text-red-600 text-sm mt-1">{errorMessages.animal_id[0]}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Treatment:
                    </label>
                    <input
                        type="date"
                        name="date_of_treatment"
                        value={formData.date_of_treatment}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Targeted Pests (comma-separated):
                    </label>
                    <input
                        type="text"
                        name="targeted_pests"
                        value={formData.targeted_pests.join(', ')}
                        onChange={handleArrayChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                    {errorMessages.targeted_pests && (
                        <div className="text-red-600 text-sm mt-1">{errorMessages.targeted_pests[0]}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chemical Product:
                    </label>
                    <input
                        type="text"
                        name="chemical_product"
                        value={formData.chemical_product}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chemical Concentration:
                    </label>
                    <input
                        type="text"
                        name="chemical_concentration"
                        value={formData.chemical_concentration}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Solution Volume:
                    </label>
                    <input
                        type="text"
                        name="solution_volume"
                        value={formData.solution_volume}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Animals Treated Count:
                    </label>
                    <input
                        type="number"
                        name="animals_treated_count"
                        value={formData.animals_treated_count}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pre-Treatment Health:
                    </label>
                    <select
                        name="pre_treatment_health"
                        value={formData.pre_treatment_health}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                    >
                        <option value="Healthy">Healthy</option>
                        <option value="Unhealthy">Unhealthy</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Skin Conditions (comma-separated):
                    </label>
                    <input
                        type="text"
                        name="skin_conditions"
                        value={formData.skin_conditions.join(', ')}
                        onChange={handleArrayChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>

                <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Post-Treatment Observations:
    </label>
    <textarea
        name="post_treatment_observations"
        value={formData.post_treatment_observations}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    />
</div>

<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Environmental Conditions:
    </label>
    <select
        name="environmental_conditions"
        value={formData.environmental_conditions}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    >
        <option value="Sunny">Sunny</option>
        <option value="Rainy">Rainy</option>
        <option value="Cloudy">Cloudy</option>
    </select>
</div>

<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Follow-Up Date:
    </label>
    <input
        type="date"
        name="follow_up_date"
        value={formData.follow_up_date}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    />
</div>

<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Extension Officer ID:
    </label>
    <input
        type="text"
        name="extension_officer_id"
        value={formData.extension_officer_id}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    />
</div>

<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Additional Notes:
    </label>
    <textarea
        name="additional_notes"
        value={formData.additional_notes}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    />
                </div>

                                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300"
                >
                    Create Record
                </button>
            </form>
            
            </div>
    )
}

export default AnimalDippingCreate;
