import { Suspense, StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';

const Main = lazy(() => import('./pages/intro/Main'));
const Loading = lazy(() => import('./pages/Loading'));
const GL = lazy(() => import('./pages/gl/GL'));

createRoot(document.body).render(
	<StrictMode>
		<Router>
			<Layout />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/gl" element={<GL />} />
				</Routes>
			</Suspense>
		</Router>
	</StrictMode>
);