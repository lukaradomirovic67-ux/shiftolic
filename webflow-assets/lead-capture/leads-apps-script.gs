/**
 * Nues, Let's talk form: leads (TEST)
 * Saves what visitors type into the booking form, step by step, also when they do not finish.
 * One row per visitor (Lead ID); every new send updates that row and never clears a cell that was filled before.
 * Newest visitor on top. Row colour: green = booked, yellow = sent the form but did not book, red = stopped in the form.
 *
 * Setup (once):
 * 1. In the Google Sheet: Extensions > Apps Script. Delete everything there, paste this file, Save.
 * 2. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy.
 * 3. Allow access with your account (Advanced > Go to ... > Allow; the warning is shown because the script is yours,
 *    not a published app).
 * 4. Copy the Web app URL (ends in /exec) and send it to the developer. It goes in the data-lead-url attribute
 *    of .lt-form on the Let's talk page.
 * After changing this code: Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy (same URL).
 * Menu "Nues > Tidy up the Leads sheet" (in the sheet) rebuilds the layout, colours and order at any time.
 * Columns are found by their header text: rename a header only here in COLUMNS, not in the sheet.
 *
 * v2 (21.11.2026): finds the row with TextFinder, ignores a request older than the last one saved (Sent at column).
 * v3 (21.11.2026): readable layout (order, widths, date and time, colours, newest on top, technical columns hidden),
 *                  "Booked" dropped (Step reached "5 Booked" says it), shorter meeting text.
 * v4 (21.11.2026): Slack alerts (test phase, private channel). Every 10 minutes the sheet is checked: a visitor who left an
 *                  email or phone and did not book within ABANDON_MINUTES gets one "Did not book" message, a booking
 *                  gets one "Booked" message. Rows that were in the sheet before the alerts were turned on get none.
 *
 * Slack setup (once):
 * 1. Slack: api.slack.com/apps > Create New App > From scratch > name "Nues Leads", your workspace.
 *    Incoming Webhooks > On > Add New Webhook to Workspace > pick the channel > Allow > copy the Webhook URL.
 * 2. Apps Script: Project Settings (gear) > Script Properties > Add script property:
 *    SLACK_WEBHOOK_URL = the Webhook URL. Keep it only there: anyone with the URL can post to the channel.
 *    Optional: ABANDON_MINUTES = 2 for a quick test (without it: 30).
 * 3. In the sheet: Nues > Turn on Slack alerts (Google asks for permission once). A message arrives in the channel.
 */
var ABANDON_MINUTES = 30;   /* "Did not book" goes out this long after the visitor's last activity */
var NOTIFY_BOOKED = true;   /* false = no message for bookings (Cal.com already emails the team) */
var SHEET_NAME = 'Leads';
/* key (as the page sends it), header, width in px, hidden */
var COLUMNS = [
  ['last', 'Last activity', 120], ['step', 'Step reached', 115], ['name', 'Name', 150], ['email', 'Email', 210],
  ['phone', 'Phone', 135], ['company', 'Company', 140], ['website', 'Website', 160], ['budget', 'Budget', 110],
  ['source', 'How they heard about us', 120], ['notes', 'Notes', 280], ['bookingTime', 'Meeting', 270],
  ['guests', 'Guests', 170], ['tz', 'Time zone', 130], ['referrer', 'Came from', 220], ['utm', 'UTM', 150],
  ['first', 'First seen', 120, true], ['page', 'Page', 200, true], ['id', 'Lead ID', 130, true], ['ts', 'Sent at (ms)', 110, true],
  ['notified', 'Slack sent', 150, true]
];
/* headers of earlier versions, so their rows move into this layout */
var OLD_HEADERS = { 'Last update': 'last', 'Booking time': 'bookingTime', 'Referrer': 'referrer', 'Booked': '' };
var STEP_NAMES = { 1: '1 Contact', 2: '2 About you', 3: '3 Your project', 4: '4 Calendar', 5: '5 Booked' };
var DATE_FORMAT = 'dd.mm.yyyy hh:mm';

