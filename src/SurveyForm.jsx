import React, { useState } from 'react';
import './SurveyForm.css';

const SurveyForm = () => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fetchAdditionalQuestions = async (topic) => {
    const apiUrl = `https://api.example.com/questions?topic=${topic}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.surveyTopic.trim()) {
      newErrors.surveyTopic = 'Survey Topic is required';
      valid = false;
    }

    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage.trim()) {
        newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
        valid = false;
      }
      if (!formData.yearsOfExperience.trim() || isNaN(formData.yearsOfExperience) || parseInt(formData.yearsOfExperience) <= 0) {
        newErrors.yearsOfExperience = 'Years of Experience is required and must be greater than 0';
        valid = false;
      }
    }

    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency.trim()) {
        newErrors.exerciseFrequency = 'Exercise Frequency is required';
        valid = false;
      }
      if (!formData.dietPreference.trim()) {
        newErrors.dietPreference = 'Diet Preference is required';
        valid = false;
      }
    }

    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification.trim()) {
        newErrors.highestQualification = 'Highest Qualification is required';
        valid = false;
      }
      if (!formData.fieldOfStudy.trim()) {
        newErrors.fieldOfStudy = 'Field of Study is required';
        valid = false;
      }
    }

    if (!formData.feedback.trim() || formData.feedback.length < 50) {
      newErrors.feedback = 'Feedback is required and must be at least 50 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    
    if (isValid) {
      try {
        const additionalQuestions = await fetchAdditionalQuestions(formData.surveyTopic);
        setAdditionalQuestions(additionalQuestions);
        setSummary(formData);
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      surveyTopic: '',
      favoriteProgrammingLanguage: '',
      yearsOfExperience: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: ''
    });
    setErrors({});
    setAdditionalQuestions([]);
    setSummary(null);
    setFormSubmitted(false);
  };

  return (
    <div className="survey-form-container">
      <h2>Survey Form</h2>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="surveyTopic">Survey Topic</label>
            <select
              id="surveyTopic"
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleChange}
              className={errors.surveyTopic ? 'input-error' : ''}
            >
              <option value="">Select Topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && <p className="error-message">{errors.surveyTopic}</p>}
          </div>

          {formData.surveyTopic === 'Technology' && (
            <div className="form-group">
              <label htmlFor="favoriteProgrammingLanguage">Favorite Programming Language</label>
              <select
                id="favoriteProgrammingLanguage"
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
                className={errors.favoriteProgrammingLanguage ? 'input-error' : ''}
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && (
                <p className="error-message">{errors.favoriteProgrammingLanguage}</p>
              )}

              <label htmlFor="yearsOfExperience">Years of Experience</label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className={errors.yearsOfExperience ? 'input-error' : ''}
              />
              {errors.yearsOfExperience && (
                <p className="error-message">{errors.yearsOfExperience}</p>
              )}
            </div>
          )}

          {formData.surveyTopic === 'Health' && (
            <div className="form-group">
              <label htmlFor="exerciseFrequency">Exercise Frequency</label>
              <select
                id="exerciseFrequency"
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
                className={errors.exerciseFrequency ? 'input-error' : ''}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && (
                <p className="error-message">{errors.exerciseFrequency}</p>
              )}

              <label htmlFor="dietPreference">Diet Preference</label>
              <select
                id="dietPreference"
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className={errors.dietPreference ? 'input-error' : ''}
              >
                <option value="">Select Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && (
                <p className="error-message">{errors.dietPreference}</p>
              )}
            </div>
          )}

          {formData.surveyTopic === 'Education' && (
            <div className="form-group">
              <label htmlFor="highestQualification">Highest Qualification</label>
              <select
                id="highestQualification"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className={errors.highestQualification ? 'input-error' : ''}
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && (
                <p className="error-message">{errors.highestQualification}</p>
              )}

              <label htmlFor="fieldOfStudy">Field of Study</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className={errors.fieldOfStudy ? 'input-error' : ''}
              />
              {errors.fieldOfStudy && (
                <p className="error-message">{errors.fieldOfStudy}</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className={errors.feedback ? 'input-error' : ''}
              rows="4"
            />
            {errors.feedback && <p className="error-message">{errors.feedback}</p>}
          </div>

          <button type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div className="form-summary">
          <h3>Form Summary</h3>
          <p><strong>Full Name:</strong> {summary.fullName}</p>
          <p><strong>Email:</strong> {summary.email}</p>
          <p><strong>Survey Topic:</strong> {summary.surveyTopic}</p>

          {summary.surveyTopic === 'Technology' && (
            <>
              <p><strong>Favorite Programming Language:</strong> {summary.favoriteProgrammingLanguage}</p>
              <p><strong>Years of Experience:</strong> {summary.yearsOfExperience}</p>
            </>
          )}

          {summary.surveyTopic === 'Health' && (
            <>
              <p><strong>Exercise Frequency:</strong> {summary.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {summary.dietPreference}</p>
            </>
          )}

          {summary.surveyTopic === 'Education' && (
            <>
              <p><strong>Highest Qualification:</strong> {summary.highestQualification}</p>
              <p><strong>Field of Study:</strong> {summary.fieldOfStudy}</p>
            </>
          )}

          <p><strong>Feedback:</strong> {summary.feedback}</p>

          {additionalQuestions.length > 0 && (
            <div className="additional-questions">
              <h3>Additional Questions</h3>
              <ul>
                {additionalQuestions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={resetForm}>Start a New Survey</button>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
