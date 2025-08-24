// ✅ EditFAQ.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import './editfaq.css';
import PageHeader from '../components/PageHeader';

export default function EditFAQ() {
  const [flattenedFaqs, setFlattenedFaqs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState('');
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() || {};
      const flat = [];

      Object.entries(data).forEach(([category, questions]) => {
        if (questions && typeof questions === 'object') {
          Object.entries(questions).forEach(([question, answer]) => {
            flat.push({
              category,
              question,
              answer: typeof answer === 'string' ? answer : answer?.answer || '',
              createdAt: typeof answer === 'object' ? answer.createdAt : '',
              path: `${category}/${question}`,
            });
          });
        }
      });

      setFlattenedFaqs(flat);
    });
  }, []);

  const handleEditClick = (faq) => {
    setSelectedPath(faq.path);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setShowPanel(true);
  };

  const handleSave = () => {
    if (!editAnswer.trim() || !selectedPath) return;

    const updatedData = {
      answer: editAnswer,
      createdAt: new Date().toISOString(),
    };

    set(ref(db, selectedPath), updatedData).then(() => {
      alert('✅ FAQ updated successfully');
      setSelectedPath('');
      setEditQuestion('');
      setEditAnswer('');
      setShowPanel(false);
    });
  };

  const formatDate = (timestamp) => {
    try {
      return timestamp ? new Date(timestamp).toLocaleString() : '-';
    } catch {
      return '-';
    }
  };

  const filteredFaqs = flattenedFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="edit-faq-container">
      <PageHeader
        title="Edit FAQ"
        icon="✏️"
        subtitle="Easily update existing questions and answers to keep your chatbot accurate."
      />

      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search by question"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="faq-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <tr key={faq.path} onClick={() => handleEditClick(faq)} style={{ cursor: 'pointer' }}>
                  <td>{faq.category}</td>
                  <td>{faq.question}</td>
                  <td className="truncate">
                    {faq.answer?.length > 60 ? faq.answer.slice(0, 60) + '...' : faq.answer || <em style={{ color: 'gray' }}>No answer</em>}
                  </td>
                  <td>{formatDate(faq.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No matching FAQs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={`edit-panel ${showPanel ? 'show' : ''}`}>
        <h3>🛠️ Update FAQ</h3>
        <label>Question</label>
        <input value={editQuestion} disabled />
        <label>Answer</label>
        <textarea value={editAnswer} onChange={(e) => setEditAnswer(e.target.value)} rows={5} />
        <button onClick={handleSave}>Save Changes</button>
        <button className="close-btn" onClick={() => setShowPanel(false)}>Close</button>
      </div>
    </div>
  );
}