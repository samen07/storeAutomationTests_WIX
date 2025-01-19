# storeAutomationTests_WIX
Its simple demo of automation tests using Playwright+TS for Store

to run test go to next steps:
-navigate to tests folder and init Playwright "npm init playwright@latest"
-select TypeScript + end-to-end testing + install prefered browsers (if additional browsers not prompted, try "npx playwright install" and/or "npm install @playwright/test@latest")
-to run test "npx playwright test"
-no additional ReportTool configured but we still can use PlaywrightHTMLreport "npx playwright show-report"


Simple branches idea in project:
main - stable aproved release version of tests
develop - stable version of tests with aproved but not released tests
feature/*name* - new tests, could be unstable
bugfix/*name* - fixes/refactor/... of existed functionality
