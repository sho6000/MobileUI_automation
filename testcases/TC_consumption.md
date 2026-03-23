# APPIUM TEST CASES - CONSUMPTION (TC_56 to TC_67)
## Sunbird Ed Mobile App Testing - Release 8.1.0

---

## TC_56: Course Progress Sync with Kebab Menu

### TEST CASE DESCRIPTION:
1. Verify that user is displayed with the kebab menu in the course progress section once courses consumed 100%
2. Verify that when user clicks on the Kebab menu "Sync progress now" is deactivated/disabled till the user hits 100% completion. Once the user reaches 100%, activate this option.
3. Verify that user is able to click on the "Sync progress now" and the progress is synced.

### PRECONDITIONS:
- User should have enrolled to a course
- Android emulator is running
- Application is installed
- Valid user credentials available

### TEST DATA:
- Username: [specify email]
- Password: [specify password]
- Course name: [enrolled course name]

### APPIUM TEST STEPS:

**STEP 1: LAUNCH AND LOGIN**
```
1. Launch the Sunbird application on Android emulator
2. Wait for app home screen to load (max 15 seconds)
3. Locate and tap "Profile" or "Login" button
4. Wait for login screen to appear
5. Locate email/username input field and enter credentials
6. Locate password input field and enter password
7. Tap "LOGIN" button to authenticate
8. Wait for successful authentication (verify dashboard loads)
9. Assert login successful (check for user profile icon)
```

**STEP 2: NAVIGATE TO ENROLLED COURSE**
```
1. Locate "My Courses" or "Library" tab in bottom navigation
2. Tap on "My Courses" tab
3. Wait for courses list to load
4. IF enrolled course NOT visible on screen:
   {
       Execute vertical scroll (swipe up) until course card appears
   }
5. Locate enrolled course card by course name
6. Tap on the course card to open course details
7. Wait for course TOC (Table of Contents) page to load
```

**STEP 3: CONSUME COURSE TO 100% (IF NOT ALREADY COMPLETED)**
```
LOOP: WHILE overall progress < 100%
{
    1. Check "Your Progress" section for current completion percentage
    2. IF progress < 100%:
       {
           INNER_LOOP: FOR EACH course module/unit with incomplete status
           {
               a. Locate course unit without green checkmark
               b. Tap on the course unit to open content
               c. Wait for content to load (5-10 seconds)
               
               d. IDENTIFY content type and consume:
               
               IF content_type == "Video" (MP4/YouTube/WebM):
               {
                   i. Tap play button
                   ii. Wait for video to buffer and start
                   iii. OPTION 1: Let video play to completion
                   iv. OPTION 2: Seek to end (drag progress bar to 95-100%)
                   v. Wait for completion indicator (green checkmark)
                   vi. Tap back button
               }
               
               IF content_type == "PDF/Resource":
               {
                   i. Wait for PDF viewer to load
                   ii. Swipe left (or tap next) through all pages
                   iii. Continue until last page or "Completed" message
                   iv. Wait 2-3 seconds for progress to register
                   v. Tap back button
               }
               
               IF content_type == "HTML":
               {
                   i. View HTML content (auto-loads)
                   ii. Scroll through content if needed
                   iii. Wait 5 seconds for progress tracking
                   iv. Tap back or hamburger menu → Exit
               }
               
               IF content_type == "H5P/Interactive":
               {
                   i. Wait for H5P to load (10-15 seconds)
                   ii. Complete all interactions (answer questions, navigate slides)
                   iii. Wait for completion confirmation
                   iv. Tap back button
               }
               
               IF content_type == "Assessment":
               {
                   i. Tap on assessment
                   ii. Answer all questions (select any options)
                   iii. Tap "Submit" button
                   iv. View results/score
                   v. Tap "Close" or back button
               }
               
               e. Verify course unit shows green checkmark/completion status
               f. IF unexpected popup appears: Tap X or dismiss button
               g. Return to course TOC page
           }
       }
    3. Scroll to "Your Progress" section
    4. Verify progress percentage updated
    5. Continue until progress shows 100%
}
```

**STEP 4: VERIFY KEBAB MENU APPEARS AT 100%**
```
1. Ensure course progress shows 100% completion
2. Scroll to "Your Progress" section (top of course page)
3. Verify text displays: "You have successfully completed this course"
4. Locate kebab menu icon (three vertical dots) in progress section
5. Assert kebab menu icon IS visible
6. CHECKPOINT: Kebab menu appears at 100% completion ✓
7. Capture screenshot for evidence
```

**STEP 5: VERIFY "SYNC PROGRESS NOW" IS ENABLED AT 100%**
```
1. Tap on kebab menu icon (three dots)
2. Wait for menu dropdown to appear (1-2 seconds)
3. Locate "Sync progress now" option in menu list
4. Verify "Sync progress now" is NOT grayed out/disabled
5. Assert text color indicates enabled state (not light gray)
6. Assert option is clickable/accessible
7. CHECKPOINT: "Sync progress now" enabled at 100% ✓
8. Capture screenshot of menu
```

**STEP 6: VERIFY SYNC FUNCTIONALITY**
```
1. With kebab menu open, tap "Sync progress now" option
2. Wait for sync operation to execute
3. Look for success indicators:
   - Toast message: "Progress synced successfully" or similar
   - Loading spinner appears and disappears
   - Progress timestamp updates
   - Menu closes automatically
4. IF toast message appears:
   {
       Assert message contains "sync" or "success"
       Wait for toast to disappear (3-5 seconds)
   }
5. Tap back or close to exit course
6. Re-open same course (optional verification)
7. Verify progress still shows 100%
8. CHECKPOINT: Sync operation successful ✓
```

### EXPECTED RESULTS:
✓ Kebab menu (three dots) is visible in course progress section at 100% completion
✓ "Sync progress now" option is enabled/accessible at 100% (not disabled)
✓ Clicking "Sync progress now" successfully syncs progress
✓ Success confirmation displayed (toast message or visual feedback)

### ERROR HANDLING:
- IF kebab menu not found: Scroll up/down in progress section, verify 100% completion
- IF "Sync progress now" disabled: Verify actual progress is exactly 100%
- IF sync fails: Check network connectivity, retry operation
- IF toast message doesn't appear: Check for alternative success indicators

---

## TC_57: Course Content Progress Verification for Multiple Content Types

### TEST CASE DESCRIPTION:
Verify if the course progress is updated correctly for all content types:
i) Resource
ii) MP4 - on consuming 20% / dragging till last
iii) YouTube - on consuming 20% / dragging till last
iv) WebM - on consuming 20% / dragging till last
v) EPUB
vi) H5P
vii) HTML
viii) Self-assess content type contents

### PRECONDITIONS:
- Course should be created with all 8 content types listed
- Android emulator running with stable internet
- Valid user credentials
- Course name/identifier known

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course name: [course with all content types]

### APPIUM TEST STEPS:

**STEP 1: LAUNCH AND LOGIN**
```
1. Launch Sunbird application on Android emulator
2. Wait for app home screen (max 15 seconds)
3. Tap "Login" or "Profile" button
4. Wait for login screen
5. Enter username in email field
6. Enter password in password field
7. Tap "LOGIN" button
8. Wait for dashboard to load
9. Verify successful login (profile icon visible)
```

**STEP 2: NAVIGATE TO TEST COURSE**
```
1. Tap "Library" or "Courses" tab in bottom navigation
2. Wait for courses page to load
3. Locate search icon (magnifying glass) and tap
4. Enter course name in search field
5. Wait for search results (3-5 seconds)
6. Locate course card matching search query
7. Tap on course card
8. Wait for course details page to load
```

**STEP 3: ENROLL IN COURSE**
```
1. Check enrollment status on course details page
2. IF "Join Course" button visible:
   {
       a. Tap "Join Course" button
       b. IF consent popup appears:
          {
              i. Review consent information
              ii. Tap "I Agree" or "Accept" button
          }
       c. Wait for enrollment confirmation (2-3 seconds)
       d. Verify "Start Learning" button appears
   }
3. ELSE IF already enrolled:
   {
       Verify "Continue Learning" or "Resume" button visible
   }
4. Tap "Start Learning" or "Continue Learning"
5. Wait for course TOC to load
```

**STEP 4: CONSUME AND VERIFY EACH CONTENT TYPE**

Initialize tracking: `content_results = []`

