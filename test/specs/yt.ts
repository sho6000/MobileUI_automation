// async function consumeYouTubeContent() {
//   console.log("  📺 Consuming YouTube video...");
//   await browser.execute(() => window.scrollTo(0, 0));
//   await browser.pause(2000);

//   const screenSize = await browser.getWindowSize();
//   const centerX = Math.round(screenSize.width / 2);
//   const centerY = Math.round(screenSize.height / 2);

//   // Find video container and get precise tap coordinates
//   const videoBounds = await browser.execute(() => {
//     const allEls = Array.from(document.querySelectorAll("*"));
//     for (const el of allEls) {
//       const text = (el.textContent || "").toLowerCase();
//       const rect = (el as HTMLElement).getBoundingClientRect();
//       if (
//         text.includes("watch on youtube") &&
//         rect.width > 100 &&
//         rect.height > 100 &&
//         rect.top >= 0 &&
//         rect.bottom <= window.innerHeight + 50
//       ) {
//         let container: HTMLElement = el as HTMLElement;
//         let parent = container.parentElement;
//         while (parent) {
//           const pRect = parent.getBoundingClientRect();
//           if (pRect.height > rect.height + 20) {
//             container = parent;
//             break;
//           }
//           parent = parent.parentElement;
//         }
//         const r = container.getBoundingClientRect();
//         return {
//           centerX: Math.round(r.left + r.width / 2),
//           centerY: Math.round(r.top + r.height / 2),
//           // Red play button is at roughly 40-45% from top of container
//           playBtnX: Math.round(r.left + r.width / 2),
//           playBtnY: Math.round(r.top + r.height * 0.42),
//           top: Math.round(r.top),
//           width: Math.round(r.width),
//           height: Math.round(r.height),
//         };
//       }
//     }
//     return null;
//   });

//   const tapX = videoBounds?.playBtnX ?? centerX;
//   const tapY = videoBounds?.playBtnY ?? centerY;

//   console.log(
//     videoBounds
//       ? `  📺 Video: ${videoBounds.width}x${videoBounds.height} top=${videoBounds.top} — tapping ${tapX},${tapY}`
//       : `  📺 Fallback center: ${tapX},${tapY}`
//   );

//   // ── HAMMER THE PLAY BUTTON until video plays ──────────────────────────────
//   // Keep tapping every 2 seconds for up to 60 seconds
//   // Check after each tap if video started playing or content completed

//   let videoPlaying = false;
//   let contentCompleted = false;

//   for (let attempt = 1; attempt <= 30; attempt++) {
//     console.log(`  📺 Tap attempt ${attempt}/30`);

//     // Strategy 1: W3C performActions
//     try {
//       await browser.performActions([{
//         type: "pointer",
//         id: "finger1",
//         parameters: { pointerType: "touch" },
//         actions: [
//           { type: "pointerMove", duration: 0, x: tapX, y: tapY },
//           { type: "pointerDown", button: 0 },
//           { type: "pause", duration: 100 },
//           { type: "pointerUp", button: 0 },
//         ],
//       }]);
//       await browser.releaseActions();
//     } catch {}

//     // Strategy 2: Appium touchAction
//     try {
//       await browser.touchAction({ action: "tap", x: tapX, y: tapY });
//     } catch {}

//     // Strategy 3: JS click at the tap coordinates
//     try {
//       await browser.execute((x: number, y: number) => {
//         const el = document.elementFromPoint(x, y);
//         if (el) {
//           (el as HTMLElement).click();
//           el.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: x, clientY: y }));
//           el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: x, clientY: y }));
//           el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, clientX: x, clientY: y }));
//         }
//       }, tapX, tapY);
//     } catch {}

//     // Strategy 4: Click the lite-youtube element or iframe directly
//     try {
//       await browser.execute(() => {
//         const targets = [
//           document.querySelector("lite-youtube"),
//           document.querySelector("iframe"),
//           document.querySelector("[class*='youtube']"),
//           Array.from(document.querySelectorAll("*")).find(
//             (el) => (el.textContent || "").toLowerCase().includes("watch on youtube") &&
//               (el as HTMLElement).getBoundingClientRect().width > 100
//           ),
//         ].filter(Boolean);

//         for (const target of targets) {
//           if (target) {
//             (target as HTMLElement).click();
//             target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//             target.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
//             target.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
//           }
//         }
//       });
//     } catch {}

//     await browser.pause(2000);

