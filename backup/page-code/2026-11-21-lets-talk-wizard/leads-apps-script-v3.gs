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
 */
var SHEET_NAME = 'Leads';
/* key (as the page sends it), header, width in px, hidden */
var COLUMNS = [
  ['last', 'Last activity', 120], ['step', 'Step reached', 115], ['name', 'Name', 150], ['email', 'Email', 210],
  ['phone', 'Phone', 135], ['company', 'Company', 140], ['website', 'Website', 160], ['budget', 'Budget', 110],
  ['source', 'How they heard about us', 120], ['notes', 'Notes', 280], ['bookingTime', 'Meeting', 270],
  ['guests', 'Guests', 170], ['tz', 'Time zone', 130], ['referrer', 'Came from', 220], ['utm', 'UTM', 150],
  ['first', 'First seen', 120, true], ['page', 'Page', 200, true], ['id', 'Lead ID', 130, true], ['ts', 'Sent at (ms)', 110, true]
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
  SpreadsheetApp.getUi().createMenu('Nues').addItem('Tidy up the Leads sheet', 'tidyLeads').addToUi();
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