**4.1: RESOURCE (PDF/Document) CONTENT**
```
1. Locate "Resource" content unit in course modules
2. IF not visible: Scroll down until found
3. Capture initial progress state (screenshot)
4. Tap on Resource content unit
5. Wait for document viewer to load (5-10 seconds)
6. IF landscape mode: Verify auto-rotation occurs
7. LOOP: Swipe left (or tap next arrow) through all pages
   {
       Continue until last page reached
       OR "Completed" message appears
   }
8. Wait 3 seconds for progress to register
9. Tap back button to return to TOC
10. Verify Resource shows green checkmark/completion badge
11. Assert progress indicator updated
12. Capture screenshot
13. Add to tracking: content_results.append("Resource: PASS")
```

**4.2: MP4 VIDEO CONTENT**
```
SUB-TEST A: Consume 20% and verify partial progress
1. Locate "MP4" video content unit
2. IF not visible: Scroll to find it
3. Tap on MP4 content unit
4. Wait for video player to load
5. Tap play button to start video
6. Wait for buffering to complete
7. Get total video duration from player controls
8. Calculate 20% timestamp: duration * 0.20
9. Allow video to play until 20% mark reached
10. Pause video (tap on player)
11. Tap back button to return to TOC
12. Verify partial progress indicator on MP4 unit
    (e.g., progress bar shows ~20%, not full green checkmark)
13. Assert progress shows approximately 20%
14. Capture screenshot of partial progress

SUB-TEST B: Seek to end and verify 100% completion
15. Re-open MP4 content unit
16. Wait for player to load (may resume at 20% position)
17. Tap on video player to show controls
18. Locate video seek bar (progress slider)
19. Perform drag gesture on seek bar:
    - Long press on current position
    - Drag to 95-100% position on bar
20. Release to seek to near-end position
21. Allow video to play for 5-10 seconds from that point
22. Wait for completion indicator (green checkmark appears)
23. Tap back button to TOC
24. Verify MP4 shows 100% completion (green checkmark)
25. Assert content marked as completed
26. Capture screenshot
27. Add to tracking: content_results.append("MP4: PASS")
```

**4.3: YOUTUBE VIDEO CONTENT**
```
SUB-TEST A: Consume 20%
1. Locate "YouTube" video content unit
2. Scroll if needed to make visible
3. Tap on YouTube content unit
4. Wait for YouTube player to load (may take 10-15 seconds)
5. Tap play button
6. Wait for buffering and playback to start
7. Get video duration from player
8. Calculate 20% mark: duration * 0.20
9. Let video play to 20% completion
10. Pause video
11. Tap back button
12. Verify YouTube unit shows ~20% progress (partial indicator)
13. Capture screenshot

SUB-TEST B: Seek to end
14. Re-open YouTube content unit
15. Wait for player load
16. Tap player to show controls
17. Locate and drag seek bar to 95-100% position
18. Allow playback from near-end for 5-10 seconds
19. Wait for completion (green checkmark)
20. Tap back to TOC
21. Verify YouTube shows 100% completion
22. Capture screenshot
23. Add to tracking: content_results.append("YouTube: PASS")
```

**4.4: WEBM VIDEO CONTENT**
```
SUB-TEST A: Consume 20%
1. Locate "WebM" video content unit
2. Scroll to make visible if needed
3. Tap on WebM unit
4. Wait for player to load
5. Tap play button
6. Wait for buffering
7. Get duration, calculate 20%
8. Play to 20% mark
9. Pause video
10. Tap back button
11. Verify ~20% progress indicator
12. Capture screenshot

SUB-TEST B: Seek to end
13. Re-open WebM unit
14. Wait for load
15. Show player controls
16. Drag seek bar to 95-100%
17. Play for 5-10 seconds
18. Wait for completion checkmark
19. Tap back to TOC
20. Verify 100% completion (green checkmark)
21. Capture screenshot
22. Add to tracking: content_results.append("WebM: PASS")
```

**4.5: EPUB CONTENT**
```
1. Locate "EPUB" content unit in modules
2. Scroll to make visible if needed
3. Capture initial state
4. Tap on EPUB unit
5. Wait for EPUB reader to load (5-10 seconds)
6. LOOP: Navigate through pages/chapters
   {
       IF swipe navigation: Swipe left repeatedly
       IF button navigation: Tap "Next" button
       Continue until significant progress (50%+)
       OR completion message appears
   }
7. Wait 3 seconds for progress registration
8. Tap back or close button
9. Return to TOC
10. Verify EPUB shows completion badge (green checkmark)
11. Assert progress updated
12. Capture screenshot
13. Add to tracking: content_results.append("EPUB: PASS")
```

**4.6: H5P INTERACTIVE CONTENT**
```
1. Locate "H5P" content unit
2. Scroll to make visible if needed
3. Tap on H5P unit
4. Wait for H5P content to load (10-20 seconds - may be slow)
5. Identify H5P type and interact accordingly:
   
   IF H5P type == "Quiz/Questions":
   {
       a. FOR EACH question:
          - Read question
          - Select any answer option
          - Tap "Next" or "Check"
       b. Complete all questions
       c. Tap "Submit" at end
       d. Wait for score/results display
   }
   
   IF H5P type == "Interactive Video":
   {
       a. Tap play on video
       b. Interact with hotspots/questions as they appear
       c. Complete entire video
   }
   
   IF H5P type == "Presentation/Course":
   {
       a. Navigate through all slides
       b. Complete all interactions
   }
   
6. Wait for completion confirmation (score, message, or badge)
7. Tap back or close button
8. Return to TOC
9. Verify H5P shows completion (green checkmark)
10. Capture screenshot
11. Add to tracking: content_results.append("H5P: PASS")
```

**4.7: HTML CONTENT**
```
1. Locate "HTML" content unit
2. Scroll to make visible if needed
3. Tap on HTML unit
4. Wait for HTML content to render (2-5 seconds)
5. IF content has scrollable area:
   {
       Scroll from top to bottom to view all content
   }
6. IF screen auto-rotates to landscape: Wait for rotation
7. View content for minimum 5 seconds (progress tracking threshold)
8. IF hamburger menu visible (top-left):
   {
       a. Tap hamburger icon
       b. Tap "Exit" option
   }
   ELSE:
   {
       Tap back button
   }
9. Return to TOC
10. Verify HTML content shows completion badge
11. Assert progress registered
12. Capture screenshot
13. Add to tracking: content_results.append("HTML: PASS")
```

**4.8: SELF-ASSESSMENT CONTENT**
```
1. Locate "Self-Assessment" or "Quiz" content unit
2. Scroll to make visible if needed
3. Tap on Self-Assessment unit
4. Wait for assessment interface to load
5. FOR EACH question in assessment:
   {
       a. Read question text
       b. Select answer option:
          - IF multiple choice: Tap radio button
          - IF checkbox: Tap checkboxes
          - IF text input: Enter text
       c. IF "Next" button visible: Tap to proceed
   }
6. After all questions answered:
   {
       a. Tap "Submit" button
       b. Wait for submission to process (2-3 seconds)
   }
7. Wait for results screen to appear
8. IF score displayed: Note the score value
9. Verify feedback or completion message shown
10. Tap "Close" or back button
11. Return to TOC
12. Verify Self-Assessment shows completion (green checkmark)
13. Assert progress updated
14. Capture screenshot
15. Add to tracking: content_results.append("Self-Assessment: PASS")
```

**STEP 5: FINAL VALIDATION**
```
1. Scroll to top of course page
2. Locate "Your Progress" section
3. Verify overall course progress percentage
4. Calculate expected progress:
   expected = (completed_units / total_units) * 100
5. Assert displayed progress ≈ expected (within ±5%)
6. Verify all 8 content types show green checkmarks
7. Review tracking results: content_results
8. Assert all entries show "PASS"
9. Capture final screenshot of course completion state
10. CHECKPOINT: All content types consumed successfully ✓
```

### EXPECTED RESULTS:
✓ User successfully enrolled in course
✓ All 8 content types consumed without errors:
  - Resource: Completed ✓
  - MP4: 20% → 100% via seek ✓
  - YouTube: 20% → 100% via seek ✓
  - WebM: 20% → 100% via seek ✓
  - EPUB: Completed ✓
  - H5P: Completed ✓
  - HTML: Completed ✓
  - Self-Assessment: Completed ✓
✓ Course progress updated after each content
✓ All units show completion indicators
✓ Overall progress reflects accurate percentage

### ERROR HANDLING:
- IF content fails to load: Wait 10s, retry once
- IF video won't play: Check network, clear cache, retry
- IF progress not updating: Wait 5s, refresh TOC page
- IF H5P crashes: Capture logs, restart app if needed
- For YouTube: May require longer load times (15-20s)

---

## TC_58: Best Score Display for Course Assessments

### TEST CASE DESCRIPTION:
Verify that "Best Score X/Y" is displayed for each assessment only if user has attempted the assessment in the Course TOC

