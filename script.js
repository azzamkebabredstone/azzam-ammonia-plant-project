// ===== GLOBAL VARIABLES & DATA =====

// Data mesin untuk setiap proses
const machinesData = {
    // Proses 1: Desulfurisasi
    machine1: {
        basic: {
            name: "Desulfurizer Basic",
            price: 2400000000,
            efficiency: 85,
            yield: 98,
            code: "R-101B",
            energy: 5000
        },
        standard: {
            name: "Desulfurizer Standard",
            price: 3800000000,
            efficiency: 92,
            yield: 99,
            code: "R-101S",
            energy: 4500
        },
        premium: {
            name: "Desulfurizer Premium",
            price: 5200000000,
            efficiency: 98,
            yield: 99.5,
            code: "R-101P",
            energy: 4000
        }
    },
    
    // Proses 2: Steam Reforming
    machine2: {
        basic: {
            name: "Steam Reformer Furnace Basic",
            price: 115000000000,
            efficiency: 80,
            yield: 88,
            code: "F-101B",
            energy: 35000
        },
        standard: {
            name: "Steam Reformer Furnace Standard",
            price: 136000000000,
            efficiency: 88,
            yield: 92,
            code: "F-101S",
            energy: 30000
        },
        premium: {
            name: "Steam Reformer Furnace Premium",
            price: 165000000000,
            efficiency: 95,
            yield: 96,
            code: "F-101P",
            energy: 25000
        }
    },
    
    // Proses 3: Shift Conversion
    machine3: {
        basic: {
            name: "Shift Reactor Basic",
            price: 40000000000,
            efficiency: 85,
            yield: 92,
            code: "R-201B",
            energy: 15000
        },
        standard: {
            name: "Shift Reactor Standard",
            price: 48000000000,
            efficiency: 92,
            yield: 95,
            code: "R-201S",
            energy: 12000
        },
        premium: {
            name: "Shift Reactor Premium",
            price: 58000000000,
            efficiency: 97,
            yield: 98,
            code: "R-201P",
            energy: 10000
        }
    },
    
    // Proses 4: CO₂ Removal
    machine4: {
        basic: {
            name: "CO₂ Removal Unit Basic",
            price: 72000000000,
            efficiency: 90,
            yield: 95,
            code: "C-101B",
            energy: 28000
        },
        standard: {
            name: "CO₂ Removal Unit Standard",
            price: 85000000000,
            efficiency: 96,
            yield: 98,
            code: "C-101S",
            energy: 25000
        },
        premium: {
            name: "CO₂ Removal Unit Premium",
            price: 100000000000,
            efficiency: 99,
            yield: 99.5,
            code: "C-101P",
            energy: 22000
        }
    },
    
    // Proses 5: Ammonia Synthesis
    machine5: {
        basic: {
            name: "Ammonia Synthesis Reactor Basic",
            price: 60000000000,
            efficiency: 15, // Single pass conversion
            yield: 96,
            code: "R-301B",
            energy: 50000
        },
        standard: {
            name: "Ammonia Synthesis Reactor Standard",
            price: 72000000000,
            efficiency: 20,
            yield: 98,
            code: "R-301S",
            energy: 45000
        },
        premium: {
            name: "Ammonia Synthesis Reactor Premium",
            price: 88000000000,
            efficiency: 25,
            yield: 99,
            code: "R-301P",
            energy: 40000
        }
    }
};

