
import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText, Database, Server } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ElementType }> = ({ title, children, icon: Icon }) => (
  <div className="mb-10">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      {Icon && <Icon size={20} className="text-brand-orange" />}
      {title}
    </h3>
    <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="flex items-center gap-2 text-gray-500 hover:text-brand-orange mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          <div className="text-center mb-12 border-b border-gray-100 dark:border-gray-700 pb-8">
            <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Section title="1. Introduction" icon={Eye}>
            <p>
              Welcome to <strong>Artists Social Media / WHEC India</strong> ("Company", "we", "our", "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at <strong>swasthyasaathi@yahoo.com</strong>.
            </p>
            <p>
              This Privacy Policy describes how we collect, use, and disclose your data when you use our website, mobile application, and services (collectively, the "Platform"). By accessing or using the Platform, you agree to the terms of this policy.
            </p>
          </Section>

          <Section title="2. Information We Collect" icon={Database}>
            <p>We collect personal information that you voluntarily provide to us when you register on the Platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the Platform (such as by posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Student Registration Data:</strong> Name, Father's Name, Class (1-12), Mobile Number, Email, School Name, School Contact, Address (Village, Block, Tahsil, District, State).</li>
              <li><strong>Verification Data:</strong> Aadhaar Number (optional/voluntary), OTP verification details for mobile and email.</li>
              <li><strong>Professional Information:</strong> Educational background, work experience, skills, portfolio links, certificates.</li>
              <li><strong>Payment Data:</strong> Transaction details via Razorpay (Order ID, Payment ID, Status). We do not store your credit card numbers on our servers.</li>
              <li><strong>User Generated Content:</strong> Content you upload, such as photos, videos, comments, and posts.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information" icon={FileText}>
            <p>We use personal information collected via our Platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>To facilitate account creation and logon process.</li>
              <li>To administer exams, generate results, and issue certificates.</li>
              <li>To process payments and validate transactions securely.</li>
              <li>To manage the "Center Code" referral and reward system.</li>
              <li>To manage user accounts and keep our Platform safe and secure (fraud detection).</li>
              <li>To fulfill and manage your orders, payments, and returns.</li>
            </ul>
          </Section>

          <Section title="4. Sharing Your Information" icon={Server}>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
            <p>
              <strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
            </p>
          </Section>

          <Section title="5. Data Security & Storage" icon={Lock}>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
            <p>
              <strong>Data Localization:</strong> All sensitive personal data is stored on servers located within India, in compliance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
          </Section>

          <Section title="6. Your Rights" icon={Shield}>
            <p>Under the Information Technology Act, 2000 and applicable rules, you have the right to:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Review the information you have supplied to us.</li>
              <li>Request correction of any inaccurate or deficient information.</li>
              <li>Withdraw your consent provided earlier to us.</li>
              <li>Grievance Redressal: You may contact our Grievance Officer for any complaints regarding data processing.</li>
            </ul>
          </Section>

          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Grievance Officer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              In accordance with the Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
            </p>
            <div className="mt-4 text-sm">
              <p><strong>Name:</strong> Grievance Officer</p>
              <p><strong>Address:</strong> Plot No-265/2578, Bhoi Sahi, Baramunda, Bhubaneswar, Khordha, Odisha – 751003</p>
              <p><strong>Email:</strong> swasthyasaathi@yahoo.com</p>
              <p><strong>Phone:</strong> 7735168551</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
