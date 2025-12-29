import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
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
        <span className={`status-pill ${value ? 'active' : ''}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  return (
    <div className="quiz-results-page">
      <div className="quiz-results-header">
        <h2 className="quiz-results-title">Quiz Results</h2>
      </div>

      <div className="quiz-results-container">
        <div className="quiz-results-card">
          <div className="quiz-results-card-header">
            <h3 className="card-title">Quiz Results</h3>

            <div className="quiz-results-toolbar">
              <button className="filter-btn" title="Filter">
                <Filter size={18} />
              </button>

              <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <button className="add-btn">
                <Plus size={18} />
                <span>Add Workout Video</span>
              </button>
            </div>
          </div>

          <div className="quiz-results-table-wrapper">
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
    </div>
  );
};

export default QuizResults;
