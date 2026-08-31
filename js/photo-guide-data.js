/**
 * Data source for the reusable "Photo Guide" component.
 * Add a new room by pushing another object into ROOM_GUIDES —
 * the component in photo-guide.js will render it automatically.
 */
const ROOM_GUIDES = {
    bathroom: {
        title: "BATHROOM",
        titleAccent: "PHOTO GUIDE",
        image: "images/bathroom-art.png",
        imageAlt: "Bathroom Reference",
        showReference: true,
        items: [
            "Overall room photo",
            "Flooring photo",
            "Wall/paint color photo",
            "Vanity & counters",
            "Window treatment photo",
            "Ceiling/architecture photo",
            "Lighting photo",
            "Built-in or feature photo"
        ],
        tips: [
            "Use good lighting",
            "Hold camera level",
            "Include entire area",
            "Take photos clearly"
        ]
    },
    livingroom: {
        title: "LIVING ROOM",
        titleAccent: "PHOTO GUIDE",
        image: "images/livingroom-art.png",
        imageAlt: "Living Room Reference",
        showReference: true,
        items: [
            "Overall room photo",
            "Flooring photo",
            "Wall/paint color photo",
            "Fireplace (if applicable)",
            "Window treatment photo",
            "Ceiling/architecture photo",
            "Lighting photo",
            "Built-in or feature photo"
        ],
        tips: [
            "Use good lighting",
            "Hold camera level",
            "Include entire area",
            "Take photos clearly"
        ]
    }
};

const CAPTURE_STEPS = [
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 4h.01M12 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1"/><circle cx="12" cy="14" r="1"/><path d="M9 4v4M15 4v4"/></svg>', label: "Stand in doorway" },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="m8 15 3-3 2 2 4-5"/></svg>', label: "Frame entire area" },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/></svg>', label: "Take photo" },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>', label: "Review photo" },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 .5 9H6a4 4 0 0 1-2-7.1"/><path d="M12 12v9M9 15l3-3 3 3"/></svg>', label: "Upload photo" },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>', label: "Next item" },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>', label: "Repeat for all" }
];
