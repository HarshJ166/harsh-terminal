/**
 * Contact form backend for the portfolio.
 * Paste into the sheet's Apps Script editor (Extensions > Apps Script). Setup steps are in README.md.
 *
 * Receives JSON from the site's /api/contact route, appends a row to the "Submissions" tab,
 * and emails a notification to NOTIFY_EMAIL with Reply-To set to the sender.
 */

const NOTIFY_EMAIL = "work.harsh268@gmail.com";
const SHEET_NAME = "Submissions";
const HEADERS = ["Received", "Name", "Email", "Message", "Source", "Status"];

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || body.secret !== secret) return json_({ ok: false, error: "unauthorized" });

    const name = clean_(body.name, 100);
    const email = clean_(body.email, 200);
    const message = clean_(body.message, 2000);
    const source = clean_(body.source, 40) || "site";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) return json_({ ok: false, error: "invalid" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet_().appendRow([new Date(), name, email, message, source, "New"]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: "Portfolio message from " + (name || email),
      body: message + "\n\nFrom: " + (name || "(no name)") + " <" + email + ">\nVia: " + source +
        "\nSheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server" });
  }
}

// Run once from the editor: creates the tab and triggers the permission prompt.
function setup() {
  sheet_();
  console.log("Ready. Emails left today: " + MailApp.getRemainingDailyQuota());
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sh.setColumnWidth(4, 420);
  }
  return sh;
}

// Trims, caps length, and neutralises spreadsheet formula injection (=, +, -, @ at the start).
function clean_(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max).replace(/^[=+\-@]/, "'$&");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
