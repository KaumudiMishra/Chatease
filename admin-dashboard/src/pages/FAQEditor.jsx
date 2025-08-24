// src/pages/FAQEditor.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import './FAQEditor.css';

export default function FAQEditor() {
  const [faqs, setFaqs] = useState({});
  const [category, setCategory] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const dbRef = ref(db, 'faq');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setFaqs(data || {});
    });
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

 const saveFaq = () => {
  if (!newKey.trim() || !newAnswer.trim()) {
    showToast('⚠️ Please enter both question and answer');
    return;
  }

  const now = new Date().toISOString();
  const path = category.trim()
    ? `${category.trim()}/${newKey.trim()}`
    : `${newKey.trim()}`;

  const faqRef = ref(db, path);  // 🔁 NO "faq/" prefix here

  const faqData = {
    answer: newAnswer,
    createdAt: now,
  };

  set(faqRef, faqData)
    .then(() => {
      showToast('✅ FAQ saved!');
      setNewKey('');
      setNewAnswer('');
      setCategory('');
    })
    .catch(() => showToast('❌ Error saving FAQ'));
};


  return (
    <div className="faq-container">
      {toast && <div className="toast">{toast}</div>}

      <h2 className="faq-title">📚 Add FAQ</h2>
      <p className="faq-subtitle">
        Easily manage your chatbot’s knowledge base with categorized Q&A entries.
      </p>

      <div className="faq-box">
        {/* Example Panel */}
        <div className="faq-left">
          <h3>🧠 Quick Examples</h3>
          <ul className="example-list">
            <li>
              <span className="category-tag blue">admission</span>
              <p><strong>Keyword:</strong> about</p>
              <p><strong>Answer:</strong> The college offers strong academics with qualified faculty...</p>
            </li>
            <li>
              <span className="category-tag green">fees</span>
              <p><strong>Keyword:</strong> hostel charges</p>
              <p><strong>Answer:</strong> ₹1.05–1.72 lakh/year depending on room type...</p>
            </li>
            <li>
              <span className="category-tag gray">none</span>
              <p><strong>Keyword:</strong> library</p>
              <p><strong>Answer:</strong> The library provides 50,000+ books and e-resources...</p>
            </li>
          </ul>
        </div>

        {/* Input Panel */}
        <div className="faq-right">
          <label>Optional Category</label>
          <input
            placeholder="E.g. admission, fees, academics"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label>Enter a Question or Keyword</label>
          <input
            placeholder="E.g. hostel, library, placement"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />

          <label>Enter Answer</label>
          <textarea
            placeholder="Write the answer to the query..."
            rows={6}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />

          <button onClick={saveFaq}>Save FAQ</button>
        </div>
      </div>
    </div>
  );
}
