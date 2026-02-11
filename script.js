// ===== GLOBAL VARIABLES & DATA =====
const machinesData = {
    machine1: { // Desulfurisasi
        basic: { name: "Desulfurizer Basic", price: 2400000000, efficiency: 85, yield: 98, code: "R-101B", energy: 5000 },
        standard: { name: "Desulfurizer Standard", price: 3800000000, efficiency: 92, yield: 99, code: "R-101S", energy: 4500 },
        premium: { name: "Desulfurizer Premium", price: 5200000000, efficiency: 98, yield: 99.5, code: "R-101P", energy: 4000 }
    },
    machine2: { // Steam Reforming
        basic: { name: "Reformer Furnace Basic", price: 115000000000, efficiency: 80, yield: 88, code: "F-101B", energy: 35000 },
        standard: { name: "Reformer Furnace Standard", price: 136000000000, efficiency: 88, yield: 92, code: "F-101S", energy: 30000 },
        premium: { name: "Reformer Furnace Premium", price: 165000000000, efficiency: 95, yield: 96, code: "F-101P", energy: 25000 }
    },
    machine3: { // Shift Conversion
        basic: { name: "Shift Reactor Basic", price: 40000000000, efficiency: 85, yield: 92, code: "R-201B", energy: 15000 },
        standard: { name: "Shift Reactor Standard", price: 48000000000, efficiency: 92, yield: 95, code: "R-201S", energy: 12000 },
        premium: { name: "Shift Reactor Premium", price: 58000000000, efficiency: 97, yield: 98, code: "R-201P", energy: 10000 }
    },
    machine4: { // CO₂ Removal
        basic: { name: "CO₂ Removal Basic", price: 72000000000, efficiency: 90, yield: 95, code: "C-101B", energy: 28000 },
        standard: { name: "CO₂ Removal Standard", price: 85000000000, efficiency: 96, yield: 98, code: "C-101S", energy: 25000 },
        premium: { name: "CO₂ Removal Premium", price: 100000000000, efficiency: 99, yield: 99.5, code: "C-101P", energy: 22000 }
    },
    machine5: { // Ammonia Synthesis
        basic: { name: "Ammonia Reactor Basic", price: 60000000000, efficiency: 15, yield: 96, code: "R-301B", energy: 50000 },
        standard: { name: "Ammonia Reactor Standard", price: 72000000000, efficiency: 20, yield: 98, code: "R-301S", energy: 45000 },
        premium: { name: "Ammonia Reactor Premium", price: 88000000000, efficiency: 25, yield: 99, code: "R-301P", energy: 40000 }
    }
};

// ===== DATA BAHAN BAKU & UTILITAS (VERSI KOREKSI - REALISTIS) =====
const rawMaterialData = [
    // --- BAHAN BAKU UTAMA ---
    { id: "natural_gas", name: "Gas Alam (Feed + Fuel)", category: "gas", unit: "MMBTU", 
      theoreticalNeed: 30000, unitPrice: 96000, source: "ESDM 2024" },
    { id: "zno", name: "Zinc Oxide (ZnO)", category: "chemical", unit: "kg", 
      theoreticalNeed: 147.4, unitPrice: 85000, source: "Supplier" },
    { id: "mea", name: "Monoethanolamine (MEA)", category: "chemical", unit: "kg", 
      theoreticalNeed: 50, unitPrice: 30000, source: "Kimia" },
    
    // --- KATALIS (MAKE-UP) ---
    { id: "catalyst_nickel", name: "Katalis Nikel (Reforming)", category: "catalyst", unit: "kg", 
      theoreticalNeed: 0.05, unitPrice: 1200000, source: "Antam" },
    { id: "catalyst_iron", name: "Katalis Besi (Haber-Bosch)", category: "catalyst", unit: "kg", 
      theoreticalNeed: 0.03, unitPrice: 800000, source: "Supplier" },
    { id: "catalyst_shift", name: "Katalis Shift (Fe-Cr)", category: "catalyst", unit: "kg", 
      theoreticalNeed: 0.02, unitPrice: 600000, source: "Supplier" },
    
    // ===== UTILITAS - DIKOREKSI KE ANGKA REALISTIS =====
    // --- LISTRIK (Berdasarkan data vendor: 36 MW = 864.000 kWh/hari) ---
    { id: "electricity", name: "Listrik Industri", category: "utility", unit: "kWh", 
      theoreticalNeed: 864000, unitPrice: 1500, source: "Vendor Data (36 MW)" },
    
    // --- AIR (Berdasarkan referensi pabrik Kujang & UII) ---
    { id: "process_water", name: "Air Demineralisasi (Boiler)", category: "utility", unit: "m³", 
      theoreticalNeed: 2800, unitPrice: 8000, source: "Water Treatment" },
    { id: "cooling_water", name: "Air Pendingin (Make-up)", category: "utility", unit: "m³", 
      theoreticalNeed: 12000, unitPrice: 2000, source: "Cooling Tower" }, // Diturunkan!
    { id: "boiler_feed", name: "Air Boiler (Make-up)", category: "utility", unit: "m³", 
      theoreticalNeed: 800, unitPrice: 5000, source: "Demin Plant" },
    
    // --- UDARA INSTRUMEN ---
    { id: "instrument_air", name: "Udara Instrument", category: "utility", unit: "Nm³", 
      theoreticalNeed: 25000, unitPrice: 500, source: "Air Compressor" }
];

