function autocomplete(input, latInput, lngInput) {
    if (!input) return; // skip function from running if no input
    
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        console.error('Google Maps API not loaded');
        return;
    }
    
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        if (place.geometry && place.geometry.location) {
            latInput.value = place.geometry.location.lat();
            lngInput.value = place.geometry.location.lng();
        }
    });

    input.on('keydown', (e) => {
        if (e.keyCode === 13) e.preventDefault();
    });
}

export default autocomplete;