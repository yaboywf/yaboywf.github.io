import { Suspense, StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/intro/Main'));
const Experience = lazy(() => import('./pages/Experience'));
const Loading = lazy(() => import('./pages/Loading'));
const Contact = lazy(() => import('./pages/contact/Contact'));

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