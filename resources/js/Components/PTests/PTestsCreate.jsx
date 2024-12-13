import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

const GESTATION_AGES = {
  Cattle: 283,
  Sheep: 147,
  Goats: 150,
  Pigs: 114,
  Horses: 340,
  Donkeys: 365,
  Rabbits: 31,
};

export default function PTestsCreate() {
  const { errors } = usePage().props;
  const [values, setValues] = useState({
      animal_id: '',
      appointment_id: '',
    date_of_diagnosis: '',
    weight: '',
    body_condition_score: '',
    pregnancy_status: '',
    gestation_stage: '',
    palpation_results: false,
    palpation_notes: '',
    temperature: '',
    heart_rate: '',
    respiratory_rate: '',
    feed_intake: '',
    rumen_fill: '',
    skin_coat_condition: '',
    mobility_status: false,
    mobility_notes: '',
    reproductive_health_history: '',
    vaccination_status: false,
    vaccination_notes: '',
    behavior_observations: '',
    blood_test_results: '',
    blood_test_notes: '',
    additional_notes: '',
    diagnosed_by: '',
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  }


function handleSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }

  axios.post(route('ptests.store'), formData)
    .then(response => {
      console.log('Data submitted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    });
}

  return (
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">New Pregnancy Test</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="animal_id" className="block text-sm font-medium text-gray-700">Animal ID</label>
              <input type="text" id="animal_id" value={values.animal_id} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.animal_id && <div className="text-red-500 text-xs mt-1">{errors.animal_id}</div>}
            </div> 

            <div>
              <label htmlFor="date_of_diagnosis" className="block text-sm font-medium text-gray-700">Date of Diagnosis</label>
              <input type="date" id="date_of_diagnosis" value={values.date_of_diagnosis} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.date_of_diagnosis && <div className="text-red-500 text-xs mt-1">{errors.date_of_diagnosis}</div>}
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input type="number" id="weight" value={values.weight} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.weight && <div className="text-red-500 text-xs mt-1">{errors.weight}</div>}
            </div>

            <div>
              <label htmlFor="body_condition_score" className="block text-sm font-medium text-gray-700">Body Condition Score</label>
              <select id="body_condition_score" value={values.body_condition_score} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select a score</option>
                {[1, 2, 3, 4, 5].map(score => (
                  <option key={score} value={score}>{score}</option>
                ))}
              </select>
              {errors.body_condition_score && <div className="text-red-500 text-xs mt-1">{errors.body_condition_score}</div>}
            </div>

            <div>
              <label htmlFor="pregnancy_status" className="block text-sm font-medium text-gray-700">Pregnancy Status</label>
              <select id="pregnancy_status" value={values.pregnancy_status} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select status</option>
                <option value="Pregnant">Pregnant</option>
                <option value="Not Pregnant">Not Pregnant</option>
                <option value="Unknown">Unknown</option>
              </select>
              {errors.pregnancy_status && <div className="text-red-500 text-xs mt-1">{errors.pregnancy_status}</div>}
            </div>

            <div>
              <label htmlFor="gestation_stage" className="block text-sm font-medium text-gray-700">Gestation Stage</label>
              <select id="gestation_stage" value={values.gestation_stage} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select stage</option>
                <option value="1st Trimester">1st Trimester</option>
                <option value="2nd Trimester">2nd Trimester</option>
                <option value="3rd Trimester">3rd Trimester</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
              {errors.gestation_stage && <div className="text-red-500 text-xs mt-1">{errors.gestation_stage}</div>}
            </div>

            <div>
              <label htmlFor="palpation_results" className="block text-sm font-medium text-gray-700">Palpation Results</label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="palpation_results"
                  checked={values.palpation_results}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="palpation_results" className="ml-2 text-sm text-gray-700">Normal</label>
              </div>
              {errors.palpation_results && <div className="text-red-500 text-xs mt-1">{errors.palpation_results}</div>}
            </div>

            <div>
              <label htmlFor="palpation_notes" className="block text-sm font-medium text-gray-700">Palpation Notes</label>
              <textarea
                id="palpation_notes"
                value={values.palpation_notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.palpation_notes && <div className="text-red-500 text-xs mt-1">{errors.palpation_notes}</div>}
            </div>

            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <input type="number" step="0.1" id="temperature" value={values.temperature} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.temperature && <div className="text-red-500 text-xs mt-1">{errors.temperature}</div>}
            </div>

            <div>
              <label htmlFor="heart_rate" className="block text-sm font-medium text-gray-700">Heart Rate (BPM)</label>
              <input type="number" id="heart_rate" value={values.heart_rate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.heart_rate && <div className="text-red-500 text-xs mt-1">{errors.heart_rate}</div>}
            </div>

            <div>
              <label htmlFor="respiratory_rate" className="block text-sm font-medium text-gray-700">Respiratory Rate (RPM)</label>
              <input type="number" id="respiratory_rate" value={values.respiratory_rate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.respiratory_rate && <div className="text-red-500 text-xs mt-1">{errors.respiratory_rate}</div>}
            </div>

            <div>
              <label htmlFor="feed_intake" className="block text-sm font-medium text-gray-700">Feed Intake</label>
              <select id="feed_intake" value={values.feed_intake} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select feed intake</option>
                <option value="Normal">Normal</option>
                <option value="Reduced">Reduced</option>
                <option value="Increased">Increased</option>
              </select>
              {errors.feed_intake && <div className="text-red-500 text-xs mt-1">{errors.feed_intake}</div>}
            </div>

            <div>
              <label htmlFor="rumen_fill" className="block text-sm font-medium text-gray-700">Rumen Fill</label>
              <select id="rumen_fill" value={values.rumen_fill} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select rumen fill</option>
                <option value="Full">Full</option>
                <option value="Moderate">Moderate</option>
                <option value="Empty">Empty</option>
              </select>
              {errors.rumen_fill && <div className="text-red-500 text-xs mt-1">{errors.rumen_fill}</div>}
            </div>

            <div>
              <label htmlFor="skin_coat_condition" className="block text-sm font-medium text-gray-700">Skin and Coat Condition</label>
              <select id="skin_coat_condition" value={values.skin_coat_condition} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select condition</option>
                <option value="Healthy">Healthy</option>
                <option value="Dull">Dull</option>
                <option value="Presence of Parasites">Presence of Parasites</option>
              </select>
              {errors.skin_coat_condition && <div className="text-red-500 text-xs mt-1">{errors.skin_coat_condition}</div>}
            </div>

            <div>
              <label htmlFor="mobility_status" className="block text-sm font-medium text-gray-700">Mobility Status</label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="mobility_status"
                  checked={values.mobility_status}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="mobility_status" className="ml-2 text-sm text-gray-700">Normal</label>
              </div>
              {errors.mobility_status && <div className="text-red-500 text-xs mt-1">{errors.mobility_status}</div>}
            </div>

            <div>
              <label htmlFor="mobility_notes" className="block text-sm font-medium text-gray-700">Mobility Notes</label>
              <textarea
                id="mobility_notes"
                value={values.mobility_notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.mobility_notes && <div className="text-red-500 text-xs mt-1">{errors.mobility_notes}</div>}
            </div>

            <div>
              <label htmlFor="reproductive_health_history" className="block text-sm font-medium text-gray-700">Reproductive Health History</label>
              <textarea
                id="reproductive_health_history"
                value={values.reproductive_health_history}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.reproductive_health_history && <div className="text-red-500 text-xs mt-1">{errors.reproductive_health_history}</div>}
            </div>

            <div>
              <label htmlFor="vaccination_status" className="block text-sm font-medium text-gray-700">Vaccination Status</label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="vaccination_status"
                  checked={values.vaccination_status}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="vaccination_status" className="ml-2 text-sm text-gray-700">Up-to-Date</label>
              </div>
              {errors.vaccination_status && <div className="text-red-500 text-xs mt-1">{errors.vaccination_status}</div>}
            </div>

            <div>
              <label htmlFor="vaccination_notes" className="block text-sm font-medium text-gray-700">Vaccination Notes</label>
              <textarea
                id="vaccination_notes"
                value={values.vaccination_notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.vaccination_notes && <div className="text-red-500 text-xs mt-1">{errors.vaccination_notes}</div>}
            </div>

            <div>
              <label htmlFor="behavior_observations" className="block text-sm font-medium text-gray-700">Behavior Observations</label>
              <textarea
                id="behavior_observations"
                value={values.behavior_observations}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.behavior_observations && <div className="text-red-500 text-xs mt-1">{errors.behavior_observations}</div>}
            </div>

            <div>
              <label htmlFor="blood_test_results" className="block text-sm font-medium text-gray-700">Blood Test Results</label>
              <select id="blood_test_results" value={values.blood_test_results} onChange={handleChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select result</option>
                <option value="Normal">Normal</option>
                <option value="Abnormal">Abnormal</option>
              </select>
              {errors.blood_test_results && <div className="text-red-500 text-xs mt-1">{errors.blood_test_results}</div>}
            </div>

            <div>
              <label htmlFor="blood_test_notes" className="block text-sm font-medium text-gray-700">Blood Test Notes</label>
              <textarea
                id="blood_test_notes"
                value={values.blood_test_notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.blood_test_notes && <div className="text-red-500 text-xs mt-1">{errors.blood_test_notes}</div>}
            </div>

            <div>
              <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                id="additional_notes"
                value={values.additional_notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {errors.additional_notes && <div className="text-red-500 text-xs mt-1">{errors.additional_notes}</div>}
            </div>

            <div>
              <label htmlFor="diagnosed_by" className="block text-sm font-medium text-gray-700">Diagnosed By</label>
              <input type="text" id="diagnosed_by" value={values.diagnosed_by} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.diagnosed_by && <div className="text-red-500 text-xs mt-1">{errors.diagnosed_by}</div>}
            </div>

            <div className="col-span-2">
              <label htmlFor="diagnosed_by" className="block text-sm font-medium text-gray-700">Diagnosed By</label>
              <input type="text" id="diagnosed_by" value={values.diagnosed_by} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.diagnosed_by && <div className="text-red-500 text-xs mt-1">{errors.diagnosed_by}</div>}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save Pregnancy Test
            </button>
          </div>
        </form>
      </div>
  );
}