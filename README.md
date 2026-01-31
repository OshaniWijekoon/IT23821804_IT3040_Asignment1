# IT3040 Assignment 1 – Playwright Tests

## Overview
This repository contains my individual submission for IT3040 – Information Technology Project Management (BSc Hons IT, Year 3, Semester 1). The assignment focuses on testing the Singlish-to-Sinhala transliteration system available at [Swift Translator](https://www.swifttranslator.com/) using automated Playwright scripts.

The main objectives were to assess:

- Accuracy of transliteration for Singlish to Sinhala.
- Stability and usability of the user interface under different conditions.
- Handling of sentence structures, tense variations, politeness levels, mixed English content, punctuation, repeated words, slang, and varying input lengths.

## Test File
All test scenarios are included in a single Playwright test file:

- `SwiftTranslatorTest/tests/translator.spec.js`  

This file contains:

- **24 Positive Functional Tests** — validating correct transliteration.
- **10 Negative Functional Tests** — testing incorrect or unexpected behavior.
- **1 UI Test** — verifying real-time output updates and input clearing.

The test file uses helper functions (`translate()` and `getTranslationOutput()`) to read outputs from the translator, supporting multiple fallback strategies.

## Installation
1. Ensure [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed.
2. Clone the repository:
```bash
git clone https://github.com/OshaniWijekoon/IT23821804_IT3040_Asignment1.git
Navigate into the project folder:

cd IT23821804
Install dependencies:

npm install
Running Tests
Execute all Playwright tests with:

npx playwright test
Test results will be automatically recorded in test-results.json.

Structure
IT23821804/
├── SwiftTranslatorTest/
│   ├── tests/
│   │   └── translator.spec.js   # All automated test cases
│   ├── package.json
│   └── package-lock.json
├── .gitignore
├── playwright.config.js
└── README.md
Notes
Input Length Categories:

S (≤30 characters), M (31–299 characters), L (≥300 characters)

English Terms & Abbreviations:
Technical terms, brand names, and common English words remain unchanged in Sinhala output.

Test Coverage:
All test cases (positive, negative, UI) are automated in a single file (translator.spec.js) for simplicity.

Functional & Robustness Validation:
Positive tests check for accurate transliteration, while negative tests validate robustness against incorrect, joined, or informal inputs.

UI Validation:
Includes real-time output updates and input clearing behavior.

Test ID Conventions:

Positive functional: Pos_Fun_

Negative functional: Neg_Fun_

Positive UI: Pos_UI_

Negative UI: Neg_UI_

Limitations:

Short chat-style abbreviations (e.g., “Thx”, “u”) are not converted, as expected.

Sinhala output may vary slightly in spacing for long or complex paragraphs, but meaning is preserved.