## Course Consumption Test
Course: "Testing ME" <br>
Test cases satisfied: `Tc_56`, `Tc_61`

### PASSED RESULTS
- The user is able to click on the ""Sync progress now"" and the progress is synced." 

- The user should be displayed with the kebab menu in the course progress section once course is consumed with 100%

- When the user clicks on the Kebab menu ""Sync progress now"" is deactivated/disabled till the user hits 100% completion. Once the user reaches 100%, activate this option.

### FAILED

- Course created but cant enroll to the course, >shows as enrolled
 but after exiting and joining back in doesnt show process or sign of progression 

- Already enrolled courses notification but course doesnt update

![alt text](image.png)
 

| Step | Result |
|------|--------|
| Search "Testing ME" in Discover tab | ✅ Found 1 result (COURSE, Subject: English) |
| Open course and tap "Start learning" | ✅ Content player opened with 5 questions |
| Complete course content (reorder, FTB, MCQ, matching) | ✅ Score 3/5, submitted and exited |
| Green completion indicator on course page | ✅ Badge%2green image with content-desc="completed" visible |
| "You have successfully completed this course" message | ✅ Displayed on course page |
| 3-dots menu icon visible | ✅ content-desc="menu-icon" present and tapped |
| Progress sync | ✅ Toast: "Progress synced successfully" appeared |


## Course Progress Verification 
Course: "Course 10-03" <br>
Test cases satisfied: `Tc_57`

### PASSED RESULTS
- User should be able to enroll to the course and consume each content successfully.

- After conuming each content, course progress should be updated

### FAILED

- **NONE**

| Step | Action | Result |
|------|--------|--------|
| 1 | Start Appium session & launch Sunbird Ed app | ✅ PASS |
| 2 | Search for "Course 10-03" | ✅ PASS — Found and opened the course |
| 3 | Check "Your Progress" percentage | ✅ PASS — Baseline recorded: 0% completed |
| 4 | Click "Start learning" & complete a unit | ✅ PASS — Completed PDF Content (2 pages read), saw "You just completed PDF Content" screen, tapped Exit |
| 5 | Go back & verify progress changed | ✅ FAIL — Progress went from 25% → 50% after completing testJpegResource |





Channel - **REVERTING CHANGES MADE THIS MORNING**



---------

## FAILED ❌

Course created but cant enroll to the course, >shows as enrolled but after exiting and joining back in doesnt show process or sign of progression 

Able to continue courses that are already enrolled

![alt text](image.png)


