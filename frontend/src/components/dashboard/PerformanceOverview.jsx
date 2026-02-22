import React from "react";
import { Card, CardHeader, CardContent, Avatar, Box, Typography } from "@mui/material";
import { TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PerformanceOverview = ({ title = "Performance Overview", subtitle = "Last 4 weeks", dataPoints }) => {
  const labels = dataPoints?.map((d) => d.label) || ["Week 1", "Week 2", "Week 3", "Week 4"];
  const values = dataPoints?.map((d) => d.value) || [65, 72, 78, 85];

  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: values,
        fill: true,
        backgroundColor: "rgba(59,130,246,0.12)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: "rgba(59,130,246,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "rgba(15,23,42,0.04)" },
        ticks: { color: "#6b7280", beginAtZero: true },
      },
    },
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "transparent" }}>
            <TrendingUp size={20} style={{ color: "rgb(59,130,246)" }} />
          </Avatar>
        }
        title={<Typography variant="body1" sx={{ fontWeight: 700 }}>{title}</Typography>}
        subheader={<Typography variant="caption">{subtitle}</Typography>}
      />

      <CardContent>
        <Box sx={{ height: 220, position: "relative" }}>
          <Line data={data} options={options} />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Quick overview of recent performance trends. Use `dataPoints` prop to pass real metrics.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
import React from 'react';
import { Grid, Card, CardHeader, CardContent, Avatar, Box, Typography } from '@mui/material';
import { TrendingUp, ChartColumn } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Score',
      data: [82, 85, 90, 88],
      fill: true,
      backgroundColor: 'rgba(59,130,246,0.12)',
      borderColor: '#3b82f6',
      tension: 0.3,
      pointRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: { beginAtZero: true, max: 100 },
  },
};

export default function PerformanceOverview() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'transparent', color: '#3b82f6' }}>
                <TrendingUp size={20} />
              </Avatar>
            }
            title={<Typography variant="body2" sx={{ fontWeight: 700 }}>Performance Overview</Typography>}
            subheader={<Typography variant="caption">Last 4 weeks</Typography>}
          />
          <CardContent>
            <Box sx={{ p: 1 }}>
              <Line data={data} options={options} />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Integrate your favorite charting library (Chart.js shown here). Replace data with real metrics.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'transparent', color: '#3b82f6' }}>
                <ChartColumn size={20} />
              </Avatar>
            }
            title={<Typography variant="body2" sx={{ fontWeight: 700 }}>Quick Stats</Typography>}
          />
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2">Assignments Completed</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>34/42</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Exams Passed</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>6/7</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Average Score</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>87.5%</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Study Hours This Week</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>24.5h</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
