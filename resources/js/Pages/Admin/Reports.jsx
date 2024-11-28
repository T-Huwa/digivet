import DashboardLayout from "@/Layouts/dashboard";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import SecondaryButton from "@/Components/SecondaryButton";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Reports({ report }) {
    const componentRef = useRef();

    const printReport = () => {
        window.print();
    };

    //const aiReport = report.aiReport;

    const {
        overallStats,
        farmerDistribution,
        animalDistribution,
        extensionOfficerCoverage,
    } = report;

    const exportPDF = () => {
        const doc = new jsPDF();

        doc.text("DigiVet System Reports", 20, 10);

        doc.text("Overall Statistics", 14, 20);
        doc.autoTable({
            head: [["Metric", "Value"]],
            body: [
                ["Total Farmers", overallStats.totalFarmers],
                ["Total Animals", overallStats.totalAnimals],
                ["Total Areas", overallStats.totalAreas],
                ["Total Districts", overallStats.totalDistricts],
            ],
            startY: 25,
        });

        doc.text(
            "Farmer Distribution by Area",
            14,
            doc.lastAutoTable.finalY + 10
        );
        doc.autoTable({
            head: [["Area", "Farmers"]],
            body: farmerDistribution.map((item) => [item.name, item.farmers]),
            startY: doc.lastAutoTable.finalY + 15,
        });

        doc.text("Animal Distribution", 14, doc.lastAutoTable.finalY + 10);
        doc.autoTable({
            head: [["Animal Type", "Count"]],
            body: animalDistribution.map((item) => [item.name, item.value]),
            startY: doc.lastAutoTable.finalY + 15,
        });

        doc.text(
            "Extension Officer Coverage",
            14,
            doc.lastAutoTable.finalY + 10
        );
        doc.autoTable({
            head: [["Area", "Farmers", "Extension Officer"]],
            body: extensionOfficerCoverage.map((item) => [
                item.name,
                item.farmers,
                item.officerName || "N/A",
            ]),
            startY: doc.lastAutoTable.finalY + 15,
        });

        doc.save("DigiVet_Reports.pdf");
    };

    const exportCSV = () => {
        const csvRows = [
            ["Metric", "Value"],
            ["Total Farmers", overallStats.totalFarmers],
            ["Total Animals", overallStats.totalAnimals],
            ["Total Areas", overallStats.totalAreas],
            ["Total Districts", overallStats.totalDistricts],
            "",
            ["Area", "Farmers"],
            ...farmerDistribution.map((item) => [item.name, item.farmers]),
            "",
            ["Animal Type", "Count"],
            ...animalDistribution.map((item) => [item.name, item.value]),
            "",
            ["Area", "Farmers", "Extension Officer"],
            ...extensionOfficerCoverage.map((item) => [
                item.name,
                item.farmers,
                item.officerName || "N/A",
            ]),
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
            <Head title="Admin Reports" />
            <div className="h-full sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        DigiVet System Reports
                    </h1>
                    {/* Buttons for Export */}
                    <div className="flex space-x-4 mb-8">
                        <SecondaryButton onClick={exportPDF}>
                            Export as PDF
                        </SecondaryButton>
                        <SecondaryButton onClick={exportCSV}>
                            Export as CSV
                        </SecondaryButton>
                    </div>
                    {/* Overall Statistics */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Overall Statistics
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">
                                    Total Farmers
                                </p>
                                <p className="text-2xl font-bold text-blue-800">
                                    {overallStats.totalFarmers}
                                </p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <p className="text-sm text-green-600 font-medium">
                                    Total Animals
                                </p>
                                <p className="text-2xl font-bold text-green-800">
                                    {overallStats.totalAnimals}
                                </p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <p className="text-sm text-yellow-600 font-medium">
                                    Total Areas
                                </p>
                                <p className="text-2xl font-bold text-yellow-800">
                                    {overallStats.totalAreas}
                                </p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg">
                                <p className="text-sm text-purple-600 font-medium">
                                    Total Districts
                                </p>
                                <p className="text-2xl font-bold text-purple-800">
                                    {overallStats.totalDistricts}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Farmer Distribution */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Farmer Distribution by Area
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={farmerDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="farmers" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Animal Distribution */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Animal Distribution
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
                    {/* Extension Officer Coverage */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Extension Officer Coverage
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Area
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Farmers
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Extension Officer
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {extensionOfficerCoverage.map((area) => (
                                        <tr key={area.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {area.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {area.farmers}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {area.officerName || "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/** Generated Report
                     * 
                    <div className="bg-white my-8 shadow rounded-lg p-6">
                        <SecondaryButton
                            onClick={printReport}
                            className="text-green-400 text-3xl mb-8"
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
                        <PrintComponent data={aiReport} ref={componentRef} />
                    </div>
                    */}
                    <br />
                </div>
            </div>
        </DashboardLayout>
    );
}