### PRECONDITIONS:
- Course assessment is set with max attempt limit
- Assessment is added to the course
- User has valid credentials

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course with assessment configured

### APPIUM TEST STEPS:

**STEP 1: LOGIN AND NAVIGATE**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen (15 seconds max)
3. Tap "Login" button
4. Enter valid credentials:
   - Email field: Enter username
   - Password field: Enter password
5. Tap "LOGIN" button
6. Wait for authentication and dashboard load
7. Verify login successful
```

**STEP 2: FIND AND JOIN COURSE WITH ASSESSMENT**
```
1. Tap "Courses" or "Library" tab
2. Search for course with certificate/assessment configuration
3. Tap on course card
4. Wait for course details to load
5. IF "Join Course" button visible:
   {
       Tap "Join Course"
       IF consent popup: Tap "Accept"
       Wait for enrollment
   }
6. Tap "Start Learning" to enter course
7. Wait for TOC to load
```

**STEP 3: VERIFY ASSESSMENT WITHOUT ATTEMPT - NO SCORE DISPLAYED**
```
1. Locate assessment content in course modules
2. IF not visible: Scroll to find assessment
3. Observe assessment tile/card
4. Verify NO "Best Score" text is displayed
5. Verify NO "X/Y" score format shown
6. Assert only assessment title and icon visible
7. Capture screenshot: "assessment_before_attempt.png"
8. CHECKPOINT: No score shown before attempt ✓
```

**STEP 4: ATTEMPT ASSESSMENT FIRST TIME**
```
1. Tap on assessment content unit
2. Wait for assessment to load (5-10 seconds)
3. FOR EACH question:
   {
       Read question
       Select an answer (correct or incorrect)
       Tap "Next" if available
   }
4. Tap "Submit" button after all questions
5. Wait for results screen (3-5 seconds)
6. Note the score displayed (e.g., "7/10")
7. Capture score value: first_score = displayed_score
8. Tap "Close" or back button
9. Return to course TOC
```

**STEP 5: VERIFY BEST SCORE APPEARS AFTER FIRST ATTEMPT**
```
1. Ensure on course TOC page
2. Locate same assessment unit
3. Verify "Best Score X/Y" text IS NOW displayed on assessment tile
4. Assert score format matches: "Best Score [number]/[total]"
5. Verify displayed score = first_score
6. Capture screenshot: "assessment_after_first_attempt.png"
7. CHECKPOINT: Best Score displayed after attempt ✓
```

**STEP 6: ATTEMPT ASSESSMENT SECOND TIME (IF MAX ATTEMPTS > 1)**
```
1. Tap on same assessment unit again
2. Wait for assessment to load
3. Complete assessment with different answers
4. Submit assessment
5. View second attempt score: second_score
6. Note if second_score > first_score OR second_score < first_score
7. Tap back to TOC
```

**STEP 7: VERIFY BEST SCORE UPDATES CORRECTLY**
```
1. On course TOC, locate assessment unit
2. Check "Best Score" displayed
3. IF second_score > first_score:
   {
       Verify Best Score = second_score (higher score shown)
   }
   ELSE IF second_score <= first_score:
   {
       Verify Best Score = first_score (original higher score retained)
   }
4. Assert Best Score shows the HIGHEST attempt score
5. Capture screenshot: "best_score_after_multiple_attempts.png"
6. CHECKPOINT: Best Score reflects highest attempt ✓
```

**STEP 8: VERIFY IN OLD CONSUMED COURSE (IF APPLICABLE)**
```
1. Navigate back to courses list
2. Search for an OLD course user previously consumed with assessment
3. Open old course
4. Locate assessment in TOC
5. Verify "Best Score X/Y" IS displayed (historical data)
6. Assert best score from previous consumption is shown
7. CHECKPOINT: Best Score persists for old courses ✓
```

### EXPECTED RESULTS:
✓ "Best Score X/Y" is NOT displayed before user attempts assessment
✓ "Best Score X/Y" appears on assessment tile after first attempt
✓ Best Score shows the highest score achieved across multiple attempts
✓ Best Score persists and displays correctly in previously consumed courses
✓ Score format is clear and accurate (e.g., "Best Score 8/10")

### ERROR HANDLING:
- IF Best Score not appearing: Refresh TOC, verify attempt was submitted
- IF score incorrect: Re-attempt and verify calculation
- IF old course data missing: Check user's course history

### NOTES:
- Current implementation may show only current attempt score (not "Best")
- Number of attempts may not be displayed
- Verify with actual app behavior

---

## TC_59: Course Batch Expiry Timer Display

### TEST CASE DESCRIPTION:
Verify that the timer is displayed post Join Course and timer should appear "Y" amount of time before the expiry in X days Y Hours Z mins for batch which is about to expire

### PRECONDITIONS:
- Course batch has been created with batch end date
- Batch is approaching expiry (within timer threshold)
- User has valid credentials

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course with batch end date approaching

### APPIUM TEST STEPS:

**STEP 1: LOGIN TO APPLICATION**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen to load
3. Tap "Login" button
4. Enter credentials:
   - Email field: Enter username
   - Password field: Enter password
5. Tap "LOGIN" button
6. Wait for successful authentication
7. Verify dashboard/home screen loaded
```

**STEP 2: SEARCH FOR COURSE WITH BATCH END DATE**
```
1. Tap "Courses" or "Library" tab
2. IF search needed:
   {
       Tap search icon
       Enter course name with expiring batch
       Wait for results
   }
   ELSE:
   {
       Scroll through available courses
       Look for course with expiring batch
   }
3. Locate target course card
4. Tap on course card
5. Wait for course details page to load
```

**STEP 3: JOIN COURSE AND CHECK FOR TIMER**
```
1. On course details page, locate "Join Course" button
2. Tap "Join Course" button
3. IF consent popup appears:
   {
       Review consent
       Tap "Accept" or "I Agree"
   }
4. Wait for enrollment confirmation (2-3 seconds)
5. Observe course details page after enrollment
6. Look for timer display in following locations:
   - Near course title/header
   - In progress section
   - Below "Start Learning" button
   - In banner/notification area
7. IF timer visible:
   {
       a. Verify timer format: "X days Y hours Z mins" or similar
       b. Verify timer shows countdown to batch end
       c. Note timer values
       d. Capture screenshot
   }
   ELSE:
   {
       a. Verify no timer displayed
       b. Note: Timer may only show within specific threshold (e.g., 7 days before expiry)
       c. Capture screenshot
   }
```

**STEP 4: VERIFY TIMER APPEARS AT APPROPRIATE THRESHOLD**
```
1. Check batch end date information
2. Calculate time remaining until batch expiry
3. IF time remaining <= timer threshold (e.g., 7 days):
   {
       Assert timer IS displayed
       Verify countdown is accurate
   }
   ELSE IF time remaining > timer threshold:
   {
       Assert timer is NOT displayed (or shows generic message)
   }
4. Capture screenshot for evidence
```

**STEP 5: ENTER COURSE AND VERIFY TIMER PERSISTENCE**
```
1. Tap "Start Learning" button
2. Wait for course TOC to load
3. Check if timer is also displayed in course TOC:
   - Top of page
   - Progress section
   - Banner area
4. Verify timer consistency with details page
5. Capture screenshot if timer present
```

**STEP 6: VERIFY TIMER COUNTDOWN (OPTIONAL)**
```
1. Note current timer values (e.g., "2 days 5 hours 30 mins")
2. Wait for 1-2 minutes
3. Refresh course page (swipe down or navigate away and back)
4. Check if timer updated (minutes decreased)
5. Verify countdown is functional
```

### EXPECTED RESULTS:
✓ Timer is displayed after joining course (if within threshold)
✓ Timer shows format: "X days Y hours Z mins" before expiry
✓ Timer appears "Y" amount of time before batch end (per configuration)
✓ Timer countdown is accurate and updates
✓ Timer visible in appropriate locations (details page, TOC)

### ACTUAL BEHAVIOR (as per comments):
- After Join Course, no timer is displayed
- Only "Start Learning" button shown
- Timer may not be implemented or threshold not met

### ERROR HANDLING:
- IF timer not visible: Check batch end date, verify within threshold
- IF timer format incorrect: Capture and report discrepancy
- IF timer not counting: Refresh page, verify timer updates

---

## TC_60: Unenroll from Open Courses

### TEST CASE DESCRIPTION:
Verify that user can unenroll from open courses

### PRECONDITIONS:
- User should have Sunbird account
- Open enrollment courses available
- User credentials valid

### TEST DATA:
- Username: [specify]
- Password: [specify]

### APPIUM TEST STEPS:

