"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';


interface Contestant {
  _id: string; 
  eventUserId: string; 
  eventimg: string; 
  eventname: string; 
  userEmail: string; 
  videoPath: string; 
  certificatePath: string;
  feedbackReportPath: string; 
  id: string;
}

interface CriteriaRating {
  rating: number;
  feedback: string;
}

interface Rating {
  contestantId: string;
  criteria: { [key: string]: CriteriaRating };
  submitted?: boolean;
  averageRating?: number;
}

interface ApiResponse {
  success: boolean;
  contestants: Contestant[];
  total: number;
}

interface User {
  [x: string]: any;
  _id: string;
  name: string;
  email: string;
  role: string;
  date: string;
  phone: string;
  photo: string;
  gender: string;
  evaluator?: boolean;
  evaluatorType?: Array<String>;
}

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '80rem',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '2rem'
  },
  eventButton: {
    padding: '0.5rem 1.5rem',
    borderRadius: '9999px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  activeEventButton: {
    backgroundColor: '#699C47',
    color: 'white',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  tableHeader: {
    backgroundColor: '#f9fafb',
    padding: '0.75rem 1rem',
    textAlign: 'left' as const,
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#111827'
  },
  tableCell: {
    padding: '0.75rem 1rem',
    borderTop: '1px solid #e5e7eb'
  },
  submitButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s'
  },
  submittedButton: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  activeSubmitButton: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  starButton: {
    padding: '0.25rem',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    background: 'none',
    border: 'none',
    position: 'relative'
  },
  disabledStar: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  videoButton: {
    color: '#2563eb',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#f3f4f6'
    }
  },
  criteriaContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #e5e7eb',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  disabledTextarea: {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed'
  }
};

