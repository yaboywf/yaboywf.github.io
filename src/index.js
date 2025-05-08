import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Experience from './components/Experience';

const root = ReactDOM.createRoot(document.body);
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/experience" element={<Experience />} />
			</Routes>
		</Router>
	</React.StrictMode>
);