**STEP 1: LOGIN TO APPLICATION**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen to load (15 seconds max)
3. Tap "Login" or "Sign In" button
4. Wait for login screen to appear
5. Enter credentials:
   - Email/username field: Enter username
   - Password field: Enter password
6. Tap "LOGIN" button
7. Wait for authentication to complete
8. Verify dashboard/home page loaded successfully
```

**STEP 2: NAVIGATE TO COURSES**
```
1. Tap "Courses" tab in bottom navigation
2. Wait for courses page to load (5-10 seconds)
3. Verify courses page displayed
```

**STEP 3: FIND AND ENROLL IN OPEN COURSE**
```
1. Scroll down courses page
2. Look for "Open for Enrollment" section
3. IF section not visible:
   {
       Execute vertical scroll (swipe up)
       Continue until "Open for Enrollment" section appears
   }
4. Locate any course card in "Open for Enrollment" section
5. Note course name: enrolled_course_name
6. Tap on course card
7. Wait for course details to load
8. Verify "Enroll" or "Join Course" button visible
9. Tap "Enroll"/"Join Course" button
10. IF consent popup appears:
    {
        Review information
        Tap "Accept" or "I Agree"
    }
11. Wait for enrollment confirmation (2-3 seconds)
12. Verify "Start Learning" button appears
13. Capture screenshot: "course_enrolled.png"
```

**STEP 4: CONSUME COURSE PARTIALLY**
```
1. Tap "Start Learning" button
2. Wait for course TOC to load
3. Select first content unit in course
4. Tap on content unit to open
5. Consume partially:
   - IF video: Play for 30-60 seconds, then exit
   - IF PDF: View 1-2 pages, then exit
   - IF HTML: View for 10 seconds, then exit
6. Tap back button to return to TOC
7. Verify partial progress registered (progress bar or percentage)
8. Capture screenshot showing partial consumption
9. Tap back button to course details page
```

**STEP 5: UNENROLL FROM COURSE**
```
1. On course details page, look for "Unenroll" button
2. IF "Unenroll" not immediately visible:
   {
       Scroll down page
       OR look for kebab menu (three dots)
       OR check in course options
   }
3. Tap "Unenroll" button
4. Wait for confirmation dialog to appear (1-2 seconds)
```

**STEP 6: CONFIRM UNENROLLMENT**
```
1. Verify confirmation dialog displays:
   - Message: "Are you sure you want to unenroll?"
   - Two options: "Cancel" and "Unenroll" (or "Yes"/"No")
2. Read confirmation message
3. Tap "Unenroll" option in dialog
4. Wait for unenrollment to process (2-3 seconds)
5. Observe result:
   - IF success toast: Note message
   - IF page redirects: Note destination
```

**STEP 7: VERIFY UNENROLLMENT SUCCESSFUL**
```
1. Check course details page status
2. Verify "Enroll" or "Join Course" button is NOW visible again
   (Indicates user is no longer enrolled)
3. Tap back button to courses list
4. Navigate to "My Courses" section
5. Verify enrolled_course_name is NOT in "My Courses" list
6. Capture screenshot: "course_unenrolled.png"
7. CHECKPOINT: Unenrollment successful ✓
```

**STEP 8: VERIFY COURSE STILL ACCESSIBLE (OPTIONAL)**
```
1. Go back to "Courses" tab
2. Search for or navigate to same course
3. Tap on course card
4. Verify course details still accessible
5. Verify "Enroll" button available (can re-enroll)
6. Verify previous progress is NOT shown (fresh enrollment state)
```

### EXPECTED RESULTS:
✓ User can locate "Unenroll" button on enrolled course
✓ Confirmation dialog appears asking to confirm unenrollment
✓ After confirming, user is successfully unenrolled
✓ "Enroll" button reappears on course (can re-enroll)
✓ Course removed from "My Courses" section
✓ Success message or confirmation displayed

### ERROR HANDLING:
- IF "Unenroll" not found: Check user is actually enrolled, look in menus
- IF confirmation dialog doesn't appear: Retry tap on unenroll
- IF unenrollment fails: Check network, retry operation
- IF course still in "My Courses": Refresh list, verify server sync

---

## TC_61: Explore Course Page and Search Functionality

### TEST CASE DESCRIPTION:
Verify that user is able to access the Explore-Course page and should be able to search the particular course by do_id/Name

### PRECONDITIONS:
- User should be on Sunbird portal
- Valid course exists with known name and do_id

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course name: [specific course]
- Course do_id: [identifier]

### APPIUM TEST STEPS:

**STEP 1: LOGIN TO APPLICATION**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen to load
3. Tap "Login" or "Sign In" option
4. Wait for login screen
5. Enter valid credentials:
   - Email field: Enter username
   - Password field: Enter password
6. Tap "LOGIN" button
7. Wait for authentication
8. Verify dashboard/home loaded successfully
```

**STEP 2: ACCESS EXPLORE COURSES PAGE**
```
1. Tap "Courses" tab in bottom navigation OR top menu
2. Wait for courses page to load (5-10 seconds)
3. Verify "Explore Courses" or "All Courses" section visible
4. CHECKPOINT: Successfully accessed Explore Courses page ✓
5. Capture screenshot: "explore_courses_page.png"
```

**STEP 3: SEARCH COURSE BY NAME**
```
1. Locate search functionality:
   - Look for search icon (magnifying glass)
   - OR look for search bar at top
2. Tap on search icon/bar
3. Wait for search input field to appear or activate
4. Enter course name in search field
5. IF search suggestions appear:
   {
       Verify target course in suggestions
       Tap on course from suggestions
   }
   ELSE:
   {
       Tap search button or Enter key
       Wait for search results (3-5 seconds)
   }
6. Verify search results displayed
7. Locate target course in results
8. Assert course card shows:
   - Course name (matches search)
   - Course thumbnail/image
   - Publisher/organization name
   - Other metadata
9. Capture screenshot: "search_by_name_results.png"
10. CHECKPOINT: Course found by name ✓
```

**STEP 4: CLEAR SEARCH AND SEARCH BY DO_ID**
```
1. Clear current search:
   - Tap X or clear icon in search field
   - OR delete text manually
2. Verify search field is empty
3. Enter course do_id (content identifier) in search field
4. Execute search (tap search button or Enter)
5. Wait for search results (3-5 seconds)
6. Verify results displayed
7. Locate target course in results
8. Assert course card displays correctly
9. Verify do_id search returned correct course
10. Capture screenshot: "search_by_doid_results.png"
11. CHECKPOINT: Course found by do_id ✓
```

**STEP 5: VERIFY COURSE DETAILS ACCESSIBLE**
```
1. From search results, tap on course card
2. Wait for course details page to load
3. Verify course details page shows:
   - Course title
   - Description
   - Enroll/Join button
   - Course structure/TOC preview
   - Publisher info
   - Ratings/reviews (if available)
4. Capture screenshot: "course_details_from_search.png"
5. CHECKPOINT: Course details accessible ✓
```

**STEP 6: VERIFY SEARCH PERSISTENCE (OPTIONAL)**
```
1. Tap back button to return to search results
2. Verify search results still displayed
3. Verify search term still in search field
4. Test alternate search:
   - Enter partial course name
   - Verify search still works
```

### EXPECTED RESULTS:
✓ User can access Explore Course page successfully
✓ Search functionality is visible and accessible
✓ User can search course by course name - results displayed
✓ User can search course by do_id - results displayed
✓ Search results show relevant course cards
✓ Tapping course card opens course details
✓ Search works for both full and partial names

### ERROR HANDLING:
- IF search not found: Check navigation, look for search in toolbar
- IF no results for valid query: Verify course exists, check spelling
- IF do_id search fails: Verify do_id format is correct
- IF page doesn't load: Check network connectivity, retry

---

## TC_62: Course Certificate Download and Learner Passbook

### TEST CASE DESCRIPTION:
1. Verify that the user is able to download the course completion certificate/merit certificate after consuming the course completely
2. Verify if the user is able to download the certificate from the learner's passbook section
3. Verify that the user is displayed with course details in Learner Passbook
4. Verify that logged user/guest can see certificate criteria before/after joining course

### PRECONDITIONS:
- Course created with batch
- SVG Certificate attached to course
- Certificate criteria configured (merit score if applicable)
- User credentials valid

### TEST DATA:
- Username: [consumer credentials]
- Password: [specify]
- Course name: [course with certificate]

### APPIUM TEST STEPS:

**STEP 1: LOGIN TO APPLICATION**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen
3. Tap "Login" or "Sign In" button
4. Enter consumer credentials:
   - Email field: Enter username
   - Password field: Enter password