function doPost(e) {
  var raw = (e && e.postData && e.postData.contents) || '';
  if (!raw || raw.length > 20000) return reply_('bad request');
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); } catch (err) { return reply_('busy'); }
  try {
    var d = JSON.parse(raw);
    if (!d || typeof d.id !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(d.id)) return reply_('bad id');
    var sh = sheet_();
    if (!layoutOk_(sh)) tidy_(sh);
    var col = colIndex_('id') + 1, n = COLUMNS.length;
    var found = sh.getLastRow() > 1 ? sh.getRange(2, col, sh.getLastRow() - 1, 1).createTextFinder(d.id).matchEntireCell(true).findNext() : null;
    var old = found ? sh.getRange(found.getRow(), 1, 1, n).getValues()[0] : [];
    var ts = Number(d.ts) || 0, oldTs = Number(old[colIndex_('ts')]) || 0;
    if (ts && oldTs && ts < oldTs) return reply_('old');  /* a request that arrives after a newer one is ignored */
    var rowNum = found ? found.getRow() : newRow_(sh);
    var now = new Date();
    var row = COLUMNS.map(function (c, i) {
      var key = c[0], prev = old[i];
      if (key === 'id') return d.id;
      if (key === 'first') return prev || now;
      if (key === 'last') return now;
      if (key === 'ts') return Math.max(ts, oldTs) || '';
      if (key === 'notified') return prev === undefined ? '' : prev;  /* only the Slack check writes this */
      if (key === 'step') { var s = Math.max(stepNum_(prev), parseInt(d.step, 10) || 0); return STEP_NAMES[s] || ''; }
      var v = clean_(key === 'bookingTime' ? meeting_(d[key]) : d[key]);
      if (v !== '') return v;
      return typeof prev === 'string' ? safe_(prev) : (prev === undefined ? '' : prev);
    });
    sh.getRange(rowNum, 1, 1, n).setValues([row]);
    return reply_('ok');
  } catch (err) {
    return reply_('error');
  } finally {
    lock.releaseLock();
  }
}

/* Opening the /exec URL in a browser shows this, to check the deployment works. */
function doGet() { return reply_('Nues leads endpoint is running.'); }

/* Menu in the sheet */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Nues').addItem('Tidy up the Leads sheet', 'tidyLeads').addSeparator()
    .addItem('Turn on Slack alerts', 'turnOnSlack').addItem('Send a Slack test message', 'testSlack')
    .addItem('Turn off Slack alerts', 'turnOffSlack').addToUi();
}
function tidyLeads() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try { tidy_(sheet_()); } finally { lock.releaseLock(); }
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME, 0);
}
function colIndex_(key) { for (var i = 0; i < COLUMNS.length; i++) if (COLUMNS[i][0] === key) return i; return -1; }
function layoutOk_(sh) {
  if (sh.getLastRow() === 0) return false;
  var head = sh.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
  for (var i = 0; i < COLUMNS.length; i++) if (head[i] !== COLUMNS[i][1]) return false;
  return true;
}
/* new visitor: an empty row right under the header, without the header's look */
function newRow_(sh) {
  sh.insertRowBefore(2);
  sh.getRange(2, 1, 1, COLUMNS.length).setFontWeight('normal').setFontColor('#0d1928').setBackground(null);
  formatRows_(sh, 2, 1);
  return 2;
}

