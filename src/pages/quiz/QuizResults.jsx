import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Award, Users, CheckCircle } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import { getQuizResults } from '../../data/data.js';
import './QuizResults.css';
import '../../components/ui/DataTable.css';

const QuizResults = () => {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const loadQuizResults = async () => {
      const resultsData = await getQuizResults();
      setRows(resultsData);
    };
    loadQuizResults();
  }, []);

  const handleEdit = (row) => {
    console.log('Edit row:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
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
      render: (value, row, index) => value
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
          <button className="theory-button theory-button-primary">
            <Plus className="theory-button-icon" />
            <span>Add Quiz Result</span>
          </button>
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
      </div>
    </div>
  );
};

export default QuizResults;