// Data peralatan utama (E)
const equipmentData = [
    { code: "R-101", name: "Desulfurizer Vessel", qty: 1, unitPrice: 3800000000 },
    { code: "F-101", name: "Steam Reformer Furnace", qty: 1, unitPrice: 136000000000 },
    { code: "C-101", name: "Syngas Compressor", qty: 1, unitPrice: 51200000000 },
    { code: "R-201", name: "Shift Reactor (HT + LT)", qty: 2, unitPrice: 24000000000 },
    { code: "C-201", name: "CO₂ Removal Unit", qty: 1, unitPrice: 85000000000 },
    { code: "R-301", name: "Ammonia Synthesis Reactor", qty: 1, unitPrice: 72000000000 },
    { code: "C-301", name: "Ammonia Compressor", qty: 1, unitPrice: 98000000000 },
    { code: "D-301", name: "Refrigeration System", qty: 2, unitPrice: 24000000000 },
    { code: "HE-101", name: "Heat Exchangers (Total)", qty: 12, unitPrice: 3500000000 },
    { code: "P-101", name: "Pumps & Motors", qty: 20, unitPrice: 500000000 },
    { code: "TK-101", name: "Storage Tanks (NH3)", qty: 2, unitPrice: 24000000000 },
    { code: "TK-102", name: "Storage Tanks (Feed)", qty: 2, unitPrice: 8000000000 }
];

// ===== KONSTANTA EKONOMI (HARGA PASAR REAL 2026) =====
const SELLING_PRICE = 8500000;        // Rp 8.500.000/ton (berdasarkan CFR India/Far East)
const UTILITIES_COST_FIXED = 0;       // Tidak dipakai lagi - utilitas sudah dihitung per unit
const PACKAGING_COST = 16000000000;   // Rp 16 M/tahun (tetap)

// ===== UTILITY FUNCTIONS =====
function formatRupiah(amount) {
    if (amount >= 1e12) return `Rp ${(amount / 1e12).toFixed(2)} T`;
    if (amount >= 1e9) return `Rp ${(amount / 1e9).toFixed(2)} M`;
    if (amount >= 1e6) return `Rp ${(amount / 1e6).toFixed(1)} jt`;
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

function formatNumber(num, decimals = 0) {
    return num.toLocaleString('id-ID', { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
    });
}

// ===== PERHITUNGAN UTAMA =====
function calculateTotalMachineCost() {
    let total = 0;
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (select) total += machinesData[`machine${i}`][select.value].price;
    }
    return total;
}

function calculateAverageEfficiency() {
    let total = 0, count = 0;
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (select) { 
            total += machinesData[`machine${i}`][select.value].efficiency; 
            count++; 
        }
    }
    return count > 0 ? total / count : 77.6; // default standard semua
}

function calculateInvestment(E) {
    // Direct Cost - Upper limit pabrik tekanan tinggi
    const dc = {
        installation: 0.40,
        instrumentation: 0.25,
        piping: 0.50,
        electrical: 0.12,
        buildings: 0.15,
        land: 0.08,
        utilities: 0.40
    };
    const sumDC = Object.values(dc).reduce((a,b) => a + b, 0);
    const DC = E * (1 + sumDC);
    
    // Indirect Cost - Ikuti PDF (60% dari DC)
    const ic = {
        engineering: 0.15,
        construction: 0.15,
        legal: 0.05,
        contractor: 0.10,
        contingency: 0.15
    };
    const sumIC = Object.values(ic).reduce((a,b) => a + b, 0);
    const IC = DC * sumIC;
    
    const FCI = DC + IC;
    const TCI = FCI / 0.85; // WC = 15% TCI
    const WC = TCI - FCI;
    
    return { DC, IC, FCI, WC, TCI };
}