/* Rebuilds the sheet in this layout: rows from any earlier layout are kept, newest first, then formatted. */
function tidy_(sh) {
  var rows = [];
  if (sh.getLastRow() > 1) {
    var all = sh.getRange(1, 1, sh.getLastRow(), Math.max(sh.getLastColumn(), 1)).getValues();
    var keys = all[0].map(function (h) {
      var i = -1; for (var j = 0; j < COLUMNS.length; j++) if (COLUMNS[j][1] === h) i = j;
      if (i > -1) return COLUMNS[i][0];
      return OLD_HEADERS.hasOwnProperty(h) ? OLD_HEADERS[h] : '';
    });
    for (var r = 1; r < all.length; r++) {
      var o = {}; keys.forEach(function (k, c) { if (k) o[k] = all[r][c]; });
      if (!o.id) continue;
      if (o.bookingTime) o.bookingTime = meeting_(o.bookingTime);
      rows.push(COLUMNS.map(function (c) { var v = o[c[0]]; return typeof v === 'string' ? safe_(v) : (v === undefined || v === null ? '' : v); }));
    }
    var li = colIndex_('last');
    rows.sort(function (a, b) { return time_(b[li]) - time_(a[li]); });
  }
  var f = sh.getFilter(); if (f) f.remove();
  sh.clear(); sh.clearConditionalFormatRules();
  if (sh.getMaxColumns() < COLUMNS.length) sh.insertColumnsAfter(sh.getMaxColumns(), COLUMNS.length - sh.getMaxColumns());
  var n = COLUMNS.length;
  sh.getRange(1, 1, 1, n).setValues([COLUMNS.map(function (c) { return c[1]; })])
    .setFontWeight('bold').setFontColor('#ffffff').setBackground('#0d1928').setVerticalAlignment('middle');
  sh.setRowHeight(1, 32);
  sh.setFrozenRows(1);
  if (rows.length) sh.getRange(2, 1, rows.length, n).setValues(rows);
  formatRows_(sh, 2, Math.max(sh.getMaxRows() - 1, 1));
  sh.showColumns(1, n);
  COLUMNS.forEach(function (c, i) { sh.setColumnWidth(i + 1, c[2]); if (c[3]) sh.hideColumns(i + 1); });
  sh.getRange(1, colIndex_('step') + 1).setNote('Green: booked a meeting.\nYellow: sent the form, did not book a time.\nRed: stopped in the form; the step shows where.');
  /* row colours by step (the range starts at the header so rows added under it are covered; the header never matches) */
  var stepCol = String.fromCharCode(65 + colIndex_('step'));
  var all2 = sh.getRange(1, 1, sh.getMaxRows(), n);
  var rule = function (formula, color) { return SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formula).setBackground(color).setRanges([all2]).build(); };
  sh.setConditionalFormatRules([
    rule('=$' + stepCol + '1="5 Booked"', '#dcf3e4'),
    rule('=$' + stepCol + '1="4 Calendar"', '#fff3cd'),
    rule('=AND($' + stepCol + '1<>"",IFERROR(VALUE(LEFT($' + stepCol + '1,1))<4,FALSE))', '#fde4e2')
  ]);
  sh.getRange(1, 1, Math.max(sh.getLastRow(), 2), n).createFilter();
  /* the empty "Sheet1" Google adds to a new file goes, the Leads sheet comes first */
  var ss = sh.getParent(), first = ss.getSheetByName('Sheet1');
  if (first && first.getSheetId() !== sh.getSheetId() && first.getLastRow() === 0 && first.getLastColumn() === 0) ss.deleteSheet(first);
  ss.setActiveSheet(sh); ss.moveActiveSheet(1);
}
function formatRows_(sh, from, count) {
  var n = COLUMNS.length;
  sh.getRange(from, 1, count, n).setVerticalAlignment('top').setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  sh.getRange(from, colIndex_('notes') + 1, count, 1).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sh.getRange(from, colIndex_('last') + 1, count, 1).setNumberFormat(DATE_FORMAT);
  sh.getRange(from, colIndex_('first') + 1, count, 1).setNumberFormat(DATE_FORMAT);
}
function time_(v) { return v instanceof Date ? v.getTime() : (Date.parse(v) || 0); }
function stepNum_(v) { var n = parseInt(String(v || ''), 10); return isNaN(n) ? 0 : n; }
/* "Monday, November 23, 2026 · 9:30 AM – 10:00 AM (Europe/Belgrade)" -> "Mon 23 Nov 2026, 9:30 AM – 10:00 AM (Europe/Belgrade)" */
function meeting_(s) {
  if (typeof s !== 'string') return s;
  var m = /^([A-Za-z]{3})[a-z]*, ([A-Za-z]{3})[a-z]* (\d{1,2}), (\d{4}) · (.+)$/.exec(s);
  return m ? m[1] + ' ' + m[3] + ' ' + m[2] + ' ' + m[4] + ', ' + m[5] : s;
}
/* Text from visitors is stored as text: a value starting with = + - or @ would otherwise run as a formula. */
function safe_(s) { return /^[=+\-@\t\r]/.test(s) ? "'" + s : s; }
function clean_(v) {
  if (v === undefined || v === null || typeof v === 'object') return '';
  return safe_(String(v).replace(/\s+$/, '').slice(0, 3000));
}
function reply_(t) { return ContentService.createTextOutput(t); }

