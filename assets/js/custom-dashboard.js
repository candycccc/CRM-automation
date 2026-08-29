(function () {
  'use strict';

  var STORAGE_KEY = 'wequote-my-dashboard-layout-v2';
  var grid = document.getElementById('myDashboardGrid');
  var myPanel = document.getElementById('myDashboardPanel');
  var standardPanel = document.getElementById('standardDashboardPanel');
  var customiseButton = document.getElementById('myDashboardCustomise');
  var doneButton = document.getElementById('myDashboardDone');
  var customiseNote = document.getElementById('myDashboardCustomiseNote');
  var drawer = document.getElementById('myDashboardDrawer');
  var drawerBackdrop = document.getElementById('myDashboardDrawerBackdrop');
  var drawerClose = document.getElementById('myDashboardDrawerClose');
  var drawerDone = document.getElementById('myDashboardDrawerDone');
  var drawerReset = document.getElementById('myDashboardReset');
  var library = document.getElementById('myDashboardLibrary');
  var tabActionsMy = document.querySelector('[data-dashboard-actions="my"]');
  var tabActionsStandard = document.querySelector('[data-dashboard-actions="standard"]');

  if (!grid || !myPanel || !standardPanel) return;

  var currentTab = 'my';
  var customising = false;
  var draggedId = null;

  function row(title, meta, trailing, rowClass) {
    return '<div class="mydb-list-row' + (rowClass ? ' ' + rowClass : '') + '">' +
      '<span class="mydb-check" aria-hidden="true"></span>' +
      '<span class="mydb-list-copy"><strong>' + title + '</strong><span>' + meta + '</span></span>' +
      (trailing || '') +
    '</div>';
  }

  function metrics(items) {
    return '<div class="mydb-metrics">' + items.map(function (item) {
      return '<div class="mydb-metric' + (item.money ? ' is-money' : '') + '"><strong>' + item.value + '</strong><span>' + item.label + '</span></div>';
    }).join('') + '</div>';
  }

  var widgets = {
    attention: {
      title: 'Needs your attention',
      description: 'Overdue notes, meetings and tasks that need action.',
      icon: 'fa-circle-exclamation',
      size: 'm',
      allowed: ['s', 'm', 'l'],
      render: function () {
        return '<div class="mydb-list">' +
          row('Confirm projector model', 'CRM · Note · Overdue · 12 Aug, 17:00', '<span class="mydb-pill is-overdue">Overdue</span>') +
          row('Client meeting', 'CRM · Meeting · Today, 10:30', '<span class="mydb-pill">10:30</span>') +
          row('Site survey', 'CRM · Task · Today, 14:00', '<span class="mydb-pill">14:00</span>') +
        '</div>';
      }
    },
    'my-tasks': {
      title: 'My tasks',
      description: 'Your next actions across WeQuote.',
      icon: 'fa-list-check',
      size: 'm',
      allowed: ['m', 'l'],
      variant: 'primary',
      render: function () {
        return '<div class="mydb-task-toolbar">' +
          '<nav class="mydb-card-tabs" aria-label="Task status">' +
            '<button type="button" class="is-active" data-mydb-task-tab="upcoming">Upcoming</button>' +
            '<button type="button" data-mydb-task-tab="overdue">Overdue <span>3</span></button>' +
            '<button type="button" data-mydb-task-tab="completed">Completed</button>' +
          '</nav>' +
          '<button type="button" class="mydb-create-task"><i class="fa-solid fa-plus" aria-hidden="true"></i> Create task</button>' +
        '</div>' +
        '<form class="mydb-quick-task" hidden><input aria-label="New task title" placeholder="What needs to be done?"><button type="submit">Add</button></form>' +
        '<div class="mydb-task-panels">' +
          '<div data-mydb-task-panel="upcoming">' +
            row('Client meeting', 'CRM · Today, 10:30 · 2231 Quail Bluff Ct', '<span class="mydb-source-tag">CRM</span>') +
            row('Send revised AV proposal', 'Quote & Sales · Today, 13:00 · Riverside Penthouse', '<span class="mydb-source-tag is-quote">QUOTE</span>') +
            row('Check equipment availability', 'Procurement · Tomorrow, 09:00', '<span class="mydb-source-tag is-procurement">REQUEST</span>') +
          '</div>' +
          '<div data-mydb-task-panel="overdue" hidden>' +
            row('Confirm projector model', 'CRM · Overdue · 12 Aug, 17:00', '<span class="mydb-pill is-overdue">Overdue</span>') +
            row('Qualify budget', 'CRM · Overdue · ABR Residential Lead', '<span class="mydb-pill is-overdue">Overdue</span>') +
            row('Call back re: budget', 'CRM · Overdue · Wong Residence', '<span class="mydb-pill is-overdue">Overdue</span>') +
          '</div>' +
          '<div data-mydb-task-panel="completed" hidden>' +
            row('Share meeting notes', 'CRM · Completed today, 09:14', '<span class="mydb-pill is-success">Done</span>', 'is-complete') +
            row('Review Quote #11990', 'Quote & Sales · Completed yesterday', '<span class="mydb-pill is-success">Done</span>', 'is-complete') +
          '</div>' +
        '</div>';
      }
    },
    'my-work': {
      title: 'My work',
      description: 'Records you recently opened or need to return to.',
      icon: 'fa-briefcase',
      size: 'm',
      allowed: ['m', 'l'],
      variant: 'primary',
      render: function () {
        return '<div class="mydb-work-toolbar"><span>Recently viewed</span><button type="button">View all <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></div>' +
          '<div class="mydb-work-grid">' +
            '<button type="button" class="mydb-work-card"><span class="mydb-work-icon is-deal"><i class="fa-solid fa-handshake" aria-hidden="true"></i></span><span><strong>2231 Quail Bluff Ct</strong><small>CRM · Deal</small><em>Next action today</em></span></button>' +
            '<button type="button" class="mydb-work-card"><span class="mydb-work-icon is-quote"><i class="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i></span><span><strong>Quote #11990 · R1</strong><small>Quote & Sales · Quote</small><em>In review</em></span></button>' +
            '<button type="button" class="mydb-work-card"><span class="mydb-work-icon is-project"><i class="fa-solid fa-folder-open" aria-hidden="true"></i></span><span><strong>Riverside Penthouse</strong><small>Projects · Project</small><em>2 tasks due soon</em></span></button>' +
            '<button type="button" class="mydb-work-card"><span class="mydb-work-icon is-request"><i class="fa-solid fa-clipboard-list" aria-hidden="true"></i></span><span><strong>Rack equipment request</strong><small>Procurement · Request</small><em>Awaiting response</em></span></button>' +
          '</div>';
      }
    },
    'quote-summary': {
      title: 'Quote summary',
      description: 'Live commercial position at a glance.',
      icon: 'fa-file-invoice-dollar',
      size: 'm',
      allowed: ['s', 'm', 'l'],
      render: function () {
        return metrics([
          { value: '449', label: 'Active Quotes' },
          { value: '1,243', label: 'Accepted Quotes' },
          { value: '£38.6m', label: 'Value in Pipeline', money: true },
          { value: '£16.8m', label: 'Achieved So Far', money: true }
        ]);
      }
    },
    'accepted-quotes': {
      title: 'Recently accepted Quotes',
      description: 'The latest customer acceptances.',
      icon: 'fa-circle-check',
      size: 'm',
      allowed: ['s', 'm', 'l'],
      render: function () {
        return '<div class="mydb-list">' +
          row('DPP9 Owner LLC', 'Theater Proposal · accepted today', '<span class="mydb-pill is-success">£50,687</span>') +
          row('1 Burning Tree', 'Lutron Sunnata · accepted yesterday', '<span class="mydb-pill is-success">£62,306</span>') +
          row('Les Landau', 'Premium Theater Proposal · 25 Aug', '<span class="mydb-pill is-success">£31,346</span>') +
        '</div>';
      }
    },
    'monthly-margin': {
      title: 'Monthly margins',
      description: 'Accepted, sent and in-progress value by month.',
      icon: 'fa-chart-column',
      size: 'm',
      allowed: ['m', 'l'],
      render: function () {
        var bars = [48, 92, 58, 51, 47, 69];
        var labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return '<div class="mydb-chart">' + bars.map(function (height, index) {
          return '<div class="mydb-chart-col"><span class="mydb-chart-bar" style="height:' + height + '%"></span><span>' + labels[index] + '</span></div>';
        }).join('') + '</div>';
      }
    },
    'latest-quotes': {
      title: 'Latest Quotes',
      description: 'Recently updated customer proposals.',
      icon: 'fa-file-lines',
      size: 'm',
      allowed: ['m', 'l'],
      render: function () {
        return '<table class="mydb-table"><thead><tr><th>Customer</th><th>Status</th><th>Net total</th></tr></thead><tbody>' +
          '<tr><td><strong>Les Landau</strong><br>Theater Upgrades</td><td><span class="mydb-pill">Sent</span></td><td>£31,346</td></tr>' +
          '<tr><td><strong>Carley Knobloch</strong><br>Garden Light</td><td><span class="mydb-pill">In progress</span></td><td>£925</td></tr>' +
          '<tr><td><strong>Cherin Joseph</strong><br>2231 Quail Bluff Ct</td><td><span class="mydb-pill">In review</span></td><td>£35,162</td></tr>' +
        '</tbody></table>';
      }
    },
    'my-pipeline': {
      title: 'My pipeline',
      description: 'Quotes assigned to you by current state.',
      icon: 'fa-filter-circle-dollar',
      size: 'm',
      allowed: ['s', 'm', 'l'],
      render: function () {
        return '<div class="mydb-pipeline-row"><span>In progress</span><span class="mydb-progress"><span style="width:78%"></span></span><strong>18</strong></div>' +
          '<div class="mydb-pipeline-row"><span>In review</span><span class="mydb-progress"><span style="width:42%"></span></span><strong>9</strong></div>' +
          '<div class="mydb-pipeline-row"><span>Accepted</span><span class="mydb-progress"><span style="width:61%"></span></span><strong>14</strong></div>';
      }
    },
    meetings: {
      title: 'Upcoming meetings',
      description: 'Your next scheduled customer meetings.',
      icon: 'fa-calendar-days',
      size: 'm',
      allowed: ['s', 'm', 'l'],
      render: function () {
        return '<div class="mydb-list">' +
          row('Client meeting', 'Today · 10:30 · Google Meet', '<span class="mydb-pill">60 min</span>') +
          row('Proposal walkthrough', 'Today · 16:00 · Grand Hyatt', '<span class="mydb-pill">45 min</span>') +
          row('Site survey', 'Tomorrow · 09:00 · New Pool TV', '<span class="mydb-pill">On site</span>') +
        '</div>';
      }
    },
    'team-performance': {
      title: 'Team performance',
      description: 'Accepted Quote value by Salesperson.',
      icon: 'fa-people-group',
      size: 'm',
      allowed: ['m', 'l'],
      render: function () {
        return '<table class="mydb-table"><thead><tr><th>Salesperson</th><th>Quotes</th><th>Accepted</th></tr></thead><tbody>' +
          '<tr><td><strong>Jeff Mitchel</strong></td><td>85</td><td>£8.96m</td></tr>' +
          '<tr><td><strong>Dave Lombard</strong></td><td>58</td><td>£1.94m</td></tr>' +
          '<tr><td><strong>Sean Prater</strong></td><td>43</td><td>£1.30m</td></tr>' +
        '</tbody></table>';
      }
    },
    'quick-links': {
      title: 'Quick links',
      description: 'Shortcuts to the work you use most.',
      icon: 'fa-arrow-up-right-from-square',
      size: 's',
      allowed: ['s', 'm'],
      render: function () {
        return '<div class="mydb-list">' +
          row('Create a Quote', 'Quote & Sales', '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>') +
          row('Open CRM Deals', 'CRM', '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>') +
          row('Create a Purchase Request', 'Procurement', '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>') +
        '</div>';
      }
    }
  };

  var defaultLayout = [
    { id: 'my-tasks', size: 'm' },
    { id: 'my-work', size: 'm' },
    { id: 'attention', size: 'm' },
    { id: 'accepted-quotes', size: 'm' },
    { id: 'quote-summary', size: 'm' },
    { id: 'monthly-margin', size: 'm' },
  ];

  function cloneDefault() {
    return defaultLayout.map(function (item) { return { id: item.id, size: item.size }; });
  }

  function loadLayout() {
    try {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!Array.isArray(stored)) return cloneDefault();
      var valid = stored.filter(function (item) {
        return item && widgets[item.id] && widgets[item.id].allowed.indexOf(item.size) !== -1;
      });
      return valid.length ? valid : cloneDefault();
    } catch (error) {
      return cloneDefault();
    }
  }

  var layout = loadLayout();

  function saveLayout() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch (error) { /* prototype-safe */ }
  }

  function sizeLabel(size) {
    return size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large';
  }

  function renderWidget(item) {
    var definition = widgets[item.id];
    var controls = '<div class="mydb-widget-controls" aria-label="Widget controls">' +
      '<button type="button" class="mydb-drag-handle" title="Drag to reorder" aria-label="Drag ' + definition.title + '"><i class="fa-solid fa-grip-vertical" aria-hidden="true"></i></button>' +
      definition.allowed.map(function (size) {
        return '<button type="button" class="mydb-size-button' + (item.size === size ? ' is-active' : '') + '" data-size="' + size + '" title="' + sizeLabel(size) + '" aria-label="Set ' + definition.title + ' to ' + sizeLabel(size) + '">' + size.toUpperCase() + '</button>';
      }).join('') +
      '<button type="button" class="mydb-remove-widget" title="Remove Widget" aria-label="Remove ' + definition.title + '"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
    '</div>';

    return '<article class="mydb-widget' + (definition.variant ? ' is-' + definition.variant : '') + '" data-widget-id="' + item.id + '" data-size="' + item.size + '" draggable="' + (customising ? 'true' : 'false') + '">' +
      '<header class="mydb-widget-head">' +
        '<span class="mydb-widget-icon"><i class="fa-solid ' + definition.icon + '" aria-hidden="true"></i></span>' +
        '<div class="mydb-widget-title"><h3>' + definition.title + '</h3><p>' + definition.description + '</p></div>' +
        controls +
      '</header>' +
      '<div class="mydb-widget-body">' + definition.render() + '</div>' +
    '</article>';
  }

  function bindGridEvents() {
    grid.querySelectorAll('.mydb-widget').forEach(function (card) {
      var id = card.getAttribute('data-widget-id');
      var handle = card.querySelector('.mydb-drag-handle');
      if (handle) {
        handle.addEventListener('pointerdown', function () { card.setAttribute('draggable', customising ? 'true' : 'false'); });
      }

      card.addEventListener('dragstart', function (event) {
        if (!customising) { event.preventDefault(); return; }
        draggedId = id;
        card.classList.add('is-dragging');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', id);
      });

      card.addEventListener('dragend', function () {
        draggedId = null;
        card.classList.remove('is-dragging');
      });

      card.addEventListener('dragover', function (event) {
        if (!customising || !draggedId || draggedId === id) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      });

      card.addEventListener('drop', function (event) {
        if (!customising || !draggedId || draggedId === id) return;
        event.preventDefault();
        var fromIndex = layout.findIndex(function (item) { return item.id === draggedId; });
        var targetIndex = layout.findIndex(function (item) { return item.id === id; });
        if (fromIndex < 0 || targetIndex < 0) return;
        var moved = layout.splice(fromIndex, 1)[0];
        if (fromIndex < targetIndex) targetIndex -= 1;
        layout.splice(targetIndex, 0, moved);
        saveLayout();
        render();
      });

      card.querySelectorAll('.mydb-size-button').forEach(function (button) {
        button.addEventListener('click', function () {
          var item = layout.find(function (entry) { return entry.id === id; });
          if (!item) return;
          item.size = button.getAttribute('data-size');
          saveLayout();
          render();
        });
      });

      var remove = card.querySelector('.mydb-remove-widget');
      if (remove) remove.addEventListener('click', function () {
        layout = layout.filter(function (item) { return item.id !== id; });
        saveLayout();
        render();
      });

      card.querySelectorAll('[data-mydb-task-tab]').forEach(function (button) {
        button.addEventListener('click', function () {
          var target = button.getAttribute('data-mydb-task-tab');
          card.querySelectorAll('[data-mydb-task-tab]').forEach(function (tab) { tab.classList.toggle('is-active', tab === button); });
          card.querySelectorAll('[data-mydb-task-panel]').forEach(function (panel) { panel.hidden = panel.getAttribute('data-mydb-task-panel') !== target; });
        });
      });

      var createTask = card.querySelector('.mydb-create-task');
      var quickTask = card.querySelector('.mydb-quick-task');
      if (createTask && quickTask) createTask.addEventListener('click', function () {
        quickTask.hidden = !quickTask.hidden;
        if (!quickTask.hidden) quickTask.querySelector('input').focus();
      });
      if (quickTask) quickTask.addEventListener('submit', function (event) {
        event.preventDefault();
        var input = quickTask.querySelector('input');
        var title = input.value.trim();
        if (!title) return;
        var panel = card.querySelector('[data-mydb-task-panel="upcoming"]');
        panel.insertAdjacentHTML('afterbegin', row(title, 'Personal task · Today', '<span class="mydb-source-tag is-personal">PERSONAL</span>'));
        input.value = '';
        quickTask.hidden = true;
      });
    });
  }

  function render() {
    if (!layout.length) {
      grid.innerHTML = '<div class="mydb-empty"><div><i class="fa-solid fa-table-cells-large" aria-hidden="true"></i><p>Your Dashboard is empty.<br>Open Widget Library to add what matters to you.</p></div></div>';
    } else {
      grid.innerHTML = layout.map(renderWidget).join('');
      bindGridEvents();
    }
    renderLibrary();
  }

  function renderLibrary() {
    if (!library) return;
    library.innerHTML = Object.keys(widgets).map(function (id) {
      var definition = widgets[id];
      var added = layout.some(function (item) { return item.id === id; });
      return '<article class="mydb-library-card">' +
        '<span class="mydb-widget-icon"><i class="fa-solid ' + definition.icon + '" aria-hidden="true"></i></span>' +
        '<div><h3>' + definition.title + '</h3><p>' + definition.description + '</p></div>' +
        '<button type="button" class="mydb-widget-add" data-widget-add="' + id + '"' + (added ? ' disabled' : '') + '>' + (added ? '<i class="fa-solid fa-check" aria-hidden="true"></i> Added' : '+ Add') + '</button>' +
      '</article>';
    }).join('');

    library.querySelectorAll('[data-widget-add]').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-widget-add');
        if (!widgets[id] || layout.some(function (item) { return item.id === id; })) return;
        layout.push({ id: id, size: widgets[id].size });
        saveLayout();
        render();
      });
    });
  }

  function openDrawer() {
    if (!drawer || !drawerBackdrop) return;
    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    window.setTimeout(function () {
      if (!drawer.classList.contains('is-open')) {
        drawer.hidden = true;
        drawerBackdrop.hidden = true;
      }
    }, 230);
  }

  function setCustomising(nextValue) {
    customising = !!nextValue;
    document.body.classList.toggle('mydb-customising', customising);
    if (customiseNote) customiseNote.hidden = !customising;
    render();
    if (customising) openDrawer();
    else closeDrawer();
  }

  function selectDashboardTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('[data-dashboard-tab]').forEach(function (tab) {
      var active = tab.getAttribute('data-dashboard-tab') === tabId;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    var isMy = tabId === 'my';
    myPanel.hidden = !isMy;
    standardPanel.hidden = isMy;
    if (tabActionsMy) tabActionsMy.hidden = !isMy;
    if (tabActionsStandard) tabActionsStandard.hidden = isMy;
    if (!isMy && customising) setCustomising(false);
  }

  document.querySelectorAll('[data-dashboard-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () { selectDashboardTab(tab.getAttribute('data-dashboard-tab')); });
    tab.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectDashboardTab(tab.getAttribute('data-dashboard-tab'));
      }
    });
  });

  if (customiseButton) customiseButton.addEventListener('click', function () { setCustomising(true); });
  if (doneButton) doneButton.addEventListener('click', function () { setCustomising(false); });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerDone) drawerDone.addEventListener('click', function () { setCustomising(false); });
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  if (drawerReset) drawerReset.addEventListener('click', function () {
    layout = cloneDefault();
    saveLayout();
    render();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeDrawer();
  });

  window.WeQuoteCustomDashboard = {
    getLayout: function () { return layout.map(function (item) { return { id: item.id, size: item.size }; }); },
    reset: function () { layout = cloneDefault(); saveLayout(); render(); },
    openLibrary: function () { setCustomising(true); }
  };

  var greeting = document.getElementById('myDashboardHeading');
  if (greeting) {
    var hour = new Date().getHours();
    greeting.textContent = (hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening') + ', Candy';
  }

  render();
  selectDashboardTab(currentTab);
}());
