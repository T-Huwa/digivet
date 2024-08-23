<?php

use Illuminate\Database\Seeder;
use App\Models\CaseStudy;
use App\Models\User;

class CaseStudySeeder extends Seeder
{
    public function run()
    {
        // Get all extension workers
        $extensionWorkers = User::where('role', 'Extension Worker')->pluck('id')->toArray();

        // Sample veterinary service-related case studies
        $caseStudies = [
            [
                'title' => 'Successful Treatment of Mastitis in Dairy Cattle',
                'content' => 'This case study highlights the steps taken to successfully treat mastitis in a herd of dairy cattle. The treatment included a combination of antibiotics and regular milking.',
                'image_url' => 'https://example.com/mastitis-treatment.jpg',
            ],
            [
                'title' => 'Managing Foot-and-Mouth Disease Outbreak',
                'content' => 'An outbreak of foot-and-mouth disease in a local farm was controlled through quarantine, vaccination, and hygiene measures. This case study details the actions taken to prevent the spread of the disease.',
                'image_url' => 'https://example.com/foot-and-mouth-disease.jpg',
            ],
            [
                'title' => 'Vaccination Program for Small Ruminants',
                'content' => 'This case study documents a vaccination program for sheep and goats against common diseases like PPR (Peste des Petits Ruminants) and enterotoxemia.',
                'image_url' => 'https://example.com/small-ruminants-vaccination.jpg',
            ],
            [
                'title' => 'Improving Reproductive Efficiency in Beef Cattle',
                'content' => 'A farm was facing low reproductive efficiency in its beef cattle. This case study discusses the implementation of nutritional improvements and timed artificial insemination to increase conception rates.',
                'image_url' => 'https://example.com/reproductive-efficiency.jpg',
            ],
            [
                'title' => 'Eradication of Internal Parasites in Goats',
                'content' => 'This case study explains the strategies used to eradicate internal parasites in a goat herd, including regular deworming and pasture rotation.',
                'image_url' => 'https://example.com/internal-parasites-eradication.jpg',
            ],
            [
                'title' => 'Case Study on Poultry Disease Management',
                'content' => 'This case study focuses on the management of a respiratory disease outbreak in a poultry farm, including biosecurity measures and appropriate medication.',
                'image_url' => 'https://example.com/poultry-disease-management.jpg',
            ],
            [
                'title' => 'Improving Milk Production in Dairy Cows',
                'content' => 'A dairy farm implemented a new feeding regime to improve milk production. This case study outlines the changes made and the resulting increase in milk yield.',
                'image_url' => 'https://example.com/milk-production-improvement.jpg',
            ],
            [
                'title' => 'Dealing with a Rabies Incident in a Livestock Farm',
                'content' => 'A rabies incident in a mixed livestock farm required immediate action. This case study details the response, including vaccination and public health coordination.',
                'image_url' => 'https://example.com/rabies-incident-response.jpg',
            ],
            [
                'title' => 'Nutritional Management of Sheep During Pregnancy',
                'content' => 'This case study discusses the nutritional management practices implemented to ensure the health of pregnant sheep and their lambs.',
                'image_url' => 'https://example.com/sheep-nutrition-pregnancy.jpg',
            ],
            [
                'title' => 'Treatment of Lameness in Dairy Cattle',
                'content' => 'This case study covers the treatment of lameness in dairy cattle, focusing on hoof trimming and corrective shoeing to improve mobility and productivity.',
                'image_url' => 'https://example.com/lameness-treatment.jpg',
            ],
        ];

        // Create the case studies with random extension workers
        foreach ($caseStudies as $caseStudy) {
            CaseStudy::create([
                'extension_worker_id' => $extensionWorkers[array_rand($extensionWorkers)],
                'title' => $caseStudy['title'],
                'content' => $caseStudy['content'],
                'image' => $caseStudy['image_url'],
            ]);
        }
    }
}
