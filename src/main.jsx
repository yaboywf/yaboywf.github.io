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

let refreshInProgress = false;
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js").catch(console.error);
	});

	navigator.serviceWorker.addEventListener("message", async (event) => {
		if (event.data?.type === "SW_FETCH_FAILED" && !refreshInProgress) {
			refreshInProgress = true;
			alert("The site has been updated. Refreshing to get the latest version...");

			const regs = await navigator.serviceWorker.getRegistrations();
			for (const reg of regs) await reg.unregister();

			if (window.caches) {
				const keys = await caches.keys();
				await Promise.all(keys.map((key) => caches.delete(key)));
			}

			location.reload(true);
		}

		if (event.data?.type === "SW_UPDATE_AVAILABLE" && !refreshInProgress) {
			refreshInProgress = true;
			alert("The site has been updated. Refreshing to get the latest version...");
		}
	});
}