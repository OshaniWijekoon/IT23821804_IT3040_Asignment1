IT3040 Assignment 1 – Playwright Tests
Overview

This repository contains my individual submission for IT3040 – Information Technology Project Management (BSc Hons IT, Year 3, Semester 1).

The assignment focuses on testing the Singlish-to-Sinhala transliteration system available at Swift Translator
 using automated Playwright scripts.

Main objectives:

Validate accuracy of Singlish-to-Sinhala transliteration.

Check stability and usability of the user interface.

Test sentence structures, tense variations, politeness levels, mixed English content, punctuation, repeated words, slang, and input lengths.

Test File

All scenarios are included in one Playwright test file:

SwiftTranslatorTest/tests/translator.spec.js

Contents:

24 Positive Functional Tests – correct transliteration.

10 Negative Functional Tests – incorrect or unexpected behavior.

1 UI Test – real-time output updates and input clearing.

Helper functions (translate() and getTranslationOutput()) are used for reading outputs and handling fallback strategies.

Excel Test Cases

All test scenarios are also recorded in:

IT23821804.xlsx

The Excel file includes positive, negative, and UI test cases with all relevant details.

Installation & Running Tests

Ensure Node.js
 and npm
 are installed.

Clone the repository:

git clone https://github.com/OshaniWijekoon/IT23821804_IT3040_Asignment1.git


Navigate into the project folder:

cd IT23821804


Install dependencies:

npm install


Run all tests:

npx playwright test


Test results are automatically recorded in test-results.json.

Structure
IT23821804/
├── SwiftTranslatorTest/
│   ├── tests/
│   │   └── translator.spec.js
│   ├── package.json
│   └── package-lock.json
├── IT23821804.xlsx
├── .gitignore
├── playwright.config.js
└── README.md

Notes

Input Length Categories: S (≤30 chars), M (31–299 chars), L (≥300 chars)

English Terms & Abbreviations: Remain unchanged.

Test Coverage: All scenarios automated in one file.

Validation: Positive tests = accuracy, negative = robustness.

UI Tests: Real-time output and clearing behavior.

Limitations: Short chat abbreviations (e.g., “Thx”, “u”) not converted; minor spacing variations may occur.