5. Tap "LOGIN" button
6. Wait for authentication
7. Verify successful login (dashboard visible)
```

**STEP 2: LOCATE COURSE WITH CERTIFICATE**
```
1. Tap "Courses" or "Library" tab
2. Search for course with certificate configuration
3. Tap search icon
4. Enter course name
5. Wait for search results
6. Locate target course card
7. Tap on course card
8. Wait for course details to load
```

**STEP 3: VERIFY CERTIFICATE CRITERIA BEFORE ENROLLMENT (GUEST/LOGGED USER)**
```
1. On course details page (before joining)
2. Scroll down page to look for certificate information
3. Look for section showing certificate criteria:
   - Section title: "Certificate" or "Eligibility"
   - Criteria text (e.g., "Complete 100% and score 60% in assessment")
4. IF certificate criteria section visible:
   {
       a. Verify criteria clearly stated
       b. IF "Show More" option exists: Tap to expand details
       c. Read full certificate requirements
       d. Capture screenshot: "certificate_criteria_before_enroll.png"
       e. CHECKPOINT: Certificate criteria visible before enrollment ✓
   }
   ELSE:
   {
       Note: Certificate criteria NOT displayed before enrollment
       Capture screenshot for comparison
   }
```

**STEP 4: ENROLL IN COURSE**
```
1. Scroll to find "Join Course" or "Enroll" button
2. Tap "Join Course" button
3. IF consent popup:
   {
       Review and tap "Accept"
   }
4. Wait for enrollment (2-3 seconds)
5. Verify "Start Learning" button appears
```

**STEP 5: VERIFY CERTIFICATE CRITERIA AFTER ENROLLMENT**
```
1. On course details/TOC page after enrollment
2. Scroll through page
3. Look for certificate criteria section
4. IF visible:
   {
       Verify same or similar criteria displayed
       Capture screenshot: "certificate_criteria_after_enroll.png"
   }
5. Compare with pre-enrollment display
```

**STEP 6: CONSUME COURSE TO 100%**
```
1. Tap "Start Learning" to enter course
2. CONSUME all course content to 100%:
   
   FOR EACH content unit in course:
   {
       a. Tap on content unit
       b. Complete content (video, PDF, HTML, etc.)
       c. IF video: Play to completion or seek to end
       d. IF PDF: Navigate through all pages
       e. IF assessment: Answer all questions
       f. Tap back to TOC
       g. Verify unit marked complete (green checkmark)
   }
   
3. Verify overall progress shows 100%
4. Scroll to "Your Progress" section
5. Confirm "You have successfully completed this course" message
```

**STEP 7: COMPLETE ASSESSMENT (IF CERTIFICATE REQUIRES SCORE)**
```
1. Locate assessment content in course
2. Tap on assessment
3. Answer questions:
   
   FOR MERIT CERTIFICATE TEST:
   {
       Answer correctly to score above merit threshold
       (e.g., if merit = 60%, answer 60%+ correctly)
   }
   
   FOR NO CERTIFICATE TEST:
   {
       Answer incorrectly to score below threshold
   }
   
4. Submit assessment
5. Wait for score display
6. Note score achieved: assessment_score
7. Tap back to TOC
```

**STEP 8: VERIFY CERTIFICATE AVAILABILITY IN COURSE**
```
1. After 100% completion, check course page
2. Scroll to progress section
3. Look for "Download Certificate" button/option
4. IF certificate criteria met (100% + passing score):
   {
       a. Verify "Download Certificate" IS visible
       b. Capture screenshot: "download_cert_button_visible.png"
   }
   ELSE IF criteria NOT met:
   {
       a. Verify "Download Certificate" NOT visible
       b. Capture screenshot: "no_cert_low_score.png"
   }
```

**STEP 9: DOWNLOAD CERTIFICATE FROM COURSE PAGE**
```
1. IF "Download Certificate" button visible:
   {
       a. Tap "Download Certificate" button
       b. Wait for certificate generation (3-5 seconds)
       c. Verify certificate downloads or opens
       d. Check certificate type:
          - IF score > merit: Expect "Merit Certificate"
          - IF score < merit but 100%: Expect "Completion Certificate"
       e. Verify certificate shows:
          - User name
          - Course name
          - Completion date
          - Certificate type
       f. Capture screenshot of certificate
       g. CHECKPOINT: Certificate downloaded from course ✓
   }
```

**STEP 10: ACCESS LEARNER PASSBOOK**
```
1. Navigate to Profile section:
   - Tap back buttons to exit course
   - Tap "Profile" tab in bottom navigation
2. Wait for profile page to load
3. Scroll down to find "Learner Passbook" section
4. IF not visible: Look for "Certificates" or similar section
5. Tap on "Learner Passbook" section
6. Wait for passbook page to load
```

**STEP 11: VERIFY CERTIFICATE IN LEARNER PASSBOOK**
```
1. On Learner Passbook page, look for certificate entries
2. Locate certificate for completed course
3. Verify following information IS displayed for certificate:
   
   a. COURSE NAME:
      - Verify course name matches consumed course
      - Assert text is clear and readable
   
   b. CERTIFICATE GIVEN BY:
      - Verify issuing organization name
      - Assert correct publisher/institution
   
   c. CERTIFICATE ISSUE DATE:
      - Verify date is today or recent
      - Assert date format is correct
   
4. Verify certificate card shows thumbnail or preview
5. Capture screenshot: "learner_passbook_details.png"
6. CHECKPOINT: Certificate details correct in passbook ✓
```

**STEP 12: DOWNLOAD CERTIFICATE FROM LEARNER PASSBOOK**
```
1. On certificate card in Learner Passbook
2. Look for download icon or "Download" button
3. Tap on certificate card OR download button
4. Wait for certificate to download/open
5. Verify certificate file accessible
6. Verify certificate content matches course completion
7. CHECKPOINT: Certificate downloadable from passbook ✓
```

**STEP 13: VERIFY CERTIFICATE TYPE BASED ON SCORE**
```
1. Review downloaded certificate
2. Check certificate title/heading:
   
   IF assessment_score >= merit_threshold:
   {
       Assert certificate type = "Merit Certificate"
       Verify merit badge or distinction shown
   }
   ELSE IF assessment_score < merit_threshold BUT progress = 100%:
   {
       Assert certificate type = "Completion Certificate"
       Verify no merit designation
   }
   
3. Capture screenshot of certificate type
4. CHECKPOINT: Correct certificate type issued ✓
```

### EXPECTED RESULTS:
✓ User receives "merit certificate" for 100% completion + score ≥ merit criteria
✓ User does NOT receive certificate for 100% + score < merit criteria (or receives completion cert only)
✓ Certificate downloadable from course page after completion
✓ Certificate available in Learner Passbook with correct details:
  - Course Name ✓
  - Certificate Given By ✓
  - Certificate Issue Date ✓
✓ Certificate criteria displayed before/after joining course (in separate section with "Show More")
✓ Guest and logged-in users can see certificate rules

### ACTUAL BEHAVIOR (as per comments):
- Certificate criteria NOT displayed before joining course

### ERROR HANDLING:
- IF certificate not generated: Wait 5-10 mins, check completion status
- IF passbook empty: Verify certificate was issued, refresh page
- IF download fails: Check permissions, retry download
- IF wrong certificate type: Verify assessment score and criteria

---

## TC_63: Certificate Re-issue and Re-published Course Certificate

### TEST CASE DESCRIPTION:
1. Verify content creator can re-issue certificate to specific user via mentor dashboard
2. Verify user receives new certificate automatically when consuming re-published course
3. Verify correct certificate information in learner passbook

### PRECONDITIONS:
- Course created with certificate attached
- Users have consumed course 100% and received certificates
- Course creator credentials available
- Course will be re-published with additional content

### TEST DATA:
- Creator username: [course creator]
- Creator password: [specify]
- Consumer username: [user with certificate]
- Consumer diksha_id or UUID: [user identifier]
- Course name: [course with certificate]

### APPIUM TEST STEPS:

**PART A: RE-ISSUE CERTIFICATE VIA MENTOR DASHBOARD**

**STEP 1: LOGIN AS COURSE CREATOR**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen
3. Tap "Login" button
4. Enter course creator credentials:
   - Email field: Enter creator username
   - Password field: Enter creator password
5. Tap "LOGIN" button
6. Wait for authentication
7. Verify login successful (creator dashboard visible)
```

**STEP 2: NAVIGATE TO COURSE**
```
1. Tap "Library" or "Courses" tab
2. Search for course with certificate
3. Enter course name in search
4. Wait for search results
5. Tap on course card
6. Wait for course details to load
```

