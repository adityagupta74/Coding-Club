import { Card, Button, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { useUser } from "../App";

export default function CodingStreak() {
  const { user } = useUser();
  const [streak, setStreak] = useState(user.stats.streak || 15);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [progress] = useState(2);
  const maxProgress = 3;

  const handleCompleteChallenge = () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      setStreak(prev => prev + 1);
    }
  };

  return (
    <Card className="card-custom h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">🔥 Coding Streak</h5>
            <small className="text-muted">Keep the momentum going!</small>
          </div>
          <div className="text-center">
            <h2 className="fw-bold text-primary mb-0">{streak}</h2>
            <small className="text-muted">days</small>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <small className="fw-semibold">Today's Challenge</small>
            <small className="text-muted">{progress}/{maxProgress}</small>
          </div>
          <ProgressBar now={(progress / maxProgress) * 100} variant="warning" />
          <p className="small text-muted mt-2">Solve 3 coding problems</p>
        </div>

        {!todayCompleted ? (
          <Button 
            variant="warning" 
            className="w-100"
            onClick={handleCompleteChallenge}
          >
            🎯 Complete Challenge
          </Button>
        ) : (
          <Button variant="success" className="w-100" disabled>
            ✅ Challenge Completed!
          </Button>
        )}

        <div className="mt-3 pt-3 border-top">
          <div className="d-flex justify-content-between small text-muted">
            <span>Best Streak: 23 days</span>
            <span>This Week: 5/7</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