// Data bahan baku dengan harga aktual Indonesia 2024
const rawMaterialData = [
    {
        id: "natural_gas",
        name: "Gas Alam",
        category: "gas",
        unit: "MMBTU",
        theoreticalNeed: 29700000, // 458.8 ton/hari ≈ 29.7 juta MMBTU
        unitPrice: 96000,
        source: "Kementerian ESDM RI - Harga Gas Industri 2024"
    },
    {
        id: "air_nitrogen",
        name: "Udara (untuk N₂)",
        category: "gas",
        unit: "kg",
        theoreticalNeed: 823529,
        unitPrice: 100, // Biaya kompresi dan pemisahan
        source: "Perhitungan teknis"
    },
    {
        id: "zno",
        name: "Zinc Oxide (ZnO)",
        category: "chemical",
        unit: "kg",
        theoreticalNeed: 147.4,
        unitPrice: 85000,
        source: "PT. Indo Acidatama - Supplier Kimia"
    },
    {
        id: "process_water",
        name: "Air Demineralisasi",
        category: "utility",
        unit: "m³",
        theoreticalNeed: 1085,
        unitPrice: 5000,
        source: "PDAM & Water Treatment Industri"
    },
    {
        id: "electricity",
        name: "Listrik Industri",
        category: "utility",
        unit: "kWh",
        theoreticalNeed: 137000, // Total dari semua proses
        unitPrice: 1500,
        source: "PLN Tarif Industri 2024"
    },
    {
        id: "catalyst_nickel",
        name: "Katalis Nikel (Reforming)",
        category: "catalyst",
        unit: "kg",
        theoreticalNeed: 0.05, // Harian, asumsi lifetime 3 tahun
        unitPrice: 1200000,
        source: "PT. Antam & Import"
    },
    {
        id: "catalyst_iron",
        name: "Katalis Besi (Haber-Bosch)",
        category: "catalyst",
        unit: "kg",
        theoreticalNeed: 0.03, // Harian, asumsi lifetime 5 tahun
        unitPrice: 800000,
        source: "Supplier Katalis Industri"
    },
    {
        id: "catalyst_shift",
        name: "Katalis Shift",
        category: "catalyst",
        unit: "kg",
        theoreticalNeed: 0.02,
        unitPrice: 600000,
        source: "Supplier Katalis"
    },
    {
        id: "mea",
        name: "Monoethanolamine (MEA)",
        category: "chemical",
        unit: "kg",
        theoreticalNeed: 50, // Make-up harian
        unitPrice: 30000,
        source: "Supplier Kimia Industri"
    },
    {
        id: "cooling_water",
        name: "Air Pendingin",
        category: "utility",
        unit: "m³",
        theoreticalNeed: 5000,
        unitPrice: 2000,
        source: "PDAM Industri"
    },
    {
        id: "boiler_feed",
        name: "Air Boiler",
        category: "utility",
        unit: "m³",
        theoreticalNeed: 800,
        unitPrice: 8000,
        source: "Water Treatment Plant"
    },
    {
        id: "instrument_air",
        name: "Udara Instrument",
        category: "utility",
        unit: "Nm³",
        theoreticalNeed: 10000,
        unitPrice: 500,
        source: "Air Compressor"
    }
];

// Data peralatan utama
const equipmentData = [
    { code: "R-101", name: "Desulfurizer Vessel", qty: 1, unitPrice: 3800000000 },
    { code: "F-101", name: "Steam Reformer Furnace", qty: 1, unitPrice: 136000000000 },
    { code: "C-101", name: "Syngas Compressor", qty: 1, unitPrice: 51200000000 },
    { code: "R-201", name: "Shift Reactor", qty: 1, unitPrice: 48000000000 },
    { code: "C-201", name: "CO₂ Removal Unit", qty: 1, unitPrice: 85000000000 },
    { code: "R-301", name: "Ammonia Synthesis Reactor", qty: 1, unitPrice: 72000000000 },
    { code: "D-301", name: "Distillation Column", qty: 2, unitPrice: 16000000000 },
    { code: "HE-101", name: "Heat Exchangers", qty: 10, unitPrice: 4000000000 },
    { code: "P-101", name: "Pumps & Motors", qty: 15, unitPrice: 640000000 },
    { code: "TK-101", name: "Storage Tanks", qty: 4, unitPrice: 8000000000 }
];

// ===== UTILITY FUNCTIONS =====

// Format angka ke Rupiah
function formatRupiah(amount) {
    if (amount >= 1000000000000) {
        return `Rp ${(amount / 1000000000000).toFixed(2)} T`;
    } else if (amount >= 1000000000) {
        return `Rp ${(amount / 1000000000).toFixed(2)} M`;
    } else if (amount >= 1000000) {
        return `Rp ${(amount / 1000000).toFixed(1)} jt`;
    } else {
        return `Rp ${amount.toLocaleString('id-ID')}`;
    }
}

// Format angka biasa dengan pemisah ribuan
function formatNumber(num, decimals = 0) {
    return num.toLocaleString('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// Hitung efisiensi rata-rata dari semua mesin
function calculateAverageEfficiency() {
    let totalEfficiency = 0;
    let count = 0;
    
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (select) {
            const machine = machinesData[`machine${i}`][select.value];
            totalEfficiency += machine.efficiency;
            count++;
        }
    }
    
    return count > 0 ? totalEfficiency / count : 85.2; // Default 85.2%
}

// Hitung total biaya mesin
function calculateTotalMachineCost() {
    let totalCost = 0;
    
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (select) {
            const machine = machinesData[`machine${i}`][select.value];
            totalCost += machine.price;
        }
    }
    
    return totalCost;
}

// ===== MAIN FUNCTIONS =====

