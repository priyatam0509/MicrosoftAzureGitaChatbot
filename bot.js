const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');
const { DatabaseService } = require('./services/databaseService');
const { CertificateService } = require('./services/certificateService');

class QuizBot extends ActivityHandler {
    constructor() {
        super();
        this.userSessions = {};
        this.dbService = new DatabaseService();
        this.certService = new CertificateService();

        this.onMembersAdded(async (context, next) => {
            for (let member of context.activity.membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    // Welcome message with Yes/No buttons
                    const welcomeCard = {
                        type: 'AdaptiveCard',
                        version: '1.2',
                        body: [
                            {
                                type: 'TextBlock',
                                text: '🎯 **Welcome to GITA Bot — Your AI Learning Companion at Inventronics!**\n\nEmpowering you with the digital knowledge and skills to thrive in today’s tech-driven world.\nWhether you\'re brushing up on basics or exploring advanced topics, GITA Bot is here to guide your learning journey — anytime, anywhere.\n\n🧠 From digital literacy to cutting-edge AI applications,\n📚 Learn at your pace, level up your skills, and stay future-ready.\n\n👉 Do you want to proceed?',
                                wrap: true
                            }
                        ],
                        actions: [
                            {
                                type: 'Action.Submit',
                                title: 'Yes',
                                data: { action: 'proceed', proceed: true }
                            },
                            {
                                type: 'Action.Submit',
                                title: 'No',
                                data: { action: 'proceed', proceed: false }
                            }
                        ]
                    };
                    await context.sendActivity({ attachments: [CardFactory.adaptiveCard(welcomeCard)] });
                }
            }
            await next();
        });

