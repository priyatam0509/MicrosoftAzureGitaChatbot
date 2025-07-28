const nodemailer = require('nodemailer');

class CertificateService {
    constructor() {
        this.certificates = [];
        
        this.transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
                user: process.env.EMAIL_USER || 'demo@example.com',
                pass: process.env.EMAIL_PASS || 'password'
            }
        });
        
        this.adminEmail = process.env.ADMIN_EMAIL || 'Pruthwiraj.Lenka@inventronicsglobal.com';
    }

    async generateCertificate(userData) {
        const { email, department, score, totalQuestions } = userData;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        console.log(`Generating certificate for ${email} from ${department} with score ${score}/${totalQuestions} (${percentage}%)`);
        
        const certificateId = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const certificate = {
            id: certificateId,
            recipientName: email.split('@')[0], 
            recipientNameCapitalized: this.capitalizeWords(email.split('@')[0]),
            email,
            department,
            score,
            totalQuestions,
            percentage,
            issueDate: currentDate.toISOString(),
            formattedDate,
            verificationUrl: `https://example.com/verify/${certificateId}`
        };
        
        this.certificates.push(certificate);
        

        await this.emailCertificate(certificate);
        
        console.log(`Certificate generated with ID: ${certificateId}`);
        return certificate;
    }
    
    async getCertificate(certificateId) {
        return this.certificates.find(cert => cert.id === certificateId);
    }
    
    async getCertificatesForUser(email) {
        return this.certificates.filter(cert => cert.email.toLowerCase() === email.toLowerCase());
    }
    
    /**
     * Generates HTML for a visual certificate
     */
    generateCertificateHtml(certificate) {
        return `
            <div style="width: 800px; height: 600px; border: 2px solid #0078d7; padding: 20px; text-align: center; font-family: 'Arial', sans-serif; background: linear-gradient(to bottom right, #ffffff, #f0f8ff);">
                <div style="border: 1px solid #0078d7; padding: 10px;">
                    <h1 style="color: #0078d7;">Certificate of Completion</h1>
                    <div style="margin: 20px 0; padding: 10px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;">
                        <h2 style="font-style: italic; font-weight: normal;">This certifies that</h2>
                        <h1 style="font-size: 28px; color: #333;">${certificate.recipientNameCapitalized}</h1>
                        <h2 style="font-style: italic; font-weight: normal;">from department</h2>
                        <h2 style="color: #0078d7;">${certificate.department}</h2>
                        <p style="font-size: 18px;">has successfully completed the quiz with a score of</p>
                        <h1 style="color: #0078d7;">${certificate.score}/${certificate.totalQuestions} (${certificate.percentage}%)</h1>
                    </div>
                    <p style="font-size: 16px;">Date of Completion: ${certificate.formattedDate}</p>
                    <div style="margin-top: 50px;">
                        <p style="font-style: italic;">Certificate ID: ${certificate.id}</p>
                        <p style="font-style: italic;">Verify at: ${certificate.verificationUrl}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Creates an adaptive card representation of the certificate
     */
    generateCertificateCard(certificate) {
        return {
            type: 'AdaptiveCard',
            version: '1.2',
            body: [
                {
                    type: 'Container',
                    style: 'emphasis',
                    items: [
                        {
                            type: 'TextBlock',
                            text: '🏆 Certificate of Completion 🏆',
                            weight: 'Bolder',
                            size: 'Large',
                            horizontalAlignment: 'Center',
                            color: 'Accent'
                        }
                    ]
                },
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'This certifies that',
                            horizontalAlignment: 'Center',
                            wrap: true
                        },
                        {
                            type: 'TextBlock',
                            text: certificate.recipientNameCapitalized,
                            weight: 'Bolder',
                            size: 'Medium',
                            color: 'Accent',
                            horizontalAlignment: 'Center'
                        },
                        {
                            type: 'TextBlock',
                            text: `from ${certificate.department} Department`,
                            horizontalAlignment: 'Center',
                            wrap: true
                        }
                    ]
                },
                {
                    type: 'Container',
                    spacing: 'Medium',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Has successfully completed the quiz with a score of',
                            horizontalAlignment: 'Center',
                            wrap: true
                        },
                        {
                            type: 'TextBlock',
                            text: `${certificate.score}/${certificate.totalQuestions} (${certificate.percentage}%)`,
                            weight: 'Bolder',
                            size: 'Medium',
                            color: 'Good',
                            horizontalAlignment: 'Center'
                        }
                    ]
                },
                {
                    type: 'Container',
                    spacing: 'Medium',
                    items: [
                        {
                            type: 'TextBlock',
                            text: `Issued on: ${certificate.formattedDate}`,
                            horizontalAlignment: 'Center',
                            size: 'Small',
                            isSubtle: true
                        },
                        {
                            type: 'TextBlock',
                            text: `Certificate ID: ${certificate.id}`,
                            horizontalAlignment: 'Center',
                            size: 'Small',
                            isSubtle: true
                        }
                    ]
                }
            ]
        };
    }
    
    /**
     * Send certificate to user's email and admin email
     */
    async emailCertificate(certificate) {
        try {
            console.log(`Attempting to send certificate via email to ${certificate.email} and ${this.adminEmail}`);
            
            // In a production environment, replace this with actual email sending logic
            // using Azure Communication Services or other email provider
            if (process.env.NODE_ENV === 'production' && process.env.EMAIL_USER) {
                const htmlContent = this.generateCertificateHtml(certificate);
                
                // Email to quiz participant
                await this.transporter.sendMail({
                    from: 'Quiz Bot <quizbot@example.com>',
                    to: certificate.email,
                    cc: this.adminEmail,
                    subject: 'Your Quiz Certificate',
                    html: `
                        <p>Dear ${certificate.recipientNameCapitalized},</p>
                        <p>Congratulations on successfully completing the quiz. Your certificate is attached below.</p>
                        ${htmlContent}
                        <p>Best regards,<br>Quiz Bot Team</p>
                    `
                });
                
                console.log('Certificate email sent successfully');
            } else {
                console.log('Email sending skipped (not in production mode or missing credentials)');
                console.log(`Would have sent email to: ${certificate.email} and ${this.adminEmail}`);
            }
        } catch (error) {
            console.error('Failed to send certificate email:', error);
        }
    }
    
    /**
     * Helper function to capitalize words
     */
    capitalizeWords(text) {
        return text.replace(/\b\w/g, char => char.toUpperCase());
    }
}

module.exports = { CertificateService };
