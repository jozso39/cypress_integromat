# Integromat Cypress Job Application Assignment

I am using Cypress with TypeScript. Also I am not using the Page Object model since the test is not very big.

#### Work so far

Right now I finished testceses 1,2 and 3 and sometimes I get some errors. The selectors are not very robust, the application doesn't have any test-helping selectors like `data-cy`.
Also I am still getting errors when running headlessly and sometimes Cypress doesn't type the whole name of a Test Data Store, I want to fix that later.

#### Todo:
- do the 4th assignment
- make it run headless
- run it on different browsers
- fix the occasional input problem (only part of string is typed into field)
- make the new tab redirect better (see this [repo](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js))
- unify the selectors

#### Instalation

1. clone the repo with `git clone https://github.com/jozso39/cypress_integromat.git`
2. install dependencies with `npm install`
3. run it in browser with `npm run cypress:open`

### Prerequisites

Create an account at Integromat.com: https://www.integromat.com/en/register and do not forget to make a
note of Name, Email and Password given values. You will need these credentials later in the following test
cases.

### Assignment

There are in total four test cases listed below. Two of them are mandatory. Please process at least both
mandatory test cases via Cypress.io automation tool. Once you are finished, compress the whole Cypress
folder and send it to simona.taseva@integromat.com

Note: If you are about to process non-mandatory test cases, please clear all existing data within your
recently created account in advance. There might be existing scenarios, data stores or data structures.
Scenarios could be deleted by dropdown. Data stores and data structures could be deleted by button.

## Test cases

### TESTCASE 01 (mandatory)

1. Open https://www.integromat.com/en/login
2. Type Email into email field
3. Type Password into password field
4. Click on Sign in button
5. In a left pane at the bottom verify, that there is correct Name displayed
6. Click on Name (Sign out option appears)
7. Click on Sign out button

### TESTCASE 02 (mandatory)

1. Open https://www.integromat.com/en/login
2. Type Email into email field
3. Type Password into password field
4. Click on Sign in button
5. In a left pane at the bottom verify, that there is correct Name displayed
6. In a left pane click on Data stores
7. In a right top corner click on Add data store button
8. Click into Data store name field and rename default value to Test Data Store
9. Click on Add button next to the Data structure dropdown
10. Click into Data structure name field and rename default value to Test Data Structure
11. Click on Add item button
12. Select Number as data type in Type dropdown
13. Write down Number as a value into Name field
14. Check Required checkbox
15. Click on Add button to confirm item settings
16. Click on Save button to create data structure
17. In Data structure dropdown verify, that Test Data Structure exists
18. Click on Save to create data store
19. In a list of data stores on Data stores page verify, that recently created data store exists
20. In a left pane click on Data structures
21. In a list of data structures on Data structures page verify, that recently created data structure exists
22. In a left pane at the bottom click on Name (Sign out option appears)
23. Click on Sign out button

### TESTCASE 03

Note: If you are about to process non-mandatory test cases, please clear all existing data within your
recently created account in advance. There might be existing scenarios, data stores or data structures.
Scenarios could be deleted by dropdown. Data stores and data structures could be deleted by button.

1. Open https://www.integromat.com/en/login
2. Type Email into email field
3. Type Password into password field
4. Click on Sign in button
5. In a left pane at the bottom verify, that there is correct Name displayed
6. In a left pane click on Data stores
7. In a right top corner click on Add data store button
8. Click into Data store name field and rename default value to Test Data Store
9. Click on Add button next to the Data structure dropdown
10. Click into Data structure name field and rename default value to Test Data Structure
11. Click on Add item button
12. Select Number as data type in Type dropdown
13. Write down Number as a value into Name field
14. Check Required checkbox
15. Click on Add button to confirm item settings
16. Click on Save button to create data structure
17. In Data structure dropdown verify, that Test Data Structure exists
18. Click on Save to create data store
19. In a list of data stores on Data stores page verify, that recently created data store exists
20. In a left pane click on Data structures
21. In a list of data structures on Data structures page verify, that recently created data structure exists
22. Click on Delete button and confirm by clicking on Really button to delete recently created data structure - pop up alert appears
23. Verify that pop up alert appeared and click on Close button to close the alert
24. In a left pane click on Data stores
25. Click on Browse button to open recently created data store
26. Click on Add button to create a new row in data store
27. Type value 1 in Key field
28. Type value 2020 iin Number field
29. Click on Save button to confirm new row’s settings
30. In a left pane at the bottom click on Name (Sign out option appears)
31. Click on Sign out button

### TESTCASE 04

Note: If you are about to process non-mandatory test cases, please clear all existing data within your
recently created account in advance. There might be existing scenarios, data stores or data structures.
Scenarios could be deleted by dropdown. Data stores and data structures could be deleted by button.

1. Open https://www.integromat.com/en/login
2. Type Email into email field
3. Type Password into password field
4. Click on Sign in button
5. In a left pane at the bottom verify, that there is correct Name displayed
6. In a left pane click on Data stores
7. In a right top corner click on Add data store button
8. Click into Data store name field and rename default value to Test Data Store
9. Click on Add button next to the Data structure dropdown
10. Click into Data structure name field and rename default value to Test Data Structure
11. Click on Add item button
12. Select Number as data type in Type dropdown
13. Write down Number as a value into Name field
14. Check Required checkbox
15. Click on Add button to confirm item settings
16. Click on Save button to create data structure
17. In Data structure dropdown verify, that Test Data Structure exists
18. Click on Save to create data store
19. In a list of data stores on Data stores page verify, that recently created data store exists
20. In a left pane click on Data structures
21. In a list of data structures on Data structures page verify, that recently created data structure exists
22. Click on Delete button and confirm by clicking on Really button to delete recently created data structure - pop up alert appears
23. Verify that pop up alert appeared and click on Close button to close the alert
24. In a left pane click on Data stores
25. Click on Browse button to open recently created data store
26. Click on Add button in a right top corner to create a new row in data store
27. Type value 1 in Key field
28. Type value 2020 in Number field
29. Click on Save button to confirm new row’s settings
30. In a left pane click on Scenarios
31. Click on Create a new scenario button in a right top corner
32. Click on Continue button in a right top corner
33. Click on first (empty) module in scenario builder
34. Type Data store into Search field on the bottom of the list of available applications
35. Click on Data store application in a list of available applications
36. Click on Get a record action in a list of available app actions
37. In Data store field select recently created Test Data Store
38. Type value 1 into Key field
39. Click on OK button to confirm data store module’s settings
40. In a bottom menu click on Save icon to save recently created scenario
41. In a bottom menu click on Run once button to play recently created scenario
42. In a left pane at the bottom click on Name (Sign out option appears)
43. Click on Sign out button