const StarRating = ({ 
  value, 
  onChange, 
  disabled = false 
}: { 
  value: number; 
  onChange: (rating: number) => void; 
  disabled?: boolean 
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      setHoverValue(starIndex - (isLeftHalf ? 0.5 : 0));
    }
  };

  const handleClick = (starIndex: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX - rect.left < rect.width / 2;
      const clickedValue = starIndex - (isLeftHalf ? 0.5 : 0);
      onChange(clickedValue);
      setHoverValue(null);
    }
  };

  const renderStar = (starIndex: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const isFullStar = displayValue >= starIndex;
    const isHalfStar = !isFullStar && displayValue >= starIndex - 0.5;
    
    return (
      <button
        key={starIndex}
        onClick={(e) => handleClick(starIndex, e)}
        onMouseMove={(e) => handleMouseMove(e, starIndex)}
        onMouseLeave={() => setHoverValue(null)}
        style={{
          ...styles.starButton,
          ...(disabled ? styles.disabledStar : {}),
          color: (isFullStar || isHalfStar) ? '#facc15' : '#d1d5db'
        }}
      >
        <Star 
          size={24} 
          style={{ 
            fill: isFullStar ? 'currentColor' : 'none',
            stroke: 'currentColor'
          }} 
        />
        {isHalfStar && (
          <Star 
            size={24} 
            style={{
              position: 'absolute',
              left: 0,
              fill: 'currentColor',
              clipPath: 'inset(0 50% 0 0)',
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};

const EvaluatorComponent: React.FC = () => {
  const router = useRouter();
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [ratings, setRatings] = useState<{ [key: string]: Rating }>({});
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const checkEvaluatorAccess = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          router.push('/');
          return;
        }

        const response = await axios.post<User>(
          `${process.env.BASE_URL}user/get-user`,
          { token }
        );

        if (!response.data.data.evaluator) {
          router.push('/');
          return;
        }

        if(response.data.data.evaluator){
          setEvents(response.data.data.evaluatorType);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking evaluator access:', error);
        router.push('/');
      }
    };

    checkEvaluatorAccess();
  }, [router]);

  const criteria = [
    "Criteria-1",
    "Criteria-2",
    "Criteria-3",
    "Criteria-4",
    "Criteria-5"
  ];

  const calculateAverageRating = (criteriaRatings: { [key: string]: CriteriaRating }): number => {
    const values = Object.values(criteriaRatings).map(cr => cr.rating);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return Number((sum / values.length).toFixed(2));
  };

  const handleRatingChange = (contestantId: string, criteriaKey: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [contestantId]: {
        contestantId,
        criteria: {
          ...(prev[contestantId]?.criteria || {}),
          [criteriaKey]: {
            rating: value,
            feedback: prev[contestantId]?.criteria[criteriaKey]?.feedback || ''
          }
        }
      }
    }));
  };

  const handleFeedbackChange = (contestantId: string, criteriaKey: string, feedback: string) => {
    setRatings(prev => ({
      ...prev,
      [contestantId]: {
        contestantId,
        criteria: {
          ...(prev[contestantId]?.criteria || {}),
          [criteriaKey]: {
            rating: prev[contestantId]?.criteria[criteriaKey]?.rating || 0,
            feedback
          }
        }
      }
    }));
  };

  const handleSubmitRating = async (contestantId: string) => {
    try {
      const rating = ratings[contestantId];
      if (!rating) return;

      const averageRating = calculateAverageRating(rating.criteria);
      
      const ratingWithAverage = {
        ...rating,
        averageRating
      };
      
      await axios.post(`${process.env.BASE_URL}user/submit-rating`, ratingWithAverage);
      
      setRatings(prev => ({
        ...prev,
        [contestantId]: {
          ...prev[contestantId],
          submitted: true,
          averageRating
        }
      }));
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleEventClick = async (eventName: string): Promise<void> => {
    setLoading(true);
    setSelectedEvent(eventName);
    setRatings({});
    
    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.BASE_URL}user/all-contestants`,
        { productName: eventName }
      );
      setContestants(response.data.contestants || []);
    } catch (error) {
      console.error('Error fetching contestants:', error);
      setContestants([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 style={{ height: '2rem', width: '2rem', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        {events.map((event) => (
          <button
            key={event}
            onClick={() => handleEventClick(event)}
            style={{
              ...styles.eventButton,
              ...(selectedEvent === event ? styles.activeEventButton : {})
            }}
          >
            {event}
          </button>
        ))}
      </div>
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader2 style={{ height: '2rem', width: '2rem', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : contestants.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
          <thead>
  <tr>
    <th style={styles.tableHeader}>Sl_No.</th>
    <th style={styles.tableHeader}>Video</th>
    {criteria.map(criterion => (
      <th key={criterion} style={styles.tableHeader}>{criterion}</th>
    ))}
    <th style={styles.tableHeader}>Average Rating</th>
    <th style={styles.tableHeader}>Action</th>
  </tr>
</thead>
<tbody>
  {contestants.map((contestant, index) => {
    const isSubmitted = ratings[contestant.id]?.submitted;
    const averageRating = ratings[contestant.id]?.averageRating || 0;
    return (
      <tr key={contestant.id}>
        <td style={styles.tableCell}>{index + 1}</td>
        <td style={styles.tableCell}>
          <button style={styles.videoButton}>
            View Video
          </button>
        </td>
                    {criteria.map((criterion) => (
                      <td key={criterion} style={styles.tableCell}>
                        <div style={styles.criteriaContainer}>
                          <StarRating
                            value={ratings[contestant.id]?.criteria[criterion]?.rating || 0}
                            onChange={(value) => handleRatingChange(contestant.id, criterion, value)}
                            disabled={isSubmitted}
                          />
                          <textarea
                            value={ratings[contestant.id]?.criteria[criterion]?.feedback || ''}
                            onChange={(e) => handleFeedbackChange(contestant.id, criterion, e.target.value)}
                            disabled={isSubmitted}
                            placeholder="Reason input here..."
                            rows={2}
                            style={{
                              ...styles.textarea,
                              ...(isSubmitted ? styles.disabledTextarea : {})
                            }}
                          />
                        </div>
                      </td>
                    ))}
                    <td style={styles.tableCell}>
                      {isSubmitted ? averageRating.toFixed(2) : '-'}
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => handleSubmitRating(contestant.id)}
                        disabled={isSubmitted}
                        style={{
                          ...styles.submitButton,
                          ...(isSubmitted ? styles.submittedButton : styles.activeSubmitButton)
                        }}
                      >
                        {isSubmitted ? 'Submitted' : 'Submit'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : selectedEvent && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#4b5563' }}>
          <p>No contestants found for {selectedEvent}</p>
        </div>
      )}
    </div>
  );
};

export default EvaluatorComponent;