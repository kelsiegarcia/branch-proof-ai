const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/analyze', async (req, res) => {
  try {
    const { personOne, personTwo, relationship, evidence } = req.body;

    if (!personOne || !personTwo || !relationship) {
      return res.status(400).json({
        error: 'personOne, personTwo, and relationship are required.',
      });
    }

    const prompt = `
    You are a genealogy relationship validation assistant.

    Analyze the following relationship claim:

    Person One: ${personOne}
    Person Two: ${personTwo}
    Claimed Relationship: ${relationship}
    Evidence: ${evidence}

    Provide:
    1. A summary
    2. Possible conflicts or concerns
    3. Missing information
    4. A confidence assessment
    `;

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a genealogy validation assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      analysis: aiResponse,
    });

  } catch (error) {
    console.error('Validation AI error:', error.message);

    const fallbackAnalysis = `
    Relationship Validation Summary:

    The current dataset suggests a possible relationship connection, but additional supporting evidence may be needed to fully validate the claim.

    Potential Concerns:
    - Missing historical records or source citations
    - Incomplete date or location information
    - Limited supporting relationship evidence

    Recommended Next Steps:
    - Compare census and birth records
    - Verify timeline consistency
    - Add additional supporting documents

    Confidence Level:
    Moderate
    `;

    res.status(200).json({
      analysis: fallbackAnalysis,
      fallback: true,
    });
  }
});


module.exports = router;