//     // Check if video iframe loaded (means embed was activated)
//     const iframeLoaded = await browser.execute(() => {
//       const iframe = document.querySelector("iframe[src*='youtube']") ||
//                      document.querySelector("iframe[src*='youtu']");
//       return !!iframe;
//     });

//     if (iframeLoaded && !videoPlaying) {
//       console.log(`  📺 YouTube iframe loaded on attempt ${attempt}!`);
//       videoPlaying = true;

//       // Send postMessage to seek to end now that iframe is loaded
//       await browser.execute(() => {
//         for (const iframe of Array.from(document.querySelectorAll("iframe"))) {
//           try {
//             iframe.contentWindow?.postMessage(
//               JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*"
//             );
//             iframe.contentWindow?.postMessage(
//               JSON.stringify({ event: "command", func: "seekTo", args: [99999, true] }), "*"
//             );
//           } catch {}
//         }
//       });
//       await browser.pause(1000);
//     }

//     // Check if content is now showing as completed on the page
//     contentCompleted = await browser.execute(() => {
//       const text = (document.body?.innerText || "").toLowerCase();
//       // Look for completion signals
//       return (
//         text.includes("completed") ||
//         text.includes("100%") ||
//         // Check for green tick / checkmark near content
//         document.querySelector("[class*='completed']") !== null ||
//         document.querySelector("[class*='success']") !== null
//       );
//     });

//     if (contentCompleted) {
//       console.log(`  📺 Content marked as completed on attempt ${attempt}!`);
//       break;
//     }

//     // If video is playing, just wait and check every 5s instead of hammering
//     if (videoPlaying) {
//       console.log(`  📺 Video playing — waiting for completion...`);
//       await browser.pause(3000);

//       // Re-send seek to end
//       await browser.execute(() => {
//         for (const iframe of Array.from(document.querySelectorAll("iframe"))) {
//           try {
//             iframe.contentWindow?.postMessage(
//               JSON.stringify({ event: "command", func: "seekTo", args: [99999, true] }), "*"
//             );
//           } catch {}
//         }
//       });
//     }
//   }

//   if (contentCompleted) {
//     console.log("  📺 ✅ YouTube content confirmed completed!");
//   } else if (videoPlaying) {
//     console.log("  📺 Video was playing — checking course progress");
//   } else {
//     console.log("  📺 ⚠️ Could not confirm play — proceeding anyway");
//   }

//   // Return to course page and reload to sync progress
//   await returnToCoursePageUrl();
//   await browser.pause(2000);
//   await browser.url(coursePageUrl);
//   await browser.pause(3000);

//   const progressAfter = await getCourseProgressPercentage();
//   console.log(`  📺 Course progress after YouTube: ${progressAfter}%`);
// }






// // ----------------------------------------


// for (const f of [page as any, ...page.frames()]) {
//     try {
//       const vid = f.locator('video').first();
//       if (await vid.isVisible({ timeout: 600 }).catch(() => false)) {
//         console.log(  [${lessonLabel}] Video content detected);
//         // Click the player center to start playback
//         const playerIframe = page.locator('iframe#contentPlayer, iframe[name="contentPlayer"], iframe[class="content-player"]').first();
//         const pBox = await playerIframe.boundingBox().catch(() => null);
//         if (pBox) {
//           await page.mouse.click(
//             Math.round(pBox.x + pBox.width / 2),
//             Math.round(pBox.y + pBox.height / 2)
//           ).catch(() => {});
//           await page.waitForTimeout(500);
//         }
//         // Also try keyboard play
//         await page.keyboard.press('k').catch(() => {});
//         await page.keyboard.press('Space').catch(() => {});

//         // Wait for video completion — poll every 3s up to 10 min
//         const videoDeadline = Date.now() + 10 60 * 1000;
//         while (Date.now() < videoDeadline) {
//           if (await isLessonCompleted()) {
//             console.log(  [${lessonLabel}] ✅ Video lesson Completed);
//             return true;
//           }
//           // Check for YouTube Pause button (means video is playing)
//           for (const frame of page.frames()) {
//             const pauseVisible = await frame.locator(
//               'button[aria-label="Pause"], .ytp-play-button[title="Pause"]'
//             ).first().isVisible({ timeout: 300 }).catch(() => false);
//             if (pauseVisible) break; // still playing
//           }
//           await page.waitForTimeout(3000);
//         }
//         return true; // timed out but played
//       }
//     } catch (_) {}
//   }