**STEP 3: ACCESS MENTOR DASHBOARD**
```
1. On course details page, look for "View Dashboard" option
2. IF not visible:
   {
       Look for kebab menu (three dots)
       OR scroll down page
       OR check in course management options
   }
3. Tap "View Dashboard" button
4. Wait for dashboard to load (5-10 seconds)
5. Verify mentor dashboard displays with tabs/sections
```

**STEP 4: NAVIGATE TO CERTIFICATES TAB**
```
1. On mentor dashboard, locate tabs/sections
2. Look for "Certificates" tab or section
3. IF tabs visible (horizontal scroll):
   {
       Swipe left/right to find "Certificates" tab
   }
4. Tap "Certificates" tab
5. Wait for certificates section to load
6. Verify certificate management interface displayed
```

**STEP 5: RE-ISSUE CERTIFICATE TO USER**
```
1. On Certificates page, look for user search/input
2. Locate "Diksha ID" or "UUID" input field
3. Tap on input field to activate
4. Enter user's diksha_id or UUID
5. Tap "Validate" or "Search" button
6. Wait for user validation (2-3 seconds)
7. Verify user details displayed:
   - User name
   - Certificate status
   - Previous issue date (if any)
8. Locate "Re-issue Certificate" button
9. Tap "Re-issue Certificate" button
10. IF confirmation dialog appears:
    {
        Read confirmation message
        Tap "Confirm" or "Yes"
    }
11. Wait for re-issue process (3-5 seconds)
12. Verify success message or toast:
    - "Certificate re-issued successfully" or similar
13. Capture screenshot: "certificate_reissued.png"
14. CHECKPOINT: Certificate re-issued via dashboard ✓
```

**PART B: VERIFY NEW CERTIFICATE ON RE-PUBLISHED COURSE**

**STEP 6: RE-PUBLISH COURSE (AS CREATOR)**
```
Note: This step assumes creator has already added new content
1. Navigate back to course management
2. Verify new content added to course
3. Submit course for re-publishing
4. Wait for course to be re-published
5. Note: This may be done separately outside mobile app
```

**STEP 7: LOGIN AS CONSUMER**
```
1. Log out from creator account:
   - Tap Profile → Logout
2. Tap "Login" again
3. Enter consumer credentials (user who completed course)
4. Tap "LOGIN"
5. Verify consumer logged in successfully
```

**STEP 8: CONSUME RE-PUBLISHED COURSE**
```
1. Navigate to "My Courses" or "Library"
2. Locate re-published course
3. Tap on course card
4. Verify course shows updated content
5. IF new content visible:
   {
       a. Tap "Continue Learning" or "Resume"
       b. Consume new content to 100%:
          - Tap on new content units
          - Complete each new content
          - Verify completion checkmarks
       c. Ensure overall progress = 100%
   }
6. Return to course details/TOC page
```

**STEP 9: VERIFY NEW CERTIFICATE RECEIVED**
```
1. After consuming re-published course to 100%
2. Check course page for certificate status
3. Navigate to Profile → Learner Passbook
4. Look for NEW certificate entry for same course
5. Verify new certificate exists:
   - Check issue date (should be recent/today)
   - Verify course name
   - Check certificate given by
6. Compare with old certificate (if still visible)
7. Assert NEW certificate issued automatically
8. Capture screenshot: "new_cert_republished_course.png"
9. CHECKPOINT: New certificate auto-issued for re-published course ✓
```

**STEP 10: VERIFY CERTIFICATE INFORMATION IN PASSBOOK**
```
1. On Learner Passbook page
2. Locate certificate entry for course
3. Verify following details are CORRECT:
   
   a. COURSE NAME:
      - Assert matches actual course name
      - Verify no typos or errors
   
   b. CERTIFICATE GIVEN BY:
      - Verify correct organization/institution
      - Assert issuer name accurate
   
   c. CERTIFICATE ISSUE DATE:
      - Verify shows recent date (today or re-publish date)
      - Assert date format correct (DD/MM/YYYY or similar)
      - Compare with previous certificate date (should be newer)
   
4. Tap on certificate to view/download
5. Verify certificate PDF/image shows same information
6. Capture screenshot: "passbook_cert_details.png"
7. CHECKPOINT: All certificate information correct ✓
```

### EXPECTED RESULTS:
✓ Mentor can access mentor dashboard for course
✓ Certificates tab accessible in dashboard
✓ Mentor can enter user diksha_id/UUID and validate
✓ "Re-issue Certificate" button functional
✓ Certificate successfully re-issued with confirmation
✓ User consuming re-published course receives NEW certificate automatically
✓ Learner Passbook shows correct information:
  - Course Name ✓
  - Certificate Given By ✓
  - Certificate Issue Date (updated) ✓
✓ New certificate replaces or supplements old certificate

### ERROR HANDLING:
- IF dashboard not accessible: Verify creator has mentor/admin rights
- IF user not found: Verify diksha_id/UUID correct
- IF re-issue fails: Check network, retry operation
- IF new certificate not generated: Wait 5-10 mins, refresh passbook
- IF certificate details wrong: Report as bug with screenshots

---

## TC_64: User Consent Popup for Course Enrollment

### TEST CASE DESCRIPTION:
Verify that user is asked to provide consent while enrolling to a course/trackable collection and consent popup displays required user information fields

### PRECONDITIONS:
- Course or trackable collection created
- Trackable collection has "enable track" field set
- User has valid credentials
- User profile has required information

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course/Trackable collection name: [specify]

### APPIUM TEST STEPS:

**STEP 1: LOGIN TO APPLICATION**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen to load
3. Tap "Login" or "Sign In" button
4. Enter credentials:
   - Email field: Enter username
   - Password field: Enter password
5. Tap "LOGIN" button
6. Wait for authentication
7. Verify successful login
```

**STEP 2: NAVIGATE TO COURSE/TRACKABLE COLLECTION**
```
1. Tap "Library" or "Courses" tab
2. Search for course/trackable collection
3. Tap search icon
4. Enter course/collection name
5. Wait for search results
6. Locate target course/trackable collection card
7. Tap on card
8. Wait for details page to load
```

**STEP 3: INITIATE ENROLLMENT AND OBSERVE CONSENT POPUP**
```
1. On course/collection details page
2. Locate "Join Course" or "Join" button
3. Tap "Join Course"/"Join" button
4. Wait for consent popup to appear (2-3 seconds)
5. Verify consent popup IS displayed
6. CHECKPOINT: Consent popup appears on enrollment ✓
```

**STEP 4: VERIFY CONSENT POPUP FIELDS**
```
Verify the following fields ARE displayed on consent popup:

1. USER'S NAME:
   a. Locate name field/display
   b. Verify user's full name shown
   c. Assert name is pre-filled (not editable OR editable)
   d. Capture screenshot showing name

2. DISTRICT:
   a. Locate "District" field
   b. Verify district value displayed
   c. Assert district information present

3. BLOCK:
   a. Locate "Block" field
   b. Verify block value displayed
   c. Assert block information present

4. SCHOOL/ORG ID:
   a. Locate "School ID" or "Organization ID" field
   b. Verify ID value displayed
   c. Assert school/org identifier present

5. SCHOOL/ORG NAME:
   a. Locate "School Name" or "Organization Name" field
   b. Verify name value displayed
   c. Assert school/org name present

6. MOBILE NUMBER:
   a. Locate "Mobile No" or "Phone" field
   b. Verify mobile number displayed
   c. Assert number format correct (masked or full)

7. EMAIL ID:
   a. Locate "Email" or "Email ID" field
   b. Verify email address displayed
   c. Assert email matches user account

8. Capture screenshot: "consent_popup_all_fields.png"
9. CHECKPOINT: All required fields present ✓
```

**STEP 5: VERIFY CONSENT POPUP STRUCTURE**
```
1. Verify popup has clear heading/title:
   - E.g., "User Consent" or "Confirm Details"
2. Verify consent text/message explaining data usage
3. Verify action buttons present:
   - "I Agree" or "Accept" button
   - "Cancel" or "Decline" button
4. Capture screenshot of full popup
```

**STEP 6: ACCEPT CONSENT**
```
1. Review all displayed information
2. Tap "I Agree" or "Accept" button
3. Wait for consent processing (2-3 seconds)
4. Verify popup closes
5. Verify enrollment successful:
   - "Start Learning" button appears
   - OR user redirected to course TOC
