// frontend/src/pages/DonationPage.jsx - CREATE NEW FILE
import { useState } from "react";
import {
  QrCode,
  Copy,
  CheckCircle,
  Heart,
  Shield,
  Download,
} from "lucide-react";

const DonationPage = () => {
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // 🔴 IMPORTANT: Change this to YOUR UPI ID
  const upiId = "6203239376@ybl"; // Example: meraj@okaxis or meraj@ybl

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
      const textArea = document.createElement("textarea");
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Islamic Q&A
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your contribution helps maintain this platform and create more
            authentic Islamic content
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            <Shield size={16} />
            <span className="text-sm">
              100% Secure • No Bank Details Shared
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* QR Code Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <QrCode className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Scan & Pay via UPI
              </h2>
            </div>

            <div className="space-y-6">
              {/* QR Code Display */}
              <div className="flex justify-center">
                <div className="p-6 bg-white border-2 border-dashed border-green-300 rounded-2xl">
                  <img
                    src="/upi-qr.png"
                    alt="UPI QR Code for Islamic Q&A"
                    className="w-64 h-64"
                  />
                </div>
              </div>

              {/* Download QR Button */}
              <div className="text-center">
                <a
                  href="/upi-qr.png"
                  download="islamic-qa-donation-qr.png"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
                >
                  <Download size={18} />
                  Download QR Code
                </a>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-green-700 font-medium flex items-center gap-2"
                >
                  How to pay using QR code?
                </button>

                {showInstructions && (
                  <div className="bg-green-50 p-4 rounded-lg space-y-2 text-sm">
                    <p>📱 1. Open any UPI app (Google Pay, PhonePe, Paytm)</p>
                    <p>🔍 2. Tap on "Scan QR Code"</p>
                    <p>📷 3. Scan the QR code above</p>
                    <p>💰 4. Enter amount and complete payment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* UPI ID Section */}
          <div className="space-y-8">
            {/* UPI ID Box */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Or Use UPI ID Directly
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">
                    Copy this UPI ID:
                  </p>
                  <div className="flex items-center justify-between">
                    <code className="text-2xl font-mono text-gray-900 break-all">
                      {upiId}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition ml-4 flex-shrink-0"
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={18} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    Open your UPI app
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-lg">💸</span>
                    Tap "Send Money"
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-lg">📇</span>
                    Enter/paste this UPI ID
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    Enter amount and pay
                  </p>
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Your Support Matters</h3>
              <p className="mb-6 opacity-95">
                This platform is completely free for users. Your donations help
                cover:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Hosting & Server costs</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>New features development</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Content creation & research</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Website maintenance</span>
                </li>
              </ul>
              <div className="text-center p-4 bg-blue-700/50 rounded-lg">
                <p className="text-lg">JazakAllah Khair for your support!</p>
                <p className="text-sm opacity-90 mt-2">
                  May Allah reward you abundantly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            ⚠️ Note: This is a personal UPI ID. All payments are peer-to-peer
            (P2P).
          </p>
          <p className="mt-2">
            No bank details are shared on this website. Payments go directly via
            UPI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