// Update tampilan mesin di setiap proses
function updateMachine(processNumber) {
    const select = document.getElementById(`machine${processNumber}`);
    if (!select) return;
    
    const selectedValue = select.value;
    const machine = machinesData[`machine${processNumber}`][selectedValue];
    
    if (!machine) return;
    
    // Update di proses detail
    const nameElement = document.getElementById(`machine${processNumber}-name`);
    const priceElement = document.getElementById(`machine${processNumber}-price`);
    const efficiencyElement = document.getElementById(`machine${processNumber}-efficiency`);
    const yieldElement = document.getElementById(`machine${processNumber}-yield`);
    
    if (nameElement) nameElement.textContent = machine.name;
    if (priceElement) priceElement.textContent = formatRupiah(machine.price);
    if (efficiencyElement) efficiencyElement.textContent = `${machine.efficiency}%`;
    if (yieldElement) yieldElement.textContent = `${machine.yield}%`;
    
    // Update kebutuhan khusus per mesin
    updateMachineSpecifics(processNumber, machine);
}

// Update kebutuhan khusus per mesin
function updateMachineSpecifics(processNumber, machine) {
    switch(processNumber) {
        case 1: // Desulfurisasi
            const znNeed = (147.4 * (100 / machine.efficiency)).toFixed(1);
            document.getElementById('machine1-znoneed').textContent = `${znNeed} kg/hari`;
            break;
        case 2: // Steam Reforming
            const ch4Need = (458800 * (100 / machine.efficiency)).toFixed(0);
            document.getElementById('machine2-ch4need').textContent = `${formatNumber(ch4Need)} kg/hari`;
            break;
        case 3: // Shift
            const energy3 = (15000 * (100 / machine.efficiency)).toFixed(0);
            document.getElementById('machine3-energy').textContent = `${formatNumber(energy3)} kWh/hari`;
            break;
        case 4: // CO₂ Removal
            const energy4 = (25000 * (100 / machine.efficiency)).toFixed(0);
            document.getElementById('machine4-energy').textContent = `${formatNumber(energy4)} kWh/hari`;
            break;
        case 5: // Sintesis
            const energy5 = (45000 * (100 / machine.efficiency)).toFixed(0);
            document.getElementById('machine5-energy').textContent = `${formatNumber(energy5)} kWh/hari`;
            break;
    }
}

// Update ringkasan mesin
function updateMachineSummary() {
    const summaryGrid = document.getElementById('machine-summary-grid');
    if (!summaryGrid) return;
    
    let html = '';
    let totalCost = 0;
    let totalEfficiency = 0;
    
    // Nama proses untuk display
    const processNames = {
        1: "Desulfurisasi",
        2: "Steam Reforming", 
        3: "Shift Conversion",
        4: "CO₂ Removal",
        5: "Sintesis Amonia"
    };
    
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (!select) continue;
        
        const selectedValue = select.value;
        const machine = machinesData[`machine${i}`][selectedValue];
        
        if (!machine) continue;
        
        totalCost += machine.price;
        totalEfficiency += machine.efficiency;
        
        html += `
            <div class="summary-card">
                <div class="summary-card-header">
                    <div class="summary-card-title">${processNames[i]}</div>
                    <select class="summary-card-select" onchange="setMachine(${i}, this.value); updateAllCalculations();">
                        <option value="basic" ${selectedValue === 'basic' ? 'selected' : ''}>Basic</option>
                        <option value="standard" ${selectedValue === 'standard' ? 'selected' : ''}>Standard</option>
                        <option value="premium" ${selectedValue === 'premium' ? 'selected' : ''}>Premium</option>
                    </select>
                </div>
                <div class="summary-card-details">
                    <div class="detail-label">Mesin:</div>
                    <div class="detail-value">${machine.name}</div>
                    
                    <div class="detail-label">Kode:</div>
                    <div class="detail-value">${machine.code}</div>
                    
                    <div class="detail-label">Harga:</div>
                    <div class="detail-value">${formatRupiah(machine.price)}</div>
                    
                    <div class="detail-label">Efisiensi:</div>
                    <div class="detail-value">${machine.efficiency}%</div>
                    
                    <div class="detail-label">Yield:</div>
                    <div class="detail-value">${machine.yield}%</div>
                </div>
            </div>
        `;
    }
    
    summaryGrid.innerHTML = html;
    
    // Update total
    const avgEfficiency = totalEfficiency / 5;
    const correctionFactor = 100 / avgEfficiency;
    
    document.getElementById('total-machine-cost').textContent = formatRupiah(totalCost);
    document.getElementById('average-efficiency').textContent = `${avgEfficiency.toFixed(1)}%`;
    document.getElementById('correction-factor').textContent = `${correctionFactor.toFixed(3)}x`;
    
    // Update header
    document.getElementById('header-efficiency').textContent = avgEfficiency.toFixed(1);
}

