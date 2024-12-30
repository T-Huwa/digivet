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
import "jspdf-autotable";

import DashboardLayout from "@/Layouts/dashboard";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head} from "@inertiajs/react";
import jsPDF from "jspdf";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function EOReports({ reportsData }) {
    //const aiResponse = reportsData.aiReport;

    console.log(reportsData);
    /*
    const {
        officer_info: officerInfo = {},
        farmer_summary: farmerSummary = [],
        recent_appointments: recentAppointments = [],
        upcoming_appointments: upcomingAppointments = [],
        animal_distribution: animalDistribution = [],
    } = reportsData || {};*/

    const officerInfo = reportsData.officerInfo || {};
    const farmerSummary = reportsData.farmerSummary || {};
    const recentAppointments = reportsData.recentAppointments || {};
    const upcomingAppointments = reportsData.upcomingAppointments || {};
    const animalDistribution = reportsData.animalDistribution || {};
    const servicesCounts = reportsData.service_counts || {};

    console.log(servicesCounts);

    const exportPDF = () => {
        const doc = new jsPDF();

        //let lastY = 20;

        doc.text("DigiVet Officer System Reports", 20, 10);

        doc.text("Officer Information", 14, 20);
        doc.autoTable({
            head: [["Metric", "Value"]],
            body: [
                ["Name", officerInfo.name],
                ["Area", officerInfo.area],
                ["District", officerInfo.district],
                ["Total Farmers", officerInfo.totalFarmers],
                ["Total Animals", officerInfo.totalAnimals],
            ],
            startY: 25,
        });

        doc.text("Farmer Summary", 14, doc.lastAutoTable.finalY + 10);
        doc.autoTable({
            head: [["Animal Type", "Farmers Count"]],
            body: farmerSummary.map((item) => [
                item.animalType,
                item.farmerCount,
            ]),
            startY: doc.lastAutoTable.finalY + 15,
        });

        doc.text("Animal Distribution", 14, doc.lastAutoTable.finalY + 10);
        doc.autoTable({
            head: [["Animal Type", "Count"]],
            body: animalDistribution.map((item) => [item.name, item.value]),
            startY: doc.lastAutoTable.finalY + 15,
        });

        doc.text("Appointment Servies", 14, doc.lastAutoTable.finalY + 10);
        doc.autoTable({
            head: [["Service", "Appointments Count"]],
            body: servicesCounts.map((item) => [
                item.service,
                item.count,
            ]),
            startY: doc.lastAutoTable.finalY + 15,
        });

        doc.save("DigiVet_Reports.pdf");
    };

    const exportCSV = () => {
        const csvRows = [
            ["Metric", "Value"],
            ["Name", officerInfo.name],
            ["Area", officerInfo.area],
            ["District", officerInfo.district],
            ["Total Farmers", officerInfo.total_farmers],
            ["Total Animals", officerInfo.total_animals],
            "",
            ["Animal Type", "Farmer Count"],
            ...farmerSummary.map((item) => [item.animal_type, item.farmer_count]),
            "",
            ["Animal Type", "Count"],
            ...animalDistribution.map((item) => [item.name, item.value]),
        ];

        const csvContent = csvRows.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", "DigiVet_Reports.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

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

                    {/* Buttons for Export */}
                    <div className="flex space-x-4 mb-8">
                        <SecondaryButton onClick={exportPDF}>
                            Export as PDF
                        </SecondaryButton>
                        <SecondaryButton onClick={exportCSV}>
                            Export as CSV
                        </SecondaryButton>
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
                    </div> */}
                    <br />
                </div>
            </div>
        </DashboardLayout>
    );
}
