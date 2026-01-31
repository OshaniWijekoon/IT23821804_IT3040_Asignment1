const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('DOM DIAGNOSTIC - Find output field', async ({ page }) => {

  await page.goto('https://www.swifttranslator.com/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); 


  const before = await page.evaluate(() => {
    const selectors = [
      'textarea',
      'input[type="text"]',
      '[contenteditable="true"]',
      '[contenteditable]',
      '[role="textbox"]',
      '.output',
      '.result',
      '.translation',
      'div[class*="output"]',
      'div[class*="result"]',
      'div[class*="translate"]',
      'div[class*="target"]',
      'div[class*="destination"]',
      'div[class*="converted"]',
      'div[class*="sinhala"]',
      'div[class*="Output"]',
      'div[class*="Result"]',
      'p[class*="output"]',
      'span[class*="output"]',
    ];

    const combined = [...new Set(selectors.join(',').split(',').map(s => s.trim()))].join(',');
    const els = document.querySelectorAll(combined);

    return Array.from(els).map((el, i) => ({
      index: i,
      tag: el.tagName,
      class: el.className,
      id: el.id,
      role: el.getAttribute('role'),
      contentEditable: el.contentEditable,
      placeholder: el.getAttribute('placeholder'),
      readOnly: el.readOnly,
      textContent: el.textContent?.trim().substring(0, 200),
      value: el.value || '',
      outerHTML: el.outerHTML.substring(0, 300)
    }));
  });

  console.log('\n===== BEFORE TYPING =====');
  console.log(JSON.stringify(before, null, 2));

 
  const textarea = page.locator('textarea').first();
  await textarea.fill('');
  await textarea.type('mama gedhara yanavaa', { delay: 80 });

 
  await page.waitForTimeout(6000);

  const after = await page.evaluate(() => {
   
    const all = document.querySelectorAll('*');
    const candidates = [];

    all.forEach((el, i) => {
      const text = (el.textContent || '').trim();
      
      if (/[\u0D80-\u0DFF]/.test(text) && el.children.length < 5) {
        candidates.push({
          index: i,
          tag: el.tagName,
          class: el.className,
          id: el.id,
          role: el.getAttribute('role'),
          contentEditable: el.contentEditable,
          textContent: text.substring(0, 200),
          value: el.value || '',
          outerHTML: el.outerHTML.substring(0, 400)
        });
      }
    });

    return candidates;
  });

  console.log('\n===== AFTER TYPING (elements containing Sinhala text) =====');
  console.log(JSON.stringify(after, null, 2));

  
  const report = { before, after, timestamp: new Date().toISOString() };
  const outputPath = path.resolve(__dirname, '..', 'test-results', 'dom-diagnostic.json');

  
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log('\nResults saved to: ' + outputPath);
});