// Set mesin dari ringkasan
function setMachine(processNumber, value) {
    const select = document.getElementById(`machine${processNumber}`);
    if (select) {
        select.value = value;
        updateMachine(processNumber);
    }
}

// Set semua mesin ke level tertentu
function setAllMachines(level) {
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (select) {
            select.value = level;
            updateMachine(i);
        }
    }
    updateAllCalculations();
}

// Update perhitungan bahan baku
function updateRawMaterialCalculation() {
    const avgEfficiency = calculateAverageEfficiency();
    const correctionFactor = 100 / avgEfficiency;
    const extraPercent = ((correctionFactor - 1) * 100).toFixed(1);
    
    // Update info box
    document.getElementById('current-efficiency-display').textContent = `${avgEfficiency.toFixed(1)}%`;
    document.getElementById('current-correction-display').textContent = `${correctionFactor.toFixed(3)}x`;
    document.getElementById('current-extra-percent').textContent = `${extraPercent}%`;
    
    // Update header
    document.getElementById('header-efficiency').textContent = avgEfficiency.toFixed(1);
    
    // Hitung dan update tabel bahan baku
    let tableBody = '';
    let totalDailyCost = 0;
    
    const categoryTotals = {
        'gas': 0,
        'chemical': 0,
        'utility': 0,
        'catalyst': 0
    };
    
    const categoryNames = {
        'gas': 'Gas & Udara',
        'chemical': 'Bahan Kimia',
        'utility': 'Utilitas',
        'catalyst': 'Katalis'
    };
    
    rawMaterialData.forEach(material => {
        const actualNeed = material.theoreticalNeed * correctionFactor;
        const dailyCost = actualNeed * material.unitPrice;
        totalDailyCost += dailyCost;
        
        // Hitung per kategori untuk breakdown
        categoryTotals[material.category] = (categoryTotals[material.category] || 0) + dailyCost;
        
        tableBody += `
            <tr data-category="${material.category}">
                <td>${material.name}</td>
                <td><span class="category-badge category-${material.category}">${categoryNames[material.category]}</span></td>
                <td>${formatNumber(material.theoreticalNeed, 1)} ${material.unit}</td>
                <td>${correctionFactor.toFixed(3)}x</td>
                <td>${formatNumber(actualNeed, 1)} ${material.unit}</td>
                <td>${formatRupiah(material.unitPrice)}/${material.unit}</td>
                <td>${formatRupiah(dailyCost)}</td>
                <td>${formatRupiah(dailyCost * 330)}</td>
            </tr>
        `;
    });
    
    document.getElementById('raw-material-body').innerHTML = tableBody;
    
    // Update total
    const yearlyCost = totalDailyCost * 330;
    document.getElementById('daily-total-cost').textContent = formatRupiah(totalDailyCost);
    document.getElementById('yearly-total-cost').textContent = formatRupiah(yearlyCost);
    
    // Update header
    document.getElementById('header-raw-cost').textContent = formatRupiah(totalDailyCost).replace('Rp ', '');
    
    // Update breakdown chart dan detail
    updateBreakdownDetails(categoryTotals, totalDailyCost);
    
    // Update analisis ekonomi
    updateEconomicAnalysis(totalDailyCost, yearlyCost);
}

