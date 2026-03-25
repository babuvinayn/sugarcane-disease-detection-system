document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImgBtn = document.getElementById('removeImgBtn');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    
    const confSlider = document.getElementById('confSlider');
    const confValueDisplay = document.getElementById('confValueDisplay');
    const modelSelect = document.getElementById('modelSelect');
    const analyzeBtn = document.getElementById('analyzeBtn');

    const historyDashboard = document.getElementById('historyDashboard');
    const historyTableBody = document.getElementById('historyTableBody');
    const historyEmptyState = document.getElementById('historyEmptyState');

    // UI States
    const emptyState = document.getElementById('emptyState');
    const loadingState = document.getElementById('loadingState');
    const resultsState = document.getElementById('resultsState');
    
    // Results Elements
    const resultOutputImage = document.getElementById('resultOutputImage');
    const statusMessage = document.getElementById('statusMessage');
    const statusBadge = document.getElementById('statusBadge');
    const findingsContainer = document.getElementById('findingsContainer');

    // Camera Elements
    const uploadModeBtn = document.getElementById('uploadModeBtn');
    const cameraModeBtn = document.getElementById('cameraModeBtn');
    const cameraState = document.getElementById('cameraState');
    const webcamVideo = document.getElementById('webcamVideo');
    const webcamOverlay = document.getElementById('webcamOverlay');
    const stopCameraBtn = document.getElementById('stopCameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    const liveDetectionCount = document.getElementById('liveDetectionCount');
    const liveFps = document.getElementById('liveFps');
    
    const errorBanner = document.getElementById('errorBanner');
    const errorMsgText = document.getElementById('errorMsgText');

    // Extra Features Elements
    const langToggle = document.getElementById('langToggle');
    const themeToggle = document.getElementById('themeToggle');
    const themeIconMoon = document.getElementById('themeIconMoon');
    const themeIconSun = document.getElementById('themeIconSun');
    
    // Comparison Slider Elements
    const comparisonSliderContainer = document.getElementById('comparisonSliderContainer');
    const compOverlay = document.getElementById('compOverlay');
    const compSliderHandle = document.getElementById('compSliderHandle');
    const compOriginal = document.getElementById('compOriginal');
    const compHeatmap = document.getElementById('compHeatmap');
    
    // Analytics
    const analyticsSection = document.getElementById('analyticsSection');
    
    let currentFile = null;
    let currentTranslations = {};
    let currentLang = localStorage.getItem('appLang') || 'en';
    let distChart = null;
    let timelineChart = null;
    let fullHistory = []; // Premium: Cache for local filtering

    // Sidebar Elements
    const activityFeed = document.getElementById('activity-feed');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherHum = document.getElementById('weather-humidity');
    const weatherRisk = document.getElementById('weather-risk');
    const historySearch = document.getElementById('historySearch');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const fieldTipsCard = document.getElementById('field-tips-card');
    const fieldTipsContent = document.getElementById('field-tips-content');

    // ----------------------------------------------------
    // PWA Service Worker Registration
    // ----------------------------------------------------
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/static/sw.js')
                .then(reg => console.log('Service Worker Registered'))
                .catch(err => console.error('SW Registration Failed:', err));
        });
    }

    // Initialize UI
    showState('empty');

    // Range slider value update binding
    confSlider.addEventListener('input', (e) => {
        confValueDisplay.textContent = parseFloat(e.target.value).toFixed(2);
    });

    // ----------------------------------------------------
    // ----------------------------------------------------
    // Drag and Drop Upload Handlers
    // ----------------------------------------------------
    
    dropZone.addEventListener("click", () => fileInput.click());

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add('border-primary', 'bg-gray-800/80');
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove('border-primary', 'bg-gray-800/80');
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-primary', 'bg-gray-800/80');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                currentFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    uploadPlaceholder.classList.add('hidden');
                    previewContainer.classList.remove('hidden');
                    analyzeBtn.disabled = false;

                    const overlayCanvas = document.getElementById('overlayCanvas');
                    if (overlayCanvas) {
                        const ctx = overlayCanvas.getContext('2d');
                        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                    }
                    
                    // Reset right panel if it was previously showing results from another file
                    showState('empty');
                    errorBanner.classList.add('hidden');
                };
                reader.readAsDataURL(file);
            } else {
                showError('Please upload a valid image file (PNG, JPG).');
            }
        }
    }

    removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent clicking dropzone backdrop
        currentFile = null;
        fileInput.value = '';
        imagePreview.src = '';
        
        const overlayCanvas = document.getElementById('overlayCanvas');
        if (overlayCanvas) {
            const ctx = overlayCanvas.getContext('2d');
            ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        }

        previewContainer.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
        analyzeBtn.disabled = true;
        showState('empty');
        errorBanner.classList.add('hidden');
    });

    // ----------------------------------------------------
    // Authentication Helpers
    // ----------------------------------------------------
    function getAuthHeaders() {
        const token = localStorage.getItem('token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    function checkAuth() {
        const token = localStorage.getItem('token');
        if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            window.location.href = '/login';
        }
    }

    checkAuth();

    // ----------------------------------------------------
    // Server API Communication
    // ----------------------------------------------------

    analyzeBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        errorBanner.classList.add('hidden');
        showState('loading');
        analyzeBtn.disabled = true;

        const formData = new FormData();
        formData.append('file', currentFile);
        formData.append('model_type', modelSelect.value);
        formData.append('conf_threshold', confSlider.value);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showState('results');
                renderResults(data);
                showToast('Analysis complete!', 'success');
                
                // Refresh SQLite History UI and Stats
                fetchHistory();
                fetchStats();

            } else {
                showToast('Analysis failed: ' + (data.error || 'Unknown error'), 'error');
                showState('empty');
            }
        } catch (error) {
            console.error('Error communicating with FastAPI server:', error);
            showToast('Network error: Could not reach the API.', 'error');
            showState('empty');
        } finally {
            analyzeBtn.disabled = false;
        }
    });

    // ----------------------------------------------------
    // UI Render Utilities
    // ----------------------------------------------------

    function showError(msg) {
        errorMsgText.textContent = msg;
        errorBanner.classList.remove('hidden');
    }

    // Toast Notification System
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const colors = {
            success: 'border-primary bg-primary/10 text-primary',
            error: 'border-red-500 bg-red-500/10 text-red-400',
            warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
            info: 'border-blue-500 bg-blue-500/10 text-blue-400'
        };
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.className = `flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-md shadow-2xl text-sm font-medium ${colors[type] || colors.info} animate-slide-in-right`;
        toast.innerHTML = `
            <span class="text-lg">${icons[type] || icons.info}</span>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.4s ease-out';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    function showState(state) {
        emptyState.classList.add('hidden');
        loadingState.classList.add('hidden');
        resultsState.classList.add('hidden');

        if (state === 'empty') emptyState.classList.remove('hidden');
        if (state === 'loading') loadingState.classList.remove('hidden');
        if (state === 'results') {
            resultsState.classList.remove('hidden');
            resultsState.classList.remove('result-card-enter'); // reset animation
            void resultsState.offsetWidth; // trigger reflow
            resultsState.classList.add('result-card-enter'); // apply animation
        }
    }

    function renderResults(data) {
        const analysis = data.analysis;
        
        // 1. Result Image Overlay
        resultOutputImage.src = data.image;

        // Update New Granular Metrics
        if (analysis.health_index !== undefined) {
            const hiVal = document.getElementById('healthIndexValue');
            const hiBar = document.getElementById('healthIndexBar');
            if (hiVal) hiVal.textContent = analysis.health_index + '%';
            if (hiBar) hiBar.style.width = analysis.health_index + '%';
            
            // Adjust bar color based on index
            if (hiBar) {
                if (analysis.health_index > 80) hiBar.className = 'h-full bg-primary transition-all duration-1000 ease-out';
                else if (analysis.health_index > 50) hiBar.className = 'h-full bg-yellow-500 transition-all duration-1000 ease-out';
                else hiBar.className = 'h-full bg-red-500 transition-all duration-1000 ease-out';
            }
        }

        if (analysis.area_affected_pct !== undefined) {
            const aaVal = document.getElementById('affectedAreaValue');
            const aaBar = document.getElementById('affectedAreaBar');
            if (aaVal) aaVal.textContent = analysis.area_affected_pct + '%';
            if (aaBar) aaBar.style.width = analysis.area_affected_pct + '%';
        }
        
        const resultHeatmapImage = document.getElementById('resultHeatmapImage');
        if (resultHeatmapImage && data.heatmap) {
            resultHeatmapImage.src = data.heatmap;
        }

        // Draw bounding boxes natively onto dynamic overlayCanvas on the left panel preview
        const overlayCanvas = document.getElementById('overlayCanvas');
        if (overlayCanvas) {
            const ctx = overlayCanvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                overlayCanvas.width = img.width;
                overlayCanvas.height = img.height;
                ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = data.image;
        }

        // 2. Status Header and Badges
        statusMessage.textContent = analysis.message;
        
        let badgeColor = 'bg-green-500/20 text-green-400 border-green-500/30';
        let badgeText = 'HEALTHY';
        
        if (analysis.status === 'warning') {
            badgeColor = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            badgeText = 'WARNING';
        } else if (analysis.status === 'critical') {
            badgeColor = 'bg-red-500/20 text-red-500 border-red-500/30';
            badgeText = 'CRITICAL';
        }

        statusBadge.className = `px-4 py-1.5 rounded-full text-xs font-bold border ${badgeColor}`;
        statusBadge.textContent = badgeText;

        // 3. Render Findings (Cards)
        findingsContainer.innerHTML = '';
        if (analysis.detections.length === 0) {
            findingsContainer.innerHTML = `
                <div class="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-green-500/20 flex flex-shrink-0 items-center justify-center text-green-400 text-xl font-bold">✓</div>
                    <div>
                        <h4 class="font-medium text-green-400 text-sm">No pathogons or issues detected</h4>
                        <p class="text-xs text-gray-400 mt-1">The crop leaf appears to be entirely healthy based on the visual input.</p>
                    </div>
                </div>
            `;
        } else {
            analysis.detections.forEach(det => {
                const confVal = parseFloat(det.confidence);
                let confColorClass = 'text-green-400';
                if (confVal < 60) confColorClass = 'text-yellow-400';
                if (confVal < 40) confColorClass = 'text-red-400';

                // We get the class name from Pydantic which is safely under `class` due to alias, but also check `cls_name` backward compatibility.
                const className = det.class || det.cls_name || 'finding';

                // Re-calculate inline styles nicely based on provided hex colors
                const colorHex = det.color || '#6b7280';
                const styleAvatar = `color: ${colorHex}; background-color: ${colorHex}20; border: 1px solid ${colorHex}40`;

                findingsContainer.innerHTML += `
                    <div class="p-4 bg-gray-800/40 border border-gray-700 rounded-xl hover:bg-gray-800/80 transition-colors">
                        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div class="flex items-center gap-4 flex-1">
                                <div class="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-lg font-bold" style="${styleAvatar}">
                                    ${det.icon}
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-200 capitalize text-base">${className}</h4>
                                    <p class="text-xs text-gray-400 mt-0.5 line-clamp-1">${det.description}</p>
                                </div>
                            </div>
                            <!-- Right Column Metadata -->
                            <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-2 sm:gap-1 mt-2 sm:mt-0 pl-16 sm:pl-0">
                                <div class="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900/50 px-2 py-1 rounded-md">
                                    Count: <span class="text-gray-200 font-bold">${det.count}</span>
                                </div>
                                <div class="flex items-center gap-1.5 text-xs text-gray-400 px-2 py-1 rounded-md">
                                    Conf: <span class="font-mono font-bold ${confColorClass}">${det.confidence}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        const treatmentsList = document.getElementById('treatmentsList');
        const preventionsList = document.getElementById('preventionsList');
        
        // 4. Render Actionable Recommendations (Treatments & Preventions)
        treatmentsList.innerHTML = '';
        analysis.treatments.forEach(t => {
            const li = document.createElement('li');
            li.textContent = t;
            treatmentsList.appendChild(li);
        });
        
        preventionsList.innerHTML = '';
        analysis.preventions.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p;
            preventionsList.appendChild(li);
        });

        // 5. Update Severity Gauge
        const maxConf = analysis.detections.length > 0 
            ? Math.max(...analysis.detections.map(d => d.confidence)) 
            : 100;
        updateSeverityGauge(maxConf, analysis.status);

        // 6. Confetti on Healthy!
        if (analysis.status === 'healthy') {
            setTimeout(() => triggerConfetti(), 300);
        }

        // 7. Update Side-by-Side Comparison
        if (data.heatmap) {
            comparisonSliderContainer.classList.remove('hidden');
            compOriginal.src = data.image;
            compHeatmap.src = data.heatmap;
        } else {
            comparisonSliderContainer.classList.add('hidden');
        }

        // 8. Update Field Tips
        updateFieldTips(analysis);

        // 9. Show Download Button
        const downloadReportBtn = document.getElementById('downloadReportBtn');
        if (downloadReportBtn && data.scan_id) {
            downloadReportBtn.classList.remove('hidden');
            downloadReportBtn.onclick = () => {
                window.location.href = `/api/report/${data.scan_id}`;
            };
        } else if (downloadReportBtn) {
            downloadReportBtn.classList.add('hidden');
        }

        // 10. Refresh Analytics
        initAnalytics();
    }

    // ----------------------------------------------------
    // SQLite Database History Loaders
    // ----------------------------------------------------
    async function fetchHistory() {
        try {
            const res = await fetch('/api/history', {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            
            if (data.success && data.history) {
                fullHistory = data.history; 
                renderHistoryTable(fullHistory);
                updateActivityFeed(fullHistory);
            }
        } catch (err) {
            console.error("Failed to fetch history:", err);
        }
    }

    function renderHistoryTable(historyItems) {
        historyDashboard.classList.remove('hidden');
        historyTableBody.innerHTML = '';
        
        if (historyItems.length === 0) {
            historyEmptyState.classList.remove('hidden');
        } else {
            historyEmptyState.classList.add('hidden');
            
            historyItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-gray-800/40 transition-colors duration-150";
                
                const dateRaw = new Date(item.timestamp);
                const dateStr = dateRaw.toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                });

                // Style based on severity equivalent (Disease = Red, Insect = Amber, Healthy = Green)
                let badgeClass = "bg-primary/20 text-primary border-primary/30";
                if(item.disease === 'disease') badgeClass = "bg-red-500/20 text-red-500 border-red-500/30";
                if(item.disease === 'insect') badgeClass = "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";

                tr.innerHTML = `
                    <td class="py-3 pl-4">
                        <div class="group relative h-10 w-10">
                            <img src="${item.image}" class="h-full w-full object-cover rounded border border-gray-700 shadow-sm transition-transform group-hover:scale-110" alt="scan record">
                        </div>
                    </td>
                    <td class="py-3 font-medium">
                        <span class="px-2.5 py-1 text-[10px] rounded border ${badgeClass} uppercase tracking-tight font-bold">
                            ${item.disease}
                        </span>
                    </td>
                    <td class="py-3 text-gray-300 font-mono text-xs">
                        ${(item.confidence || 0).toFixed(1)}%
                    </td>
                    <td class="py-3 text-gray-500 text-xs">
                        ${dateStr}
                    </td>
                    <td class="py-3 pr-4 text-right">
                        <button class="view-report-btn p-1.5 hover:bg-primary/20 hover:text-primary rounded-lg transition-all" data-id="${item.id}" title="View Report">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                    </td>
                `;
                
                tr.querySelector('.view-report-btn').addEventListener('click', () => {
                   // Premium: Expand logic for report viewing could go here
                   showState('results');
                   window.scrollTo({ top: 300, behavior: 'smooth' });
                });

                historyTableBody.appendChild(tr);
            });
        }
    }

    // ----------------------------------------------------
    // Premium: History Search & CSV Export
    // ----------------------------------------------------
    if (historySearch) {
        historySearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = fullHistory.filter(item => 
                item.disease.toLowerCase().includes(query) || 
                new Date(item.timestamp).toLocaleString().toLowerCase().includes(query)
            );
            renderHistoryTable(filtered);
        });
    }

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            if (fullHistory.length === 0) return;
            
            const headers = ["ID", "Disease", "Confidence", "Timestamp"];
            const rows = fullHistory.map(item => [
                item.id,
                item.disease,
                item.confidence.toFixed(2) + "%",
                new Date(item.timestamp).toISOString()
            ]);
            
            let csvContent = "data:text/csv;charset=utf-8," 
                + headers.join(",") + "\n"
                + rows.map(e => e.join(",")).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `cropscan_history_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ----------------------------------------------------
    // Premium: Field Recommendations Logic
    // ----------------------------------------------------
    function updateFieldTips(analysis) {
        if (!fieldTipsCard || !fieldTipsContent) return;
        
        fieldTipsCard.classList.remove('hidden');
        fieldTipsContent.innerHTML = '';
        
        let tips = [];
        if (analysis.status === 'healthy') {
            tips = [
                "Maintain current irrigation levels. Soil moisture looks optimal for growth.",
                "Check for early nitrogen deficiency in the lower leaves next week.",
                "Weather forecast predicts optimal conditions for photosynthesis."
            ];
        } else if (analysis.status === 'warning' || analysis.status === 'critical') {
            tips = [
                "Isolate the affected area immediately to prevent spore migration.",
                "Check pH levels of the soil; high acidity may be stressing the crop.",
                "Consult with an agronomist regarding the identified disease pattern."
            ];
        }
        
        tips.forEach(tip => {
            const p = document.createElement('p');
            p.className = "flex items-start gap-2 leading-relaxed";
            p.innerHTML = `<span class="text-primary">•</span> <span>${tip}</span>`;
            fieldTipsContent.appendChild(p);
        });
    }

    // Initial API Fetch triggers
    fetchHistory();
    fetchStats();
    initAnalytics();
    initParticles();
    initTheme();
    loadTranslations();
    initWeather();

    // ----------------------------------------------------
    // Multi-Language Support
    // ----------------------------------------------------
    async function loadTranslations() {
        try {
            const res = await fetch('/static/i18n.json');
            currentTranslations = await res.json();
            updateUILanguage();
        } catch (e) {
            console.error('Failed to load translations:', e);
        }
    }

    function updateUILanguage() {
        const trans = currentTranslations[currentLang];
        if (!trans) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (trans[key]) el.textContent = trans[key];
        });

        langToggle.textContent = currentLang.toUpperCase();
        
        // Update placeholders
        if (trans.upload_desc) {
            uploadPlaceholder.querySelector('p').textContent = trans.upload_desc;
        }
        
        // Refresh charts if they exist
        if (distChart) initAnalytics();
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        localStorage.setItem('appLang', currentLang);
        updateUILanguage();
    });

    // ----------------------------------------------------
    // Dark/Light Mode Management
    // ----------------------------------------------------
    function initTheme() {
        const savedTheme = localStorage.getItem('appTheme') || 'dark';
        setTheme(savedTheme);
    }

    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
            themeIconMoon.classList.add('hidden');
            themeIconSun.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('light-mode');
            themeIconMoon.classList.remove('hidden');
            themeIconSun.classList.add('hidden');
        }
        localStorage.setItem('appTheme', theme);
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.classList.contains('light-mode');
        setTheme(isLight ? 'dark' : 'light');
    });

    // ----------------------------------------------------
    // Sample Gallery Logic
    // ----------------------------------------------------
    document.querySelectorAll('.sample-img-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const src = btn.getAttribute('data-src');
            showToast('Loading sample image...', 'info');
            
            try {
                const response = await fetch(src);
                const blob = await response.blob();
                const file = new File([blob], src.split('/').pop(), { type: blob.type });
                
                // Simulate file selection
                currentFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    uploadPlaceholder.classList.add('hidden');
                    previewContainer.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
                
                // Auto-analyze
                analyzeBtn.disabled = false;
                analyzeBtn.click();
            } catch (e) {
                console.error('Failed to load sample:', e);
                showToast('Failed to load sample image.', 'error');
            }
        });
    });



    // ----------------------------------------------------
    // Detection Analytics (Chart.js)
    // ----------------------------------------------------
    async function initAnalytics() {
        try {
            const res = await fetch('/api/history', {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            const history = data.history || [];
            
            analyticsSection.classList.remove('hidden');
            if (history.length === 0) return;

            const trans = currentTranslations[currentLang] || currentTranslations['en'];

            // 1. Distribution Data
            const counts = {};
            history.forEach(item => {
                counts[item.disease] = (counts[item.disease] || 0) + 1;
            });

            if (distChart) distChart.destroy();
            const distCtx = document.getElementById('distributionChart').getContext('2d');
            distChart = new Chart(distCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(counts),
                    datasets: [{
                        data: Object.values(counts),
                        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 2000,
                        easing: 'easeOutBounce'
                    },
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } }
                    }
                }
            });

            // Make the chart rotatable (playable)
            initRotatableChart(distChart, distCtx.canvas);

            // 2. Timeline Data (Last 10 scans)
            const lastScans = history.slice(-10);
            if (timelineChart) timelineChart.destroy();
            const timelineCtx = document.getElementById('timelineChart').getContext('2d');
            timelineChart = new Chart(timelineCtx, {
                type: 'line',
                data: {
                    labels: lastScans.map((_, i) => `#${i + 1}`),
                    datasets: [{
                        label: trans.confidence || 'Confidence',
                        data: lastScans.map(s => s.confidence),
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { min: 0, max: 100, ticks: { color: '#64748b' }, grid: { color: '#334155' } },
                        x: { ticks: { color: '#64748b' }, grid: { display: false } }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        } catch (e) {
            console.error('Failed to init analytics:', e);
        }
    }

    // Rotatable Chart Logic
    function initRotatableChart(chart, canvas) {
        let isDragging = false;
        let lastAngle = 0;

        const getAngle = (x, y) => {
            const rect = canvas.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            return Math.atan2(y - cy, x - cx);
        };

        const handleStart = (e) => {
            isDragging = true;
            const pos = e.touches ? e.touches[0] : e;
            lastAngle = getAngle(pos.clientX, pos.clientY);
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            const pos = e.touches ? e.touches[0] : e;
            const currentAngle = getAngle(pos.clientX, pos.clientY);
            const delta = currentAngle - lastAngle;
            
            // Convert rad to deg for Chart.js rotation
            const deltaDeg = delta * (180 / Math.PI);
            chart.options.rotation = (chart.options.rotation || 0) + deltaDeg;
            chart.update('none'); // Update without animation for smoothness
            
            lastAngle = currentAngle;
        };

        const handleEnd = () => { isDragging = false; };

        canvas.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);

        canvas.addEventListener('touchstart', handleStart);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);
    }

    // ----------------------------------------------------
    // Animated Stats Dashboard
    // ----------------------------------------------------
    async function fetchStats() {
        try {
            const res = await fetch('/api/stats', {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            
            // Note: Dashboard IDs in index.html are camelCase: statTotal, statDiseases, statInsects, statHealthy
            animateCounter('statTotal', data.total_scans);
            animateCounter('statDiseases', data.diseases_found);
            animateCounter('statInsects', data.insects_found);
            animateCounter('statHealthy', data.healthy_rate, '%');
        } catch (e) {
            console.error('Stats fetch error:', e);
        }
    }

    // ----------------------------------------------------
    // Extra Feature: Weather & Activity Feed
    // ----------------------------------------------------
    function initWeather() {
        // Mocking weather for agricultural relevance
        const conditions = [
            { icon: '☀️', desc: 'Sunny & Hot', temp: '32°C', hum: '45%', risk: 'Low' },
            { icon: '⛅', desc: 'Partly Cloudy', temp: '28°C', hum: '55%', risk: 'Low' },
            { icon: '☁️', desc: 'Overcast', temp: '24°C', hum: '65%', risk: 'Moderate' },
            { icon: '🌦️', desc: 'Light Rain', temp: '22°C', hum: '85%', risk: 'High' }
        ];
        
        const random = conditions[Math.floor(Math.random() * conditions.length)];
        
        if (weatherIcon) weatherIcon.textContent = random.icon;
        if (weatherTemp) weatherTemp.textContent = random.temp;
        if (weatherDesc) weatherDesc.textContent = random.desc;
        if (weatherHum) weatherHum.textContent = random.hum;
        if (weatherRisk) {
            weatherRisk.textContent = random.risk;
            const riskColor = random.risk === 'High' ? 'text-red-500' : (random.risk === 'Moderate' ? 'text-yellow-500' : 'text-green-500');
            weatherRisk.className = 'font-bold ' + riskColor;
        }
    }

    function updateActivityFeed(history) {
        if (!activityFeed) return;
        
        if (history.length === 0) {
            activityFeed.innerHTML = `<div class="text-center py-8 text-gray-600 italic text-sm">No recent activity.</div>`;
            return;
        }

        activityFeed.innerHTML = '';
        // Only show last 5 for sidebar
        history.slice(0, 5).forEach(item => {
            const div = document.createElement('div');
            div.className = "flex items-start gap-3 p-3 bg-gray-800/20 rounded-xl border border-gray-700/30 hover:bg-gray-800/40 transition-all cursor-pointer mb-2";
            
            const timeAgo = getTimeAgo(new Date(item.timestamp));
            
            // Icon based on disease
            let icon = '✅';
            let color = 'text-green-400';
            if (item.disease === 'disease') { icon = '🦠'; color = 'text-red-400'; }
            if (item.disease === 'insect') { icon = '🐜'; color = 'text-yellow-400'; }

            div.innerHTML = `
                <div class="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700 shadow-sm">
                    <img src="${item.image}" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow overflow-hidden">
                    <div class="flex items-center justify-between mb-0.5">
                        <span class="text-[10px] font-bold ${color} uppercase tracking-tighter">${item.disease}</span>
                        <span class="text-[9px] text-gray-600">${timeAgo}</span>
                    </div>
                    <p class="text-[11px] text-gray-400 truncate leading-tight">Match: ${item.confidence.toFixed(0)}%</p>
                </div>
                <div class="text-lg">${icon}</div>
            `;
            
            activityFeed.appendChild(div);
        });
    }

    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return minutes + 'm ago';
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + 'h ago';
        return Math.floor(hours / 24) + 'd ago';
    }

    function animateCounter(elementId, target, suffix = '') {
        const el = document.getElementById(elementId);
        if (!el) return;
        const start = parseInt(el.textContent) || 0;
        const duration = 800;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ----------------------------------------------------
    // Severity Gauge
    // ----------------------------------------------------
    function updateSeverityGauge(confidence, status) {
        const arc = document.getElementById('severityArc');
        const gaugeValue = document.getElementById('gaugeValue');
        if (!arc || !gaugeValue) return;
        
        const circumference = 2 * Math.PI * 50; // r=50
        const offset = circumference - (confidence / 100) * circumference;
        
        const colorMap = {
            'healthy': '#22c55e',
            'warning': '#f59e0b',
            'critical': '#ef4444'
        };
        
        arc.style.strokeDashoffset = offset;
        arc.style.stroke = colorMap[status] || '#22c55e';
        gaugeValue.textContent = confidence.toFixed(0) + '%';
    }

    // ----------------------------------------------------
    // Particle Background
    // ----------------------------------------------------
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let particles = [];
        const particleCount = 25; // Reduced for performance
        
        let resizeTimer;
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 200);
        });
        resize();
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.3 + 0.05
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
                ctx.fill();
            });
            
            // Draw faint connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(34, 197, 94, ${0.03 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ----------------------------------------------------
    // Confetti Burst
    // ----------------------------------------------------
    function triggerConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;
        canvas.classList.remove('hidden');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#22c55e', '#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b', '#38bdf8', '#818cf8'];
        
        for (let i = 0; i < 120; i++) {
            confettiPieces.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 400,
                y: canvas.height / 2 - 100,
                vx: (Math.random() - 0.5) * 12,
                vy: Math.random() * -12 - 3,
                w: Math.random() * 8 + 4,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.12 + Math.random() * 0.05
            });
        }
        
        let frame = 0;
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;
            
            confettiPieces.forEach(p => {
                p.vy += p.gravity;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotSpeed;
                p.vx *= 0.99;
                
                if (p.y < canvas.height + 50) alive = true;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, 1 - frame / 120);
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            
            frame++;
            if (alive && frame < 150) {
                requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.classList.add('hidden');
            }
        }
        draw();
    }

    // ----------------------------------------------------
    // Live Camera Mode
    // ----------------------------------------------------
    let cameraStream = null;
    let liveAnalysisInterval = null;
    let isAnalyzing = false;
    let frameCount = 0;
    let lastFpsTime = Date.now();

    uploadModeBtn.addEventListener('click', () => {
        stopCamera();
        uploadModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all bg-gray-800 text-gray-200 shadow-sm border border-gray-600';
        cameraModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all text-gray-400 hover:text-gray-200';
        cameraState.classList.add('hidden');
        emptyState.classList.remove('hidden');
    });

    cameraModeBtn.addEventListener('click', async () => {
        cameraModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all bg-gray-800 text-gray-200 shadow-sm border border-gray-600';
        uploadModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all text-gray-400 hover:text-gray-200';

        // Hide other states
        emptyState.classList.add('hidden');
        loadingState.classList.add('hidden');
        resultsState.classList.add('hidden');
        cameraState.classList.remove('hidden');

        await startCamera();
    });

    stopCameraBtn.addEventListener('click', () => {
        stopCamera();
        cameraState.classList.add('hidden');
        emptyState.classList.remove('hidden');
        uploadModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all bg-gray-800 text-gray-200 shadow-sm border border-gray-600';
        cameraModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all text-gray-400 hover:text-gray-200';
    });

    // Capture & Analyze: snapshot the current frame and run full analysis
    captureBtn.addEventListener('click', async () => {
        if (!cameraStream) return;

        // Snapshot the current frame
        const captureCanvas = document.createElement('canvas');
        captureCanvas.width = webcamVideo.videoWidth;
        captureCanvas.height = webcamVideo.videoHeight;
        const cCtx = captureCanvas.getContext('2d');
        cCtx.drawImage(webcamVideo, 0, 0);

        // Stop the camera and switch to loading state
        stopCamera();
        cameraState.classList.add('hidden');
        uploadModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all bg-gray-800 text-gray-200 shadow-sm border border-gray-600';
        cameraModeBtn.className = 'px-5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all text-gray-400 hover:text-gray-200';
        showState('loading');

        try {
            const blob = await new Promise(resolve => captureCanvas.toBlob(resolve, 'image/jpeg', 0.9));
            const formData = new FormData();
            formData.append('file', blob, 'capture.jpg');
            formData.append('model_type', modelSelect.value);
            formData.append('conf_threshold', confSlider.value);

            const response = await fetch('/api/analyze', { 
                method: 'POST', 
                headers: getAuthHeaders(),
                body: formData 
            });
            const data = await response.json();

            if (data.success) {
                showState('results');
                renderResults(data);
                showToast('Capture analyzed successfully!', 'success');
                fetchHistory();
                fetchStats();
            } else {
                showToast('Capture analysis failed: ' + (data.error || 'Unknown error'), 'error');
                showState('empty');
            }
        } catch (err) {
            console.error('Capture analysis error:', err);
            showToast('Failed to analyze captured frame.', 'error');
            showState('empty');
        }
    });

    async function startCamera() {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
            });
            webcamVideo.srcObject = cameraStream;
            await webcamVideo.play();

            // Start the analysis loop once video plays
            webcamVideo.addEventListener('loadeddata', startLiveLoop, { once: true });
        } catch (err) {
            console.error('Camera access denied:', err);
            showToast('Camera access denied. Please allow camera permissions.', 'error');
            stopCamera();
            cameraState.classList.add('hidden');
            emptyState.classList.remove('hidden');
        }
    }

    function stopCamera() {
        if (liveAnalysisInterval) {
            clearInterval(liveAnalysisInterval);
            liveAnalysisInterval = null;
        }
        if (cameraStream) {
            cameraStream.getTracks().forEach(t => t.stop());
            cameraStream = null;
        }
        webcamVideo.srcObject = null;
        const ctx = webcamOverlay.getContext('2d');
        ctx.clearRect(0, 0, webcamOverlay.width, webcamOverlay.height);
        liveDetectionCount.textContent = '0';
        liveFps.textContent = '-- FPS';
    }

    function startLiveLoop() {
        liveAnalysisInterval = setInterval(() => {
            if (!isAnalyzing && cameraStream) {
                captureAndAnalyzeFrame();
            }
        }, 500);
    }

    async function captureAndAnalyzeFrame() {
        isAnalyzing = true;
        const captureCanvas = document.createElement('canvas');
        captureCanvas.width = webcamVideo.videoWidth;
        captureCanvas.height = webcamVideo.videoHeight;
        const cCtx = captureCanvas.getContext('2d');
        cCtx.drawImage(webcamVideo, 0, 0);

        try {
            const blob = await new Promise(resolve => captureCanvas.toBlob(resolve, 'image/jpeg', 0.7));
            const formData = new FormData();
            formData.append('file', blob, 'frame.jpg');
            formData.append('model_type', modelSelect.value);
            formData.append('conf_threshold', confSlider.value);

            const response = await fetch('/api/live-analyze', { 
                method: 'POST', 
                headers: getAuthHeaders(),
                body: formData 
            });
            const data = await response.json();

            if (data.success && data.analysis) {
                drawLiveBoundingBoxes(data.analysis.detections, captureCanvas.width, captureCanvas.height);
                liveDetectionCount.textContent = data.analysis.total_detections;
            } else {
                const ctx = webcamOverlay.getContext('2d');
                ctx.clearRect(0, 0, webcamOverlay.width, webcamOverlay.height);
            }

            frameCount++;
            const now = Date.now();
            if (now - lastFpsTime >= 1000) {
                liveFps.textContent = frameCount + ' FPS';
                frameCount = 0;
                lastFpsTime = now;
            }
        } catch (err) {
            console.error('Live analysis error:', err);
        }
        isAnalyzing = false;
    }

    function drawLiveBoundingBoxes(detections, srcWidth, srcHeight) {
        const rect = webcamVideo.getBoundingClientRect();
        webcamOverlay.width = rect.width;
        webcamOverlay.height = rect.height;

        const ctx = webcamOverlay.getContext('2d');
        ctx.clearRect(0, 0, webcamOverlay.width, webcamOverlay.height);

        if (!detections || detections.length === 0) return;

        const scaleX = rect.width / srcWidth;
        const scaleY = rect.height / srcHeight;

        const colorMap = {
            'healthy': '#22c55e',
            'disease': '#ef4444',
            'insect':  '#f59e0b'
        };

        detections.forEach(det => {
            const color = colorMap[det.class] || det.color || '#22c55e';
            
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.9;
            ctx.font = 'bold 14px Inter, sans-serif';
            const label = `${det.class} (${det.confidence.toFixed(1)}%)`;
            const textW = ctx.measureText(label).width;

            const yPos = 30 + detections.indexOf(det) * 28;
            ctx.fillStyle = color + '33';
            ctx.fillRect(10, yPos - 16, textW + 16, 24);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.strokeRect(10, yPos - 16, textW + 16, 24);
            ctx.fillStyle = color;
            ctx.globalAlpha = 1;
            ctx.fillText(label, 18, yPos);
        });
    }
});
