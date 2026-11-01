import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contentService, CONTACT_RECIPIENT_EMAIL } from '../services/contentService';
import { ContactSubmission } from '../types';

export const PublishContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Contact form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const cleanFullName = fullName.trim().slice(0, 150);
    const cleanEmail = email.trim().slice(0, 200);
    const cleanCountry = country.trim().slice(0, 100);
    const cleanSubject = subject.trim().slice(0, 250);
    const cleanMessage = message.trim().slice(0, 5000);

    if (!cleanFullName || !cleanEmail || !cleanSubject || !cleanMessage) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const submissionId = `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const createdAt = new Date().toISOString();

    const baseSubmission: ContactSubmission = {
      id: submissionId,
      fullName: cleanFullName,
      email: cleanEmail,
      country: cleanCountry,
      subject: cleanSubject,
      message: cleanMessage,
      recipientEmail: CONTACT_RECIPIENT_EMAIL,
      emailStatus: 'sending',
      createdAt
    };

    try {
      // 1. Store submission immediately in Firestore database
      await contentService.saveContactSubmission(baseSubmission);

      // 2. Deliver email to indiandiasporaclub@gmail.com
      const deliveryStatus = await contentService.deliverContactEmail({
        fullName: cleanFullName,
        email: cleanEmail,
        country: cleanCountry,
        subject: cleanSubject,
        message: cleanMessage
      });

      // 3. Record final email delivery status in Firestore
      await contentService.saveContactSubmission({
        ...baseSubmission,
        emailStatus: deliveryStatus
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setSubmitError('Unable to submit your message right now. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
          Indian Diaspora Club
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Contact Us
        </h1>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-emerald-900">
            Message Received!
          </h3>
          <p className="text-sm text-emerald-700 mt-2 max-w-md mx-auto">
            Thank you for reaching out. Your inquiry has been recorded and sent to our team—we will respond to your email shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSubject('');
              setMessage('');
              setSubmitError(null);
            }}
            className="mt-6 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-5">
          {submitError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                maxLength={150}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Country of Residence
              </label>
              <input
                type="text"
                maxLength={100}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United Kingdom, Singapore, USA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                maxLength={250}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Partnership inquiry for Indian Diaspora Club"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Your Message *
            </label>
            <textarea
              required
              rows={5}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can our global community team help you?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-600/20 transition cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

