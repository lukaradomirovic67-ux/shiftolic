/**
 * Nues, Let's talk form: leads (TEST)
 * Saves what visitors type into the booking form, step by step, also when they do not finish.
 * One row per visitor (Lead ID); every new send updates that row and never clears a cell that was filled before.
 *
 * Setup (once):
 * 1. In the Google Sheet: Extensions > Apps Script. Delete everything there, paste this file, Save.
 * 2. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy.
 * 3. Allow access with your account (Advanced > Go to ... > Allow; the warning is shown because the script is yours,
 *    not a published app).
 * 4. Copy the Web app URL (ends in /exec) and send it to the developer. It goes in the data-lead-url attribute
 *    of .lt-form on the Let's talk page.
 * After changing this code: Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy (same URL).
 */
var SHEET_NAME = 'Leads';
var COLUMNS = [
  ['id', 'Lead ID'], ['first', 'First seen'], ['last', 'Last update'], ['step', 'Step reached'],
  ['booked', 'Booked'], ['bookingTime', 'Booking time'],
  ['email', 'Email'], ['name', 'Name'], ['phone', 'Phone'], ['company', 'Company'], ['website', 'Website'],
  ['budget', 'Budget'], ['source', 'How they heard about us'], ['notes', 'Notes'], ['guests', 'Guests'],
  ['tz', 'Time zone'], ['page', 'Page'], ['referrer', 'Referrer'], ['utm', 'UTM']
];
var STEP_NAMES = { 1: '1 Contact', 2: '2 About you', 3: '3 Your project', 4: '4 Calendar', 5: '5 Booked' };

function doPost(e) {
  var raw = (e && e.postData && e.postData.contents) || '';
  if (!raw || raw.length > 20000) return reply_('bad request');
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); } catch (err) { return reply_('busy'); }
  try {
    var d = JSON.parse(raw);
    if (!d || typeof d.id !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(d.id)) return reply_('bad id');
    var sh = sheet_();
    var lastRow = sh.getLastRow();
    var ids = lastRow > 1 ? sh.getRange(2, 1, lastRow - 1, 1).getValues().map(function (r) { return String(r[0]); }) : [];
    var at = ids.indexOf(d.id);
    var rowNum = at > -1 ? at + 2 : lastRow + 1;
    var old = at > -1 ? sh.getRange(rowNum, 1, 1, COLUMNS.length).getValues()[0] : [];
    var now = new Date();
    var row = COLUMNS.map(function (c, i) {
      var key = c[0], prev = old[i];
      if (key === 'id') return d.id;
      if (key === 'first') return prev || now;
      if (key === 'last') return now;
      if (key === 'step') { var s = Math.max(stepNum_(prev), parseInt(d.step, 10) || 0); return STEP_NAMES[s] || ''; }
      if (key === 'booked') return (d.booked === true || prev === 'Yes') ? 'Yes' : 'No';
      var v = clean_(d[key]);
      if (v !== '') return v;
      return typeof prev === 'string' ? safe_(prev) : (prev === undefined ? '' : prev);
    });
    sh.getRange(rowNum, 1, 1, COLUMNS.length).setValues([row]);
    return reply_('ok');
  } catch (err) {
    return reply_('error');
  } finally {
    lock.releaseLock();
  }
}

/* Opening the /exec URL in a browser shows this, to check the deployment works. */
function doGet() { return reply_('Nues leads endpoint is running.'); }

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS.map(function (c) { return c[1]; })]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}
function stepNum_(v) { var n = parseInt(String(v || ''), 10); return isNaN(n) ? 0 : n; }
/* Text from visitors is stored as text: a value starting with = + - or @ would otherwise run as a formula. */
function safe_(s) { return /^[=+\-@\t\r]/.test(s) ? "'" + s : s; }
function clean_(v) {
  if (v === undefined || v === null || typeof v === 'object') return '';
  return safe_(String(v).replace(/\s+$/, '').slice(0, 3000));
}
function reply_(t) { return ContentService.createTextOutput(t); }
