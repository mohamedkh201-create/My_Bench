frappe.pages['foodiex-page'].on_page_load = async function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Foodiex',
		single_column: true
	});

	wrapper.classList.add('foodiex-page-wrapper');

	let style = document.createElement('style');
	style.innerHTML = `
		.foodiex-page-wrapper .page-head {
			display: none !important;
		}
		.foodiex-page-wrapper,
		.foodiex-page-wrapper .page-body,
		.foodiex-page-wrapper .page-content,
		.foodiex-page-wrapper .container,
		.foodiex-page-wrapper .container-fluid,
		.foodiex-page-wrapper .row,
		.foodiex-page-wrapper .col,
		.foodiex-page-wrapper [class*="col-"],
		.foodiex-page-wrapper .layout-main,
		.foodiex-page-wrapper .layout-main-section,
		.foodiex-page-wrapper .main-section,
		.foodiex-page-wrapper #react-app-root {
			padding: 0 !important;
			margin: 0 !important;
			max-width: 100% !important;
			width: 100% !important;
			border: none !important;
			box-shadow: none !important;
		}
		.foodiex-page-wrapper {
			background-color: #020617 !important;
		}
		.foodiex-page-wrapper .layout-main-section {
			background-color: transparent !important;
		}
	`;
	wrapper.appendChild(style);

	$(wrapper).find('.layout-main-section').html('<div id="react-app-root"></div>');

	// تنظيف الـ DOM من أي سكريبتات أو ملفات CSS قديمة خاصة بـ React
	$('#vite-react-script').remove();
	$('.vite-react-style').remove();
	$('#vite-dev-preamble').remove();
	$('#vite-dev-client').remove();
	$('#vite-dev-main').remove();

	// استخدام hostname الحالي بدلاً من localhost عشان يشتغل من أي مكان
	const viteHost = window.location.hostname;
	const viteUrl = `https://${viteHost}:5174`;

	const isViteRunning = await fetch(`${viteUrl}/@vite/client`, { method: 'HEAD', mode: 'no-cors' })
		.then(() => true)
		.catch(() => false);

	if (isViteRunning) {
		// ===== Development Mode =====
		console.log('🚀 Foodiex: Loading in Development Mode from ' + viteUrl);

		let script = document.createElement('script');
		script.type = 'module';
		script.id = 'vite-dev-main';
		script.innerHTML = `
			import RefreshRuntime from '${viteUrl}/@react-refresh'
			RefreshRuntime.injectIntoGlobalHook(window)
			window.$RefreshReg$ = () => {}
			window.$RefreshSig$ = () => (type) => type
			window.__vite_plugin_react_preamble_installed__ = true
			
			// Load vite client then the main app to guarantee execution order for Fast Refresh
			import('${viteUrl}/@vite/client').then(() => {
				import('${viteUrl}/src/main.jsx');
			});
		`;
		document.body.appendChild(script);

	} else {
		// ===== Production Mode =====
		console.log('📦 Foodiex: Loading in Production Mode');
		const assetBase = '/assets/foodiex/frontend/';

		const manifestUrl = `${assetBase}.vite/manifest.json?v=${new Date().getTime()}`;

		fetch(manifestUrl, { cache: 'no-store' })
			.then(res => res.json())
			.then(manifest => {
				const entry = manifest['src/main.jsx'];

				if (!entry) {
					console.error('React app entry not found in manifest');
					return;
				}

				if (entry.css && entry.css.length > 0) {
					entry.css.forEach(cssFile => {
						let link = document.createElement('link');
						link.rel = 'stylesheet';
						link.href = assetBase + cssFile;
						link.className = 'vite-react-style';
						document.head.appendChild(link);
					});
				}

				let script = document.createElement('script');
				script.type = 'module';
				script.src = assetBase + entry.file;
				script.id = 'vite-react-script';
				document.body.appendChild(script);
			})
			.catch(err => {
				console.error('Failed to load React app:', err);
			});
	}
}