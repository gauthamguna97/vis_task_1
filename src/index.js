import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/App';
import Home from './js/Home';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import BarGraph from './js/BarGraph';
import Histogram from './js/Histogram';
import ScatterPlot from './js/ScatterPlot';
import * as d3 from 'd3';

const nums = [
  'Age',
  'Overall',
  'Potential',
  'Value',
  'Wage',
  'Special',
  'International Reputation',
  'Weak Foot',
  'Skill Moves',
  'Jersey Number',
  'Weight',
  'LS',
  'ST',
  'RS',
  'LW',
  'LF',
  'CF',
  'RF',
  'RW',
  'LAM',
  'CAM',
  'RAM',
  'LM',
  'LCM',
  'CM',
  'RCM',
  'RM',
  'LWB',
  'LDM',
  'CDM',
  'RDM',
  'RWB',
  'LB',
  'LCB',
  'CB',
  'RCB',
  'RB',
  'Crossing',
  'Finishing',
  'HeadingAccuracy',
  'ShortPassing',
  'Volleys',
  'Dribbling',
  'Curve',
  'FKAccuracy',
  'LongPassing',
  'BallControl',
  'Acceleration',
  'SprintSpeed',
  'Agility',
  'Reactions',
  'Balance',
  'ShotPower',
  'Jumping',
  'Stamina',
  'Strength',
  'LongShots',
  'Aggression',
  'Interceptions',
  'Positioning',
  'Vision',
  'Penalties',
  'Composure',
  'Marking',
  'StandingTackle',
  'SlidingTackle',
  'GKDiving',
  'GKHandling',
  'GKKicking',
  'GKPositioning',
  'GKReflexes'
]

const cats = [
  'Nationality',
  'Club',
  'Preferred Foot',
  'Work Rate',
  'Body Type',
  'Real Face',
  'Position',
  'Joined',
  'Height'
]

var margin = {top: 100, right: 20, bottom: 150, left: 150},
width = window.innerWidth - margin.left - margin.right-300,
height = window.innerHeight - margin.top - margin.bottom-150;


ReactDOM.render(
    <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={<App cats={cats} nums={nums} />}
          >
            <Route
              path="/"
              element={<Home cats={cats} nums={nums} margin={margin} width={width} height={height} />}
            ></Route>
            <Route
              path="/bar"
              element={<BarGraph cats={cats} nums={nums} margin={margin} width={width} height={height} />}
            />
            <Route
              path="/histogram"
              element={<Histogram cats={cats} nums={nums} margin={margin} width={width} height={height} />}
            />
            <Route
              path="/scatter"
              element={<ScatterPlot cats={cats} nums={nums} margin={margin} width={width} height={height} />}
            />
          </Route>
      </Routes>,
    </BrowserRouter>,
  document.getElementById('root')
);

