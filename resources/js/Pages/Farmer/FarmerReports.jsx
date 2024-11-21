import DashboardLayout from "@/Layouts/dashboard";
import {
    AccountCircleOutlined,
    CalendarTodayOutlined,
    ListAltOutlined,
} from "@mui/icons-material";
import React from "react";

export default function FarmerReports({
    farmerInfo,
    animalSummary,
    recentHealthRecords,
    upcomingAppointments,
}) {
    return (
        <DashboardLayout>
            <div className="sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Your DigiVet Report
                    </h1>

                    {/* Farmer Information */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <AccountCircleOutlined className="h-6 w-6 mr-2 text-blue-500" />
                            Farmer Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="text-lg font-medium">
                                    {farmerInfo.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Area</p>
                                <p className="text-lg font-medium">
                                    {farmerInfo.area}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    District
                                </p>
                                <p className="text-lg font-medium">
                                    {farmerInfo.district}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Registration Date
                                </p>
                                <p className="text-lg font-medium">
                                    {farmerInfo.registrationDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Animal Summary */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Your Animals
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {animalSummary.map((animal) => (
                                <div
                                    key={animal.animal_type}
                                    className="bg-blue-100 p-4 rounded-lg text-center"
                                >
                                    <p className="text-sm text-blue-600 font-medium">
                                        {animal.animal_type}
                                    </p>
                                    <p className="text-2xl font-bold text-blue-800">
                                        {animal.animal_count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Health Records */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <ListAltOutlined className="h-6 w-6 mr-2 text-green-500" />
                            Recent Appointments
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Animal Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Service Requested
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Notes
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentHealthRecords.map(
                                        (record, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {record.appointment_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.animalType}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.issue}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {record.notes}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <CalendarTodayOutlined className="h-6 w-6 mr-2 text-red-500" />
                            Upcoming Appointments
                        </h2>
                        <ul className="divide-y divide-gray-200">
                            {upcomingAppointments.map((appointment, index) => (
                                <li key={index} className="py-4">
                                    <div className="flex space-x-3">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium">
                                                    {
                                                        appointment.appointment_date
                                                    }
                                                </h3>
                                                <p className="text-sm whitespace-nowrap text-gray-500">
                                                    {appointment.purpose}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br />
                </div>
            </div>
        </DashboardLayout>
    );
}
