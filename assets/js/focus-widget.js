(function () {
  'use strict';

  const root = document.getElementById('wequote-attention-widget');
  if (!root) return;

  const list = root.querySelector('[data-attention-list]');
  const modalLayer = document.querySelector('[data-attention-note-modal]');
  const composer = modalLayer && modalLayer.querySelector('[data-attention-composer]');
  const createButton = root.querySelector('[data-attention-create]');
  const scopeMenu = root.querySelector('[data-attention-scope-menu]');
  const noteTitle = composer && composer.querySelector('[data-attention-note-title]');
  const noteBody = composer && composer.querySelector('[data-attention-note-body]');
  const noteDate = composer && composer.querySelector('[data-attention-note-date]');
  const noteTime = composer && composer.querySelector('[data-attention-note-time]');
  const noteRecordTrigger = composer && composer.querySelector('[data-attention-note-record-trigger]');
  const noteRecordValue = composer && composer.querySelector('[data-attention-note-record-value]');
  const noteRecordAction = composer && composer.querySelector('[data-attention-note-record-action]');
  const noteContextLabel = composer && composer.querySelector('[data-attention-note-context]');
  const noteValidation = composer && composer.querySelector('[data-attention-note-validation]');
  const notePeoplePicker = composer && composer.querySelector('[data-attention-note-people-picker]');
  const notePeopleSearch = composer && composer.querySelector('[data-attention-note-people-search]');
  const notePeopleResults = composer && composer.querySelector('[data-attention-note-people-results]');
  const noteMentionToggle = composer && composer.querySelector('[data-attention-note-mention-toggle]');
  const followUpTypeButtons = composer ? Array.from(composer.querySelectorAll('[data-attention-followup-type]')) : [];
  const followUpPanels = composer ? Array.from(composer.querySelectorAll('[data-attention-followup-panel]')) : [];
  const meetingTitle = composer && composer.querySelector('[data-attention-meeting-title]');
  const meetingDate = composer && composer.querySelector('[data-attention-meeting-date]');
  const meetingTime = composer && composer.querySelector('[data-attention-meeting-time]');
  const meetingDuration = composer && composer.querySelector('[data-attention-meeting-duration]');
  const meetingMethod = composer && composer.querySelector('[data-attention-meeting-method]');
  const meetingMethodTitle = composer && composer.querySelector('[data-attention-meeting-method-title]');
  const meetingMethodSubtitle = composer && composer.querySelector('[data-attention-meeting-method-subtitle]');
  const meetingMethodDetail = composer && composer.querySelector('[data-attention-meeting-method-detail]');
  const meetingMethodLabel = composer && composer.querySelector('[data-attention-meeting-method-label]');
  const meetingMethodValue = composer && composer.querySelector('[data-attention-meeting-method-value]');
  const meetingAttendeesToggle = composer && composer.querySelector('[data-attention-meeting-attendees-toggle]');
  const meetingAttendeesLabel = composer && composer.querySelector('[data-attention-meeting-attendees-label]');
  const meetingAttendeesPicker = composer && composer.querySelector('[data-attention-meeting-attendees-picker]');
  const meetingAttendeeChips = composer && composer.querySelector('[data-attention-meeting-attendee-chips]');
  const meetingAgenda = composer && composer.querySelector('[data-attention-meeting-agenda]');
  const submitLabel = composer && composer.querySelector('[data-attention-submit-label]');
  const submitIcon = composer && composer.querySelector('[data-attention-submit-icon]');
  const recordPickerLayer = document.querySelector('[data-record-picker-modal]');
  const recordPickerSearch = recordPickerLayer && recordPickerLayer.querySelector('[data-record-picker-search]');
  const recordPickerResults = recordPickerLayer && recordPickerLayer.querySelector('[data-record-picker-results]');
  const recordPickerEmpty = recordPickerLayer && recordPickerLayer.querySelector('[data-record-picker-empty]');
  const recordPickerTitle = recordPickerLayer && recordPickerLayer.querySelector('[data-record-picker-results-title]');
  const recordPickerCount = recordPickerLayer && recordPickerLayer.querySelector('[data-record-picker-results-count]');
  const recordSearchScope = recordPickerLayer && recordPickerLayer.querySelector('[data-record-search-scope]');
  const toast = root.querySelector('[data-attention-toast]');
  const mini = root.querySelector('[data-attention-mini]');
  const dockResizer = root.querySelector('[data-attention-dock-resizer]');
  const mediumResizer = root.querySelector('[data-attention-medium-resizer]');
  const productivityTabs = Array.from(root.querySelectorAll('[data-attention-productivity-tab]'));
  const productivityPanels = Array.from(root.querySelectorAll('[data-attention-productivity-panel]'));
  const statusFilterButtons = Array.from(root.querySelectorAll('[data-attention-status-filter]'));
  const personalNoteEditor = root.querySelector('[data-personal-note-editor]');
  const personalNoteSaveStatus = root.querySelector('[data-personal-note-save-status]');
  const personalNoteTabStatus = root.querySelector('[data-personal-note-tab-status]');
  const personalNoteWordCount = root.querySelector('[data-personal-note-word-count]');
  const briefingLayer = document.querySelector('[data-attention-briefing]');
  const briefingSetup = briefingLayer && briefingLayer.querySelector('[data-briefing-setup]');
  const briefingDaily = briefingLayer && briefingLayer.querySelector('[data-briefing-daily]');
  const briefingSteps = briefingLayer ? Array.from(briefingLayer.querySelectorAll('[data-briefing-step]')) : [];
  const appShell = document.querySelector('.app');
  const navToggle = document.querySelector('.sidebar .collapse-btn');
  const LOCAL_STORAGE_KEY = 'wequote-attention-local-tasks-v2';
  const PLATFORM_NOTES_STORAGE_KEY = 'wequote-platform-record-notes-v1';
  const PLATFORM_MEETINGS_STORAGE_KEY = 'wequote-platform-record-meetings-v1';
  const LAYOUT_STORAGE_KEY = 'wequote-attention-widget-layout-v1';
  const PERSONAL_NOTE_STORAGE_KEY = 'wequote-productivity-personal-note-v1';
  const PRODUCTIVITY_TAB_STORAGE_KEY = 'wequote-productivity-active-tab-v1';
  const STATUS_FILTER_STORAGE_KEY = 'wequote-attention-status-filter-v1';
  const WIDGET_ENABLED_STORAGE_KEY = 'wequote-needs-attention-widget-enabled-v1';
  const GUIDE_STORAGE_KEY = 'wequote-productivity-guide-complete-v1';
  const DAILY_STORAGE_KEY = 'wequote-productivity-briefing-date-v1';
  const DAILY_DISABLED_STORAGE_KEY = 'wequote-productivity-briefing-disabled-v1';
  // Temporarily keep the first-use walkthrough out of the product while its
  // content and timing are under review. The guide markup and logic remain so
  // it can be restored without rebuilding the flow.
  const FIRST_USE_GUIDE_ENABLED = false;
  const DAILY_BRIEFING_ENABLED = false;
  const DOCK_MIN_WIDTH = 320;
  const DOCK_MAX_WIDTH = 720;
  const DOCK_MIN_VIEWPORT = 680;
  const MEDIUM_DEFAULT_WIDTH = 480;
  const MEDIUM_DEFAULT_HEIGHT = 340;
  const MEDIUM_MIN_WIDTH = 360;
  const MEDIUM_MIN_HEIGHT = 280;
  const QUICK_REPLY_MAX_ATTACHMENTS = 3;
  const QUICK_REPLY_PREVIEW_MAX_BYTES = 5 * 1024 * 1024;
  let tasks = [];
  let localTasks = [];
  let platformNotes = [];
  let platformMeetings = [];
  let currentScope = 'my';
  let currentStatusFilter = 'all';
  let openMenuId = null;
  let openInline = null;
  let openReactionId = null;
  let selectedTaskId = null;
  const completingTaskIds = new Set();
  const replyDrafts = Object.create(null);
  let undoAction = null;
  let toastTimer;
  let longPressTimer = null;
  let longPressFired = false;
  let widgetDrag = null;
  let widgetResize = null;
  let mediumResize = null;
  let suppressWidgetClickUntil = 0;
  let widgetLayout = {
    mode: 'floating',
    dockWidth: 560,
    mediumWidth: MEDIUM_DEFAULT_WIDTH,
    mediumHeight: MEDIUM_DEFAULT_HEIGHT,
    left: null,
    top: null
  };
  let widgetEnabled = true;
  let currentProductivityTab = 'attention';
  let personalNoteSaveTimer;
  let briefingMode = null;
  let briefingStep = 0;
  let briefingReturnFocus = null;
  let selectedNoteRecord = null;
  let recordPickerModule = 'all';
  let recordPickerReturnFocus = null;
  let noteMentionRange = null;
  let followUpType = 'note';
  let selectedMeetingAttendees = [];
  const NOTE_PEOPLE = ['Lee Roche', 'Dave Lombard', 'Cherin Joseph', 'Jeff Mitchel', 'Candy'];

  function crmApi() { return window.WeQuoteCrmAttention || null; }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function loadLocalTasks() {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      localTasks = Array.isArray(stored) ? stored : [];
      localTasks.forEach(function (task) {
        if (task.module === 'Personal Note') task.module = 'Personal task';
        if (task.module === 'CRM · Lead' || task.module === 'CRM · Deal') task.module = 'CRM';
        if (!task.sourceKind && !task.sourceType) task.sourceKind = 'personal-reminder';
      });
    } catch (_) { localTasks = []; }
  }

  function saveLocalTasks() {
    try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localTasks)); } catch (_) {}
  }

  function loadPlatformNotes() {
    try {
      const stored = JSON.parse(localStorage.getItem(PLATFORM_NOTES_STORAGE_KEY) || '[]');
      platformNotes = Array.isArray(stored) ? stored : [];
    } catch (_) { platformNotes = []; }
  }

  function savePlatformNotes() {
    try { localStorage.setItem(PLATFORM_NOTES_STORAGE_KEY, JSON.stringify(platformNotes)); } catch (_) {}
  }

  function loadPlatformMeetings() {
    try {
      const stored = JSON.parse(localStorage.getItem(PLATFORM_MEETINGS_STORAGE_KEY) || '[]');
      platformMeetings = Array.isArray(stored) ? stored : [];
    } catch (_) { platformMeetings = []; }
  }

  function savePlatformMeetings() {
    try { localStorage.setItem(PLATFORM_MEETINGS_STORAGE_KEY, JSON.stringify(platformMeetings)); } catch (_) {}
  }

  function personalNoteText() {
    return personalNoteEditor ? personalNoteEditor.innerText.replace(/\u00a0/g, ' ').trim() : '';
  }

  function updatePersonalNoteMeta(status) {
    const words = personalNoteText() ? personalNoteText().split(/\s+/).filter(Boolean).length : 0;
    if (personalNoteWordCount) personalNoteWordCount.textContent = words + ' ' + (words === 1 ? 'word' : 'words');
    if (personalNoteSaveStatus && status) personalNoteSaveStatus.textContent = status;
    if (personalNoteTabStatus) personalNoteTabStatus.textContent = status === 'Saving…' ? 'Private · saving…' : 'Private · autosaved';
  }

  function loadPersonalNote() {
    if (!personalNoteEditor) return;
    try { personalNoteEditor.innerHTML = localStorage.getItem(PERSONAL_NOTE_STORAGE_KEY) || ''; } catch (_) {}
    updatePersonalNoteMeta('Saved just now');
  }

  function savePersonalNote() {
    if (!personalNoteEditor) return;
    try { localStorage.setItem(PERSONAL_NOTE_STORAGE_KEY, personalNoteEditor.innerHTML); } catch (_) {}
    updatePersonalNoteMeta('Saved just now');
  }

  function selectProductivityTab(name, persist) {
    const next = name === 'note' ? 'note' : 'attention';
    currentProductivityTab = next;
    productivityTabs.forEach(function (button) {
      const active = button.dataset.attentionProductivityTab === next;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    productivityPanels.forEach(function (panel) {
      const active = panel.dataset.attentionProductivityPanel === next;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    root.setAttribute('aria-label', next === 'note' ? 'My Notes' : 'Needs Your Attention');
    scopeMenu.hidden = true;
    setComposerOpen(false, false);
    closeActions();
    if (persist !== false) {
      try { localStorage.setItem(PRODUCTIVITY_TAB_STORAGE_KEY, next); } catch (_) {}
    }
  }

  function reloadTasks() {
    const api = crmApi();
    const crmTasks = api && typeof api.list === 'function' ? api.list() : [];
    tasks = crmTasks.concat(localTasks);
    render();
  }

  function visibleTasks() {
    return tasks.filter(function (task) { return (task.scopes || ['my', 'team']).indexOf(currentScope) !== -1; });
  }

  function scopeTasks(scope) {
    return tasks.filter(function (task) {
      return !task.done && (task.scopes || ['my', 'team']).indexOf(scope) !== -1;
    });
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  function localDateKey() {
    const now = new Date();
    return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  }

  function briefingUserName() {
    return root.dataset.currentUser || 'Candy';
  }

  function greetingForNow() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return greeting + ', ' + briefingUserName();
  }

  function showBriefingStep(index) {
    briefingStep = Math.max(0, Math.min(briefingSteps.length - 1, Number(index) || 0));
    briefingSteps.forEach(function (step, stepIndex) {
      const active = stepIndex === briefingStep;
      step.hidden = !active;
      step.classList.toggle('active', active);
    });
    const progress = briefingLayer.querySelector('[data-briefing-progress]');
    const previous = briefingLayer.querySelector('[data-briefing-previous]');
    const next = briefingLayer.querySelector('[data-briefing-next]');
    const start = briefingLayer.querySelector('[data-briefing-start]');
    if (progress) progress.textContent = 'Getting started · ' + (briefingStep + 1) + ' of ' + briefingSteps.length;
    if (previous) previous.hidden = briefingStep === 0;
    if (next) next.hidden = briefingStep === briefingSteps.length - 1;
    if (start) start.hidden = briefingStep !== briefingSteps.length - 1;
    const heading = briefingSteps[briefingStep] && briefingSteps[briefingStep].querySelector('h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  function countBriefingNumber(element, target) {
    if (!element) return;
    const value = Math.max(0, Number(target) || 0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || value === 0) {
      element.textContent = value;
      return;
    }
    const startedAt = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - startedAt) / 520);
      element.textContent = Math.round(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1 && briefingMode === 'daily') requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderDailyBriefing() {
    if (!briefingLayer) return;
    const canViewTeam = root.dataset.canViewTeam !== 'false';
    const counts = {
      my: scopeTasks('my').length,
      assigned: scopeTasks('assigned').length,
      team: canViewTeam ? scopeTasks('team').length : 0
    };
    const greeting = briefingLayer.querySelector('[data-briefing-greeting]');
    if (greeting) greeting.textContent = greetingForNow();
    Object.keys(counts).forEach(function (scope) {
      const count = briefingLayer.querySelector('[data-briefing-count="' + scope + '"]');
      countBriefingNumber(count, counts[scope]);
    });
    const teamButton = briefingLayer.querySelector('[data-briefing-scope="team"]');
    if (teamButton) teamButton.hidden = !canViewTeam;

    const priorityList = briefingLayer.querySelector('[data-briefing-priority-list]');
    const prioritySummary = briefingLayer.querySelector('[data-briefing-priority-summary]');
    const priorities = scopeTasks('my').slice().sort(function (a, b) {
      const aTime = new Date(a.dueAt || 8640000000000000).getTime();
      const bTime = new Date(b.dueAt || 8640000000000000).getTime();
      return (Number.isNaN(aTime) ? 8640000000000000 : aTime) - (Number.isNaN(bTime) ? 8640000000000000 : bTime);
    }).slice(0, 4);
    if (prioritySummary) prioritySummary.textContent = priorities.length ? 'Top ' + priorities.length : 'Nothing urgent';
    if (!priorities.length) {
      priorityList.innerHTML = '<div class="attention-briefing-empty"><i class="fa-regular fa-circle-check" aria-hidden="true"></i><strong>You’re all caught up</strong><span>No items need you right now.</span></div>';
    } else {
      priorityList.innerHTML = priorities.map(function (task, index) {
        return '<div class="attention-briefing-priority" style="--priority-index:' + index + '">' +
          '<span class="priority-check" aria-hidden="true"></span><div><strong>' + escapeHtml(task.title) + '</strong><small>' +
          escapeHtml([task.itemType || task.module, task.when, task.record].filter(Boolean).join(' · ')) +
          '</small></div><span>' + escapeHtml(task.module || 'Task') + '</span></div>';
      }).join('');
    }
    const viewAll = briefingLayer.querySelector('[data-briefing-view-all]');
    if (viewAll) viewAll.textContent = counts.my ? 'View all ' + counts.my + ' item' + (counts.my === 1 ? '' : 's') : 'Open Dock';
  }

  function openBriefing(mode) {
    if (!briefingLayer) return;
    if (mode === 'daily' && !DAILY_BRIEFING_ENABLED) return;
    if (mode !== 'daily' && !FIRST_USE_GUIDE_ENABLED) return;
    briefingMode = mode === 'daily' ? 'daily' : 'setup';
    briefingReturnFocus = document.activeElement;
    briefingLayer.hidden = false;
    briefingLayer.setAttribute('aria-hidden', 'false');
    briefingLayer.classList.remove('is-departing');
    document.body.classList.add('attention-briefing-open');
    root.classList.add('is-briefing-suppressed');
    briefingSetup.hidden = briefingMode !== 'setup';
    briefingDaily.hidden = briefingMode !== 'daily';
    const progress = briefingLayer.querySelector('[data-briefing-progress]');
    if (progress) progress.textContent = briefingMode === 'daily' ? 'Once-a-day summary' : 'Getting started · 1 of 3';
    briefingLayer.querySelectorAll('[data-briefing-user]').forEach(function (node) { node.textContent = briefingUserName(); });
    if (briefingMode === 'setup') showBriefingStep(0);
    else renderDailyBriefing();
    requestAnimationFrame(function () {
      briefingLayer.classList.add('is-visible');
      const focusTarget = briefingMode === 'setup'
        ? briefingSteps[0].querySelector('h2')
        : briefingLayer.querySelector('[data-briefing-greeting]');
      if (focusTarget) {
        focusTarget.setAttribute('tabindex', '-1');
        focusTarget.focus({ preventScroll: true });
      }
    });
  }

  function settleBriefingAtDock(destination) {
    root.classList.remove('is-briefing-suppressed');
    if (destination === 'list') {
      widgetLayout.mode = 'floating';
      widgetLayout.left = null;
      widgetLayout.top = null;
      undockWidget(false, false);
      resetFloatingPosition();
      saveWidgetLayout();
      selectProductivityTab('attention');
      expandList();
    } else {
      currentScope = 'my';
      const scopeTitle = root.querySelector('[data-attention-scope-title]');
      if (scopeTitle) scopeTitle.textContent = 'My attention';
      widgetLayout.mode = 'floating';
      widgetLayout.left = null;
      widgetLayout.top = null;
      undockWidget(false, true);
      resetFloatingPosition();
      saveWidgetLayout();
      root.classList.add('is-collapsed');
      render();
    }
    root.classList.add('attention-briefing-arrived');
    window.setTimeout(function () { root.classList.remove('attention-briefing-arrived'); }, 850);
  }

  function closeBriefing(destination) {
    if (!briefingLayer || briefingLayer.hidden) return;
    if (briefingMode === 'setup') {
      storageSet(GUIDE_STORAGE_KEY, 'true');
      storageSet(DAILY_STORAGE_KEY, localDateKey());
    } else {
      storageSet(DAILY_STORAGE_KEY, localDateKey());
      const disable = briefingLayer.querySelector('[data-briefing-disable]');
      if (disable && disable.checked) storageSet(DAILY_DISABLED_STORAGE_KEY, 'true');
    }
    briefingLayer.classList.add('is-departing');
    briefingLayer.classList.remove('is-visible');
    window.setTimeout(function () {
      briefingLayer.hidden = true;
      briefingLayer.setAttribute('aria-hidden', 'true');
      briefingLayer.classList.remove('is-departing');
      document.body.classList.remove('attention-briefing-open');
      settleBriefingAtDock(destination);
      briefingMode = null;
      if (briefingReturnFocus && typeof briefingReturnFocus.focus === 'function' && destination !== 'list') {
        briefingReturnFocus.focus({ preventScroll: true });
      }
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 520);
  }

  function initializeBriefing() {
    if (!briefingLayer) return;
    if (!FIRST_USE_GUIDE_ENABLED && !DAILY_BRIEFING_ENABLED) return;
    const forced = new URLSearchParams(window.location.search).get('briefing');
    if (forced === 'setup') {
      if (FIRST_USE_GUIDE_ENABLED) openBriefing('setup');
      return;
    }
    if (forced === 'daily') {
      openBriefing('daily');
      return;
    }
    if (FIRST_USE_GUIDE_ENABLED && storageGet(GUIDE_STORAGE_KEY) !== 'true') {
      openBriefing('setup');
      return;
    }
    if (storageGet(DAILY_DISABLED_STORAGE_KEY) !== 'true' && storageGet(DAILY_STORAGE_KEY) !== localDateKey()) {
      openBriefing('daily');
    }
  }

  function datetimeLocalValue(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
  }

  function quickReplyFileSize(bytes) {
    const size = Number(bytes) || 0;
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return Math.max(1, Math.round(size / 1024)) + ' KB';
    return (size / (1024 * 1024)).toFixed(size < 10 * 1024 * 1024 ? 1 : 0) + ' MB';
  }

  function quickReplyAttachmentHtml(file, index) {
    const preview = file.isImage && file.dataUrl
      ? '<img src="' + escapeHtml(file.dataUrl) + '" alt="Preview of ' + escapeHtml(file.name) + '">'
      : '<span class="attention-task-attachment-icon" aria-hidden="true">' + (file.loading ? '…' : '📎') + '</span>';
    return '<span class="attention-task-attachment' + (file.isImage ? ' is-image' : '') + '">' +
      preview +
      '<span class="attention-task-attachment-copy"><b>' + escapeHtml(file.name) + '</b><small>' +
        (file.loading ? 'Preparing preview…' : quickReplyFileSize(file.size)) + '</small></span>' +
      '<button type="button" data-attention-attachment-remove="' + index + '" aria-label="Remove ' + escapeHtml(file.name) + '">×</button>' +
    '</span>';
  }

  function renderQuickReplyAttachments(form) {
    const holder = form && form.querySelector('[data-attention-attachments]');
    if (!holder) return;
    const attachments = form._attentionAttachments || [];
    holder.hidden = attachments.length === 0;
    holder.innerHTML = attachments.map(quickReplyAttachmentHtml).join('');
  }

  function quickReplyAttachmentRecord(file) {
    const isImage = /^image\//i.test(file.type || '') || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name || '');
    const record = {
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size || 0,
      isImage: isImage,
      dataUrl: '',
      loading: isImage && file.size <= QUICK_REPLY_PREVIEW_MAX_BYTES
    };
    if (!record.loading) return Promise.resolve(record);
    return new Promise(function (resolve) {
      const reader = new FileReader();
      reader.onload = function () {
        record.dataUrl = typeof reader.result === 'string' ? reader.result : '';
        record.loading = false;
        resolve(record);
      };
      reader.onerror = function () {
        record.loading = false;
        resolve(record);
      };
      reader.readAsDataURL(file);
    });
  }

  function inlineForm(task) {
    if (!openInline || openInline.id !== task.id || openInline.type !== 'reschedule') return '';
    const reopening = Boolean(openInline.reopen);
    const dueTimestamp = Date.parse(task.dueAt || '');
    const expired = reopening && !Number.isNaN(dueTimestamp) && dueTimestamp <= Date.now();
    const defaultDueAt = expired ? new Date(Date.now() + 30 * 60000).toISOString() : task.dueAt;
    const minimum = reopening ? ' min="' + escapeHtml(datetimeLocalValue(new Date())) + '"' : '';
    return '<form class="attention-inline-form" data-attention-reschedule-form>' +
      '<label>New date and time<input data-attention-reschedule-value type="datetime-local" value="' + escapeHtml(datetimeLocalValue(defaultDueAt)) + '"' + minimum + ' required></label>' +
      '<div><button type="button" data-attention-inline-cancel>Cancel</button><button class="primary" type="submit">' + (reopening ? 'Reschedule & reopen' : 'Save') + '</button></div></form>';
  }

  function taskTools(task) {
    const isReplying = Boolean(openInline && openInline.id === task.id && openInline.type === 'reply');
    const isRescheduling = Boolean(openInline && openInline.id === task.id && openInline.type === 'reschedule');
    const preview = task.preview ? '<div class="attention-task-context"><p>' + escapeHtml(task.preview) + '</p><span>' + escapeHtml([task.author, task.createdAt ? new Date(task.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '', task.replyCount ? task.replyCount + ' replies' : '', task.attachmentCount ? task.attachmentCount + ' files' : ''].filter(Boolean).join(' · ')) + '</span></div>' : '';
    const reply = task.canReply && isReplying ? '<form class="attention-task-quick-reply" data-attention-reply-form>' +
      '<label><span class="sr-only">Quick reply to ' + escapeHtml(task.title) + '</span><input data-attention-reply-text type="text" value="' + escapeHtml(replyDrafts[task.id] || '') + '" placeholder="Write a quick reply…" required></label>' +
      '<button class="attention-task-send" type="submit">Send</button>' +
      '<div class="attention-task-reply-options">' +
        '<div class="attention-task-reactions" aria-label="Quick reactions">' +
          '<button type="button" data-attention-reaction="👍" aria-label="React with thumbs up">👍</button>' +
          '<button type="button" data-attention-reaction="❤️" aria-label="React with heart">❤️</button>' +
          '<button type="button" data-attention-reaction="✅" aria-label="React with check mark">✅</button>' +
          '<button type="button" data-attention-reaction="👀" aria-label="React with eyes">👀</button>' +
        '</div>' +
        '<div class="attention-task-reply-actions">' +
          '<button type="button" data-attention-mention-toggle aria-expanded="false"><span aria-hidden="true">@</span> Tag person</button>' +
          '<label class="attention-task-file-picker"><input data-attention-attachment-input type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" aria-label="Add file"><span aria-hidden="true">📎</span><span>Add file</span></label>' +
        '</div>' +
      '</div>' +
      '<div class="attention-task-mention-picker" data-attention-mention-picker hidden>' +
        '<span>Tag a teammate</span>' +
        '<button type="button" data-attention-mention-person="Lee Roche">LR <b>Lee Roche</b></button>' +
        '<button type="button" data-attention-mention-person="Dave Lombard">DL <b>Dave Lombard</b></button>' +
        '<button type="button" data-attention-mention-person="Cherin Joseph">CJ <b>Cherin Joseph</b></button>' +
        '<button type="button" data-attention-mention-person="Candy">C <b>Candy</b></button>' +
      '</div>' +
      '<div class="attention-task-attachments" data-attention-attachments hidden aria-live="polite"></div></form>' : '';
    return '<div class="attention-task-tools" aria-label="Actions for ' + escapeHtml(task.title) + '">' +
      preview + reply + inlineForm(task) + '</div>';
  }

  function actionMenu(task) {
    if (openMenuId !== task.id) return '';
    return '<div class="attention-action-menu" role="menu">' +
      '<button data-attention-open-record type="button"><span>Open ' + (task.sourceType === 'lead' ? 'Lead' : task.sourceType === 'deal' ? 'Deal' : 'item') + '</span><span>↗</span></button>' +
      (task.canReply ? '<button data-attention-inline-action="reply" type="button"><span>Quick reply</span><span>↩</span></button>' : '') +
      (task.canReschedule ? '<button data-attention-inline-action="reschedule" type="button"><span>Reschedule</span><span>▣</span></button>' : '') +
      '<button class="danger" data-attention-dismiss type="button"><span>Dismiss from widget</span></button></div>';
  }

  function hoverActions(task) {
    const actions = [];
    if (task.canReply) {
      actions.push('<button class="attention-hover-action" data-attention-inline-action="reply" data-tooltip="Quick reply" type="button" aria-label="Quick reply"><i class="fa-solid fa-reply" aria-hidden="true"></i></button>');
      actions.push('<button class="attention-hover-action" data-attention-inline-action="react" data-tooltip="React" type="button" aria-label="React" aria-haspopup="menu" aria-expanded="' + String(openReactionId === task.id) + '"><i class="fa-regular fa-face-smile" aria-hidden="true"></i></button>');
    } else if (!task.done && task.canComplete !== false) {
      actions.push('<button class="attention-hover-action" data-attention-hover-complete data-tooltip="Mark complete" type="button" aria-label="Mark complete"><i class="fa-solid fa-check" aria-hidden="true"></i></button>');
    }
    if (!task.done && task.canReschedule) {
      actions.push('<button class="attention-hover-action" data-attention-inline-action="reschedule" data-tooltip="Reschedule" type="button" aria-label="Reschedule"><i class="fa-regular fa-calendar" aria-hidden="true"></i></button>');
    }
    return '<div class="attention-task-hover-actions" aria-label="Quick actions for ' + escapeHtml(task.title) + '">' + actions.join('') +
      '<button class="attention-more-button" data-attention-more type="button" aria-label="More actions for ' + escapeHtml(task.title) + '" aria-haspopup="menu" aria-expanded="' + String(openMenuId === task.id) + '">···</button></div>';
  }

  function reactionPopover(task) {
    if (!task.canReply || openReactionId !== task.id) return '';
    return '<div class="attention-reaction-popover" role="menu" aria-label="React to ' + escapeHtml(task.title) + '">' +
      '<button type="button" role="menuitem" data-attention-reaction="👍" aria-label="React with thumbs up">👍</button>' +
      '<button type="button" role="menuitem" data-attention-reaction="❤️" aria-label="React with heart">❤️</button>' +
      '<button type="button" role="menuitem" data-attention-reaction="✅" aria-label="React with check mark">✅</button>' +
      '<button type="button" role="menuitem" data-attention-reaction="👀" aria-label="React with eyes">👀</button></div>';
  }

  function taskTimingMeta(task) {
    const rawTimestamp = task.done ? task.completedAt : task.dueAt;
    const timestamp = Date.parse(rawTimestamp || '');
    let status = task.done ? 'completed' : (Number.isNaN(timestamp) ? 'due' : (timestamp < Date.now() ? 'overdue' : 'due'));
    let label = status === 'completed' ? 'Completed' : (status === 'overdue' ? 'Overdue' : 'Due');
    let detail = '';
    if (!Number.isNaN(timestamp)) {
      const date = new Date(timestamp);
      detail = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' · ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } else {
      const fallback = String(task.when || '').trim();
      const match = fallback.match(/^(Overdue|Due|Completed)\s*·\s*(.*)$/i);
      if (match) {
        label = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
        status = label.toLowerCase();
        detail = match[2];
      } else {
        detail = fallback;
      }
    }
    return { status: status, label: label, detail: detail };
  }

  function taskRow(task) {
    const inlineOpen = Boolean(openInline && openInline.id === task.id);
    const isSelected = String(selectedTaskId) === String(task.id);
    const reactionsOpen = openReactionId === task.id;
    const isCompleting = completingTaskIds.has(String(task.id));
    const timing = taskTimingMeta(task);
    const scheduledDue = task.sourceKind !== 'mention' ? Date.parse(task.dueAt || '') : NaN;
    const requiresReschedule = task.done && !Number.isNaN(scheduledDue) && scheduledDue <= Date.now();
    const metaText = [task.itemType, timing.label, timing.detail, task.record].filter(Boolean).join(' · ');
    const timingMarkup = '<span class="attention-task-status ' + escapeHtml(timing.status) + '">' + escapeHtml(timing.label) + '</span>' +
      (timing.detail ? '<span class="attention-meta-separator">·</span><span>' + escapeHtml(timing.detail) + '</span>' : '');
    const checkboxLabel = task.done
      ? (requiresReschedule ? 'Reschedule and reopen ' + task.title : 'Reopen ' + task.title)
      : (isCompleting ? 'Completing ' + task.title : 'Mark ' + task.title + ' complete');
    const checkboxDisabled = task.done ? task.canReopen === false : task.canComplete === false;
    return '<div class="attention-task' + (task.done ? ' completed' : '') + (isCompleting ? ' is-completing' : '') + (inlineOpen ? ' has-open-inline' : '') + (inlineOpen || isSelected ? ' is-selected' : '') + (reactionsOpen ? ' has-open-reactions' : '') + '" data-attention-id="' + escapeHtml(task.id) + '"' + (isCompleting ? ' aria-busy="true"' : '') + '>' +
      '<input class="attention-checkbox" type="checkbox" aria-label="' + escapeHtml(checkboxLabel) + '" ' + (task.done || isCompleting ? 'checked' : '') + (checkboxDisabled || isCompleting ? ' disabled' : '') + '>' +
      '<div class="attention-task-main" data-attention-select>' +
        '<button class="attention-task-title" data-attention-open-record type="button" title="' + escapeHtml(task.title) + '">' + escapeHtml(task.title) + '</button>' +
        '<button class="attention-task-meta" data-attention-select type="button" title="' + escapeHtml(task.module + ' · ' + metaText) + '"><span class="attention-tag ' + escapeHtml(task.tag || '') + '">' + escapeHtml(task.module) + '</span>' +
        '<span>' + escapeHtml(task.itemType || 'Task') + '</span><span class="attention-meta-separator">·</span>' + timingMarkup + (task.record ? '<span class="attention-meta-separator">·</span><span class="attention-task-record">' + escapeHtml(task.record) + '</span>' : '') + '</button></div>' +
      hoverActions(task) + reactionPopover(task) +
      actionMenu(task) + taskTools(task) + '</div>';
  }

  function emptyStateHtml(type) {
    const completedOnly = type === 'completed';
    const title = completedOnly ? 'No completed follow-ups' : (type === 'open' ? 'All caught up' : 'No follow-ups yet');
    const detail = completedOnly
      ? 'Completed items will remain available here.'
      : (type === 'open' ? 'There are no open follow-ups in this view.' : 'Create your first follow-up to keep the next action visible.');
    const action = completedOnly ? '' : '<button data-attention-empty-create type="button"><i class="fa-solid fa-plus" aria-hidden="true"></i>Create follow-up</button>';
    return '<div class="attention-empty"><span class="attention-empty-icon" aria-hidden="true"><i class="fa-regular fa-circle-check"></i></span><strong>' + title + '</strong><span>' + detail + '</span>' + action + '</div>';
  }

  function render() {
    const visible = visibleTasks();
    const open = visible.filter(function (task) { return !task.done; });
    const done = visible.filter(function (task) { return task.done; });
    const filtered = currentStatusFilter === 'open' ? open : (currentStatusFilter === 'completed' ? done : open.concat(done));
    const nextTask = open[0];
    const miniLabel = root.querySelector('[data-attention-mini-label]');
    const miniMore = root.querySelector('[data-attention-mini-more]');
    const openLabel = open.length + ' ' + (open.length === 1 ? 'item' : 'items');
    const statusCounts = { all: visible.length, open: open.length, completed: done.length };
    statusFilterButtons.forEach(function (button) {
      const status = button.dataset.attentionStatusFilter;
      const active = status === currentStatusFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
      const count = button.querySelector('[data-attention-status-count]');
      if (count) count.textContent = statusCounts[status];
    });
    if (selectedTaskId && !filtered.some(function (task) { return String(task.id) === String(selectedTaskId); })) selectedTaskId = null;

    root.querySelector('[data-attention-open-summary]').textContent = openLabel + ' · updated just now';
    const tabSummary = root.querySelector('[data-attention-tab-summary]');
    if (tabSummary) tabSummary.textContent = openLabel;
    miniLabel.textContent = open.length ? open.length + ' Follow-up' : 'All caught up';
    mini.classList.toggle('is-clear', !nextTask);
    root.classList.toggle('has-no-open-items', !nextTask);
    mini.setAttribute('aria-label', open.length ? 'Follow-up Dock with ' + openLabel : 'Follow-up Dock, all caught up');
    miniMore.disabled = false;
    miniMore.setAttribute('aria-label', 'Open medium Dock');
    miniMore.setAttribute('title', 'Open medium Dock');

    if (!visible.length) {
      list.innerHTML = emptyStateHtml('all');
      return;
    }
    if (!filtered.length) {
      list.innerHTML = currentStatusFilter === 'completed'
        ? emptyStateHtml('completed')
        : emptyStateHtml('open');
      return;
    }
    list.innerHTML = filtered.map(taskRow).join('');
  }

  function notify(message) {
    undoAction = null;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2300);
  }

  function showUndo(message, action) {
    undoAction = action;
    toast.innerHTML = '<span>' + escapeHtml(message) + '</span><button data-attention-undo type="button">Undo</button>';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
      undoAction = null;
    }, 5000);
  }

  function mapIsVisible() {
    const map = document.getElementById('autSemanticMap');
    const controls = map && map.querySelector('.aut-map-controls');
    return Boolean(map && controls && map.offsetParent !== null && controls.offsetParent !== null);
  }

  function updateFloatingPosition() {
    const manuallyPositioned = root.style.left && root.style.left !== 'auto';
    root.classList.toggle('is-over-map-controls', !root.classList.contains('is-docked') && !manuallyPositioned && mapIsVisible());
  }

  function loadWidgetLayout() {
    try {
      const saved = JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object') {
        widgetLayout.mode = saved.mode === 'docked' ? 'docked' : (saved.mode === 'medium' ? 'medium' : 'floating');
        widgetLayout.dockWidth = Number(saved.dockWidth) || widgetLayout.dockWidth;
        widgetLayout.mediumWidth = Math.min(Number(saved.mediumWidth) || widgetLayout.mediumWidth, MEDIUM_DEFAULT_WIDTH);
        widgetLayout.mediumHeight = Math.min(Number(saved.mediumHeight) || widgetLayout.mediumHeight, MEDIUM_DEFAULT_HEIGHT);
        widgetLayout.left = Number.isFinite(Number(saved.left)) ? Number(saved.left) : null;
        widgetLayout.top = Number.isFinite(Number(saved.top)) ? Number(saved.top) : null;
      }
    } catch (_) {}
  }

  function saveWidgetLayout() {
    try { localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(widgetLayout)); } catch (_) {}
  }

  function dockWidthBounds() {
    return {
      min: Math.min(DOCK_MIN_WIDTH, Math.max(280, window.innerWidth - 120)),
      max: Math.max(DOCK_MIN_WIDTH, Math.min(DOCK_MAX_WIDTH, window.innerWidth - 160))
    };
  }

  function setDockWidth(width, persist) {
    const bounds = dockWidthBounds();
    const next = Math.round(Math.max(bounds.min, Math.min(bounds.max, Number(width) || 390)));
    widgetLayout.dockWidth = next;
    document.body.style.setProperty('--attention-dock-width', next + 'px');
    root.style.setProperty('--attention-dock-width', next + 'px');
    if (persist) saveWidgetLayout();
  }

  function mediumSizeBounds(maxWidth, maxHeight) {
    const viewportWidth = Math.max(280, (Number(maxWidth) || window.innerWidth - 16));
    const viewportHeight = Math.max(320, (Number(maxHeight) || window.innerHeight - 16));
    return {
      minWidth: Math.min(MEDIUM_MIN_WIDTH, viewportWidth),
      maxWidth: viewportWidth,
      minHeight: Math.min(MEDIUM_MIN_HEIGHT, viewportHeight),
      maxHeight: viewportHeight
    };
  }

  function setMediumSize(width, height, persist, maxWidth, maxHeight) {
    const bounds = mediumSizeBounds(maxWidth, maxHeight);
    const nextWidth = Math.round(Math.max(bounds.minWidth, Math.min(bounds.maxWidth, Number(width) || MEDIUM_DEFAULT_WIDTH)));
    const nextHeight = Math.round(Math.max(bounds.minHeight, Math.min(bounds.maxHeight, Number(height) || MEDIUM_DEFAULT_HEIGHT)));
    widgetLayout.mediumWidth = nextWidth;
    widgetLayout.mediumHeight = nextHeight;
    root.style.setProperty('--attention-medium-width', nextWidth + 'px');
    root.style.setProperty('--attention-medium-height', nextHeight + 'px');
    if (persist) saveWidgetLayout();
  }

  function floatingBounds(left, top) {
    const margin = 8;
    const medium = root.classList.contains('is-medium-panel');
    // Use the requested medium-panel size instead of its animated size. During
    // page restore the width transition can otherwise report a different
    // measurement from one frame to the next and clamp the saved position.
    const renderedMediumWidth = Math.min(widgetLayout.mediumWidth, window.innerWidth - margin * 2);
    const renderedMediumHeight = Math.min(widgetLayout.mediumHeight, window.innerHeight - margin * 3);
    const width = Math.min(medium ? renderedMediumWidth : (root.offsetWidth || 462), window.innerWidth - margin * 2);
    const height = Math.min(medium ? renderedMediumHeight : (root.offsetHeight || 78), window.innerHeight - margin * 2);
    return {
      left: Math.round(Math.max(margin, Math.min(window.innerWidth - width - margin, Number(left) || margin))),
      top: Math.round(Math.max(margin, Math.min(window.innerHeight - height - margin, Number(top) || margin)))
    };
  }

  function setFloatingPosition(left, top, persist) {
    const position = floatingBounds(left, top);
    root.style.left = position.left + 'px';
    root.style.top = position.top + 'px';
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    widgetLayout.left = position.left;
    widgetLayout.top = position.top;
    root.classList.remove('is-over-map-controls');
    if (persist) saveWidgetLayout();
  }

  function resetFloatingPosition() {
    root.style.removeProperty('left');
    root.style.removeProperty('top');
    root.style.removeProperty('right');
    root.style.removeProperty('bottom');
  }

  function syncNavigationToggleLabel(compact) {
    if (!navToggle) return;
    navToggle.setAttribute('role', 'button');
    navToggle.setAttribute('tabindex', '0');
    navToggle.setAttribute('aria-label', compact ? 'Expand navigation and float attention widget' : 'Collapse navigation');
    navToggle.setAttribute('title', compact ? 'Expand navigation and float attention widget' : 'Collapse navigation');
  }

  function syncDockToggleControls() {
    const docked = root.classList.contains('is-docked');
    root.querySelectorAll('[data-attention-dock-toggle]').forEach(function (button) {
      const label = docked ? 'Float panel' : 'Dock to right';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(docked));
      const icon = button.querySelector('i');
      if (icon) icon.className = docked ? 'fa-regular fa-window-restore' : 'fa-solid fa-table-columns';
    });
  }

  function dockWidget(persist) {
    if (window.innerWidth < DOCK_MIN_VIEWPORT) return;
    widgetLayout.mode = 'docked';
    resetFloatingPosition();
    setDockWidth(widgetLayout.dockWidth, false);
    root.classList.add('is-docked', 'is-opening');
    root.classList.remove('is-medium-panel', 'is-collapsed', 'is-collapsing', 'is-over-map-controls', 'is-dock-candidate');
    root.querySelectorAll('[data-attention-collapse]').forEach(function (button) { button.setAttribute('aria-expanded', 'true'); });
    document.body.classList.add('attention-widget-docked');
    document.body.classList.remove('attention-widget-dock-ready', 'attention-widget-dragging');
    if (appShell) appShell.classList.add('attention-widget-docked', 'attention-nav-compact');
    syncNavigationToggleLabel(true);
    syncDockToggleControls();
    closeActions();
    if (persist !== false) saveWidgetLayout();
    window.setTimeout(function () { root.classList.remove('is-opening'); }, 360);
  }

  function undockWidget(persist, collapse) {
    const wasDocked = root.classList.contains('is-docked');
    widgetLayout.mode = 'floating';
    root.classList.remove('is-docked', 'is-medium-panel', 'is-dock-candidate', 'is-resizing');
    document.body.classList.remove('attention-widget-docked', 'attention-widget-dock-ready', 'attention-widget-dragging');
    if (appShell) appShell.classList.remove('attention-widget-docked', 'attention-nav-compact');
    syncNavigationToggleLabel(false);
    syncDockToggleControls();
    if (collapse !== false) {
      root.classList.add('is-collapsed');
      root.querySelectorAll('[data-attention-collapse]').forEach(function (button) { button.setAttribute('aria-expanded', 'false'); });
    }
    if (wasDocked && collapse !== false) {
      // Leaving the Side Panel always parks the compact Dock safely at the
      // current viewport's bottom-right. Do not reuse a stale dragged position
      // that may have been saved on a larger screen.
      // Reset to the CSS right/bottom anchors. Measuring immediately after
      // removing `is-docked` can still return the old Side Panel width during
      // its transition and place the compact controls outside the viewport.
      resetFloatingPosition();
      widgetLayout.left = null;
      widgetLayout.top = null;
    } else if (widgetLayout.left != null && widgetLayout.top != null) {
      setFloatingPosition(widgetLayout.left, widgetLayout.top, false);
    } else {
      resetFloatingPosition();
    }
    updateFloatingPosition();
    if (persist !== false) saveWidgetLayout();
  }

  function restoreWidgetLayout() {
    if (widgetLayout.mode === 'docked' && window.innerWidth >= DOCK_MIN_VIEWPORT) dockWidget(false);
    else if (widgetLayout.mode === 'medium') openMediumSidePanel(currentProductivityTab, false);
    else {
      widgetLayout.mode = 'floating';
      if (widgetLayout.left != null && widgetLayout.top != null) setFloatingPosition(widgetLayout.left, widgetLayout.top, false);
      updateFloatingPosition();
    }
  }

  function setWidgetAvailability(enabled) {
    widgetEnabled = enabled !== false;
    document.documentElement.classList.toggle('attention-widget-pref-disabled', !widgetEnabled);
    root.classList.toggle('is-user-disabled', !widgetEnabled);

    if (!widgetEnabled) {
      if (!modalLayer.hidden || !recordPickerLayer.hidden) closeEntireNoteFlow(false);
      closeActions();
      // Preserve widgetLayout so re-enabling returns to the user's previous
      // floating, medium, or docked state, while removing every live layout
      // class that would otherwise keep the main application narrowed.
      root.classList.remove('is-docked', 'is-medium-panel', 'is-opening', 'is-collapsing', 'is-dock-candidate', 'is-resizing');
      resetFloatingPosition();
      document.body.classList.remove('attention-widget-docked', 'attention-widget-dock-ready', 'attention-widget-dragging', 'attention-widget-resizing');
      if (appShell) appShell.classList.remove('attention-widget-docked', 'attention-nav-compact');
      syncNavigationToggleLabel(false);
      syncDockToggleControls();
      return;
    }

    restoreWidgetLayout();
    syncDockToggleControls();
    reloadTasks();
  }

  function startWidgetDrag(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('.attention-toast,.attention-dock-resizer,.attention-medium-resizer,[role="menu"],.attention-mini-more,[data-attention-mini-create],[data-attention-dock-toggle],[data-attention-collapse],[data-attention-create],[data-attention-empty-create],[data-attention-status-filter],.personal-note-editor,.personal-note-toolbar,.my-notes-quick-capture,.my-notes-recent-card,.my-notes-view-all,.my-notes-dock .attention-icon-button')) return;
    const rect = root.getBoundingClientRect();
    widgetDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startLeft: rect.left,
      startTop: rect.top,
      wasDocked: root.classList.contains('is-docked'),
      wasMedium: root.classList.contains('is-medium-panel'),
      moved: false,
      dockReady: false
    };
  }

  function moveWidgetDrag(event) {
    if (!widgetDrag || widgetDrag.pointerId !== event.pointerId) return;
    const dx = event.clientX - widgetDrag.startX;
    const dy = event.clientY - widgetDrag.startY;
    if (!widgetDrag.moved && Math.hypot(dx, dy) < 6) return;
    if (!widgetDrag.moved) {
      widgetDrag.moved = true;
      if (widgetDrag.wasDocked) {
        openMediumSidePanel(currentProductivityTab, false);
        root.classList.remove('is-opening');
      }
      if (root.setPointerCapture) {
        try { root.setPointerCapture(event.pointerId); } catch (_) {}
      }
      clearTimeout(longPressTimer);
      longPressFired = false;
      root.classList.add('is-dragging', 'is-drag-compact');
      document.body.classList.add('attention-widget-dragging');
      selectedTaskId = null;
      closeActions();
    }
    setFloatingPosition(widgetDrag.startLeft + dx, widgetDrag.startTop + dy, false);
    const draggedRect = root.getBoundingClientRect();
    widgetDrag.dockReady = event.clientX >= window.innerWidth - 54 || (dx > 24 && draggedRect.right >= window.innerWidth - 12);
    root.classList.toggle('is-dock-candidate', widgetDrag.dockReady);
    document.body.classList.toggle('attention-widget-dock-ready', widgetDrag.dockReady);
    event.preventDefault();
  }

  function finishWidgetDrag(event) {
    if (!widgetDrag || (event && widgetDrag.pointerId !== event.pointerId)) return;
    const state = widgetDrag;
    widgetDrag = null;
    if (root.releasePointerCapture && event) {
      try { root.releasePointerCapture(event.pointerId); } catch (_) {}
    }
    root.classList.remove('is-dragging', 'is-dock-candidate');
    document.body.classList.remove('attention-widget-dragging', 'attention-widget-dock-ready');
    if (!state.moved) return;
    suppressWidgetClickUntil = Date.now() + 250;
    root.classList.remove('is-drag-compact');
    root.classList.add('is-post-drag-tools-hidden');
    if (state.dockReady) dockWidget(true);
    else {
      setFloatingPosition(parseFloat(root.style.left), parseFloat(root.style.top), true);
      render();
    }
  }

  function startDockResize(event) {
    if (!root.classList.contains('is-docked') || (event.pointerType === 'mouse' && event.button !== 0)) return;
    widgetResize = { pointerId: event.pointerId };
    root.classList.add('is-resizing');
    document.body.classList.add('attention-widget-resizing');
    if (dockResizer.setPointerCapture) dockResizer.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function moveDockResize(event) {
    if (!widgetResize || widgetResize.pointerId !== event.pointerId) return;
    setDockWidth(window.innerWidth - event.clientX, false);
    event.preventDefault();
  }

  function finishDockResize(event) {
    if (!widgetResize || (event && widgetResize.pointerId !== event.pointerId)) return;
    widgetResize = null;
    root.classList.remove('is-resizing');
    document.body.classList.remove('attention-widget-resizing');
    saveWidgetLayout();
  }

  function startMediumResize(event) {
    if (!root.classList.contains('is-medium-panel') || (event.pointerType === 'mouse' && event.button !== 0)) return;
    const rect = root.getBoundingClientRect();
    mediumResize = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      startLeft: rect.left,
      startTop: rect.top
    };
    root.classList.add('is-resizing', 'is-medium-resizing');
    document.body.classList.add('attention-widget-resizing');
    closeActions();
    if (mediumResizer.setPointerCapture) mediumResizer.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
  }

  function moveMediumResize(event) {
    if (!mediumResize || mediumResize.pointerId !== event.pointerId) return;
    const maxWidth = window.innerWidth - mediumResize.startLeft - 8;
    const maxHeight = window.innerHeight - mediumResize.startTop - 8;
    setMediumSize(
      mediumResize.startWidth + event.clientX - mediumResize.startX,
      mediumResize.startHeight + event.clientY - mediumResize.startY,
      false,
      maxWidth,
      maxHeight
    );
    event.preventDefault();
  }

  function finishMediumResize(event) {
    if (!mediumResize || (event && mediumResize.pointerId !== event.pointerId)) return;
    if (mediumResizer.releasePointerCapture && event) {
      try { mediumResizer.releasePointerCapture(event.pointerId); } catch (_) {}
    }
    mediumResize = null;
    root.classList.remove('is-resizing', 'is-medium-resizing');
    document.body.classList.remove('attention-widget-resizing');
    saveWidgetLayout();
  }

  function findTask(id) {
    return tasks.find(function (item) { return String(item.id) === String(id); });
  }

  function closeActions() {
    openMenuId = null;
    openInline = null;
    openReactionId = null;
    selectedTaskId = null;
  }

  function currentOpenTask() {
    return visibleTasks().find(function (task) { return !task.done; }) || null;
  }

  function expandList() {
    // A compact Dock always reopens on the actionable list. My Notes remains
    // available as an explicit tab choice after the Dock has expanded.
    selectProductivityTab('attention', false);
    root.classList.remove('is-collapsed');
    root.classList.remove('is-collapsing');
    root.classList.add('is-opening');
    root.querySelectorAll('[data-attention-collapse]').forEach(function (button) { button.setAttribute('aria-expanded', 'true'); });
    closeActions();
    reloadTasks();
    if (!root.classList.contains('is-docked') && root.style.left) {
      requestAnimationFrame(function () { setFloatingPosition(widgetLayout.left, widgetLayout.top, false); });
    }
    window.setTimeout(function () { root.classList.remove('is-opening'); }, 360);
  }

  function openMediumSidePanel(name, persist) {
    const next = name === 'note' ? 'note' : 'attention';
    const wasDocked = root.classList.contains('is-docked');
    const savedLeft = widgetLayout.left;
    const savedTop = widgetLayout.top;
    widgetLayout.mode = 'medium';
    root.classList.remove('is-docked', 'is-collapsed', 'is-collapsing', 'is-over-map-controls', 'is-dock-candidate');
    root.classList.add('is-medium-panel', 'is-opening', 'is-layout-positioning');
    setMediumSize(widgetLayout.mediumWidth, widgetLayout.mediumHeight, false);
    document.body.classList.remove('attention-widget-docked', 'attention-widget-dock-ready', 'attention-widget-dragging');
    if (appShell) appShell.classList.remove('attention-widget-docked', 'attention-nav-compact');
    syncNavigationToggleLabel(false);
    selectProductivityTab(next);
    root.querySelectorAll('[data-attention-collapse]').forEach(function (button) { button.setAttribute('aria-expanded', 'true'); });
    closeActions();
    reloadTasks();
    syncDockToggleControls();
    requestAnimationFrame(function () {
      // Dragging out of the dock owns positioning from the first pointer move.
      // Do not let this deferred centring step pull it back under the cursor.
      if (widgetDrag && widgetDrag.moved) {
        root.classList.remove('is-layout-positioning');
        return;
      }
      const width = Math.min(widgetLayout.mediumWidth, window.innerWidth - 16);
      const height = Math.min(widgetLayout.mediumHeight, window.innerHeight - 24);
      const left = wasDocked || savedLeft == null ? (window.innerWidth - width) / 2 : savedLeft;
      const top = wasDocked || savedTop == null ? (window.innerHeight - height) / 2 : savedTop;
      setFloatingPosition(left, top, false);
      if (persist !== false) saveWidgetLayout();
      requestAnimationFrame(function () { root.classList.remove('is-layout-positioning'); });
    });
    window.setTimeout(function () { root.classList.remove('is-opening'); }, 360);
  }

  function expandNoteCapture() {
    openMediumSidePanel('note');
    window.setTimeout(function () {
      const quickText = root.querySelector('[data-my-notes-quick-text]');
      if (quickText) quickText.focus({ preventScroll: true });
    }, 120);
  }

  function openRecord(task) {
    const api = crmApi();
    closeActions();
    if (api && task.sourceType && typeof api.open === 'function') {
      if (!root.classList.contains('is-docked')) {
        root.classList.remove('is-medium-panel', 'is-opening', 'is-collapsing');
        root.classList.add('is-collapsed');
        widgetLayout.mode = 'floating';
        saveWidgetLayout();
        syncDockToggleControls();
      }
      api.open(task.id);
      notify('Opened ' + task.module + ' · ' + task.record + '.');
      render();
      return;
    }
    expandList();
    requestAnimationFrame(function () {
      const row = list.querySelector('[data-attention-id="' + CSS.escape(String(task.id)) + '"]');
      if (row) {
        row.scrollIntoView({ block: 'center', behavior: 'smooth' });
        row.classList.add('is-opened-from-mini');
        window.setTimeout(function () { row.classList.remove('is-opened-from-mini'); }, 1600);
      }
    });
    notify(task.sourceKind === 'personal-reminder' ? 'Opened Personal Note reminder.' : 'Opened attention item.');
  }

  function completeTask(task) {
    const taskKey = String(task.id);
    if (task.done || completingTaskIds.has(taskKey)) return;
    completingTaskIds.add(taskKey);
    closeActions();
    const row = list.querySelector('[data-attention-id="' + CSS.escape(taskKey) + '"]');
    const checkbox = row && row.querySelector('.attention-checkbox');
    if (row) {
      row.classList.add('is-completing');
      row.setAttribute('aria-busy', 'true');
    }
    if (checkbox) {
      checkbox.checked = true;
      checkbox.disabled = true;
      checkbox.setAttribute('aria-label', 'Completing ' + task.title);
    }

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(function () {
      const api = crmApi();
      let undoToken = null;
      let localSnapshot = null;
      let completed = true;
      if (api && task.sourceType && typeof api.complete === 'function') {
        undoToken = api.complete(task.id);
        completed = Boolean(undoToken);
      } else {
        localSnapshot = { id: task.id, done: task.done, when: task.when, completedAt: task.completedAt, hadCompletedAt: Object.prototype.hasOwnProperty.call(task, 'completedAt') };
        task.done = true;
        task.completedAt = new Date().toISOString();
        task.when = 'Completed · just now';
        saveLocalTasks();
      }

      if (!completed) {
        completingTaskIds.delete(taskKey);
        const failedRow = list.querySelector('[data-attention-id="' + CSS.escape(taskKey) + '"]');
        const failedCheckbox = failedRow && failedRow.querySelector('.attention-checkbox');
        if (failedRow) {
          failedRow.classList.remove('is-completing');
          failedRow.removeAttribute('aria-busy');
        }
        if (failedCheckbox) {
          failedCheckbox.checked = false;
          failedCheckbox.disabled = false;
          failedCheckbox.setAttribute('aria-label', 'Mark ' + task.title + ' complete');
        }
        notify('Could not complete ' + task.title + '.');
        return;
      }

      const confirmedRow = list.querySelector('[data-attention-id="' + CSS.escape(taskKey) + '"]');
      if (confirmedRow) confirmedRow.classList.add('is-complete-confirmed');
      window.setTimeout(function () {
        completingTaskIds.delete(taskKey);
        reloadTasks();
        const message = task.sourceKind === 'mention'
          ? 'Mention marked as read.'
          : (task.sourceKind === 'note-followup' || task.sourceKind === 'personal-reminder')
            ? 'Reminder completed. Note kept.'
            : 'Task completed.';
        showUndo(message, function () {
          if (undoToken && api && typeof api.undoComplete === 'function') api.undoComplete(undoToken);
          else if (localSnapshot) {
            const localTask = localTasks.find(function (item) { return String(item.id) === String(localSnapshot.id); });
            if (localTask) {
              localTask.done = localSnapshot.done;
              localTask.when = localSnapshot.when;
              if (localSnapshot.hadCompletedAt) localTask.completedAt = localSnapshot.completedAt;
              else delete localTask.completedAt;
              saveLocalTasks();
            }
          }
          reloadTasks();
          notify('Completion undone.');
        });
      }, reduceMotion ? 40 : 180);
    }, reduceMotion ? 120 : 620);
  }

  function reopenCompletedTask(task) {
    if (!task.done || task.canReopen === false) return;
    const dueTimestamp = task.sourceKind !== 'mention' ? Date.parse(task.dueAt || '') : NaN;
    if (!Number.isNaN(dueTimestamp) && dueTimestamp <= Date.now()) {
      if (task.canReschedule === false) {
        notify('Choose a new due date before reopening ' + task.title + '.');
        render();
        return;
      }
      openMenuId = null;
      openReactionId = null;
      selectedTaskId = task.id;
      openInline = { id: task.id, type: 'reschedule', reopen: true };
      render();
      requestAnimationFrame(function () {
        const selector = '[data-attention-id="' + CSS.escape(String(task.id)) + '"] input[type="datetime-local"]';
        const field = list.querySelector(selector);
        if (field) field.focus({ preventScroll: true });
      });
      return;
    }

    const api = crmApi();
    let reopened = false;
    if (api && task.sourceType && typeof api.reopen === 'function') {
      reopened = Boolean(api.reopen(task.id));
    } else {
      const localTask = localTasks.find(function (item) { return String(item.id) === String(task.id); });
      if (localTask) {
        localTask.done = false;
        delete localTask.completedAt;
        saveLocalTasks();
        reopened = true;
      }
    }
    closeActions();
    reloadTasks();
    notify(reopened ? task.title + ' reopened.' : 'Could not reopen ' + task.title + '.');
  }

  function snoozeUntil(minutes) {
    return new Date(Date.now() + minutes * 60000).toISOString();
  }

  function activeNoteContext() {
    const api = crmApi();
    return api && typeof api.context === 'function' ? api.context() : null;
  }

  function noteRecordDataset() {
    const api = crmApi();
    const deals = api && typeof api.records === 'function' ? api.records('deal') : [];
    const leads = api && typeof api.records === 'function' ? api.records('lead') : [];
    const crmRecords = deals.map(function (name, index) {
      return { id: 'crm-deal-' + index, module: 'crm', moduleLabel: 'CRM', type: 'deal', typeLabel: 'Deal', reference: 'D-' + String(1024 + index), name: name, status: 'Open' };
    }).concat(leads.map(function (name, index) {
      return { id: 'crm-lead-' + index, module: 'crm', moduleLabel: 'CRM', type: 'lead', typeLabel: 'Lead', reference: 'L-' + String(2081 + index), name: name, status: index % 3 === 0 ? 'New' : 'Qualified' };
    }));
    return crmRecords.concat([
      { id: 'quote-11995', module: 'quote', moduleLabel: 'Quote & Sales', type: 'quote', typeLabel: 'Quote', reference: 'Q-11995', name: 'Theater Upgrades', status: 'Sent' },
      { id: 'quote-11990', module: 'quote', moduleLabel: 'Quote & Sales', type: 'quote', typeLabel: 'Quote', reference: 'Q-11990', name: 'Riverside Penthouse', status: 'In review' },
      { id: 'quote-11820', module: 'quote', moduleLabel: 'Quote & Sales', type: 'quote', typeLabel: 'Quote', reference: 'Q-11820', name: 'Full Home AV Package', status: 'Draft' },
      { id: 'sales-so-4408', module: 'quote', moduleLabel: 'Quote & Sales', type: 'sales-order', typeLabel: 'Sales order', reference: 'SO-4408', name: 'Office AV Refresh', status: 'Confirmed' },
      { id: 'proc-po-0230', module: 'procurement', moduleLabel: 'Procurement', type: 'purchase-order', typeLabel: 'Purchase order', reference: 'PO-0230', name: 'Main Company · Projector order', status: 'Draft' },
      { id: 'proc-pr-0228', module: 'procurement', moduleLabel: 'Procurement', type: 'purchase-request', typeLabel: 'Purchase request', reference: 'PR-0228', name: 'Northern Security · Camera stock', status: 'Awaiting response' },
      { id: 'proc-po-0217', module: 'procurement', moduleLabel: 'Procurement', type: 'purchase-order', typeLabel: 'Purchase order', reference: 'PO-0217', name: 'Theater Seating Supply', status: 'Approved' },
      { id: 'inv-00456', module: 'inventory', moduleLabel: 'Inventory', type: 'inventory-item', typeLabel: 'Inventory item', reference: 'INV-00456', name: 'Premium Theater Seating', status: 'In stock' },
      { id: 'inv-00418', module: 'inventory', moduleLabel: 'Inventory', type: 'inventory-item', typeLabel: 'Inventory item', reference: 'INV-00418', name: 'Sony 4K Laser Projector', status: 'Low stock' },
      { id: 'inv-00392', module: 'inventory', moduleLabel: 'Inventory', type: 'inventory-item', typeLabel: 'Inventory item', reference: 'INV-00392', name: 'Lutron Sunnata Dimmer', status: 'In stock' }
    ]);
  }

  function noteRecordContext(record) {
    if (!record) return null;
    return {
      id: record.id,
      module: record.module,
      moduleLabel: record.moduleLabel,
      type: record.type,
      label: record.typeLabel,
      record: record.name,
      reference: record.reference,
      status: record.status
    };
  }

  function updateSelectedNoteRecord() {
    if (!selectedNoteRecord) {
      noteRecordTrigger.classList.remove('has-record');
      noteRecordValue.textContent = 'Search and select a record…';
      noteRecordAction.textContent = 'Choose';
      noteContextLabel.textContent = 'Add an action for any WeQuote record';
      return;
    }
    noteRecordTrigger.classList.add('has-record');
    noteRecordValue.innerHTML = '<span class="attention-note-module-badge ' + escapeHtml(selectedNoteRecord.module) + '">' + escapeHtml(selectedNoteRecord.moduleLabel) + '</span>' +
      '<span class="attention-note-record-copy"><strong>' + escapeHtml(selectedNoteRecord.reference || selectedNoteRecord.label) + '</strong><small>' + escapeHtml(selectedNoteRecord.record) + '</small></span>';
    noteRecordAction.textContent = 'Change';
    noteContextLabel.textContent = selectedNoteRecord.moduleLabel + ' · ' + selectedNoteRecord.label;
  }

  function recordPickerModuleLabel(module) {
    return { all: 'All modules', crm: 'CRM', quote: 'Quote & Sales', procurement: 'Procurement', inventory: 'Inventory' }[module] || 'All modules';
  }

  function renderRecordPicker() {
    const query = (recordPickerSearch.value || '').trim().toLowerCase();
    let records = noteRecordDataset().filter(function (record) {
      if (recordPickerModule !== 'all' && record.module !== recordPickerModule) return false;
      if (!query) return true;
      return [record.moduleLabel, record.typeLabel, record.reference, record.name, record.status].join(' ').toLowerCase().indexOf(query) !== -1;
    });
    const total = records.length;
    records = records.slice(0, query ? 40 : 24);
    recordPickerTitle.textContent = query ? 'Search results' : (recordPickerModule === 'all' ? 'Recent records' : recordPickerModuleLabel(recordPickerModule) + ' records');
    recordPickerCount.textContent = total + ' ' + (total === 1 ? 'record' : 'records');
    recordSearchScope.textContent = recordPickerModuleLabel(recordPickerModule);
    recordPickerLayer.querySelectorAll('[data-record-picker-module]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.recordPickerModule === recordPickerModule);
    });
    recordPickerResults.hidden = total === 0;
    recordPickerEmpty.hidden = total !== 0;
    recordPickerResults.innerHTML = records.map(function (record) {
      const selected = selectedNoteRecord && selectedNoteRecord.id === record.id;
      return '<button class="attention-record-row' + (selected ? ' selected' : '') + '" data-record-picker-record="' + escapeHtml(record.id) + '" type="button" role="option" aria-selected="' + String(Boolean(selected)) + '">' +
        '<span class="attention-record-module-icon ' + escapeHtml(record.module) + '"><i class="fa-solid ' + (record.module === 'crm' ? 'fa-address-card' : record.module === 'quote' ? 'fa-file-invoice-dollar' : record.module === 'procurement' ? 'fa-truck-ramp-box' : 'fa-boxes-stacked') + '"></i></span>' +
        '<span class="attention-record-primary"><strong>' + escapeHtml(record.name) + '</strong><small>' + escapeHtml(record.typeLabel) + ' · ' + escapeHtml(record.moduleLabel) + '</small></span>' +
        '<span class="attention-record-reference">' + escapeHtml(record.reference) + '</span>' +
        '<span class="attention-record-status">' + escapeHtml(record.status) + '</span>' +
        '<i class="fa-solid ' + (selected ? 'fa-circle-check' : 'fa-chevron-right') + ' attention-record-select-icon" aria-hidden="true"></i>' +
      '</button>';
    }).join('');
  }

  function setRecordPickerOpen(open, returnToComposer) {
    recordPickerLayer.hidden = !open;
    recordPickerLayer.setAttribute('aria-hidden', String(!open));
    noteRecordTrigger.setAttribute('aria-expanded', String(open));
    if (open) {
      recordPickerReturnFocus = document.activeElement;
      modalLayer.hidden = true;
      modalLayer.setAttribute('aria-hidden', 'true');
      recordPickerModule = 'all';
      recordPickerSearch.value = '';
      renderRecordPicker();
      requestAnimationFrame(function () { recordPickerSearch.focus({ preventScroll: true }); });
    } else if (returnToComposer) {
      modalLayer.hidden = false;
      modalLayer.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(function () { noteRecordTrigger.focus({ preventScroll: true }); });
    }
  }

  function closeEntireNoteFlow(returnFocus) {
    if (!recordPickerLayer.hidden) setRecordPickerOpen(false, false);
    setComposerOpen(false, returnFocus);
  }

  function noteMentions() {
    return Array.from(noteBody.querySelectorAll('[data-note-mention]')).map(function (token) {
      return token.dataset.noteMention;
    }).filter(function (name, index, list) { return name && list.indexOf(name) === index; });
  }

  function renderNotePeople() {
    const query = (notePeopleSearch.value || '').trim().toLowerCase();
    const matches = NOTE_PEOPLE.filter(function (name) { return name.toLowerCase().indexOf(query) !== -1; });
    notePeopleResults.innerHTML = matches.map(function (name) {
      const initials = name.split(/\s+/).map(function (part) { return part.charAt(0); }).join('').slice(0, 2);
      return '<button type="button" data-note-mention-person="' + escapeHtml(name) + '"><span>' + escapeHtml(initials) + '</span><b>' + escapeHtml(name) + '</b><small>@' + escapeHtml(name.replace(/\s+/g, '')) + '</small></button>';
    }).join('') || '<p>No teammates found</p>';
  }

  function positionNotePeoplePicker(anchorMode) {
    if (notePeoplePicker.hidden) return;
    const field = notePeoplePicker.parentElement;
    const fieldRect = field.getBoundingClientRect();
    const composerRect = composer.getBoundingClientRect();
    let anchorRect = noteMentionToggle.getBoundingClientRect();
    if (anchorMode === 'caret' && noteMentionRange && noteBody.contains(noteMentionRange.commonAncestorContainer)) {
      const caretRect = noteMentionRange.getBoundingClientRect();
      if (caretRect.width || caretRect.height) anchorRect = caretRect;
    }
    const pickerRect = notePeoplePicker.getBoundingClientRect();
    const maxLeft = Math.max(0, fieldRect.width - pickerRect.width);
    const left = Math.min(maxLeft, Math.max(0, anchorRect.left - fieldRect.left));
    let top = anchorRect.bottom - fieldRect.top + 7;
    const visibleBottom = Math.min(composerRect.bottom - 12, window.innerHeight - 12);
    if (anchorRect.bottom + 7 + pickerRect.height > visibleBottom) {
      const above = anchorRect.top - fieldRect.top - pickerRect.height - 7;
      if (above >= 0) top = above;
    }
    notePeoplePicker.style.setProperty('--attention-people-picker-left', left + 'px');
    notePeoplePicker.style.setProperty('--attention-people-picker-top', Math.max(0, top) + 'px');
  }

  function setNotePeopleOpen(open, focusSearch) {
    notePeoplePicker.hidden = !open;
    noteMentionToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      if (focusSearch !== false) notePeopleSearch.value = '';
      renderNotePeople();
      requestAnimationFrame(function () {
        positionNotePeoplePicker(focusSearch === false ? 'caret' : 'toolbar');
        if (focusSearch !== false) notePeopleSearch.focus({ preventScroll: true });
      });
    }
  }

  function captureNoteMentionRange() {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;
    const range = selection.getRangeAt(0);
    if (!noteBody.contains(range.commonAncestorContainer)) return null;
    noteMentionRange = range.cloneRange();
    return noteMentionRange;
  }

  function typedMentionAtRange(range) {
    if (!range || !range.collapsed || range.startContainer.nodeType !== Node.TEXT_NODE) return null;
    const beforeCaret = range.startContainer.data.slice(0, range.startOffset);
    const match = beforeCaret.match(/(?:^|[\s([{:;,])@([^\s@]*)$/);
    if (!match) return null;
    return {
      node: range.startContainer,
      start: beforeCaret.lastIndexOf('@'),
      end: range.startOffset,
      query: match[1] || ''
    };
  }

  function syncTypedMentionPicker() {
    const range = captureNoteMentionRange();
    const mention = typedMentionAtRange(range);
    if (!mention) {
      if (!notePeoplePicker.hidden && document.activeElement === noteBody) setNotePeopleOpen(false);
      return;
    }
    notePeopleSearch.value = mention.query;
    setNotePeopleOpen(true, false);
  }

  function insertNoteMention(name) {
    const existing = noteMentions();
    if (existing.indexOf(name) !== -1) {
      setNotePeopleOpen(false);
      noteBody.focus();
      return;
    }
    const token = document.createElement('span');
    token.className = 'attention-note-mention-token';
    token.dataset.noteMention = name;
    token.contentEditable = 'false';
    token.textContent = '@' + name;
    const workingRange = noteMentionRange && noteBody.contains(noteMentionRange.commonAncestorContainer)
      ? noteMentionRange.cloneRange()
      : null;
    const typedMention = typedMentionAtRange(workingRange);
    const trailing = document.createTextNode('\u00a0');
    if (typedMention) {
      const replaceRange = document.createRange();
      replaceRange.setStart(typedMention.node, typedMention.start);
      replaceRange.setEnd(typedMention.node, typedMention.end);
      replaceRange.deleteContents();
      replaceRange.insertNode(token);
      token.parentNode.insertBefore(trailing, token.nextSibling);
    } else if (workingRange) {
      workingRange.deleteContents();
      workingRange.insertNode(token);
      token.parentNode.insertBefore(trailing, token.nextSibling);
    } else {
      if ((noteBody.innerText || '').length && !/\s$/.test(noteBody.innerText || '')) {
        noteBody.appendChild(document.createTextNode('\u00a0'));
      }
      noteBody.appendChild(token);
      noteBody.appendChild(trailing);
    }
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStartAfter(trailing);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    noteMentionRange = range.cloneRange();
    setNotePeopleOpen(false);
    noteBody.focus();
  }

  function savePlatformRecordNote(settings, context) {
    const mention = (settings.mentions || [])[0] || '';
    const hasFollowUp = Boolean(settings.followUpAt);
    const behaviour = mention && hasFollowUp ? 'assigned-attention' : hasFollowUp ? 'self-reminder' : mention ? 'mention' : 'record-note';
    const note = {
      id: 'platform-note-' + Date.now(),
      module: context.module,
      moduleLabel: context.moduleLabel,
      recordType: context.type,
      recordLabel: context.label,
      record: context.record,
      reference: context.reference,
      title: settings.title,
      body: settings.body,
      bodyHtml: settings.bodyHtml,
      mentions: settings.mentions || [],
      followUpAt: settings.followUpAt || '',
      author: 'Candy',
      createdAt: new Date().toISOString()
    };
    platformNotes.push(note);
    savePlatformNotes();
    if (hasFollowUp) {
      const assignedTo = mention || 'Candy';
      localTasks.unshift({
        id: 'platform-attention-' + Date.now(),
        title: 'Follow up · ' + settings.title,
        module: context.moduleLabel,
        itemType: 'Note',
        record: [context.reference, context.record].filter(Boolean).join(' · '),
        when: 'Due ' + new Date(settings.followUpAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        dueAt: settings.followUpAt,
        assignedTo: assignedTo,
        mentions: settings.mentions || [],
        scopes: assignedTo === 'Candy' ? ['my', 'team'] : ['assigned', 'team'],
        sourceKind: 'note-followup',
        canComplete: true,
        canReschedule: true,
        canReply: false,
        done: false,
        tag: context.module
      });
      saveLocalTasks();
    }
    return { created: true, behaviour: behaviour, assignedTo: mention || (hasFollowUp ? 'Candy' : '') };
  }

  function savePlatformRecordMeeting(settings, context) {
    const createdAt = new Date().toISOString();
    const start = new Date(settings.startAt);
    if (Number.isNaN(start.getTime())) return false;
    const stamp = Date.now();
    const meeting = {
      id: 'platform-meeting-' + stamp,
      module: context.module,
      moduleLabel: context.moduleLabel,
      recordType: context.type,
      recordLabel: context.label,
      record: context.record,
      reference: context.reference,
      title: settings.title,
      startAt: start.toISOString(),
      date: settings.date,
      time: settings.time,
      duration: settings.duration,
      method: settings.method,
      methodLabel: settings.method === 'in-person' ? 'In person' : 'Meeting link',
      address: settings.method === 'in-person' ? settings.methodValue : '',
      link: settings.method === 'manual' ? settings.methodValue : '',
      attendees: settings.attendees.slice(),
      agenda: settings.agenda,
      status: 'scheduled',
      createdBy: 'Candy',
      createdAt: createdAt
    };
    platformMeetings.push(meeting);
    savePlatformMeetings();
    localTasks.unshift({
      id: 'platform-attention-meeting-' + stamp,
      title: settings.title,
      module: context.moduleLabel,
      itemType: 'Meeting',
      record: [context.reference, context.record].filter(Boolean).join(' · '),
      when: 'Meeting ' + start.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' · ' + settings.duration + ' min',
      dueAt: start.toISOString(),
      assignedTo: 'Candy',
      scopes: ['my', 'team'],
      sourceKind: 'meeting',
      canComplete: true,
      canReschedule: true,
      canReply: false,
      done: false,
      tag: context.module,
      meeting: meeting
    });
    saveLocalTasks();
    return { created: true, behaviour: 'meeting', meetingId: meeting.id };
  }

  function syncMeetingMethod() {
    const method = meetingMethod.value;
    const showDetail = method === 'in-person' || method === 'manual';
    meetingMethodDetail.hidden = !showDetail;
    meetingMethodValue.required = showDetail;
    meetingMethodValue.setAttribute('aria-required', String(showDetail));
    if (method === 'in-person') {
      meetingMethodTitle.textContent = 'In person';
      meetingMethodSubtitle.textContent = 'Meet at an address';
      meetingMethodLabel.textContent = 'Meeting address';
      meetingMethodValue.type = 'text';
      meetingMethodValue.placeholder = 'Enter the full meeting address';
      meetingMethodValue.setAttribute('aria-label', 'Meeting address');
    } else if (method === 'manual') {
      meetingMethodTitle.textContent = 'Meeting link';
      meetingMethodSubtitle.textContent = 'Use an existing meeting link';
      meetingMethodLabel.textContent = 'Meeting link';
      meetingMethodValue.type = 'url';
      meetingMethodValue.placeholder = 'Paste a meeting link';
      meetingMethodValue.setAttribute('aria-label', 'Meeting link');
    } else {
      meetingMethodTitle.textContent = 'Select meeting method';
      meetingMethodSubtitle.textContent = 'Choose in person or paste a link';
      meetingMethodLabel.textContent = 'Meeting link';
      meetingMethodValue.type = 'url';
      meetingMethodValue.placeholder = 'Paste a meeting link';
      meetingMethodValue.setAttribute('aria-label', 'Meeting link');
    }
  }

  function renderMeetingAttendees() {
    meetingAttendeesLabel.textContent = selectedMeetingAttendees.length
      ? selectedMeetingAttendees.length + ' attendee' + (selectedMeetingAttendees.length === 1 ? '' : 's')
      : 'Add attendees';
    meetingAttendeesPicker.innerHTML = NOTE_PEOPLE.map(function (name) {
      const selected = selectedMeetingAttendees.indexOf(name) !== -1;
      const initials = name.split(/\s+/).map(function (part) { return part.charAt(0); }).join('').slice(0, 2);
      return '<button class="' + (selected ? 'selected' : '') + '" type="button" data-attention-meeting-attendee="' + escapeHtml(name) + '" role="option" aria-selected="' + String(selected) + '"><span>' + escapeHtml(initials) + '</span><b>' + escapeHtml(name) + '</b><i class="fa-solid ' + (selected ? 'fa-circle-check' : 'fa-plus') + '" aria-hidden="true"></i></button>';
    }).join('');
    meetingAttendeeChips.hidden = selectedMeetingAttendees.length === 0;
    meetingAttendeeChips.innerHTML = selectedMeetingAttendees.map(function (name) {
      return '<span>' + escapeHtml(name) + '<button type="button" data-attention-remove-meeting-attendee="' + escapeHtml(name) + '" aria-label="Remove ' + escapeHtml(name) + '">×</button></span>';
    }).join('');
  }

  function setMeetingAttendeesOpen(open) {
    meetingAttendeesPicker.hidden = !open;
    meetingAttendeesToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      renderMeetingAttendees();
      requestAnimationFrame(function () {
        const first = meetingAttendeesPicker.querySelector('[data-attention-meeting-attendee]');
        if (first) first.focus({ preventScroll: true });
      });
    }
  }

  function setFollowUpType(type, focusTab) {
    followUpType = type === 'meeting' ? 'meeting' : 'note';
    followUpTypeButtons.forEach(function (button) {
      const active = button.dataset.attentionFollowupType === followUpType;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    followUpPanels.forEach(function (panel) {
      panel.hidden = panel.dataset.attentionFollowupPanel !== followUpType;
    });
    if (followUpType === 'meeting') setNotePeopleOpen(false);
    else setMeetingAttendeesOpen(false);
    submitIcon.className = 'fa-solid ' + (followUpType === 'meeting' ? 'fa-calendar-plus' : 'fa-plus');
    submitLabel.textContent = 'Create follow-up';
    noteValidation.textContent = '';
    if (focusTab) {
      const activeButton = followUpTypeButtons.find(function (button) { return button.dataset.attentionFollowupType === followUpType; });
      if (activeButton) activeButton.focus({ preventScroll: true });
    }
  }

  function resetNoteComposer() {
    noteTitle.value = '';
    noteBody.innerHTML = '';
    noteDate.value = '';
    noteTime.value = '17:00';
    noteValidation.textContent = '';
    selectedNoteRecord = null;
    meetingTitle.value = '';
    meetingDate.value = '';
    meetingTime.value = '';
    meetingDuration.value = '';
    meetingMethod.value = '';
    meetingMethodValue.value = '';
    meetingAgenda.value = '';
    selectedMeetingAttendees = [];
    syncMeetingMethod();
    renderMeetingAttendees();
    setMeetingAttendeesOpen(false);
    setNotePeopleOpen(false);
    setFollowUpType('note', false);
    updateSelectedNoteRecord();
  }

  function setComposerOpen(open, returnFocus) {
    const context = open ? activeNoteContext() : null;
    modalLayer.hidden = !open;
    modalLayer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('attention-note-modal-open', open);
    createButton.classList.toggle('is-active', open);
    createButton.setAttribute('aria-expanded', String(open));
    if (open) {
      scopeMenu.hidden = true;
      root.querySelector('[data-attention-scope-toggle]').setAttribute('aria-expanded', 'false');
      closeActions();
      if (!selectedNoteRecord && context) {
        const match = noteRecordDataset().find(function (record) {
          return record.module === 'crm' && record.type === context.type && record.name === context.record;
        });
        selectedNoteRecord = noteRecordContext(match);
      }
      updateSelectedNoteRecord();
      noteValidation.textContent = '';
      setFollowUpType(followUpType, false);
      requestAnimationFrame(function () {
        const focusTarget = !selectedNoteRecord ? noteRecordTrigger : (followUpType === 'meeting' ? meetingTitle : noteTitle);
        focusTarget.focus({ preventScroll: true });
      });
    } else if (returnFocus) {
      createButton.focus({ preventScroll: true });
    }
  }

  createButton.addEventListener('click', function () {
    setComposerOpen(modalLayer.hidden, false);
  });

  composer.querySelector('[data-attention-composer-close]').addEventListener('click', function () { closeEntireNoteFlow(true); });
  composer.querySelector('[data-attention-composer-cancel]').addEventListener('click', function () { closeEntireNoteFlow(true); });
  modalLayer.querySelector('[data-attention-note-backdrop]').addEventListener('click', function () { closeEntireNoteFlow(true); });
  noteRecordTrigger.addEventListener('click', function () { setRecordPickerOpen(true, false); });
  recordPickerLayer.querySelectorAll('[data-record-picker-back], [data-record-picker-cancel]').forEach(function (button) {
    button.addEventListener('click', function () { setRecordPickerOpen(false, true); });
  });
  recordPickerLayer.querySelectorAll('[data-record-picker-close], [data-record-picker-backdrop]').forEach(function (button) {
    button.addEventListener('click', function () { closeEntireNoteFlow(true); });
  });
  recordPickerLayer.querySelectorAll('[data-record-picker-module]').forEach(function (button) {
    button.addEventListener('click', function () {
      recordPickerModule = button.dataset.recordPickerModule || 'all';
      renderRecordPicker();
    });
  });
  recordPickerSearch.addEventListener('input', renderRecordPicker);
  recordPickerResults.addEventListener('click', function (event) {
    const row = event.target.closest('[data-record-picker-record]');
    if (!row) return;
    const record = noteRecordDataset().find(function (item) { return item.id === row.dataset.recordPickerRecord; });
    if (!record) return;
    selectedNoteRecord = noteRecordContext(record);
    updateSelectedNoteRecord();
    noteValidation.textContent = '';
    setRecordPickerOpen(false, true);
  });
  followUpTypeButtons.forEach(function (button, index) {
    button.addEventListener('click', function () { setFollowUpType(button.dataset.attentionFollowupType, false); });
    button.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = followUpTypeButtons[(index + direction + followUpTypeButtons.length) % followUpTypeButtons.length];
      setFollowUpType(next.dataset.attentionFollowupType, true);
    });
  });
  meetingMethod.addEventListener('change', syncMeetingMethod);
  meetingAttendeesToggle.addEventListener('click', function (event) {
    event.stopPropagation();
    setMeetingAttendeesOpen(meetingAttendeesPicker.hidden);
  });
  meetingAttendeesPicker.addEventListener('click', function (event) {
    const person = event.target.closest('[data-attention-meeting-attendee]');
    if (!person) return;
    event.stopPropagation();
    const name = person.dataset.attentionMeetingAttendee;
    const index = selectedMeetingAttendees.indexOf(name);
    if (index === -1) selectedMeetingAttendees.push(name);
    else selectedMeetingAttendees.splice(index, 1);
    renderMeetingAttendees();
  });
  meetingAttendeeChips.addEventListener('click', function (event) {
    const remove = event.target.closest('[data-attention-remove-meeting-attendee]');
    if (!remove) return;
    selectedMeetingAttendees = selectedMeetingAttendees.filter(function (name) { return name !== remove.dataset.attentionRemoveMeetingAttendee; });
    renderMeetingAttendees();
  });
  document.addEventListener('click', function (event) {
    if (!meetingAttendeesPicker.hidden && !event.target.closest('.attention-meeting-attendees-field')) setMeetingAttendeesOpen(false);
  });
  noteMentionToggle.addEventListener('mousedown', captureNoteMentionRange);
  noteMentionToggle.addEventListener('click', function () { setNotePeopleOpen(notePeoplePicker.hidden, true); });
  notePeopleSearch.addEventListener('input', renderNotePeople);
  notePeopleResults.addEventListener('mousedown', function (event) {
    if (event.target.closest('[data-note-mention-person]')) event.preventDefault();
  });
  notePeopleResults.addEventListener('click', function (event) {
    const person = event.target.closest('[data-note-mention-person]');
    if (person) insertNoteMention(person.dataset.noteMentionPerson);
  });
  notePeopleResults.addEventListener('keydown', function (event) {
    const person = event.target.closest('[data-note-mention-person]');
    if (!person) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      insertNoteMention(person.dataset.noteMentionPerson);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const people = Array.from(notePeopleResults.querySelectorAll('[data-note-mention-person]'));
      const index = people.indexOf(person);
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const next = people[(index + direction + people.length) % people.length];
      if (next) {
        event.preventDefault();
        next.focus();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setNotePeopleOpen(false);
      noteBody.focus();
    }
  });
  noteBody.addEventListener('keydown', function (event) {
    if (event.key === '@' || (event.key === '2' && event.shiftKey)) {
      requestAnimationFrame(syncTypedMentionPicker);
    } else if (event.key === 'ArrowDown' && !notePeoplePicker.hidden) {
      const firstPerson = notePeopleResults.querySelector('[data-note-mention-person]');
      if (firstPerson) {
        event.preventDefault();
        firstPerson.focus();
      }
    }
  });
  noteBody.addEventListener('input', syncTypedMentionPicker);
  noteBody.addEventListener('compositionend', syncTypedMentionPicker);
  noteBody.addEventListener('keyup', captureNoteMentionRange);

  composer.addEventListener('submit', function (event) {
    event.preventDefault();
    const context = selectedNoteRecord;
    if (!context) {
      noteValidation.textContent = 'Choose the record this follow-up belongs to.';
      noteRecordTrigger.focus();
      return;
    }
    if (followUpType === 'meeting') {
      const title = meetingTitle.value.trim();
      const date = meetingDate.value;
      const time = meetingTime.value;
      const duration = Number(meetingDuration.value);
      const method = meetingMethod.value;
      const methodValue = meetingMethodValue.value.trim();
      if (!title) {
        noteValidation.textContent = 'Add a meeting title.';
        meetingTitle.focus();
        return;
      }
      if (!date) {
        noteValidation.textContent = 'Choose a meeting date.';
        meetingDate.focus();
        return;
      }
      if (!time) {
        noteValidation.textContent = 'Choose a meeting start time.';
        meetingTime.focus();
        return;
      }
      if (!duration) {
        noteValidation.textContent = 'Choose a meeting duration.';
        meetingDuration.focus();
        return;
      }
      if (!method) {
        noteValidation.textContent = 'Choose a meeting method.';
        meetingMethod.focus();
        return;
      }
      if (method === 'in-person' && !methodValue) {
        noteValidation.textContent = 'Add the meeting address.';
        meetingMethodValue.focus();
        return;
      }
      if (method === 'manual' && !/^https?:\/\//i.test(methodValue)) {
        noteValidation.textContent = 'Paste a valid meeting link beginning with https:// or http://.';
        meetingMethodValue.focus();
        return;
      }
      const start = new Date(date + 'T' + time + ':00');
      if (Number.isNaN(start.getTime())) {
        noteValidation.textContent = 'Choose a valid meeting date and time.';
        meetingDate.focus();
        return;
      }
      const settings = {
        type: context.type,
        record: context.record,
        title: title,
        startAt: start.toISOString(),
        date: date,
        time: time,
        duration: duration,
        method: method,
        methodValue: methodValue,
        attendees: selectedMeetingAttendees.slice(),
        agenda: meetingAgenda.value.trim()
      };
      const api = crmApi();
      const result = context.module === 'crm' && api && typeof api.createMeeting === 'function'
        ? api.createMeeting(settings)
        : savePlatformRecordMeeting(settings, context);
      if (!result) {
        noteValidation.textContent = 'The Meeting could not be scheduled.';
        return;
      }
      resetNoteComposer();
      setComposerOpen(false, false);
      reloadTasks();
      notify('Meeting scheduled and added to Needs Your Attention.');
      return;
    }
    const title = noteTitle.value.trim();
    const body = (noteBody.innerText || '').replace(/\n{3,}/g, '\n\n').trim();
    if (!body) {
      noteValidation.textContent = 'Write a note before saving.';
      noteBody.focus();
      return;
    }
    if (body.length > 1500) {
      noteValidation.textContent = 'Keep the note under 1,500 characters.';
      noteBody.focus();
      return;
    }
    if (!noteDate.value) {
      noteValidation.textContent = 'Choose a follow-up date. Needs Your Attention always creates a scheduled follow-up.';
      noteDate.focus();
      return;
    }
    if (!noteTime.value) {
      noteValidation.textContent = 'Choose a follow-up time. Needs Your Attention always creates a scheduled follow-up.';
      noteTime.focus();
      return;
    }
    const followUpAt = noteDate.value ? new Date(noteDate.value + 'T' + noteTime.value + ':00') : null;
    if (followUpAt && Number.isNaN(followUpAt.getTime())) {
      noteValidation.textContent = 'Choose a valid follow-up date and time.';
      return;
    }
    const mentions = noteMentions();
    const settings = {
      type: context.type,
      record: context.record,
      title: title || 'Note',
      body: body,
      bodyHtml: noteBody.innerHTML,
      mentions: mentions,
      followUpAt: followUpAt ? followUpAt.toISOString() : ''
    };
    const api = crmApi();
    const result = context.module === 'crm' && api && typeof api.createNote === 'function'
      ? api.createNote(settings)
      : savePlatformRecordNote(settings, context);
    if (!result) {
      noteValidation.textContent = 'The Note could not be saved.';
      return;
    }
    const behaviour = result.behaviour || 'record-note';
    resetNoteComposer();
    setComposerOpen(false, false);
    reloadTasks();
    if (behaviour === 'assigned-attention') notify('Added to Needs Your Attention for @' + result.assignedTo + '. Note saved to the record.');
    else if (behaviour === 'self-reminder') notify('Added to Needs Your Attention. Note saved to the record.');
    else if (behaviour === 'mention') notify('Note saved with a Mention. No actionable item was created.');
    else notify('Note saved to ' + context.moduleLabel + ' · ' + context.label + '.');
  });

  composer.querySelectorAll('[data-attention-note-format]').forEach(function (button) {
    button.addEventListener('mousedown', function (event) { event.preventDefault(); });
    button.addEventListener('click', function () {
      noteBody.focus();
      document.execCommand(button.dataset.attentionNoteFormat, false, null);
    });
  });

  list.addEventListener('change', async function (event) {
    if (event.target.matches('[data-attention-attachment-input]')) {
      const form = event.target.closest('[data-attention-reply-form]');
      const current = form._attentionAttachments || [];
      const remaining = Math.max(0, QUICK_REPLY_MAX_ATTACHMENTS - current.length);
      const selected = Array.from(event.target.files || []);
      event.target.value = '';
      if (!remaining) {
        notify('You can attach up to ' + QUICK_REPLY_MAX_ATTACHMENTS + ' files.');
        return;
      }
      const accepted = selected.slice(0, remaining);
      const pending = accepted.map(function (file) {
        const isImage = /^image\//i.test(file.type || '') || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name || '');
        return {
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size || 0,
          isImage: isImage,
          dataUrl: '',
          loading: isImage && file.size <= QUICK_REPLY_PREVIEW_MAX_BYTES
        };
      });
      form._attentionAttachments = current.concat(pending).filter(function (file, index, all) {
        return all.findIndex(function (candidate) { return candidate.name === file.name && candidate.size === file.size; }) === index;
      });
      renderQuickReplyAttachments(form);
      if (selected.length > remaining) notify('Only the first ' + remaining + ' files were attached.');
      const readPromise = Promise.all(accepted.map(quickReplyAttachmentRecord));
      form._attentionAttachmentPromise = readPromise;
      const records = await readPromise;
      records.forEach(function (record) {
        const target = (form._attentionAttachments || []).find(function (file) {
          return file.name === record.name && file.size === record.size;
        });
        if (target) Object.assign(target, record);
      });
      form._attentionAttachmentPromise = null;
      renderQuickReplyAttachments(form);
      return;
    }
    if (!event.target.classList.contains('attention-checkbox')) return;
    const row = event.target.closest('[data-attention-id]');
    const task = row && findTask(row.dataset.attentionId);
    if (!task) return;
    if (task.done) reopenCompletedTask(task);
    else completeTask(task);
  });

  list.addEventListener('submit', async function (event) {
    const row = event.target.closest('[data-attention-id]');
    const task = row && findTask(row.dataset.attentionId);
    if (!task) return;
    const api = crmApi();
    if (event.target.matches('[data-attention-reply-form]')) {
      event.preventDefault();
      if (event.target._attentionAttachmentPromise) await event.target._attentionAttachmentPromise;
      const body = event.target.querySelector('[data-attention-reply-text]').value.trim();
      const replyMeta = {
        mentions: event.target._attentionMentions || [],
        attachments: event.target._attentionAttachments || []
      };
      if (!body || !api || !api.reply(task.id, body, replyMeta)) return;
      delete replyDrafts[task.id];
      event.target.reset();
      event.target._attentionMentions = [];
      event.target._attentionAttachments = [];
      closeActions();
      reloadTasks();
      notify('Reply added to ' + task.record + '.');
      return;
    }
    if (event.target.matches('[data-attention-reschedule-form]')) {
      event.preventDefault();
      const value = event.target.querySelector('[data-attention-reschedule-value]').value;
      if (!value) return;
      const due = new Date(value);
      const reopening = Boolean(task.done || (openInline && openInline.id === task.id && openInline.reopen));
      if (Number.isNaN(due.getTime())) return;
      if (reopening && due.getTime() <= Date.now()) {
        notify('Choose a future date and time to reopen this follow-up.');
        return;
      }
      let rescheduled = false;
      if (api && task.sourceType) rescheduled = Boolean(api.reschedule(task.id, value));
      else {
        const localTask = localTasks.find(function (item) { return String(item.id) === String(task.id); }) || task;
        localTask.dueAt = due.toISOString();
        localTask.when = due.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        if (reopening) {
          localTask.done = false;
          delete localTask.completedAt;
        }
        saveLocalTasks();
        rescheduled = true;
      }
      if (!rescheduled) {
        notify('Could not reschedule ' + task.title + '.');
        return;
      }
      closeActions();
      reloadTasks();
      notify(task.title + (reopening ? ' rescheduled and reopened.' : ' rescheduled.'));
    }
  });

  list.addEventListener('click', function (event) {
    if (event.target.closest('[data-attention-empty-create]')) {
      setComposerOpen(true, false);
      return;
    }
    const row = event.target.closest('[data-attention-id]');
    const task = row && findTask(row.dataset.attentionId);
    if (!task) return;

    if (event.target.closest('[data-attention-inline-cancel]')) {
      closeActions();
      render();
      return;
    }
    const reaction = event.target.closest('[data-attention-reaction]');
    if (reaction) {
      const api = crmApi();
      if (task.canReply && api && typeof api.react === 'function' && api.react(task.id, reaction.dataset.attentionReaction)) {
        closeActions();
        reloadTasks();
        notify('Reaction sent to ' + task.record + '.');
      }
      return;
    }
    const mentionToggle = event.target.closest('[data-attention-mention-toggle]');
    if (mentionToggle) {
      const picker = mentionToggle.closest('form').querySelector('[data-attention-mention-picker]');
      picker.hidden = !picker.hidden;
      mentionToggle.setAttribute('aria-expanded', String(!picker.hidden));
      return;
    }
    const mentionPerson = event.target.closest('[data-attention-mention-person]');
    if (mentionPerson) {
      const form = mentionPerson.closest('form');
      const field = form.querySelector('[data-attention-reply-text]');
      const name = mentionPerson.dataset.attentionMentionPerson;
      form._attentionMentions = form._attentionMentions || [];
      if (form._attentionMentions.indexOf(name) === -1) form._attentionMentions.push(name);
      const mention = '@' + name + ' ';
      if (field.value.indexOf(mention) === -1) field.value = (field.value.trim() ? field.value.trim() + ' ' : '') + mention;
      form.querySelector('[data-attention-mention-picker]').hidden = true;
      form.querySelector('[data-attention-mention-toggle]').setAttribute('aria-expanded', 'false');
      field.focus();
      return;
    }
    const attachmentRemove = event.target.closest('[data-attention-attachment-remove]');
    if (attachmentRemove) {
      const form = attachmentRemove.closest('form');
      form._attentionAttachments = form._attentionAttachments || [];
      form._attentionAttachments.splice(Number(attachmentRemove.dataset.attentionAttachmentRemove), 1);
      renderQuickReplyAttachments(form);
      return;
    }
    const inlineTrigger = event.target.closest('[data-attention-inline-action]');
    if (inlineTrigger) {
      const action = inlineTrigger.dataset.attentionInlineAction;
      openMenuId = null;
      selectedTaskId = null;
      if (action === 'react') {
        const wasOpen = openReactionId === task.id;
        openInline = null;
        selectedTaskId = null;
        openReactionId = wasOpen ? null : task.id;
        render();
        if (!wasOpen) requestAnimationFrame(function () {
          const firstReaction = list.querySelector('[data-attention-id="' + CSS.escape(String(task.id)) + '"] .attention-reaction-popover button');
          if (firstReaction) firstReaction.focus({ preventScroll: true });
        });
        return;
      }
      openReactionId = null;
      if (action === 'reply') {
        openInline = { id: task.id, type: 'reply' };
        render();
        requestAnimationFrame(function () {
          const field = list.querySelector('[data-attention-id="' + CSS.escape(String(task.id)) + '"] [data-attention-reply-text]');
          if (field) field.focus();
        });
        return;
      }
      openInline = { id: task.id, type: action };
      render();
      requestAnimationFrame(function () {
        const selector = '[data-attention-id="' + CSS.escape(String(task.id)) + '"] input[type="datetime-local"]';
        const field = list.querySelector(selector);
        if (field) field.focus();
      });
      return;
    }
    if (event.target.closest('[data-attention-hover-complete]')) {
      completeTask(task);
      return;
    }
    if (event.target.closest('[data-attention-dismiss]')) {
      const api = crmApi();
      if (api && task.sourceType) api.dismiss(task.id);
      else {
        localTasks = localTasks.filter(function (item) { return item.id !== task.id; });
        saveLocalTasks();
      }
      closeActions();
      reloadTasks();
      notify(task.title + ' dismissed from the widget.');
      return;
    }
    const more = event.target.closest('[data-attention-more]');
    if (more) {
      selectedTaskId = null;
      openMenuId = openMenuId === task.id ? null : task.id;
      openInline = null;
      openReactionId = null;
      render();
      return;
    }
    if (event.target.closest('[data-attention-open-record]')) {
      if (longPressFired) { longPressFired = false; return; }
      openRecord(task);
      return;
    }
    if (event.target.closest('[data-attention-select]') || event.target === row) {
      selectedTaskId = String(selectedTaskId) === String(task.id) ? null : task.id;
      openMenuId = null;
      openInline = null;
      openReactionId = null;
      render();
    }
  });

  list.addEventListener('input', function (event) {
    if (!event.target.matches('[data-attention-reply-text]')) return;
    const row = event.target.closest('[data-attention-id]');
    if (row) replyDrafts[row.dataset.attentionId] = event.target.value;
  });

  list.addEventListener('pointerdown', function (event) {
    const main = event.target.closest('.attention-task-main');
    const row = main && main.closest('[data-attention-id]');
    if (!row || (event.pointerType === 'mouse' && event.button !== 0)) return;
    clearTimeout(longPressTimer);
    longPressFired = false;
    longPressTimer = window.setTimeout(function () {
      longPressFired = true;
      selectedTaskId = null;
      openMenuId = row.dataset.attentionId;
      openInline = null;
      openReactionId = null;
      render();
      if (navigator.vibrate) navigator.vibrate(15);
    }, 420);
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (name) {
    list.addEventListener(name, function () { clearTimeout(longPressTimer); });
  });

  list.addEventListener('contextmenu', function (event) {
    const row = event.target.closest('[data-attention-id]');
    if (!row) return;
    event.preventDefault();
    selectedTaskId = null;
    openMenuId = row.dataset.attentionId;
    openInline = null;
    openReactionId = null;
    render();
  });

  root.querySelector('[data-attention-scope-toggle]').addEventListener('click', function () {
    setComposerOpen(false, false);
    scopeMenu.hidden = !scopeMenu.hidden;
    this.setAttribute('aria-expanded', String(!scopeMenu.hidden));
  });

  scopeMenu.addEventListener('click', function (event) {
    const button = event.target.closest('[data-attention-scope]');
    if (!button) return;
    currentScope = button.dataset.attentionScope;
    scopeMenu.querySelectorAll('button').forEach(function (item) { item.classList.toggle('active', item === button); });
    const labels = { my: 'My attention', assigned: 'Assigned by me', team: 'All team' };
    root.querySelector('[data-attention-scope-title]').textContent = labels[currentScope];
    scopeMenu.hidden = true;
    root.querySelector('[data-attention-scope-toggle]').setAttribute('aria-expanded', 'false');
    closeActions();
    render();
  });

  statusFilterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      currentStatusFilter = button.dataset.attentionStatusFilter || 'all';
      try { localStorage.setItem(STATUS_FILTER_STORAGE_KEY, currentStatusFilter); } catch (_) {}
      closeActions();
      render();
    });
  });

  productivityTabs.forEach(function (button, index) {
    button.addEventListener('click', function () {
      selectProductivityTab(button.dataset.attentionProductivityTab);
    });
    button.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = productivityTabs[(index + direction + productivityTabs.length) % productivityTabs.length];
      selectProductivityTab(next.dataset.attentionProductivityTab);
      next.focus();
      event.preventDefault();
    });
  });

  if (personalNoteEditor) {
    personalNoteEditor.addEventListener('input', function () {
      updatePersonalNoteMeta('Saving…');
      clearTimeout(personalNoteSaveTimer);
      personalNoteSaveTimer = window.setTimeout(savePersonalNote, 480);
    });
    personalNoteEditor.addEventListener('blur', function () {
      clearTimeout(personalNoteSaveTimer);
      savePersonalNote();
    });
  }

  root.querySelectorAll('[data-personal-note-command]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!personalNoteEditor) return;
      personalNoteEditor.focus();
      document.execCommand(button.dataset.personalNoteCommand, false, null);
      updatePersonalNoteMeta('Saving…');
      clearTimeout(personalNoteSaveTimer);
      personalNoteSaveTimer = window.setTimeout(savePersonalNote, 300);
    });
  });

  const checklistButton = root.querySelector('[data-personal-note-checklist]');
  if (checklistButton) checklistButton.addEventListener('click', function () {
    if (!personalNoteEditor) return;
    personalNoteEditor.focus();
    document.execCommand('insertHTML', false, '<div class="personal-note-checkline"><input type="checkbox" contenteditable="false"><span>Checklist item</span></div><div><br></div>');
    updatePersonalNoteMeta('Saving…');
    clearTimeout(personalNoteSaveTimer);
    personalNoteSaveTimer = window.setTimeout(savePersonalNote, 300);
  });

  if (briefingLayer) {
    briefingLayer.querySelectorAll('[data-briefing-close], [data-briefing-skip]').forEach(function (button) {
      button.addEventListener('click', function () { closeBriefing('dock'); });
    });
    const briefingNext = briefingLayer.querySelector('[data-briefing-next]');
    const briefingPrevious = briefingLayer.querySelector('[data-briefing-previous]');
    const briefingStart = briefingLayer.querySelector('[data-briefing-start]');
    const briefingDailyStart = briefingLayer.querySelector('[data-briefing-daily-start]');
    const briefingViewAll = briefingLayer.querySelector('[data-briefing-view-all]');
    if (briefingNext) briefingNext.addEventListener('click', function () { showBriefingStep(briefingStep + 1); });
    if (briefingPrevious) briefingPrevious.addEventListener('click', function () { showBriefingStep(briefingStep - 1); });
    if (briefingStart) briefingStart.addEventListener('click', function () { closeBriefing('dock'); });
    if (briefingDailyStart) briefingDailyStart.addEventListener('click', function () { closeBriefing('dock'); });
    if (briefingViewAll) briefingViewAll.addEventListener('click', function () { closeBriefing('list'); });
    briefingLayer.querySelectorAll('[data-briefing-scope]').forEach(function (button) {
      button.addEventListener('click', function () {
        currentScope = button.dataset.briefingScope || 'my';
        const labels = { my: 'My attention', assigned: 'Assigned by me', team: 'All team' };
        const title = root.querySelector('[data-attention-scope-title]');
        if (title) title.textContent = labels[currentScope] || labels.my;
        closeBriefing('list');
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && briefingMode) {
        event.preventDefault();
        closeBriefing('dock');
      } else if (event.key === 'Escape' && !recordPickerLayer.hidden) {
        event.preventDefault();
        setRecordPickerOpen(false, true);
      } else if (event.key === 'Escape' && !notePeoplePicker.hidden) {
        event.preventDefault();
        setNotePeopleOpen(false);
        noteBody.focus();
      } else if (event.key === 'Escape' && !meetingAttendeesPicker.hidden) {
        event.preventDefault();
        setMeetingAttendeesOpen(false);
        meetingAttendeesToggle.focus();
      } else if (event.key === 'Escape' && !modalLayer.hidden) {
        event.preventDefault();
        closeEntireNoteFlow(true);
      }
    });
  }

  root.querySelectorAll('[data-attention-collapse]').forEach(function (button) {
    button.addEventListener('click', function () {
      // Minimise always means the smallest Follow-up pill, regardless of
      // whether the Dock is floating, medium-sized, or right-docked.
      undockWidget(true, true);
      root.classList.remove('is-opening');
      root.classList.add('is-collapsing');
      closeActions();
      setComposerOpen(false, false);
      root.querySelectorAll('[data-attention-collapse]').forEach(function (item) { item.setAttribute('aria-expanded', 'false'); });
      window.setTimeout(function () { root.classList.remove('is-collapsing'); }, 320);
    });
  });

  root.querySelectorAll('[data-attention-dock-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (root.classList.contains('is-docked')) openMediumSidePanel(currentProductivityTab, true);
      else dockWidget(true);
    });
  });

  mini.addEventListener('click', function (event) {
    if (event.target.closest('[data-attention-mini-create]')) {
      setComposerOpen(true, false);
      return;
    }
    if (event.target.closest('[data-attention-mini-expand]')) {
      openMediumSidePanel('attention');
      return;
    }
    if (event.target === mini) {
      openMediumSidePanel('attention');
    }
  });

  toast.addEventListener('click', function (event) {
    if (!event.target.closest('[data-attention-undo]') || typeof undoAction !== 'function') return;
    const action = undoAction;
    undoAction = null;
    clearTimeout(toastTimer);
    action();
  });

  root.addEventListener('click', function (event) {
    if (!event.target.closest('.attention-head')) scopeMenu.hidden = true;
  });

  root.addEventListener('click', function (event) {
    if (Date.now() >= suppressWidgetClickUntil) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  root.addEventListener('pointerdown', startWidgetDrag);
  root.addEventListener('pointerleave', function () {
    root.classList.remove('is-post-drag-tools-hidden');
  });
  root.addEventListener('focusin', function () {
    root.classList.remove('is-post-drag-tools-hidden');
  });
  document.addEventListener('pointermove', function (event) {
    moveWidgetDrag(event);
    moveDockResize(event);
    moveMediumResize(event);
    if (!widgetDrag && root.classList.contains('is-post-drag-tools-hidden') && !root.contains(event.target)) {
      root.classList.remove('is-post-drag-tools-hidden');
    }
  });
  document.addEventListener('pointerup', function (event) {
    finishWidgetDrag(event);
    finishDockResize(event);
    finishMediumResize(event);
  });
  document.addEventListener('pointercancel', function (event) {
    finishWidgetDrag(event);
    finishDockResize(event);
    finishMediumResize(event);
  });

  if (dockResizer) {
    dockResizer.addEventListener('pointerdown', startDockResize);
    dockResizer.addEventListener('keydown', function (event) {
      if (!root.classList.contains('is-docked')) return;
      const step = event.shiftKey ? 32 : 16;
      if (event.key === 'ArrowLeft') setDockWidth(widgetLayout.dockWidth + step, true);
      else if (event.key === 'ArrowRight') setDockWidth(widgetLayout.dockWidth - step, true);
      else if (event.key === 'Home') setDockWidth(dockWidthBounds().min, true);
      else if (event.key === 'End') setDockWidth(dockWidthBounds().max, true);
      else return;
      event.preventDefault();
    });
  }

  if (mediumResizer) {
    mediumResizer.addEventListener('pointerdown', startMediumResize);
    mediumResizer.addEventListener('keydown', function (event) {
      if (!root.classList.contains('is-medium-panel')) return;
      const step = event.shiftKey ? 32 : 16;
      let width = widgetLayout.mediumWidth;
      let height = widgetLayout.mediumHeight;
      if (event.key === 'ArrowLeft') width -= step;
      else if (event.key === 'ArrowRight') width += step;
      else if (event.key === 'ArrowUp') height -= step;
      else if (event.key === 'ArrowDown') height += step;
      else if (event.key === 'Home') {
        width = MEDIUM_MIN_WIDTH;
        height = MEDIUM_MIN_HEIGHT;
      } else if (event.key === 'End') {
        width = MEDIUM_DEFAULT_WIDTH;
        height = MEDIUM_DEFAULT_HEIGHT;
      } else return;
      setMediumSize(width, height, true);
      setFloatingPosition(widgetLayout.left, widgetLayout.top, false);
      event.preventDefault();
    });
  }

  function expandNavigationFromDock(event) {
    if (!root.classList.contains('is-docked')) return;
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openMediumSidePanel(currentProductivityTab, true);
  }

  if (navToggle) {
    navToggle.addEventListener('click', expandNavigationFromDock, true);
    navToggle.addEventListener('keydown', expandNavigationFromDock, true);
  }

  document.addEventListener('click', function (event) {
    requestAnimationFrame(updateFloatingPosition);
    if (!root.contains(event.target)) {
      closeActions();
      window.setTimeout(reloadTasks, 20);
    }
  }, true);
  document.addEventListener('wequote:attention-changed', function () {
    // Completing through this widget already owns the confirmation animation
    // and performs one final render. Ignore the CRM bridge's synchronous event
    // so the row does not disappear and reappear halfway through the motion.
    if (completingTaskIds.size > 0) return;
    reloadTasks();
  });
  document.addEventListener('wequote:attention-widget-preference', function (event) {
    setWidgetAvailability(!event.detail || event.detail.enabled !== false);
  });
  window.addEventListener('resize', function () {
    if (root.classList.contains('is-docked')) {
      if (window.innerWidth < DOCK_MIN_VIEWPORT) undockWidget(true, true);
      else setDockWidth(widgetLayout.dockWidth, false);
    } else if (root.classList.contains('is-medium-panel')) {
      setMediumSize(widgetLayout.mediumWidth, widgetLayout.mediumHeight, false);
      const left = widgetLayout.left == null ? (window.innerWidth - root.offsetWidth) / 2 : widgetLayout.left;
      const top = widgetLayout.top == null ? (window.innerHeight - root.offsetHeight) / 2 : widgetLayout.top;
      setFloatingPosition(left, top, true);
    } else if (root.style.left) {
      setFloatingPosition(widgetLayout.left, widgetLayout.top, false);
    }
    updateFloatingPosition();
  });
  window.addEventListener('hashchange', updateFloatingPosition);
  window.setInterval(function () { if (widgetEnabled && !openMenuId && modalLayer.hidden && recordPickerLayer.hidden && completingTaskIds.size === 0) reloadTasks(); }, 15000);

  loadLocalTasks();
  loadPlatformNotes();
  loadPlatformMeetings();
  syncMeetingMethod();
  renderMeetingAttendees();
  setFollowUpType('note', false);
  loadWidgetLayout();
  loadPersonalNote();
  try {
    const savedStatusFilter = localStorage.getItem(STATUS_FILTER_STORAGE_KEY);
    if (savedStatusFilter === 'open' || savedStatusFilter === 'completed') currentStatusFilter = savedStatusFilter;
  } catch (_) {}
  try { currentProductivityTab = localStorage.getItem(PRODUCTIVITY_TAB_STORAGE_KEY) || 'attention'; } catch (_) {}
  selectProductivityTab(currentProductivityTab, false);
  reloadTasks();
  let savedWidgetEnabled = true;
  try { savedWidgetEnabled = localStorage.getItem(WIDGET_ENABLED_STORAGE_KEY) !== 'false'; } catch (_) {}
  setWidgetAvailability(savedWidgetEnabled);
  window.setTimeout(initializeBriefing, 320);
}());
