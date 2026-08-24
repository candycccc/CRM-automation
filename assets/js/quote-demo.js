/* Quote & Sales demonstration workspace.
   Keeps Quote lifecycle state explicit so the CRM Pipeline can consume it later. */
(function () {
  'use strict';

  const QUOTE_STATUSES = ['In Progress', 'In Review', 'Passed Review', 'Sent', 'Accepted', 'Complete', 'Cancelled', 'Rejected'];
  const QUOTE_TABS = ['All', 'In Progress', 'In Review', 'Passed Review', 'Sent', 'Accepted', 'Complete', 'Expired', 'Cancelled'];
  const OWNING_COMPANIES = window.WeQuoteOwningCompanies || [
    { id: 'main-company', name: 'AUDIOVISIONS — Main Company', shortName: 'Main Company' },
    { id: 'los-angeles', name: 'AUDIOVISIONS — Los Angeles', shortName: 'Los Angeles' },
    { id: 'northern-california', name: 'AUDIOVISIONS — Northern California', shortName: 'Northern California' },
    { id: 'orange-county', name: 'AUDIOVISIONS — Orange County', shortName: 'Orange County' },
    { id: 'palm-desert', name: 'AUDIOVISIONS — Palm Desert', shortName: 'Palm Desert' }
  ];
  const quoteRows = [
    { id: 'Q-24589', customer: 'Les Landau', project: 'Theater Upgrades', owner: 'Jeff Mitchel', initials: 'JM', created: '21 Aug 2026', modified: '22 Aug 2026', location: 'London', status: 'In Progress', total: '£31,346.00', expiry: '', expiresAt: '', crmDeal: 'Theater Upgrades', proposal: 'Original Theater Proposal', seen: true, portalAccess: true, label: 'High value' },
    { id: 'Q-24590', customer: 'Les Landau', project: 'Theater Upgrades', owner: 'Jeff Mitchel', initials: 'JM', created: '21 Aug 2026', modified: '22 Aug 2026', location: 'London', status: 'Sent', total: '£38,920.00', expiry: 'Expires 20 Sep 2026', expiresAt: '2026-09-20', crmDeal: 'Theater Upgrades', proposal: 'Premium Theater Proposal', seen: false, portalAccess: true, label: 'Recommended' },
    { id: 'Q-11990', customer: 'Cherin Joseph', project: '2231 Quail Bluff Ct', owner: 'Dave Lombard', initials: 'DL', created: '19 Aug 2026', modified: '22 Aug 2026', location: 'Henderson', status: 'In Review', total: '£35,162.00', expiry: '', expiresAt: '', crmDeal: '2231 Quail Bluff Ct', proposal: 'Main AV Scope', seen: false, portalAccess: false, label: 'Technical review' },
    { id: 'Q-11992', customer: 'Scott Small', project: 'Window Treatments', owner: 'Sean Prater', initials: 'SP', created: '18 Aug 2026', modified: '21 Aug 2026', location: 'Surrey', status: 'Passed Review', total: '£52,630.00', expiry: '', expiresAt: '', crmDeal: 'Window Treatments', proposal: 'Motorised Blind Package', seen: true, portalAccess: true, label: 'Ready to send' },
    { id: 'Q-11885', customer: '1 Burning Tree', project: 'Lutron Sunnata', owner: 'Dave Lombard', initials: 'DL', created: '15 Aug 2026', modified: '20 Aug 2026', location: 'Luton', status: 'Sent', total: '£59,800.00', expiry: 'Expires 20 Sep 2026', expiresAt: '2026-09-20', crmDeal: '1 Burning Tree Lutron Sunnata', proposal: 'Alternative Lighting Package', seen: true, portalAccess: true, label: 'VIP' },
    { id: 'Q-11016', customer: 'Jerry Grundhofer', project: 'IP Camera Upgrades', owner: 'Jeff Mitchel', initials: 'JM', created: '12 Aug 2026', modified: '19 Aug 2026', location: 'Bristol', status: 'Sent', total: '£28,656.00', expiry: 'Expires 18 Sep 2026', expiresAt: '2026-09-18', crmDeal: 'IP Camera Upgrades', proposal: 'Camera and Recording Upgrade', seen: false, portalAccess: true, label: 'Follow up' },
    { id: 'Q-10987', customer: 'DPP9 Owner LLC', project: 'Harland WeHo Theater', owner: 'Jeff Mitchel', initials: 'JM', created: '10 Aug 2026', modified: '18 Aug 2026', location: 'West Hollywood', status: 'Accepted', total: '£50,688.00', expiry: 'Accepted 20 Aug 2026', expiresAt: '', crmDeal: 'Harland WeHo Theater', proposal: 'Theater Proposal', seen: true, portalAccess: true, label: 'Won' },
    { id: 'Q-12003', customer: 'Gabriel Rivera', project: 'Office AV Refresh', owner: 'Patrick Burke', initials: 'PB', created: '06 Aug 2026', modified: '17 Aug 2026', location: 'Warrington', status: 'In Progress', total: '£12,400.00', expiry: '', expiresAt: '', crmDeal: '', proposal: 'Office AV Proposal', seen: true, portalAccess: false, label: '' },
    { id: 'Q-12004', customer: 'Gabriel Rivera', project: 'Office AV Refresh', owner: 'Patrick Burke', initials: 'PB', created: '06 Aug 2026', modified: '17 Aug 2026', location: 'Warrington', status: 'In Progress', total: '£16,850.00', expiry: '', expiresAt: '', crmDeal: '', proposal: 'Office AV Premium Option', seen: false, portalAccess: false, label: '' },
    { id: 'Q-11996', customer: 'Ethan Van Der Ryn', project: '20436 Rocha Chica Drive v2', owner: 'Alex Osei', initials: 'AO', created: '29 Jul 2026', modified: '14 Aug 2026', location: 'Los Angeles', status: 'Expired', total: '£40,383.00', expiry: 'Expired 25 Jul 2026', expiresAt: '2026-07-25', crmDeal: '20436 Rocha Chica Drive v2', proposal: 'Rocha Chica Proposal', seen: false, portalAccess: false, label: 'Expired' },
    { id: 'Q-11997', customer: 'Farrel Stevins', project: 'New Pool TV', owner: 'Patrick Burke', initials: 'PB', created: '16 Jul 2026', modified: '04 Aug 2026', location: 'Las Vegas', status: 'In Progress', total: '£10,555.00', expiry: '', expiresAt: '', crmDeal: '', proposal: 'Outdoor Display Proposal', seen: false, portalAccess: false, label: '' },
    { id: 'Q-2401', customer: 'Orchard House', project: 'Lighting Option A', owner: 'Lee Roche', initials: 'LR', created: '09 Jul 2026', modified: '01 Aug 2026', location: 'Surrey', status: 'Cancelled', total: '£12,400.00', expiry: 'Cancelled 01 Aug 2026', expiresAt: '', crmDeal: 'Orchard House Lighting Options', proposal: 'Lighting Option A', seen: true, portalAccess: false, label: 'Option', deleted: true },
    { id: 'Q-2400', customer: 'Orchard House', project: 'Lighting Option B', owner: 'Lee Roche', initials: 'LR', created: '09 Jul 2026', modified: '01 Aug 2026', location: 'Surrey', status: 'Cancelled', total: '£15,850.00', expiry: 'Cancelled 01 Aug 2026', expiresAt: '', crmDeal: 'Orchard House Lighting Options', proposal: 'Lighting Option B', seen: true, portalAccess: false, label: 'Option' },
    { id: 'Q-2399', customer: 'Orchard House', project: 'Lighting Option C', owner: 'Lee Roche', initials: 'LR', created: '09 Jul 2026', modified: '01 Aug 2026', location: 'Surrey', status: 'Cancelled', total: '£18,200.00', expiry: 'Cancelled 01 Aug 2026', expiresAt: '', crmDeal: 'Orchard House Lighting Options', proposal: 'Lighting Option C', seen: false, portalAccess: false, label: 'Option' }
  ];

  quoteRows.forEach((row, index) => { row.owningCompanyId = row.owningCompanyId || OWNING_COMPANIES[index % OWNING_COMPANIES.length].id; });
  let activeFilter = 'All';
  let activeCompany = 'all';
  let searchTerm = '';
  let groupByDeal = false;
  let showDeleted = false;
  let currentQuoteId = 'Q-24589';
  let currentScreen = 'list';
  let currentQuoteSection = 'summary';
  let quoteOptionsPopover = null;
  let quoteLinkModal = null;
  let quoteDealModal = null;
  let quoteDialog = null;

  function isStandaloneQuoteWorkspace() {
    return window.WeQuoteQuoteStandalone === true || document.body.classList.contains('qw-standalone');
  }

  function standaloneQuoteUrl(id, section) {
    const params = new URLSearchParams();
    params.set('quote', id || currentQuoteId);
    if (section && section !== 'summary') params.set('section', section);
    return './quote-detail.html?' + params.toString();
  }

  function syncStandaloneUrl() {
    if (!isStandaloneQuoteWorkspace()) return;
    // On load the address bar is the workspace's source of truth, so it has to
    // follow whatever record is on screen. Without this, switching option or
    // section leaves the old Quote in the URL and a refresh — or a copied
    // link — reopens whichever Quote was opened first.
    const section = currentScreen === 'proposal' ? 'proposal' : currentQuoteSection;
    try {
      window.history.replaceState(null, '', standaloneQuoteUrl(currentQuoteId, section));
    } catch (error) { /* some browsers refuse replaceState under file:// */ }
  }

  function saveStandaloneQuoteContext(quote) {
    if (!quote || !quote.id) return;
    try { window.sessionStorage.setItem('wequote-quote-context:' + quote.id, JSON.stringify(quote)); } catch (error) { /* file:// privacy mode */ }
  }

  function root() { return document.getElementById('quoteWorkspace'); }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }
  function slug(value) { return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
  function quoteById(id) { return quoteRows.find(row => row.id === id) || quoteRows[0]; }
  function owningCompany(id) { return OWNING_COMPANIES.find(company => company.id === id) || OWNING_COMPANIES[0]; }
  function companyOptions() { return '<option value="all">All Companies</option>' + OWNING_COMPANIES.map(company => '<option value="' + esc(company.id) + '"' + (activeCompany === company.id ? ' selected' : '') + '>' + esc(company.name) + '</option>').join(''); }
  function countFor(status) {
    const availableRows = showDeleted ? quoteRows : quoteRows.filter(row => !row.deleted);
    const companyRows = activeCompany === 'all' ? availableRows : availableRows.filter(row => row.owningCompanyId === activeCompany);
    return status === 'All' ? companyRows.length : companyRows.filter(row => row.status === status).length;
  }
  function statusOptions(selected) {
    return QUOTE_STATUSES.map(status => '<option value="' + esc(status) + '"' + (status === selected ? ' selected' : '') + '>' + esc(status) + '</option>').join('');
  }
  function linkedStage(quote) {
    const related = quoteRows.filter(row => row.crmDeal === quote.crmDeal);
    const statuses = related.map(row => row.status);
    if (statuses.some(status => status === 'Accepted' || status === 'Complete')) return 'Deal Stage = Won';
    if (statuses.length && statuses.every(status => status === 'Cancelled' || status === 'Rejected')) return 'Deal Status = Archived · Last Stage retained';
    const viable = ['In Progress', 'In Review', 'Passed Review', 'Sent'];
    if (statuses.length && !statuses.some(status => viable.includes(status))) return 'Deal Stage = Lost';
    return 'Deal Stage = ' + quote.status;
  }
  function setCrumb(detail) {
    const pageTitle = document.getElementById('pageTitle');
    if (!pageTitle) return;
    pageTitle.innerHTML = '<span class="crumb-link" onclick="openQuoteWorkspace()">Quote &amp; Sales</span><span class="crumb-sep">/</span>' + detail;
  }

  function setQuoteEditorMode(enabled) {
    const app = document.querySelector('.app');
    if (app) app.classList.toggle('qw-editor-focus-mode', !!enabled);
  }

  function openWorkspace() {
    if (isStandaloneQuoteWorkspace()) {
      window.location.href = './index.html#quotes';
      return;
    }
    setQuoteEditorMode(false);
    if (typeof window.showView === 'function') window.showView('quotes');
    activeFilter = 'All';
    searchTerm = '';
    currentScreen = 'list';
    closeQuoteOptionsPopover();
    closeQuoteLinkModal();
    closeQuoteDealModal();
    closeQuoteDialog();
    setCrumb('Quotes');
    renderList();
  }

  function visibleRows() {
    const term = searchTerm.trim().toLowerCase();
    const filtered = quoteRows.filter(row => {
      const matchesStatus = activeFilter === 'All' || row.status === activeFilter;
      const haystack = [row.id, row.customer, row.project, row.owner, row.location, row.status, row.crmDeal, row.label].join(' ').toLowerCase();
      const matchesCompany = activeCompany === 'all' || row.owningCompanyId === activeCompany;
      return (showDeleted || !row.deleted) && matchesStatus && matchesCompany && (!term || haystack.includes(term));
    });
    return filtered;
  }

  function renderList() {
    const mount = root();
    if (!mount) return;
    closeQuoteOptionsPopover();
    setQuoteEditorMode(false);
    currentScreen = 'list';
    setCrumb('Quotes');
    const rows = visibleRows();
    const showCompanyColumn = activeCompany === 'all';
    const rowsHtml = groupByDeal ? groupedRowsHtml(rows) : rows.map(rowHtml).join('');
    mount.innerHTML = '<div class="qw-page">' +
      '<div class="qw-page-head"><div><h1>Quotes</h1><p>Manage Quotes and the CRM Deals they belong to. Multiple Quote options can remain linked to one Deal.</p></div>' +
        '<div class="qw-head-actions"><button class="qw-head-link"><i class="fai">&#xf56f;</i> Import Quote from CSV/Excel</button><button class="qw-head-link"><i class="fai">&#xf56e;</i> Export Quotes</button><button class="qw-head-link"><i class="fai">&#xf0c1;</i> Import Shared Quote</button><button class="qw-btn dark"><i class="fai">&#xf234;</i> New Customer</button><button class="qw-btn primary"><i class="fai">&#xf067;</i> New Quote</button></div></div>' +
      '<div class="qw-shell">' +
        '<div class="qw-toolbar"><h2>Quotes</h2><div class="qw-filters">' +
          '<label class="qw-check-filter"><input type="checkbox"' + (groupByDeal ? ' checked' : '') + ' onchange="setQuoteGroupByDeal(this.checked)"><span>Group by Deal</span></label>' +
          '<label class="qw-check-filter"><input type="checkbox"' + (showDeleted ? ' checked' : '') + ' onchange="setQuoteShowDeleted(this.checked)"><span>Show deleted</span></label>' +
          '<label class="qw-company-filter"><i class="fai">&#xf1ad;</i><select aria-label="Filter Quotes by Owning Company" onchange="setQuoteCompanyFilter(this.value)">' + companyOptions() + '</select></label>' +
          '<select class="qw-filter-select" aria-label="Assigned to"><option>Assigned to: Anyone</option><option>Assigned to: Me</option></select><select class="qw-filter-select compact" aria-label="Label"><option>Label: All</option><option>High value</option><option>VIP</option><option>Follow up</option></select>' +
          '<label class="qw-search"><i class="fai">&#xf002;</i><input value="' + esc(searchTerm) + '" oninput="filterQuoteDemo(this.value)" placeholder="Search quotes"></label>' +
        '</div></div>' +
        '<div class="qw-tabs" role="tablist">' + QUOTE_TABS.map(tab => '<button class="qw-tab' + (tab === activeFilter ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (tab === activeFilter) + '" onclick="setQuoteDemoFilter(\'' + tab + '\')">' + tab + '<strong>' + countFor(tab) + '</strong></button>').join('') + '</div>' +
        '<div class="qw-table-wrap">' + (rows.length ? '<table class="qw-table' + (showCompanyColumn ? ' has-company-column' : '') + '"><thead><tr><th class="num">#</th><th class="customer">Customer</th>' + (showCompanyColumn ? '<th class="company">Company</th>' : '') + '<th class="options">Options <span class="qw-new-badge">New</span></th><th class="seen">Seen</th><th class="owner">Assigned to</th><th class="date">Created</th><th class="date modified">Last modified</th><th class="location">Location</th><th class="status-col">Status / Date</th><th class="portal">Portal access</th><th class="label">Label</th><th class="total">Net total</th></tr></thead><tbody>' + rowsHtml + '</tbody></table>' : '<div class="qw-empty"><i class="fai">&#xf002;</i><br><br>No Quotes match this view.</div>') + '</div>' +
        '<div class="qw-pagination"><span>' + rows.length + ' matching Quotes' + (groupByDeal ? ' · grouped by Deal' : '') + ' · ' + (activeCompany === 'all' ? 'All Companies' : esc(owningCompany(activeCompany).name)) + '</span><div class="qw-pagination-pages"><span class="qw-page-dot active">1</span><span class="qw-page-dot">2</span><span class="qw-page-dot">›</span></div></div>' +
      '</div></div>';
  }

  function groupedRowsHtml(rows) {
    const groups = new Map();
    const loose = [];
    rows.forEach(row => {
      if (!row.crmDeal) { loose.push(row); return; }
      if (!groups.has(row.crmDeal)) groups.set(row.crmDeal, []);
      groups.get(row.crmDeal).push(row);
    });
    let html = '';
    const columnCount = activeCompany === 'all' ? 13 : 12;
    groups.forEach((items, dealName) => {
      const autoCreated = items.some(item => item.autoCreatedDeal);
      html += '<tr class="qw-deal-group-row"><td colspan="' + columnCount + '"><div class="qw-deal-group-head"><span><i class="fai">&#xf0c0;</i><strong>' + esc(dealName) + '</strong><b>Deal</b>' + (autoCreated ? '<b class="auto">Auto-created</b><em>Rename it in CRM</em>' : '') + '</span><span>' + items.length + ' options · 1 can be accepted</span></div></td></tr>' + items.map(rowHtml).join('');
    });
    if (loose.length) html += '<tr class="qw-deal-group-row loose"><td colspan="' + columnCount + '"><div class="qw-deal-group-head"><span><i class="fai">&#xf127;</i><strong>Not linked to a Deal</strong></span><span>' + loose.length + ' Quotes</span></div></td></tr>' + loose.map(rowHtml).join('');
    return html;
  }

  function rowHtml(row) {
    const linked = linkedQuotes(row);
    const optionsCell = row.crmDeal
      ? '<button class="qw-options-button" type="button" aria-label="View ' + linked.length + ' Quote options for ' + esc(row.crmDeal) + '" onclick="event.stopPropagation();openQuoteOptions(event,\'' + esc(row.id) + '\')"><i class="fai">&#xf0c1;</i><strong>' + linked.length + '</strong></button>'
      : '<button class="qw-link-button" type="button" onclick="event.stopPropagation();openQuoteLinker(event,\'' + esc(row.id) + '\')"><i class="fai">&#xf0c1;</i> Link</button>';
    return '<tr' + (row.deleted ? ' class="deleted"' : '') + ' tabindex="0" role="link" aria-label="Open ' + esc(row.id) + '" onclick="openQuoteDemoDetail(\'' + esc(row.id) + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openQuoteDemoDetail(\'' + esc(row.id) + '\')}">' +
      '<td class="num"><strong>' + esc(row.id.replace('Q-', '')) + '</strong><i class="fai qw-doc-icon">&#xf15c;</i></td>' +
      '<td class="customer"><div class="qw-customer"><strong>' + esc(row.customer) + (row.project ? ' / <span class="qw-link" style="display:inline">' + esc(row.project) + '</span>' : '') + '</strong><span>' + esc(row.proposal) + (row.deleted ? ' · Deleted' : '') + '</span></div></td>' +
      (activeCompany === 'all' ? '<td class="company"><span class="qw-row-company" title="' + esc(owningCompany(row.owningCompanyId).name) + '"><i class="fai">&#xf1ad;</i><span><strong>' + esc(owningCompany(row.owningCompanyId).shortName) + '</strong><small>' + esc(owningCompany(row.owningCompanyId).name) + '</small></span></span></td>' : '') +
      '<td class="options">' + optionsCell + '</td>' +
      '<td class="seen"><i class="fai qw-seen ' + (row.seen ? 'is-seen' : 'not-seen') + '">' + (row.seen ? '&#xf06e;' : '&#xf070;') + '</i></td>' +
      '<td class="owner"><i class="fai qw-owner-lock">&#xf023;</i>' + esc(row.owner) + '</td>' +
      '<td class="date">' + esc(row.created) + '</td><td class="date modified">' + esc(row.modified) + '<small>' + (row.modified === '22 Aug 2026' ? 'Just now' : 'Recently') + '</small></td><td class="location">' + esc(row.location || '—') + '</td>' +
      '<td class="status-col"><span class="qw-status ' + slug(row.status) + '">' + esc(row.status) + '</span>' + (row.expiry ? '<span class="qw-status-date">' + esc(row.expiry) + '</span>' : '') + '</td>' +
      '<td class="portal"><button class="qw-toggle' + (row.portalAccess ? ' on' : '') + '" type="button" role="switch" aria-checked="' + !!row.portalAccess + '" onclick="event.stopPropagation();toggleQuotePortal(\'' + esc(row.id) + '\')"><span></span></button></td>' +
      '<td class="label">' + (row.label ? '<span class="qw-label-chip">' + esc(row.label) + '</span>' : '—') + '</td>' +
      '<td class="total">' + esc(row.total) + '</td></tr>';
  }

  function linkedQuotes(quote) {
    if (!quote || !quote.crmDeal) return [];
    return quoteRows.filter(row => row.crmDeal === quote.crmDeal && (showDeleted || !row.deleted));
  }

  function closeQuoteOptionsPopover() {
    if (quoteOptionsPopover) quoteOptionsPopover.remove();
    quoteOptionsPopover = null;
  }

  function placeQuotePopover(popover, trigger) {
    document.body.appendChild(popover);
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(520, window.innerWidth - 24);
    popover.style.width = width + 'px';
    const left = Math.max(12, Math.min(window.innerWidth - width - 12, rect.left + rect.width / 2 - width / 2));
    const below = rect.bottom + 8;
    const top = below + popover.offsetHeight <= window.innerHeight - 12
      ? below
      : Math.max(12, rect.top - popover.offsetHeight - 8);
    popover.style.left = left + 'px';
    popover.style.top = top + 'px';
    quoteOptionsPopover = popover;
  }

  function openQuoteOptions(event, id) {
    closeQuoteOptionsPopover();
    const quote = quoteById(id);
    const linked = linkedQuotes(quote);
    const popover = document.createElement('section');
    popover.className = 'qw-options-popover';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-label', 'Quote options linked to ' + quote.crmDeal);
    popover.onclick = clickEvent => clickEvent.stopPropagation();
    popover.innerHTML = '<button class="qw-popover-close" type="button" onclick="closeQuoteOptions()" aria-label="Close">×</button>' +
      '<div class="qw-popover-head"><div><h3>' + esc(quote.crmDeal) + ' <span>Deal</span></h3><p>' + linked.length + ' Quote option' + (linked.length === 1 ? '' : 's') + ' on this Deal</p></div></div>' +
      (linked.length > 1 ? '<div class="qw-option-rule"><i class="fai">&#xf05a;</i><span>Only one option can be accepted. Accepting one rejects the other alternatives.</span></div>' : '') +
      '<div class="qw-option-rows">' + linked.map((item, index) => '<div class="qw-option-row"><span class="qw-option-name">Option ' + (index + 1) + '</span><button type="button" class="qw-option-id" onclick="closeQuoteOptions();openQuoteDemoDetail(\'' + esc(item.id) + '\')">' + esc(item.id.replace('Q-', '')) + '</button>' + (item.id === id ? '<span class="qw-current-chip">Current</span>' : '') + '<strong>' + esc(item.total) + '</strong><span class="qw-mini-status ' + slug(item.status) + '">' + esc(item.status) + '</span><button class="qw-icon-button" type="button" title="Unlink this Quote" onclick="unlinkQuoteFromDeal(\'' + esc(item.id) + '\')"><i class="fai">&#xf127;</i></button></div>').join('') + '</div>' +
      '<div class="qw-popover-actions"><button type="button" onclick="openAddQuoteOptionDialog(\'' + esc(id) + '\')"><i class="fai">&#xf067;</i> Add option</button><button type="button" onclick="openLinkedDealFromQuote(\'' + esc(id) + '\')">View Deal <i class="fai">&#xf35d;</i></button><button class="danger" type="button" onclick="unlinkQuoteFromDeal(\'' + esc(id) + '\')">Unlink current</button></div>';
    placeQuotePopover(popover, event.currentTarget);
  }

  function openQuoteLinker(event, id) {
    if (event) event.stopPropagation();
    closeQuoteOptionsPopover();
    closeQuoteLinkModal();
    const quote = quoteById(id);
    const overlay = document.createElement('div');
    overlay.className = 'qw-modal-overlay';
    overlay.onclick = modalEvent => { if (modalEvent.target === overlay) closeQuoteLinkModal(); };
    overlay.innerHTML = '<section class="qw-link-modal" role="dialog" aria-modal="true" aria-labelledby="qwLinkModalTitle" data-quote-id="' + esc(id) + '" data-tab="deal"><header><div><span class="qw-modal-kicker">Linked Quote options</span><h2 id="qwLinkModalTitle">Link ' + esc(quote.id) + ' to a Deal</h2><p>Choose an existing Deal, or select another Quote and WeQuote will create the Deal automatically.</p></div><button type="button" onclick="closeQuoteLinkModal()" aria-label="Close">×</button></header><nav class="qw-modal-tabs"><button class="active" type="button" data-link-tab="deal" onclick="switchQuoteLinkTab(\'deal\')">Existing Deal</button><button type="button" data-link-tab="quote" onclick="switchQuoteLinkTab(\'quote\')">Another Quote</button></nav><div class="qw-link-search"><i class="fai">&#xf002;</i><input id="quoteLinkSearch" placeholder="Search Deal name or customer" oninput="filterQuoteLinkModal(this.value)"></div><div class="qw-link-results" id="quoteLinkResults">' + linkModalResultsHtml(id, 'deal', '') + '</div><footer><span>Linking automatically enables Portal access for this Quote.</span><button type="button" onclick="closeQuoteLinkModal()">Cancel</button></footer></section>';
    document.body.appendChild(overlay);
    quoteLinkModal = overlay;
    requestAnimationFrame(() => { const input = document.getElementById('quoteLinkSearch'); if (input) input.focus(); });
  }

  function closeQuoteLinkModal() {
    if (quoteLinkModal) quoteLinkModal.remove();
    quoteLinkModal = null;
  }

  function switchQuoteLinkTab(tab) {
    if (!quoteLinkModal) return;
    const modal = quoteLinkModal.querySelector('.qw-link-modal');
    modal.dataset.tab = tab;
    modal.querySelectorAll('[data-link-tab]').forEach(button => button.classList.toggle('active', button.dataset.linkTab === tab));
    const input = modal.querySelector('#quoteLinkSearch');
    input.value = '';
    input.placeholder = tab === 'deal' ? 'Search Deal name or customer' : 'Search Quote # or customer';
    modal.querySelector('#quoteLinkResults').innerHTML = linkModalResultsHtml(modal.dataset.quoteId, tab, '');
    input.focus();
  }

  function filterQuoteLinkModal(value) {
    if (!quoteLinkModal) return;
    const modal = quoteLinkModal.querySelector('.qw-link-modal');
    modal.querySelector('#quoteLinkResults').innerHTML = linkModalResultsHtml(modal.dataset.quoteId, modal.dataset.tab, value);
  }

  function linkModalResultsHtml(id, tab, search) {
    const quote = quoteById(id);
    const term = String(search || '').trim().toLowerCase();
    if (tab === 'quote') {
      const candidates = quoteRows.filter(item => item.id !== id && !item.deleted && (!term || [item.id, item.customer, item.project].join(' ').toLowerCase().includes(term)));
      return candidates.length ? '<div class="qw-link-table"><div class="qw-link-table-head"><span>Quote</span><span>Customer / Project</span><span>Status</span><span></span></div>' + candidates.slice(0, 8).map(item => {
        const customerMismatch = quote.customer !== item.customer;
        const projectMismatch = !!(quote.project && item.project && quote.project !== item.project);
        const incompatible = customerMismatch || projectMismatch;
        return '<button type="button"' + (incompatible ? ' disabled' : '') + ' onclick="linkQuoteToAnother(\'' + esc(id) + '\',\'' + esc(item.id) + '\')"><span><strong>' + esc(item.id) + '</strong></span><span><strong>' + esc(item.customer) + '</strong><small>' + esc(item.project || 'No Project') + '</small></span><span><b class="qw-mini-status ' + slug(item.status) + '">' + esc(item.status) + '</b>' + (customerMismatch ? '<em>Different customer</em>' : projectMismatch ? '<em>Different project</em>' : '') + '</span><span>' + (incompatible ? '<i class="fai">&#xf023;</i>' : 'Select') + '</span></button>';
      }).join('') + '</div>' : '<div class="qw-link-empty">No matching Quotes.</div>';
    }
    const deals = [];
    quoteRows.forEach(row => { if (row.crmDeal && !row.deleted && !deals.some(item => item.crmDeal === row.crmDeal)) deals.push(row); });
    const matches = deals.filter(item => !term || [item.crmDeal, item.customer].join(' ').toLowerCase().includes(term));
    return matches.length ? '<div class="qw-link-table deals"><div class="qw-link-table-head"><span>Deal</span><span>Stage</span><span>Options</span><span>Deal value</span><span></span></div>' + matches.slice(0, 8).map(source => {
      const incompatible = quote.customer !== source.customer || !!(quote.project && source.project && quote.project !== source.project);
      return '<button type="button"' + (incompatible ? ' disabled' : '') + ' onclick="linkQuoteToDeal(\'' + esc(id) + '\',\'' + esc(source.id) + '\')"><span><strong>' + esc(source.crmDeal) + '</strong><small>' + esc(source.customer) + (incompatible ? ' · Project mismatch' : '') + '</small></span><span>' + esc(source.status) + '</span><span>' + linkedQuotes(source).length + '</span><span>' + esc(source.total) + '</span><span>' + (incompatible ? '<i class="fai">&#xf023;</i>' : 'Link here') + '</span></button>';
    }).join('') + '</div>' : '<div class="qw-link-empty">No matching Deals.</div>';
  }

  function linkQuoteToAnother(id, otherId) {
    const quote = quoteById(id);
    const other = quoteById(otherId);
    const dealName = other.crmDeal || quote.customer + ' — options';
    quote.crmDeal = dealName;
    quote.portalAccess = true;
    other.crmDeal = dealName;
    other.portalAccess = true;
    if (dealName.indexOf('— options') !== -1) {
      quote.autoCreatedDeal = true;
      other.autoCreatedDeal = true;
    }
    closeQuoteLinkModal();
    renderCurrentQuoteContext();
  }

  function linkQuoteToDeal(id, sourceId) {
    const quote = quoteById(id);
    const source = quoteById(sourceId);
    quote.crmDeal = source.crmDeal;
    quote.portalAccess = true;
    quote.modified = '22 Aug 2026';
    closeQuoteLinkModal();
    closeQuoteOptionsPopover();
    renderCurrentQuoteContext();
  }

  function unlinkQuoteFromDeal(id) {
    const quote = quoteById(id);
    quote.crmDeal = '';
    quote.modified = '22 Aug 2026';
    closeQuoteOptionsPopover();
    closeQuoteDealModal();
    if (currentScreen === 'detail' || currentScreen === 'proposal') {
      if (currentScreen === 'proposal') renderProposal(); else renderDetail();
    } else renderList();
  }

  function addQuoteOption(sourceId, skipRender) {
    const source = quoteById(sourceId);
    const nextNumber = Math.max.apply(null, quoteRows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1;
    const optionNumber = linkedQuotes(source).length + 1;
    const newQuote = {
      id: 'Q-' + nextNumber,
      customer: source.customer,
      project: source.project + ' · Option ' + optionNumber,
      owner: source.owner,
      initials: source.initials,
      created: '22 Aug 2026',
      modified: '22 Aug 2026',
      location: source.location,
      status: 'In Progress',
      total: '£0.00',
      expiry: '',
      expiresAt: '',
      crmDeal: source.crmDeal,
      proposal: 'Untitled option ' + optionNumber,
      seen: false,
      portalAccess: true,
      label: 'Option',
      owningCompanyId: source.owningCompanyId
    };
    quoteRows.push(newQuote);
    closeQuoteOptionsPopover();
    if (!skipRender) renderCurrentQuoteContext();
    return newQuote;
  }

  function openAddQuoteOptionDialog(sourceId) {
    closeQuoteOptionsPopover();
    closeQuoteDealModal();
    closeQuoteDialog();
    const source = quoteById(sourceId);
    const nextOption = linkedQuotes(source).length + 1;
    const overlay = appendModal('qw-dialog-overlay qw-add-option-overlay', '<section class="qw-dialog qw-add-option-dialog" role="dialog" aria-modal="true" aria-labelledby="qwAddOptionTitle"><header><div><span class="qw-modal-kicker">Deal option</span><h2 id="qwAddOptionTitle">Add an option to ' + esc(source.crmDeal || source.project) + '</h2><p>Choose whether to create a new Quote or link an existing compatible Quote.</p></div><button type="button" onclick="closeQuoteDialog()" aria-label="Close">×</button></header><div class="qw-add-option-context"><span><b>Deal</b><strong>' + esc(source.crmDeal || 'Not linked yet') + '</strong></span><span><b>Customer</b><strong>' + esc(source.customer) + '</strong></span><span><b>Current options</b><strong>' + linkedQuotes(source).length + '</strong></span></div><div class="qw-add-option-choice"><article class="selected"><i class="fai">&#xf15c;</i><div><strong>Create a new Quote option</strong><p>Start a new editable Quote inside this Deal.</p></div></article><label>Option name<input id="qwNewOptionName" value="Option ' + nextOption + ' · ' + esc(source.project) + '"></label><div class="qw-add-option-locked"><span><i class="fai">&#xf023;</i> Same customer</span><span><i class="fai">&#xf023;</i> ' + esc(source.project || 'No Project') + '</span><span><i class="fai">&#xf1ad;</i> ' + esc(owningCompany(source.owningCompanyId).shortName) + '</span></div></div><footer><button class="qw-btn" type="button" onclick="closeQuoteDialog()">Cancel</button><button class="qw-btn" type="button" onclick="openExistingQuoteForOption(\'' + esc(sourceId) + '\')"><i class="fai">&#xf0c1;</i> Link existing Quote</button><button class="qw-btn primary" type="button" onclick="confirmCreateQuoteOption(\'' + esc(sourceId) + '\')"><i class="fai">&#xf067;</i> Create option</button></footer></section>', closeQuoteDialog);
    quoteDialog = overlay;
  }

  function openExistingQuoteForOption(sourceId) {
    closeQuoteDialog();
    openQuoteLinker(null, sourceId);
    switchQuoteLinkTab('quote');
  }

  function confirmCreateQuoteOption(sourceId) {
    const nameInput = document.getElementById('qwNewOptionName');
    const newQuote = addQuoteOption(sourceId, true);
    if (nameInput && nameInput.value.trim()) newQuote.proposal = nameInput.value.trim();
    closeQuoteDialog();
    currentQuoteId = newQuote.id;
    currentQuoteSection = 'summary';
    currentScreen = 'detail';
    renderDetail();
  }

  function openLinkedDealFromQuote(id) {
    closeQuoteOptionsPopover();
    const quote = quoteById(id);
    if (isStandaloneQuoteWorkspace()) {
      window.location.href = './index.html?openDeal=' + encodeURIComponent(quote.crmDeal || '') + '#crm';
      return;
    }
    setQuoteEditorMode(false);
    if (quote.crmDeal && typeof window.openCrmDealByName === 'function' && window.openCrmDealByName(quote.crmDeal)) return;
    if (typeof window.showView === 'function') window.showView('crm');
  }

  function toggleQuotePortal(id) {
    const quote = quoteById(id);
    quote.portalAccess = !quote.portalAccess;
    if (currentScreen === 'proposal') renderProposal();
    else if (currentScreen === 'detail') renderDetail();
    else renderList();
  }

  function renderCurrentQuoteContext() {
    if (currentScreen === 'customer') renderCustomerProposal();
    else if (currentScreen === 'proposal') renderProposal();
    else if (currentScreen === 'detail') renderDetail();
    else renderList();
  }

  function closeQuoteDealModal() {
    if (quoteDealModal) quoteDealModal.remove();
    quoteDealModal = null;
  }

  function closeQuoteDialog() {
    if (quoteDialog) quoteDialog.remove();
    quoteDialog = null;
  }

  function appendModal(className, html, onBackground) {
    const overlay = document.createElement('div');
    overlay.className = 'qw-modal-overlay ' + (className || '');
    overlay.innerHTML = html;
    overlay.onclick = event => { if (event.target === overlay && onBackground) onBackground(); };
    document.body.appendChild(overlay);
    return overlay;
  }

  function dealStatus(quote) {
    const stage = linkedStage(quote).replace('Deal Stage = ', '').replace('Deal Status = ', '');
    return stage.split(' · ')[0];
  }

  function openQuoteDealModal(id) {
    closeQuoteDealModal();
    const quote = quoteById(id || currentQuoteId);
    if (!quote.crmDeal) { openQuoteLinker(null, quote.id); return; }
    const linked = linkedQuotes(quote);
    const accepted = linked.find(item => item.status === 'Accepted' || item.status === 'Complete');
    const overlay = appendModal('qw-deal-modal-overlay', '<section class="qw-deal-modal" role="dialog" aria-modal="true" aria-labelledby="qwDealModalTitle"><header><div><span class="qw-modal-kicker">Linked Deal</span><h2 id="qwDealModalTitle">' + esc(quote.crmDeal) + '</h2><p>' + linked.length + ' Quote options · only one can be accepted</p></div><button type="button" onclick="closeQuoteDealModal()" aria-label="Close">×</button></header><div class="qw-deal-modal-rule"><i class="fai">&#xf05a;</i><span>Accepting one option marks sent alternatives Rejected and unsent alternatives Cancelled.</span></div><div class="qw-deal-option-list">' + linked.map((item, index) => '<div class="qw-deal-option' + (item.id === quote.id ? ' current' : '') + '"><span class="qw-option-number">Option ' + (index + 1) + '</span><button class="qw-option-link" type="button" onclick="closeQuoteDealModal();openQuoteDemoDetail(\'' + esc(item.id) + '\')">' + esc(item.id) + '</button><span class="qw-option-badges">' + (item.id === quote.id ? '<b>Current</b>' : '') + ((item.status === 'Accepted' || item.status === 'Complete') ? '<b class="winner">Winner</b>' : '') + '</span><strong>' + esc(item.total) + '</strong><select aria-label="Status for ' + esc(item.id) + '" onchange="setQuoteOptionStatus(\'' + esc(item.id) + '\',this.value)">' + statusOptions(item.status === 'Expired' ? 'Sent' : item.status) + '</select><button class="qw-icon-button" type="button" title="Unlink this Quote" onclick="unlinkQuoteFromDeal(\'' + esc(item.id) + '\')"><i class="fai">&#xf127;</i></button></div>').join('') + '</div><footer><button class="qw-btn primary" type="button" onclick="createQuoteOptionAndPrompt(\'' + esc(quote.id) + '\')"><i class="fai">&#xf067;</i> Create Quote</button><button class="qw-btn" type="button" onclick="closeQuoteDealModal();openQuoteLinker(null,\'' + esc(quote.id) + '\')"><i class="fai">&#xf0c1;</i> Link Quote</button><button class="qw-btn" type="button" onclick="openQuoteComparison(\'' + esc(quote.id) + '\')"><i class="fai">&#xf24e;</i> Compare</button><button class="qw-btn" type="button" ' + (accepted ? 'disabled title="A won Deal cannot be switched"' : 'onclick="closeQuoteDealModal();openQuoteLinker(null,\'' + esc(quote.id) + '\')"') + '><i class="fai">&#xf362;</i> Switch Deal</button><button class="qw-btn danger" type="button" onclick="unlinkQuoteFromDeal(\'' + esc(quote.id) + '\')">Unlink</button></footer></section>', closeQuoteDealModal);
    quoteDealModal = overlay;
  }

  function createQuoteOptionAndPrompt(sourceId) {
    const newQuote = addQuoteOption(sourceId, true);
    closeQuoteDialog();
    const overlay = appendModal('qw-dialog-overlay', '<section class="qw-dialog small" role="dialog" aria-modal="true"><span class="qw-success-icon"><i class="fai">&#xf00c;</i></span><h2>Quote ' + esc(newQuote.id) + ' created</h2><p>The new option is already part of this Deal. Open it now?</p><footer><button class="qw-btn" type="button" onclick="closeQuoteDialog();openQuoteDealModal(\'' + esc(sourceId) + '\')">Not now</button><button class="qw-btn primary" type="button" onclick="closeQuoteDialog();closeQuoteDealModal();openQuoteDemoDetail(\'' + esc(newQuote.id) + '\')">Open Quote</button></footer></section>', null);
    quoteDialog = overlay;
    openQuoteDealModal(sourceId);
  }

  function rejectionDialog(id) {
    closeQuoteDialog();
    const quote = quoteById(id);
    const overlay = appendModal('qw-dialog-overlay', '<section class="qw-dialog" role="dialog" aria-modal="true" aria-labelledby="qwRejectTitle"><header><div><span class="qw-modal-kicker">Reason required</span><h2 id="qwRejectTitle">Why was ' + esc(quote.id) + ' rejected?</h2></div><button type="button" onclick="cancelQuoteDialog()" aria-label="Close">×</button></header><div class="qw-reject-reasons">' + ['Price too high', 'Went with another option', 'Project cancelled', 'No response from customer', 'Other'].map(reason => '<label><input type="radio" name="qwRejectReason" value="' + esc(reason) + '" onchange="enableRejectConfirm()"><span>' + esc(reason) + '</span></label>').join('') + '</div><label class="qw-dialog-note">Optional note<textarea id="qwRejectNote" placeholder="Add context for the Deal history"></textarea></label><footer><button class="qw-btn" type="button" onclick="cancelQuoteDialog()">Cancel</button><button class="qw-btn primary" id="qwRejectConfirm" type="button" disabled onclick="confirmQuoteRejected(\'' + esc(id) + '\')">Confirm Rejected</button></footer></section>', null);
    quoteDialog = overlay;
  }

  function enableRejectConfirm() {
    const button = document.getElementById('qwRejectConfirm');
    if (button) button.disabled = !document.querySelector('input[name="qwRejectReason"]:checked');
  }

  function cancelQuoteDialog() {
    closeQuoteDialog();
    if (currentScreen === 'proposal') renderProposal(); else if (currentScreen === 'detail') renderDetail();
    if (quoteDealModal) openQuoteDealModal(currentQuoteId);
  }

  function confirmQuoteRejected(id) {
    const checked = document.querySelector('input[name="qwRejectReason"]:checked');
    if (!checked) return;
    const quote = quoteById(id);
    quote.rejectionReason = checked.value;
    quote.rejectionNote = (document.getElementById('qwRejectNote') || {}).value || '';
    closeQuoteDialog();
    applyQuoteStatus(id, 'Rejected');
  }

  function applyQuoteStatus(id, status) {
    if (!QUOTE_STATUSES.includes(status)) return;
    const quote = quoteById(id);
    quote.status = status;
    quote.modified = '22 Aug 2026';
    quote.expiry = status === 'Sent' ? 'Expires 05 Sep 2026' : status === 'Accepted' ? 'Accepted 22 Aug 2026' : status === 'Complete' ? 'Completed 22 Aug 2026' : status === 'Rejected' ? 'Rejected 22 Aug 2026' : '';
    quote.expiresAt = status === 'Sent' ? '2026-09-05' : '';
    if (status === 'Accepted' && quote.crmDeal) {
      linkedQuotes(quote).forEach(sibling => {
        if (sibling.id === quote.id) return;
        sibling.status = sibling.status === 'Sent' ? 'Rejected' : 'Cancelled';
        sibling.expiry = sibling.status + ' 22 Aug 2026';
        sibling.modified = '22 Aug 2026';
      });
    }
    if (window.WeQuoteCRMQuoteLifecycle) window.WeQuoteCRMQuoteLifecycle.syncQuoteRows(quoteRows);
    if (currentScreen === 'customer') renderCustomerProposal();
    else if (currentScreen === 'proposal') renderProposal();
    else if (currentScreen === 'detail') renderDetail();
    else renderList();
    if (quoteDealModal) openQuoteDealModal(id);
  }

  function setQuoteOptionStatus(id, status) {
    if (status === 'Rejected') { rejectionDialog(id); return; }
    applyQuoteStatus(id, status);
  }

  function comparisonTableHtml(quote) {
    const options = linkedQuotes(quote).slice(0, 4);
    const rows = [
      ['Total investment', option => option.total],
      ['Price difference', (option, index) => index ? '+£' + (180409 + index * 12500).toLocaleString('en-GB') : '—'],
      ['Areas covered', (option, index) => (3 + index * 2) + ' areas'],
      ['Audio systems', (option, index) => String(4 + index * 3)],
      ['Displays', (option, index) => String(3 + index * 2)],
      ['Control system', (option, index) => index ? 'Premium' : 'Standard'],
      ['Installation', (option, index) => index ? 'Full setup and calibration' : 'Standard setup'],
      ['Labour', (option, index) => (40 + index * 16) + ' hours'],
      ['Warranty', (option, index) => (1 + index * 2) + (index ? ' years' : ' year')],
      ['Timeline', (option, index) => index ? '6–8 weeks' : '4–6 weeks']
    ];
    return '<div class="qw-compare-scroll"><table class="qw-compare-table"><thead><tr><th>Customer-visible detail</th>' + options.map((option, index) => '<th><span>Option ' + (index + 1) + '</span><strong>' + esc(option.proposal) + '</strong>' + (index === 1 ? '<b>Recommended</b>' : '') + '<button type="button" onclick="closeQuoteDialog();acceptQuoteOption(\'' + esc(option.id) + '\')">Accept this option</button></th>').join('') + '</tr></thead><tbody>' + rows.map(row => '<tr><th>' + row[0] + '</th>' + options.map((option, index) => '<td>' + esc(row[1](option, index)) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  }

  function openQuoteComparison(id) {
    closeQuoteDialog();
    const quote = quoteById(id || currentQuoteId);
    const overlay = appendModal('qw-dialog-overlay qw-compare-overlay', '<section class="qw-dialog wide" role="dialog" aria-modal="true"><header><div><span class="qw-modal-kicker">Customer-visible comparison</span><h2>Compare options · ' + esc(quote.crmDeal || quote.project) + '</h2><p>Internal margin, product cost, commission and supplier pricing are deliberately hidden.</p></div><button type="button" onclick="closeQuoteDialog()" aria-label="Close">×</button></header>' + comparisonTableHtml(quote) + '<footer><button class="qw-btn" type="button" onclick="closeQuoteDialog()">Close</button><button class="qw-btn primary" type="button" onclick="closeQuoteDialog();openCustomerProposal(\'' + esc(quote.id) + '\')">Open customer view</button></footer></section>', closeQuoteDialog);
    quoteDialog = overlay;
  }

  function sendProposalDialog() {
    closeQuoteDialog();
    const quote = quoteById(currentQuoteId);
    const overlay = appendModal('qw-dialog-overlay', '<section class="qw-dialog" role="dialog" aria-modal="true"><header><div><span class="qw-modal-kicker">Share proposal</span><h2>Send ' + esc(quote.id) + '</h2></div><button type="button" onclick="closeQuoteDialog()" aria-label="Close">×</button></header><div class="qw-share-link"><i class="fai">&#xf0c1;</i><span><strong>Web Proposal</strong><small>portal.wequote.io/proposal/' + esc(quote.id.replace('Q-', '')) + '</small></span><button type="button">Copy</button></div><div class="qw-share-link"><i class="fai">&#xf1c1;</i><span><strong>PDF Proposal</strong><small>' + esc(quote.id) + '-proposal.pdf</small></span><button type="button">Copy</button></div><footer><button class="qw-btn" type="button" onclick="closeQuoteDialog();openCustomerProposal(\'' + esc(quote.id) + '\')">Open Proposal</button><button class="qw-btn" type="button">Download PDF</button><button class="qw-btn primary" type="button" onclick="closeQuoteDialog()">Close</button></footer></section>', closeQuoteDialog);
    quoteDialog = overlay;
  }

  function setGroupByDeal(value) { groupByDeal = !!value; renderList(); }
  function setShowDeleted(value) { showDeleted = !!value; renderList(); }

  function openDetail(id) {
    if (!isStandaloneQuoteWorkspace()) {
      const quote = quoteById(id);
      saveStandaloneQuoteContext(quote);
      window.location.href = standaloneQuoteUrl(quote.id, 'summary');
      return;
    }
    // A Quote is a dedicated workspace, not a CRM-detail sub-page. Force the
    // Quotes view and focus shell for every entry point before rendering.
    if (typeof window.showView === 'function') window.showView('quotes');
    setQuoteEditorMode(true);
    currentQuoteId = id;
    currentScreen = 'detail';
    currentQuoteSection = 'summary';
    renderDetail();
    saveStandaloneQuoteContext(quoteById(id));
    syncStandaloneUrl();
  }

  function quoteEditorNavHtml(active) {
    const items = [
      ['summary', '&#xf06e;', 'Quote Summary'],
      ['editor', '&#xf1ec;', 'Quote Editor'],
      ['adjustments', '&#xf201;', 'Price Adjustments'],
      ['tax', '&#xf295;', 'Tax Rates'],
      ['proposal', '&#xf06e;', 'View Proposal'],
      ['changes', '&#xf1ea;', 'View Changes'],
      ['billing', '&#xf09d;', 'Costs and Billing'],
      ['importer', '&#xf093;', 'Importer'],
      ['documents', '&#xf15c;', 'Notes and Documents']
    ];
    return '<nav class="qw-editor-nav" aria-label="Quote Editor sections">' + items.map(item => '<button type="button" class="' + (active === item[0] ? 'active' : '') + '" onclick="openQuoteEditorSection(\'' + item[0] + '\')"><i class="fai">' + item[1] + '</i><span>' + item[2] + '</span></button>').join('') + '</nav>';
  }

  function quoteEditorFrameHtml(quote, active, content) {
    return '<div class="qw-editor-shell"><header class="qw-editor-header"><div class="qw-editor-brand"><span class="qw-editor-mark"><i class="fai">&#xf1ea;</i></span><strong>' + esc(owningCompany(quote.owningCompanyId).name) + '</strong></div><div class="qw-editor-header-title"><small>Quote workspace</small><strong>' + esc(quote.id) + ' · ' + esc(quote.proposal) + '</strong></div><div class="qw-editor-header-total"><small>Net total</small><strong>' + esc(quote.total) + '</strong></div></header>' + quoteEditorNavHtml(active) + '<main class="qw-editor-main">' + content + '</main></div>';
  }

  function openQuoteEditorSection(section) {
    currentQuoteSection = section;
    if (section === 'summary') { currentScreen = 'detail'; renderDetail(); syncStandaloneUrl(); return; }
    if (section === 'proposal') { currentScreen = 'proposal'; renderProposal(); syncStandaloneUrl(); return; }
    currentScreen = 'detail';
    renderQuoteEditorSection(section);
    syncStandaloneUrl();
  }

  function quoteSectionContentHtml(section, quote) {
    const content = {
      editor: '<section class="qw-workspace-card"><header><div><span>QUOTE EDITOR</span><h2>Products, labour and subscriptions</h2><p>Build this Quote option without changing the other options linked to the Deal.</p></div><div><button class="qw-btn dark"><i class="fai">&#xf067;</i> Custom line / labour</button><button class="qw-btn primary"><i class="fai">&#xf067;</i> Product</button></div></header><div class="qw-editor-tabs"><button class="active">Products</button><button>Labour</button><button>Subscriptions</button><button>Summary</button></div><div class="qw-editor-lines">' + productHtml('Lutron lighting control package', 'Equipment and commissioning', '£8,940.00', '£13,850.00', '1') + productHtml('AV distribution and rack build', 'Design, supply and installation', '£4,280.00', '£7,650.00', '1') + productHtml('Programming and handover', 'Engineering labour', '£1,820.00', '£3,000.00', '42h') + '</div></section>',
      adjustments: '<section class="qw-workspace-card"><header><div><span>PRICE ADJUSTMENTS</span><h2>Discounts and adjustments</h2><p>Adjust this Quote only. Deal value continues to follow the configured option rule.</p></div><button class="qw-btn primary"><i class="fai">&#xf067;</i> Add adjustment</button></header><div class="qw-settings-grid"><article><label>Product discount</label><strong>0%</strong><small>£0.00 applied</small></article><article><label>Labour adjustment</label><strong>0%</strong><small>No adjustment</small></article><article><label>Quote total</label><strong>' + esc(quote.total) + '</strong><small>Before tax</small></article></div></section>',
      tax: '<section class="qw-workspace-card"><header><div><span>TAX RATES</span><h2>Tax configuration</h2><p>Taxes are calculated per Quote option and remain visible in its proposal.</p></div><button class="qw-btn primary">Save tax rates</button></header><div class="qw-tax-list"><div><span>Standard rate</span><strong>20%</strong><em>Products and labour</em></div><div><span>Zero-rated items</span><strong>0%</strong><em>No items assigned</em></div></div></section>',
      changes: '<section class="qw-workspace-card"><header><div><span>VERSION HISTORY</span><h2>Changes to ' + esc(quote.id) + '</h2><p>Quote changes are separate from Deal Activity and Automation history.</p></div><button class="qw-btn">Compare versions</button></header><div class="qw-change-list"><article><b>Today · ' + esc(quote.modified) + '</b><strong>Quote details updated</strong><p>' + esc(quote.owner) + ' updated the proposal and product pricing.</p></article><article><b>' + esc(quote.created) + '</b><strong>Quote created</strong><p>Created as an option for ' + esc(quote.crmDeal || quote.project) + '.</p></article></div></section>',
      billing: '<section class="qw-workspace-card"><header><div><span>COSTS AND BILLING</span><h2>Internal commercial summary</h2><p>Internal costs stay hidden from the customer-facing proposal.</p></div><button class="qw-btn">Edit costs</button></header><div class="qw-settings-grid"><article><label>Product cost</label><strong>£13,220.00</strong><small>Internal only</small></article><article><label>Labour cost</label><strong>£1,820.00</strong><small>42 hours</small></article><article><label>Total margin</label><strong>34%</strong><small>Within target</small></article></div></section>',
      importer: '<section class="qw-workspace-card"><header><div><span>IMPORTER</span><h2>Import Quote lines</h2><p>Import product and labour lines into this Quote option.</p></div></header><div class="qw-import-zone"><i class="fai">&#xf56f;</i><strong>Drop a CSV or Excel file here</strong><p>Or choose a file from your computer.</p><button class="qw-btn primary">Choose file</button></div></section>',
      documents: '<section class="qw-workspace-card"><header><div><span>NOTES AND DOCUMENTS</span><h2>Files and internal notes</h2><p>Documents attached here belong to this Quote. Deal-level file requirements remain visible in CRM.</p></div><button class="qw-btn primary"><i class="fai">&#xf093;</i> Upload file</button></header><div class="qw-document-list"><article><i class="fai">&#xf1c1;</i><span><strong>Site plan.pdf</strong><small>Uploaded by ' + esc(quote.owner) + ' · 2.4 MB</small></span><button class="qw-btn">Open</button></article><article><i class="fai">&#xf15c;</i><span><strong>Scope notes.docx</strong><small>Internal · updated today</small></span><button class="qw-btn">Open</button></article></div></section>'
    };
    return content[section] || content.editor;
  }

  function renderQuoteEditorSection(section) {
    const mount = root();
    if (!mount) return;
    const quote = quoteById(currentQuoteId);
    setQuoteEditorMode(true);
    setCrumb('Quote ' + esc(quote.id));
    mount.innerHTML = quoteEditorFrameHtml(quote, section, recordTopHtml(quote, section) + quoteSectionContentHtml(section, quote));
  }

  function renderDetail() {
    const mount = root();
    if (!mount) return;
    const quote = quoteById(currentQuoteId);
    setQuoteEditorMode(true);
    currentQuoteSection = 'summary';
    setCrumb('<span class="crumb-link" onclick="openQuoteWorkspace()">Quotes</span><span class="crumb-sep">/</span>' + esc(quote.id));
    const content = '<div class="qw-page qw-editor-page">' + recordTopHtml(quote, 'detail') + lifecycleHtml(quote) +
      '<div class="qw-detail-layout"><section class="qw-detail-main">' +
        '<div class="qw-section-head"><div><h2>Quote Summary</h2><span class="qw-sub">Created ' + esc(quote.created) + ' · Last modified ' + esc(quote.modified) + '</span></div><button class="qw-btn" onclick="openQuoteProposal()"><i class="fai">&#xf06e;</i> View Proposal</button></div>' +
        '<div class="qw-metrics"><div class="qw-metric"><span>Product margin</span><strong>35%</strong><em>£8,575.00</em></div><div class="qw-metric"><span>Labour margin</span><strong>32%</strong><em>42 hours</em></div><div class="qw-metric"><span>Total margin</span><strong>34%</strong><em>Within target</em></div><div class="qw-metric"><span>Grand total</span><strong>' + esc(quote.total) + '</strong><em>Excl. tax</em></div></div>' +
        '<div class="qw-product-head"><span>Product / service</span><span>Cost price</span><span>Sell price</span><span>Qty</span></div>' +
        productHtml('Lutron lighting control package', 'Equipment and commissioning', '£8,940.00', '£13,850.00', '1') +
        productHtml('AV distribution and rack build', 'Design, supply and installation', '£4,280.00', '£7,650.00', '1') +
        productHtml('Programming and handover', 'Engineering labour', '£1,820.00', '£3,000.00', '42h') +
      '</section><aside class="qw-detail-side">' +
        '<div class="qw-section-head"><h2>Quote Details</h2><span class="qw-sub">' + esc(quote.id) + '</span></div><div class="qw-card-fields qw-card-fields-dense">' +
          fieldHtml('Quote #', quote.id) + fieldHtml('Revision name', quote.proposal) + fieldHtml('Company', owningCompany(quote.owningCompanyId).name) + fieldHtml('Assignee', quote.owner) + fieldHtml('Label', quote.label || '—') + fieldHtml('Customer', quote.customer) + fieldHtml('Project', quote.project || 'Not in Project') +
        '</div><div class="qw-quote-flags"><label><input type="checkbox"> Visible to all users</label><label><input type="checkbox"> Reference Quote</label><label><input type="checkbox" ' + (quote.portalAccess ? 'checked' : '') + ' onchange="toggleQuotePortal(\'' + esc(quote.id) + '\')"> Visible in Customer Portal</label></div>' + linkedDealSideCardHtml(quote) + '<div class="qw-detail-actions"><button class="qw-btn" onclick="openQuoteEditorSection(\'editor\')">Edit Quote</button><button class="qw-btn primary" onclick="openQuoteProposal()">Proposal →</button></div>' +
      '</aside></div></div>';
    mount.innerHTML = quoteEditorFrameHtml(quote, 'summary', content);
  }

  function linkedDealSideCardHtml(quote) {
    if (!quote.crmDeal) return '<section class="qw-linked-side-card empty"><div><span>Linked Deal</span><strong>Not linked</strong><small>Link this Quote to manage it as an option.</small></div><button class="qw-btn" type="button" onclick="openQuoteLinker(null,\'' + esc(quote.id) + '\')">Link Quote</button></section>';
    const linked = linkedQuotes(quote);
    return '<section class="qw-linked-side-card"><header><div><span>Linked Deal</span><button type="button" onclick="openLinkedDealFromQuote(\'' + esc(quote.id) + '\')">' + esc(quote.crmDeal) + ' <i class="fai">&#xf35d;</i></button></div><button class="qw-btn" type="button" onclick="openQuoteDealModal(\'' + esc(quote.id) + '\')">Manage</button></header><div class="qw-linked-side-summary"><span>' + linked.length + ' options on this Deal</span><strong>1 can be accepted</strong></div>' + linked.map((item, index) => '<button class="qw-linked-side-option' + (item.id === quote.id ? ' current' : '') + '" type="button" onclick="openQuoteDemoDetail(\'' + esc(item.id) + '\')"><span>Option ' + (index + 1) + '</span><strong>' + esc(item.id) + '</strong>' + (item.id === quote.id ? '<b>Current</b>' : '') + '<em>' + esc(item.total) + '</em><i class="qw-mini-status ' + slug(item.status) + '">' + esc(item.status) + '</i></button>').join('') + '<footer><button type="button" onclick="openAddQuoteOptionDialog(\'' + esc(quote.id) + '\')"><i class="fai">&#xf067;</i> Add option</button><button type="button" onclick="openQuoteComparison(\'' + esc(quote.id) + '\')">Compare</button><button type="button" onclick="openQuoteLinker(null,\'' + esc(quote.id) + '\')">Link Quote</button></footer></section>';
  }

  function recordTopHtml(quote, screen) {
    const linked = linkedQuotes(quote);
    const optionIndex = linked.findIndex(item => item.id === quote.id) + 1;
    const dealControl = quote.crmDeal
      ? '<div class="qw-deal-context"><span>Linked Deal</span><div><button class="qw-linked-deal-chip" type="button" onclick="openQuoteDealModal(\'' + esc(quote.id) + '\')"><b>Deal</b><strong>' + esc(quote.crmDeal) + '</strong><span>' + esc(dealStatus(quote)) + '</span><em>Option ' + optionIndex + ' of ' + linked.length + '</em><i class="fai">&#xf078;</i></button><button class="qw-view-deal-button" type="button" onclick="openLinkedDealFromQuote(\'' + esc(quote.id) + '\')">View Deal <i class="fai">&#xf35d;</i></button></div></div>'
      : '<div class="qw-deal-context"><span>Linked Deal</span><button class="qw-link-options-button" type="button" onclick="openQuoteLinker(null,\'' + esc(quote.id) + '\')"><i class="fai">&#xf0c1;</i> Link options</button></div>';
    return '<div class="qw-record-top"><div class="qw-record-title"><button class="qw-back" onclick="' + (screen === 'proposal' ? 'openQuoteDemoDetail(\'' + esc(quote.id) + '\')' : 'openQuoteWorkspace()') + '" aria-label="Back to Quotes"><i class="fai">&#xf060;</i></button><div><span class="qw-record-eyebrow">Quote ' + esc(quote.id) + '</span><h1>' + esc(quote.proposal) + '</h1><p>' + esc(quote.customer) + ' · ' + esc(quote.project) + '</p></div></div>' + dealControl +
      '<div class="qw-status-control"><label for="quoteDemoStatus">Quote Status</label><select id="quoteDemoStatus" class="qw-status-select" onchange="setQuoteDemoStatus(this.value)">' + statusOptions(quote.status === 'Expired' ? 'Sent' : quote.status) + '</select></div></div>';
  }

  function lifecycleHtml(quote) {
    return '<div class="qw-lifecycle"><i class="fai">&#xf0e7;</i><span><strong>Protected lifecycle:</strong> any accepted Quote makes the Deal Won; no viable Quote can make it Lost; all related Quotes Cancelled makes the Deal Archived without creating a new Stage.</span><span class="stage-result">' + esc(linkedStage(quote)) + '</span></div>';
  }

  function productHtml(name, sub, cost, sell, qty) {
    return '<div class="qw-product-row"><div><strong>' + name + '</strong><small>' + sub + '</small></div><span>' + cost + '</span><span>' + sell + '</span><span>' + qty + '</span></div>';
  }
  function fieldHtml(label, value) { return '<div class="qw-field"><label>' + esc(label) + '</label><div class="qw-field-value">' + esc(value) + '</div></div>'; }

  function openProposal() {
    currentScreen = 'proposal';
    renderProposal();
  }

  function renderProposal() {
    const mount = root();
    if (!mount) return;
    const quote = quoteById(currentQuoteId);
    setQuoteEditorMode(true);
    currentQuoteSection = 'proposal';
    setCrumb('<span class="crumb-link" onclick="openQuoteWorkspace()">Quotes</span><span class="crumb-sep">/</span><span class="crumb-link" onclick="openQuoteDemoDetail(\'' + esc(quote.id) + '\')">' + esc(quote.id) + '</span><span class="crumb-sep">/</span>Proposal');
    const content = '<div class="qw-page qw-editor-page">' + recordTopHtml(quote, 'proposal') + lifecycleHtml(quote) +
      '<main class="qw-proposal-main qw-proposal-workspace"><div class="qw-proposal-command"><div class="qw-proposal-command-left"><button class="qw-btn primary large"><i class="fai">&#xf067;</i> Create Proposal</button><strong>' + esc(quote.proposal) + '</strong><span class="qw-company-badge"><i class="fai">&#xf1ad;</i>Issued by ' + esc(owningCompany(quote.owningCompanyId).shortName) + '</span></div><div class="qw-proposal-command-right"><button class="qw-btn primary large" onclick="sendProposalDialog()"><i class="fai">&#xf1d8;</i> Send Proposal</button><button class="qw-btn" onclick="openCustomerProposal(\'' + esc(quote.id) + '\')">Web Preview</button></div></div>' +
      '<div class="qw-portal-row"><span class="qw-portal-state ' + (quote.portalAccess ? 'on' : '') + '"></span><div><strong>' + (quote.portalAccess ? 'Showing “' + esc(quote.proposal) + '”' : 'Hidden from Customer Portal') + '</strong><small>' + (quote.portalAccess ? 'This is the live proposal for this Quote.' : 'Enable access before sharing the web proposal.') + '</small></div><button class="qw-btn" type="button" onclick="toggleQuotePortal(\'' + esc(quote.id) + '\')">' + (quote.portalAccess ? 'Disable Portal' : 'Enable Portal') + '</button><button class="qw-btn" type="button" onclick="openQuoteComparison(\'' + esc(quote.id) + '\')">Compare options</button></div>' +
      '<article class="qw-proposal-doc"><div class="qw-proposal-cover"><span class="mark"><i class="fai">&#xf1ea;</i></span><h2>' + esc(quote.project) + '</h2><p>Prepared for ' + esc(quote.customer) + ' · ' + esc(quote.id) + '</p></div><div class="qw-proposal-body"><h3>Proposal summary</h3>' +
        '<div class="qw-proposal-line"><span>Lutron lighting control package</span><strong>£13,850.00</strong></div><div class="qw-proposal-line"><span>AV distribution and rack build</span><strong>£7,650.00</strong></div><div class="qw-proposal-line"><span>Programming and handover</span><strong>£3,000.00</strong></div><div class="qw-proposal-total"><span>Net total</span><span>' + esc(quote.total) + '</span></div>' +
        '<div class="qw-derived-note"><strong>Expired is not selectable.</strong> It is derived automatically when a Sent Quote passes its expiry date. Cancelled remains a stored Quote status but is contextual in the CRM Pipeline.</div>' +
      '</div></article></main></div>';
    mount.innerHTML = quoteEditorFrameHtml(quote, 'proposal', content);
  }

  function openCustomerProposal(id) {
    currentQuoteId = id || currentQuoteId;
    currentScreen = 'customer';
    closeQuoteDialog();
    renderCustomerProposal();
  }

  function renderCustomerProposal() {
    const mount = root();
    if (!mount) return;
    const quote = quoteById(currentQuoteId);
    const options = linkedQuotes(quote).length ? linkedQuotes(quote) : [quote];
    const accepted = quote.status === 'Accepted' || quote.status === 'Complete';
    setQuoteEditorMode(true);
    setCrumb('<span class="crumb-link" onclick="openQuoteWorkspace()">Quotes</span><span class="crumb-sep">/</span><span class="crumb-link" onclick="openQuoteDemoDetail(\'' + esc(quote.id) + '\')">' + esc(quote.id) + '</span><span class="crumb-sep">/</span>Customer Preview');
    mount.innerHTML = '<div class="qw-customer-preview"><header class="qw-customer-header"><div><span class="qw-customer-logo"><i class="fai">&#xf1ea;</i></span><strong>' + esc(owningCompany(quote.owningCompanyId).shortName) + '</strong><small>Proposal for ' + esc(quote.customer) + '</small></div><button type="button" class="qw-accept-main ' + (accepted ? 'accepted' : '') + '" ' + (accepted ? 'disabled' : 'onclick="acceptQuoteOption(\'' + esc(quote.id) + '\')"') + '><i class="fai">&#xf00c;</i> ' + (accepted ? 'Proposal accepted' : 'Accept this proposal') + '</button></header><div class="qw-customer-grid"><aside class="qw-customer-options"><span class="qw-customer-eyebrow">Your options</span><h2>' + esc(quote.crmDeal || quote.project) + '</h2><p>Choose the proposal that best fits your project.</p>' + options.map((item, index) => '<article class="' + (item.id === quote.id ? 'active' : '') + '"><span>Option ' + (index + 1) + '</span><strong>' + esc(item.proposal) + '</strong><b>' + esc(item.total) + '</b><div><button type="button" onclick="openCustomerProposal(\'' + esc(item.id) + '\')">View</button><button type="button" ' + ((item.status === 'Accepted' || item.status === 'Complete') ? 'disabled' : 'onclick="acceptQuoteOption(\'' + esc(item.id) + '\')"') + '>Accept</button></div></article>').join('') + '<button class="qw-quiet-link" type="button" onclick="openQuoteComparison(\'' + esc(quote.id) + '\')">Compare details</button></aside><main class="qw-customer-document"><div class="qw-customer-hero"><span>Option ' + (options.findIndex(item => item.id === quote.id) + 1) + '</span><h1>' + esc(quote.proposal) + '</h1><p>A tailored proposal for ' + esc(quote.project) + '</p><strong>' + esc(quote.total) + '</strong></div><section><h2>What is included</h2><div class="qw-customer-inclusions"><article><i class="fai">&#xf001;</i><strong>Whole-home audio</strong><p>High-quality audio across the selected rooms.</p></article><article><i class="fai">&#xf26c;</i><strong>Displays &amp; control</strong><p>Simple everyday control from one interface.</p></article><article><i class="fai">&#xf0ad;</i><strong>Installation</strong><p>Professional installation, setup and handover.</p></article></div><div class="qw-customer-total"><span>Total investment</span><strong>' + esc(quote.total) + '</strong></div><p class="qw-visibility-note"><i class="fai">&#xf06e;</i> Customer view contains scope, benefits, total price, warranty and timeline only. Margin and internal costs are never shown.</p></section></main></div></div>';
  }

  function acceptQuoteOption(id) {
    currentQuoteId = id;
    applyQuoteStatus(id, 'Accepted');
  }

  function openQuoteFromCrmContext(context) {
    const data = context || {};
    const rawNumber = String(data.quote || '').replace(/^Q-/i, '') || String(Date.now()).slice(-5);
    const id = 'Q-' + rawNumber;
    let quote = quoteRows.find(row => row.id === id);
    const statusMap = {
      Draft: 'In Progress',
      Quoting: 'In Progress',
      'In Progress': 'In Progress',
      'In Review': 'In Review',
      'Passed Review': 'Passed Review',
      Sent: 'Sent',
      Accepted: 'Accepted',
      Complete: 'Complete',
      Cancelled: 'Cancelled'
    };
    const status = statusMap[data.status] || 'In Progress';
    if (!quote) {
      const numericValue = Number(data.value || 0);
      quote = {
        id,
        customer: data.contact || 'CRM customer',
        project: data.deal || data.name || 'CRM Deal',
        owner: 'Deal owner',
        initials: 'DO',
        created: 'Today',
        modified: 'Just now',
        location: '—',
        status,
        total: numericValue.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }),
        expiry: '',
        expiresAt: '',
        crmDeal: data.deal || '',
        proposal: data.name || ('Quote ' + rawNumber),
        seen: false,
        portalAccess: false,
        label: '',
        owningCompanyId: OWNING_COMPANIES[0].id
      };
      quoteRows.unshift(quote);
    } else {
      quote.customer = data.contact || quote.customer;
      quote.project = data.deal || quote.project;
      quote.crmDeal = data.deal || quote.crmDeal;
      quote.proposal = data.name || quote.proposal;
      quote.status = status;
    }
    saveStandaloneQuoteContext(quote);
    if (!isStandaloneQuoteWorkspace()) {
      window.location.href = standaloneQuoteUrl(quote.id, data.mode === 'proposal' ? 'proposal' : (data.mode === 'editor' ? 'editor' : 'summary'));
      return;
    }
    if (typeof window.showView === 'function') window.showView('quotes');
    currentQuoteId = quote.id;
    if (data.mode === 'proposal') {
      currentScreen = 'proposal';
      renderProposal();
      return;
    }
    currentScreen = 'detail';
    currentQuoteSection = data.mode === 'editor' ? 'editor' : 'summary';
    if (currentQuoteSection === 'editor') renderQuoteEditorSection('editor');
    else renderDetail();
  }

  function setFilter(status) { activeFilter = status; renderList(); }
  function setCompanyFilter(companyId) { activeCompany = companyId === 'all' || OWNING_COMPANIES.some(company => company.id === companyId) ? companyId : 'all'; renderList(); }
  function filter(value) { searchTerm = value; renderList(); const input = document.querySelector('.qw-search input'); if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); } }
  function setStatus(status) {
    if (!QUOTE_STATUSES.includes(status)) return;
    if (status === 'Rejected') { rejectionDialog(currentQuoteId); return; }
    applyQuoteStatus(currentQuoteId, status);
  }

  window.openQuoteWorkspace = openWorkspace;
  window.openQuoteDemoDetail = openDetail;
  window.openQuoteProposal = openProposal;
  window.setQuoteDemoFilter = setFilter;
  window.setQuoteCompanyFilter = setCompanyFilter;
  window.setQuoteGroupByDeal = setGroupByDeal;
  window.setQuoteShowDeleted = setShowDeleted;
  window.filterQuoteDemo = filter;
  window.setQuoteDemoStatus = setStatus;
  window.openQuoteOptions = openQuoteOptions;
  window.openQuoteLinker = openQuoteLinker;
  window.closeQuoteOptions = closeQuoteOptionsPopover;
  window.closeQuoteLinkModal = closeQuoteLinkModal;
  window.switchQuoteLinkTab = switchQuoteLinkTab;
  window.filterQuoteLinkModal = filterQuoteLinkModal;
  window.linkQuoteToAnother = linkQuoteToAnother;
  window.linkQuoteToDeal = linkQuoteToDeal;
  window.unlinkQuoteFromDeal = unlinkQuoteFromDeal;
  window.addQuoteOption = addQuoteOption;
  window.openAddQuoteOptionDialog = openAddQuoteOptionDialog;
  window.openExistingQuoteForOption = openExistingQuoteForOption;
  window.confirmCreateQuoteOption = confirmCreateQuoteOption;
  window.openLinkedDealFromQuote = openLinkedDealFromQuote;
  window.toggleQuotePortal = toggleQuotePortal;
  window.openQuoteDealModal = openQuoteDealModal;
  window.closeQuoteDealModal = closeQuoteDealModal;
  window.closeQuoteDialog = closeQuoteDialog;
  window.cancelQuoteDialog = cancelQuoteDialog;
  window.enableRejectConfirm = enableRejectConfirm;
  window.confirmQuoteRejected = confirmQuoteRejected;
  window.setQuoteOptionStatus = setQuoteOptionStatus;
  window.createQuoteOptionAndPrompt = createQuoteOptionAndPrompt;
  window.openQuoteComparison = openQuoteComparison;
  window.sendProposalDialog = sendProposalDialog;
  window.openQuoteEditorSection = openQuoteEditorSection;
  window.openCustomerProposal = openCustomerProposal;
  window.acceptQuoteOption = acceptQuoteOption;
  window.openQuoteFromCrmContext = openQuoteFromCrmContext;

  const quoteWorkspaceNav = document.querySelector('[data-quote-workspace-nav]');
  if (quoteWorkspaceNav) quoteWorkspaceNav.classList.add('quote-workspace-ready');
  // The compatibility layer can rebuild sidebar nodes after startup, so delegate
  // this navigation event from document instead of binding to a disposable node.
  document.addEventListener('click', event => {
    if (event.target.closest('[data-quote-workspace-nav]')) openWorkspace();
    if (quoteOptionsPopover && !event.target.closest('.qw-options-popover') && !event.target.closest('.qw-options-button') && !event.target.closest('.qw-link-button')) closeQuoteOptionsPopover();
  });
  window.addEventListener('resize', closeQuoteOptionsPopover);
  window.addEventListener('scroll', closeQuoteOptionsPopover, true);
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#quotes') openWorkspace();
  });
  if (isStandaloneQuoteWorkspace()) {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('quote') || currentQuoteId;
    try {
      const saved = JSON.parse(window.sessionStorage.getItem('wequote-quote-context:' + requestedId) || 'null');
      if (saved && saved.id) {
        const existing = quoteRows.find(row => row.id === saved.id);
        if (existing) Object.assign(existing, saved); else quoteRows.unshift(saved);
      }
    } catch (error) { /* use built-in demo data */ }
    currentQuoteId = quoteById(requestedId).id;
    const requestedSection = params.get('section') || 'summary';
    if (requestedSection === 'proposal') { currentScreen = 'proposal'; renderProposal(); }
    else if (requestedSection !== 'summary') { currentQuoteSection = requestedSection; renderQuoteEditorSection(requestedSection); }
    else { currentScreen = 'detail'; renderDetail(); }
  } else {
    const params = new URLSearchParams(window.location.search);
    const requestedDeal = params.get('openDeal');
    if (requestedDeal) {
      if (typeof window.showView === 'function') window.showView('crm');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (typeof window.openCrmDealByName === 'function') window.openCrmDealByName(requestedDeal);
      }));
    } else if (window.location.hash === '#quotes') openWorkspace();
  }
  if (window.WeQuoteCRMQuoteLifecycle) window.WeQuoteCRMQuoteLifecycle.syncQuoteRows(quoteRows);
})();
