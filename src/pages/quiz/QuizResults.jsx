import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Award, Users, CheckCircle } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import { quizResultsService } from '../../services/quizResultsService';
import { techniqueService } from '../../services/techniqueService';
import './QuizResults.css';
import '../../components/ui/DataTable.css';

const QuizResults = () => {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [techniqueDetails, setTechniqueDetails] = useState({});
  const [theoryDetails, setTheoryDetails] = useState({});

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEditId, setCurrentEditId] = useState(null);
  const [form, setForm] = useState({
    type: 'Technique',
    detailId: '',
    userEmail: '',
    result: 'Pass',
    grade: 'A',
    totalQuestions: 0,
    correctAnswers: 0,
    attemptNo: 1,
    isActive: true
  });

  // Helper function to get topic name from detail ID
  const getTopicName = (detailId, type) => {
    if (type === 'Technique') {
      return techniqueDetails[detailId]?.name || detailId;
    } else {
      return theoryDetails[detailId]?.name || detailId;
    }
  };

  // Transform backend data to frontend format
  const transformResultToFrontend = (result) => {
    const topicName = result.type === 'Technique'
      ? getTopicName(result.techniquesDetailId, 'Technique')
      : getTopicName(result.theoryDetailId, 'Theory');

    return {
      id: result.id,
      topic: topicName,
      type: result.type,
      email: result.userEmail,
      total: result.totalQuestions,
      correct: result.correctAnswers,
      result: result.result,
      grade: result.grade,
      attempt: result.attemptNo,
      date: result.dateTime,
      active: result.isActive,
      // Keep original data for update/delete
      _original: result
    };
  };

  useEffect(() => {
    const loadQuizResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch technique and theory details for topic names
        const [techniqueDetailsResponse, allResultsResponse] = await Promise.all([
          techniqueService.getAllDetails(),
          quizResultsService.getAllResults()
        ]);

        // Create lookup maps for topic names
        if (techniqueDetailsResponse.success && techniqueDetailsResponse.data) {
          const techniqueMap = {};
          techniqueDetailsResponse.data.forEach(detail => {
            techniqueMap[detail.id] = detail;
          });
          setTechniqueDetails(techniqueMap);
        }

        // For now, we'll use the detail ID as theory topic name
        // You can fetch theory details similarly if needed

        // Transform and set results
        if (allResultsResponse.success && allResultsResponse.data) {
          const transformedResults = allResultsResponse.data.map(transformResultToFrontend);
          setRows(transformedResults);
        }
      } catch (err) {
        console.error('Error loading quiz results:', err);
        setError('Failed to load quiz results. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadQuizResults();
  }, []);

  // Update rows when details are loaded
  useEffect(() => {
    if (Object.keys(techniqueDetails).length > 0 && rows.length > 0) {
      setRows(prevRows => prevRows.map(row => {
        if (row._original) {
          return transformResultToFrontend(row._original);
        }
        return row;
      }));
    }
  }, [techniqueDetails, theoryDetails]);

  const openModal = (mode = 'add', rowData = null) => {
    setModalMode(mode);
    if (mode === 'edit' && rowData && rowData._original) {
      const original = rowData._original;
      setCurrentEditId(rowData.id);
      setForm({
        type: original.type,
        detailId: original.type === 'Technique' ? original.techniquesDetailId : original.theoryDetailId,
        userEmail: original.userEmail,
        result: original.result,
        grade: original.grade,
        totalQuestions: original.totalQuestions,
        correctAnswers: original.correctAnswers,
        attemptNo: original.attemptNo,
        isActive: original.isActive
      });
    } else {
      setCurrentEditId(null);
      setForm({
        type: 'Technique',
        detailId: '',
        userEmail: '',
        result: 'Pass',
        grade: 'A',
        totalQuestions: 0,
        correctAnswers: 0,
        attemptNo: 1,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const resultData = {
        userEmail: form.userEmail,
        result: form.result,
        grade: form.grade,
        totalQuestions: parseInt(form.totalQuestions),
        correctAnswers: parseInt(form.correctAnswers),
        attemptNo: parseInt(form.attemptNo),
        isActive: form.isActive,
        dateTime: new Date().toISOString()
      };

      if (form.type === 'Technique') {
        resultData.techniquesDetailId = form.detailId;
      } else {
        resultData.theoryDetailId = form.detailId;
      }

      let response;
      if (modalMode === 'edit' && currentEditId) {
        if (form.type === 'Technique') {
          response = await quizResultsService.updateTechniquesResult(currentEditId, resultData);
        } else {
          response = await quizResultsService.updateTheoryResult(currentEditId, resultData);
        }
      } else {
        if (form.type === 'Technique') {
          response = await quizResultsService.createTechniquesResult(resultData);
        } else {
          response = await quizResultsService.createTheoryResult(resultData);
        }
      }

      if (response.success) {
        // Reload results
        const allResultsResponse = await quizResultsService.getAllResults();
        if (allResultsResponse.success && allResultsResponse.data) {
          const transformedResults = allResultsResponse.data.map(transformResultToFrontend);
          setRows(transformedResults);
        }
        closeModal();
      } else {
        setError(response.message || 'Failed to save quiz result');
      }
    } catch (err) {
      console.error('Error saving quiz result:', err);
      setError('Failed to save quiz result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    openModal('edit', row);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Are you sure you want to delete this quiz result for ${row.email}?`)) {
      return;
    }

    try {
      setLoading(true);
      const original = row._original;
      let response;

      if (original.type === 'Technique') {
        response = await quizResultsService.deleteTechniquesResult(row.id);
      } else {
        response = await quizResultsService.deleteTheoryResult(row.id);
      }

      if (response.success) {
        // Reload results
        const allResultsResponse = await quizResultsService.getAllResults();
        if (allResultsResponse.success && allResultsResponse.data) {
          const transformedResults = allResultsResponse.data.map(transformResultToFrontend);
          setRows(transformedResults);
        }
      } else {
        setError(response.message || 'Failed to delete quiz result');
      }
    } catch (err) {
      console.error('Error deleting quiz result:', err);
      setError('Failed to delete quiz result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.topic.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
      render: (value, row, index) => index + 1
    },
    {
      key: 'topic',
      label: 'TOPIC',
      sortable: true,
    },
    {
      key: 'type',
      label: 'TYPE',
      sortable: true,
    },
    {
      key: 'email',
      label: 'USER EMAIL',
      sortable: true,
    },
    {
      key: 'total',
      label: 'TOTAL QUESTIONS',
      sortable: true,
      render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
    },
    {
      key: 'correct',
      label: 'CORRECT ANSWERS',
      sortable: true,
      render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
    },
    {
      key: 'result',
      label: 'RESULT',
      sortable: true,
      render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
    },
    {
      key: 'grade',
      label: 'GRADE',
      sortable: true,
      render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
    },
    {
      key: 'attempt',
      label: 'ATTEMPT NO',
      sortable: true,
      render: (value) => <div style={{ textAlign: 'center' }}>{value}</div>
    },
    {
      key: 'date',
      label: 'DATE TIME',
      sortable: true,
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      render: (value) => (
        <span className={`theory-status ${value ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const totalSubmissions = rows.length;
  const passedStudents = rows.filter(r => r.grade !== 'F').length;

  return (
    <div className="quiz-results-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <Award size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Quiz Results</h1>
              <p className="theory-page-header-subtitle">View and analyze student performance across all quizzes</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <Users size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalSubmissions}</div>
                <div className="theory-page-stat-label">Submissions</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <CheckCircle size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{passedStudents}</div>
                <div className="theory-page-stat-label">Passed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Quiz Results</h2>
        </div>

        <div className="theory-details-toolbar">
          <div className="theory-search-filter">
            <button className="theory-filter-button" title="Filter">
              <Filter className="theory-filter-icon" />
            </button>
            <div className="theory-search-input-wrapper">
              <Search className="theory-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="theory-search-input"
              />
            </div>
          </div>
        </div>

        {loading && <div className="quiz-loading">Loading quiz results...</div>}
        {error && <div className="quiz-error">{error}</div>}

        {!loading && !error && (
          <div className="theory-table-container">
            <DataTable
              columns={columns}
              data={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              selectable={true}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      {/* Add/Edit Quiz Result Modal */}
      {showModal && (
        <div className="quiz-modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="quiz-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">
                {modalMode === 'edit' ? 'Edit Quiz Result' : 'Add New Quiz Result'}
              </h3>
              <button className="quiz-modal-close" aria-label="Close" onClick={closeModal}>✕</button>
            </div>
            <div className="quiz-modal-body">
              {/* Left Side - Form */}
              <div className="quiz-modal-form-section">
                <form className="quiz-modal-form" onSubmit={handleSubmit}>
                  <div className="quiz-modal-field">
                    <label htmlFor="type">Quiz Type</label>
                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      disabled={modalMode === 'edit'}
                      required
                    >
                      <option value="Technique">Technique</option>
                      <option value="Theory">Theory</option>
                    </select>
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="detailId">
                      {form.type === 'Technique' ? 'Technique Topic' : 'Theory Topic'}
                    </label>
                    <select
                      id="detailId"
                      name="detailId"
                      value={form.detailId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic...</option>
                      {form.type === 'Technique' && Object.values(techniqueDetails).map(detail => (
                        <option key={detail.id} value={detail.id}>{detail.name}</option>
                      ))}
                      {form.type === 'Theory' && Object.values(theoryDetails).map(detail => (
                        <option key={detail.id} value={detail.id}>{detail.name || detail.id}</option>
                      ))}
                    </select>
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="userEmail">User Email</label>
                    <input
                      id="userEmail"
                      name="userEmail"
                      type="email"
                      value={form.userEmail}
                      onChange={handleChange}
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="totalQuestions">Total Questions</label>
                    <input
                      id="totalQuestions"
                      name="totalQuestions"
                      type="number"
                      min="1"
                      value={form.totalQuestions}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="correctAnswers">Correct Answers</label>
                    <input
                      id="correctAnswers"
                      name="correctAnswers"
                      type="number"
                      min="0"
                      max={form.totalQuestions}
                      value={form.correctAnswers}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="result">Result</label>
                    <select id="result" name="result" value={form.result} onChange={handleChange} required>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                    </select>
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="grade">Grade</label>
                    <select id="grade" name="grade" value={form.grade} onChange={handleChange} required>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="attemptNo">Attempt Number</label>
                    <input
                      id="attemptNo"
                      name="attemptNo"
                      type="number"
                      min="1"
                      value={form.attemptNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="quiz-modal-field">
                    <label className="quiz-checkbox-label">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="quiz-modal-actions">
                    <button type="button" className="quiz-btn secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="quiz-btn primary" disabled={loading}>
                      {loading ? 'Saving...' : (modalMode === 'edit' ? 'Update Result' : 'Save Result')}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side - Summary */}
              <div className="quiz-modal-preview-section">
                <div className="quiz-preview-header">
                  <h3 className="quiz-preview-title">Result Summary</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#1e293b', fontWeight: '600' }}>Quiz Information</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Type:</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{form.type}</span>
                      </div>
                      <div style={{ display: 'flex', justifyConten: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>User:</span>
                        <span style={{ fontWeight: '500', color: '#1e293b', fontSize: '0.875rem' }}>{form.userEmail || 'Not set'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Questions:</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{form.totalQuestions}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Correct:</span>
                        <span style={{ fontWeight: '600', color: '#22c55e' }}>{form.correctAnswers}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Score:</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>
                          {form.totalQuestions > 0 ? Math.round((form.correctAnswers / form.totalQuestions) * 100) : 0}%
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Grade:</span>
                        <span style={{
                          fontWeight: '700',
                          fontSize: '1.25rem',
                          color: form.grade === 'F' ? '#ef4444' : form.grade === 'A' ? '#22c55e' : '#f59e0b'
                        }}>{form.grade}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Result:</span>
                        <span style={{
                          fontWeight: '600',
                          color: form.result === 'Pass' ? '#22c55e' : '#ef4444',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          background: form.result === 'Pass' ? '#f0fdf4' : '#fef2f2',
                          fontSize: '0.875rem'
                        }}>{form.result}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Attempt:</span>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>#{form.attemptNo}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    background: form.isActive ? '#f0fdf4' : '#fef2f2',
                    borderRadius: '8px',
                    padding: '1rem',
                    textAlign: 'center',
                    border: `2px solid ${form.isActive ? '#86efac' : '#fecaca'}`
                  }}>
                    <span style={{
                      fontWeight: '600',
                      color: form.isActive ? '#16a34a' : '#dc2626',
                      fontSize: '0.875rem'
                    }}>
                      {form.isActive ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
