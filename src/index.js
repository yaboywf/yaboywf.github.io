import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Main = React.lazy(() => import('./components/Main'));
const Experience = React.lazy(() => import('./components/Experience'));
const Loading = React.lazy(() => import('./components/Loading'));
const Contact = React.lazy(() => import('./components/Contact'));

const root = ReactDOM.createRoot(document.body);
root.render(
	<React.StrictMode>
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/experience" element={<Experience />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</Suspense>
		</Router>
	</React.StrictMode>
);