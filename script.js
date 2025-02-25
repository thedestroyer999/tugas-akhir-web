document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded!");

    // ===== MENU TOGGLE =====
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });

    // ===== SLIDER =====
    let currentSlide = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slides img").length;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    };

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    };

    setInterval(() => {
        nextSlide();
    }, 3000);

    // ===== ARTIKEL ANIMASI SAAT SCROLL =====
    const articles = document.querySelectorAll("article");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });

    articles.forEach(article => {
        observer.observe(article);
    });

    // ===== POPUP =====
    function openPopup(popupId, event) {
        event.preventDefault();
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "flex";
        }
    }

    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "none";
        }
    }

    // Event Listener untuk tombol buka pop-up
    const tentangKamiBtn = document.getElementById("tentangKami");
    const kontakBtn = document.getElementById("kontak");

    if (tentangKamiBtn) {
        tentangKamiBtn.addEventListener("click", (e) => openPopup("popupTentangKami", e));
    }

    if (kontakBtn) {
        kontakBtn.addEventListener("click", (e) => openPopup("popupKontak", e));
    }

    // Event Listener untuk tombol close (X)
    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener("click", function () {
            const popupId = this.getAttribute("data-close");
            closePopup(popupId);
        });
    });

    // Tutup pop-up saat klik di luar konten
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("popup")) {
            e.target.style.display = "none";
        }
    });
});
