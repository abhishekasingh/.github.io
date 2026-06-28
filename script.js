document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SCROLL REVEAL OBSERVER
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, no need to track again
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 2. THEME SWITCHING (DARK/LIGHT)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        enableLightMode();
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    });
    
    function enableLightMode() {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'light');
    }
    
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
    }

    // ==========================================================================
    // 3. MOBILE MENU NAVIGATION
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ==========================================================================
    // 4. HERO SECTION TYPING TEXT SIMULATOR
    // ==========================================================================
    const typingText = document.getElementById('typing-text');
    const titles = [
        "Senior Technical Project Manager",
        "PMP® Certified Leader",
        "Ex-Data Engineer & Web Developer",
        "Enterprise Cloud Transformation Specialist"
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Deleting letters
            charIndex--;
            typingSpeed = 50; // Faster deletion
        } else {
            // Typing letters
            charIndex++;
            typingSpeed = 100;
        }
        
        typingText.textContent = currentTitle.substring(0, charIndex);
        
        // Handle transitions
        if (!isDeleting && charIndex === currentTitle.length) {
            // Finished typing, pause
            typingSpeed = 2500; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Small delay before typing next
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    setTimeout(typeEffect, 1000); // Trigger after 1s

    // ==========================================================================
    // 5. CORE SKILLS GRID FILTERING & LIVE SEARCH
    // ==========================================================================
    const skillCards = document.querySelectorAll('.skill-card');
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillSearch = document.getElementById('skills-search');
    const noSkillsMessage = document.getElementById('no-skills-message');
    
    let currentCategory = 'all';
    let searchQuery = '';
    
    // Tab filtering trigger
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            filterSkills();
        });
    });
    
    // Search matching trigger
    skillSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterSkills();
    });
    
    function filterSkills() {
        let visibleCount = 0;
        
        skillCards.forEach(card => {
            const cardCategory = card.dataset.cat;
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            
            const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
            const matchesSearch = (cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery));
            
            if (matchesCategory && matchesSearch) {
                card.classList.remove('filtered-out');
                visibleCount++;
            } else {
                card.classList.add('filtered-out');
            }
        });
        
        // Handle empty search results state
        if (visibleCount === 0) {
            noSkillsMessage.classList.remove('hidden');
        } else {
            noSkillsMessage.classList.add('hidden');
        }
    }

    // ==========================================================================
    // 6. DYNAMIC TPM PROJECT ARCHITECTURE SIMULATOR
    // ==========================================================================
    const projectsData = {
        project1: {
            title: "Contact Center AI Integration",
            fileName: "Project_01_AI_Engine.json",
            desc: "Governed the complete lifecycle, architecture definition, and delivery timeline of an advanced generative AI engine. Utilized Gemini Enterprise Playbooks alongside custom-engineered Retrieval-Augmented Generation (RAG) pipelines to streamline automated support response quality.",
            metric1: "+30%",
            label1: "Call-Handling Capacity",
            metric2: "8 Engineers",
            label2: "Cross-Functional Pod",
            metric3: "100%",
            label3: "SLA Compliance",
            techStack: ["Gemini AI", "RAG Pipelines", "REST APIs", "GCP", "Python", "JSON Schema"],
            diagramNodes: [
                { type: "source", val: "VoIP & Call Center Streams" },
                { type: "arrow", val: "▼ REST API Gateways" },
                { type: "process", val: "Real-time RAG Pipeline (Python)" },
                { type: "arrow", val: "▼ Context Injection" },
                { type: "model", val: "Gemini Enterprise Engine", highlight: true },
                { type: "arrow", val: "▼ Playbook Orchestrator" },
                { type: "output", val: "Automated Call Handling / Agent Helper UI" }
            ]
        },
        project2: {
            title: "Retail AI Recommendation Engine",
            fileName: "Project_02_Retail_Rec.json",
            desc: "Directed the technical deployment of a Google Retail AI Recommendation Engine for top-tier enterprise retail accounts. Established real-time continuous feedback data streams to feed user interaction metrics directly back into active recommendation models.",
            metric1: "+80%",
            label1: "Return on Ad Spend (ROAS)",
            metric2: "8 Engineers",
            label2: "Cross-Functional Pod",
            metric3: "$4M",
            label3: "Project Pipeline Scale",
            techStack: ["GCP Retail AI", "Data Pipelines", "Feedback Loops", "Python", "JSON Schemas", "SLAs"],
            diagramNodes: [
                { type: "source", val: "Client Web/App Clickstream Events" },
                { type: "arrow", val: "▼ Streaming Data Pipeline" },
                { type: "process", val: "Real-time Model Tuning Pipeline" },
                { type: "arrow", val: "▼ Feature Vector Store" },
                { type: "model", val: "Google Retail AI Recommendation Engine", highlight: true },
                { type: "arrow", val: "▼ Recommendations API" },
                { type: "output", val: "Personalized Product Carousel Outputs" }
            ]
        },
        project3: {
            title: "Google Meridian MMM Implementations",
            fileName: "Project_03_Meridian_MMM.json",
            desc: "Led the delivery and integration of 4 Google Meridian (Marketing Mix Modeling) products. Structured schema mapping processes to convert raw, unstructured marketing datasets into ingestion-ready insights, helping clients maximize ad spend value.",
            metric1: "+8%",
            label1: "Ad Spend Efficiency Gains",
            metric2: "4 Products",
            label2: "Implementations Led",
            metric3: "10 Developers",
            label3: "Multi-Disciplinary Pods",
            techStack: ["Google Meridian", "MMM Modeling", "Schema Mapping", "BigQuery", "SQL Analytics", "Python"],
            diagramNodes: [
                { type: "source", val: "Raw Multi-Channel Marketing Datasets" },
                { type: "arrow", val: "▼ Data Cleansing Pipelines" },
                { type: "process", val: "Unified Schema Mapping" },
                { type: "arrow", val: "▼ Clean Analytical Views" },
                { type: "model", val: "Google Meridian MMM Models", highlight: true },
                { type: "arrow", val: "▼ Multi-Touch Attribution" },
                { type: "output", val: "ROI Insights & Media Optimization Deck" }
            ]
        },
        project4: {
            title: "GCP Big Data & Analytics Pipelines",
            fileName: "Project_04_GCP_Data_Lakes.json",
            desc: "Architected modern cloud infrastructure and managed delivery of multi-layer analytical big data pipelines. Structured solution designs to query and process relational datasets, allowing business users to instantly pull complex custom campaign metrics.",
            metric1: "+90%",
            label1: "Operational Data Velocity",
            metric2: "$4M+",
            label2: "Managed Pipeline Value",
            metric3: "25%",
            label3: "Agile Scrum Velocity Gain",
            techStack: ["GCP Infrastructure", "BigQuery", "SQL Pipelines", "Solution Design SDDs", "Jira & PMO"],
            diagramNodes: [
                { type: "source", val: "Disparate Production Databases" },
                { type: "arrow", val: "▼ Cloud Data Transfer / GCS" },
                { type: "process", val: "Data Cleansing & ETL (Python/SQL)" },
                { type: "arrow", val: "▼ Structured Analytical Schemas" },
                { type: "model", val: "BigQuery Enterprise Data Lake", highlight: true },
                { type: "arrow", val: "▼ Secure View Queries" },
                { type: "output", val: "Interactive PMO Reports & Analytics APIs" }
            ]
        }
    };
    
    const simTabs = document.querySelectorAll('.sim-tab');
    const consoleTitleDisplay = document.getElementById('console-title-display');
    const projectTitle = document.getElementById('project-title');
    const projectDesc = document.getElementById('project-desc');
    const metric1 = document.getElementById('metric-1');
    const label1 = document.getElementById('label-1');
    const metric2 = document.getElementById('metric-2');
    const label2 = document.getElementById('label-2');
    const metric3 = document.getElementById('metric-3');
    const label3 = document.getElementById('label-3');
    const projectTechTags = document.getElementById('project-tech-tags');
    const diagramCanvas = document.getElementById('diagram-canvas');
    
    // Switch project console view
    simTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            simTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const selectedProj = tab.dataset.project;
            updateConsole(selectedProj);
        });
    });
    
    function updateConsole(projKey) {
        const data = projectsData[projKey];
        
        // Text animations / values
        consoleTitleDisplay.textContent = data.fileName;
        projectTitle.textContent = data.title;
        projectDesc.textContent = data.desc;
        
        metric1.textContent = data.metric1;
        label1.textContent = data.label1;
        
        metric2.textContent = data.metric2;
        label2.textContent = data.label2;
        
        metric3.textContent = data.metric3;
        label3.textContent = data.label3;
        
        // Tech stack listing
        projectTechTags.innerHTML = '';
        data.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.textContent = tech;
            projectTechTags.appendChild(tag);
        });
        
        // Dynamic block diagram rendering
        diagramCanvas.innerHTML = '';
        data.diagramNodes.forEach(node => {
            if (node.type === 'arrow') {
                const arrow = document.createElement('div');
                arrow.className = 'diag-arrow';
                arrow.textContent = node.val;
                diagramCanvas.appendChild(arrow);
            } else {
                const block = document.createElement('div');
                block.className = `diag-node ${node.highlight ? 'highlighted' : ''}`;
                
                const typeLabel = document.createElement('span');
                typeLabel.className = 'diag-node-label';
                typeLabel.textContent = node.type;
                
                const valText = document.createElement('div');
                valText.className = 'diag-node-val';
                valText.textContent = node.val;
                
                block.appendChild(typeLabel);
                block.appendChild(valText);
                diagramCanvas.appendChild(block);
            }
        });
    }
    
    // Initialize first project console on load
    updateConsole('project1');

    // ==========================================================================
    // 7. CAREER TIMELINE ACCORDION INTERACTION
    // ==========================================================================
    const timelineCards = document.querySelectorAll('.timeline-content');
    
    timelineCards.forEach(card => {
        // Skip legacy prior roles summary container
        if (card.classList.contains('legacy-card')) return;
        
        // Add click listener
        card.addEventListener('click', (e) => {
            // Prevent interference from buttons
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            const btn = card.querySelector('.expand-btn');
            const btnText = btn.querySelector('span');
            const isActive = card.classList.contains('active');
            
            // Toggle active state
            if (isActive) {
                card.classList.remove('active');
                btnText.textContent = 'Show Accomplishments';
            } else {
                // Optional: close other timeline cards (accordion behavior)
                timelineCards.forEach(c => {
                    if (c !== card && !c.classList.contains('legacy-card')) {
                        c.classList.remove('active');
                        const otherBtn = c.querySelector('.expand-btn');
                        if (otherBtn) {
                            otherBtn.querySelector('span').textContent = 'Show Accomplishments';
                        }
                    }
                });
                
                card.classList.add('active');
                btnText.textContent = 'Hide Accomplishments';
            }
        });
    });
});
