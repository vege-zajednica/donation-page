// Thank You Page Tracking
document.addEventListener('DOMContentLoaded', function() {
    console.log('Thank you page tracking initialized');
    
    sendThankYouTracking();
});

async function sendThankYouTracking() {
    try {
        // Get visitor hash from localStorage
        const visitorHash = localStorage.getItem('visitor_hash');
        const utmParamsStr = localStorage.getItem('utm_params');
        const utmParams = utmParamsStr ? JSON.parse(utmParamsStr) : {};
        
        if (!visitorHash) {
            console.log('No visitor hash found, skipping thank you tracking');
            return;
        }
        
        const payload = {
            token: 'engagmentslomimokaveze',
            version: 'dp',
            hash: visitorHash,
            donation_made: true,
            utm_source: utmParams.source || null,
            utm_medium: utmParams.medium || null,
            utm_campaign: utmParams.campaign || null,
            utm_content: utmParams.content || null,
            utm_term: utmParams.term || null
        };
        
        console.log('Sending thank you tracking data to API:', payload);
        
        // Replace {PATH_BASE} with actual API endpoint
        const response = await fetch('https://api.slomimokaveze.rs/donationDone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log('✅ Thank you tracking data sent successfully to API');
        } else {
            console.error('Failed to send thank you tracking data to API:', response.status);
        }
    } catch (error) {
        console.error('Error sending thank you tracking data to API:', error);
    }
}

