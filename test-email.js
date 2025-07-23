// Test script to verify email lookup functionality
const { DatabaseService } = require('./services/databaseService');

async function testEmailLookup() {
    // Create instance of DatabaseService
    const dbService = new DatabaseService();
    
    // Test specific email
    const testEmail = 'sara@example.com';
    console.log(`\nTesting specific email: ${testEmail}`);
    const department = await dbService.getUserDepartment(testEmail);
    console.log(`Result: ${department || 'Not found'}\n`);
    
    // Test all sample emails
    console.log('Testing all sample emails:');
    const sampleEmails = [
        'john@example.com',
        'sara@example.com',
        'alex@example.com',
        'priya@example.com',
        'mike@example.com',
        'test@test.com',
        'nonexistent@example.com'
    ];
    
    for (const email of sampleEmails) {
        const dept = await dbService.getUserDepartment(email);
        console.log(`- ${email}: ${dept || 'Not found'}`);
    }
}

testEmailLookup().catch(err => {
    console.error('Error in test:', err);
});
