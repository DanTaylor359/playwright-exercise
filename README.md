# Playwright Exercise

## 1. Installation & Running Tests
- Clone the repository and install dependencies: npm install
- Run the tests in Chromium (as required): npx playwright test --project=chromium
- Optional (headed mode): npx playwright test --project=chromium --headed
- Run a single test: npx playwright test tests/contact-form.spec.ts --project=chromium
- View the test report: npx playwright show-report

## 2. Decisions & trade offs

### Decisions

#### Page Object Model (POM)
I used a simple, consistent POM structure with:
- one class per page  
- all locators defined in constructors  
- intention‑revealing methods (e.g., `search()`, `submitForm()`)  
This kept the framework lightweight and easy to follow within the exercise scope.

#### Selectors
I prioritised stable selectors (`data-qa` where available) and avoided brittle CSS chains.  
Where the application did not expose test IDs, I used visible text or structural selectors as the next‑best option.

#### Consistency
I kept naming, method structure, and test layout consistent across all pages and tests.  
This improves readability and makes the suite easier to maintain or extend.

#### Commented Alternatives
In a few places, I left commented alternative approaches, reasoning, and future validations to consider.  
This shows awareness of multiple valid strategies while keeping the final implementation clean.

---

### Trade‑offs

#### Failing Product Search Test (Reproduced Manually)
The Product Search test failed because the site returned items that did not match the search term.  
I reproduced the issue manually and confirmed it was caused by inconsistent backend search behaviour, not the automation code.  
Given more time, I would raise a Jira ticket with steps to reproduce, expected vs actual results, and attach supporting evidence.

#### Cross Browser Behaviour
I initially configured the suite to run across all three Playwright browsers (Chromium, Firefox, WebKit).
During execution, WebKit showed inconsistent behaviour with modal visibility, while Chromium and Firefox behaved consistently.
To keep the exercise focused on the required Chromium browser, I added only minimal WebKit handling to acknowledge this behaviour.
Future work would include WebKit‑specific fallbacks and animation‑aware waits.

#### Scope
I intentionally kept the framework minimal:
- no CI pipeline  
- no environment configs  
- no utilities layer  
- no custom wait helpers  

These would be valuable in a production framework but were outside the scope of a timed exercise.

## 3. Use of AI
Yes — I used AI (Microsoft Copilot) during this exercise to:
- refine the POM structure  
- improve selector strategy  
- clean up code for readability and consistency  
- validate design decisions  
- help interpret red‑flagged errors in VS Code so I could apply the correct fix myself
- help phrase commit messages and documentation  

All final code, logic, and decisions were reviewed and implemented by me.

## 4. Future Improvements
Given more time, I would focus on strengthening stability, expanding coverage, and improving maintainability:

- fully stabilise WebKit (cross‑browser) behaviour  
- add retry logic for modal interactions  
- introduce a utilities layer for common waits/assertions  
- expand test coverage (pagination, filtering, cart totals, etc.)  
- add more UI and functional validations across flows  
- improve test reporting (HTML reports, trace analysis, screenshots, video retention)  
- integrate GitHub Actions for automated runs  
- add explicit waits for modal animations  
- implement WebKit‑specific fallbacks
