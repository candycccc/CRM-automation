(function () {
  'use strict';

  const dock = document.getElementById('wequote-attention-widget');
  const workspace = document.querySelector('[data-my-notes-workspace]');
  if (!dock || !workspace) return;

  const STORAGE_KEY = 'wequote-my-notes-v1';
  const COLLECTIONS_KEY = 'wequote-my-notes-collections-v1';
  const LEGACY_KEY = 'wequote-productivity-personal-note-v1';
  const defaultCollections = ['All Notes', 'Site Surveys', 'Products & Equipment', 'Inspiration', 'Learning', 'Unfiled'];
  const $ = function (selector, scope) { return (scope || document).querySelector(selector); };
  const $$ = function (selector, scope) { return Array.from((scope || document).querySelectorAll(selector)); };

  const els = {
    tabStatus: $('[data-my-notes-tab-status]', dock),
    quickForm: $('[data-my-notes-quick-form]', dock),
    quickText: $('[data-my-notes-quick-text]', dock),
    quickCollection: $('[data-my-notes-quick-collection]', dock),
    recent: $('[data-my-notes-recent]', dock),
    count: $('[data-my-notes-count]', dock),
    dockFile: $('[data-my-notes-dock-file]', dock),
    collections: $('[data-my-notes-collections]', workspace),
    collectionMenu: $('[data-my-notes-collection-menu]', workspace),
    collectionMenuLabel: $('[data-my-notes-collection-menu-label]', workspace),
    collectionDelete: $('[data-my-notes-delete-collection]', workspace),
    newCollectionDialog: $('[data-my-notes-new-collection-dialog]', workspace),
    newCollectionForm: $('[data-my-notes-new-collection-form]', workspace),
    newCollectionName: $('[data-my-notes-new-collection-name]', workspace),
    deleteCollectionDialog: $('[data-my-notes-delete-collection-dialog]', workspace),
    deleteCollectionSummary: $('[data-my-notes-delete-collection-summary]', workspace),
    deleteCollectionConfirm: $('[data-my-notes-delete-collection-confirm]', workspace),
    library: $('.my-notes-library', workspace),
    cards: $('[data-my-notes-cards]', workspace),
    libraryTitle: $('[data-my-notes-library-title]', workspace),
    libraryCount: $('[data-my-notes-library-count]', workspace),
    libraryFooter: $('[data-my-notes-library-footer]', workspace),
    search: $('[data-my-notes-search]', workspace),
    sort: $('[data-my-notes-sort]', workspace),
    title: $('[data-my-notes-title]', workspace),
    body: $('[data-my-notes-body]', workspace),
    editorCollection: $('[data-my-notes-editor-collection]', workspace),
    pin: $('[data-my-notes-pin]', workspace),
    saveState: $('[data-my-notes-save-state]', workspace),
    updated: $('[data-my-notes-updated]', workspace),
    checklistSection: $('[data-my-notes-checklist-section]', workspace),
    checklist: $('[data-my-notes-checklist]', workspace),
    mediaSection: $('[data-my-notes-media-section]', workspace),
    media: $('[data-my-notes-media]', workspace),
    attachmentsSection: $('[data-my-notes-attachments-section]', workspace),
    attachments: $('[data-my-notes-attachments]', workspace),
    imageInput: $('[data-my-notes-image-input]', workspace),
    attachmentInput: $('[data-my-notes-attachment-input]', workspace),
    canvasViewport: $('[data-canvas-viewport]', workspace),
    canvasStage: $('[data-canvas-stage]', workspace),
    canvasBlocks: $('[data-canvas-blocks]', workspace),
    canvasEmpty: $('[data-canvas-empty]', workspace),
    canvasInspector: $('[data-canvas-inspector]', workspace),
    canvasInspectorTitle: $('[data-canvas-inspector-title]', workspace),
    canvasZoomValue: $('[data-canvas-zoom-value]', workspace),
    copyDialog: $('[data-my-notes-copy-dialog]', workspace),
    copyTitle: $('[data-my-notes-copy-title]', workspace),
    copyKind: $('[data-my-notes-copy-kind]', workspace),
    copyRecord: $('[data-my-notes-copy-record]', workspace),
    copyNote: $('[data-my-notes-copy-note]', workspace),
    copyDescription: $('[data-my-notes-copy-description]', workspace),
    templateDialog: $('[data-my-notes-template-dialog]', workspace),
    toast: $('[data-my-notes-toast]', workspace)
  };

  let notes = [];
  let collections = defaultCollections.slice();
  let activeCollection = 'All Notes';
  let activeNoteId = null;
  let searchQuery = '';
  let layout = 'grid';
  let saveTimer = null;
  let toastTimer = null;
  let renderingEditor = false;
  let copyTargetKind = '';
  let selectedBlockId = null;
  let canvasZoom = .78;
  let canvasMode = 'select';
  let dragState = null;
  let drawingState = null;
  let contextCollection = null;
  let collectionMenuReturnFocus = null;
  let pendingDeleteCollection = null;

  const copyTargets = {
    Deal: ['2231 Quail Bluff Ct · Cherin Joseph', 'Theater Upgrades · Les Landau', 'Riverside Penthouse · Candy Wong'],
    Lead: ['ABR Residential Lead', 'Lau & Partners Boardroom', 'Window Treatments Enquiry'],
    Project: ['New Pool TV', 'Private Cinema Room', 'Meeting Room AV Fit-out']
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function uid(prefix) {
    return (prefix || 'note') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function stripHtml(value) {
    const holder = document.createElement('div');
    holder.innerHTML = value || '';
    return (holder.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function noteTitle(value) {
    return String(value == null ? '' : value).trim() || 'Untitled note';
  }

  function canvasBlock(type, options) {
    const source = options || {};
    const sizes = {
      text: [390, 128], sticky: [250, 150], checklist: [300, 190], image: [300, 210],
      file: [260, 100], equipment: [270, 130], arrow: [230, 70], drawing: [300, 190]
    };
    const size = sizes[type] || [250, 130];
    return Object.assign({
      id: source.id || uid('block'), type: type, x: 70, y: 70,
      w: size[0], h: size[1], colour: '#fff3b8', text: '',
      items: [], model: 'AV equipment', spec: 'Add model, location or specification',
      points: []
    }, source);
  }

  function templateCanvas(template, context) {
    const source = context || {};
    const canvas = { width: 1280, height: 820, blocks: [] };
    const add = function (type, values) { canvas.blocks.push(canvasBlock(type, values)); };
    if (template === 'quick') {
      add('sticky', { x: 90, y: 82, w: 330, h: 170, text: source.text || 'Quick note', colour: '#fff3b8' });
    } else if (template === 'site-survey') {
      add('text', { x: 60, y: 48, w: 510, h: 124, text: 'Site survey\nCapture room conditions, installation positions and client requirements.' });
      add('image', { x: 60, y: 210, w: 330, h: 230, kind: 'seed', visual: 'site', caption: 'Room photo' });
      add('image', { x: 420, y: 210, w: 330, h: 230, kind: 'seed', visual: 'lighting', caption: 'Installation detail' });
      add('checklist', { x: 790, y: 65, w: 350, h: 245, items: [
        { text: 'Confirm screen and projector position', done: false },
        { text: 'Record cable route and rack location', done: false },
        { text: 'Measure ambient light and viewing distance', done: false }
      ] });
      add('equipment', { x: 790, y: 350, w: 350, h: 145, model: 'Projector / display', spec: 'Model · throw · mounting · power' });
      add('sticky', { x: 820, y: 545, w: 285, h: 150, text: 'Site observation\nAdd an issue, idea or client preference.', colour: '#dff7eb' });
    } else if (template === 'signal-flow') {
      add('text', { x: 55, y: 45, w: 470, h: 105, text: 'Signal flow\nDrag the AV cards and connectors to document the path.' });
      add('equipment', { x: 70, y: 260, model: 'Source', spec: 'Apple TV / player / cable box' });
      add('equipment', { x: 390, y: 260, model: 'AVR / DSP', spec: 'Switching and processing' });
      add('equipment', { x: 720, y: 180, model: 'Display', spec: 'HDMI / AV-over-IP output' });
      add('equipment', { x: 720, y: 390, model: 'Speakers', spec: 'Amplifier / output zone' });
      add('arrow', { x: 315, y: 292, w: 120, h: 60 });
      add('arrow', { x: 635, y: 240, w: 135, h: 60 });
      add('arrow', { x: 635, y: 390, w: 135, h: 60 });
    } else if (template === 'equipment-comparison') {
      add('text', { x: 60, y: 45, w: 560, h: 110, text: 'Equipment comparison\nCompare models, constraints and the recommended option.' });
      add('equipment', { x: 70, y: 220, w: 320, h: 155, model: 'Option A', spec: 'Model · price · strengths · risks' });
      add('equipment', { x: 440, y: 220, w: 320, h: 155, model: 'Option B', spec: 'Model · price · strengths · risks' });
      add('equipment', { x: 810, y: 220, w: 320, h: 155, model: 'Option C', spec: 'Model · price · strengths · risks' });
      add('sticky', { x: 440, y: 465, w: 330, h: 170, text: 'Recommendation\nRecord why this option is the best fit.', colour: '#dff7eb' });
    } else if (template === 'moodboard') {
      add('text', { x: 60, y: 40, w: 500, h: 110, text: 'Moodboard\nCollect the visual direction for lighting, interiors and AV integration.' });
      add('image', { x: 60, y: 200, w: 330, h: 250, kind: 'seed', visual: 'lighting', caption: 'Lighting reference' });
      add('image', { x: 425, y: 200, w: 330, h: 250, kind: 'seed', visual: 'site', caption: 'Interior reference' });
      add('image', { x: 790, y: 200, w: 330, h: 250, kind: 'seed', visual: 'projector', caption: 'Equipment reference' });
      add('sticky', { x: 425, y: 515, w: 330, h: 155, text: 'Design direction\nWarm, discreet and easy to operate.', colour: '#fce5ec' });
    }
    return canvas;
  }

  function legacyCanvas(note) {
    const canvas = templateCanvas('blank');
    let x = 60;
    let y = 55;
    const text = stripHtml(note.body);
    if (text) {
      canvas.blocks.push(canvasBlock('text', { x: x, y: y, w: 560, h: 145, text: text }));
      y += 185;
    }
    if (Array.isArray(note.checklist) && note.checklist.length) {
      canvas.blocks.push(canvasBlock('checklist', { x: 60, y: y, w: 360, h: Math.max(155, 75 + note.checklist.length * 34), items: note.checklist.map(function (item) { return { text: item.text, done: Boolean(item.done) }; }) }));
      x = 460;
    }
    (note.images || []).forEach(function (image, index) {
      canvas.blocks.push(canvasBlock('image', {
        x: x + (index % 2) * 330, y: y + Math.floor(index / 2) * 245, w: 300, h: 210,
        kind: image.kind, visual: image.visual || note.visual, src: image.src, caption: image.caption || 'Note image'
      }));
    });
    (note.attachments || []).forEach(function (file, index) {
      canvas.blocks.push(canvasBlock('file', { x: 60, y: 590 + index * 115, w: 310, h: 95, name: file.name, size: file.size }));
    });
    return canvas;
  }

  function normaliseCanvas(canvas, note) {
    const source = canvas && Array.isArray(canvas.blocks) ? canvas : legacyCanvas(note || {});
    return {
      width: Math.max(900, Number(source.width) || 1280),
      height: Math.max(650, Number(source.height) || 820),
      blocks: (source.blocks || []).map(function (item) {
        const block = canvasBlock(item.type || 'text', item);
        block.x = Number(block.x) || 0; block.y = Number(block.y) || 0;
        block.w = Math.max(90, Number(block.w) || 250); block.h = Math.max(44, Number(block.h) || 120);
        return block;
      })
    };
  }

  function seedNotes() {
    const now = Date.now();
    return [
      {
        id: 'note-riverside-site-survey',
        title: 'Riverside Penthouse Site Survey',
        collection: 'Site Surveys',
        visual: 'site',
        pinned: true,
        updatedAt: now - 2 * 60000,
        body: '<h2>Overview</h2><p>Site survey for the Riverside Penthouse audio visual and automation upgrade.</p><p>Client is looking for a clean, minimalist solution with high-performance AV for entertaining and work-from-home.</p>',
        checklist: [
          { text: '4K video distribution to all rooms', done: true },
          { text: 'Whole-home audio with zone control', done: true },
          { text: 'Automated lighting and shading', done: false },
          { text: 'Confirm simple, elegant user interface', done: false }
        ],
        images: [
          { id: 'seed-living', kind: 'seed', visual: 'site', caption: 'Living Room' },
          { id: 'seed-media', kind: 'seed', visual: 'lighting', caption: 'Media Room' }
        ],
        attachments: [{ id: 'seed-plan', name: 'Penthouse Floor Plan.pdf', size: '1.2 MB' }]
      },
      {
        id: 'note-main-rack-layout',
        title: 'Main Rack Layout Concept',
        collection: 'Products & Equipment',
        visual: 'rack',
        pinned: false,
        updatedAt: now - 60 * 60000,
        body: '<h2>Rack planning</h2><p>Initial rack order for network, control, DSP and power. Allow spare rack space for future expansion.</p>',
        checklist: [{ text: 'Confirm rack ventilation clearance', done: false }],
        images: [{ id: 'seed-rack', kind: 'seed', visual: 'rack', caption: 'Rack block sketch' }],
        attachments: []
      },
      {
        id: 'note-projector-comparison',
        title: 'Projector Comparison',
        collection: 'Products & Equipment',
        visual: 'projector',
        pinned: false,
        updatedAt: now - 3 * 60 * 60000,
        body: '<h2>Shortlist</h2><p>Compare brightness, throw ratio, lens shift, operating noise and warranty before the revised proposal.</p>',
        checklist: [], images: [], attachments: [{ id: 'seed-sheet', name: 'Projector shortlist.xlsx', size: '84 KB' }]
      },
      {
        id: 'note-lighting-moodboard',
        title: 'Living Room Lighting Moodboard',
        collection: 'Inspiration',
        visual: 'lighting',
        pinned: false,
        updatedAt: now - 24 * 60 * 60000,
        body: '<h2>Lighting direction</h2><p>Warm architectural layers, concealed linear light and a cinema scene that avoids screen reflections.</p>',
        checklist: [], images: [{ id: 'seed-mood', kind: 'seed', visual: 'lighting', caption: 'Reference mood' }], attachments: []
      },
      {
        id: 'note-av-over-ip-learning',
        title: 'AV-over-IP Training Notes',
        collection: 'Learning',
        visual: 'learning',
        pinned: false,
        updatedAt: now - 2 * 24 * 60 * 60000,
        body: '<h2>Training summary</h2><p>Keep multicast, VLAN and switch configuration references together for future system commissioning.</p>',
        checklist: [{ text: 'Add switch configuration checklist', done: false }], images: [], attachments: []
      }
    ];
  }

  function normaliseNote(note) {
    const normalised = {
      id: note.id || uid(),
      title: noteTitle(note.title),
      collection: collections.includes(note.collection) ? note.collection : 'Unfiled',
      visual: note.visual || 'blank',
      pinned: Boolean(note.pinned),
      updatedAt: Number(note.updatedAt) || Date.now(),
      body: note.body || '',
      checklist: Array.isArray(note.checklist) ? note.checklist : [],
      images: Array.isArray(note.images) ? note.images : [],
      attachments: Array.isArray(note.attachments) ? note.attachments : []
    };
    normalised.canvas = normaliseCanvas(note.canvas, normalised);
    return normalised;
  }

  function loadData() {
    try {
      const storedCollections = JSON.parse(localStorage.getItem(COLLECTIONS_KEY) || 'null');
      if (Array.isArray(storedCollections) && storedCollections.length) {
        collections = Array.from(new Set(defaultCollections.concat(storedCollections)));
      }
    } catch (_) {}
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      notes = Array.isArray(stored) && stored.length ? stored.map(normaliseNote) : seedNotes().map(normaliseNote);
    } catch (_) { notes = seedNotes().map(normaliseNote); }
    try {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy && !notes.some(function (note) { return note.id === 'note-imported-scratchpad'; })) {
        const text = stripHtml(legacy);
        if (text) notes.unshift(normaliseNote({ id: 'note-imported-scratchpad', title: text.slice(0, 48), collection: 'Unfiled', body: legacy, updatedAt: Date.now() }));
      }
    } catch (_) {}
    activeNoteId = notes[0] ? notes[0].id : null;
    saveData();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections.filter(function (name) { return name !== 'All Notes'; })));
      return true;
    } catch (_) {
      notify('This prototype could not save more local image data. Try a smaller image.');
      return false;
    }
  }

  function notify(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { els.toast.classList.remove('show'); }, 2600);
  }

  function activeNote() {
    return notes.find(function (note) { return note.id === activeNoteId; }) || notes[0] || null;
  }

  function relativeTime(timestamp) {
    const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
    if (minutes < 1) return 'Updated just now';
    if (minutes < 60) return 'Updated ' + minutes + 'm ago';
    const hours = Math.round(minutes / 60);
    if (hours < 24) return 'Updated ' + hours + 'h ago';
    return 'Updated ' + Math.round(hours / 24) + 'd ago';
  }

  function optionMarkup(selected) {
    return collections.filter(function (name) { return name !== 'All Notes'; }).map(function (name) {
      return '<option' + (name === selected ? ' selected' : '') + '>' + escapeHtml(name) + '</option>';
    }).join('');
  }

  function renderDock() {
    const recent = notes.slice().sort(function (a, b) { return b.updatedAt - a.updatedAt; }).slice(0, 4);
    if (els.tabStatus) els.tabStatus.textContent = notes.length + ' ' + (notes.length === 1 ? 'note' : 'notes') + ' · private';
    if (els.count) els.count.textContent = notes.length + ' ' + (notes.length === 1 ? 'note' : 'notes');
    if (els.quickCollection) els.quickCollection.innerHTML = optionMarkup(els.quickCollection.value || 'Unfiled');
    els.recent.innerHTML = recent.map(function (note) {
      return '<button class="my-notes-recent-card" data-my-notes-open-id="' + escapeHtml(note.id) + '" type="button">' +
        '<span class="my-notes-recent-visual note-visual-' + escapeHtml(note.visual) + '"></span>' +
        '<span class="my-notes-recent-copy"><strong>' + escapeHtml(note.title) + '</strong><span>' + escapeHtml(note.collection) + ' · ' + escapeHtml(relativeTime(note.updatedAt).replace('Updated ','')) + '</span></span>' +
        '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>';
    }).join('') || '<div class="my-notes-empty">No notes yet.</div>';
  }

  function filteredNotes() {
    let output = notes.slice();
    if (activeCollection !== 'All Notes') output = output.filter(function (note) { return note.collection === activeCollection; });
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      output = output.filter(function (note) { return (note.title + ' ' + stripHtml(note.body) + ' ' + note.collection).toLowerCase().includes(query); });
    }
    if (els.sort.value === 'title') output.sort(function (a, b) { return a.title.localeCompare(b.title); });
    else output.sort(function (a, b) { return (Number(b.pinned) - Number(a.pinned)) || (b.updatedAt - a.updatedAt); });
    return output;
  }

  function renderCollections() {
    els.collections.innerHTML = collections.map(function (name) {
      const count = name === 'All Notes' ? notes.length : notes.filter(function (note) { return note.collection === name; }).length;
      return '<button class="my-notes-collection-button' + (name === activeCollection ? ' active' : '') + '" data-my-notes-collection="' + escapeHtml(name) + '" type="button" aria-haspopup="menu">' +
        '<i class="fa-' + (name === 'All Notes' ? 'solid fa-note-sticky' : 'regular fa-folder') + '"></i><span>' + escapeHtml(name) + '</span><span class="count">' + count + '</span></button>';
    }).join('');
  }

  function isProtectedCollection(name) {
    return name === 'All Notes' || name === 'Unfiled';
  }

  function closeCollectionMenu(restoreFocus) {
    if (!els.collectionMenu || els.collectionMenu.hidden) return;
    els.collectionMenu.hidden = true;
    els.collectionMenu.style.removeProperty('left');
    els.collectionMenu.style.removeProperty('top');
    contextCollection = null;
    if (restoreFocus && collectionMenuReturnFocus && typeof collectionMenuReturnFocus.focus === 'function') {
      collectionMenuReturnFocus.focus({ preventScroll: true });
    }
    collectionMenuReturnFocus = null;
  }

  function openCollectionMenu(name, x, y, invoker, keyboardAccess) {
    if (!els.collectionMenu || !collections.includes(name)) return;
    contextCollection = name;
    collectionMenuReturnFocus = invoker || null;
    const protectedCollection = isProtectedCollection(name);
    els.collectionMenuLabel.textContent = name;
    els.collectionMenu.setAttribute('aria-label', 'Collection actions for ' + name);
    els.collectionDelete.disabled = protectedCollection;
    els.collectionDelete.title = protectedCollection ? name + ' cannot be deleted' : 'Delete ' + name;
    els.collectionMenu.hidden = false;
    const rect = els.collectionMenu.getBoundingClientRect();
    const left = Math.max(8, Math.min(window.innerWidth - rect.width - 8, Number(x) || 8));
    const top = Math.max(8, Math.min(window.innerHeight - rect.height - 8, Number(y) || 8));
    els.collectionMenu.style.left = Math.round(left) + 'px';
    els.collectionMenu.style.top = Math.round(top) + 'px';
    if (keyboardAccess) {
      if (protectedCollection) els.collectionMenu.focus({ preventScroll: true });
      else els.collectionDelete.focus({ preventScroll: true });
    }
  }

  function requestDeleteCollection(name) {
    if (!name || isProtectedCollection(name) || !collections.includes(name)) return;
    const movedCount = notes.filter(function (note) { return note.collection === name; }).length;
    pendingDeleteCollection = name;
    els.deleteCollectionSummary.textContent = '“' + name + '” contains ' + movedCount + ' ' + (movedCount === 1 ? 'note' : 'notes') +
      '. They will be moved to Unfiled and will not be deleted.';
    closeCollectionMenu(false);
    els.deleteCollectionDialog.hidden = false;
    window.setTimeout(function () { $('[data-my-notes-delete-collection-cancel]', workspace).focus(); }, 30);
  }

  function confirmDeleteCollection() {
    const name = pendingDeleteCollection;
    if (!name || isProtectedCollection(name) || !collections.includes(name)) return;
    const movedCount = notes.filter(function (note) { return note.collection === name; }).length;
    notes.forEach(function (note) {
      if (note.collection === name) note.collection = 'Unfiled';
    });
    collections = collections.filter(function (collection) { return collection !== name; });
    if (activeCollection === name) activeCollection = 'Unfiled';
    pendingDeleteCollection = null;
    els.deleteCollectionDialog.hidden = true;
    saveData();
    renderAll();
    notify('Deleted ' + name + '. ' + movedCount + ' ' + (movedCount === 1 ? 'note was' : 'notes were') + ' moved to Unfiled.');
  }

  function renderLibrary() {
    const output = filteredNotes();
    els.library.classList.toggle('list', layout === 'list');
    els.libraryTitle.textContent = activeCollection;
    els.libraryCount.textContent = output.length + ' ' + (output.length === 1 ? 'note' : 'notes');
    els.libraryFooter.textContent = 'Showing ' + output.length + ' of ' + notes.length + ' notes';
    els.cards.innerHTML = output.map(function (note) {
      const excerpt = canvasExcerpt(note) || 'Add text, images, a checklist or attachments.';
      return '<article class="my-notes-card' + (note.id === activeNoteId ? ' active' : '') + '" data-my-notes-card="' + escapeHtml(note.id) + '">' +
        '<div class="my-notes-card-visual note-visual-' + escapeHtml(note.visual) + '"></div>' +
        '<div class="my-notes-card-copy"><strong>' + escapeHtml(note.title) + '</strong><p>' + escapeHtml(excerpt) + '</p>' +
        '<div class="my-notes-card-meta"><span class="my-notes-collection-tag">' + escapeHtml(note.collection) + '</span><span>' + (note.pinned ? '<i class="fa-solid fa-star"></i> ' : '') + escapeHtml(relativeTime(note.updatedAt).replace('Updated ','')) + '</span></div></div></article>';
    }).join('') || '<div class="my-notes-empty"><i class="fa-regular fa-note-sticky"></i><br><br>No notes match this view.</div>';
  }

  function renderChecklist(note) {
    els.checklistSection.hidden = !note.checklist.length;
    els.checklist.innerHTML = note.checklist.map(function (item, index) {
      return '<label class="my-notes-check-row"><input data-my-notes-check-index="' + index + '" type="checkbox"' + (item.done ? ' checked' : '') + '><input data-my-notes-check-text="' + index + '" type="text" value="' + escapeHtml(item.text) + '" aria-label="Checklist item"></label>';
    }).join('');
  }

  function renderMedia(note) {
    els.mediaSection.hidden = !note.images.length;
    els.media.innerHTML = note.images.map(function (image) {
      const content = image.kind === 'data'
        ? '<img src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.caption || 'Note image') + '">'
        : '<div class="my-notes-card-visual note-visual-' + escapeHtml(image.visual || note.visual) + '"></div>';
      return '<figure class="my-notes-media-item" data-media-id="' + escapeHtml(image.id) + '">' + content +
        '<button class="my-notes-media-remove" data-my-notes-remove-media="' + escapeHtml(image.id) + '" type="button" aria-label="Remove image"><i class="fa-solid fa-xmark"></i></button>' +
        '<span>' + escapeHtml(image.caption || 'Uploaded image') + '</span></figure>';
    }).join('');
  }

  function renderAttachments(note) {
    els.attachmentsSection.hidden = !note.attachments.length;
    els.attachments.innerHTML = note.attachments.map(function (file) {
      return '<span class="my-notes-attachment"><i class="fa-regular fa-file-lines"></i><span>' + escapeHtml(file.name) + '<small> · ' + escapeHtml(file.size || '') + '</small></span>' +
        '<button data-my-notes-remove-attachment="' + escapeHtml(file.id) + '" type="button" aria-label="Remove attachment"><i class="fa-solid fa-xmark"></i></button></span>';
    }).join('');
  }

  function canvasExcerpt(note) {
    const block = note.canvas && note.canvas.blocks.find(function (item) { return item.text || item.model; });
    return block ? (block.text || block.model || '') : stripHtml(note.body);
  }

  function canvasBlockLabel(type) {
    return ({ text: 'Text', sticky: 'Sticky note', checklist: 'Checklist', image: 'Image', file: 'File', equipment: 'AV equipment', arrow: 'Connector', drawing: 'Drawing' })[type] || 'Canvas block';
  }

  function canvasBlockIcon(type) {
    return ({ text: 'fa-font', sticky: 'fa-note-sticky', checklist: 'fa-square-check', image: 'fa-image', file: 'fa-paperclip', equipment: 'fa-sliders', arrow: 'fa-arrow-right-long', drawing: 'fa-pen-ruler' })[type] || 'fa-shapes';
  }

  function renderCanvasBlock(block, note) {
    const selected = block.id === selectedBlockId ? ' selected' : '';
    const style = 'left:' + block.x + 'px;top:' + block.y + 'px;width:' + block.w + 'px;height:' + block.h + 'px;--block-colour:' + escapeHtml(block.colour || '#fff3b8') + ';';
    let body = '';
    if (block.type === 'text' || block.type === 'sticky') {
      body = '<div class="my-notes-canvas-block-body"><div contenteditable="true" data-canvas-text data-placeholder="Write something…">' + escapeHtml(block.text || '').replace(/\n/g, '<br>') + '</div></div>';
    } else if (block.type === 'checklist') {
      body = '<div class="my-notes-canvas-block-body">' + (block.items || []).map(function (item, index) {
        return '<label class="my-notes-canvas-check-row"><input data-canvas-check="' + index + '" type="checkbox"' + (item.done ? ' checked' : '') + '><input data-canvas-check-text="' + index + '" type="text" value="' + escapeHtml(item.text || '') + '"></label>';
      }).join('') + '<button class="my-notes-canvas-check-add" data-canvas-check-add type="button"><i class="fa-solid fa-plus"></i> Add item</button></div>';
    } else if (block.type === 'image') {
      const image = block.kind === 'data' && block.src
        ? '<img src="' + escapeHtml(block.src) + '" alt="' + escapeHtml(block.caption || 'Canvas image') + '">'
        : '<div class="my-notes-canvas-seed-visual my-notes-card-visual note-visual-' + escapeHtml(block.visual || note.visual || 'site') + '"></div>';
      body = '<div class="my-notes-canvas-block-body">' + image + '</div>';
    } else if (block.type === 'file') {
      body = '<div class="my-notes-canvas-block-body"><span class="file-icon"><i class="fa-regular fa-file-lines"></i></span><span class="my-notes-canvas-file-copy"><strong>' + escapeHtml(block.name || 'Attachment') + '</strong><small>' + escapeHtml(block.size || 'File') + '</small></span></div>';
    } else if (block.type === 'equipment') {
      body = '<div class="my-notes-canvas-block-body"><div class="my-notes-equipment-main"><span class="my-notes-equipment-icon"><i class="fa-solid fa-sliders"></i></span><span class="my-notes-equipment-fields"><input data-canvas-model value="' + escapeHtml(block.model || '') + '"><input data-canvas-spec value="' + escapeHtml(block.spec || '') + '"></span></div></div>';
    } else if (block.type === 'arrow') {
      body = '<div class="my-notes-canvas-block-body"><svg viewBox="0 0 230 70" preserveAspectRatio="none"><line x1="8" y1="35" x2="204" y2="35" stroke="#2857f5" stroke-width="4" stroke-linecap="round"/><path d="M200 22 L224 35 L200 48 Z" fill="#2857f5"/></svg></div>';
    } else if (block.type === 'drawing') {
      const points = (block.points || []).map(function (point) { return point[0] + ',' + point[1]; }).join(' ');
      body = '<div class="my-notes-canvas-block-body"><svg viewBox="0 0 ' + block.w + ' ' + block.h + '" preserveAspectRatio="none"><polyline points="' + escapeHtml(points) + '" fill="none" stroke="#2857f5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
    }
    const head = block.type === 'arrow' ? '' : '<div class="my-notes-canvas-block-head"><i class="fa-solid ' + canvasBlockIcon(block.type) + '"></i><span>' + canvasBlockLabel(block.type) + '</span><button data-canvas-remove type="button" aria-label="Remove block"><i class="fa-solid fa-xmark"></i></button></div>';
    return '<article class="my-notes-canvas-block ' + escapeHtml(block.type) + selected + '" data-canvas-block="' + escapeHtml(block.id) + '" style="' + style + '">' + head + body + '<span class="my-notes-canvas-resize" data-canvas-resize aria-hidden="true"></span></article>';
  }

  function renderCanvas(note) {
    if (!note || !els.canvasStage) return;
    note.canvas = normaliseCanvas(note.canvas, note);
    els.canvasStage.style.width = note.canvas.width + 'px';
    els.canvasStage.style.height = note.canvas.height + 'px';
    els.canvasStage.style.setProperty('--canvas-zoom', canvasZoom);
    els.canvasBlocks.innerHTML = note.canvas.blocks.map(function (block) { return renderCanvasBlock(block, note); }).join('');
    els.canvasEmpty.hidden = note.canvas.blocks.length > 0;
    if (els.canvasZoomValue) els.canvasZoomValue.textContent = Math.round(canvasZoom * 100) + '%';
    const selected = note.canvas.blocks.find(function (block) { return block.id === selectedBlockId; });
    els.canvasInspector.hidden = !selected;
    if (selected) els.canvasInspectorTitle.textContent = canvasBlockLabel(selected.type);
  }

  function renderEditor() {
    const note = activeNote();
    if (!note) return;
    renderingEditor = true;
    els.title.value = note.title;
    els.body.innerHTML = note.body;
    els.editorCollection.innerHTML = optionMarkup(note.collection);
    els.pin.classList.toggle('active', note.pinned);
    els.pin.innerHTML = '<i class="fa-' + (note.pinned ? 'solid' : 'regular') + ' fa-star"></i>';
    els.updated.textContent = relativeTime(note.updatedAt);
    els.saveState.innerHTML = '<i class="fa-solid fa-circle-check"></i> Autosaved just now';
    renderChecklist(note);
    renderMedia(note);
    renderAttachments(note);
    renderCanvas(note);
    renderingEditor = false;
  }

  function renderAll() {
    renderDock();
    renderCollections();
    renderLibrary();
    if (!activeNote()) activeNoteId = notes[0] ? notes[0].id : null;
    if (activeNote()) renderEditor();
  }

  function scheduleSave(note, rerenderLibrary) {
    if (!note || renderingEditor) return;
    note.updatedAt = Date.now();
    els.saveState.textContent = 'Saving…';
    clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function () {
      saveData();
      els.saveState.innerHTML = '<i class="fa-solid fa-circle-check"></i> Autosaved just now';
      els.updated.textContent = relativeTime(note.updatedAt);
      renderDock();
      if (rerenderLibrary !== false) renderLibrary();
    }, 420);
  }

  function openWorkspace(noteId) {
    if (noteId && notes.some(function (note) { return note.id === noteId; })) activeNoteId = noteId;
    workspace.hidden = false;
    document.body.classList.add('my-notes-open');
    renderAll();
    window.setTimeout(function () { els.search.focus(); }, 30);
  }

  function closeWorkspace() {
    workspace.hidden = true;
    document.body.classList.remove('my-notes-open');
    renderDock();
  }

  function newNote(options) {
    const settings = options || {};
    const collection = collections.includes(settings.collection) && settings.collection !== 'All Notes' ? settings.collection : 'Unfiled';
    const note = normaliseNote({
      id: uid(), title: noteTitle(settings.title), collection: collection,
      body: settings.body || '', visual: settings.visual || 'blank', images: settings.images || [], attachments: settings.attachments || [],
      canvas: templateCanvas(settings.template || 'blank', { text: settings.quickText || stripHtml(settings.body) }), updatedAt: Date.now()
    });
    notes.unshift(note);
    activeNoteId = note.id;
    saveData();
    renderAll();
    return note;
  }

  function formatBytes(bytes) {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function imageData(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        const image = new Image();
        image.onerror = reject;
        image.onload = function () {
          const max = 960;
          const scale = Math.min(1, max / Math.max(image.width, image.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', .76));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function nextCanvasPosition(note) {
    const count = note.canvas && note.canvas.blocks ? note.canvas.blocks.length : 0;
    return { x: 70 + (count % 3) * 330, y: 80 + Math.floor(count / 3) * 245 };
  }

  async function addFilesToNote(fileList, note, imagesOnly, canvasPosition) {
    const files = Array.from(fileList || []);
    let position = canvasPosition || nextCanvasPosition(note);
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try {
          const src = await imageData(file);
          note.images.push({ id: uid('image'), kind: 'data', src: src, caption: file.name });
          note.canvas.blocks.push(canvasBlock('image', { x: position.x, y: position.y, w: 310, h: 220, kind: 'data', src: src, caption: file.name }));
          if (note.visual === 'blank') note.visual = 'site';
        } catch (_) { notify('Could not read ' + file.name + '.'); }
      } else if (!imagesOnly) {
        note.attachments.push({ id: uid('file'), name: file.name, size: formatBytes(file.size) });
        note.canvas.blocks.push(canvasBlock('file', { x: position.x, y: position.y, w: 290, h: 100, name: file.name, size: formatBytes(file.size) }));
      }
      position = { x: position.x + 35, y: position.y + 35 };
    }
    note.updatedAt = Date.now();
    saveData();
    renderAll();
  }

  function activeCanvasBlock() {
    const note = activeNote();
    return note && note.canvas ? note.canvas.blocks.find(function (block) { return block.id === selectedBlockId; }) : null;
  }

  function selectCanvasBlock(id) {
    selectedBlockId = id || null;
    $$('.my-notes-canvas-block', els.canvasBlocks).forEach(function (node) { node.classList.toggle('selected', node.dataset.canvasBlock === selectedBlockId); });
    const block = activeCanvasBlock();
    els.canvasInspector.hidden = !block;
    if (block) els.canvasInspectorTitle.textContent = canvasBlockLabel(block.type);
  }

  function saveCanvas(note, refreshLibrary) {
    if (!note) return;
    note.updatedAt = Date.now();
    saveData();
    els.saveState.innerHTML = '<i class="fa-solid fa-circle-check"></i> Autosaved just now';
    els.updated.textContent = relativeTime(note.updatedAt);
    renderDock();
    if (refreshLibrary !== false) renderLibrary();
  }

  function viewportCanvasOrigin() {
    return {
      x: Math.max(35, (els.canvasViewport.scrollLeft + 120) / canvasZoom),
      y: Math.max(35, (els.canvasViewport.scrollTop + 100) / canvasZoom)
    };
  }

  function addCanvasBlock(type, values) {
    const note = activeNote(); if (!note) return null;
    const origin = viewportCanvasOrigin();
    const block = canvasBlock(type, Object.assign({ x: origin.x + (note.canvas.blocks.length % 4) * 28, y: origin.y + (note.canvas.blocks.length % 4) * 28 }, values || {}));
    if (type === 'text' && !block.text) block.text = 'New text block';
    if (type === 'sticky' && !block.text) block.text = 'New idea';
    if (type === 'checklist' && !block.items.length) block.items = [{ text: 'New checklist item', done: false }];
    note.canvas.blocks.push(block);
    selectedBlockId = block.id;
    saveCanvas(note);
    renderCanvas(note);
    return block;
  }

  function removeCanvasBlock(id) {
    const note = activeNote(); if (!note || !id) return;
    note.canvas.blocks = note.canvas.blocks.filter(function (block) { return block.id !== id; });
    if (selectedBlockId === id) selectedBlockId = null;
    saveCanvas(note);
    renderCanvas(note);
  }

  function setCanvasZoom(value, keepCentre) {
    const oldZoom = canvasZoom;
    const viewport = els.canvasViewport;
    const centre = { x: (viewport.scrollLeft + viewport.clientWidth / 2) / oldZoom, y: (viewport.scrollTop + viewport.clientHeight / 2) / oldZoom };
    canvasZoom = Math.max(.42, Math.min(1.35, value));
    els.canvasStage.style.setProperty('--canvas-zoom', canvasZoom);
    els.canvasZoomValue.textContent = Math.round(canvasZoom * 100) + '%';
    if (keepCentre !== false) {
      window.requestAnimationFrame(function () {
        viewport.scrollLeft = Math.max(0, centre.x * canvasZoom - viewport.clientWidth / 2);
        viewport.scrollTop = Math.max(0, centre.y * canvasZoom - viewport.clientHeight / 2);
      });
    }
  }

  function fitCanvas() {
    const note = activeNote(); if (!note) return;
    const horizontal = (els.canvasViewport.clientWidth - 60) / note.canvas.width;
    const vertical = (els.canvasViewport.clientHeight - 60) / note.canvas.height;
    setCanvasZoom(Math.min(1, horizontal, vertical), false);
    els.canvasViewport.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  function canvasPoint(event) {
    const rect = els.canvasStage.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(Number(els.canvasStage.style.width.replace('px','')) || 1280, (event.clientX - rect.left) / canvasZoom)),
      y: Math.max(0, Math.min(Number(els.canvasStage.style.height.replace('px','')) || 820, (event.clientY - rect.top) / canvasZoom))
    };
  }

  function setCanvasMode(mode) {
    canvasMode = mode;
    document.body.classList.toggle('canvas-drawing-active', mode === 'drawing');
    $$('[data-canvas-add="drawing"]', workspace).forEach(function (button) { button.classList.toggle('active', mode === 'drawing'); });
  }

  function updateCanvasBlockFromEvent(event) {
    const note = activeNote();
    const blockNode = event.target.closest('[data-canvas-block]');
    if (!note || !blockNode) return;
    const block = note.canvas.blocks.find(function (item) { return item.id === blockNode.dataset.canvasBlock; });
    if (!block) return;
    if (event.target.matches('[data-canvas-text]')) block.text = event.target.innerText;
    if (event.target.matches('[data-canvas-check-text]')) block.items[Number(event.target.dataset.canvasCheckText)].text = event.target.value;
    if (event.target.matches('[data-canvas-model]')) block.model = event.target.value;
    if (event.target.matches('[data-canvas-spec]')) block.spec = event.target.value;
    scheduleSave(note, false);
  }

  function onCanvasPointerDown(event) {
    const note = activeNote(); if (!note) return;
    const blockNode = event.target.closest('[data-canvas-block]');
    if (!blockNode) {
      if (canvasMode === 'drawing') {
        const point = canvasPoint(event);
        const block = canvasBlock('drawing', { x: point.x, y: point.y, w: 90, h: 70, points: [[4, 4]] });
        note.canvas.blocks.push(block);
        selectedBlockId = block.id;
        drawingState = { pointerId: event.pointerId, block: block, startX: point.x, startY: point.y };
        renderCanvas(note);
        event.preventDefault();
      } else {
        selectCanvasBlock(null);
      }
      return;
    }
    const block = note.canvas.blocks.find(function (item) { return item.id === blockNode.dataset.canvasBlock; });
    if (!block) return;
    selectCanvasBlock(block.id);
    if (event.target.closest('input,button,[contenteditable="true"]') && !event.target.matches('[data-canvas-resize]')) return;
    const point = canvasPoint(event);
    dragState = {
      pointerId: event.pointerId, block: block, node: blockNode,
      kind: event.target.matches('[data-canvas-resize]') ? 'resize' : 'move',
      startX: point.x, startY: point.y, x: block.x, y: block.y, w: block.w, h: block.h
    };
    blockNode.classList.add('is-dragging');
    event.preventDefault();
  }

  function onCanvasPointerMove(event) {
    const note = activeNote(); if (!note) return;
    if (drawingState && drawingState.pointerId === event.pointerId) {
      const point = canvasPoint(event);
      const block = drawingState.block;
      block.w = Math.max(90, point.x - drawingState.startX + 12);
      block.h = Math.max(70, point.y - drawingState.startY + 12);
      block.points.push([Math.max(4, point.x - block.x), Math.max(4, point.y - block.y)]);
      const node = $('[data-canvas-block="' + block.id + '"]', els.canvasBlocks);
      if (node) {
        node.style.width = block.w + 'px'; node.style.height = block.h + 'px';
        const line = $('polyline', node); if (line) line.setAttribute('points', block.points.map(function (p) { return p[0] + ',' + p[1]; }).join(' '));
        const svg = $('svg', node); if (svg) svg.setAttribute('viewBox', '0 0 ' + block.w + ' ' + block.h);
      }
      event.preventDefault(); return;
    }
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    const point = canvasPoint(event);
    const dx = point.x - dragState.startX; const dy = point.y - dragState.startY;
    if (dragState.kind === 'move') {
      dragState.block.x = Math.max(0, dragState.x + dx); dragState.block.y = Math.max(0, dragState.y + dy);
      dragState.node.style.left = dragState.block.x + 'px'; dragState.node.style.top = dragState.block.y + 'px';
    } else {
      dragState.block.w = Math.max(90, dragState.w + dx); dragState.block.h = Math.max(55, dragState.h + dy);
      dragState.node.style.width = dragState.block.w + 'px'; dragState.node.style.height = dragState.block.h + 'px';
    }
    event.preventDefault();
  }

  function onCanvasPointerUp(event) {
    if (drawingState && drawingState.pointerId === event.pointerId) {
      drawingState = null; setCanvasMode('select'); saveCanvas(activeNote()); renderCanvas(activeNote());
    }
    if (dragState && dragState.pointerId === event.pointerId) {
      dragState.node.classList.remove('is-dragging'); dragState = null; saveCanvas(activeNote());
    }
  }

  els.quickForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const text = els.quickText.value.trim();
    const note = newNote({
      title: text ? text.slice(0, 54) : 'Untitled note',
      collection: els.quickCollection.value,
      body: text ? '<p>' + escapeHtml(text) + '</p>' : '',
      template: 'quick',
      quickText: text
    });
    els.quickText.value = '';
    openWorkspace(note.id);
  });

  $('[data-my-notes-dock-upload]', dock).addEventListener('click', function () { els.dockFile.click(); });
  els.dockFile.addEventListener('change', async function () {
    if (!this.files.length) return;
    const first = this.files[0];
    const note = newNote({ title: first.name.replace(/\.[^.]+$/, ''), collection: els.quickCollection.value });
    await addFilesToNote(this.files, note, false);
    this.value = '';
    openWorkspace(note.id);
  });

  dock.addEventListener('click', function (event) {
    const noteButton = event.target.closest('[data-my-notes-open-id]');
    if (noteButton) openWorkspace(noteButton.dataset.myNotesOpenId);
    if (event.target.closest('[data-my-notes-open]')) openWorkspace();
  });

  $$('[data-my-notes-close]', workspace).forEach(function (button) { button.addEventListener('click', closeWorkspace); });
  workspace.addEventListener('click', function (event) {
    if (event.target === workspace) closeWorkspace();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !workspace.hidden) closeWorkspace();
  });

  $('[data-my-notes-new]', workspace).addEventListener('click', function () {
    newNote({
      collection: activeCollection === 'All Notes' ? 'Unfiled' : activeCollection
    });
    selectedBlockId = null;
    renderEditor();
    els.title.focus();
    els.title.select();
    notify('New private note created.');
  });

  $$('[data-my-notes-template-close]', workspace).forEach(function (button) {
    button.addEventListener('click', function () { els.templateDialog.hidden = true; });
  });
  els.templateDialog.addEventListener('click', function (event) {
    if (event.target === els.templateDialog) els.templateDialog.hidden = true;
    const button = event.target.closest('[data-canvas-template]');
    if (!button) return;
    const template = button.dataset.canvasTemplate;
    const details = {
      blank: ['Untitled note', 'blank'],
      'site-survey': ['New Site Survey', 'site'],
      'signal-flow': ['New Signal Flow', 'rack'],
      'equipment-comparison': ['New Equipment Comparison', 'projector'],
      moodboard: ['New AV Moodboard', 'lighting']
    }[template] || ['Untitled note', 'blank'];
    const note = newNote({
      title: details[0], visual: details[1], template: template,
      collection: activeCollection === 'All Notes' ? 'Unfiled' : activeCollection
    });
    els.templateDialog.hidden = true;
    selectedBlockId = null;
    renderEditor();
    els.title.focus();
    els.title.select();
    notify('Canvas Note created. Every block can be moved, resized or removed.');
  });

  $('[data-my-notes-new-collection]', workspace).addEventListener('click', function () {
    els.newCollectionName.value = '';
    els.newCollectionDialog.hidden = false;
    window.setTimeout(function () { els.newCollectionName.focus(); }, 30);
  });

  $('[data-my-notes-new-collection-cancel]', workspace).addEventListener('click', function () {
    els.newCollectionDialog.hidden = true;
  });

  els.newCollectionDialog.addEventListener('click', function (event) {
    if (event.target === els.newCollectionDialog) els.newCollectionDialog.hidden = true;
  });

  els.newCollectionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = els.newCollectionName.value.trim();
    if (!name || collections.includes(name)) return;
    collections.splice(collections.length - 1, 0, name);
    activeCollection = name;
    els.newCollectionDialog.hidden = true;
    saveData();
    renderAll();
  });

  els.collections.addEventListener('click', function (event) {
    const button = event.target.closest('[data-my-notes-collection]');
    if (!button) return;
    closeCollectionMenu(false);
    activeCollection = button.dataset.myNotesCollection;
    renderCollections(); renderLibrary();
  });

  els.collections.addEventListener('contextmenu', function (event) {
    const button = event.target.closest('[data-my-notes-collection]');
    if (!button) return;
    event.preventDefault();
    activeCollection = button.dataset.myNotesCollection;
    renderCollections(); renderLibrary();
    const currentButton = els.collections.querySelector('[data-my-notes-collection="' + CSS.escape(activeCollection) + '"]');
    openCollectionMenu(activeCollection, event.clientX, event.clientY, currentButton || button, false);
  });

  els.collections.addEventListener('keydown', function (event) {
    const button = event.target.closest('[data-my-notes-collection]');
    if (!button || (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))) return;
    event.preventDefault();
    const rect = button.getBoundingClientRect();
    openCollectionMenu(button.dataset.myNotesCollection, rect.left + 22, rect.bottom - 4, button, true);
  });

  els.collectionDelete.addEventListener('click', function () { requestDeleteCollection(contextCollection); });

  els.deleteCollectionConfirm.addEventListener('click', confirmDeleteCollection);
  $('[data-my-notes-delete-collection-cancel]', workspace).addEventListener('click', function () {
    pendingDeleteCollection = null;
    els.deleteCollectionDialog.hidden = true;
  });
  els.deleteCollectionDialog.addEventListener('click', function (event) {
    if (event.target !== els.deleteCollectionDialog) return;
    pendingDeleteCollection = null;
    els.deleteCollectionDialog.hidden = true;
  });

  document.addEventListener('pointerdown', function (event) {
    if (els.collectionMenu.hidden || els.collectionMenu.contains(event.target) || event.target.closest('[data-my-notes-collection]')) return;
    closeCollectionMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (!els.deleteCollectionDialog.hidden) {
      event.preventDefault();
      event.stopImmediatePropagation();
      pendingDeleteCollection = null;
      els.deleteCollectionDialog.hidden = true;
      return;
    }
    if (!els.newCollectionDialog.hidden) {
      event.preventDefault();
      event.stopImmediatePropagation();
      els.newCollectionDialog.hidden = true;
      return;
    }
    if (els.collectionMenu.hidden) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeCollectionMenu(true);
  }, true);

  els.cards.addEventListener('click', function (event) {
    const card = event.target.closest('[data-my-notes-card]');
    if (!card) return;
    activeNoteId = card.dataset.myNotesCard;
    selectedBlockId = null;
    renderLibrary(); renderEditor();
  });

  $$('.my-notes-canvas-toolset [data-canvas-add]', workspace).forEach(function (button) {
    button.addEventListener('click', function () {
      const type = button.dataset.canvasAdd;
      if (type === 'image') { els.imageInput.click(); return; }
      if (type === 'file') { els.attachmentInput.click(); return; }
      if (type === 'drawing') { setCanvasMode(canvasMode === 'drawing' ? 'select' : 'drawing'); return; }
      addCanvasBlock(type);
    });
  });
  $$('[data-canvas-zoom]', workspace).forEach(function (button) {
    button.addEventListener('click', function () {
      const action = button.dataset.canvasZoom;
      if (action === 'in') setCanvasZoom(canvasZoom + .12);
      else if (action === 'out') setCanvasZoom(canvasZoom - .12);
      else fitCanvas();
    });
  });

  els.canvasStage.addEventListener('pointerdown', onCanvasPointerDown);
  document.addEventListener('pointermove', onCanvasPointerMove);
  document.addEventListener('pointerup', onCanvasPointerUp);
  document.addEventListener('pointercancel', onCanvasPointerUp);
  els.canvasBlocks.addEventListener('input', updateCanvasBlockFromEvent);
  els.canvasBlocks.addEventListener('change', function (event) {
    const note = activeNote();
    const blockNode = event.target.closest('[data-canvas-block]');
    if (!note || !blockNode || !event.target.matches('[data-canvas-check]')) return;
    const block = note.canvas.blocks.find(function (item) { return item.id === blockNode.dataset.canvasBlock; });
    if (!block) return;
    block.items[Number(event.target.dataset.canvasCheck)].done = event.target.checked;
    saveCanvas(note);
  });
  els.canvasBlocks.addEventListener('click', function (event) {
    const blockNode = event.target.closest('[data-canvas-block]');
    const note = activeNote();
    if (!blockNode || !note) return;
    const block = note.canvas.blocks.find(function (item) { return item.id === blockNode.dataset.canvasBlock; });
    if (!block) return;
    if (event.target.closest('[data-canvas-remove]')) { removeCanvasBlock(block.id); return; }
    if (event.target.closest('[data-canvas-check-add]')) {
      block.items.push({ text: 'New checklist item', done: false });
      block.h = Math.max(block.h, 118 + block.items.length * 34);
      selectedBlockId = block.id;
      saveCanvas(note); renderCanvas(note);
    }
  });
  $('[data-canvas-delete]', workspace).addEventListener('click', function () {
    if (selectedBlockId) removeCanvasBlock(selectedBlockId);
  });
  $$('[data-canvas-colour]', workspace).forEach(function (button) {
    button.addEventListener('click', function () {
      const block = activeCanvasBlock(); const note = activeNote();
      if (!block || !note) return;
      block.colour = button.dataset.canvasColour;
      saveCanvas(note); renderCanvas(note);
    });
  });
  els.canvasViewport.addEventListener('dragover', function (event) {
    if (event.dataTransfer && Array.from(event.dataTransfer.types || []).includes('Files')) {
      event.preventDefault(); els.canvasViewport.classList.add('is-file-over');
    }
  });
  els.canvasViewport.addEventListener('dragleave', function (event) {
    if (!els.canvasViewport.contains(event.relatedTarget)) els.canvasViewport.classList.remove('is-file-over');
  });
  els.canvasViewport.addEventListener('drop', async function (event) {
    const note = activeNote();
    if (!note || !event.dataTransfer || !event.dataTransfer.files.length) return;
    event.preventDefault(); els.canvasViewport.classList.remove('is-file-over');
    await addFilesToNote(event.dataTransfer.files, note, false, canvasPoint(event));
  });
  els.canvasViewport.addEventListener('paste', async function (event) {
    const note = activeNote();
    const files = Array.from(event.clipboardData && event.clipboardData.files || []).filter(function (file) { return file.type.startsWith('image/'); });
    if (!note || !files.length) return;
    event.preventDefault();
    await addFilesToNote(files, note, true, viewportCanvasOrigin());
  });

  els.search.addEventListener('input', function () { searchQuery = this.value.trim(); renderLibrary(); });
  els.sort.addEventListener('change', renderLibrary);
  $$('[data-my-notes-layout]', workspace).forEach(function (button) {
    button.addEventListener('click', function () {
      layout = button.dataset.myNotesLayout;
      $$('[data-my-notes-layout]', workspace).forEach(function (item) { item.classList.toggle('active', item === button); });
      renderLibrary();
    });
  });

  els.title.addEventListener('input', function () {
    const note = activeNote(); if (!note) return;
    note.title = noteTitle(this.value); scheduleSave(note);
  });
  els.title.addEventListener('blur', function () {
    const note = activeNote(); if (!note) return;
    note.title = noteTitle(this.value);
    this.value = note.title;
    scheduleSave(note);
  });
  els.body.addEventListener('input', function () {
    const note = activeNote(); if (!note) return;
    note.body = this.innerHTML; scheduleSave(note);
  });
  els.editorCollection.addEventListener('change', function () {
    const note = activeNote(); if (!note) return;
    note.collection = this.value; scheduleSave(note); renderCollections();
  });
  els.pin.addEventListener('click', function () {
    const note = activeNote(); if (!note) return;
    note.pinned = !note.pinned; scheduleSave(note); renderEditor();
  });

  $$('[data-my-notes-command]', workspace).forEach(function (button) {
    button.addEventListener('click', function () {
      els.body.focus();
      document.execCommand(button.dataset.myNotesCommand, false, null);
      const note = activeNote(); if (!note) return;
      note.body = els.body.innerHTML; scheduleSave(note);
    });
  });

  $('[data-my-notes-add-check]', workspace).addEventListener('click', function () {
    const note = activeNote(); if (!note) return;
    note.checklist.push({ text: 'New checklist item', done: false });
    scheduleSave(note); renderChecklist(note);
  });

  els.checklist.addEventListener('change', function (event) {
    const note = activeNote(); if (!note) return;
    if (event.target.matches('[data-my-notes-check-index]')) note.checklist[Number(event.target.dataset.myNotesCheckIndex)].done = event.target.checked;
    scheduleSave(note, false);
  });
  els.checklist.addEventListener('input', function (event) {
    const note = activeNote(); if (!note) return;
    if (event.target.matches('[data-my-notes-check-text]')) note.checklist[Number(event.target.dataset.myNotesCheckText)].text = event.target.value;
    scheduleSave(note, false);
  });

  $('[data-my-notes-add-image]', workspace).addEventListener('click', function () { els.imageInput.click(); });
  $('[data-my-notes-add-attachment]', workspace).addEventListener('click', function () { els.attachmentInput.click(); });
  els.imageInput.addEventListener('change', async function () {
    const note = activeNote(); if (!note) return;
    await addFilesToNote(this.files, note, true); this.value = '';
  });
  els.attachmentInput.addEventListener('change', async function () {
    const note = activeNote(); if (!note) return;
    await addFilesToNote(this.files, note, false); this.value = '';
  });

  els.media.addEventListener('click', function (event) {
    const button = event.target.closest('[data-my-notes-remove-media]');
    const note = activeNote(); if (!button || !note) return;
    note.images = note.images.filter(function (image) { return image.id !== button.dataset.myNotesRemoveMedia; });
    scheduleSave(note); renderMedia(note);
  });
  els.attachments.addEventListener('click', function (event) {
    const button = event.target.closest('[data-my-notes-remove-attachment]');
    const note = activeNote(); if (!button || !note) return;
    note.attachments = note.attachments.filter(function (file) { return file.id !== button.dataset.myNotesRemoveAttachment; });
    scheduleSave(note); renderAttachments(note);
  });

  $('[data-my-notes-delete]', workspace).addEventListener('click', function () {
    const note = activeNote(); if (!note || !window.confirm('Delete “' + note.title + '”?')) return;
    notes = notes.filter(function (item) { return item.id !== note.id; });
    activeNoteId = notes[0] ? notes[0].id : null;
    if (!notes.length) newNote({}); else { saveData(); renderAll(); }
  });

  $$('[data-my-notes-copy]', workspace).forEach(function (button) {
    button.addEventListener('click', function () {
      const note = activeNote(); if (!note) return;
      copyTargetKind = button.dataset.myNotesCopy;
      els.copyTitle.textContent = 'Add a copy to ' + copyTargetKind;
      els.copyKind.textContent = copyTargetKind;
      els.copyNote.textContent = note.title;
      els.copyRecord.innerHTML = copyTargets[copyTargetKind].map(function (record) { return '<option>' + escapeHtml(record) + '</option>'; }).join('');
      updateCopyDescription();
      els.copyDialog.hidden = false;
    });
  });
  $$('[data-my-notes-copy-close]', workspace).forEach(function (button) {
    button.addEventListener('click', function () { els.copyDialog.hidden = true; });
  });
  $$('[data-my-notes-copy-mode]', workspace).forEach(function (radio) { radio.addEventListener('change', updateCopyDescription); });
  function updateCopyDescription() {
    els.copyDescription.textContent = 'A copy of the note will be added. The private note stays in My Notes.';
  }
  $('[data-my-notes-copy-confirm]', workspace).addEventListener('click', function () {
    const note = activeNote(); if (!note || !copyTargetKind) return;
    const record = els.copyRecord.value;
    els.copyDialog.hidden = true;
    notify('Note copy added to ' + record + '. Your private original is unchanged.');
  });

  document.addEventListener('keydown', function (event) {
    if (workspace.hidden || !selectedBlockId || !['Delete', 'Backspace'].includes(event.key)) return;
    if (event.target.matches('input,textarea,[contenteditable="true"]')) return;
    event.preventDefault(); removeCanvasBlock(selectedBlockId);
  });

  loadData();
  renderAll();
})();
