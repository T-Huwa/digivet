<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $caseStudies = CaseStudy::with(['extensionWorker:id,name,profile_photo_url'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('CaseStudies/CaseStudies', ['caseStudies' => $caseStudies]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'Extension Worker') {
            return Inertia::render('EO/CreateCaseStudy');
        }

        abort(403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:24480', // Ensure the uploaded file is an image
        ]);

        // Handle the file upload if a photo is provided
        $photoUrl = 'http://digivet.test/assets/images/covers/cover_7.jpg';
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '.' . $photo->getClientOriginalExtension(); // Generate a unique name for the file
            $photo->move(public_path('uploads'), $photoName); // Store the file in the public/uploads folder
            $photoUrl = url('uploads/' . $photoName); // Generate the URL for the stored file
        }

        // Create the new case study
        CaseStudy::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'image_url' => $photoUrl, // Store the photo URL in the database
            'extension_worker_id' => $request->user()->id, // Assuming the logged-in user is the Extension Worker
        ]);

        $caseStudies = CaseStudy::with(['extensionWorker:id,name,profile_photo_url'])->get();

        return Inertia::render('CaseStudies/CaseStudies', ['caseStudies' => $caseStudies]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {

        $caseStudy = CaseStudy::with('extensionWorker')->findOrFail($id);

        return Inertia::render('CaseStudies/CaseStudy', ['caseStudy'=> $caseStudy]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CaseStudy $caseStudies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CaseStudy $caseStudies)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CaseStudy $caseStudies)
    {
        //
    }
}
