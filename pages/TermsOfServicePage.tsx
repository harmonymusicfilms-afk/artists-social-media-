
import React from 'react';
import { ArrowLeft, Book, AlertTriangle, CreditCard, Scale, Gavel, UserCheck } from 'lucide-react';

interface TermsOfServicePageProps {
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

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
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
              <Scale size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Please read these terms carefully before using our platform.</p>
          </div>

          <Section title="1. Acceptance of Terms" icon={UserCheck}>
            <p>
              By accessing and using <strong>Artists Social Media / WHEC India</strong> ("Platform"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </Section>

          <Section title="2. User Conduct & Code of Ethics" icon={Book}>
            <p>All users are expected to behave respectfully and responsibly. The following actions are strictly prohibited:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Harassment, bullying, or hate speech.</li>
              <li>Posting illegal, obscene, or defamatory content.</li>
              <li>Spamming or unauthorized advertising.</li>
              <li>Impersonating others or misrepresenting your affiliation with any person or entity.</li>
              <li>Attempting to hack, destabilize, or disrupt the Platform's services.</li>
              <li>Self-use of "Center Codes" using the same email/mobile number is prohibited.</li>
            </ul>
            <p>Violation of these rules may result in immediate account suspension or termination.</p>
          </Section>

          <Section title="3. Examination Rules (For Competitions)" icon={AlertTriangle}>
            <p>For students participating in online competitions or examinations:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Attempt Limit:</strong> One student is allowed strictly ONE attempt per exam.</li>
              <li><strong>Format:</strong> 60 Questions. 5-7 seconds per question (auto-progression). No back navigation allowed.</li>
              <li><strong>Marking Scheme:</strong> Positive marks for correct answers; Negative marks for wrong answers (same value).</li>
              <li><strong>Malpractice:</strong> Any form of cheating, plagiarism, or use of unfair means will lead to immediate disqualification.</li>
              <li><strong>Result:</strong> The decision of the automated scoring system is final. Results are immutable once published.</li>
            </ul>
          </Section>

          <Section title="4. Payment & Refund Policy" icon={CreditCard}>
            <p>
              <strong>Exam Fees:</strong> Class 1-5: ₹250 | Class 6-8: ₹300 | Class 9-12: ₹350. Fees are subject to change by Admin.
            </p>
            <p>
              <strong>Payments:</strong> All payments must be made through the Platform's approved payment gateways (Razorpay).
            </p>
            <p>
              <strong>Refunds:</strong>
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Exam Fees:</strong> Fees are non-refundable once paid and verified, unless the exam is cancelled by the Platform.</li>
              <li><strong>Health Cards:</strong> Fees paid for the Swasthya Saathi Health Card are generally non-refundable once issued.</li>
              <li><strong>Processing Time:</strong> Approved refunds (if any) will be processed within 7-14 business days.</li>
            </ul>
          </Section>

          <Section title="5. Limitation of Liability" icon={Gavel}>
            <p>
              To the fullest extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services.
            </p>
          </Section>

          <Section title="6. Governing Law" icon={Scale}>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.
            </p>
          </Section>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500">
              If you have any questions about these Terms, please contact us at <a href="mailto:swasthyasaathi@yahoo.com" className="text-brand-orange hover:underline">swasthyasaathi@yahoo.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
