import Iconify from "@/Components/iconify";
import DashboardLayout from "@/Layouts/dashboard";
import { fDateTime } from "@/utils/format-time";
import { Avatar, Box, Divider } from "@mui/material";

const CaseStudy = ({ caseStudy }) => {
    return (
        <>
            <DashboardLayout>
                <Box className="p-12">
                    <Box>
                        <div className="flex">
                            <div className="flex-1">
                                <span className="text-2xl font-medium">
                                    Case Study
                                </span>
                                <span className="flex">
                                    <Iconify
                                        icon="eva:clock-outline"
                                        sx={{ m: 1, width: 16, height: 16 }}
                                    />
                                    <span className="my-auto">
                                        {fDateTime(caseStudy.created_at)}
                                    </span>
                                </span>
                            </div>

                            <div className="flex">
                                <div className="text-right my-auto">
                                    <p>{caseStudy.extension_worker.name}</p>
                                    <p>{caseStudy.extension_worker.email}</p>
                                </div>
                                <Avatar
                                    className="my-auto mx-2 border-2 border-green"
                                    alt={"profile"}
                                    src={
                                        caseStudy.extension_worker
                                            .profile_photo_url
                                    }
                                />
                            </div>
                        </div>

                        <p className="text-4xl font-bold my-4">
                            {caseStudy.title}
                        </p>
                        <Divider className="mb-4" />

                        <div className="w-full rounded-md">
                            <p className="text-lg py-6">{caseStudy.content}</p>
                        </div>
                    </Box>
                </Box>
            </DashboardLayout>
        </>
    );
};

export default CaseStudy;
