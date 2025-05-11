import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Main = React.lazy(() => import('./components/Main'));
const Experience = React.lazy(() => import('./components/Experience'));

const root = ReactDOM.createRoot(document.body);
root.render(
	<React.StrictMode>
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/experience" element={<Experience />} />
				</Routes>
			</Suspense>
		</Router>
	</React.StrictMode>
);