        this.onMessage(async (context, next) => {
            const userId = context.activity.from.id;
            const userText = context.activity.text?.trim();
            const cardValue = context.activity.value;

            // Session creation moved after proceed step
            if (!this.userSessions[userId]) {
                this.userSessions[userId] = { step: 'PROCEED_PROMPT' };
            }

            const session = this.userSessions[userId];

            // Handle initial proceed prompt (Yes/No)
            if (
                (cardValue && cardValue.action === 'proceed') ||
                (session.step === 'PROCEED_PROMPT' && userText)
            ) {
                let proceed;
                if (cardValue && cardValue.action === 'proceed') {
                    proceed = cardValue.proceed;
                } else if (userText) {
                    if (/^yes$/i.test(userText)) proceed = true;
                    else if (/^no$/i.test(userText)) proceed = false;
                    else {
                        // Invalid input, prompt again
                        await context.sendActivity({
                            attachments: [CardFactory.adaptiveCard({
                                type: 'AdaptiveCard',
                                version: '1.2',
                                body: [{ type: 'TextBlock', text: 'Please respond with Yes or No to proceed.', wrap: true }],
                                actions: [
                                    { type: 'Action.Submit', title: 'Yes', data: { action: 'proceed', proceed: true } },
                                    { type: 'Action.Submit', title: 'No', data: { action: 'proceed', proceed: false } }
                                ]
                            })]
                        });
                        return;
                    }
                }
                if (proceed) {
                    session.step = 'EMAIL_REQUEST';
                    await context.sendActivity('Please enter your **email ID** to begin:');
                } else {
                    session.step = 'PROCEED_PROMPT';
                    await context.sendActivity({
                        attachments: [CardFactory.adaptiveCard({
                            type: 'AdaptiveCard',
                            version: '1.2',
                            body: [{ type: 'TextBlock', text: 'Okay, click on Yes whenever you want to proceed.', wrap: true }],
                            actions: [
                                { type: 'Action.Submit', title: 'Yes', data: { action: 'proceed', proceed: true } }
                            ]
                        })]
                    });
                }
                return;
            }

            // Only create a new session if one does not exist
            if (!this.userSessions[userId]) {
                this.userSessions[userId] = {
                    step: 'EMAIL_REQUEST',
                    email: '',
                    department: '',
                    courseLinks: [],
                    questions: [],
                    currentQuestionIndex: 0,
                    answers: [],
                    score: 0
                };
                await context.sendActivity('Please enter your **email ID** to begin:');
                return;
            }

            // --- FIX: Handle course completion by button OR text ---
            if (
                (cardValue && cardValue.action === 'course_completed' && session.step === 'COURSE_COMPLETION_CHECK') ||
                (session.step === 'COURSE_COMPLETION_CHECK' && userText)
            ) {
                let completed;
                if (cardValue && cardValue.action === 'course_completed') {
                    completed = cardValue.completed;
                } else if (userText) {
                    if (/^yes$/i.test(userText)) {
                        completed = true;
                    } else if (/^no$/i.test(userText)) {
                        completed = false;
                    } else {
                        // Invalid input, prompt again with the same card
                        await this.showCourseLinks(context, session);
                        return;
                    }
                }
                await this.handleCourseCompletion(context, completed, session);
                return;
            }

            // Handle test now prompt (YES/NO to "Do you want to give the test now?")
            if (
                (cardValue && cardValue.action === 'start_test' && session.step === 'TEST_NOW_PROMPT') ||
                (session.step === 'TEST_NOW_PROMPT' && userText)
            ) {
                let startTest;
                if (cardValue && cardValue.action === 'start_test') {
                    startTest = cardValue.start;
                } else if (userText) {
                    if (/^yes$/i.test(userText)) startTest = true;
                    else if (/^no$/i.test(userText)) startTest = false;
                    else {
                        // Invalid input, prompt again
                        const testNowCard = {
                            type: 'AdaptiveCard',
                            version: '1.2',
                            body: [
                                { type: 'TextBlock', text: '📝 Do you want to give the test now?', weight: 'Bolder', size: 'Medium', horizontalAlignment: 'Center' }
                            ],
                            actions: [
                                { type: 'Action.Submit', title: '✅ Yes, start the test', data: { action: 'start_test', start: true }, style: 'positive' },
                                { type: 'Action.Submit', title: '❌ No, I need more time', data: { action: 'start_test', start: false }, style: 'default' }
                            ]
                        };
                        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(testNowCard)] });
                        return;
                    }
                }
                if (startTest) {
                    await context.sendActivity('🎓 Great! Preparing your quiz... Please wait.');
                    await this.startQuiz(context, session);
                } else {
                    await context.sendActivity('👍 No problem! Take your time and please let us know when you are ready.');
                    await this.showCourseLinks(context, session);
                }
                return;
            }

            // Handle quiz answer (button or text) if in quiz
            if (
                (cardValue && cardValue.answer && session.step === 'QUIZ_IN_PROGRESS') ||
                (userText && session.step === 'QUIZ_IN_PROGRESS')
            ) {
                // Prefer button answer, fallback to text
                const answer = cardValue && cardValue.answer ? cardValue.answer : userText;
                await this.handleQuizAnswer(context, answer, session);
                return;
            }

            // Handle text input for email or other steps
            if (userText) {
                await this.handleUserFlow(context, userText, userId);
                return;
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            for (let member of context.activity.membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    // Welcome message with Yes/No buttons
                    const welcomeCard = {
                        type: 'AdaptiveCard',
                        version: '1.2',
                        body: [
                            {
                                type: 'TextBlock',
                                text: '🎯 **Welcome to GITA Bot — Your AI Learning Companion at Inventronics!**\n\nEmpowering you with the digital knowledge and skills to thrive in today’s tech-driven world.\nWhether you\'re brushing up on basics or exploring advanced topics, GITA Bot is here to guide your learning journey — anytime, anywhere.\n\n🧠 From digital literacy to cutting-edge AI applications,\n📚 Learn at your pace, level up your skills, and stay future-ready.\n\n👉 Do you want to proceed?',
                                wrap: true
                            }
                        ],
                        actions: [
                            {
                                type: 'Action.Submit',
                                title: 'Yes',
                                data: { action: 'proceed', proceed: true }
                            },
                            {
                                type: 'Action.Submit',
                                title: 'No',
                                data: { action: 'proceed', proceed: false }
                            }
                        ]
                    };
                    await context.sendActivity({ attachments: [CardFactory.adaptiveCard(welcomeCard)] });
                }
            }
            await next();
        });
    }

    async handleUserFlow(context, userText, userId) {
        const session = this.userSessions[userId];
        console.log(`Processing user flow for step: ${session.step}`);

        switch (session.step) {
            case 'EMAIL_REQUEST':
                console.log(`Handling email input: ${userText}`);
                await this.handleEmailInput(context, userText, session);
                break;
            case 'COURSE_LINKS_SHOWN':
                console.log('Course links shown, waiting for course completion confirmation');
                await context.sendActivity('📚 Please review the course materials above and click "Yes" when you have completed the course.');
                break;
            case 'QUIZ_STARTING':
                console.log('User in QUIZ_STARTING state, proceeding to show first question');
                // If we're stuck in QUIZ_STARTING, force start the quiz
                await this.startQuiz(context, session);
                break;
            case 'QUIZ_IN_PROGRESS':
                console.log(`Handling quiz answer: ${userText}`);
                await this.handleQuizAnswer(context, userText, session);
                break;
            case 'QUIZ_COMPLETED':
                console.log('Quiz completed, restarting');
                await this.restartQuiz(context, userId);
                break;
            default:
                console.log(`Unknown step: ${session.step}, resetting to EMAIL_REQUEST`);
                // If we're in an unknown state, reset to email request
                session.step = 'EMAIL_REQUEST';
                await context.sendActivity('🔄 Let\'s restart the process. Please enter your **email ID**:');
                break;
        }
    }

    async handleEmailInput(context, email, session) {
        console.log(`Processing email input: '${email}'`);

        // Clean up the email - trim whitespace and lowercase
        const cleanEmail = email.trim().toLowerCase();
        console.log(`Cleaned email: '${cleanEmail}'`);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            console.log('Email validation failed');
            await context.sendActivity('❌ Please enter a valid email address:');
            return;
        }

        console.log('Email format is valid');
        session.email = cleanEmail;

        // Get department from database
        console.log(`Looking up department for: ${cleanEmail}`);
        const department = await this.dbService.getUserDepartment(cleanEmail);
        console.log(`Department lookup result: ${department}`);

        if (!department) {
            await context.sendActivity('❌ Email not found in our database. Please enter a valid email address:');
            return;
        }

        session.department = department;

        await context.sendActivity(
            `✅ Hello, ${cleanEmail}\nDepartment: ${department}\n\n🔄 Retrieving course materials tailored for your department. Please hold on while we gather the resources.`
        );

        // Get course links for the department and show them
        await this.showCourseLinks(context, session);

        // Set the step so the bot doesn't ask for email again
        session.step = 'COURSE_COMPLETION_CHECK';
        return; // Prevent further processing
    }

    async showCourseLinks(context, session) {
        console.log(`Getting course links for department: ${session.department}`);

        // Get course links from database based on department
        const courseLinks = await this.dbService.getCourseLinks(session.department);
        console.log(`Retrieved ${courseLinks.length} course links`);

        if (courseLinks.length === 0) {
            await context.sendActivity('❌ No course materials found for your department. Please contact the administrator.');
            return;
        }

        session.courseLinks = courseLinks;

        // Create course links card
        const courseCard = {
            type: 'AdaptiveCard',
            version: '1.2',
            body: [
                {
                    type: 'TextBlock',
                    text: '📚 Course Materials',
                    weight: 'Bolder',
                    size: 'Large',
                    color: 'Accent'
                },
                {
                    type: 'TextBlock',
                    text: `Department: ${session.department}`,
                    weight: 'Bolder',
                    size: 'Medium',
                    spacing: 'Medium'
                },
                {
                    type: 'TextBlock',
                    text: 'Please complete the following course materials before taking the quiz:',
                    wrap: true,
                    spacing: 'Medium'
                }
            ]
        };

        // Add course links to the card
        courseLinks.forEach((course, index) => {
            courseCard.body.push({
                type: 'TextBlock',
                text: `**${index + 1}. ${course.title}**`,
                weight: 'Bolder',
                spacing: 'Medium'
            });

            if (course.description) {
                courseCard.body.push({
                    type: 'TextBlock',
                    text: course.description,
                    wrap: true,
                    spacing: 'Small'
                });
            }

            courseCard.body.push({
                type: 'TextBlock',
                text: `[📖 Access Course Material](${course.url})`,
                spacing: 'Small'
            });
        });

        // Add completion check section
        courseCard.body.push({
            type: 'TextBlock',
            text: '🎯 **Have you completed all the course materials?**',
            weight: 'Bolder',
            size: 'Medium',
            spacing: 'Large'
        });

        // Add action buttons
        courseCard.actions = [
            {
                type: 'Action.Submit',
                title: '✅ Yes, I have completed the course',
                data: {
                    action: 'course_completed',
                    completed: true
                },
                style: 'positive'
            },
            {
                type: 'Action.Submit',
                title: '❌ No, I need more time',
                data: {
                    action: 'course_completed',
                    completed: false
                },
                style: 'default'
            }
        ];

        const attachment = CardFactory.adaptiveCard(courseCard);
        await context.sendActivity({ attachments: [attachment] });

        session.step = 'COURSE_COMPLETION_CHECK'; // Make sure this is set here too
    }

    async handleCourseCompletion(context, completed, session) {
        console.log(`Course completion response: ${completed}`);

        if (completed) {
            // Show a new card: Do you want to give the test now?
            const testNowCard = {
                type: 'AdaptiveCard',
                version: '1.2',
                body: [
                    {
                        type: 'TextBlock',
                        text: '📝 Do you want to give the test now?',
                        weight: 'Bolder',
                        size: 'Medium',
                        horizontalAlignment: 'Center'
                    }
                ],
                actions: [
                    {
                        type: 'Action.Submit',
                        title: '✅ Yes, start the test',
                        data: {
                            action: 'start_test',
                            start: true
                        },
                        style: 'positive'
                    },
                    {
                        type: 'Action.Submit',
                        title: '❌ No, I need more time',
                        data: {
                            action: 'start_test',
                            start: false
                        },
                        style: 'default'
                    }
                ]
            };
            const attachment = CardFactory.adaptiveCard(testNowCard);
            await context.sendActivity({ attachments: [attachment] });
            session.step = 'TEST_NOW_PROMPT';
        } else {
            // Instead of just a message, show the same course completion card again
            const courseCompletionCard = {
                type: 'AdaptiveCard',
                version: '1.2',
                body: [
                    {
                        type: 'TextBlock',
                        text: '📚 Please take your time to complete the course materials. Once you are ready, let us know below.',
                        wrap: true,
                        weight: 'Bolder',
                        size: 'Medium'
                    },
                    {
                        type: 'TextBlock',
                        text: 'Remember: You need to complete all course materials before taking the quiz to ensure you are well-prepared.',
                        wrap: true,
                        spacing: 'Medium'
                    },
                    {
                        type: 'TextBlock',
                        text: '🎯 **Have you completed all the course materials?**',
                        weight: 'Bolder',
                        size: 'Medium',
                        spacing: 'Large'
                    }
                ],
                actions: [
                    {
                        type: 'Action.Submit',
                        title: '✅ Yes, I have completed the course',
                        data: {
                            action: 'course_completed',
                            completed: true
                        },
                        style: 'positive'
                    },
                    {
                        type: 'Action.Submit',
                        title: '❌ No, I need more time',
                        data: {
                            action: 'course_completed',
                            completed: false
                        },
                        style: 'default'
                    }
                ]
            };
            const attachment = CardFactory.adaptiveCard(courseCompletionCard);
            await context.sendActivity({ attachments: [attachment] });
            session.step = 'COURSE_COMPLETION_CHECK';
        }
    }

    async startQuiz(context, session) {
        session.questions = await this.dbService.getQuizQuestions();

        if (session.questions.length === 0) {
            await context.sendActivity('❌ Unable to load quiz questions. Please try again later.');
            return;
        }

        session.step = 'QUIZ_IN_PROGRESS';
        session.currentQuestionIndex = 0;
        session.answers = [];
        session.score = 0;

        await context.sendActivity('🎯 **Quiz Started!**\n\nYou will be asked 10 questions. Choose the best answer by clicking on one of the options.\n\n⏱️ Let\'s begin!');

        await this.showCurrentQuestion(context, session);
    }

    async showCurrentQuestion(context, session) {
        const question = session.questions[session.currentQuestionIndex];
        const questionNumber = session.currentQuestionIndex + 1;

        const questionCard = {
            type: 'AdaptiveCard',
            version: '1.2',
            body: [
                {
                    type: 'TextBlock',
                    text: `Question ${questionNumber}/10`,
                    weight: 'Bolder',
                    size: 'Medium',
                    color: 'Accent'
                },
                {
                    type: 'TextBlock',
                    text: question.question,
                    wrap: true,
                    weight: 'Bolder',
                    size: 'Medium',
                    spacing: 'Medium'
                }
            ],
            actions: [
                {
                    type: 'Action.Submit',
                    title: `A) ${question.option_a}`,
                    data: {
                        answer: 'A',
                        questionId: question.id
                    },
                    style: 'default'
                },
                {
                    type: 'Action.Submit',
                    title: `B) ${question.option_b}`,
                    data: {
                        answer: 'B',
                        questionId: question.id
                    },
                    style: 'default'
                },
                {
                    type: 'Action.Submit',
                    title: `C) ${question.option_c}`,
                    data: {
                        answer: 'C',
                        questionId: question.id
                    },
                    style: 'default'
                },
                {
                    type: 'Action.Submit',
                    title: `D) ${question.option_d}`,
                    data: {
                        answer: 'D',
                        questionId: question.id
                    },
                    style: 'default'
                }
            ]
        };

        const attachment = CardFactory.adaptiveCard(questionCard);
        await context.sendActivity({ attachments: [attachment] });
    }

    async handleQuizAnswer(context, answer, session) {
        console.log('Handling quiz answer, raw input:', answer);

        let userAnswer;

        // Handle both button clicks and text input for flexibility
        if (context.activity.value && context.activity.value.answer) {
            // This is a button click from adaptive card
            userAnswer = context.activity.value.answer;
            console.log('Answer from button click:', userAnswer);
        } else {
            // This is text input
            userAnswer = answer.toUpperCase();
            console.log('Answer from text:', userAnswer);

            const validAnswers = ['A', 'B', 'C', 'D'];
            if (!validAnswers.includes(userAnswer)) {
                await context.sendActivity('❌ Please select one of the provided options (A, B, C, or D)');
                return;
            }
        }

        const currentQuestion = session.questions[session.currentQuestionIndex];
        const isCorrect = userAnswer === currentQuestion.correct_answer.toUpperCase();

        session.answers.push({
            questionId: currentQuestion.id,
            userAnswer: userAnswer,
            correctAnswer: currentQuestion.correct_answer,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            session.score++;
        }

        session.currentQuestionIndex++;

        // Check if quiz is complete
        if (session.currentQuestionIndex >= session.questions.length) {
            await this.showQuizResults(context, session);
        } else {
            await context.sendActivity(isCorrect ? '✅ Correct!' : '❌ Incorrect');
            await this.showCurrentQuestion(context, session);
        }
    }

    async showQuizResults(context, session) {
        const totalQuestions = session.questions.length;
        const percentage = Math.round((session.score / totalQuestions) * 100);
        const passed = percentage >= 70; // 70% pass threshold

        // Save results to database
        await this.dbService.saveQuizResult(session.email, session.score, totalQuestions, passed);

        const resultCard = {
            type: 'AdaptiveCard',
            version: '1.2',
            body: [
                {
                    type: 'TextBlock',
                    text: '🎯 Quiz Completed!',
                    weight: 'Bolder',
                    size: 'Large',
                    horizontalAlignment: 'Center'
                },
                {
                    type: 'TextBlock',
                    text: `Score: ${session.score}/${totalQuestions} (${percentage}%)`,
                    size: 'Medium',
                    horizontalAlignment: 'Center',
                    weight: 'Bolder'
                },
                {
                    type: 'TextBlock',
                    text: passed ? '🎉 Congratulations! You have qualified!' : '😔 Sorry, you did not qualify. (Minimum: 70%)',
                    color: passed ? 'Good' : 'Attention',
                    weight: 'Bolder',
                    horizontalAlignment: 'Center',
                    wrap: true
                }
            ]
        };

        if (passed) {
            resultCard.body.push({
                type: 'TextBlock',
                text: '📜 Your certificate has been generated and will be emailed to you.',
                style: 'emphasis',
                wrap: true,
                horizontalAlignment: 'Center'
            });

            // Generate certificate using the certificate service
            const certificate = await this.generateCertificate(session);

            // Display the certificate in the chat
            await this.showCertificateInChat(context, certificate);
        }

        const attachment = CardFactory.adaptiveCard(resultCard);
        await context.sendActivity({ attachments: [attachment] });

        session.step = 'QUIZ_COMPLETED';

        // Clean up session after 5 minutes
        setTimeout(() => {
            delete this.userSessions[context.activity.from.id];
        }, 300000);
    }

    async generateCertificate(session) {
        // Generate certificate using the certificate service
        const certificate = await this.certService.generateCertificate({
            email: session.email,
            department: session.department,
            score: session.score,
            totalQuestions: session.questions.length
        });

        console.log(`Certificate generated with ID: ${certificate.id}`);
        return certificate;
    }

    async showCertificateInChat(context, certificate) {
        // Display a visual representation of the certificate in chat
        console.log('Showing certificate in chat');

        // Get certificate card from certificate service
        const certificateCard = this.certService.generateCertificateCard(certificate);

        // Send the certificate as an adaptive card
        const attachment = CardFactory.adaptiveCard(certificateCard);
        await context.sendActivity({ attachments: [attachment] });

        // Add a message about email
        await context.sendActivity(`✅ A copy of this certificate has been sent to: ${certificate.email} and ${this.certService.adminEmail}`);
    }

    async restartQuiz(context, userId) {
        delete this.userSessions[userId];
        await context.sendActivity('🔄 Starting new quiz session...\n\nPlease enter your **email ID**:');
    }
}

module.exports.QuizBot = QuizBot;