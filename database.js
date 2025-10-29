// MongoDB Database Service for Brindavan VRM System
class DatabaseService {
    constructor() {
        this.connectionString = 'mongodb+srv://aideveloperindia_db_user:qsLU0v48onDix3gM@brindavanvrm.s27sdn7.mongodb.net/?appName=brindavanvrm';
        this.database = 'brindavanvrm';
        this.isConnected = false;
    }

    async connect() {
        try {
            // For demo purposes, we'll simulate database operations
            // In production, you would use actual MongoDB driver
            this.isConnected = true;
            console.log('Connected to MongoDB');
            return true;
        } catch (error) {
            console.error('Database connection failed:', error);
            return false;
        }
    }

    // Employee Management
    async getEmployees() {
        return [
            // Collection Department (5 Executives)
            { id: 'EXEC001', name: 'Rajesh Kumar', role: 'Collection Executive', department: 'Collection', area: 'Karimnagar North', manager: 'INC001', phone: '+91-98765-43210', email: 'rajesh.kumar@brindavanchits.com', experience: '3 years', targets: { monthly: 500000, weekly: 125000 } },
            { id: 'EXEC002', name: 'Suresh Kumar', role: 'Collection Executive', department: 'Collection', area: 'Karimnagar South', manager: 'INC001', phone: '+91-98765-43211', email: 'suresh.kumar@brindavanchits.com', experience: '2 years', targets: { monthly: 450000, weekly: 112500 } },
            { id: 'EXEC003', name: 'Amit Kumar', role: 'Collection Executive', department: 'Collection', area: 'Warangal', manager: 'INC002', phone: '+91-98765-43212', email: 'amit.kumar@brindavanchits.com', experience: '4 years', targets: { monthly: 600000, weekly: 150000 } },
            { id: 'EXEC004', name: 'Vikram Kumar', role: 'Collection Executive', department: 'Collection', area: 'Nizamabad', manager: 'INC001', phone: '+91-98765-43213', email: 'vikram.kumar@brindavanchits.com', experience: '3 years', targets: { monthly: 550000, weekly: 137500 } },
            { id: 'EXEC005', name: 'Ravi Kumar', role: 'Collection Executive', department: 'Collection', area: 'Khammam', manager: 'INC002', phone: '+91-98765-43214', email: 'ravi.kumar@brindavanchits.com', experience: '2 years', targets: { monthly: 480000, weekly: 120000 } },
            
            // Verification Department (5 Executives)
            { id: 'VER001', name: 'Srinivas Kumar', role: 'Verification Executive', department: 'Verification', area: 'Document Verification', manager: 'HOD001', phone: '+91-98765-43215', email: 'srinivas.kumar@brindavanchits.com', experience: '2 years', targets: { daily: 25, monthly: 500 } },
            { id: 'VER002', name: 'Kiran Kumar', role: 'Verification Executive', department: 'Verification', area: 'KYC Processing', manager: 'HOD001', phone: '+91-98765-43216', email: 'kiran.kumar@brindavanchits.com', experience: '3 years', targets: { daily: 30, monthly: 600 } },
            { id: 'VER003', name: 'Venkatesh Kumar', role: 'Verification Executive', department: 'Verification', area: 'Identity Verification', manager: 'HOD001', phone: '+91-98765-43217', email: 'venkatesh.kumar@brindavanchits.com', experience: '2 years', targets: { daily: 28, monthly: 560 } },
            { id: 'VER004', name: 'Prakash Kumar', role: 'Verification Executive', department: 'Verification', area: 'Address Verification', manager: 'HOD001', phone: '+91-98765-43218', email: 'prakash.kumar@brindavanchits.com', experience: '4 years', targets: { daily: 32, monthly: 640 } },
            { id: 'VER005', name: 'Naveen Kumar', role: 'Verification Executive', department: 'Verification', area: 'Compliance Check', manager: 'HOD001', phone: '+91-98765-43219', email: 'naveen.kumar@brindavanchits.com', experience: '3 years', targets: { daily: 26, monthly: 520 } },
            
            // Marketing Department (7 Executives)
            { id: 'MKT001', name: 'Ravi Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'Lead Generation', manager: 'HOD002', phone: '+91-98765-43220', email: 'ravi.kumar@brindavanchits.com', experience: '2 years', targets: { monthly: 100, conversion: 15 } },
            { id: 'MKT002', name: 'Suresh Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'Digital Marketing', manager: 'HOD002', phone: '+91-98765-43221', email: 'suresh.kumar@brindavanchits.com', experience: '3 years', targets: { monthly: 120, conversion: 18 } },
            { id: 'MKT003', name: 'Amit Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'Social Media Marketing', manager: 'HOD002', phone: '+91-98765-43222', email: 'amit.kumar@brindavanchits.com', experience: '2 years', targets: { monthly: 110, conversion: 16 } },
            { id: 'MKT004', name: 'Vikram Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'Email Marketing', manager: 'HOD002', phone: '+91-98765-43223', email: 'vikram.kumar@brindavanchits.com', experience: '3 years', targets: { monthly: 130, conversion: 20 } },
            { id: 'MKT005', name: 'Rajesh Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'Content Marketing', manager: 'HOD002', phone: '+91-98765-43224', email: 'rajesh.kumar@brindavanchits.com', experience: '4 years', targets: { monthly: 140, conversion: 22 } },
            { id: 'MKT006', name: 'Srinivas Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'SEO Marketing', manager: 'HOD002', phone: '+91-98765-43225', email: 'srinivas.kumar@brindavanchits.com', experience: '2 years', targets: { monthly: 105, conversion: 17 } },
            { id: 'MKT007', name: 'Kiran Kumar', role: 'Marketing Executive', department: 'Marketing', area: 'Campaign Management', manager: 'HOD002', phone: '+91-98765-43226', email: 'kiran.kumar@brindavanchits.com', experience: '3 years', targets: { monthly: 125, conversion: 19 } },
            
            // Management
            { id: 'INC001', name: 'Suresh Kumar', role: 'Incharge', department: 'Collection', area: 'Karimnagar District', manager: 'HOD001', phone: '+91-98765-43227', email: 'suresh.kumar@brindavanchits.com', experience: '8 years', team_size: 3 },
            { id: 'INC002', name: 'Ravi Kumar', role: 'Incharge', department: 'Collection', area: 'Warangal District', manager: 'HOD001', phone: '+91-98765-43228', email: 'ravi.kumar@brindavanchits.com', experience: '7 years', team_size: 2 },
            { id: 'HOD001', name: 'Venkatesh Kumar', role: 'HOD', department: 'Operations', area: 'Telangana State', manager: 'MD001', phone: '+91-98765-43229', email: 'venkatesh.kumar@brindavanchits.com', experience: '12 years', team_size: 20 },
            { id: 'HOD002', name: 'Srinivas Kumar', role: 'HOD', department: 'Marketing', area: 'South India', manager: 'MD001', phone: '+91-98765-43230', email: 'srinivas.kumar@brindavanchits.com', experience: '10 years', team_size: 7 },
            { id: 'MD001', name: 'Penta Srinivas Kumar', role: 'Managing Director', department: 'Executive', area: 'All States', manager: null, phone: '+91-98765-43231', email: 'penta.srinivas@brindavanchits.com', experience: '20 years', team_size: 22 }
        ];
    }

    // Generate 50 customers for each Collection Executive
    async getCustomers() {
        const customers = [];
        const executives = ['EXEC001', 'EXEC002', 'EXEC003', 'EXEC004', 'EXEC005'];
        
        executives.forEach(execId => {
            for (let i = 1; i <= 50; i++) {
                customers.push({
                    id: `CUST${execId.slice(-3)}${i.toString().padStart(3, '0')}`,
                    name: `Customer ${i} - ${execId}`,
                    phone: `+91-98765-${Math.floor(Math.random() * 90000) + 10000}`,
                    address: `Address ${i}, Area ${execId}`,
                    chitAmount: Math.floor(Math.random() * 50000) + 10000,
                    installmentAmount: Math.floor(Math.random() * 5000) + 1000,
                    dueAmount: Math.floor(Math.random() * 10000) + 1000,
                    status: ['pending', 'overdue', 'collected'][Math.floor(Math.random() * 3)],
                    assignedTo: execId,
                    installmentDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    lastPayment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    totalPaid: Math.floor(Math.random() * 20000) + 5000
                });
            }
        });
        
        return customers;
    }

    // Lead Management
    async addLead(leadData) {
        const lead = {
            id: `LEAD${Date.now()}`,
            ...leadData,
            createdAt: new Date().toISOString(),
            status: 'new',
            assignedTo: null
        };
        
        // Store in localStorage for demo
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        leads.push(lead);
        localStorage.setItem('leads', JSON.stringify(leads));
        
        return lead;
    }

    async getLeads() {
        return JSON.parse(localStorage.getItem('leads') || '[]');
    }

    // Payment Management
    async addPayment(paymentData) {
        const payment = {
            id: `PAY${Date.now()}`,
            ...paymentData,
            createdAt: new Date().toISOString(),
            status: 'completed'
        };
        
        // Store in localStorage for demo
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));
        
        return payment;
    }

    async getPayments() {
        return JSON.parse(localStorage.getItem('payments') || '[]');
    }

    // Assignment Management
    async assignCustomer(assignmentData) {
        const assignment = {
            id: `ASSIGN${Date.now()}`,
            ...assignmentData,
            createdAt: new Date().toISOString(),
            status: 'assigned'
        };
        
        // Store in localStorage for demo
        const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
        assignments.push(assignment);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        return assignment;
    }

    async getAssignments() {
        return JSON.parse(localStorage.getItem('assignments') || '[]');
    }

    // Verification Management
    async addVerification(verificationData) {
        const verification = {
            id: `VER${Date.now()}`,
            ...verificationData,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        
        // Store in localStorage for demo
        const verifications = JSON.parse(localStorage.getItem('verifications') || '[]');
        verifications.push(verification);
        localStorage.setItem('verifications', JSON.stringify(verifications));
        
        return verification;
    }

    async getVerifications() {
        return JSON.parse(localStorage.getItem('verifications') || '[]');
    }
}

// Initialize database service
window.db = new DatabaseService();

