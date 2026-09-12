import axios from 'axios';

export const generatePreview = async (req, res) => {
  try {
    const { enrichmentType, targetUrl, config } = req.body;

    if (!targetUrl) {
      return res.status(400).json({ success: false, message: 'Target URL is required' });
    }

    // Apify actor configuration (Instagram Scraper)
    const APIFY_ACTOR_ID = 'apify~instagram-scraper';
    const apifyUrl = `https://api.apify.com/v2/actors/${APIFY_ACTOR_ID}/run-sync-get-dataset-items?token=${process.env.APIFY_API_TOKEN}`;

    const apifyInput = {
      directUrls: [targetUrl],
      resultsType: enrichmentType === 'post' ? 'posts' : 'details',
      resultsLimit: config?.resultLimit || 1,
    };

    const response = await axios.post(apifyUrl, apifyInput, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000,
    });

    const scrapedItem = response.data?.[0];

    if (!scrapedItem) {
      return res.status(404).json({ success: false, message: 'No data found for this input' });
    }

    // Response structure mapped directly to Figma 1st and 2nd degree preview
    const formattedData = {
      firstDegree: {
        found: true,
        label: enrichmentType === 'post' ? 'Post found' : 'Profile found',
      },
      secondDegree: enrichmentType === 'post' ? {
        'Post url': scrapedItem.url || targetUrl,
        'Caption': scrapedItem.caption || 'N/A',
        'Media type': scrapedItem.type || 'Image',
        'Likes': scrapedItem.likesCount ?? 0,
        'Comments': scrapedItem.commentsCount ?? 0,
        'Hashtags': scrapedItem.hashtags?.map(tag => `#${tag}`).join(' ') || 'N/A',
      } : {
        'Username': scrapedItem.username || 'N/A',
        'Full Name': scrapedItem.fullName || 'N/A',
        'Biography': scrapedItem.biography || 'N/A',
        'Followers Count': scrapedItem.followersCount ?? 0,
        'Following Count': scrapedItem.followsCount ?? 0,
        'Posts Count': scrapedItem.postsCount ?? 0,
        'Profile Picture URL': scrapedItem.profilePicUrl || 'N/A',
        'Verified Status': scrapedItem.isVerified ? 'Verified' : 'Unverified',
        'Business Account': scrapedItem.isBusinessAccount ? 'Yes' : 'No',
      },
    };

    return res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    console.error('Scraper Error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to extract data from Instagram',
      error: error.message,
    });
  }
};