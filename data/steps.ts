export interface Step {
    title: string;
    description: string;
    tip: string;
}

export const STATIC_STEPS: Step[] = [
    {
        title: "Finding & Downloading a Model",
        description: "Your 3D printing journey begins with a model. There are vast online communities where creators share files, usually in `.stl` or `.3mf` format. Popular sites include Printables, Thingiverse, and MakerWorld. Browse for something you like and download the model files to your computer.",
        tip: "For your first print, choose a simple, well-known calibration model like the '3D Benchy' or a 'Calibration Cube'. These are designed to test your printer's capabilities and are quick to print."
    },
    {
        title: "Slicing Your Model",
        description: "A 3D printer can't directly read a model file like an STL. It needs a set of step-by-step instructions called G-code. The software that converts your model into G-code is called a 'slicer'. Open your slicer (e.g., Cura, PrusaSlicer, OrcaSlicer) and import the model file you just downloaded.",
        tip: "Make sure your slicer is configured for your specific 3D printer model. Most slicers have pre-made profiles you can select to get all the basic machine settings correct from the start."
    },
    {
        title: "Key Slicer Settings",
        description: "Inside the slicer, you'll find hundreds of settings. For now, focus on the most important ones: 'Layer Height' (0.2mm is a good start), 'Infill' (15-20% is typical), and 'Supports' (enable if your model has large overhangs). Once you've set these, click the 'Slice' button to generate the G-code file and save it to your computer.",
        tip: "Pay close attention to the material type in your slicer settings (e.g., PLA, PETG, ABS). This will automatically adjust crucial temperature settings for you."
    },
    {
        title: "Powering On & Homing",
        description: "With your G-code ready, it's time to turn on your printer. In the Mainsail dashboard, find the 'Home All' button (usually a house icon). Clicking this tells the printer to find its starting position (0,0,0) by moving the print head and bed until they touch the endstop switches.",
        tip: "Homing is crucial before every print. It ensures the printer knows exactly where the print head is, preventing it from crashing into the bed or printing in mid-air."
    },
    {
        title: "Uploading a G-code File",
        description: "Next, you need to give the printer its instructions. In Mainsail, look for the 'G-Code Files' section on the left. You can drag and drop your `.gcode` file directly into this area or use the 'Upload' button to select it from your computer.",
        tip: "Give your G-code files descriptive names, like 'Benchy_PLA_0.2mm.gcode'. It makes finding the right file for the right filament and settings much easier later on!"
    },
    {
        title: "Preheating Nozzle & Bed",
        description: "Plastic won't extrude or stick if it's not hot enough. In the dashboard, find the temperature controls for the 'Heater' (your nozzle) and 'Heater Bed'. Enter your desired temperatures (e.g., 200°C for the nozzle, 60°C for the bed for PLA) and click 'Set'. You can watch the temperature graphs climb to the target.",
        tip: "Most slicers add preheating commands to the G-code file. However, preheating manually beforehand can save a little time at the start of your print."
    },
    {
        title: "Starting the Print",
        description: "Once your G-code is uploaded and the temperatures are stable, you're ready to go! Select the file you uploaded from the 'G-Code Files' list. This will load it and make a 'Print' button appear at the top of the dashboard. Take a deep breath and click 'Print'!",
        tip: "Always watch the first layer of your print closely. This is the most critical part. If the plastic isn't sticking well or looks squiggly, you can 'Live Adjust Z-Offset' (baby-stepping) in the dashboard to fine-tune the nozzle height."
    },
    {
        title: "Monitoring the Print",
        description: "Your print is running! The Mainsail dashboard is now your command center. You can see the print progress, estimated time remaining, and a visualizer of the G-code. The console will show you every command being executed. If you have a webcam set up, you'll see a live feed of your print.",
        tip: "Don't leave your printer completely unattended, especially on long prints. Check in periodically through the webcam or in person to ensure everything is running smoothly."
    },
    {
        title: "Troubleshooting Common Issues",
        description: "Did something go wrong? Don't worry, it's part of the learning process! Common first-print issues include the print not sticking to the bed (bad adhesion), messy first layers, or stringing. The key is to identify the problem and make small adjustments.",
        tip: "If the print isn't sticking, the most common culprit is the Z-offset. The nozzle is likely too far from the bed. Try re-leveling the bed and using the 'Live Adjust Z-Offset' feature on your next attempt. Cleaning the build plate with isopropyl alcohol also works wonders!"
    }
];