6. CHECKPOINT: Enrollment completed after consent ✓
```

**STEP 7: VERIFY CONSENT FOR TRACKABLE COLLECTION (IF TESTING COLLECTION)**
```
1. Navigate to Library tab
2. Search for trackable collection (with "enable track" enabled)
3. Tap on trackable collection card
4. Tap "Join" button
5. Verify consent popup appears (same as course)
6. Verify same fields displayed (name, district, block, school, mobile, email)
7. Accept consent
8. Verify enrollment successful
9. CHECKPOINT: Consent works for trackable collections ✓
```

### EXPECTED RESULTS:
✓ User consent popup displayed when joining course/trackable collection
✓ Consent popup shows all required fields:
  1. User's Name ✓
  2. District ✓
  3. Block ✓
  4. School/Org ID ✓
  5. School/Org Name ✓
  6. Mobile No ✓
  7. Email ID ✓
✓ All fields populated with user's profile information
✓ User can accept or decline consent
✓ After accepting, enrollment proceeds successfully
✓ Consent applies to both courses and trackable collections

### ERROR HANDLING:
- IF consent popup doesn't appear: Verify course/collection has tracking enabled
- IF fields missing: Check user profile completeness, report missing fields
- IF enrollment fails after consent: Check network, retry
- IF data incorrect: Verify user profile information accuracy

---

## TC_65: Join Course Button Disabled After Batch/Enrollment End

### TEST CASE DESCRIPTION:
Verify if the "Join course" button is disabled when the batch end date or enrollment end date is over

### PRECONDITIONS:
- Course should be created and published
- Course batch updated with batch end date OR enrollment end date (already passed)
- User has valid credentials

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course name: [course with expired batch/enrollment]

### APPIUM TEST STEPS:

**STEP 1: LOGIN TO APPLICATION**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen to load
3. Tap "Login" button
4. Enter valid credentials:
   - Email field: Enter username
   - Password field: Enter password
5. Tap "LOGIN" button
6. Wait for authentication
7. Verify successful login (dashboard visible)
```

**STEP 2: NAVIGATE TO COURSE WITH EXPIRED BATCH**
```
1. Tap "Courses" tab in navigation
2. Search for course with batch/enrollment end date passed
3. Tap search icon
4. Enter course name
5. Wait for search results (3-5 seconds)
6. Locate target course card
7. Tap on course card
8. Wait for course details page to load (5-10 seconds)
```

**STEP 3: VERIFY "JOIN COURSE" BUTTON DISABLED**
```
1. On course details page, locate "Join Course" button area
2. Observe button state:
   
   EXPECTED STATE:
   - Button is grayed out (disabled appearance)
   - Button is NOT clickable
   - Button text may show "Join Course" but in disabled state
   
3. Verify button visual indicators:
   - Color: Light gray or faded (not vibrant/primary color)
   - Opacity: Reduced opacity indicating disabled
   - Cursor: No click cursor on hover (if applicable)
   
4. Attempt to tap "Join Course" button
5. Verify NO action occurs (button doesn't respond)
6. Capture screenshot: "join_button_disabled.png"
7. CHECKPOINT: Join Course button is disabled ✓
```

**STEP 4: VERIFY TOAST MESSAGE DISPLAYED**
```
1. After tapping disabled "Join Course" button (or on page load)
2. Look for toast message or banner notification
3. Verify message displays:
   - "There are no open batches" OR
   - "Enrollment period has ended" OR
   - "This course is no longer available for enrollment" OR
   - Similar message indicating batch/enrollment closed
4. Read full message text
5. Verify message is clear and informative
6. Wait for toast to disappear (3-5 seconds) OR note persistent banner
7. Capture screenshot with toast visible: "no_open_batches_message.png"
8. CHECKPOINT: Appropriate message displayed ✓
```

**STEP 5: VERIFY NO ENROLLMENT OPTIONS AVAILABLE**
```
1. Scroll through course details page
2. Verify NO alternative enrollment methods:
   - No "Request Access" option
   - No "Notify Me" option
   - No other batch selection dropdown
3. Verify course information still accessible:
   - Course description visible
   - Course structure/TOC visible (preview)
   - Publisher info visible
4. Confirm user cannot proceed to enrollment
5. CHECKPOINT: No workarounds for expired batch ✓
```

**STEP 6: VERIFY BATCH END DATE INFORMATION (OPTIONAL)**
```
1. On course details page, look for batch information
2. IF batch dates displayed:
   {
       a. Locate "Batch End Date" or "Enrollment End Date"
       b. Verify date shown is in the past
       c. Confirm current date > batch/enrollment end date
       d. Capture screenshot showing dates
   }
3. Verify this aligns with disabled join button
```

### EXPECTED RESULTS:
✓ "Join Course" button is DISABLED (grayed out, not clickable)
✓ Toast message OR banner displayed stating:
  - "There are no open batches" OR
  - "Enrollment period ended" OR similar message
✓ User cannot enroll in course
✓ Message is clear and user-friendly
✓ Course information remains accessible for viewing
✓ No alternative enrollment methods available

### ERROR HANDLING:
- IF button appears active: Verify batch/enrollment dates, check system date
- IF no message displayed: Look for inline text or banner, report if missing
- IF enrollment proceeds: Critical bug - report immediately
- IF course not found: Verify course exists with expired batch

---

## TC_66: Profile Name Change Popup for Custodian Users (FAILED TEST)

### TEST CASE DESCRIPTION:
Verify that Profile Name change popup is displayed when custodian user clicks "Start Learning" button for courses and trackable collections with certificates

### PRECONDITIONS:
- Course OR trackable collection attached with certificate
- User is custodian user type
- User has valid credentials

### TEST DATA:
- Username: [custodian user credentials]
- Password: [specify]
- Course name: [course with certificate]
- Trackable collection: [collection with certificate]

### APPIUM TEST STEPS:

**PART A: TEST WITH COURSE**

**STEP 1: LOGIN AS CUSTODIAN USER**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen
3. Tap "Login" button
4. Enter custodian user credentials:
   - Email field: Enter username
   - Password field: Enter password
5. Tap "LOGIN" button
6. Wait for authentication
7. Verify successful login
8. Verify user type is custodian (if visible in profile)
```

**STEP 2: NAVIGATE TO COURSE WITH CERTIFICATE**
```
1. Tap "Courses" tab
2. Search for course with certificate attached
3. Tap search icon
4. Enter course name
5. Wait for results
6. Tap on course card
7. Wait for course details to load
```

**STEP 3: ENROLL IN COURSE**
```
1. Tap "Join Course" button
2. IF consent popup appears:
   {
       Accept consent
   }
3. Wait for enrollment (2-3 seconds)
4. Verify enrollment successful
5. Verify "Start Learning" button appears
```

**STEP 4: CLICK "START LEARNING" AND OBSERVE**
```
1. Tap "Start Learning" button
2. Wait 2-3 seconds
3. Observe what happens:
   
   EXPECTED (per test case):
   - Profile Name change popup should appear
   - Popup should allow editing name
   
   ACTUAL (per comments):
   - No popup appears
   - User directed straight to course contents/TOC
   
4. Capture screenshot of actual behavior: "no_popup_courses.png"
5. CHECKPOINT: Expected popup NOT appearing (TEST FAILED) ✗
```

**STEP 5: VERIFY IF NAME EDIT POPUP APPEARS (IF IT DOES)**
```
IF popup appears:
{
    1. Verify popup displays:
       - Current user name
       - Editable name field
       - "Save" or "Update" button
       - "Cancel" button
    2. Edit name:
       - Tap on name field
       - Modify name text
       - Tap "Save" or "Update"
    3. Verify name updated
    4. Verify user proceeds to course
    5. Capture screenshot
}
ELSE:
{
    Note: Popup not appearing as expected
    User directed to course TOC immediately
    Test case FAILED - feature not working
}
```

**PART B: TEST WITH TRACKABLE COLLECTION**

**STEP 6: NAVIGATE TO TRACKABLE COLLECTION**
```
1. Navigate back to Library tab
2. Search for trackable collection with certificate
3. Enter collection name in search
4. Wait for results
5. Tap on trackable collection card
6. Wait for details to load
```

**STEP 7: JOIN TRACKABLE COLLECTION**
```
1. Tap "Join" button on collection
2. IF consent popup: Accept
3. Wait for enrollment
4. Verify "Start Learning" button appears
```

**STEP 8: CLICK "START LEARNING" AND OBSERVE**
```
1. Tap "Start Learning" button
2. Wait 2-3 seconds
3. Observe behavior:
   
   EXPECTED:
   - Profile Name change popup appears
   
   ACTUAL:
   - Likely no popup (same as course behavior)
   - User goes directly to collection contents
   
