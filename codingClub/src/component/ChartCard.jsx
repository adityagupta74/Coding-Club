import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useState, useEffect } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { motion } from "framer-motion";

const initialData = [
  { name: "Mon", score: 40, problems: 5 },
  { name: "Tue", score: 60, problems: 8 },
  { name: "Wed", score: 75, problems: 12 },
  { name: "Thu", score: 50, problems: 6 },
  { name: "Fri", score: 90, problems: 15 },
  { name: "Sat", score: 85, problems: 13 },
  { name: "Sun", score: 70, problems: 10 }
];

export default function ChartCard() {
  const [data, setData] = useState(initialData);
  const [chartType, setChartType] = useState('line');
  const [activeMetric, setActiveMetric] = useState('score');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        score: Math.max(20, item.score + (Math.random() - 0.5) * 10),
        problems: Math.max(1, item.problems + Math.floor((Math.random() - 0.5) * 3))
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="fw-semibold mb-1">{label}</p>
          <p className="text-primary mb-0">
            {activeMetric === 'score' ? 'Score' : 'Problems'}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="card-custom h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">📊 Coding Activity</h5>
          <ButtonGroup size="sm">
            <Button 
              variant="outline-primary"
              onClick={() => setActiveMetric(activeMetric === 'score' ? 'problems' : 'score')}
            >
              {activeMetric === 'score' ? 'Problems' : 'Score'}
            </Button>
            <Button 
              variant="outline-secondary"
              onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
            >
              {chartType === 'line' ? 'Area' : 'Line'}
            </Button>
          </ButtonGroup>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          {chartType === 'line' ? (
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={activeMetric} 
                stroke="#6366F1" 
                strokeWidth={3}
                dot={{ fill: '#6366F1', r: 4 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={activeMetric} 
                stroke="#6366F1" 
                fill="#6366F1"
                fillOpacity={0.3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}
