import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const AnimalDippingCreate = ({id, userId, closeModal}) => {
    const initialFormData = {
        appointment_id: id,
        animal_id: 4,
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
        extension_officer_id: userId,
        additional_notes: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value ? value.split(',').map(item => item.trim()) : [],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        
        router.post('/animal-dippings', formData, {
            onSuccess: (response) => {
                setFormData({
                    ...initialFormData,
                    appointment_id: id,
                    extension_officer_id: userId
                });
                console.log(response);                
                alert('completed successfully');
                closeModal();
            },
            onError: (errors) => {
                console.log(errors);
                
                setErrors(errors);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Animal Dipping Record</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Treatment Type:
                    </label>
                    <select
                        name="treatment_type"
                        value={formData.treatment_type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                    >
                        <option value="Dipping">Dipping</option>
                        <option value="Spraying">Spraying</option>
                    </select>
                    {errors.treatment_type && (
                        <div className="text-red-600 text-sm mt-1">{errors.treatment_type}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chemical Concentration (%):
                    </label>
                    <input
                        type="number"
                        name="chemical_concentration"
                        value={formData.chemical_concentration}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                    {errors.chemical_concentration && (
                        <div className="text-red-600 text-sm mt-1">{errors.chemical_concentration}</div>
                    )}
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
                        <option value="Sick">Sick</option>
                        <option value="Injured">Injured</option>
                    </select>
                    {errors.pre_treatment_health && (
                        <div className="text-red-600 text-sm mt-1">{errors.pre_treatment_health}</div>
                    )}
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
                        <option value="Overcast">Overcast</option>
                        <option value="Windy">Windy</option>
                    </select>
                    {errors.environmental_conditions && (
                        <div className="text-red-600 text-sm mt-1">{errors.environmental_conditions}</div>
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
    {errors.date_of_treatment && (
        <div className="text-red-600 text-sm mt-1">{errors.date_of_treatment}</div>
    )}
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
        Additional Notes:
    </label>
    <textarea
        name="additional_notes"
        value={formData.additional_notes}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
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
    {errors.targeted_pests && (
        <div className="text-red-600 text-sm mt-1">{errors.targeted_pests}</div>
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
    {errors.chemical_product && (
        <div className="text-red-600 text-sm mt-1">{errors.chemical_product}</div>
    )}
</div>

<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Solution Volume:
    </label>
    <input
        type="number"
        name="solution_volume"
        value={formData.solution_volume}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
        required
    />
    {errors.solution_volume && (
        <div className="text-red-600 text-sm mt-1">{errors.solution_volume}</div>
    )}
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
    {errors.animals_treated_count && (
        <div className="text-red-600 text-sm mt-1">{errors.animals_treated_count}</div>
    )}
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
    {errors.skin_conditions && (
        <div className="text-red-600 text-sm mt-1">{errors.skin_conditions}</div>
    )}
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
    {errors.post_treatment_observations && (
        <div className="text-red-600 text-sm mt-1">{errors.post_treatment_observations}</div>
    )}
</div>


                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300"
                >
                    Complete Treatment
                </button>
            </form>
        </div>
    );
};

export default AnimalDippingCreate;