/* ---------- Slack alerts ---------- */
function slackUrl_() { return PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL') || ''; }
function abandonMinutes_() { var v = parseInt(PropertiesService.getScriptProperties().getProperty('ABANDON_MINUTES'), 10); return v > 0 ? v : ABANDON_MINUTES; }

/* Runs every 10 minutes (the trigger is made by turnOnSlack). */
function checkLeads() {
  var url = slackUrl_(); if (!url) return;
  var lock = LockService.getScriptLock(); if (!lock.tryLock(10000)) return;
  try {
    var sh = sheet_(); if (!layoutOk_(sh)) tidy_(sh);
    var last = sh.getLastRow(); if (last < 2) return;
    var vals = sh.getRange(2, 1, last - 1, COLUMNS.length).getValues(), now = Date.now(), wait = abandonMinutes_();
    var nc = colIndex_('notified') + 1;
    for (var r = 0; r < vals.length; r++) {
      var o = {}; COLUMNS.forEach(function (c, i) { o[c[0]] = vals[r][i]; });
      var note = String(o.notified || ''), step = stepNum_(o.step), idle = (now - time_(o.last)) / 60000, kind = '';
      if (note.indexOf('before Slack') > -1) continue;
      if (step >= 5) { if (NOTIFY_BOOKED && note.indexOf('booked') < 0) kind = 'booked'; }
      else if (!note && (o.email || o.phone) && idle >= wait) kind = 'abandoned';
      if (!kind) continue;
      if (post_(url, message_(kind, o, idle, sh, r + 2))) {
        sh.getRange(r + 2, nc).setValue((note ? note + '; ' : '') + kind + ' ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM. HH:mm'));
      }
    }
  } finally { lock.releaseLock(); }
}
function turnOnSlack() {
  var ui = SpreadsheetApp.getUi(), url = slackUrl_();
  if (!url) { ui.alert('Add the Slack webhook first: Extensions > Apps Script > Project Settings > Script properties > SLACK_WEBHOOK_URL.'); return; }
  var lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    var sh = sheet_(); if (!layoutOk_(sh)) tidy_(sh);
    var last = sh.getLastRow(), nc = colIndex_('notified') + 1;
    if (last > 1) {  /* rows that were here before Slack get no message */
      var notes = sh.getRange(2, nc, last - 1, 1).getValues().map(function (v) { return [v[0] || 'before Slack']; });
      sh.getRange(2, nc, last - 1, 1).setValues(notes);
    }
  } finally { lock.releaseLock(); }
  stopTriggers_();
  ScriptApp.newTrigger('checkLeads').timeBased().everyMinutes(10).create();
  var ok = post_(url, '✅ Nues leads: Slack alerts are on (test). "Did not book" goes out ' + abandonMinutes_() + ' min after a visitor\'s last activity' + (NOTIFY_BOOKED ? ', and every booking gets a message.' : '.'));
  ui.alert(ok ? 'Slack alerts are on. A message was sent to the channel.' : 'The check is on, but Slack did not accept the message. Check SLACK_WEBHOOK_URL.');
}
function turnOffSlack() { stopTriggers_(); SpreadsheetApp.getUi().alert('Slack alerts are off.'); }
function testSlack() {
  var url = slackUrl_(), ui = SpreadsheetApp.getUi();
  if (!url) { ui.alert('SLACK_WEBHOOK_URL is not set.'); return; }
  var sample = { name: 'Test Person', email: 'test@example.com', phone: '+381 60 000 0000', company: 'Acme', website: 'example.com', budget: '$10k - $15k', source: 'Referral', notes: 'This is a test message from the Leads sheet.', step: '3 Your project', last: new Date() };
  ui.alert(post_(url, message_('abandoned', sample, 35, sheet_(), 2)) ? 'Sent.' : 'Slack did not accept the message. Check SLACK_WEBHOOK_URL.');
}
function stopTriggers_() { ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'checkLeads') ScriptApp.deleteTrigger(t); }); }
function post_(url, text) {
  try {
    var res = UrlFetchApp.fetch(url, { method: 'post', contentType: 'application/json', payload: JSON.stringify({ text: text }), muteHttpExceptions: true });
    return res.getResponseCode() === 200;
  } catch (err) { return false; }
}
/* visitor text is escaped, so it cannot turn into links or @channel mentions in Slack */
function slackEsc_(v) { return String(v === undefined || v === null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function message_(kind, o, idle, sh, rowNum) {
  var link = sh.getParent().getUrl() + '#gid=' + sh.getSheetId() + '&range=A' + rowNum;
  var who = [o.name, o.email, o.phone].filter(function (x) { return x; }).map(slackEsc_).join(' · ');
  var biz = [['Company', o.company], ['Website', o.website], ['Budget', o.budget], ['Heard about us', o.source]]
    .filter(function (x) { return x[1]; }).map(function (x) { return x[0] + ': ' + slackEsc_(x[1]); }).join(' · ');
  var head = kind === 'booked'
    ? '🟢 *Booked a call*' + (o.bookingTime ? ' · ' + slackEsc_(o.bookingTime) : '')
    : '🟡 *Did not book* · stopped at *' + slackEsc_(o.step) + '* · ' + ago_(idle);
  var lines = [head, who || '(no name)'];
  if (biz) lines.push(biz);
  if (o.notes) lines.push('Notes: ' + slackEsc_(String(o.notes).slice(0, 500)));
  lines.push('<' + link + '|Open in the sheet>');
  return lines.join('\n');
}
function ago_(min) { min = Math.round(min); return min < 90 ? min + ' min ago' : Math.round(min / 60) + ' h ago'; }
