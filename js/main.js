document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const images = carouselInner.querySelectorAll('img');
    let index = 0; // Track the current image index

    function showImage(idx) {
        const imageWidth = images[0].offsetWidth;
        const gap = 10; // Assuming the same gap as in your CSS
        const scrollPosition = (imageWidth + gap) * idx;
        carouselInner.scrollLeft = scrollPosition; // Directly set scroll position
    }

    document.querySelector('.left').addEventListener('click', function() {
        if (index > 0) {
            index--;
            showImage(index);
        }
    });

    document.querySelector('.right').addEventListener('click', function() {
        if (index < images.length - 1) {
            index++;
            showImage(index);
        }
    });

    // Add event listener for manual scrolling to update the index based on scroll position
    carouselInner.addEventListener('scroll', function() {
        const currentScroll = carouselInner.scrollLeft;
        const imageWidth = images[0].offsetWidth;
        const gap = 10; // Same as in the CSS
        index = Math.round(currentScroll / (imageWidth + gap));
    });



    var modal = document.getElementById("registrationModal");
    var closeButton = document.querySelector(".close-button");

    function toggleModal() {
      modal.style.display = (modal.style.display === "none" ? "block" : "none");
    }

    closeButton.addEventListener("click", toggleModal);
    // Uncomment the next line if you want the modal to open automatically when the page loads
    //toggleModal();    

});