4. Capture screenshot: "no_popup_trackable.png"
5. CHECKPOINT: Expected popup NOT appearing ✗
```

### EXPECTED RESULTS (PER TEST CASE):
✓ Profile Name change popup should display when custodian user clicks "Start Learning" for:
  1. Courses with certificates
  2. Trackable Collections with certificates
✓ User should be able to edit and update name in popup
✓ After updating, user proceeds to content

### ACTUAL RESULTS (PER COMMENTS):
✗ When "Start Learning" clicked, NO popup appears
✗ User directed straight to course/collection contents
✗ Feature not implemented or not working for custodian users
✗ TEST STATUS: FAILED

### ERROR HANDLING:
- IF popup doesn't appear: Verify user is custodian type
- IF course/collection doesn't have certificate: Verify certificate attached
- IF feature not implemented: Document as known issue

### NOTES:
- This test case is marked as FAILED in the original test suite
- Comments indicate popup is not appearing
- Status shows "Not able to reproduce" in sandbox
- Feature may not be implemented or may require specific configuration

---

## TC_67: Assessment Max Attempts and Best Score Retention

### TEST CASE DESCRIPTION:
1. Verify user sees toast message "It is the Last Attempt Left" on final attempt
2. Verify user cannot retry assessment after exhausting max attempts
3. Verify best score and attempts retained when user unenrolls and rejoins course

### PRECONDITIONS:
- Course assessment configured with max attempt limit (e.g., 3 attempts)
- Assessment added to course
- User has valid credentials

### TEST DATA:
- Username: [specify]
- Password: [specify]
- Course name: [course with assessment + max attempts]
- Max attempts: [e.g., 3]

### APPIUM TEST STEPS:

**SCENARIO 1 & 2: MAX ATTEMPTS AND TOAST MESSAGE**

**STEP 1: LOGIN AND ENROLL**
```
1. Launch Sunbird application on Android emulator
2. Wait for home screen
3. Tap "Login" button
4. Enter credentials:
   - Email: Enter username
   - Password: Enter password
5. Tap "LOGIN"
6. Wait for authentication
7. Navigate to Courses tab
8. Search for course with assessment
9. Tap on course card
10. Tap "Join Course"
11. IF consent: Accept
12. Tap "Start Learning"
13. Wait for TOC to load
```

**STEP 2: FIRST ASSESSMENT ATTEMPT**
```
1. Locate assessment content in course modules
2. Note "Attempts" indicator if visible (e.g., "0/3 attempts")
3. Tap on assessment
4. Wait for assessment to load
5. Answer questions (intentionally fail or pass - note score)
6. Tap "Submit"
7. Wait for results
8. Note score: attempt_1_score
9. Tap back to TOC
10. Verify attempt count updated (e.g., "1/3 attempts")
11. Capture screenshot: "after_attempt_1.png"
```

**STEP 3: SECOND ASSESSMENT ATTEMPT**
```
1. Tap on same assessment again
2. Verify assessment is still accessible (not grayed out)
3. Note attempts remaining (e.g., "1/3" → "2/3")
4. Complete assessment
5. Submit
6. View results: attempt_2_score
7. Tap back to TOC
8. Verify attempt count: "2/3"
9. Capture screenshot: "after_attempt_2.png"
```

**STEP 4: LAST ATTEMPT - VERIFY TOAST MESSAGE**
```
1. Before clicking assessment for 3rd (final) time
2. Note current attempts (e.g., "2/3")
3. Tap on assessment content
4. IMMEDIATELY observe for toast message:
   
   EXPECTED TOAST:
   - Message: "It is the Last Attempt Left" OR
             "This is your last attempt" OR similar
   - Duration: 3-5 seconds
   
5. Wait for toast to appear (should show on tap or page load)
6. Read toast message text
7. Verify message clearly indicates last attempt
8. Capture screenshot WITH toast visible: "last_attempt_toast.png"
9. CHECKPOINT: Toast message displayed on last attempt ✓
10. Complete final assessment attempt
11. Submit
12. View results: attempt_3_score
13. Note all three scores
14. Determine best_score = max(attempt_1, attempt_2, attempt_3)
15. Tap back to TOC
```

**STEP 5: VERIFY ASSESSMENT GREYED OUT AFTER MAX ATTEMPTS**
```
1. On course TOC, locate assessment tile
2. IF all attempts passed (score >= passing):
   {
       a. Verify assessment shows "Completed" status
       b. Verify green checkmark or success indicator
       c. Attempt to tap assessment again
   }
   ELSE IF all attempts used but failed (score < passing):
   {
       a. Verify assessment is GREYED OUT or DISABLED
       b. Verify message on assessment tile:
          "You have crossed maximum number of attempts"
          OR "No more attempts available"
       c. Attempt to tap on assessment
   }
3. IF assessment tapped:
   {
       Expected: Assessment should NOT open
       OR: Message displayed preventing retry
   }
4. Capture screenshot: "max_attempts_reached.png"
5. CHECKPOINT: Assessment locked after max attempts ✓
```

**STEP 6: VERIFY MESSAGE ON ASSESSMENT PLAYER PAGE (IF ACCESSIBLE)**
```
1. IF able to tap into assessment despite max attempts:
   {
       a. Observe player page
       b. Verify message displayed:
          "You have crossed maximum number of attempts to take the assessment"
       c. Verify assessment is not playable/retryable
       d. Capture screenshot: "max_attempts_player_message.png"
   }
2. Tap back to TOC
3. Verify same message on TOC tile (if applicable)
```

**SCENARIO 3: UNENROLL, REJOIN, VERIFY BEST SCORE RETAINED**

**STEP 7: UNENROLL FROM COURSE**
```
1. From course TOC or details page
2. Tap back to course details
3. Locate "Unenroll" or "Leave Batch" option
4. IF not visible: Look in kebab menu or scroll down
5. Tap "Unenroll" or "Leave Batch"
6. Wait for confirmation popup
7. Verify popup asks: "Are you sure you want to leave this batch?"
8. Tap "Confirm" or "Leave" button
9. Wait for unenrollment (2-3 seconds)
10. Verify success message or redirect
11. Verify "Join Course" button reappears
12. Capture screenshot: "after_unenroll.png"
```

**STEP 8: REJOIN COURSE**
```
1. On course details page (after unenroll)
2. Tap "Join Course" button again
3. IF consent popup: Accept again
4. Wait for re-enrollment
5. Tap "Start Learning"
6. Wait for course TOC to load
```

**STEP 9: VERIFY BEST SCORE AND ATTEMPTS RETAINED**
```
1. On course TOC after rejoining
2. Locate assessment content
3. Check assessment tile/card for displayed information:
   
   a. BEST SCORE:
      - Verify "Best Score X/Y" is displayed
      - Verify displayed score = best_score from previous attempts
      - Example: If attempts were 5/10, 8/10, 6/10 → Best = 8/10
      - Assert best score retained
   
   b. ATTEMPTS REMAINING:
      - Check attempts indicator
      - Verify remaining attempts = max_attempts - used_attempts
      - Example: If max=3 and used=3 → 0 attempts remaining
      - OR: Attempts counter may reset (per comments: "number of attempts is restored")
   
4. Capture screenshot: "after_rejoin_score_attempts.png"
5. CHECKPOINT: Best score retained ✓
6. CHECKPOINT: Attempt count status visible ✓
```

**STEP 10: VERIFY ASSESSMENT ACCESSIBILITY AFTER REJOIN**
```
1. IF attempts were exhausted before unenroll:
   {
       a. Verify if assessment is still locked/greyed out
       b. OR verify if attempts reset (can retry assessment)
       c. Document actual behavior
   }
2. IF attempts still available:
   {
       a. Tap on assessment
       b. Verify assessment loads
       c. Attempt one more time
       d. Verify attempt count decrements
   }
3. Verify best score persists regardless of new attempts
4. Capture final screenshot
```

### EXPECTED RESULTS:
✓ Toast message "It is the Last Attempt Left" displayed when user clicks assessment on last attempt
✓ When user exhausts max attempts (and fails), assessment becomes greyed out
✓ Message "You have crossed maximum number of attempts" shown on:
  - Assessment tile in TOC ✓
  - Assessment player page (if accessible) ✓
✓ When user unenrolls and rejoins course:
  - Best score is RETAINED ✓
  - Available max attempt values retained/displayed ✓
  - User can consume assessment for remaining attempts (if any) ✓

### ACTUAL BEHAVIOR (per comments):
- When user rejoins, number of attempts may be RESTORED (reset)
- Best score NOT displayed clearly (only current attempt score shown)
- Status: PASS with noted discrepancies

### ERROR HANDLING:
- IF toast not appearing: Verify max attempts configured, retry last attempt
- IF assessment not locked: Verify all attempts actually used
- IF best score not retained: Check server sync, report as bug
- IF attempts reset unexpectedly: Document behavior for product review

---

## END OF TEST CASES