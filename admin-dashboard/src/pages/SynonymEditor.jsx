import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import './SynonymEditor.css';
import PageHeader from '../components/PageHeader';
export default function SynonymEditor() {
  const [faqData, setFaqData] = useState({});
  const [selectedKey, setSelectedKey] = useState('');
  const [newSyn, setNewSyn] = useState('');
  const [toast, setToast] = useState('');

  // Toast message function
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Load FAQ data from Firebase
  useEffect(() => {
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setFaqData(data || {});
    });
  }, []);

  // Add synonym
  const updateSynonyms = () => {
    if (!selectedKey || !newSyn.trim()) {
      showToast("⚠️ Select key and enter synonym");
      return;
    }

    const existing = faqData[selectedKey]?.syn || [];
    const updated = Array.from(new Set([...existing, newSyn.trim()]));

    set(ref(db, `${selectedKey}/syn`), updated)
      .then(() => {
        setNewSyn('');
        showToast("✅ Synonym added");
      })
      .catch(() => showToast("❌ Failed to add synonym"));
  };

  // Delete synonym
  const deleteSynonym = (syn) => {
    const updated = (faqData[selectedKey]?.syn || []).filter(s => s !== syn);

    set(ref(db, `${selectedKey}/syn`), updated)
      .then(() => showToast("🗑️ Synonym deleted"))
      .catch(() => showToast("❌ Failed to delete"));
  };

  return (
    <div className="syno-container">
      {toast && <div className="toast">{toast}</div>}

      <div className="syno-box">
        <PageHeader
  icon="🔁"
  title="Synonym Editor"
  subtitle="Add or manage alternate words to improve chatbot understanding."
/>

        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="syno-select"
        >
          <option value="">Select a key</option>
          {Object.keys(faqData).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        {selectedKey && (
          <>
            <div className="syno-existing">
              <strong>Existing Synonyms:</strong>
              <div className="syno-list">
                {faqData[selectedKey]?.syn?.length > 0 ? (
                  faqData[selectedKey].syn.map((syn, index) => (
                    <span key={index} className="syno-chip">
                      {syn}
                      <button className="delete-syn" onClick={() => deleteSynonym(syn)}>❌</button>
                    </span>
                  ))
                ) : (
                  <span style={{ color: '#888' }}>No synonyms yet</span>
                )}
              </div>
            </div>

            <input
              value={newSyn}
              onChange={(e) => setNewSyn(e.target.value)}
              placeholder="Add new synonym"
              className="syno-input"
            />

            <button onClick={updateSynonyms} className="syno-button">
              ➕ Add Synonym
            </button>
          </>
        )}
      </div>
    </div>
  );
}
