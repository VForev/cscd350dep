document.addEventListener('DOMContentLoaded', function() {
        const parkingGrid = document.getElementById('parking-grid');
        const reserveButton = document.getElementById('reserve-button');
        let selectedSpot = null;

        // Function to check if a spot is reserved
        function isReserved(spotId, reservedSpots) {
            return reservedSpots.includes(spotId);
        }

        // Generate parking spots
        fetch('/reserved_spots') // Fetch reserved spots
            .then(response => response.json())
            .then(reservedSpots => {
                for (let i = 1; i <= 50; i++) {
                    const spot = document.createElement('div');
                    spot.classList.add('spot');
                    spot.textContent = `Spot ${i}`;
                    spot.dataset.spotId = i;

                    if (isReserved(i, reservedSpots)) { // Check if spot is reserved
                        spot.classList.add('reserved');
                    } else {
                        spot.classList.add('available');
                        spot.addEventListener('click', function() {
                            if (spot.classList.contains('reserved')) return;
                            if (selectedSpot) {
                                selectedSpot.classList.remove('selected');
                            }
                            selectedSpot = spot;
                            spot.classList.add('selected');
                        });
                    }

                    parkingGrid.appendChild(spot);
                }
            });

        reserveButton.addEventListener('click', function() {
            if (!selectedSpot) {
                alert('Please select a spot to reserve.');
                return;
            }

            const spotId = selectedSpot.dataset.spotId;
            localStorage.setItem('selectedSpotId', spotId);
            window.location.href = '/checkout';
        });
    });