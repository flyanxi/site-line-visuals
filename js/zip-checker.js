/**
 * ZIP / service-area checker (homepage).
 * Client-side placeholder list of ZIP codes for the confirmed North Idaho
 * launch area — replace with the real backend service-area lookup used by
 * the intake before launch.
 */
(function () {
    var IN_AREA_ZIPS = [
        // Coeur d'Alene
        '83814', '83815', '83816',
        // Post Falls
        '83854', '83877',
        // Sandpoint
        '83864',
        // Silver Valley (Kellogg, Wallace, Osburn, Mullan, Pinehurst)
        '83837', '83873', '83849', '83846', '83850',
        // Priest River
        '83856'
    ];

    function init() {
        var form = document.getElementById('zipCheckerForm');
        var result = document.getElementById('zipResult');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var zipInput = document.getElementById('zipInput');
            var zip = zipInput ? zipInput.value.trim() : '';

            result.classList.remove('in-area', 'out-area');

            if (!/^\d{5}$/.test(zip)) {
                result.textContent = 'Please enter a valid 5-digit ZIP code.';
                result.classList.add('show', 'out-area');
                return;
            }

            if (IN_AREA_ZIPS.indexOf(zip) !== -1) {
                result.textContent = "Good news — that ZIP is in our North Idaho launch area. You're clear to start your project.";
                result.classList.add('show', 'in-area');
            } else {
                result.textContent = "That ZIP is outside our confirmed launch area for now. Contact us with your project address and we'll confirm availability.";
                result.classList.add('show', 'out-area');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();