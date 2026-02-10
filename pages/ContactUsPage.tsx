
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, Plus, Minus } from 'lucide-react';

interface ContactUsPageProps {
  onNavigate: (page: string) => void;
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white">{question}</span>
        {isOpen ? <Minus size={18} className="text-brand-orange" /> : <Plus size={18} className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message Sent! We will get back to you shortly.");
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    { question: "How do I register for the Health Card?", answer: "You can register for the Swasthya Saathi Health Card directly through our website by navigating to the 'Health Card' section and filling out the application form. The annual fee is ₹150 + GST." },
    { question: "Can I participate in multiple competitions?", answer: "No, currently our rules state one attempt per student per exam. Please check specific eligibility details for concurrent exams." },
    { question: "How are exam fees calculated?", answer: "Exam fees are based on your class. Class 1-5: ₹250, Class 6-8: ₹300, Class 9-12: ₹350." },
    { question: "How do I verify a certificate?", answer: "Certificates come with a unique ID and QR code. You can scan the QR code or enter the ID on our verification page to confirm its authenticity." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-darker pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="flex items-center gap-2 text-gray-500 hover:text-brand-orange mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Have questions about our services, competitions, or welfare programs? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info & Form */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Our Office</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Plot No-265/2578, Bhoi Sahi, Baramunda,<br/>Bhubaneswar, Khordha, Odisha – 751003</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Phone Number</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">+91 77351 68551</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Mon-Sat 9am to 6pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">swasthyasaathi@yahoo.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Working Hours</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Monday - Saturday: 09:00 AM - 06:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-64 md:h-80 relative">
               {/* Embed Google Map */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.4249826379!2d85.7369399895243!3d20.30113197828063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha%2C%20India!5e0!3m2!1sen!2sus!4v1628582239458!5m2!1sen!2sus" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy"
                 title="Office Location"
                 className="dark:invert dark:grayscale dark:contrast-125 dark:brightness-75"
               ></iframe>
            </div>
          </div>

          {/* Form & FAQ */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} type="text" required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={5} required className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none dark:text-white resize-none" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange/90 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 ml-1">Frequently Asked Questions</h3>
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