// ===== UPDATE FUNCTIONS =====
function updateMachine(processNumber) {
    const select = document.getElementById(`machine${processNumber}`);
    if (!select) return;
    const machine = machinesData[`machine${processNumber}`][select.value];
    if (!machine) return;
    
    const setText = (id, val) => { 
        const el = document.getElementById(id); 
        if (el) el.textContent = val; 
    };
    
    setText(`machine${processNumber}-name`, machine.name);
    setText(`machine${processNumber}-price`, formatRupiah(machine.price));
    setText(`machine${processNumber}-efficiency`, `${machine.efficiency}%`);
    setText(`machine${processNumber}-yield`, `${machine.yield}%`);
    
    switch(processNumber) {
        case 1: 
            const znNeed = (147.4 * (100 / machine.efficiency)).toFixed(1);
            setText('machine1-znoneed', `${znNeed} kg/hari`); 
            break;
        case 2:
            const ch4Need = (470588 * (100 / machine.efficiency)).toFixed(0);
            setText('machine2-ch4need', `${formatNumber(ch4Need)} kg/hari`); 
            break;
        case 3:
            const energy3 = (15000 * (100 / machine.efficiency)).toFixed(0);
            setText('machine3-energy', `${formatNumber(energy3)} kWh/hari`); 
            break;
        case 4:
            const energy4 = (25000 * (100 / machine.efficiency)).toFixed(0);
            setText('machine4-energy', `${formatNumber(energy4)} kWh/hari`); 
            break;
        case 5:
            const energy5 = (45000 * (100 / machine.efficiency)).toFixed(0);
            setText('machine5-energy', `${formatNumber(energy5)} kWh/hari`); 
            break;
    }
}

function updateMachineSummary() {
    const summaryGrid = document.getElementById('machine-summary-grid');
    if (!summaryGrid) return;
    
    let html = '';
    let totalCost = 0, totalEfficiency = 0;
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
        const machine = machinesData[`machine${i}`][select.value];
        totalCost += machine.price;
        totalEfficiency += machine.efficiency;
        
        html += `<div class="summary-card">
            <div class="summary-card-header">
                <div class="summary-card-title">${processNames[i]}</div>
                <select class="summary-card-select" onchange="setMachine(${i}, this.value); updateAllCalculations();">
                    <option value="basic" ${select.value === 'basic' ? 'selected' : ''}>Basic</option>
                    <option value="standard" ${select.value === 'standard' ? 'selected' : ''}>Standard</option>
                    <option value="premium" ${select.value === 'premium' ? 'selected' : ''}>Premium</option>
                </select>
            </div>
            <div class="summary-card-details">
                <div class="detail-label">Mesin:</div> <div class="detail-value">${machine.name}</div>
                <div class="detail-label">Kode:</div> <div class="detail-value">${machine.code}</div>
                <div class="detail-label">Harga:</div> <div class="detail-value">${formatRupiah(machine.price)}</div>
                <div class="detail-label">Efisiensi:</div> <div class="detail-value">${machine.efficiency}%</div>
                <div class="detail-label">Yield:</div> <div class="detail-value">${machine.yield}%</div>
            </div>
        </div>`;
    }
    summaryGrid.innerHTML = html;
    
    const avgEff = totalEfficiency / 5;
    document.getElementById('total-machine-cost').textContent = formatRupiah(totalCost);
    document.getElementById('average-efficiency').textContent = `${avgEff.toFixed(1)}%`;
    document.getElementById('correction-factor').textContent = `${(100/avgEff).toFixed(3)}x`;
    document.getElementById('header-efficiency').textContent = avgEff.toFixed(1);
}

function setMachine(processNumber, value) {
    const select = document.getElementById(`machine${processNumber}`);
    if (select) { 
        select.value = value; 
        updateMachine(processNumber); 
    }
}

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

// Variabel global biaya bahan baku
let lastDailyCost = 0;
let lastYearlyCost = 0;