// Filter tabel bahan baku berdasarkan kategori
function filterMaterialTable() {
    const filter = document.getElementById('material-filter').value;
    const rows = document.querySelectorAll('#raw-material-body tr');
    
    rows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Update breakdown details
function updateBreakdownDetails(categoryTotals, totalDailyCost) {
    const categories = [
        { id: 'gas', name: 'Gas & Udara', color: '#3b82f6' },
        { id: 'utility', name: 'Utilitas', color: '#10b981' },
        { id: 'chemical', name: 'Bahan Kimia', color: '#f59e0b' },
        { id: 'catalyst', name: 'Katalis', color: '#8b5cf6' }
    ];
    
    let detailHtml = '';
    let totalPercentage = 0;
    
    categories.forEach((cat, index) => {
        const cost = categoryTotals[cat.id] || 0;
        const percentage = totalDailyCost > 0 ? (cost / totalDailyCost * 100) : 0;
        totalPercentage += percentage;
        
        detailHtml += `
            <div class="detail-item">
                <div class="detail-name">${cat.name}</div>
                <div class="detail-percentage">${percentage.toFixed(1)}%</div>
                <div class="detail-cost">${formatRupiah(cost)}/hari</div>
            </div>
        `;
        
        // Update pie chart segment
        const segment = document.querySelector(`.pie-segment:nth-child(${index + 1})`);
        if (segment) {
            segment.style.setProperty('--percentage', percentage);
            segment.style.setProperty('--color', cat.color);
        }
        
        // Update legend
        const legendItem = document.querySelector(`.legend-item:nth-child(${index + 1}) .legend-label`);
        if (legendItem) {
            legendItem.textContent = `${cat.name} (${percentage.toFixed(1)}%)`;
        }
    });
    
    document.getElementById('material-detail-list').innerHTML = detailHtml;
}

// Update analisis ekonomi
function updateEconomicAnalysis(dailyRawMaterialCost, yearlyRawMaterialCost) {
    const totalMachineCost = calculateTotalMachineCost();
    const avgEfficiency = calculateAverageEfficiency();
    
    // Update tabel peralatan
    updateEquipmentTable(totalMachineCost);
    
    // Hitung biaya produksi tahunan baru
    const annualRawMaterialCost = yearlyRawMaterialCost;
    const otherCosts = 450000000000; // Biaya tetap lainnya
    const annualProductionCost = annualRawMaterialCost + otherCosts;
    
    // Hitung profitabilitas baru
    const annualRevenue = 1848000000000; // Tetap
    const annualGrossProfit = annualRevenue - annualProductionCost;
    const tax = annualGrossProfit * 0.25;
    const netProfit = annualGrossProfit - tax;
    
    // Update nilai
    document.getElementById('annual-production-cost').textContent = formatRupiah(annualProductionCost);
    document.getElementById('annual-gross-profit').textContent = formatRupiah(annualGrossProfit);
    
    // Hitung Payback Period (disederhanakan)
    const fci = 1622740000000; // Tetap
    const depreciation = totalMachineCost * 0.1;
    const paybackPeriod = fci / (netProfit + depreciation);
    
    document.getElementById('payback-period').textContent = `${paybackPeriod.toFixed(2)} Tahun`;
    
    // Update BEP berdasarkan efisiensi
    const bepPercentage = 44.3 * (100 / avgEfficiency);
    const bepValue = Math.min(bepPercentage, 100).toFixed(1);
    document.getElementById('bep-value').textContent = `${bepValue}% Kapasitas`;
}

// Update tabel peralatan
function updateEquipmentTable(totalMachineCost) {
    let equipmentTable = `
        <thead>
            <tr>
                <th>Kode</th>
                <th>Peralatan</th>
                <th>Jumlah</th>
                <th>Harga/Unit (Rp)</th>
                <th>Total (Rp)</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    let totalEquipmentCost = 0;
    
    equipmentData.forEach(equipment => {
        const total = equipment.unitPrice * equipment.qty;
        totalEquipmentCost += total;
        
        equipmentTable += `
            <tr>
                <td>${equipment.code}</td>
                <td>${equipment.name}</td>
                <td>${equipment.qty}</td>
                <td>${formatRupiah(equipment.unitPrice)}</td>
                <td>${formatRupiah(total)}</td>
            </tr>
        `;
    });
    
    equipmentTable += `
        <tr class="total-row">
            <td colspan="4"><strong>TOTAL PERALATAN UTAMA (E)</strong></td>
            <td><strong>${formatRupiah(totalEquipmentCost)}</strong></td>
        </tr>
    </tbody>`;
    
    const equipmentTableElement = document.getElementById('equipment-table');
    if (equipmentTableElement) {
        equipmentTableElement.innerHTML = equipmentTable;
    }
}

// Update semua perhitungan
function updateAllCalculations() {
    updateMachineSummary();
    updateRawMaterialCalculation();
}

// ===== SCROLL SPY NAVIGATION =====

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Fungsi untuk update active link
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Event listener untuk scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Event listener untuk klik nav link
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
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Panggil sekali di awal
    updateActiveLink();
}

// ===== BACK TO TOP BUTTON =====

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Amonia Plant Simulation v2.1 loaded');
    
    // Initialize semua mesin ke standard
    for (let i = 1; i <= 5; i++) {
        updateMachine(i);
    }
    
    // Inisialisasi perhitungan
    updateAllCalculations();
    
    // Inisialisasi scroll spy
    initScrollSpy();
    
    // Inisialisasi back to top button
    initBackToTop();
    
    // Tambahkan animasi untuk process sections
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
    
    const sections = document.querySelectorAll('.process-section, .machine-summary-section, .raw-material-section, .economics-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Simulasi loading selesai
    setTimeout(() => {
        console.log('Semua perhitungan selesai!');
    }, 1000);
});