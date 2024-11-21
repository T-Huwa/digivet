import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SignUpForm from "@/Components/SignUpForm";
import TextInput from "@/Components/TextInput";
import { MapIcon, PhoneIcon } from "@heroicons/react/outline";
import { Head, Link, router } from "@inertiajs/react";
import { BarChart } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";

export default function LandingPage() {
    function login() {
        router.visit("/login");
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Head title="Welcome" />
            <main className="flex-1">
                <div className="w-full flex bg-green-50">
                    <div className="flex-1"></div>
                    <PrimaryButton className="m-4" onClick={login}>
                        Login
                    </PrimaryButton>
                </div>
                <section
                    className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-50 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/images/cows.jpg')",
                    }}
                >
                    {/* White and blur overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>

                    {/* Content */}
                    <div className="relative container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl text-gray-100 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    DigiVet: Connecting Farmers with Veterinary
                                    Care
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-300">
                                    Empowering animal farmers with quick access
                                    to veterinary extension workers in their
                                    area.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <PrimaryButton>
                                    <Link href="/login">Get Started</Link>
                                </PrimaryButton>
                                <SecondaryButton variant="outline">
                                    Learn More
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            How DigiVet Helps
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <Card>
                                <CardContent className="flex flex-col items-center space-y-4 p-6">
                                    <MapIcon className="h-12 w-12 text-green-500" />
                                    <h3 className="text-2xl font-bold text-center">
                                        Locate Nearby Vets
                                    </h3>
                                    <p className="text-gray-500 text-center">
                                        Quickly find and connect with veterinary
                                        extension workers in your local area.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col items-center space-y-4 p-6">
                                    <PhoneIcon className="h-12 w-12 text-green-500" />
                                    <h3 className="text-2xl font-bold text-center">
                                        Instant Communication
                                    </h3>
                                    <p className="text-gray-500 text-center">
                                        Direct messaging and call features to
                                        get immediate veterinary advice and
                                        support.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col items-center space-y-4 p-6">
                                    <BarChart className="h-12 w-12 text-green-500" />
                                    <h3 className="text-2xl font-bold text-center">
                                        Health Tracking
                                    </h3>
                                    <p className="text-gray-500 text-center">
                                        Monitor and track your animals' health
                                        records and vaccination schedules
                                        easily.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section
                    className="w-full py-12 md:py-24 lg:py-32 bg-green-50"
                    style={{
                        backgroundImage: "url('/assets/images/sheep.jpg')",
                    }}
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-gray-300 text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Success Stories
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-gray-500 mb-4">
                                        "DigiVet has been a game-changer for my
                                        dairy farm. I got quick advice during a
                                        calving emergency, saving both the
                                        mother and calf. It's like having a vet
                                        on call 24/7!"
                                    </p>
                                    <p className="font-semibold">
                                        John Doe, Dairy Farmer
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Green Pastures Farm
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-gray-500 mb-4">
                                        "As a veterinary extension worker,
                                        DigiVet has allowed me to reach more
                                        farmers and provide timely care. The
                                        platform's efficiency has significantly
                                        improved animal health in our region."
                                    </p>
                                    <p className="font-semibold">
                                        Dr. Jane Smith, Veterinarian
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        County Animal Health Services
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Join the DigiVet Network
                                </h2>
                                <p className="mx-auto max-w-[600px] text-green-100 md:text-xl">
                                    Whether you're a farmer or a veterinary
                                    professional, DigiVet is here to support
                                    you. Sign up today!
                                </p>
                            </div>
                            <SignUpForm />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500">
                    © 2024 DigiVet. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Contact Us
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