function updateRawMaterialCalculation() {
    const avgEff = calculateAverageEfficiency();
    const correctionFactor = 100 / avgEff;
    
    document.getElementById('current-efficiency-display').textContent = `${avgEff.toFixed(1)}%`;
    document.getElementById('current-correction-display').textContent = `${correctionFactor.toFixed(3)}x`;
    document.getElementById('current-extra-percent').textContent = `${((correctionFactor-1)*100).toFixed(1)}%`;
    
    let totalDailyCost = 0;
    const categoryTotals = { gas:0, chemical:0, catalyst:0, utility:0 };
    const categoryNames = { 
        gas:'Gas Alam', 
        chemical:'Bahan Kimia', 
        catalyst:'Katalis',
        utility:'Utilitas'
    };
    
    let tableBody = '';
    rawMaterialData.forEach(m => {
        const actual = m.theoreticalNeed * correctionFactor;
        const daily = actual * m.unitPrice;
        totalDailyCost += daily;
        categoryTotals[m.category] = (categoryTotals[m.category] || 0) + daily;
        
        tableBody += `<tr data-category="${m.category}">
            <td>${m.name}</td>
            <td><span class="category-badge category-${m.category}">${categoryNames[m.category]}</span></td>
            <td>${formatNumber(m.theoreticalNeed,1)} ${m.unit}</td>
            <td>${correctionFactor.toFixed(3)}x</td>
            <td>${formatNumber(actual,1)} ${m.unit}</td>
            <td>${formatRupiah(m.unitPrice)}/${m.unit}</td>
            <td>${formatRupiah(daily)}</td>
            <td>${formatRupiah(daily * 330)}</td>
        </tr>`;
    });
    document.getElementById('raw-material-body').innerHTML = tableBody;
    
    lastDailyCost = totalDailyCost;
    lastYearlyCost = totalDailyCost * 330;
    
    document.getElementById('daily-total-cost').textContent = formatRupiah(totalDailyCost);
    document.getElementById('yearly-total-cost').textContent = formatRupiah(lastYearlyCost);
    document.getElementById('header-raw-cost').textContent = formatRupiah(totalDailyCost).replace('Rp ', '');
    
    updateBreakdownDetails(categoryTotals, totalDailyCost);
    updateEconomicAnalysis();
}

function updateBreakdownDetails(categoryTotals, totalDailyCost) {
    const categories = [
        { id:'gas', name:'Gas Alam', color:'#3b82f6' },
        { id:'utility', name:'Utilitas', color:'#10b981' },
        { id:'chemical', name:'Bahan Kimia', color:'#f59e0b' },
        { id:'catalyst', name:'Katalis', color:'#8b5cf6' }
    ];
    
    let gradient = '', cum = 0;
    const percentages = [];
    
    categories.forEach(cat => {
        const cost = categoryTotals[cat.id] || 0;
        const pct = totalDailyCost > 0 ? (cost / totalDailyCost * 100) : 0;
        percentages.push(pct);
        gradient += `${cat.color} ${cum}% ${cum + pct}%, `;
        cum += pct;
    });
    
    const pie = document.getElementById('pieChartVisual');
    if (pie) pie.style.background = `conic-gradient(${gradient.slice(0,-2)})`;
    
    const legend = document.querySelector('.pie-legend');
    if (legend) {
        legend.innerHTML = categories.map((c,i) => 
            `<div class="legend-item">
                <span class="legend-color" style="background:${c.color};"></span>
                <span class="legend-label">${c.name} (${percentages[i].toFixed(1)}%)</span>
            </div>`
        ).join('');
    }
    
    const detailList = document.getElementById('material-detail-list');
    if (detailList) {
        detailList.innerHTML = categories.map(c => {
            const cost = categoryTotals[c.id] || 0;
            const pct = totalDailyCost > 0 ? (cost / totalDailyCost * 100) : 0;
            return `<div class="detail-item">
                <div class="detail-name">${c.name}</div>
                <div class="detail-percentage">${pct.toFixed(1)}%</div>
                <div class="detail-cost">${formatRupiah(cost)}/hari</div>
            </div>`;
        }).join('');
    }
}

