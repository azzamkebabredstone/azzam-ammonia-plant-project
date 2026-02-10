// Data untuk mesin-mesin di setiap proses
const machinesData = {
    // Proses 1: Desulfurisasi
    machine1: {
        basic: {
            name: "Desulfurizer Basic",
            price: "Rp 2,4 Miliar",
            efficiency: "85%",
            yield: "98%"
        },
        standard: {
            name: "Desulfurizer Standard (Rekomendasi)",
            price: "Rp 3,8 Miliar",
            efficiency: "92%",
            yield: "99%"
        },
        premium: {
            name: "Desulfurizer Premium",
            price: "Rp 5,2 Miliar",
            efficiency: "98%",
            yield: "99,5%"
        }
    },
    
    // Proses 2: Steam Reforming
    machine2: {
        basic: {
            name: "Steam Reformer Furnace Basic",
            price: "Rp 115 Miliar",
            efficiency: "80%",
            yield: "88%"
        },
        standard: {
            name: "Steam Reformer Furnace Standard (Rekomendasi)",
            price: "Rp 136 Miliar",
            efficiency: "88%",
            yield: "92%"
        },
        premium: {
            name: "Steam Reformer Furnace Premium",
            price: "Rp 165 Miliar",
            efficiency: "95%",
            yield: "96%"
        }
    },
    
    // Proses 3: Shift Conversion
    machine3: {
        basic: {
            name: "Shift Reactor Basic",
            price: "Rp 40 Miliar",
            efficiency: "85%",
            yield: "92%"
        },
        standard: {
            name: "Shift Reactor Standard (Rekomendasi)",
            price: "Rp 48 Miliar",
            efficiency: "92%",
            yield: "95%"
        },
        premium: {
            name: "Shift Reactor Premium",
            price: "Rp 58 Miliar",
            efficiency: "97%",
            yield: "98%"
        }
    },
    
    // Proses 4: CO₂ Removal
    machine4: {
        basic: {
            name: "CO₂ Removal Unit Basic",
            price: "Rp 72 Miliar",
            efficiency: "90%",
            yield: "95%"
        },
        standard: {
            name: "CO₂ Removal Unit Standard (Rekomendasi)",
            price: "Rp 85 Miliar",
            efficiency: "96%",
            yield: "98%"
        },
        premium: {
            name: "CO₂ Removal Unit Premium",
            price: "Rp 100 Miliar",
            efficiency: "99%",
            yield: "99,5%"
        }
    },
    
    // Proses 5: Ammonia Synthesis
    machine5: {
        basic: {
            name: "Ammonia Synthesis Reactor Basic",
            price: "Rp 60 Miliar",
            efficiency: "15%",
            yield: "96%"
        },
        standard: {
            name: "Ammonia Synthesis Reactor Standard (Rekomendasi)",
            price: "Rp 72 Miliar",
            efficiency: "20%",
            yield: "98%"
        },
        premium: {
            name: "Ammonia Synthesis Reactor Premium",
            price: "Rp 88 Miliar",
            efficiency: "25%",
            yield: "99%"
        }
    }
};

// Fungsi untuk mengupdate mesin berdasarkan pilihan
function updateMachine(processNumber) {
    const selectElement = document.getElementById(`machine${processNumber}`);
    const selectedValue = selectElement.value;
    const machineData = machinesData[`machine${processNumber}`][selectedValue];
    
    // Update tampilan
    document.getElementById(`machine${processNumber}-name`).textContent = machineData.name;
    document.getElementById(`machine${processNumber}-price`).textContent = machineData.price;
    document.getElementById(`machine${processNumber}-efficiency`).textContent = machineData.efficiency;
    document.getElementById(`machine${processNumber}-yield`).textContent = machineData.yield;
    
    // Update total equipment cost jika diperlukan
    updateTotalEquipmentCost();
}

// Fungsi untuk menghitung total biaya peralatan
function updateTotalEquipmentCost() {
    // In a real application, you would calculate based on selected machines
    // For now, we'll keep it static as per the table
    console.log("Total equipment cost calculation would go here");
}

// Fungsi untuk smooth scroll ke section
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll untuk navigation
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to process sections on scroll
    const processSections = document.querySelectorAll('.process-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    processSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Initialize all machines to standard (recommended)
    for (let i = 1; i <= 5; i++) {
        updateMachine(i);
    }
});

// Tambahkan efek hover pada tabel
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f3f4f6';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});