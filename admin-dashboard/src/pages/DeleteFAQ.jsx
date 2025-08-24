import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import './DeleteFAQ.css';
import PageHeader from '../components/PageHeader';

export default function DeleteFAQ() {
  const [faqList, setFaqList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() || {};
      const flatFaqs = [];

      Object.entries(data).forEach(([category, questions]) => {
        if (questions && typeof questions === 'object') {
          Object.entries(questions).forEach(([question, answer]) => {
            flatFaqs.push({
              category,
              question,
              answer: typeof answer === 'string' ? answer : answer?.answer || '',
              path: `${category}/${question}`,
            });
          });
        }
      });

      setFaqList(flatFaqs);
    });
  }, []);

  const handleDelete = (path, question) => {
    if (!window.confirm(`Are you sure you want to delete the FAQ: "${question}"?`)) return;

    remove(ref(db, path))
      .then(() => alert("🗑️ FAQ deleted successfully"))
      .catch(() => alert("❌ Error deleting FAQ"));
  };

  const filteredFaqs = faqList.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="delete-faq-container">
      <PageHeader title="Delete FAQ" icon="🗑️" subtitle="Remove outdated or unnecessary FAQs from the knowledge base." />

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaqs.map((faq, idx) => (
              <tr
                key={faq.path}
                onClick={() =>
                  setFaqList((prev) =>
                    prev.map((item, i) =>
                      i === idx ? { ...item, expanded: !item.expanded } : item
                    )
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <td>{faq.category}</td>
                <td>{faq.question}</td>
                <td className="truncate">
                  {faq.expanded ? faq.answer : faq.answer?.length > 50 ? faq.answer.slice(0, 50) + "..." : faq.answer || <em style={{ color: "gray" }}>No answer</em>}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(faq.path, faq.question);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}