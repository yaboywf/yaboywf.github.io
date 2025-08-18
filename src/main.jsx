import { Suspense, StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./components/Main'));
const Experience = lazy(() => import('./components/Experience'));
const Loading = lazy(() => import('./components/Loading'));
const Contact = lazy(() => import('./components/Contact'));

createRoot(document.body).render(
	<StrictMode>
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/experience" element={<Experience />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</Suspense>
		</Router>
	</StrictMode>
);