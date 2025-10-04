import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Terms &amp; Conditions</h1>

        <p className="mb-4">
          Welcome to <strong>Intrameet</strong>. By using this website, you agree to the following:
        </p>

        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <h2 className="font-semibold">Educational Use Only</h2>
            <p>This platform is developed for learning and educational purposes. It is not a commercial service.</p>
          </li>

          <li>
            <h2 className="font-semibold">Features</h2>
            <p>
              Intrameet provides video calls, chat, add friends, onboarding, and profile management. All communication
              services are managed via third-party APIs (Stream).
            </p>
          </li>

          <li>
            <h2 className="font-semibold">No Encryption Guarantee</h2>
            <p>
              Video calls and chat are <strong>not end-to-end encrypted</strong>. Please avoid sharing sensitive or personal
              information.
            </p>
          </li>

          <li>
            <h2 className="font-semibold">User Responsibility</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the platform rationally and respectfully.</li>
              <li>Do not misuse the services (spam, abuse, or illegal activities).</li>
              <li>You are responsible for the content you share.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold">No Liability</h2>
            <p>
              We are not responsible for data loss, service downtime, or misuse of the platform. Use at your own risk.
            </p>
          </li>

          <li>
            <h2 className="font-semibold">Changes</h2>
            <p>Terms may be updated anytime as needed.</p>
          </li>
        </ol>

        <p className="mt-6">
          By continuing to use Intrameet, you agree to these terms.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
