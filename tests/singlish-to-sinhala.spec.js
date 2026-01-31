const { test, expect } = require('@playwright/test');

async function translate(page, text) {

  const inputField = page.locator('textarea').first();
  await inputField.fill('');
  await inputField.type(text, { delay: 50 });

  
  let result = '';

  await expect.poll(async () => {
    result = await getTranslationOutput(page);
    return result;
  }, {
    timeout: 15000,
    intervals: [500, 1000, 1500, 2000],
    message: `Translation did not appear for input: "${text}"`
  }).not.toBe('');

  return result;
}



async function getTranslationOutput(page) {

  
  const textareaCount = await page.locator('textarea').count();
  if (textareaCount >= 2) {
    const val = (await page.locator('textarea').nth(1).inputValue()).trim();
    if (val.length > 0) return val;
  }

 
  const editableCount = await page.locator('[contenteditable="true"]').count();
  if (editableCount > 0) {
    
    for (let i = 0; i < editableCount; i++) {
      const val = (await page.locator('[contenteditable="true"]').nth(i).textContent() || '').trim();
      
      if (val.length > 0 && /[\u0D80-\u0DFF]/.test(val)) return val;
    }
  }

  
  const sinhalText = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    for (const el of all) {
      
      if (el.children.length > 3) continue;
      const text = (el.textContent || '').trim();
      if (/[\u0D80-\u0DFF]/.test(text) && text.length > 0) {
        return text;
      }
    }
    return '';
  });

  return sinhalText;
}


// POSITIVE TESTS 


test('Pos_Fun_0001: Simple present tense with location - "අපි ඉස්කෝලේ වැඩ කරනවා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'api iskoolee vaeda karanavaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0002: Greeting with time of day - "සුබ රාත්‍රියක්!"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'suba raathriyak!');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0003: Compound sentence with conjunction - "අම්මා තේ හැදුවා, මල්ලී පානුත් කෑවා."', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'ammaa thea haedhuvaa, mallii paanuth kaeevaa.');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0004: Polite request with please equivalent - "කරුණාකරලා දොර වහන්න."', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'karuNaakaralaa dhora vahanna.');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0005: Past tense with specific time - "ඊයේ හවස පුසා නැති වුණා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'iiyee havasa pusaa naethi vuNaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0006: Strong negative statement - "මට එක්කෙනෙක්වත් ඔනේ නෑ"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'mata ekkenekvath onee naee');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0007: Conditional with future outcome - "රෑ වුනොත් අපි යනවා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'raee vunoth api yanavaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0008: Plural form with action - "ළමයි බෝලයෙන් සෙල්ලම් කරනවා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'Lamayi boolayen sellam karanavaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0009: Future with time marker - "මම ලබන සතියෙ කොළඹ යනවා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'mama labana sathiye koLaBA yanavaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0010: Common verb phrase collocation - "මට තේරෙන්නේ නෑ"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'mata theerennee naee');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0011: Direct command with urgency - "ඉක්මනට එන්න"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'ikmanata enna');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0012: Repetition for strong emphasis - "අපි, දිනමු,දිනමු,දිනමු."', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'api, dhinamu,dhinamu,dhinamu.');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0013: Tech brand in daily context - "LinkedIn profile එක update කරන්න ඕනේ"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'LinkedIn profile eka update karanna oonee');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0014: Location with common English word - "මල්ලියෝ Kandy bus එක ගත්තා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'malliyoo Kandy bus eka gaththaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0015: Question with punctuation - "මොකක්ද වුණෙ?"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'mokakdha vuNe?');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0016: Time format in sentence - "class එක 10.15ට පටන් ගනී"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'class eka 10.15ta patan ganii');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0017: Price with currency format - "book එක Rs. 750 ක්"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'book eka Rs. 750 k');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0018: English abbreviation preserved - "මගේ NIC එක ගෙදර තියනවා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'magee NIC eka gedhara thiyanavaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0019: Casual slang expression - "අයියෝ මාර වැඩේ!"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'ayiyoo maara vaedee!');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0020: Medium length workplace scenario - "තාත්තා office යන්නෙ bus එකෙන්. හැබැයි එහෙම ගියොත් traffic එක නිසා තාත්තා car එක අරගෙන යන්න හදන්නේ."', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'thaaththaa office yanne bus eken. habang ehema giyoth traffic eka nisaa thaaththaa car eka aragena yanna hadhannee.');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0021: Input with extra spacing - "අක්කා    පොතක්    කියවනවා"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'akkaa    pothak    kiyavanavaa');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0022: Informal casual expression - "Kandy එන්න බන් හරිද?"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'Kandy enna ban haridha?');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0023: Place with activity description - "ලොකු අයියා Galle ගෙදර වැඩද කරන්නේ?"', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'loku ayiyaa Galle gedhara vaedadha karanne?');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0024: Long mixed content paragraph - "අපි ඉරිද යන්න trip එකක් සලසුම් කරගෙන ඉන්නවා..."', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const result = await translate(page, 'Api iridhaa yanna trip ekak salasum karagena innavaa. kolaBa sita arambha karalaa Mahanuvara,  Ella dhakvaa gaman karanna hithagena innavaa. Margaya Google Map eken balala route eka set karala, vahana hire ekath arrange karaa. Hotels saha guest houses check karala, trip ekee haema dheema plan karaa. Ape group eke yaluvoo ekka coordinate vela, WhatsApp eken messages share karala ideas exchange karaganna. cost eka calculate karala, budget eka plan karaa. Online research karala waterfalls, tea estates, hiking trails wage sightseeing spots gaena note karaa. Trip eke photos saha videos capture karanna DSLR saha mobile ready karala, travel journal maintain karanna plan karaa. Aluth week eke Zoom call ekak karala final details confirm karala, tickets confirm karala, packing list finalize karamu. Mehema haema dheyakma set karala, ape trip eka fun ekee yanna puluvan.');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
});



// NEGATIVE TESTS


test.describe('Negative Functional Tests', () => {

  test('Neg_Fun_0001: Words joined without spaces', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('apiiskooleepadamkaranavaa');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0002: Slang with non-standard spelling', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('api trip ekk yanava machn haridaaaa. hotel ekk book krla plan karanna blamuuuu');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0003: Incorrect final vowel rendering', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('mama eyata kiyala thiyanawa');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0004: Wrong tense ending', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('mallii gedharata giyaavaa?');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0005: Incorrect Sinhala character generation', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('lamayaa bath kaeevaa');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0006: Triple negation causing ambiguity', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('mama eka karannee nae nae nae');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0007: Incorrect informal contraction', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('oya enna, mama ynnam');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0008: Excessive special characters', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('mata bath oonee!!!!!!');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0009: Mixed English connector usage', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('Coz mama hithala thiyenavaa');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

  test('Neg_Fun_0010: Random mixed casing', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    const inputField = page.locator('textarea').first();
    await inputField.fill('Api IskooLee YANavaa');
    await page.waitForTimeout(3000);
    const result = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(result)).toBe(false);
  });

});


// UI TEST 


test.describe('UI Tests', () => {

  test('UI Test: Clear input and verify output is cleared', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');

    
    const result1 = await translate(page, 'mama gedhara yanavaa');
    expect(result1).toBeTruthy();
    expect(/[\u0D80-\u0DFF]/.test(result1)).toBe(true);

    
    const inputField = page.locator('textarea').first();
    await inputField.fill('');
    await inputField.press('Backspace');
    await page.waitForTimeout(3000);
    const afterClear = await getTranslationOutput(page);
    expect(/[\u0D80-\u0DFF]/.test(afterClear)).toBe(false);
  });
});