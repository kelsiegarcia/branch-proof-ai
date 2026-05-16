const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

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

    res.json(report);
  } catch (error) {
    console.error('Validation AI error:', error);
    res.status(500).json({
      error: 'Unable to generate validation report.',
      details: error.message,
    });
  }
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = router;
