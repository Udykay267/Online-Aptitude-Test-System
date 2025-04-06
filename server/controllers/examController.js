const Subject = require('../models/Subject');
const Result = require('../models/Result');

exports.getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
};

exports.submitResult = async (req, res) => {
  const { userId, scores } = req.body;
  const failed = scores.some(s => s.score < 50);

  const result = new Result({
    userId,
    scores,
    passed: !failed
  });

  await result.save();
  res.json(result);
};

exports.addSubject = async (req, res) => {
  const { name, questionCount, timeLimitMinutes } = req.body;
  const subject = new Subject({ name, questionCount, timeLimitMinutes });
  await subject.save();
  res.json(subject);
};