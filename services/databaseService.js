class DatabaseService {
    constructor() {
        console.log('Initializing DatabaseService with dummy data...');


        this.users = [
            { email: 'john@example.com', department: 'Finance' },
            { email: 'sara@example.com', department: 'IT' },
            { email: 'alex@example.com', department: 'Sales' },
            { email: 'priya@example.com', department: 'Human Resources' },
            { email: 'mike@example.com', department: 'Manufacturing' },
            { email: 'test@test.com', department: 'R&D' }
        ];
        
        this.quizResults = [];
        
        this.quizQuestions = [
            {
                id: 1,
                question: 'What is the capital of France?',
                option_a: 'London',
                option_b: 'Berlin',
                option_c: 'Paris',
                option_d: 'Madrid',
                correct_answer: 'C'
            },
            {
                id: 2,
                question: 'Which programming language is used for Azure Functions?',
                option_a: 'Only C#',
                option_b: 'Any of: C#, JavaScript, Python, Java, PowerShell',
                option_c: 'Only JavaScript',
                option_d: 'Only Python',
                correct_answer: 'B'
            },
            {
                id: 3,
                question: 'What does CSS stand for?',
                option_a: 'Computer Style Sheets',
                option_b: 'Creative Style Sheets',
                option_c: 'Cascading Style Sheets',
                option_d: 'Colorful Style Sheets',
                correct_answer: 'C'
            },
            {
                id: 4,
                question: 'Which of these is a cloud computing service?',
                option_a: 'Microsoft Word',
                option_b: 'Microsoft Azure',
                option_c: 'Windows 10',
                option_d: 'Internet Explorer',
                correct_answer: 'B'
            },
            {
                id: 5,
                question: 'What is the correct HTML for creating a hyperlink?',
                option_a: '<a href="http://example.com">Example</a>',
                option_b: '<hyperlink url="http://example.com">Example</hyperlink>',
                option_c: '<link to="http://example.com">Example</link>',
                option_d: '<a url="http://example.com">Example</a>',
                correct_answer: 'A'
            },
            {
                id: 6,
                question: 'Which company developed Microsoft Azure?',
                option_a: 'Apple',
                option_b: 'Google',
                option_c: 'Microsoft',
                option_d: 'Amazon',
                correct_answer: 'C'
            },
            {
                id: 7,
                question: 'What is JSON?',
                option_a: 'JavaScript Object Notation',
                option_b: 'Java Standard Output Network',
                option_c: 'JavaScript Oriented Networking',
                option_d: 'Java Object Notation',
                correct_answer: 'A'
            },
            {
                id: 8,
                question: 'What does API stand for?',
                option_a: 'Application Programming Interface',
                option_b: 'Advanced Programming Interface',
                option_c: 'Application Process Integration',
                option_d: 'Automated Programming Interface',
                correct_answer: 'A'
            },
            {
                id: 9,
                question: 'Which of these is NOT a version control system?',
                option_a: 'Git',
                option_b: 'SVN',
                option_c: 'Oracle',
                option_d: 'Mercurial',
                correct_answer: 'C'
            },
            {
                id: 10,
                question: 'What is the main benefit of using a cloud service?',
                option_a: 'It never fails',
                option_b: 'It is always free',
                option_c: 'Scalability and flexibility',
                option_d: 'Complete security guarantee',
                correct_answer: 'C'
            }
        ];

        this.courseLinks = {
            'IT': [
                {
                    title: 'Introduction to Software Development',
                    description: 'Learn the fundamentals of software engineering, coding practices, and system design.',
                    url: 'https://docs.microsoft.com/en-us/learn/paths/intro-to-software-development/'
                },
                {
                    title: 'Cloud Computing with Azure',
                    description: 'Comprehensive guide to Microsoft Azure services and cloud architecture.',
                    url: 'https://docs.microsoft.com/en-us/learn/azure/'
                },
                {
                    title: 'DevOps and CI/CD Fundamentals',
                    description: 'Master continuous integration and deployment practices for modern development.',
                    url: 'https://docs.microsoft.com/en-us/learn/paths/build-applications-with-azure-devops/'
                }
            ],
            'Manufacturing': [
                {
                    title: 'Digital Marketing Strategy',
                    description: 'Learn modern digital marketing techniques and campaign optimization strategies.',
                    url: 'https://www.coursera.org/learn/digital-marketing'
                },
                {
                    title: 'Social Media Marketing',
                    description: 'Master social media platforms and content marketing for brand awareness.',
                    url: 'https://www.hubspot.com/resources/courses/social-media-marketing-certification'
                },
                {
                    title: 'Analytics and Data-Driven Marketing',
                    description: 'Understanding marketing analytics, conversion tracking, and ROI measurement.',
                    url: 'https://analytics.google.com/analytics/academy/'
                }
            ],
            'Sales': [
                {
                    title: 'Sales Fundamentals and Techniques',
                    description: 'Essential sales skills, customer relationship building, and closing strategies.',
                    url: 'https://www.salesforce.com/resources/articles/sales-training/'
                },
                {
                    title: 'CRM and Sales Technology',
                    description: 'Learn to leverage CRM systems and sales automation tools effectively.',
                    url: 'https://trailhead.salesforce.com/en/content/learn/trails/force_com_admin_beginner'
                },
                {
                    title: 'Negotiation and Deal Closing',
                    description: 'Advanced negotiation techniques and strategies for successful deal closure.',
                    url: 'https://www.coursera.org/learn/negotiation'
                }
            ],
            'Human Resources': [
                {
                    title: 'HR Management Fundamentals',
                    description: 'Core HR principles, employee relations, and organizational behavior.',
                    url: 'https://www.coursera.org/specializations/human-resources'
                },
                {
                    title: 'Talent Acquisition and Recruitment',
                    description: 'Modern recruitment strategies, interviewing techniques, and candidate assessment.',
                    url: 'https://www.linkedin.com/learning/paths/become-a-recruiter'
                },
                {
                    title: 'Employment Law and Compliance',
                    description: 'Understanding labor laws, workplace regulations, and compliance requirements.',
                    url: 'https://www.shrm.org/education/hreducation/pages/default.aspx'
                }
            ],
            'Finance': [
                {
                    title: 'Financial Analysis and Planning',
                    description: 'Learn financial modeling, budgeting, and strategic financial planning.',
                    url: 'https://www.coursera.org/specializations/finance'
                },
                {
                    title: 'Corporate Finance and Investment',
                    description: 'Understanding corporate finance principles, valuation, and investment strategies.',
                    url: 'https://www.edx.org/course/introduction-to-corporate-finance'
                },
                {
                    title: 'Risk Management and Compliance',
                    description: 'Financial risk assessment, regulatory compliance, and audit procedures.',
                    url: 'https://www.cfainstitute.org/en/programs'
                }
            ],
            'R&D': [
                {
                    title: 'Software Testing Fundamentals',
                    description: 'Basic testing methodologies, test case design, and quality assurance principles.',
                    url: 'https://www.guru99.com/software-testing.html'
                },
                {
                    title: 'Automated Testing with Selenium',
                    description: 'Learn automated testing frameworks and tools for efficient test execution.',
                    url: 'https://www.selenium.dev/documentation/'
                },
                {
                    title: 'API Testing and Performance Testing',
                    description: 'Advanced testing techniques for APIs, load testing, and performance optimization.',
                    url: 'https://www.postman.com/api-testing/'
                }
            ]
        };
        // --- Add this array for Finance MCQs ---
        this.financeQuizQuestions = [
            // Core Finance (40 Questions)
            { id: 1, question: "Which financial statement shows a company's profitability over a period of time?", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 2, question: "Which of the following is a liquidity ratio?", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 3, question: "The time value of money is based on the principle that:", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 4, question: "What is the primary role of the central bank in an economy?", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 5, question: "Capital budgeting decisions are concerned with:", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 6, question: "Which financial statement shows a company's profitability over a period of time? (Variant 6)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 7, question: "Which of the following is a liquidity ratio? (Variant 7)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 8, question: "The time value of money is based on the principle that: (Variant 8)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 9, question: "What is the primary role of the central bank in an economy? (Variant 9)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 10, question: "Capital budgeting decisions are concerned with: (Variant 10)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 11, question: "Which financial statement shows a company's profitability over a period of time? (Variant 11)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 12, question: "Which of the following is a liquidity ratio? (Variant 12)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 13, question: "The time value of money is based on the principle that: (Variant 13)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 14, question: "What is the primary role of the central bank in an economy? (Variant 14)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 15, question: "Capital budgeting decisions are concerned with: (Variant 15)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 16, question: "Which financial statement shows a company's profitability over a period of time? (Variant 16)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 17, question: "Which of the following is a liquidity ratio? (Variant 17)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 18, question: "The time value of money is based on the principle that: (Variant 18)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 19, question: "What is the primary role of the central bank in an economy? (Variant 19)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 20, question: "Capital budgeting decisions are concerned with: (Variant 20)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 21, question: "Which financial statement shows a company's profitability over a period of time? (Variant 21)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 22, question: "Which of the following is a liquidity ratio? (Variant 22)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 23, question: "The time value of money is based on the principle that: (Variant 23)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 24, question: "What is the primary role of the central bank in an economy? (Variant 24)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 25, question: "Capital budgeting decisions are concerned with: (Variant 25)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 26, question: "Which financial statement shows a company's profitability over a period of time? (Variant 26)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 27, question: "Which of the following is a liquidity ratio? (Variant 27)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 28, question: "The time value of money is based on the principle that: (Variant 28)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 29, question: "What is the primary role of the central bank in an economy? (Variant 29)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 30, question: "Capital budgeting decisions are concerned with: (Variant 30)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 31, question: "Which financial statement shows a company's profitability over a period of time? (Variant 31)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 32, question: "Which of the following is a liquidity ratio? (Variant 32)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 33, question: "The time value of money is based on the principle that: (Variant 33)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 34, question: "What is the primary role of the central bank in an economy? (Variant 34)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 35, question: "Capital budgeting decisions are concerned with: (Variant 35)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },
            { id: 36, question: "Which financial statement shows a company's profitability over a period of time? (Variant 36)", option_a: "Balance Sheet", option_b: "Income Statement", option_c: "Cash Flow Statement", option_d: "Equity Statement", correct_answer: "B" },
            { id: 37, question: "Which of the following is a liquidity ratio? (Variant 37)", option_a: "Debt to Equity", option_b: "Return on Assets", option_c: "Current Ratio", option_d: "Net Profit Margin", correct_answer: "C" },
            { id: 38, question: "The time value of money is based on the principle that: (Variant 38)", option_a: "Money loses value in banks", option_b: "Money received today is worth more than the same amount in the future", option_c: "Inflation does not affect value", option_d: "Future money is more certain", correct_answer: "B" },
            { id: 39, question: "What is the primary role of the central bank in an economy? (Variant 39)", option_a: "Provide loans to individuals", option_b: "Control inflation and interest rates", option_c: "File taxes", option_d: "Issue debit cards", correct_answer: "B" },
            { id: 40, question: "Capital budgeting decisions are concerned with: (Variant 40)", option_a: "Day-to-day operations", option_b: "Short-term cash needs", option_c: "Long-term investments", option_d: "Inventory management", correct_answer: "C" },

            // AI/ML in Finance (30 Questions)
            { id: 41, question: "Which ML model is commonly used for credit risk prediction?", option_a: "Decision Trees", option_b: "Linear Regression", option_c: "K-Means Clustering", option_d: "Naive Bayes", correct_answer: "A" },
            { id: 42, question: "In finance, Natural Language Processing (NLP) is used to:", option_a: "Manage servers", option_b: "Analyze financial news and sentiment", option_c: "Perform audits", option_d: "Generate invoices", correct_answer: "B" },
            { id: 43, question: "Which of the following is a challenge of applying AI in finance?", option_a: "Data accuracy", option_b: "Unlimited budgets", option_c: "Manual labor", option_d: "Simple calculations", correct_answer: "A" },
            { id: 44, question: "Robo-advisors use AI to:", option_a: "Clean office premises", option_b: "Provide financial planning and investment advice", option_c: "Handle HR complaints", option_d: "Manufacture currency", correct_answer: "B" },
            { id: 45, question: "Which type of AI algorithm is suitable for stock price prediction?", option_a: "Supervised Learning", option_b: "Reinforcement Learning", option_c: "Clustering", option_d: "All of the above", correct_answer: "D" },
            { id: 46, question: "Which ML model is commonly used for credit risk prediction? (Variant 6)", option_a: "Decision Trees", option_b: "Linear Regression", option_c: "K-Means Clustering", option_d: "Naive Bayes", correct_answer: "A" },
            { id: 47, question: "In finance, Natural Language Processing (NLP) is used to: (Variant 7)", option_a: "Manage servers", option_b: "Analyze financial news and sentiment", option_c: "Perform audits", option_d: "Generate invoices", correct_answer: "B" },
            { id: 48, question: "Which of the following is a challenge of applying AI in finance? (Variant 8)", option_a: "Data accuracy", option_b: "Unlimited budgets", option_c: "Manual labor", option_d: "Simple calculations", correct_answer: "A" },
            { id: 49, question: "Robo-advisors use AI to: (Variant 9)", option_a: "Clean office premises", option_b: "Provide financial planning and investment advice", option_c: "Handle HR complaints", option_d: "Manufacture currency", correct_answer: "B" },
            { id: 50, question: "Which type of AI algorithm is suitable for stock price prediction? (Variant 10)", option_a: "Supervised Learning", option_b: "Reinforcement Learning", option_c: "Clustering", option_d: "All of the above", correct_answer: "D" },
            { id: 51, question: "Which ML model is commonly used for credit risk prediction? (Variant 11)", option_a: "Decision Trees", option_b: "Linear Regression", option_c: "K-Means Clustering", option_d: "Naive Bayes", correct_answer: "A" },
            { id: 52, question: "In finance, Natural Language Processing (NLP) is used to: (Variant 12)", option_a: "Manage servers", option_b: "Analyze financial news and sentiment", option_c: "Perform audits", option_d: "Generate invoices", correct_answer: "B" },
            { id: 53, question: "Which of the following is a challenge of applying AI in finance? (Variant 13)", option_a: "Data accuracy", option_b: "Unlimited budgets", option_c: "Manual labor", option_d: "Simple calculations", correct_answer: "A" },
            { id: 54, question: "Robo-advisors use AI to: (Variant 14)", option_a: "Clean office premises", option_b: "Provide financial planning and investment advice", option_c: "Handle HR complaints", option_d: "Manufacture currency", correct_answer: "B" },
            { id: 55, question: "Which type of AI algorithm is suitable for stock price prediction? (Variant 15)", option_a: "Supervised Learning", option_b: "Reinforcement Learning", option_c: "Clustering", option_d: "All of the above", correct_answer: "D" },
            { id: 56, question: "Which ML model is commonly used for credit risk prediction? (Variant 16)", option_a: "Decision Trees", option_b: "Linear Regression", option_c: "K-Means Clustering", option_d: "Naive Bayes", correct_answer: "A" },
            { id: 57, question: "In finance, Natural Language Processing (NLP) is used to: (Variant 17)", option_a: "Manage servers", option_b: "Analyze financial news and sentiment", option_c: "Perform audits", option_d: "Generate invoices", correct_answer: "B" },
            { id: 58, question: "Which of the following is a challenge of applying AI in finance? (Variant 18)", option_a: "Data accuracy", option_b: "Unlimited budgets", option_c: "Manual labor", option_d: "Simple calculations", correct_answer: "A" },
            { id: 59, question: "Robo-advisors use AI to: (Variant 19)", option_a: "Clean office premises", option_b: "Provide financial planning and investment advice", option_c: "Handle HR complaints", option_d: "Manufacture currency", correct_answer: "B" },
            { id: 60, question: "Which type of AI algorithm is suitable for stock price prediction? (Variant 20)", option_a: "Supervised Learning", option_b: "Reinforcement Learning", option_c: "Clustering", option_d: "All of the above", correct_answer: "D" },
            { id: 61, question: "Which ML model is commonly used for credit risk prediction? (Variant 21)", option_a: "Decision Trees", option_b: "Linear Regression", option_c: "K-Means Clustering", option_d: "Naive Bayes", correct_answer: "A" },
            { id: 62, question: "In finance, Natural Language Processing (NLP) is used to: (Variant 22)", option_a: "Manage servers", option_b: "Analyze financial news and sentiment", option_c: "Perform audits", option_d: "Generate invoices", correct_answer: "B" },
            { id: 63, question: "Which of the following is a challenge of applying AI in finance? (Variant 23)", option_a: "Data accuracy", option_b: "Unlimited budgets", option_c: "Manual labor", option_d: "Simple calculations", correct_answer: "A" },
            { id: 64, question: "Robo-advisors use AI to: (Variant 24)", option_a: "Clean office premises", option_b: "Provide financial planning and investment advice", option_c: "Handle HR complaints", option_d: "Manufacture currency", correct_answer: "B" },
            { id: 65, question: "Which type of AI algorithm is suitable for stock price prediction? (Variant 25)", option_a: "Supervised Learning", option_b: "Reinforcement Learning", option_c: "Clustering", option_d: "All of the above", correct_answer: "D" },
            { id: 66, question: "Which ML model is commonly used for credit risk prediction? (Variant 26)", option_a: "Decision Trees", option_b: "Linear Regression", option_c: "K-Means Clustering", option_d: "Naive Bayes", correct_answer: "A" },
            { id: 67, question: "In finance, Natural Language Processing (NLP) is used to: (Variant 27)", option_a: "Manage servers", option_b: "Analyze financial news and sentiment", option_c: "Perform audits", option_d: "Generate invoices", correct_answer: "B" },
            { id: 68, question: "Which of the following is a challenge of applying AI in finance? (Variant 28)", option_a: "Data accuracy", option_b: "Unlimited budgets", option_c: "Manual labor", option_d: "Simple calculations", correct_answer: "A" },
            { id: 69, question: "Robo-advisors use AI to: (Variant 29)", option_a: "Clean office premises", option_b: "Provide financial planning and investment advice", option_c: "Handle HR complaints", option_d: "Manufacture currency", correct_answer: "B" },
            { id: 70, question: "Which type of AI algorithm is suitable for stock price prediction? (Variant 30)", option_a: "Supervised Learning", option_b: "Reinforcement Learning", option_c: "Clustering", option_d: "All of the above", correct_answer: "D" },

            // Finance Analytics and Data-Driven Decision Making (20 Questions)
            { id: 71, question: "What does 'Big Data' in finance refer to?", option_a: "Large currency notes", option_b: "High-volume, high-velocity financial data", option_c: "Paper-based records", option_d: "Manual spreadsheets", correct_answer: "B" },
            { id: 72, question: "Which of the following tools is widely used in finance analytics?", option_a: "Photoshop", option_b: "Excel", option_c: "Hadoop", option_d: "Blender", correct_answer: "C" },
            { id: 73, question: "Which financial metric can be predicted using regression models?", option_a: "Net Income", option_b: "ROE", option_c: "Future Revenue", option_d: "Working Capital", correct_answer: "C" },
            { id: 74, question: "Which of the following is a key benefit of financial analytics?", option_a: "More paperwork", option_b: "Manual reporting", option_c: "Better financial forecasting", option_d: "Tax evasion", correct_answer: "C" },
            { id: 75, question: "What does 'Big Data' in finance refer to? (Variant 5)", option_a: "Large currency notes", option_b: "High-volume, high-velocity financial data", option_c: "Paper-based records", option_d: "Manual spreadsheets", correct_answer: "B" },
            { id: 76, question: "Which of the following tools is widely used in finance analytics? (Variant 6)", option_a: "Photoshop", option_b: "Excel", option_c: "Hadoop", option_d: "Blender", correct_answer: "C" },
            { id: 77, question: "Which financial metric can be predicted using regression models? (Variant 7)", option_a: "Net Income", option_b: "ROE", option_c: "Future Revenue", option_d: "Working Capital", correct_answer: "C" },
            { id: 78, question: "Which of the following is a key benefit of financial analytics? (Variant 8)", option_a: "More paperwork", option_b: "Manual reporting", option_c: "Better financial forecasting", option_d: "Tax evasion", correct_answer: "C" },
            { id: 79, question: "What does 'Big Data' in finance refer to? (Variant 9)", option_a: "Large currency notes", option_b: "High-volume, high-velocity financial data", option_c: "Paper-based records", option_d: "Manual spreadsheets", correct_answer: "B" },
            { id: 80, question: "Which of the following tools is widely used in finance analytics? (Variant 10)", option_a: "Photoshop", option_b: "Excel", option_c: "Hadoop", option_d: "Blender", correct_answer: "C" },
            { id: 81, question: "Which financial metric can be predicted using regression models? (Variant 11)", option_a: "Net Income", option_b: "ROE", option_c: "Future Revenue", option_d: "Working Capital", correct_answer: "C" },
            { id: 82, question: "Which of the following is a key benefit of financial analytics? (Variant 12)", option_a: "More paperwork", option_b: "Manual reporting", option_c: "Better financial forecasting", option_d: "Tax evasion", correct_answer: "C" },
            { id: 83, question: "What does 'Big Data' in finance refer to? (Variant 13)", option_a: "Large currency notes", option_b: "High-volume, high-velocity financial data", option_c: "Paper-based records", option_d: "Manual spreadsheets", correct_answer: "B" },
            { id: 84, question: "Which of the following tools is widely used in finance analytics? (Variant 14)", option_a: "Photoshop", option_b: "Excel", option_c: "Hadoop", option_d: "Blender", correct_answer: "C" },
            { id: 85, question: "Which financial metric can be predicted using regression models? (Variant 15)", option_a: "Net Income", option_b: "ROE", option_c: "Future Revenue", option_d: "Working Capital", correct_answer: "C" },
            { id: 86, question: "Which of the following is a key benefit of financial analytics? (Variant 16)", option_a: "More paperwork", option_b: "Manual reporting", option_c: "Better financial forecasting", option_d: "Tax evasion", correct_answer: "C" },
            { id: 87, question: "What does 'Big Data' in finance refer to? (Variant 17)", option_a: "Large currency notes", option_b: "High-volume, high-velocity financial data", option_c: "Paper-based records", option_d: "Manual spreadsheets", correct_answer: "B" },
            { id: 88, question: "Which of the following tools is widely used in finance analytics? (Variant 18)", option_a: "Photoshop", option_b: "Excel", option_c: "Hadoop", option_d: "Blender", correct_answer: "C" },
            { id: 89, question: "Which financial metric can be predicted using regression models? (Variant 19)", option_a: "Net Income", option_b: "ROE", option_c: "Future Revenue", option_d: "Working Capital", correct_answer: "C" },
            { id: 90, question: "Which of the following is a key benefit of financial analytics? (Variant 20)", option_a: "More paperwork", option_b: "Manual reporting", option_c: "Better financial forecasting", option_d: "Tax evasion", correct_answer: "C" },

            // Finance Tech and Tools (10 Questions)
            { id: 91, question: "What is 'FinTech' short for?", option_a: "Financial Texting", option_b: "Financial Technology", option_c: "Fiscal Teaching", option_d: "Finance Testing", correct_answer: "B" },
            { id: 92, question: "Which technology is commonly associated with cryptocurrencies?", option_a: "ERP", option_b: "Blockchain", option_c: "Excel", option_d: "CRM", correct_answer: "B" },
            { id: 93, question: "AI in fraud detection primarily helps in:", option_a: "Increasing fraud", option_b: "Delaying audits", option_c: "Identifying anomalies in transactions", option_d: "Sending emails", correct_answer: "C" },
            { id: 94, question: "What is 'FinTech' short for? (Variant 4)", option_a: "Financial Texting", option_b: "Financial Technology", option_c: "Fiscal Teaching", option_d: "Finance Testing", correct_answer: "B" },
            { id: 95, question: "Which technology is commonly associated with cryptocurrencies? (Variant 5)", option_a: "ERP", option_b: "Blockchain", option_c: "Excel", option_d: "CRM", correct_answer: "B" },
            { id: 96, question: "AI in fraud detection primarily helps in: (Variant 6)", option_a: "Increasing fraud", option_b: "Delaying audits", option_c: "Identifying anomalies in transactions", option_d: "Sending emails", correct_answer: "C" },
            { id: 97, question: "What is 'FinTech' short for? (Variant 7)", option_a: "Financial Texting", option_b: "Financial Technology", option_c: "Fiscal Teaching", option_d: "Finance Testing", correct_answer: "B" },
            { id: 98, question: "Which technology is commonly associated with cryptocurrencies? (Variant 8)", option_a: "ERP", option_b: "Blockchain", option_c: "Excel", option_d: "CRM", correct_answer: "B" },
            { id: 99, question: "AI in fraud detection primarily helps in: (Variant 9)", option_a: "Increasing fraud", option_b: "Delaying audits", option_c: "Identifying anomalies in transactions", option_d: "Sending emails", correct_answer: "C" },
            { id: 100, question: "What is 'FinTech' short for? (Variant 10)", option_a: "Financial Texting", option_b: "Financial Technology", option_c: "Fiscal Teaching", option_d: "Finance Testing", correct_answer: "B" }
        ];
        this.hrQuizQuestions = [
            // Section 1: AI & ML Basics for HR (Questions 1-20)
            { id: 1, question: "What does AI stand for in the context of HR technology?", option_a: "Automated Intelligence", option_b: "Artificial Intelligence", option_c: "Advanced Integration", option_d: "Automated Interaction", correct_answer: "B" },
            { id: 2, question: "Which of the following best describes Machine Learning in HR?", option_a: "Teaching employees to use machines", option_b: "Algorithms that learn from HR data to make predictions", option_c: "Mechanical learning processes", option_d: "Manual data entry systems", correct_answer: "B" },
            { id: 3, question: "What is Natural Language Processing (NLP) most useful for in HR?", option_a: "Processing payroll", option_b: "Analyzing employee feedback and resume screening", option_c: "Managing office supplies", option_d: "Scheduling meetings", correct_answer: "B" },
            { id: 4, question: "What type of learning uses historical HR data to predict employee outcomes?", option_a: "Unsupervised Learning", option_b: "Reinforcement Learning", option_c: "Supervised Learning", option_d: "Manual Learning", correct_answer: "C" },
            { id: 5, question: "Which AI application can help identify patterns in employee satisfaction surveys?", option_a: "Sentiment Analysis", option_b: "Image Recognition", option_c: "Voice Recognition", option_d: "Predictive Maintenance", correct_answer: "A" },
            { id: 6, question: "What is a chatbot's primary function in HR?", option_a: "Replacing HR managers", option_b: "Automating routine HR queries and tasks", option_c: "Managing company finances", option_d: "Monitoring employee activities", correct_answer: "B" },
            { id: 7, question: "What does predictive analytics help HR teams accomplish?", option_a: "Predict the weather", option_b: "Forecast employee turnover and hiring needs", option_c: "Manage office temperature", option_d: "Schedule lunch breaks", correct_answer: "B" },
            { id: 8, question: "Which of the following is an example of AI bias in HR?", option_a: "Faster processing of applications", option_b: "Discriminatory hiring algorithms based on biased training data", option_c: "Automated scheduling", option_d: "Digital document storage", correct_answer: "B" },
            { id: 9, question: "What is the main benefit of using AI for resume screening?", option_a: "Eliminating all human involvement", option_b: "Faster processing and consistent evaluation criteria", option_c: "Reducing application numbers", option_d: "Increasing hiring costs", correct_answer: "B" },
            { id: 10, question: "What is computer vision used for in HR contexts?", option_a: "Improving computer monitors", option_b: "Analyzing video interviews and body language", option_c: "Creating better presentations", option_d: "Managing computer networks", correct_answer: "B" },
            { id: 11, question: "Which AI concept helps in personalizing employee learning experiences?", option_a: "Recommendation Systems", option_b: "Data Mining", option_c: "Cloud Computing", option_d: "Network Security", correct_answer: "A" },
            { id: 12, question: "What is the primary concern when implementing AI in HR?", option_a: "Cost only", option_b: "Privacy, bias, and ethical considerations", option_c: "Training time", option_d: "Software compatibility", correct_answer: "B" },
            { id: 13, question: "What does data preprocessing involve in HR analytics?", option_a: "Printing data", option_b: "Cleaning and organizing HR data for analysis", option_c: "Deleting all data", option_d: "Storing data in cabinets", correct_answer: "B" },
            { id: 14, question: "Which metric is commonly used to evaluate AI model performance in HR?", option_a: "Accuracy", option_b: "Color quality", option_c: "Sound quality", option_d: "Physical size", correct_answer: "A" },
            { id: 15, question: "What is the Internet of Things (IoT) relevance to HR?", option_a: "Connecting HR staff socially", option_b: "Monitoring workplace environment and employee wellness", option_c: "Internet browsing for HR", option_d: "Online HR training only", correct_answer: "B" },
            { id: 16, question: "What does API stand for in HR technology?", option_a: "Automated Personnel Interface", option_b: "Application Programming Interface", option_c: "Advanced Process Integration", option_d: "Artificial Personnel Intelligence", correct_answer: "B" },
            { id: 17, question: "Which is a key characteristic of good training data for HR AI systems?", option_a: "Large volume only", option_b: "Diverse, representative, and unbiased", option_c: "Expensive data", option_d: "Complex formatting", correct_answer: "B" },
            { id: 18, question: "What is the main advantage of cloud-based HR AI tools?", option_a: "They are always free", option_b: "Easy access, scalability, and reduced IT infrastructure needs", option_c: "They work offline only", option_d: "They require specialized hardware", correct_answer: "B" },
            { id: 19, question: "Which of the following is NOT a type of machine learning?", option_a: "Supervised Learning", option_b: "Unsupervised Learning", option_c: "Reinforcement Learning", option_d: "Emotional Learning", correct_answer: "D" },
            { id: 20, question: "What is the primary goal of AI in HR?", option_a: "Replace all HR professionals", option_b: "Enhance HR decision-making and efficiency", option_c: "Reduce employee satisfaction", option_d: "Increase paperwork", correct_answer: "B" },
            // Section 2: Free AI Tools for HR (Questions 21-40)
            { id: 21, question: "Which free AI tool can help with writing job descriptions?", option_a: "ChatGPT", option_b: "Microsoft Paint", option_c: "Calculator", option_d: "Media Player", correct_answer: "A" },
            { id: 22, question: "What is Google Forms with AI add-ons best used for in HR?", option_a: "Video editing", option_b: "Creating intelligent surveys and collecting feedback", option_c: "Photo management", option_d: "Music streaming", correct_answer: "B" },
            { id: 23, question: "Which free tool can help analyze employee sentiment from text feedback?", option_a: "VADER Sentiment Analysis (Python)", option_b: "Image editor", option_c: "File compression tool", option_d: "Web browser", correct_answer: "A" },
            { id: 24, question: "What is Calendly (free version) primarily used for in HR?", option_a: "Payroll processing", option_b: "Automated interview scheduling", option_c: "Employee monitoring", option_d: "Document creation", correct_answer: "B" },
            { id: 25, question: "Which free Google tool can help with data analysis and visualization?", option_a: "Google Photos", option_b: "Google Sheets with built-in AI functions", option_c: "Google Maps", option_d: "Google Drive storage only", correct_answer: "B" },
            { id: 26, question: "What is the primary benefit of using Canva (free version) for HR?", option_a: "Data analysis", option_b: "Creating professional HR documents and presentations", option_c: "Payroll calculations", option_d: "Time tracking", correct_answer: "B" },
            { id: 27, question: "Which free tool can help with automated email responses for HR inquiries?", option_a: "Gmail Smart Compose", option_b: "Notepad", option_c: "File manager", option_d: "System settings", correct_answer: "A" },
            { id: 28, question: "What is Grammarly (free version) most useful for in HR?", option_a: "Data analysis", option_b: "Improving writing quality in HR communications", option_c: "Scheduling meetings", option_d: "Managing databases", correct_answer: "B" },
            { id: 29, question: "Which free tool can help with creating employee training materials?", option_a: "Google Slides with AI design suggestions", option_b: "Calculator", option_c: "Clock app", option_d: "Weather app", correct_answer: "A" },
            { id: 30, question: "What is Typeform (free tier) best used for in HR?", option_a: "Video conferencing", option_b: "Creating engaging employee surveys and forms", option_c: "File storage", option_d: "Project management", correct_answer: "B" },
            { id: 31, question: "Which free tool can help with resume parsing and analysis?", option_a: "Python with spaCy library", option_b: "Text editor", option_c: "Music player", option_d: "Photo viewer", correct_answer: "A" },
            { id: 32, question: "What is the main advantage of using Slack (free version) for HR?", option_a: "Payroll processing", option_b: "Team communication and bot integrations", option_c: "Data analysis", option_d: "Document printing", correct_answer: "B" },
            { id: 33, question: "Which free tool can help with employee onboarding workflows?", option_a: "Trello (free version)", option_b: "Gaming app", option_c: "Music streaming", option_d: "Photo editing", correct_answer: "A" },
            { id: 34, question: "What is Google Translate most useful for in HR?", option_a: "Data analysis", option_b: "Supporting multilingual workforce communication", option_c: "Time tracking", option_d: "Payroll processing", correct_answer: "B" },
            { id: 35, question: "Which free tool can help with creating organizational charts?", option_a: "Lucidchart (free version)", option_b: "Calculator", option_c: "File explorer", option_d: "System monitor", correct_answer: "A" },
            { id: 36, question: "What is the benefit of using Zoom (free version) for HR?", option_a: "Data storage", option_b: "Remote interviews and virtual meetings", option_c: "Document editing", option_d: "Email management", correct_answer: "B" },
            { id: 37, question: "Which free tool can help with employee performance tracking?", option_a: "Google Sheets with templates", option_b: "Desktop wallpaper", option_c: "Screen saver", option_d: "System clock", correct_answer: "A" },
            { id: 38, question: "What is Microsoft Forms (free with account) best used for?", option_a: "Video editing", option_b: "Creating surveys and collecting employee feedback", option_c: "Photo management", option_d: "Music creation", correct_answer: "B" },
            { id: 39, question: "Which free tool can help with automated social media recruiting?", option_a: "Hootsuite (free version)", option_b: "File compressor", option_c: "Image viewer", option_d: "Audio recorder", correct_answer: "A" },
            { id: 40, question: "What is the main limitation of free AI tools for HR?", option_a: "They don't work at all", option_b: "Limited features and usage quotas compared to paid versions", option_c: "They are illegal to use", option_d: "They only work on weekends", correct_answer: "B" },
            // Section 3: AI Applications in HR (Questions 41-70)
            { id: 41, question: "What is AI-powered recruitment?", option_a: "Hiring only AI specialists", option_b: "Using AI to screen resumes and identify qualified candidates", option_c: "Replacing all recruiters with robots", option_d: "Only recruiting for AI companies", correct_answer: "B" },
            { id: 42, question: "How can AI help with employee engagement?", option_a: "By monitoring all employee activities", option_b: "By analyzing feedback and predicting engagement levels", option_c: "By eliminating all employee interactions", option_d: "By reducing employee benefits", correct_answer: "B" },
            { id: 43, question: "What is predictive HR analytics?", option_a: "Predicting the weather for HR events", option_b: "Using data to forecast HR outcomes like turnover", option_c: "Predicting employee lunch preferences", option_d: "Forecasting office supply needs", correct_answer: "B" },
            { id: 44, question: "How can AI improve the onboarding process?", option_a: "By eliminating onboarding entirely", option_b: "By personalizing content and automating routine tasks", option_c: "By making onboarding longer", option_d: "By reducing new hire support", correct_answer: "B" },
            { id: 45, question: "What is talent analytics?", option_a: "Analyzing employee artistic talents", option_b: "Using data to understand and optimize workforce performance", option_c: "Measuring employee height and weight", option_d: "Tracking employee hobbies", correct_answer: "B" },
            { id: 46, question: "How can AI help with performance management?", option_a: "By eliminating performance reviews", option_b: "By providing data-driven insights and continuous feedback", option_c: "By reducing employee goals", option_d: "By increasing manager workload", correct_answer: "B" },
            { id: 47, question: "What is AI-powered learning and development?", option_a: "Teaching AI to HR staff", option_b: "Personalizing training content based on employee needs", option_c: "Only offering AI courses", option_d: "Replacing all trainers with AI", correct_answer: "B" },
            { id: 48, question: "How can AI help with diversity and inclusion?", option_a: "By eliminating diversity programs", option_b: "By identifying bias in hiring and promotion processes", option_c: "By reducing workforce diversity", option_d: "By ignoring inclusion metrics", correct_answer: "B" },
            { id: 49, question: "What is workforce planning with AI?", option_a: "Planning office layouts", option_b: "Predicting future workforce needs and skills gaps", option_c: "Organizing employee parties", option_d: "Scheduling vacation time", correct_answer: "B" },
            { id: 50, question: "How can AI improve compensation and benefits?", option_a: "By reducing all employee compensation", option_b: "By analyzing market data and ensuring fair pay", option_c: "By eliminating all benefits", option_d: "By increasing only executive pay", correct_answer: "B" },
            { id: 51, question: "What is sentiment analysis in HR?", option_a: "Analyzing employee emotions and attitudes from text", option_b: "Measuring employee physical health", option_c: "Tracking employee location", option_d: "Monitoring employee purchases", correct_answer: "A" },
            { id: 52, question: "How can AI help with employee retention?", option_a: "By locking employees in the office", option_b: "By identifying flight risks and suggesting interventions", option_c: "By reducing employee salaries", option_d: "By eliminating career development", correct_answer: "B" },
            { id: 53, question: "What is automated interviewing with AI?", option_a: "Robots conducting all interviews", option_b: "AI-assisted scheduling and initial screening", option_c: "Eliminating all human interaction", option_d: "Only video interviews", correct_answer: "B" },
            { id: 54, question: "How can AI help with skills assessment?", option_a: "By eliminating all assessments", option_b: "By analyzing performance data and identifying skill gaps", option_c: "By reducing training opportunities", option_d: "By standardizing all job roles", correct_answer: "B" },
            { id: 55, question: "What is workforce analytics?", option_a: "Analyzing employee physical fitness", option_b: "Using data to understand workforce trends and patterns", option_c: "Tracking employee social media", option_d: "Monitoring employee food choices", correct_answer: "B" },
            { id: 56, question: "How can AI improve HR compliance?", option_a: "By ignoring all regulations", option_b: "By monitoring adherence to labor laws and policies", option_c: "By reducing compliance requirements", option_d: "By eliminating all documentation", correct_answer: "B" },
            { id: 57, question: "What is the role of AI in succession planning?", option_a: "Planning office successions", option_b: "Identifying and developing future leaders", option_c: "Eliminating leadership roles", option_d: "Reducing promotion opportunities", correct_answer: "B" },
            { id: 58, question: "How can AI help with employee wellness programs?", option_a: "By eliminating wellness programs", option_b: "By personalizing wellness recommendations", option_c: "By monitoring employee medical records", option_d: "By reducing health benefits", correct_answer: "B" },
            { id: 59, question: "What is AI-powered people analytics?", option_a: "Analyzing employee personal lives", option_b: "Using data science to understand workforce behavior", option_c: "Tracking employee spending habits", option_d: "Monitoring employee families", correct_answer: "B" },
            { id: 60, question: "How can AI help with internal mobility?", option_a: "By restricting employee movement", option_b: "By matching employees with suitable internal opportunities", option_c: "By eliminating internal job postings", option_d: "By reducing career development", correct_answer: "B" },
            { id: 61, question: "What is predictive hiring?", option_a: "Hiring based on predictions only", option_b: "Using data to predict candidate success", option_c: "Hiring without interviews", option_d: "Predicting hiring costs only", correct_answer: "B" },
            { id: 62, question: "How can AI help with employee feedback?", option_a: "By eliminating all feedback", option_b: "By analyzing feedback patterns and sentiment", option_c: "By reducing feedback frequency", option_d: "By ignoring employee opinions", correct_answer: "B" },
            { id: 63, question: "What is the role of AI in culture analytics?", option_a: "Analyzing office decorations", option_b: "Measuring and improving organizational culture", option_c: "Tracking employee clothing choices", option_d: "Monitoring office temperature", correct_answer: "B" },
            { id: 64, question: "How can AI help with exit interviews?", option_a: "By eliminating exit interviews", option_b: "By analyzing exit interview data for insights", option_c: "By preventing employees from leaving", option_d: "By reducing exit interview questions", correct_answer: "B" },
            { id: 65, question: "What is AI-powered talent sourcing?", option_a: "Only using AI companies as talent sources", option_b: "Using AI to identify and attract potential candidates", option_c: "Eliminating all talent sourcing", option_d: "Reducing candidate pools", correct_answer: "B" },
            { id: 66, question: "How can AI help with team formation?", option_a: "By randomly assigning team members", option_b: "By analyzing skills and personalities for optimal team composition", option_c: "By eliminating all teams", option_d: "By reducing team sizes", correct_answer: "B" },
            { id: 67, question: "What is the benefit of AI in HR reporting?", option_a: "Eliminating all reports", option_b: "Automated generation of insights and dashboards", option_c: "Making reports more complex", option_d: "Reducing report frequency", correct_answer: "B" },
            { id: 68, question: "How can AI help with employee recognition?", option_a: "By eliminating recognition programs", option_b: "By identifying achievement patterns and suggesting recognition", option_c: "By reducing recognition frequency", option_d: "By standardizing all recognition", correct_answer: "B" },
            { id: 69, question: "What is AI's role in career pathing?", option_a: "Eliminating career development", option_b: "Suggesting personalized career progression paths", option_c: "Standardizing all career paths", option_d: "Reducing promotion opportunities", correct_answer: "B" },
            { id: 70, question: "How can AI help with HR resource allocation?", option_a: "By eliminating HR resources", option_b: "By optimizing HR team workload and priorities", option_c: "By reducing HR staff", option_d: "By increasing HR costs", correct_answer: "B" },
            // Section 4: Practical Implementation and Ethics (Questions 71-100)
            { id: 71, question: "What is the first step in implementing AI in HR?", option_a: "Buying expensive AI software", option_b: "Identifying specific HR problems to solve", option_c: "Replacing all HR staff", option_d: "Eliminating current processes", correct_answer: "B" },
            { id: 72, question: "What type of data is most important for HR AI implementations?", option_a: "Any available data", option_b: "Clean, relevant, and representative HR data", option_c: "Only recent data", option_d: "Personal employee data", correct_answer: "B" },
            { id: 73, question: "How should HR teams start with AI adoption?", option_a: "Implement all AI tools simultaneously", option_b: "Start with small pilot projects", option_c: "Replace all existing systems", option_d: "Ignore current HR processes", correct_answer: "B" },
            { id: 74, question: "What is the most important ethical consideration when using AI in HR?", option_a: "Cost reduction", option_b: "Fairness and avoiding discrimination", option_c: "Speed of implementation", option_d: "Technology complexity", correct_answer: "B" },
            { id: 75, question: "How can HR professionals prepare for AI implementation?", option_a: "By avoiding all technology", option_b: "By learning AI basics and data literacy", option_c: "By resisting change", option_d: "By delegating all AI tasks", correct_answer: "B" },
            { id: 76, question: "What is the role of leadership in HR AI adoption?", option_a: "Ignoring AI initiatives", option_b: "Providing strategic support and resources", option_c: "Blocking AI implementation", option_d: "Implementing AI without planning", correct_answer: "B" },
            { id: 77, question: "How can you measure the success of AI in HR?", option_a: "By counting AI tools purchased", option_b: "By tracking HR KPIs like time-to-hire and employee satisfaction", option_c: "By measuring training hours only", option_d: "By counting data processed", correct_answer: "B" },
            { id: 78, question: "What is the importance of employee privacy in HR AI?", option_a: "Privacy is not important", option_b: "Protecting employee data while gaining insights", option_c: "Monitoring all employee activities", option_d: "Sharing all data freely", correct_answer: "B" },
            { id: 79, question: "How can you ensure AI fairness in hiring?", option_a: "By using any available AI tool", option_b: "By testing for bias and ensuring diverse training data", option_c: "By eliminating human oversight", option_d: "By using AI for all decisions", correct_answer: "B" },
            { id: 80, question: "What is the benefit of starting with free AI tools in HR?", option_a: "They are always the best option", option_b: "They allow experimentation with minimal investment", option_c: "They have no limitations", option_d: "They require no learning", correct_answer: "B" },
            { id: 81, question: "How can you integrate AI tools with existing HR systems?", option_a: "By replacing all current systems", option_b: "By using APIs and gradual integration", option_c: "By keeping systems completely separate", option_d: "By eliminating all current systems", correct_answer: "B" },
            { id: 82, question: "What is the importance of transparency in HR AI?", option_a: "Transparency is unnecessary", option_b: "Employees should understand how AI affects them", option_c: "All AI processes should be secret", option_d: "Only HR should know about AI use", correct_answer: "B" },
            { id: 83, question: "How can you validate AI results in HR?", option_a: "By accepting all AI recommendations", option_b: "By comparing with human judgment and business outcomes", option_c: "By ignoring validation", option_d: "By using only AI validation", correct_answer: "B" },
            { id: 84, question: "What is the role of continuous learning in HR AI?", option_a: "Learning is unnecessary after initial training", option_b: "Staying updated with AI developments and best practices", option_c: "Only technical staff need to learn", option_d: "Learning should be avoided", correct_answer: "B" },
            { id: 85, question: "How can you scale AI solutions across HR functions?", option_a: "By implementing everything at once", option_b: "By starting with successful pilots and expanding gradually", option_c: "By using different AI tools for each function", option_d: "By avoiding scaling altogether", correct_answer: "B" },
            { id: 86, question: "What is the importance of change management in HR AI adoption?", option_a: "Change management is unnecessary", option_b: "Helping employees adapt to AI-enhanced processes", option_c: "Forcing adoption without support", option_d: "Ignoring employee concerns", correct_answer: "B" },
            { id: 87, question: "How can you ensure AI augments rather than replaces HR professionals?", option_a: "By automating all HR tasks", option_b: "By focusing on AI as a tool to enhance human capabilities", option_c: "By eliminating human involvement", option_d: "By using AI for strategic decisions only", correct_answer: "B" },
            { id: 88, question: "What is the benefit of cross-functional collaboration in HR AI projects?", option_a: "Collaboration slows down projects", option_b: "Brings diverse perspectives and expertise", option_c: "Technical skills are sufficient", option_d: "HR should work in isolation", correct_answer: "B" },
            { id: 89, question: "How can you ensure AI solutions are user-friendly for HR teams?", option_a: "By making them technically complex", option_b: "By involving HR users in design and testing", option_c: "By focusing only on technical features", option_d: "By ignoring user feedback", correct_answer: "B" },
            { id: 90, question: "What is the importance of setting realistic expectations for HR AI?", option_a: "Expectations don't matter", option_b: "Realistic expectations prevent disappointment and guide implementation", option_c: "Expectations should always be minimal", option_d: "AI should exceed all expectations", correct_answer: "B" },
            { id: 91, question: "How can you address employee concerns about AI in HR?", option_a: "By ignoring all concerns", option_b: "By providing education and transparent communication", option_c: "By forcing acceptance", option_d: "By implementing AI secretly", correct_answer: "B" },
            { id: 92, question: "What is the role of data governance in HR AI?", option_a: "Data governance is unnecessary", option_b: "Ensuring data quality, security, and compliance", option_c: "Making data access unrestricted", option_d: "Eliminating all data policies", correct_answer: "B" },
            { id: 93, question: "How can you create a culture of AI adoption in HR?", option_a: "By mandating AI use", option_b: "By promoting learning, experimentation, and innovation", option_c: "By keeping AI knowledge restricted", option_d: "By avoiding cultural changes", correct_answer: "B" },
            { id: 94, question: "What is the benefit of continuous monitoring of HR AI systems?", option_a: "Monitoring is unnecessary", option_b: "Ensuring systems remain effective and unbiased", option_c: "Monitoring increases costs unnecessarily", option_d: "It complicates operations", correct_answer: "B" },
            { id: 95, question: "How can you ensure AI solutions are maintainable in HR?", option_a: "By making them as complex as possible", option_b: "By using clear documentation and standard practices", option_c: "By avoiding all maintenance", option_d: "By keeping solutions proprietary", correct_answer: "B" },
            { id: 96, question: "What is the importance of ROI calculation for HR AI projects?", option_a: "ROI calculations are unnecessary", option_b: "Justifying investments and measuring business impact", option_c: "Only costs matter in AI projects", option_d: "ROI should be ignored", correct_answer: "B" },
            { id: 97, question: "How can you ensure AI solutions comply with employment laws?", option_a: "By ignoring all legal requirements", option_b: "By working with legal teams and staying updated on regulations", option_c: "By assuming AI is always compliant", option_d: "By avoiding legal consultation", correct_answer: "B" },
            { id: 98, question: "What is the benefit of having diverse teams work on HR AI projects?", option_a: "Diversity complicates projects", option_b: "Diverse perspectives help identify and prevent bias", option_c: "Homogeneous teams work better", option_d: "Diversity is not relevant to AI", correct_answer: "B" },
            { id: 99, question: "How can you prepare for future developments in HR AI?", option_a: "By ignoring future trends", option_b: "By staying flexible and continuing education", option_c: "By using only current technology", option_d: "By avoiding technology updates", correct_answer: "B" },
            { id: 100, question: "What is the key to successful AI implementation in HR?", option_a: "Using the most expensive AI tools", option_b: "Balancing technology with human insight and ethical considerations", option_c: "Replacing all human decision-making", option_d: "Implementing all available AI tools", correct_answer: "B" }
        ];
    }

    async getUserDepartment(email) {

        console.log(`Looking up department for email: ${email}`);
        

        console.log('Available users in database:', this.users.map(u => u.email));
        
        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        

        if (user) {
            console.log(`Found user with department: ${user.department}`);
        } else {
            console.log('No user found with that email');
        }
        
        return user ? user.department : null;
    }

    async getCourseLinks(department) {
        console.log(`Getting course links for department: ${department}`);
        
        const courses = this.courseLinks[department] || [];
        console.log(`Found ${courses.length} courses for ${department}`);
        
        return courses;
    }

    async getQuizQuestions(department) {
        console.log('Retrieving quiz questions');
        if (department === 'Finance') {
            return [...this.financeQuizQuestions].sort(() => Math.random() - 0.5);
        }
        if (department === 'Human Resources') {
            return [...this.hrQuizQuestions].sort(() => Math.random() - 0.5);
        }
        return [...this.quizQuestions].sort(() => Math.random() - 0.5);
    }

    async saveQuizResult(email, score, totalQuestions, passed) {
        console.log(`Saving quiz result for ${email}: Score ${score}/${totalQuestions}, Passed: ${passed}`);
        this.quizResults.push({
            email,
            score,
            totalQuestions,
            passed,
            completedAt: new Date().toISOString()
        });
    }
}

module.exports = { DatabaseService };