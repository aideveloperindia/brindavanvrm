// VRM App - Verification Recovery Marketing App
class VRMApp {
    constructor() {
        this.currentRole = 'MD';
        this.currentScreen = 'H-01';
        this.sampleData = this.initializeSampleData();
        this.liveUpdateInterval = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormHandlers();
        this.startLiveUpdates();
        this.loadScreen('H-01');
    }

    setupEventListeners() {
        // Mobile Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const screen = e.currentTarget.dataset.screen;
                this.navigateToScreen(screen);
            });
        });

        // Desktop Navigation
        document.querySelectorAll('.desktop-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const screen = e.currentTarget.dataset.screen;
                this.navigateToScreen(screen);
            });
        });

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Role indicator
        document.getElementById('currentRole').addEventListener('click', () => {
            this.showRoleSelector();
        });
    }

    initializeSampleData() {
        return {
            // Employee Database with Departments and Roles
            employees: {
                // Collection Department (5 Executives)
                'EXEC001': { 
                    name: 'Rajesh Kumar', 
                    role: 'Collection Executive', 
                    department: 'Collection',
                    area: 'Karimnagar North',
                    manager: 'INC001',
                    phone: '+91-98765-43210',
                    email: 'rajesh.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { monthly: 500000, weekly: 125000 }
                },
                'EXEC002': { 
                    name: 'Suresh Kumar', 
                    role: 'Collection Executive', 
                    department: 'Collection',
                    area: 'Karimnagar South',
                    manager: 'INC001',
                    phone: '+91-98765-43211',
                    email: 'suresh.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { monthly: 450000, weekly: 112500 }
                },
                'EXEC003': { 
                    name: 'Amit Kumar', 
                    role: 'Collection Executive', 
                    department: 'Collection',
                    area: 'Warangal',
                    manager: 'INC002',
                    phone: '+91-98765-43212',
                    email: 'amit.kumar@brindavanchits.com',
                    experience: '4 years',
                    targets: { monthly: 600000, weekly: 150000 }
                },
                'EXEC004': { 
                    name: 'Vikram Kumar', 
                    role: 'Collection Executive', 
                    department: 'Collection',
                    area: 'Nizamabad',
                    manager: 'INC001',
                    phone: '+91-98765-43213',
                    email: 'vikram.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { monthly: 550000, weekly: 137500 }
                },
                'EXEC005': { 
                    name: 'Ravi Kumar', 
                    role: 'Collection Executive', 
                    department: 'Collection',
                    area: 'Khammam',
                    manager: 'INC002',
                    phone: '+91-98765-43214',
                    email: 'ravi.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { monthly: 480000, weekly: 120000 }
                },
                
                // Verification Department (5 Executives)
                'VER001': { 
                    name: 'Srinivas Kumar', 
                    role: 'Verification Executive', 
                    department: 'Verification',
                    area: 'Document Verification',
                    manager: 'HOD001',
                    phone: '+91-98765-43215',
                    email: 'srinivas.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { daily: 25, monthly: 500 }
                },
                'VER002': { 
                    name: 'Kiran Kumar', 
                    role: 'Verification Executive', 
                    department: 'Verification',
                    area: 'KYC Processing',
                    manager: 'HOD001',
                    phone: '+91-98765-43216',
                    email: 'kiran.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { daily: 30, monthly: 600 }
                },
                'VER003': { 
                    name: 'Venkatesh Kumar', 
                    role: 'Verification Executive', 
                    department: 'Verification',
                    area: 'Identity Verification',
                    manager: 'HOD001',
                    phone: '+91-98765-43217',
                    email: 'venkatesh.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { daily: 28, monthly: 560 }
                },
                'VER004': { 
                    name: 'Prakash Kumar', 
                    role: 'Verification Executive', 
                    department: 'Verification',
                    area: 'Address Verification',
                    manager: 'HOD001',
                    phone: '+91-98765-43218',
                    email: 'prakash.kumar@brindavanchits.com',
                    experience: '4 years',
                    targets: { daily: 32, monthly: 640 }
                },
                'VER005': { 
                    name: 'Naveen Kumar', 
                    role: 'Verification Executive', 
                    department: 'Verification',
                    area: 'Compliance Check',
                    manager: 'HOD001',
                    phone: '+91-98765-43219',
                    email: 'naveen.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { daily: 26, monthly: 520 }
                },
                
                // Marketing Department (7 Executives)
                'MKT001': { 
                    name: 'Ravi Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'Lead Generation',
                    manager: 'HOD002',
                    phone: '+91-98765-43220',
                    email: 'ravi.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { monthly: 100, conversion: 15 }
                },
                'MKT002': { 
                    name: 'Suresh Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'Digital Marketing',
                    manager: 'HOD002',
                    phone: '+91-98765-43221',
                    email: 'suresh.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { monthly: 120, conversion: 18 }
                },
                'MKT003': { 
                    name: 'Amit Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'Social Media Marketing',
                    manager: 'HOD002',
                    phone: '+91-98765-43222',
                    email: 'amit.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { monthly: 110, conversion: 16 }
                },
                'MKT004': { 
                    name: 'Vikram Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'Email Marketing',
                    manager: 'HOD002',
                    phone: '+91-98765-43223',
                    email: 'vikram.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { monthly: 130, conversion: 20 }
                },
                'MKT005': { 
                    name: 'Rajesh Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'Content Marketing',
                    manager: 'HOD002',
                    phone: '+91-98765-43224',
                    email: 'rajesh.kumar@brindavanchits.com',
                    experience: '4 years',
                    targets: { monthly: 140, conversion: 22 }
                },
                'MKT006': { 
                    name: 'Srinivas Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'SEO Marketing',
                    manager: 'HOD002',
                    phone: '+91-98765-43225',
                    email: 'srinivas.kumar@brindavanchits.com',
                    experience: '2 years',
                    targets: { monthly: 105, conversion: 17 }
                },
                'MKT007': { 
                    name: 'Kiran Kumar', 
                    role: 'Marketing Executive', 
                    department: 'Marketing',
                    area: 'Campaign Management',
                    manager: 'HOD002',
                    phone: '+91-98765-43226',
                    email: 'kiran.kumar@brindavanchits.com',
                    experience: '3 years',
                    targets: { monthly: 125, conversion: 19 }
                },
                
                // Management Hierarchy
                'INC001': { 
                    name: 'Suresh Kumar', 
                    role: 'Incharge', 
                    department: 'Collection',
                    area: 'Karimnagar District',
                    manager: 'HOD001',
                    phone: '+91-98765-43227',
                    email: 'suresh.kumar@brindavanchits.com',
                    experience: '8 years',
                    team_size: 3
                },
                'INC002': { 
                    name: 'Ravi Kumar', 
                    role: 'Incharge', 
                    department: 'Collection',
                    area: 'Warangal District',
                    manager: 'HOD001',
                    phone: '+91-98765-43228',
                    email: 'ravi.kumar@brindavanchits.com',
                    experience: '7 years',
                    team_size: 2
                },
                
                'HOD001': { 
                    name: 'Venkatesh Kumar', 
                    role: 'HOD', 
                    department: 'Operations',
                    area: 'Telangana State',
                    manager: 'MD001',
                    phone: '+91-98765-43229',
                    email: 'venkatesh.kumar@brindavanchits.com',
                    experience: '12 years',
                    team_size: 20
                },
                'HOD002': { 
                    name: 'Srinivas Kumar', 
                    role: 'HOD', 
                    department: 'Marketing',
                    area: 'South India',
                    manager: 'MD001',
                    phone: '+91-98765-43230',
                    email: 'srinivas.kumar@brindavanchits.com',
                    experience: '10 years',
                    team_size: 7
                },
                
                'MD001': { 
                    name: 'Penta Srinivas Kumar', 
                    role: 'Managing Director', 
                    department: 'Executive',
                    area: 'All States',
                    manager: null,
                    phone: '+91-98765-43231',
                    email: 'penta.srinivas@brindavanchits.com',
                    experience: '20 years',
                    team_size: 22
                }
            },
            
            // Department Structure
            departments: {
                'Collection': {
                    name: 'Collection Department',
                    head: 'HOD001',
                    description: 'Field collection operations and payment recovery',
                    employees: ['EXEC001', 'EXEC002', 'EXEC003', 'EXEC004', 'EXEC005', 'INC001', 'INC002'],
                    targets: { monthly: 2500000, recovery_rate: 85 }
                },
                'Verification': {
                    name: 'Verification Department', 
                    head: 'HOD001',
                    description: 'Document verification and KYC processing',
                    employees: ['VER001', 'VER002', 'VER003', 'VER004', 'VER005'],
                    targets: { daily: 150, accuracy: 98 }
                },
                'Marketing': {
                    name: 'Marketing Department',
                    head: 'HOD002', 
                    description: 'Lead generation and customer acquisition',
                    employees: ['MKT001', 'MKT002', 'MKT003', 'MKT004', 'MKT005', 'MKT006', 'MKT007'],
                    targets: { monthly: 800, conversion: 20 }
                },
                'Operations': {
                    name: 'Operations Department',
                    head: 'HOD001',
                    description: 'Overall operations management',
                    employees: ['HOD001', 'HOD002'],
                    targets: { efficiency: 95, customer_satisfaction: 90 }
                }
            },
            customers: [
                { id: 'CUST001', name: 'Mr. Ram Mohan', due: 5000, installmentDate: '2024-01-15', status: 'pending', exec: 'EXEC001' },
                { id: 'CUST002', name: 'Mrs. Lakshmi Devi', due: 7500, installmentDate: '2024-01-10', status: 'overdue', exec: 'EXEC001' },
                { id: 'CUST003', name: 'Mr. Suresh Kumar', due: 3000, installmentDate: '2024-01-20', status: 'pending', exec: 'EXEC002' },
                { id: 'CUST004', name: 'Mrs. Geeta Reddy', due: 4500, installmentDate: '2024-01-12', status: 'collected', exec: 'EXEC002' }
            ],
            liveUpdates: {
                currentVisit: 'Mr. Ram Mohan - Due ₹5000',
                collectedToday: 12500,
                totalDue: 25000,
                reminders: 3
            },
            
            // Job Role Definitions
            roleDefinitions: {
                'Collection Executive': {
                    title: 'Collection Executive',
                    department: 'Collection',
                    level: 'Field Level',
                    responsibilities: [
                        'Visit customers for payment collection',
                        'Capture selfie and GPS location for verification',
                        'Record payment details (cash/cheque/UPI)',
                        'Handle customer queries and objections',
                        'Submit daily visit reports',
                        'Request relieve for difficult cases',
                        'Maintain customer relationships'
                    ],
                    permissions: [
                        'View assigned customers',
                        'Mark payments',
                        'Request relieve',
                        'Submit reports',
                        'Access customer history'
                    ],
                    targets: {
                        daily: '5-8 visits',
                        monthly: '₹4-6 lakhs collection',
                        weekly: '₹1-1.5 lakhs collection'
                    }
                },
                
                'Incharge': {
                    title: 'Incharge',
                    department: 'Collection',
                    level: 'Supervisory Level',
                    responsibilities: [
                        'Monitor team performance',
                        'Assign customers to executives',
                        'Approve relieve requests',
                        'Handle escalations',
                        'Conduct team meetings',
                        'Review daily reports',
                        'Deploy special executives'
                    ],
                    permissions: [
                        'View team dashboard',
                        'Assign customers',
                        'Approve requests',
                        'Monitor performance',
                        'Generate reports'
                    ],
                    targets: {
                        team_size: '4-6 executives',
                        monthly: '₹15-20 lakhs team collection',
                        efficiency: '85%+ recovery rate'
                    }
                },
                
                'HOD': {
                    title: 'Head of Department',
                    department: 'Operations',
                    level: 'Management Level',
                    responsibilities: [
                        'Oversee department operations',
                        'Manage area assignments',
                        'Handle major escalations',
                        'Review performance analytics',
                        'Resource allocation',
                        'Strategic planning',
                        'Cross-department coordination'
                    ],
                    permissions: [
                        'View all department data',
                        'Manage areas',
                        'Handle escalations',
                        'View analytics',
                        'Resource allocation'
                    ],
                    targets: {
                        department_size: '15-20 employees',
                        monthly: '₹50+ lakhs department collection',
                        efficiency: '90%+ overall performance'
                    }
                },
                
                'Managing Director': {
                    title: 'Managing Director',
                    department: 'Executive',
                    level: 'Executive Level',
                    responsibilities: [
                        'Overall company strategy',
                        'Multi-state operations oversight',
                        'Executive decision making',
                        'Resource allocation',
                        'Performance monitoring',
                        'Strategic partnerships',
                        'Board reporting'
                    ],
                    permissions: [
                        'View all company data',
                        'Multi-state operations',
                        'Strategic decisions',
                        'Executive oversight',
                        'Resource allocation'
                    ],
                    targets: {
                        company_size: '50+ employees',
                        monthly: '₹2+ crores company collection',
                        growth: '20%+ year-over-year growth'
                    }
                },
                
                'Verification Executive': {
                    title: 'Verification Executive',
                    department: 'Verification',
                    level: 'Specialized Level',
                    responsibilities: [
                        'Verify customer documents',
                        'Process KYC applications',
                        'Validate customer information',
                        'Handle document rejections',
                        'Maintain verification records',
                        'Ensure compliance',
                        'Quality control'
                    ],
                    permissions: [
                        'View verification queue',
                        'Process documents',
                        'Mark verified/rejected',
                        'Access customer data',
                        'Generate verification reports'
                    ],
                    targets: {
                        daily: '25-30 verifications',
                        monthly: '500-600 verifications',
                        accuracy: '98%+ verification accuracy'
                    }
                },
                
                'Marketing Executive': {
                    title: 'Marketing Executive',
                    department: 'Marketing',
                    level: 'Specialized Level',
                    responsibilities: [
                        'Generate new leads',
                        'Run marketing campaigns',
                        'Track conversion rates',
                        'Customer acquisition',
                        'Digital marketing',
                        'Lead qualification',
                        'Campaign analysis'
                    ],
                    permissions: [
                        'View lead dashboard',
                        'Add new leads',
                        'Track conversions',
                        'Run campaigns',
                        'Generate marketing reports'
                    ],
                    targets: {
                        monthly: '100-120 leads',
                        conversion: '15-20% conversion rate',
                        campaigns: '2-3 active campaigns'
                    }
                }
            }
        };
    }

    async loadScreen(screenId) {
        this.currentScreen = screenId;
        const screenData = this.getScreenData(screenId);
        const container = document.getElementById('screenContainer');
        
        container.innerHTML = await this.generateScreenHTML(screenData);
        this.setupScreenEventListeners();
        this.updateNavigation();
    }

    getScreenData(screenId) {
        const screens = {
            'H-01': { title: 'Role Select / Login', role: 'All', content: 'role-select' },
            'H-02': { title: 'Collection Exec Dashboard', role: 'Collection Executive', content: 'exec-dashboard' },
            'H-03': { title: 'Start Visit - Geo + Selfie Capture', role: 'Collection Executive', content: 'visit-capture' },
            'H-04': { title: 'Customer Assignment List', role: 'Collection Executive', content: 'customer-list' },
            'H-05': { title: 'Incharge Dashboard', role: 'Incharge', content: 'incharge-dashboard' },
            'H-06': { title: 'HOD Dashboard', role: 'HOD', content: 'hod-dashboard' },
            'H-07': { title: 'MD Dashboard', role: 'Managing Director', content: 'md-dashboard' },
            'H-08': { title: 'Hierarchy Visual', role: 'All', content: 'hierarchy-visual' },
            'H-09': { title: 'Assign Customer Screen', role: 'Incharge/HOD', content: 'assign-customer' },
            'H-10': { title: 'Request Relieve', role: 'Collection Executive', content: 'request-relieve' },
            'H-11': { title: 'Deploy Special Executive', role: 'Incharge/HOD', content: 'deploy-special-exec' },
            'H-12': { title: 'Verification Exec Dashboard', role: 'Verification Executive', content: 'verification-dashboard' },
            'H-13': { title: 'Marketing Exec Dashboard', role: 'Marketing Exec', content: 'marketing-dashboard' },
            'H-14': { title: 'Area Assignment Screen', role: 'HOD/MD', content: 'area-assignment' },
            'H-15': { title: 'Daily Report Entry', role: 'Collection Executive', content: 'daily-report' },
            'H-16': { title: 'Daily Summary', role: 'Incharge', content: 'daily-summary' },
            'H-17': { title: 'Live Notifications', role: 'All', content: 'notifications' },
            'H-18': { title: 'Bounce Management', role: 'HOD/Accounts', content: 'bounce-management' },
            'H-19': { title: 'Customer Detail', role: 'All', content: 'customer-detail' },
            'H-20': { title: 'Escalations & SLA Tracker', role: 'HOD/MD', content: 'escalations' },
            'H-21': { title: 'Performance & Analytics', role: 'HOD/MD', content: 'performance-analytics' },
            'H-22': { title: 'Audit Log & Visit Proofs', role: 'All', content: 'audit-log' },
            'H-23': { title: 'Assign/Withdraw Responsibility', role: 'HOD/Incharge', content: 'assign-withdraw' },
            'H-24': { title: 'Multi-state Operations', role: 'MD', content: 'multi-state' },
            'H-25': { title: 'Live Tiles Demo', role: 'All', content: 'live-tiles-demo' },
            'H-26': { title: 'Settings - Reminders', role: 'HOD', content: 'settings-reminders' },
            'H-27': { title: 'Quick Actions Panel', role: 'Collection Executive', content: 'quick-actions' },
            'H-28': { title: 'Training & SOPs', role: 'All', content: 'training-sops' }
        };
        return screens[screenId] || screens['H-01'];
    }

    async generateScreenHTML(screenData) {
        switch(screenData.content) {
            case 'role-select': return this.generateRoleSelectScreen();
            case 'exec-dashboard': return this.generateExecDashboardScreen();
            case 'visit-capture': return this.generateVisitCaptureScreen();
            case 'customer-list': return await this.generateCustomerListScreen();
            case 'incharge-dashboard': return this.generateInchargeDashboardScreen();
            case 'hod-dashboard': return this.generateHODDashboardScreen();
            case 'md-dashboard': return this.generateMDDashboardScreen();
            case 'hierarchy-visual': return this.generateHierarchyVisualScreen();
            case 'assign-customer': return this.generateAssignCustomerScreen();
            case 'request-relieve': return this.generateRequestRelieveScreen();
            case 'deploy-special-exec': return this.generateDeploySpecialExecScreen();
            case 'verification-dashboard': return this.generateVerificationDashboardScreen();
            case 'marketing-dashboard': return this.generateMarketingDashboardScreen();
            case 'area-assignment': return this.generateAreaAssignmentScreen();
            case 'daily-report': return this.generateDailyReportScreen();
            case 'daily-summary': return this.generateDailySummaryScreen();
            case 'notifications': return this.generateNotificationsScreen();
            case 'bounce-management': return this.generateBounceManagementScreen();
            case 'customer-detail': return this.generateCustomerDetailScreen();
            case 'escalations': return this.generateEscalationsScreen();
            case 'performance-analytics': return this.generatePerformanceAnalyticsScreen();
            case 'audit-log': return this.generateAuditLogScreen();
            case 'assign-withdraw': return this.generateAssignWithdrawScreen();
            case 'multi-state': return this.generateMultiStateScreen();
            case 'live-tiles-demo': return this.generateLiveTilesDemoScreen();
            case 'settings-reminders': return this.generateSettingsRemindersScreen();
            case 'quick-actions': return this.generateQuickActionsScreen();
            case 'training-sops': return this.generateTrainingSOPsScreen();
            default: return this.generateDefaultScreen(screenData);
        }
    }

    generateRoleSelectScreen() {
        return `
            <div class="screen active">
                <div class="login-container">
                    <div class="login-header">
                        <h1>Welcome to VRM System</h1>
                        <p>Verification Recovery Marketing Platform</p>
                    </div>
                    
                    <div class="login-form">
                        <div class="form-group">
                            <label class="form-label">Employee ID</label>
                            <input type="text" class="form-input" placeholder="Enter Employee ID" id="employeeId" value="EMP001">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Select Role</label>
                            <div class="role-grid">
                                <div class="role-card" data-role="Collection Executive" onclick="app.selectRole('Collection Executive')">
                                    <div class="role-icon">📋</div>
                                    <div class="role-title">Collection Executive</div>
                                    <div class="role-description">Field operations and payment collection</div>
                                </div>
                                
                                <div class="role-card" data-role="Incharge" onclick="app.selectRole('Incharge')">
                                    <div class="role-icon">👨‍💼</div>
                                    <div class="role-title">Incharge</div>
                                    <div class="role-description">Team management and assignments</div>
                                </div>
                                
                                <div class="role-card" data-role="HOD" onclick="app.selectRole('HOD')">
                                    <div class="role-icon">🏢</div>
                                    <div class="role-title">HOD</div>
                                    <div class="role-description">Department oversight and analytics</div>
                                </div>
                                
                                <div class="role-card" data-role="Managing Director" onclick="app.selectRole('Managing Director')">
                                    <div class="role-icon">👑</div>
                                    <div class="role-title">Managing Director</div>
                                    <div class="role-description">Executive oversight and strategy</div>
                                </div>
                                
                                <div class="role-card" data-role="Verification Executive" onclick="app.selectRole('Verification Executive')">
                                    <div class="role-icon">🔍</div>
                                    <div class="role-title">Verification Executive</div>
                                    <div class="role-description">Document verification and validation</div>
                                </div>
                                
                                <div class="role-card" data-role="Marketing Executive" onclick="app.selectRole('Marketing Executive')">
                                    <div class="role-icon">📈</div>
                                    <div class="role-title">Marketing Executive</div>
                                    <div class="role-description">Lead generation and campaigns</div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-lg" onclick="app.login()" id="loginBtn" disabled>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateExecDashboardScreen() {
        return `
            <div class="screen active">
                <!-- Live Status Tile -->
                <div class="live-tile">
                    <h3>🔴 Live Status</h3>
                    <p>Now: Visiting ${this.sampleData.liveUpdates.currentVisit}</p>
                </div>
                
                <!-- KPI Cards -->
                <div class="kpi-grid">
                    <div class="kpi-card primary">
                        <div class="kpi-value">5</div>
                        <div class="kpi-label">Today's Assignments</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">₹${this.sampleData.liveUpdates.totalDue.toLocaleString()}</div>
                        <div class="kpi-label">Total Due</div>
                    </div>
                    <div class="kpi-card success">
                        <div class="kpi-value">₹${this.sampleData.liveUpdates.collectedToday.toLocaleString()}</div>
                        <div class="kpi-label">Collected Today</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">${this.sampleData.liveUpdates.reminders}</div>
                        <div class="kpi-label">Reminders</div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Quick Actions</h3>
                    </div>
                    <div class="action-grid">
                        <button class="action-btn btn-success" onclick="app.loadScreen('H-03')">
                            <span class="action-icon">📷</span>
                            <span class="action-text">Start Visit</span>
                        </button>
                        <button class="action-btn btn-primary" onclick="app.showPaymentModal()">
                            <span class="action-icon">💰</span>
                            <span class="action-text">Mark Payment</span>
                        </button>
                        <button class="action-btn btn-warning" onclick="app.loadScreen('H-10')">
                            <span class="action-icon">🚪</span>
                            <span class="action-text">Request Relieve</span>
                        </button>
                        <button class="action-btn btn-secondary" onclick="app.loadScreen('H-04')">
                            <span class="action-icon">📋</span>
                            <span class="action-text">Customer History</span>
                        </button>
                    </div>
                </div>
                
                <!-- Recent Activities -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Activities</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Mr. Suresh Kumar</span>
                            <span class="list-status status-completed">Paid ₹3000</span>
                        </div>
                        <div class="list-details">Cash payment at 10:30 AM</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Mrs. Lakshmi Devi</span>
                            <span class="list-status status-overdue">Overdue 3 days</span>
                        </div>
                        <div class="list-details">₹7500 due, customer not available</div>
                    </div>
                </div>
            </div>
        `;
    }

    generateVisitCaptureScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📷 Start Visit</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <!-- Camera Capture -->
                    <div class="camera-container">
                        <div class="camera-preview" id="cameraPreview">
                            📷
                        </div>
                        <button class="capture-btn" onclick="app.captureSelfie()">
                            📸 Capture Selfie
                        </button>
                    </div>
                    
                    <!-- Visit Form -->
                    <div class="form-group">
                        <label class="form-label">Customer ID</label>
                        <input type="text" class="form-input" placeholder="Enter Customer ID" id="customerId">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Visit Notes</label>
                        <textarea class="form-textarea" placeholder="Enter visit notes..." id="visitNotes"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Payment Mode</label>
                        <select class="form-select" id="paymentMode">
                            <option value="">Select Payment Mode</option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="upi">UPI</option>
                            <option value="none">No Payment</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Amount Collected</label>
                        <input type="number" class="form-input" placeholder="Enter amount" id="amountCollected">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Bounce Reason (if any)</label>
                        <select class="form-select" id="bounceReason">
                            <option value="">Select reason</option>
                            <option value="customer_absent">Customer Absent</option>
                            <option value="insufficient_funds">Insufficient Funds</option>
                            <option value="dispute">Payment Dispute</option>
                            <option value="location_risky">Risky Location</option>
                        </select>
                    </div>
                    
                    <!-- Geolocation -->
                    <div class="form-group">
                        <label class="form-label">📍 Location Stamp</label>
                        <div class="map-container">
                            <button class="btn btn-primary" onclick="app.getCurrentLocation()">
                                📍 Get Current Location
                            </button>
                        </div>
                        <div id="locationInfo" style="display:none;">
                            <small>Lat: <span id="latitude"></span>, Long: <span id="longitude"></span></small>
                        </div>
                    </div>
                    
                    <button class="btn btn-success" onclick="app.submitVisitLog()">
                        ✅ Submit Visit Log
                    </button>
                </div>
            </div>
        `;
    }

    async generateCustomerListScreen() {
        const customers = await db.getCustomers();
        const currentUser = this.currentUser || 'EXEC001';
        
        // Filter customers for current user
        const userCustomers = customers.filter(customer => customer.assignedTo === currentUser);
        
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📋 My Customers (${userCustomers.length} assigned)</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    <div class="customer-stats">
                        <div class="stat-item">
                            <span class="stat-value">${userCustomers.length}</span>
                            <span class="stat-label">Total Customers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">₹${userCustomers.reduce((sum, c) => sum + c.dueAmount, 0).toLocaleString()}</span>
                            <span class="stat-label">Total Due</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${userCustomers.filter(c => c.status === 'pending').length}</span>
                            <span class="stat-label">Pending</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${userCustomers.filter(c => c.status === 'overdue').length}</span>
                            <span class="stat-label">Overdue</span>
                        </div>
                    </div>
                    <div class="customer-list">
                        ${userCustomers.map(customer => `
                            <div class="list-item ${customer.status === 'overdue' ? 'danger' : customer.status === 'collected' ? 'success' : 'warning'}">
                                <div class="list-header">
                                    <span class="list-title">${customer.name}</span>
                                    <span class="list-status status-${customer.status}">${customer.status}</span>
                                </div>
                                <div class="list-details">
                                    <strong>ID:</strong> ${customer.id} | 
                                    <strong>Phone:</strong> ${customer.phone} | 
                                    <strong>Due:</strong> ₹${customer.dueAmount.toLocaleString()} | 
                                    <strong>Installment:</strong> ₹${customer.installmentAmount.toLocaleString()} | 
                                    <strong>Due Date:</strong> ${customer.installmentDate} | 
                                    <strong>Total Paid:</strong> ₹${customer.totalPaid.toLocaleString()}
                                </div>
                                <div class="list-actions">
                                    <button class="btn btn-sm btn-success" onclick="app.markPayment('${customer.id}')">
                                        💰 Mark Payment
                                    </button>
                                    <button class="btn btn-sm btn-warning" onclick="app.requestRelieve('${customer.id}')">
                                        🚪 Relieve
                                    </button>
                                    <button class="btn btn-sm btn-primary" onclick="app.requestSpecialExec('${customer.id}')">
                                        ⭐ Special Exec
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    generateInchargeDashboardScreen() {
        return `
            <div class="screen active">
                <!-- Team Overview -->
                <div class="live-tile">
                    <h3>👥 Incharge Dashboard - Karimnagar</h3>
                    <p>My Team: 8 Executives | Active: 6 | On Break: 2</p>
                </div>
                
                <!-- Team KPIs -->
                <div class="kpi-grid">
                    <div class="kpi-card primary">
                        <div class="kpi-value">8</div>
                        <div class="kpi-label">My Executives</div>
                    </div>
                    <div class="kpi-card success">
                        <div class="kpi-value">₹45,000</div>
                        <div class="kpi-label">Collected Today</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">3</div>
                        <div class="kpi-label">Bounces</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">2</div>
                        <div class="kpi-label">Pending Relieves</div>
                    </div>
                </div>
                
                <!-- Live Executive Status -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔴 Live Executive Status</h3>
                        <span class="live-indicator">LIVE</span>
                    </div>
                    <div class="employee-grid">
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Rajesh Kumar</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Karimnagar</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-active">Meeting Customer</span>
                                <div class="last-update">2 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Priya Sharma</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Karimnagar</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-pending">Pending Visit</span>
                                <div class="last-update">5 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Amit Singh</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Karimnagar</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-active">Payment Collection</span>
                                <div class="last-update">1 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card inactive">
                            <div class="employee-info">
                                <div class="employee-name">Suresh Reddy</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Karimnagar</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-inactive">On Break</span>
                                <div class="last-update">15 min ago</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Team Performance -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">My Team Performance</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Rajesh Kumar</span>
                            <span class="list-status status-active">On Visit</span>
                        </div>
                        <div class="list-details">Visiting Mr. Ram Mohan - ₹5000 due | 3 visits today</div>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Priya Sharma</span>
                            <span class="list-status status-pending">Pending</span>
                        </div>
                        <div class="list-details">5 assignments pending | ₹8000 to collect</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Amit Singh</span>
                            <span class="list-status status-active">Collecting</span>
                        </div>
                        <div class="list-details">₹3000 collected today | 2 more visits</div>
                    </div>
                    <div class="list-item danger">
                        <div class="list-header">
                            <span class="list-title">Suresh Reddy</span>
                            <span class="list-status status-inactive">On Break</span>
                        </div>
                        <div class="list-details">₹12000 pending | 4 assignments overdue</div>
                    </div>
                </div>
                
                <!-- Daily Assignments -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Today's Assignments</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Customer Visits</span>
                            <span class="list-status status-active">12/15</span>
                        </div>
                        <div class="list-details">Completed: 12 | Pending: 3 | Total: 15</div>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Payment Collections</span>
                            <span class="list-status status-active">₹45K/₹75K</span>
                        </div>
                        <div class="list-details">Collected: ₹45,000 | Pending: ₹30,000</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Follow-ups</span>
                            <span class="list-status status-pending">5</span>
                        </div>
                        <div class="list-details">Pending follow-ups for tomorrow</div>
                    </div>
                </div>
                
                <!-- Incharge Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Incharge Actions</h3>
                    </div>
                    <div class="action-grid">
                        <button class="btn btn-primary" onclick="app.assignCustomer()">
                            👤 Assign Customer
                        </button>
                        <button class="btn btn-warning" onclick="app.deploySpecialExec()">
                            ⭐ Deploy Special Exec
                        </button>
                        <button class="btn btn-success" onclick="app.approveRelieves()">
                            ✅ Approve Relieves
                        </button>
                        <button class="btn btn-info" onclick="app.viewTeamReport()">
                            📊 Team Report
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateHODDashboardScreen() {
        return `
            <div class="screen active">
                <!-- Team Overview -->
                <div class="live-tile">
                    <h3>🏢 HOD Dashboard - Telangana Region</h3>
                    <p>My Team: 3 Incharges | 25 Executives | 2 States Coverage</p>
                </div>
                
                <!-- Team KPIs -->
                <div class="kpi-grid">
                    <div class="kpi-card primary">
                        <div class="kpi-value">25</div>
                        <div class="kpi-label">My Executives</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">85%</div>
                        <div class="kpi-label">Team Collection %</div>
                    </div>
                    <div class="kpi-card success">
                        <div class="kpi-value">18</div>
                        <div class="kpi-label">Active Today</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">5</div>
                        <div class="kpi-label">Escalations</div>
                    </div>
                </div>
                
                <!-- Live Team Status -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔴 Live Team Status</h3>
                        <span class="live-indicator">LIVE</span>
                    </div>
                    <div class="employee-grid">
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Rajesh Kumar</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Karimnagar</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-active">Meeting Customer</span>
                                <div class="last-update">2 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Priya Sharma</div>
                                <div class="employee-dept">Verification Executive</div>
                                <div class="employee-location">📍 Hyderabad</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-active">Document Review</span>
                                <div class="last-update">5 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Amit Singh</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Warangal</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-pending">Lead Follow-up</span>
                                <div class="last-update">1 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card inactive">
                            <div class="employee-info">
                                <div class="employee-name">Suresh Reddy</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Nizamabad</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-inactive">Offline</span>
                                <div class="last-update">15 min ago</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Incharge Teams -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">My Incharge Teams</h3>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Suresh Reddy - Karimnagar</span>
                            <span class="list-status status-active">Active</span>
                        </div>
                        <div class="list-details">8 Executives | Collection: 78% | Bounces: 3 | 6 Active</div>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Venkatesh Rao - Warangal</span>
                            <span class="list-status status-active">Active</span>
                        </div>
                        <div class="list-details">7 Executives | Collection: 82% | Bounces: 2 | 5 Active</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Lakshmi Devi - Nizamabad</span>
                            <span class="list-status status-pending">Needs Attention</span>
                        </div>
                        <div class="list-details">6 Executives | Collection: 65% | Bounces: 5 | 3 Active</div>
                    </div>
                </div>
                
                <!-- Department Performance -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">My Department Performance</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Collection Department</span>
                            <span class="list-status status-active">85%</span>
                        </div>
                        <div class="list-details">20 Executives | ₹1.2L Collected | 15 Active</div>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Verification Department</span>
                            <span class="list-status status-active">92%</span>
                        </div>
                        <div class="list-details">3 Executives | 25 Documents Verified | 3 Active</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Marketing Department</span>
                            <span class="list-status status-pending">68%</span>
                        </div>
                        <div class="list-details">2 Executives | 8 Leads Generated | 1 Active</div>
                    </div>
                </div>
                
                <!-- HOD Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">HOD Actions</h3>
                    </div>
                    <div class="action-grid">
                        <button class="btn btn-primary" onclick="app.assignArea()">
                            🗺️ Assign Area
                        </button>
                        <button class="btn btn-warning" onclick="app.escalateToMD()">
                            ⬆️ Escalate to MD
                        </button>
                        <button class="btn btn-success" onclick="app.deploySpecialExec()">
                            ⭐ Deploy Special Exec
                        </button>
                        <button class="btn btn-info" onclick="app.viewTeamReport()">
                            📊 Team Report
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateMDDashboardScreen() {
        return `
            <div class="screen active">
                <!-- Executive Overview -->
                <div class="live-tile">
                    <h3>👑 Managing Director Dashboard</h3>
                    <p>Multi-state Operations | 4 States | 150+ Active Chits | 45+ Employees</p>
                </div>
                
                <!-- High-level KPIs -->
                <div class="kpi-grid">
                    <div class="kpi-card primary">
                        <div class="kpi-value">45</div>
                        <div class="kpi-label">Total Employees</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">₹2.5L</div>
                        <div class="kpi-label">Total Due</div>
                    </div>
                    <div class="kpi-card success">
                        <div class="kpi-value">78%</div>
                        <div class="kpi-label">Collection Rate</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">8</div>
                        <div class="kpi-label">Open Escalations</div>
                    </div>
                </div>
                
                <!-- Live Employee Status -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔴 Live Employee Status</h3>
                        <span class="live-indicator">LIVE</span>
                    </div>
                    <div class="employee-grid">
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Rajesh Kumar</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Karimnagar</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-active">Meeting Customer</span>
                                <div class="last-update">2 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Priya Sharma</div>
                                <div class="employee-dept">Verification Executive</div>
                                <div class="employee-location">📍 Hyderabad</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-active">Document Review</span>
                                <div class="last-update">5 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card active">
                            <div class="employee-info">
                                <div class="employee-name">Amit Singh</div>
                                <div class="employee-dept">Marketing Executive</div>
                                <div class="employee-location">📍 Warangal</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-pending">Lead Follow-up</span>
                                <div class="last-update">1 min ago</div>
                            </div>
                        </div>
                        <div class="employee-card inactive">
                            <div class="employee-info">
                                <div class="employee-name">Suresh Reddy</div>
                                <div class="employee-dept">Collection Executive</div>
                                <div class="employee-location">📍 Nizamabad</div>
                            </div>
                            <div class="employee-status">
                                <span class="status-badge status-inactive">Offline</span>
                                <div class="last-update">15 min ago</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Department-wise Performance -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Department Performance</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Collection Department</span>
                            <span class="list-status status-active">85%</span>
                        </div>
                        <div class="list-details">25 Executives | ₹1.8L Collected | 12 Active</div>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Verification Department</span>
                            <span class="list-status status-active">92%</span>
                        </div>
                        <div class="list-details">8 Executives | 45 Documents Verified | 7 Active</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Marketing Department</span>
                            <span class="list-status status-pending">68%</span>
                        </div>
                        <div class="list-details">6 Executives | 12 Leads Generated | 4 Active</div>
                    </div>
                    <div class="list-item info">
                        <div class="list-header">
                            <span class="list-title">Management Team</span>
                            <span class="list-status status-active">100%</span>
                        </div>
                        <div class="list-details">6 HODs/Incharges | All Active | 3 States Covered</div>
                    </div>
                </div>
                
                <!-- State-wise Performance -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">State-wise Performance</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Telangana</span>
                            <span class="list-status status-active">85%</span>
                        </div>
                        <div class="list-details">45 Chits | ₹1.2L Due | 12 Executives | 2 HODs</div>
                    </div>
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Andhra Pradesh</span>
                            <span class="list-status status-active">72%</span>
                        </div>
                        <div class="list-details">38 Chits | ₹80K Due | 8 Executives | 1 HOD</div>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Karnataka</span>
                            <span class="list-status status-pending">68%</span>
                        </div>
                        <div class="list-details">35 Chits | ₹50K Due | 6 Executives | 1 HOD</div>
                    </div>
                </div>
                
                <!-- Executive Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Executive Actions</h3>
                    </div>
                    <div class="action-grid">
                        <button class="btn btn-primary" onclick="app.viewAuditLog()">
                            📋 View Audit Log
                        </button>
                        <button class="btn btn-warning" onclick="app.approveSpecialExecAllocation()">
                            ⭐ Approve Special Executive
                        </button>
                        <button class="btn btn-success" onclick="app.exportConsolidatedReport()">
                            📊 Export Report
                        </button>
                        <button class="btn btn-info" onclick="app.viewAllEmployees()">
                            👥 View All Employees
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateHierarchyVisualScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🏢 Collection Hierarchy</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="hierarchy-tree">
                        <!-- MD Level -->
                        <div class="hierarchy-node" onclick="app.loadScreen('H-07')">
                            <div class="list-header">
                                <span class="list-title">👑 Penta Srinivas (MD)</span>
                                <span class="list-status status-active">Managing Director</span>
                            </div>
                            <div class="list-details">All States | 150+ Chits | ₹2.5L Due</div>
                        </div>
                        
                        <div class="hierarchy-connector"></div>
                        
                        <!-- HOD Level -->
                        <div class="hierarchy-node" onclick="app.loadScreen('H-06')">
                            <div class="list-header">
                                <span class="list-title">🏢 Venkatesh Rao (HOD)</span>
                                <span class="list-status status-active">Head of Department</span>
                            </div>
                            <div class="list-details">Telangana Region | 3 Incharges | 25 Executives</div>
                        </div>
                        
                        <div class="hierarchy-connector"></div>
                        
                        <!-- Incharge Level -->
                        <div class="hierarchy-node" onclick="app.loadScreen('H-05')">
                            <div class="list-header">
                                <span class="list-title">👨‍💼 Suresh Reddy (Incharge)</span>
                                <span class="list-status status-active">Collection Incharge</span>
                            </div>
                            <div class="list-details">Karimnagar Area | 8 Executives | ₹75K Due</div>
                        </div>
                        
                        <div class="hierarchy-connector"></div>
                        
                        <!-- Executive Level -->
                        <div class="hierarchy-node" onclick="app.loadScreen('H-02')">
                            <div class="list-header">
                                <span class="list-title">📋 Rajesh Kumar (Executive)</span>
                                <span class="list-status status-active">Collection Executive</span>
                            </div>
                            <div class="list-details">Karimnagar North | 5 Assignments | ₹25K Due</div>
                        </div>
                    </div>
                    
                    <div class="mt-20">
                        <button class="btn btn-primary" onclick="app.loadScreen('H-14')">
                            🗺️ View Area Assignments
                        </button>
                        <button class="btn btn-secondary" onclick="app.loadScreen('H-21')">
                            📊 View Performance Analytics
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateAssignCustomerScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔄 Assign Customer</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-05')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select Customer(s)</label>
                        <select class="form-select" id="customerSelect" multiple>
                            <option value="CUST001">Mr. Ram Mohan - ₹5000</option>
                            <option value="CUST002">Mrs. Lakshmi Devi - ₹7500</option>
                            <option value="CUST003">Mr. Suresh Kumar - ₹3000</option>
                            <option value="CUST004">Mrs. Geeta Reddy - ₹4500</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Assign to Executive</label>
                        <select class="form-select" id="execSelect">
                            <option value="">Select Executive</option>
                            <option value="EXEC001">Rajesh Kumar - Karimnagar North</option>
                            <option value="EXEC002">Priya Sharma - Karimnagar South</option>
                            <option value="EXEC003">Suresh Kumar - Karimnagar East</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Area Filter</label>
                        <select class="form-select" id="areaFilter">
                            <option value="">All Areas</option>
                            <option value="north">Karimnagar North</option>
                            <option value="south">Karimnagar South</option>
                            <option value="east">Karimnagar East</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Urgency Level</label>
                        <select class="form-select" id="urgencyLevel">
                            <option value="normal">Normal</option>
                            <option value="priority">Priority</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Assignment Note</label>
                        <textarea class="form-textarea" placeholder="Add assignment notes..." id="assignmentNote"></textarea>
                    </div>
                    
                    <button class="btn btn-success" onclick="app.confirmAssignment()">
                        ✅ Confirm Assignment
                    </button>
                </div>
            </div>
        `;
    }

    generateRequestRelieveScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🚪 Request Relieve</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select Customer</label>
                        <select class="form-select" id="relieveCustomerSelect">
                            <option value="">Select Customer</option>
                            <option value="CUST001">Mr. Ram Mohan - ₹5000</option>
                            <option value="CUST002">Mrs. Lakshmi Devi - ₹7500</option>
                            <option value="CUST003">Mr. Suresh Kumar - ₹3000</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Reason for Relieve</label>
                        <select class="form-select" id="relieveReason">
                            <option value="">Select Reason</option>
                            <option value="customer_absent">Customer Absent</option>
                            <option value="risky_location">Risky Location</option>
                            <option value="family_emergency">Family Emergency</option>
                            <option value="payment_dispute">Payment Dispute</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Additional Details</label>
                        <textarea class="form-textarea" placeholder="Provide additional details..." id="relieveDetails"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Expected Approval Time</label>
                        <div class="card">
                            <p><strong>⏱️ SLA:</strong> 2 hours for normal requests</p>
                            <p><strong>📧 Notification:</strong> Incharge will be notified immediately</p>
                            <p><strong>🔄 Status:</strong> Will be updated in real-time</p>
                        </div>
                    </div>
                    
                    <button class="btn btn-warning" onclick="app.submitRelieveRequest()">
                        📤 Submit Relieve Request
                    </button>
                </div>
            </div>
        `;
    }

    generateDeploySpecialExecScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⭐ Deploy Special Executive</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-05')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Available Special Executives</label>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">Special Exec - Rajesh</span>
                                <span class="list-status status-active">Available</span>
                            </div>
                            <div class="list-details">ETA: 30 mins | Experience: 5 years</div>
                        </div>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">Special Exec - Priya</span>
                                <span class="list-status status-active">Available</span>
                            </div>
                            <div class="list-details">ETA: 45 mins | Experience: 3 years</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Assignment Confirmation</label>
                        <div class="card">
                            <p><strong>📋 Customer:</strong> Mr. Ram Mohan</p>
                            <p><strong>💰 Amount:</strong> ₹5000</p>
                            <p><strong>📍 Location:</strong> Karimnagar North</p>
                            <p><strong>⏰ ETA:</strong> 30 minutes</p>
                        </div>
                    </div>
                    
                    <button class="btn btn-success" onclick="app.confirmSpecialExecDeployment()">
                        ✅ Deploy Special Executive
                    </button>
                </div>
            </div>
        `;
    }

    generateVerificationDashboardScreen() {
        return `
            <div class="screen active">
                <div class="live-tile">
                    <h3>🔍 Verification Status</h3>
                    <p>Pending: 5 | Verified: 12 | Rejected: 2</p>
                </div>
                
                <div class="kpi-grid">
                    <div class="kpi-card primary">
                        <div class="kpi-value">5</div>
                        <div class="kpi-label">Pending Verification</div>
                    </div>
                    <div class="kpi-card success">
                        <div class="kpi-value">12</div>
                        <div class="kpi-label">Verified Today</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">2</div>
                        <div class="kpi-label">Rejected</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">1</div>
                        <div class="kpi-label">Escalated</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Verification Assignments</h3>
                    </div>
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Mr. Suresh Kumar</span>
                            <span class="list-status status-pending">Pending</span>
                        </div>
                        <div class="list-details">Documents: Aadhaar, PAN, Address Proof</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-success" onclick="app.markVerified()">
                                ✅ Mark Verified
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="app.markRejected()">
                                ❌ Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateMarketingDashboardScreen() {
        return `
            <div class="screen active">
                <div class="live-tile">
                    <h3>📈 Marketing Performance</h3>
                    <p>Leads: 15 | Conversions: 8 | Revenue: ₹45K</p>
                </div>
                
                <div class="kpi-grid">
                    <div class="kpi-card primary">
                        <div class="kpi-value">15</div>
                        <div class="kpi-label">Leads Captured</div>
                    </div>
                    <div class="kpi-card success">
                        <div class="kpi-value">8</div>
                        <div class="kpi-label">New Subscribers</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">₹45K</div>
                        <div class="kpi-label">Revenue Generated</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">53%</div>
                        <div class="kpi-label">Conversion Rate</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Quick Actions</h3>
                    </div>
                    <button class="btn btn-primary" onclick="app.addNewLead()">
                        ➕ Add New Lead
                    </button>
                    <button class="btn btn-success" onclick="app.trackConversion()">
                        📊 Track Conversion
                    </button>
                    <button class="btn btn-warning" onclick="app.runCampaign()">
                        🎯 Run Campaign
                    </button>
                </div>
            </div>
        `;
    }

    generateAreaAssignmentScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🗺️ Area Assignment</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-06')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select State</label>
                        <select class="form-select" id="stateSelect">
                            <option value="telangana">Telangana</option>
                            <option value="andhra">Andhra Pradesh</option>
                            <option value="karnataka">Karnataka</option>
                        </select>
                    </div>
                    
                    <div class="map-container">
                        <p>🗺️ Interactive Map View</p>
                        <small>Tap areas to assign to Incharges/Executives</small>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Current Workload</label>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">Karimnagar North</span>
                                <span class="list-status status-active">8 Executives</span>
                            </div>
                            <div class="list-details">Workload: Medium | Collection: 78%</div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="app.autoBalanceAssignments()">
                        ⚖️ Auto-balance Assignments
                    </button>
                </div>
            </div>
        `;
    }

    generateDailyReportScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📊 Daily Report Entry</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Customers Visited</label>
                        <input type="number" class="form-input" placeholder="Enter number of customers visited" id="customersVisited">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Amount Collected - Cash</label>
                        <input type="number" class="form-input" placeholder="Enter cash amount" id="cashCollected">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Amount Collected - Cheque</label>
                        <input type="number" class="form-input" placeholder="Enter cheque amount" id="chequeCollected">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Amount Collected - UPI</label>
                        <input type="number" class="form-input" placeholder="Enter UPI amount" id="upiCollected">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Bounce Count</label>
                        <input type="number" class="form-input" placeholder="Enter number of bounces" id="bounceCount">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Pending Due</label>
                        <input type="number" class="form-input" placeholder="Enter pending due amount" id="pendingDue">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Next Action</label>
                        <textarea class="form-textarea" placeholder="Describe next action plan" id="nextAction"></textarea>
                    </div>
                    
                    <div class="d-flex gap-10">
                        <button class="btn btn-success" onclick="app.submitDayReport()">
                            📤 Submit Day Report
                        </button>
                        <button class="btn btn-secondary" onclick="app.saveDraft()">
                            💾 Save Draft
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateDailySummaryScreen() {
        return `
            <div class="screen active">
                <div class="live-tile">
                    <h3>📊 Daily Summary Rollup</h3>
                    <p>Team Performance: 85% Collection Rate</p>
                </div>
                
                <div class="kpi-grid">
                    <div class="kpi-card success">
                        <div class="kpi-value">₹45K</div>
                        <div class="kpi-label">Cash Collected</div>
                    </div>
                    <div class="kpi-card primary">
                        <div class="kpi-value">₹25K</div>
                        <div class="kpi-label">Cheque Collected</div>
                    </div>
                    <div class="kpi-card warning">
                        <div class="kpi-value">₹15K</div>
                        <div class="kpi-label">UPI Collected</div>
                    </div>
                    <div class="kpi-card danger">
                        <div class="kpi-value">5</div>
                        <div class="kpi-label">Bounce Count</div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Team Summary</h3>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Rajesh Kumar</span>
                            <span class="list-status status-completed">₹12K Collected</span>
                        </div>
                        <div class="list-details">8 visits | 6 payments | 2 bounces</div>
                    </div>
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Priya Sharma</span>
                            <span class="list-status status-completed">₹15K Collected</span>
                        </div>
                        <div class="list-details">10 visits | 8 payments | 1 bounce</div>
                    </div>
                </div>
                
                <div class="d-flex gap-10">
                    <button class="btn btn-primary" onclick="app.exportCSV()">
                        📊 Export CSV
                    </button>
                    <button class="btn btn-warning" onclick="app.flagHighBounce()">
                        🚩 Flag High-bounce
                    </button>
                    <button class="btn btn-secondary" onclick="app.messageTeam()">
                        💬 Message Team
                    </button>
                </div>
            </div>
        `;
    }

    generateNotificationsScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔔 Live Notifications & Reminders</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Upcoming Installment</span>
                            <span class="list-status status-pending">Due in 2 hours</span>
                        </div>
                        <div class="list-details">Mr. Ram Mohan - ₹5000 due at 2:00 PM</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-primary" onclick="app.callCustomer()">📞 Call</button>
                            <button class="btn btn-sm btn-success" onclick="app.navigateToCustomer()">🗺️ Navigate</button>
                        </div>
                    </div>
                    
                    <div class="list-item danger">
                        <div class="list-header">
                            <span class="list-title">Overdue Payment</span>
                            <span class="list-status status-overdue">3 days overdue</span>
                        </div>
                        <div class="list-details">Mrs. Lakshmi Devi - ₹7500 overdue since Jan 10</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-warning" onclick="app.markDone()">✅ Mark Done</button>
                        </div>
                    </div>
                    
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">Reassign Approval</span>
                            <span class="list-status status-pending">Pending approval</span>
                        </div>
                        <div class="list-details">Customer CUST003 reassignment request</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-success" onclick="app.approveReassign()">✅ Approve</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateBounceManagementScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🚫 Bounce Management</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-06')">← Back</button>
                    </div>
                    
                    <div class="list-item danger">
                        <div class="list-header">
                            <span class="list-title">Mrs. Lakshmi Devi</span>
                            <span class="list-status status-overdue">3 Bounces</span>
                        </div>
                        <div class="list-details">
                            <p><strong>Amount:</strong> ₹7500</p>
                            <p><strong>Reason:</strong> Insufficient Funds</p>
                            <p><strong>Last Bounce:</strong> Jan 12, 2024</p>
                        </div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-warning" onclick="app.transferToRecovery()">
                                🔄 Transfer to Recovery
                            </button>
                        </div>
                    </div>
                    
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Mr. Suresh Kumar</span>
                            <span class="list-status status-pending">2 Bounces</span>
                        </div>
                        <div class="list-details">
                            <p><strong>Amount:</strong> ₹3000</p>
                            <p><strong>Reason:</strong> Account Closed</p>
                            <p><strong>Last Bounce:</strong> Jan 11, 2024</p>
                        </div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-primary" onclick="app.contactCustomer()">
                                📞 Contact Customer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateCustomerDetailScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">👤 Customer Detail</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-04')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Customer Profile</label>
                        <div class="card">
                            <p><strong>Name:</strong> Mr. Ram Mohan</p>
                            <p><strong>ID:</strong> CUST001</p>
                            <p><strong>Phone:</strong> +91 98765 43210</p>
                            <p><strong>Address:</strong> Karimnagar North, Telangana</p>
                            <p><strong>Assigned Exec:</strong> Rajesh Kumar</p>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Chit Memberships</label>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">Chit #CH001</span>
                                <span class="list-status status-active">Active</span>
                            </div>
                            <div class="list-details">Amount: ₹5000 | Installment: Monthly</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Payment History</label>
                        <div class="list-item success">
                            <div class="list-header">
                                <span class="list-title">Jan 10, 2024</span>
                                <span class="list-status status-completed">₹5000 Paid</span>
                            </div>
                            <div class="list-details">Cash | Selfie + Geo captured</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Outstanding Dues</label>
                        <div class="card">
                            <p><strong>Current Due:</strong> ₹5000</p>
                            <p><strong>Due Date:</strong> Jan 15, 2024</p>
                            <p><strong>Days Overdue:</strong> 0</p>
                        </div>
                    </div>
                    
                    <div class="d-flex gap-10">
                        <button class="btn btn-success" onclick="app.markPayment()">
                            💰 Mark Payment
                        </button>
                        <button class="btn btn-warning" onclick="app.requestRelieve()">
                            🚪 Request Relieve
                        </button>
                        <button class="btn btn-primary" onclick="app.reassign()">
                            🔄 Reassign
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateEscalationsScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📈 Escalations & SLA Tracker</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-06')">← Back</button>
                    </div>
                    
                    <div class="list-item danger">
                        <div class="list-header">
                            <span class="list-title">High Priority - Mrs. Lakshmi Devi</span>
                            <span class="list-status status-overdue">SLA: 2 hours</span>
                        </div>
                        <div class="list-details">
                            <p><strong>Issue:</strong> 3 consecutive bounces</p>
                            <p><strong>Amount:</strong> ₹7500</p>
                            <p><strong>Actions Taken:</strong> 2 calls, 1 visit</p>
                        </div>
                    </div>
                    
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Medium Priority - Mr. Suresh Kumar</span>
                            <span class="list-status status-pending">SLA: 4 hours</span>
                        </div>
                        <div class="list-details">
                            <p><strong>Issue:</strong> Customer not available</p>
                            <p><strong>Amount:</strong> ₹3000</p>
                            <p><strong>Actions Taken:</strong> 1 call, 0 visits</p>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Heatmap - Collection Rates by Area</label>
                        <div class="chart-container">
                            <div class="chart-placeholder">
                                📊 Collection Rate Heatmap
                                <br><small>Karimnagar North: 78% | South: 85% | East: 72%</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generatePerformanceAnalyticsScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📊 Performance & Analytics</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-06')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Collection by State</label>
                        <div class="chart-container">
                            <div class="chart-placeholder">
                                📈 Collection Rate Chart
                                <br><small>Telangana: 85% | Andhra: 72% | Karnataka: 68%</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Payment Mode Distribution</label>
                        <div class="chart-container">
                            <div class="chart-placeholder">
                                🥧 Payment Mode Pie Chart
                                <br><small>Cash: 60% | UPI: 25% | Cheque: 15%</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Executive Leaderboard</label>
                        <div class="list-item success">
                            <div class="list-header">
                                <span class="list-title">1. Rajesh Kumar</span>
                                <span class="list-status status-completed">₹45K</span>
                            </div>
                            <div class="list-details">Collection Rate: 92% | 15 customers</div>
                        </div>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">2. Priya Sharma</span>
                                <span class="list-status status-completed">₹38K</span>
                            </div>
                            <div class="list-details">Collection Rate: 88% | 12 customers</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Date Range & Filters</label>
                        <div class="d-flex gap-10">
                            <select class="form-select">
                                <option value="7days">Last 7 days</option>
                                <option value="30days">Last 30 days</option>
                                <option value="90days">Last 90 days</option>
                            </select>
                            <button class="btn btn-primary" onclick="app.exportPDF()">
                                📄 Export PDF
                            </button>
                            <button class="btn btn-secondary" onclick="app.exportCSV()">
                                📊 Export CSV
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateAuditLogScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📋 Audit Log & Visit Proofs</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Search Filters</label>
                        <div class="d-flex gap-10">
                            <input type="text" class="form-input" placeholder="Customer ID" id="searchCustomer">
                            <input type="text" class="form-input" placeholder="Executive ID" id="searchExec">
                            <input type="date" class="form-input" id="searchDate">
                        </div>
                    </div>
                    
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">Visit #V001 - Mr. Ram Mohan</span>
                            <span class="list-status status-completed">✅ Verified</span>
                        </div>
                        <div class="list-details">
                            <p><strong>Executive:</strong> Rajesh Kumar</p>
                            <p><strong>Time:</strong> Jan 12, 2024 10:30 AM</p>
                            <p><strong>Location:</strong> 18.4386, 79.1288</p>
                            <p><strong>Selfie:</strong> ✅ Captured | <strong>Geo:</strong> ✅ Verified</p>
                        </div>
                    </div>
                    
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">Visit #V002 - Mrs. Lakshmi Devi</span>
                            <span class="list-status status-pending">⏳ Pending Review</span>
                        </div>
                        <div class="list-details">
                            <p><strong>Executive:</strong> Priya Sharma</p>
                            <p><strong>Time:</strong> Jan 12, 2024 2:15 PM</p>
                            <p><strong>Location:</strong> 18.4350, 79.1300</p>
                            <p><strong>Selfie:</strong> ✅ Captured | <strong>Geo:</strong> ⚠️ Review Required</p>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="app.downloadAuditReport()">
                        📥 Download Audit Report
                    </button>
                </div>
            </div>
        `;
    }

    generateAssignWithdrawScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔄 Assign/Withdraw Responsibility</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-06')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select Customer</label>
                        <select class="form-select" id="assignCustomerSelect">
                            <option value="CUST001">Mr. Ram Mohan - Currently: Rajesh Kumar</option>
                            <option value="CUST002">Mrs. Lakshmi Devi - Currently: Priya Sharma</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Action Type</label>
                        <select class="form-select" id="actionType">
                            <option value="reassign">Reassign to Different Executive</option>
                            <option value="withdraw">Temporarily Withdraw</option>
                            <option value="escalate">Escalate to Special Executive</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Reason Code</label>
                        <select class="form-select" id="reasonCode">
                            <option value="performance">Performance Issues</option>
                            <option value="workload">Workload Management</option>
                            <option value="escalation">Escalation Required</option>
                            <option value="customer_request">Customer Request</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Comments</label>
                        <textarea class="form-textarea" placeholder="Add detailed comments for compliance..." id="assignComments"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Audit Note</label>
                        <div class="card">
                            <p><strong>⚠️ Compliance Note:</strong> This action will be logged for audit purposes.</p>
                            <p><strong>📋 Required:</strong> Reason code and detailed comments</p>
                            <p><strong>🔒 Access:</strong> HOD/MD approval required for sensitive cases</p>
                        </div>
                    </div>
                    
                    <button class="btn btn-warning" onclick="app.confirmAssignWithdraw()">
                        🔄 Confirm Assignment Change
                    </button>
                </div>
            </div>
        `;
    }

    generateMultiStateScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🌍 Multi-state Operations</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-07')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select State</label>
                        <select class="form-select" id="stateDropdown" onchange="app.loadStateData(this.value)">
                            <option value="telangana">Telangana</option>
                            <option value="andhra">Andhra Pradesh</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="tamilnadu">Tamil Nadu</option>
                        </select>
                    </div>
                    
                    <div class="kpi-grid">
                        <div class="kpi-card primary">
                            <div class="kpi-value">45</div>
                            <div class="kpi-label">Active Chits</div>
                        </div>
                        <div class="kpi-card success">
                            <div class="kpi-value">85%</div>
                            <div class="kpi-label">Collection %</div>
                        </div>
                        <div class="kpi-card warning">
                            <div class="kpi-value">₹1.2L</div>
                            <div class="kpi-label">Pending Dues</div>
                        </div>
                        <div class="kpi-card danger">
                            <div class="kpi-value">12</div>
                            <div class="kpi-label">Team Performance</div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Quick Actions</h3>
                        </div>
                        <button class="btn btn-primary" onclick="app.sendMessageToState()">
                            💬 Send Message to All in State
                        </button>
                        <button class="btn btn-warning" onclick="app.deployAdditionalResources()">
                            🚀 Deploy Additional Resources
                        </button>
                        <button class="btn btn-success" onclick="app.generateStateReport()">
                            📊 Generate State Report
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateLiveTilesDemoScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔄 Live Tiles & Polling Demo</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="card">
                        <h4>📡 Live Update Simulation</h4>
                        <p><strong>Standard Mode:</strong> 5-second polling simulation</p>
                        <p><strong>Premium Mode:</strong> WebSocket real-time updates</p>
                        <p><strong>Demo Events:</strong> Simulated customer visits, payments, and status changes</p>
                    </div>
                    
                    <div class="live-tile">
                        <h3>🔴 Live Status (Auto-updating)</h3>
                        <p id="liveStatus">Now: Visiting Mr. Ram Mohan - Due ₹5000</p>
                        <small>Last updated: <span id="lastUpdate">${new Date().toLocaleTimeString()}</span></small>
                    </div>
                    
                    <div class="kpi-grid">
                        <div class="kpi-card primary">
                            <div class="kpi-value" id="liveAssignments">5</div>
                            <div class="kpi-label">Live Assignments</div>
                        </div>
                        <div class="kpi-card success">
                            <div class="kpi-value" id="liveCollected">₹12,500</div>
                            <div class="kpi-label">Live Collected</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Simulation Controls</label>
                        <div class="d-flex gap-10">
                            <button class="btn btn-success" onclick="app.startSimulation()">
                                ▶️ Start Simulation
                            </button>
                            <button class="btn btn-warning" onclick="app.pauseSimulation()">
                                ⏸️ Pause
                            </button>
                            <button class="btn btn-danger" onclick="app.stopSimulation()">
                                ⏹️ Stop
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateSettingsRemindersScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⚙️ Settings - Reminders & Escalation</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-06')">← Back</button>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Reminder Cadence (Days before due)</label>
                        <input type="number" class="form-input" placeholder="3" id="reminderDays" value="3">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Escalation Thresholds</label>
                        <div class="card">
                            <p><strong>Missed Installments:</strong> <input type="number" value="3" class="form-input" style="width: 60px; display: inline;"> days</p>
                            <p><strong>Bounce Count:</strong> <input type="number" value="2" class="form-input" style="width: 60px; display: inline;"> times</p>
                            <p><strong>Collection Rate:</strong> <input type="number" value="70" class="form-input" style="width: 60px; display: inline;"> %</p>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Auto-deploy Special Executive Rules</label>
                        <div class="form-group">
                            <label><input type="checkbox" checked> Auto-deploy after 3 failed attempts</label>
                        </div>
                        <div class="form-group">
                            <label><input type="checkbox" checked> Notify MD for cross-area deployment</label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Notification Templates</label>
                        <textarea class="form-textarea" placeholder="Enter notification template..." id="notificationTemplate">
Dear Executive,

Customer {customer_name} has an upcoming installment of ₹{amount} due on {due_date}.

Please ensure timely collection.

Best regards,
Management
                        </textarea>
                    </div>
                    
                    <button class="btn btn-success" onclick="app.saveSettings()">
                        💾 Save Settings
                    </button>
                </div>
            </div>
        `;
    }

    generateQuickActionsScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⚡ Quick Actions Panel</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="card">
                        <h4>📱 One-thumb Mobile Design</h4>
                        <p>Floating quick actions designed for easy thumb access on mobile devices.</p>
                    </div>
                    
                    <div class="kpi-grid">
                        <button class="btn btn-primary" onclick="app.quickCall()">
                            📞 Call Customer
                        </button>
                        <button class="btn btn-success" onclick="app.quickNavigate()">
                            🗺️ Navigate
                        </button>
                        <button class="btn btn-warning" onclick="app.quickCapture()">
                            📷 Capture Visit
                        </button>
                        <button class="btn btn-danger" onclick="app.quickPayment()">
                            💰 Add Payment
                        </button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Recent Quick Actions</h3>
                        </div>
                        <div class="list-item success">
                            <div class="list-header">
                                <span class="list-title">📞 Called Mr. Ram Mohan</span>
                                <span class="list-status status-completed">2 min ago</span>
                            </div>
                        </div>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">📷 Captured Visit</span>
                                <span class="list-status status-completed">15 min ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateTrainingSOPsScreen() {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📚 Training & SOPs</h3>
                        <button class="btn btn-sm btn-secondary" onclick="app.loadScreen('H-02')">← Back</button>
                    </div>
                    
                    <div class="list-item primary">
                        <div class="list-header">
                            <span class="list-title">📷 How to Capture Selfie & Geostamp</span>
                            <span class="list-status status-active">Video Guide</span>
                        </div>
                        <div class="list-details">5-minute tutorial on proper selfie and location capture</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-primary" onclick="app.playVideo('selfie')">
                                ▶️ Play Video
                            </button>
                        </div>
                    </div>
                    
                    <div class="list-item success">
                        <div class="list-header">
                            <span class="list-title">🛡️ Safety Guidelines for Collection</span>
                            <span class="list-status status-active">PDF Guide</span>
                        </div>
                        <div class="list-details">Comprehensive safety guidelines and best practices</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-success" onclick="app.openPDF('safety')">
                                📄 Open PDF
                            </button>
                        </div>
                    </div>
                    
                    <div class="list-item warning">
                        <div class="list-header">
                            <span class="list-title">✅ Verification Checklist</span>
                            <span class="list-status status-active">Interactive</span>
                        </div>
                        <div class="list-details">Step-by-step verification process checklist</div>
                        <div class="list-actions">
                            <button class="btn btn-sm btn-warning" onclick="app.openChecklist()">
                                📋 Open Checklist
                            </button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">📊 Training Progress</h3>
                        </div>
                        <div class="list-item success">
                            <div class="list-header">
                                <span class="list-title">Selfie & Geo Training</span>
                                <span class="list-status status-completed">Completed</span>
                            </div>
                            <div class="list-details">Completed on Jan 10, 2024 | Score: 95%</div>
                        </div>
                        <div class="list-item primary">
                            <div class="list-header">
                                <span class="list-title">Safety Guidelines</span>
                                <span class="list-status status-pending">In Progress</span>
                            </div>
                            <div class="list-details">Progress: 60% | Due: Jan 20, 2024</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateDefaultScreen(screenData) {
        return `
            <div class="screen active">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">${screenData.title}</h3>
                        <span class="role-indicator">${screenData.role}</span>
                    </div>
                    <p>Screen content for ${screenData.title} will be implemented here.</p>
                    <button class="btn btn-primary" onclick="app.loadScreen('H-01')">
                        🏠 Back to Role Select
                    </button>
                </div>
            </div>
        `;
    }

    // Event Handlers
    selectRole(role) {
        this.currentRole = role;
        document.getElementById('currentRole').textContent = role.split(' ')[0];
        
        // Remove selected class from all role cards
        document.querySelectorAll('.role-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked role card
        const selectedCard = document.querySelector(`[data-role="${role}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // Enable login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.disabled = false;
        }
    }

    login() {
        const employeeId = document.getElementById('employeeId').value;
        if (!employeeId) {
            this.showNotification('Please enter Employee ID', 'warning');
            return;
        }
        
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            
            // Navigate to appropriate dashboard based on role
            let targetScreen = 'H-02'; // Default to Collection Executive
            switch(this.currentRole) {
                case 'Collection Executive':
                    targetScreen = 'H-02';
                    break;
                case 'Incharge':
                    targetScreen = 'H-05';
                    break;
                case 'HOD':
                    targetScreen = 'H-06';
                    break;
                case 'Managing Director':
                    targetScreen = 'H-07';
                    break;
                case 'Verification Executive':
                    targetScreen = 'H-12';
                    break;
                case 'Marketing Executive':
                    targetScreen = 'H-13';
                    break;
            }
            
            this.loadScreen(targetScreen);
            this.showNotification(`Welcome ${this.currentRole}! Demo mode active.`, 'success');
        }, 1500);
    }

    showDemoInfo() {
        // Logo click - no action needed for professional look
    }

    logout() {
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            this.loadScreen('H-01');
            this.showNotification('Logged out successfully!', 'success');
        }, 1000);
    }

    // Verification Executive functions
    markVerified() {
        this.showNotification('Customer marked as verified!', 'success');
    }

    markRejected() {
        this.showNotification('Customer marked as rejected!', 'warning');
    }

    // Marketing Executive functions
    generateLead() {
        this.showModal('addLeadModal');
    }

    trackConversion() {
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            this.showNotification('📊 Conversion tracked successfully!', 'success');
        }, 1000);
    }

    runCampaign() {
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            this.showNotification('🎯 Marketing campaign launched!', 'success');
        }, 1500);
    }

    // Modal functions
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    // Form submission handlers
    setupFormHandlers() {
        // Add Lead Form
        const addLeadForm = document.getElementById('addLeadForm');
        if (addLeadForm) {
            addLeadForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const leadData = {
                    name: document.getElementById('leadName').value,
                    phone: document.getElementById('leadPhone').value,
                    email: document.getElementById('leadEmail').value,
                    source: document.getElementById('leadSource').value,
                    notes: document.getElementById('leadNotes').value
                };
                
                this.showLoading(true);
                try {
                    const newLead = await db.addLead(leadData);
                    this.showLoading(false);
                    this.closeModal('addLeadModal');
                    this.showNotification(`✅ Lead added: ${newLead.name} (ID: ${newLead.id})`, 'success');
                    addLeadForm.reset();
                    // Refresh the current screen to show updated data
                    this.loadScreen(this.currentScreen);
                } catch (error) {
                    this.showLoading(false);
                    this.showNotification('❌ Error adding lead', 'error');
                }
            });
        }

        // Mark Payment Form
        const markPaymentForm = document.getElementById('markPaymentForm');
        if (markPaymentForm) {
            markPaymentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const paymentData = {
                    customerId: document.getElementById('paymentCustomerId').value,
                    amount: parseFloat(document.getElementById('paymentAmount').value),
                    mode: document.getElementById('paymentMode').value,
                    reference: document.getElementById('paymentRef').value,
                    notes: document.getElementById('paymentNotes').value,
                    collectedBy: this.currentUser || 'Current User'
                };
                
                this.showLoading(true);
                try {
                    const newPayment = await db.addPayment(paymentData);
                    this.showLoading(false);
                    this.closeModal('markPaymentModal');
                    this.showNotification(`💰 Payment recorded: ₹${newPayment.amount} (ID: ${newPayment.id})`, 'success');
                    markPaymentForm.reset();
                    // Refresh the current screen to show updated data
                    this.loadScreen(this.currentScreen);
                } catch (error) {
                    this.showLoading(false);
                    this.showNotification('❌ Error recording payment', 'error');
                }
            });
        }

        // Assign Customer Form
        const assignCustomerForm = document.getElementById('assignCustomerForm');
        if (assignCustomerForm) {
            assignCustomerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const assignData = {
                    customerId: document.getElementById('assignCustomerId').value,
                    executive: document.getElementById('assignExecutive').value,
                    priority: document.getElementById('assignPriority').value,
                    dueDate: document.getElementById('assignDueDate').value,
                    instructions: document.getElementById('assignInstructions').value,
                    assignedBy: this.currentUser || 'Current User'
                };
                
                this.showLoading(true);
                try {
                    const newAssignment = await db.assignCustomer(assignData);
                    this.showLoading(false);
                    this.closeModal('assignCustomerModal');
                    this.showNotification(`👤 Customer ${newAssignment.customerId} assigned to ${newAssignment.executive} (ID: ${newAssignment.id})`, 'success');
                    assignCustomerForm.reset();
                    // Refresh the current screen to show updated data
                    this.loadScreen(this.currentScreen);
                } catch (error) {
                    this.showLoading(false);
                    this.showNotification('❌ Error assigning customer', 'error');
                }
            });
        }
    }

    navigateToScreen(screen) {
        const screenMap = {
            'dashboard': 'H-02',
            'assignments': 'H-04',
            'reports': 'H-21',
            'hierarchy': 'H-08',
            'settings': 'H-26'
        };
        
        if (screenMap[screen]) {
            this.loadScreen(screenMap[screen]);
        }
    }

    handleQuickAction(action) {
        switch(action) {
            case 'call':
                this.showNotification('Calling customer...', 'info');
                break;
            case 'navigate':
                this.showNotification('Opening navigation...', 'info');
                break;
            case 'capture':
                this.loadScreen('H-03');
                break;
            case 'payment':
                this.showPaymentModal();
                break;
            case 'relieve':
                this.loadScreen('H-10');
                break;
        }
    }

    showPaymentModal() {
        this.showModal('markPaymentModal');
    }

    confirmPayment(button) {
        button.closest('.modal').remove();
        this.showNotification('Payment marked successfully!', 'success');
        this.loadScreen('H-02');
    }

    captureSelfie() {
        this.showNotification('Selfie captured! (Demo mode)', 'success');
        document.getElementById('cameraPreview').innerHTML = '✅ Selfie Captured';
    }

    getCurrentLocation() {
        this.showNotification('Getting location...', 'info');
        setTimeout(() => {
            document.getElementById('locationInfo').style.display = 'block';
            document.getElementById('latitude').textContent = '18.4386';
            document.getElementById('longitude').textContent = '79.1288';
            this.showNotification('Location captured!', 'success');
        }, 1000);
    }

    submitVisitLog() {
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            this.showNotification('Visit log submitted successfully!', 'success');
            this.loadScreen('H-02');
        }, 2000);
    }

    markPayment(customerId) {
        this.showNotification(`Payment marked for customer ${customerId}`, 'success');
    }

    requestRelieve(customerId) {
        this.showNotification(`Relieve requested for customer ${customerId}`, 'info');
    }

    requestSpecialExec(customerId) {
        this.showNotification(`Special executive requested for customer ${customerId}`, 'info');
    }

    approveRelieves() {
        this.showNotification('Relieves approved!', 'success');
    }

    escalateToMD() {
        this.showNotification('Escalated to MD!', 'info');
    }

    viewAuditLog() {
        this.showNotification('Opening audit log...', 'info');
    }

    approveSpecialExecAllocation() {
        this.showNotification('Special executive allocation approved!', 'success');
    }

    exportConsolidatedReport() {
        this.showNotification('Exporting consolidated report...', 'info');
    }

    confirmAssignment() {
        this.showModal('assignCustomerModal');
    }

    submitRelieveRequest() {
        this.showNotification('Relieve request submitted!', 'success');
        this.loadScreen('H-02');
    }

    showRoleSelector() {
        this.loadScreen('H-01');
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Notifications disabled - no popups will be shown
        return;
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }

    setupScreenEventListeners() {
        // Setup event listeners for the current screen
        // This will be called after each screen is loaded
    }

    updateNavigation() {
        // Update mobile navigation based on current screen
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Update desktop navigation based on current screen
        document.querySelectorAll('.desktop-nav-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    startLiveUpdates() {
        // Simulate live updates every 5 seconds
        this.liveUpdateInterval = setInterval(() => {
            this.updateLiveData();
        }, 5000);
    }

    updateLiveData() {
        // Update live data for demonstration
        const liveTile = document.querySelector('.live-tile p');
        if (liveTile) {
            const customers = ['Mr. Ram Mohan', 'Mrs. Lakshmi Devi', 'Mr. Suresh Kumar', 'Ms. Priya Reddy'];
            const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
            const randomAmount = Math.floor(Math.random() * 10000) + 1000;
            const now = new Date();
            const timeStr = now.toLocaleTimeString();
            liveTile.textContent = `Now: Visiting ${randomCustomer} - Due ₹${randomAmount} | Updated: ${timeStr}`;
        }
        
        // Update employee status with realistic data
        const employeeCards = document.querySelectorAll('.employee-card');
        employeeCards.forEach(card => {
            const statusBadge = card.querySelector('.status-badge');
            const lastUpdate = card.querySelector('.last-update');
            const employeeName = card.querySelector('.employee-name');
            const employeeDept = card.querySelector('.employee-dept');
            const employeeLocation = card.querySelector('.employee-location');
            
            if (statusBadge && lastUpdate && employeeName) {
                const name = employeeName.textContent;
                const dept = employeeDept ? employeeDept.textContent : 'Collection Executive';
                
                // Realistic status updates based on department
                let statuses = [];
                if (dept.includes('Collection')) {
                    statuses = ['Meeting Customer', 'Payment Collection', 'Customer Visit', 'Follow-up Call', 'On Break', 'Offline'];
                } else if (dept.includes('Verification')) {
                    statuses = ['Document Review', 'KYC Verification', 'Document Upload', 'Verification Call', 'On Break', 'Offline'];
                } else if (dept.includes('Marketing')) {
                    statuses = ['Lead Follow-up', 'Campaign Setup', 'Customer Outreach', 'Lead Generation', 'On Break', 'Offline'];
                } else {
                    statuses = ['Active', 'Working', 'Meeting', 'Review', 'On Break', 'Offline'];
                }
                
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                const randomMinutes = Math.floor(Math.random() * 10) + 1;
                
                statusBadge.textContent = randomStatus;
                lastUpdate.textContent = `${randomMinutes} min ago`;
                
                // Update status class and card appearance
                statusBadge.className = 'status-badge';
                if (randomStatus === 'Offline') {
                    statusBadge.classList.add('status-inactive');
                    card.classList.remove('active');
                    card.classList.add('inactive');
                } else if (randomStatus === 'On Break') {
                    statusBadge.classList.add('status-pending');
                    card.classList.remove('active', 'inactive');
                } else {
                    statusBadge.classList.add('status-active');
                    card.classList.remove('inactive');
                    card.classList.add('active');
                }
            }
        });
        
        // Update KPI values slightly for realism
        const kpiValues = document.querySelectorAll('.kpi-value');
        kpiValues.forEach(kpi => {
            const currentValue = kpi.textContent;
            if (currentValue.includes('₹')) {
                // Update monetary values
                const amount = parseInt(currentValue.replace(/[₹,LK]/g, ''));
                const variation = Math.floor(Math.random() * 1000) - 500;
                const newAmount = Math.max(0, amount + variation);
                kpi.textContent = `₹${newAmount.toLocaleString()}`;
            } else if (currentValue.includes('%')) {
                // Update percentage values
                const percent = parseInt(currentValue.replace('%', ''));
                const variation = Math.floor(Math.random() * 4) - 2;
                const newPercent = Math.max(0, Math.min(100, percent + variation));
                kpi.textContent = `${newPercent}%`;
            } else if (!isNaN(parseInt(currentValue))) {
                // Update numeric values
                const num = parseInt(currentValue);
                const variation = Math.floor(Math.random() * 3) - 1;
                const newNum = Math.max(0, num + variation);
                kpi.textContent = newNum.toString();
            }
        });
        
        // Update live status elements
        const liveStatus = document.getElementById('liveStatus');
        if (liveStatus) {
            const customers = ['Mr. Ram Mohan', 'Mrs. Lakshmi Devi', 'Mr. Suresh Kumar'];
            const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
            liveStatus.textContent = `Now: Visiting ${randomCustomer} - Due ₹${Math.floor(Math.random() * 10000) + 1000}`;
        }
        
        const lastUpdate = document.getElementById('lastUpdate');
        if (lastUpdate) {
            lastUpdate.textContent = new Date().toLocaleTimeString();
        }
        
        // Update live KPI values
        const liveAssignments = document.getElementById('liveAssignments');
        if (liveAssignments) {
            liveAssignments.textContent = Math.floor(Math.random() * 10) + 1;
        }
        
        const liveCollected = document.getElementById('liveCollected');
        if (liveCollected) {
            const amount = Math.floor(Math.random() * 50000) + 10000;
            liveCollected.textContent = `₹${amount.toLocaleString()}`;
        }
    }

    // HOD Action Functions
    assignArea() {
        this.loadScreen('H-14');
    }

    escalateToMD() {
        this.loadScreen('H-20');
    }

    deploySpecialExec() {
        this.loadScreen('H-11');
    }

    viewTeamReport() {
        this.loadScreen('H-21');
    }

    // MD Action Functions
    viewAuditLog() {
        this.loadScreen('H-22');
    }

    approveSpecialExecAllocation() {
        this.loadScreen('H-11');
    }

    exportConsolidatedReport() {
        this.loadScreen('H-21');
    }

    viewAllEmployees() {
        this.loadScreen('H-08');
    }

    // Incharge Action Functions
    assignCustomer() {
        this.loadScreen('H-09');
    }

    approveRelieves() {
        this.loadScreen('H-10');
    }

    markVerified() {
        this.showNotification('Customer marked as verified!', 'success');
    }

    markRejected() {
        this.showNotification('Customer marked as rejected!', 'warning');
    }

    addNewLead() {
        this.showModal('addLeadModal');
    }

    captureKYC() {
        this.showNotification('KYC capture initiated!', 'info');
    }

    markSubscriptionPaid() {
        this.showNotification('Subscription marked as paid!', 'success');
    }

    autoBalanceAssignments() {
        this.showNotification('Assignments auto-balanced!', 'success');
    }

    submitDayReport() {
        this.showNotification('Daily report submitted!', 'success');
        this.loadScreen('H-02');
    }

    saveDraft() {
        this.showNotification('Draft saved!', 'info');
    }

    exportCSV() {
        this.showNotification('CSV export initiated!', 'info');
    }

    flagHighBounce() {
        this.showNotification('High-bounce customers flagged!', 'warning');
    }

    messageTeam() {
        this.showNotification('Team message sent!', 'success');
    }

    callCustomer() {
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            this.showNotification('📞 Customer call initiated!', 'success');
        }, 1000);
    }

    navigateToCustomer() {
        this.showLoading(true);
        setTimeout(() => {
            this.showLoading(false);
            this.showNotification('🗺️ Navigation opened in Google Maps!', 'success');
        }, 1500);
    }

    markDone() {
        this.showNotification('Task marked as done!', 'success');
    }

    approveReassign() {
        this.showNotification('Reassignment approved!', 'success');
    }

    transferToRecovery() {
        this.showNotification('Case transferred to recovery!', 'warning');
    }

    contactCustomer() {
        this.showNotification('Contacting customer...', 'info');
    }

    markPayment() {
        this.showModal('markPaymentModal');
    }

    requestRelieve() {
        this.showNotification('Relieve request sent!', 'info');
    }

    reassign() {
        this.showNotification('Reassignment initiated!', 'info');
    }

    exportPDF() {
        this.showNotification('PDF export initiated!', 'info');
    }

    downloadAuditReport() {
        this.showNotification('Audit report download started!', 'info');
    }

    confirmAssignWithdraw() {
        this.showNotification('Assignment change confirmed!', 'success');
        this.loadScreen('H-06');
    }

    loadStateData(state) {
        this.showNotification(`Loading data for ${state}...`, 'info');
    }

    sendMessageToState() {
        this.showNotification('Message sent to all in state!', 'success');
    }

    deployAdditionalResources() {
        this.showNotification('Additional resources deployed!', 'success');
    }

    generateStateReport() {
        this.showNotification('State report generated!', 'success');
    }

    startSimulation() {
        this.showNotification('Live simulation started!', 'success');
    }

    pauseSimulation() {
        this.showNotification('Simulation paused!', 'warning');
    }

    stopSimulation() {
        this.showNotification('Simulation stopped!', 'info');
    }

    saveSettings() {
        this.showNotification('Settings saved!', 'success');
        this.loadScreen('H-06');
    }

    quickCall() {
        this.showNotification('Quick call initiated!', 'info');
    }

    quickNavigate() {
        this.showNotification('Quick navigation started!', 'info');
    }

    quickCapture() {
        this.loadScreen('H-03');
    }

    quickPayment() {
        this.showPaymentModal();
    }

    playVideo(type) {
        this.showNotification(`Playing ${type} video...`, 'info');
    }

    openPDF(type) {
        this.showNotification(`Opening ${type} PDF...`, 'info');
    }

    openChecklist() {
        this.showNotification('Opening verification checklist...', 'info');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VRMApp();
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
