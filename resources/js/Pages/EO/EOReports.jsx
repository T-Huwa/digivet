import React from "react";
import {
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import {
    UserCircleIcon,
    UsersIcon,
    ClipboardListIcon,
    CalendarIcon,
    ChartPieIcon,
} from "@heroicons/react/outline";

import DashboardLayout from "@/Layouts/dashboard";
import SecondaryButton from "@/Components/SecondaryButton";
import { Typography } from "@mui/material";
import { Head, router } from "@inertiajs/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function EOReports({ reportsData }) {
    const aiResponse = reportsData.aiReport;

    const officerInfo = reportsData.officerInfo;
    const farmerSummary = reportsData.farmerSummary;
    const recentAppointments = reportsData.recentAppointments;
    const upcomingAppointments = reportsData.upcomingAppointments;
    const animalDistribution = reportsData.animalDistribution;

    function printReport() {
        const element = document.getElementById("reportToPrint");
        window.print();
    }

    return (
        <DashboardLayout>
            <Head title="EO Reports" />
            <div className="h-full sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex">
                        <h1 className="flex-1 text-3xl font-bold text-gray-900 mb-8">
                            Extension Officer Report
                        </h1>
                    </div>

                    {/* Officer Information */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <UserCircleIcon className="h-6 w-6 mr-2 text-blue-500" />
                            Officer Information
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="text-lg font-medium">
                                    {officerInfo.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Area</p>
                                <p className="text-lg font-medium">
                                    {officerInfo.area}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    District
                                </p>
                                <p className="text-lg font-medium">
                                    {officerInfo.district}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Farmers
                                </p>
                                <p className="text-lg font-medium">
                                    {officerInfo.totalFarmers}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Animals
                                </p>
                                <p className="text-lg font-medium">
                                    {officerInfo.totalAnimals}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Farmer Summary */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <UsersIcon className="h-6 w-6 mr-2 text-green-500" />
                            Farmer Summary
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {farmerSummary.map((item) => (
                                <div
                                    key={item.status}
                                    className="bg-green-100 p-4 rounded-lg text-center"
                                >
                                    <p className="text-sm text-green-600 font-medium">
                                        {item.animalType} Farmers
                                    </p>
                                    <p className="text-2xl font-bold text-green-800">
                                        {item.farmerCount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Health Issues */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <ClipboardListIcon className="h-6 w-6 mr-2 text-red-500" />
                            Recent Issues
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Farmer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Animal Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Issue
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentAppointments.map((issue, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {issue.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {issue.farmer}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {issue.animalType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {issue.issue}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        issue.status ===
                                                        "Completed"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                                >
                                                    {issue.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <CalendarIcon className="h-6 w-6 mr-2 text-indigo-500" />
                            Upcoming Appointments
                        </h2>
                        <ul className="divide-y divide-gray-200">
                            {upcomingAppointments.map((appointment, index) => (
                                <li key={index} className="py-4">
                                    <div className="flex space-x-3">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium">
                                                    {appointment.date}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {appointment.farmer}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {appointment.purpose}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Animal Distribution */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <ChartPieIcon className="h-6 w-6 mr-2 text-yellow-500" />
                            Animal Distribution in Area
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={animalDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {animalDistribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* <div class="p-6 my-8 bg-white shadow-md rounded-lg">
                        <h1 class="text-2xl font-bold mb-4">
                            DigiVet Analytics Report
                        </h1>

                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Overview</h2>
                            <p class="text-gray-700">
                                This report provides insights into the
                                agricultural and veterinary market conditions
                                across Malawi, focusing on distribution of
                                farmers and livestock across different
                                districts.
                            </p>
                            <p class="text-gray-700 mt-2">
                                Total Farmers: 7,000
                            </p>
                        </div>

                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Key Insights</h2>
                            <ul class="list-disc pl-5 text-gray-700">
                                <li>
                                    The Northern region has the highest
                                    concentration of farmers and livestock.
                                </li>
                                <li>
                                    Mzimba district leads in farmer
                                    registrations and livestock inventory.
                                </li>
                                <li>
                                    Farmer registrations and activity are
                                    primarily concentrated in urban areas.
                                </li>
                            </ul>
                        </div>

                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">
                                Recommendations
                            </h2>
                            <ul class="list-disc pl-5 text-gray-700">
                                <li>
                                    Focus outreach and veterinary services in
                                    Mzimba to support the high farmer
                                    concentration.
                                </li>
                                <li>
                                    Expand veterinary support networks in rural
                                    areas to improve service accessibility and
                                    livestock health.
                                </li>
                                <li>
                                    Introduce targeted animal husbandry tips and
                                    seasonal advice for regions with lower
                                    livestock counts.
                                </li>
                            </ul>
                        </div>

                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">
                                Detailed Data Table
                            </h2>
                            <table class="w-full mt-2 border border-gray-200">
                                <thead>
                                    <tr class="bg-gray-100 text-gray-700">
                                        <th class="py-2 px-4 border-b">
                                            Region
                                        </th>
                                        <th class="py-2 px-4 border-b">
                                            District
                                        </th>
                                        <th class="py-2 px-4 border-b">
                                            Farmers
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="py-2 px-4 border-b">
                                            Northern
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            Mzimba
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            1,500
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 px-4 border-b">
                                            Central
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            Lilongwe
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            3,000
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 px-4 border-b">
                                            Southern
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            Blantyre
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            2,500
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="text-gray-500 text-sm">
                            This report was generated based on the most recent
                            DigiVet data available.
                        </p>
                    </div> */}

                    <div class="p-6 my-8 bg-white shadow-md rounded-lg">
                        <div className="flex">
                            <Typography className="flex-1">
                                Insights and Overview
                            </Typography>
                            <SecondaryButton
                                className="text-green-400 text-3xl mb-8"
                                onClick={printReport}
                            >
                                Download
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 mx-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    />
                                </svg>
                            </SecondaryButton>
                        </div>
                        {!aiResponse.message && (
                            <div
                                id="reportToPrint"
                                dangerouslySetInnerHTML={{
                                    __html: aiResponse,
                                }}
                            />
                        )}

                        {aiResponse.message && aiResponse.message}
                    </div>
                    <br />
                </div>
            </div>
        </DashboardLayout>
    );
}