function updateEconomicAnalysis() {
    const E = calculateTotalMachineCost();
    const inv = calculateInvestment(E);
    
    // Biaya bahan baku & utilitas tahunan (dari tabel)
    const yearlyRawMaterial = lastDailyCost * 330;
    
    // Biaya tetap lainnya
    const packagingCost = PACKAGING_COST;
    
    // Variable Cost = Bahan Baku + Utilitas + Packaging
    const VC = yearlyRawMaterial + packagingCost;
    
    // Fixed Cost
    const maintenance = 0.05 * inv.FCI;
    const labor = 32000000000;
    const lab = 0.1 * labor;
    const overhead = 0.5 * labor;
    const insurance = 0.02 * inv.FCI;
    const depreciation = 0.10 * E;
    const FC = maintenance + labor + lab + overhead + insurance + depreciation;
    
    // Revenue & Profit
    const annualRevenue = 330000 * SELLING_PRICE;
    const annualProductionCost = VC + FC;
    const annualGrossProfit = annualRevenue - annualProductionCost;
    const tax = annualGrossProfit * 0.25;
    const netProfit = annualGrossProfit - tax;
    
    // Payback Period
    const paybackPeriod = inv.FCI / (netProfit + depreciation);
    
    // Break Even Point
    const variableCostPerTon = VC / 330000;
    const BEP_ton = FC / (SELLING_PRICE - variableCostPerTon);
    const BEP_percent = (BEP_ton / 330000) * 100;
    
    // Update DOM
    document.getElementById('fci-value').textContent = formatRupiah(inv.FCI);
    document.getElementById('wc-value').textContent = formatRupiah(inv.WC);
    document.getElementById('tci-value').textContent = formatRupiah(inv.TCI);
    document.getElementById('annual-production-cost').textContent = formatRupiah(annualProductionCost);
    document.getElementById('annual-gross-profit').textContent = formatRupiah(annualGrossProfit);
    document.getElementById('payback-period').textContent = `${paybackPeriod.toFixed(2)} Tahun`;
    document.getElementById('bep-value').innerHTML = `${BEP_percent.toFixed(1)}% Kapasitas<br><small>${formatNumber(BEP_ton, 0)} ton/tahun</small>`;
    document.getElementById('annual-revenue').textContent = formatRupiah(annualRevenue);
}

function updateEquipmentTable() {
    let rows = '';
    let total = 0;
    equipmentData.forEach(eq => {
        const t = eq.unitPrice * eq.qty;
        total += t;
        rows += `<tr>
            <td>${eq.code}</td>
            <td>${eq.name}</td>
            <td>${eq.qty}</td>
            <td>${formatRupiah(eq.unitPrice)}</td>
            <td>${formatRupiah(t)}</td>
        </tr>`;
    });
    rows += `<tr class="total-row">
        <td colspan="4"><strong>TOTAL PERALATAN UTAMA (E)</strong></td>
        <td><strong>${formatRupiah(total)}</strong></td>
    </tr>`;
    
    const tbl = document.getElementById('equipment-table');
    if (tbl) tbl.innerHTML = rows;
}

function updateAllCalculations() {
    updateMachineSummary();
    updateRawMaterialCalculation();
    updateEquipmentTable();
}

// ===== SCROLL SPY (INTERSECTION OBSERVER) =====
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function removeActive() {
        navLinks.forEach(link => link.classList.remove('active'));
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeActive();
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '-80px 0px -100px 0px',
        threshold: 0.1
    });
    
    sections.forEach(section => observer.observe(section));
    
    // Klik smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                removeActive();
                this.classList.add('active');
                const yOffset = -80;
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
    
    // Set active awal
    setTimeout(() => {
        if (sections.length > 0) {
            const firstId = sections[0].getAttribute('id');
            const firstLink = document.querySelector(`.nav-link[href="#${firstId}"]`);
            if (firstLink) firstLink.classList.add('active');
        }
    }, 100);
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FILTER TABEL =====
function filterMaterialTable() {
    const filter = document.getElementById('material-filter').value;
    document.querySelectorAll('#raw-material-body tr').forEach(row => {
        row.style.display = (filter === 'all' || row.getAttribute('data-category') === filter) ? '' : 'none';
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== PABRIK AMONIA 1000 MTPD ===');
    console.log('✅ Versi Final - Data Realistis (Air & Listrik DIKEMBALIKAN)');
    console.log('✅ Harga Jual: Rp 8.500.000/ton (Pasar 2026)');
    
    // Set default semua mesin ke standard
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`machine${i}`);
        if (select) {
            select.value = 'standard';
            updateMachine(i);
        }
    }
    
    updateAllCalculations();
    initScrollSpy();
    initBackToTop();
    
    // Animasi scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { 
            if (e.isIntersecting) { 
                e.target.style.opacity = '1'; 
                e.target.style.transform = 'translateY(0)'; 
            } 
        });
    }, observerOptions);
    
    document.querySelectorAll('.process-section, .machine-summary-section, .raw-material-section, .economics-section').forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(s);
    });
    
    // Export filter function ke global
    window.filterMaterialTable = filterMaterialTable;
});
