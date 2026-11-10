# Redesign notes

Visual decisions for the Move a Shift mock. The step flow and the locked rules are unchanged.

- The page title is 22px QUT blue (#00407A). The old title was 16px, the same size as the user name.
- Primary buttons and links use #00407A, with hover #0F3D6B. That blue is reserved for actions, the current step, and links.
- Type is Helvetica Neue, then Helvetica, Arial, and Segoe UI. Nothing is smaller than 11.5px. Weights are 400, 600, or 700.
- The step strip is a row of number, label, and divider. The hanging tab is gone.
- Campus and the week or list view are segmented controls. Coverage filters are quiet chips. The long pill row is gone.
- A full hour is a solid #F6F8FA cell, a #8A8D8F border, and the word Full. It is a button with aria-disabled, so a keyboard and a screen reader can reach it. It does not fade, and it has no extra colour.
- Clash is a dashed cell that says Clash and the other campus, such as On KG. It is a per-person block and cannot be selected.
- Borders use #8A8D8F and empty capacity dots use #64748B. The lighter greys in the brief were under 3:1.
- Warning text is #92400E on #FFFBEB. Warning borders are #D15A06. #D97706 is 2.64:1 on a needs cell and 2.99:1 on the page grey, so it cannot be the border.
- On a narrow island the confirm tray collapses to one line. Opening it sets scroll padding, so a focused hour stays above the bar.
- The layout follows the island width. The sidebar stacks under 1020px. Under 720px the list replaces the grid unless the person chose Week grid.
- Loading, a failed load, and an expired session are panels in the page, with a status or alert role.
- Settings stay as GP and KG tiles, with real checkbox switches.
- The success note is a white card with a green left bar.
- The week label uses Sunday 30 Aug 2026. The old label said 31 Aug, which is the Monday.

## Checks

- Keyboard, PLF grid. The Full cell and both Clash cells are buttons, aria-disabled, and in the tab order. Enter on Full left the join count at 0.
- Keyboard, 390px. The summary bar is 48px tall and starts 771px down the viewport. Focusing all 30 hour buttons left none covered by the bar.
- Staff over-cap. An empty reason moves focus to the textarea and shows an alert. A reason opens the confirm panel in the sidebar, quotes the reason, and says the hour will hold 14 of 3. There is no modal.
- axe-core 4.10.3 reported no violations on step 1, step 2, settings, and the over-cap confirm panel at 1440px, and none on step 2 at 390px with the menu open. An earlier pass flagged the top bar because it was not a landmark. It is a header now.

## Conflicts

- No campus filter was not added. That question is still open, and this sample week has no No campus hours. The control stays GP and KG.
- The mock does not draw an antiforgery token. That belongs on the Razor page.
- useCanvasState and the .mvs prefix stay. This file is the prototype, not the island.
- The preview role switcher, the page-state select, and the 220px side menu stay, so the mock can show PLF, staff, and the live offset.
- Cell height stays 72px. A shorter cell clips Full, the count, and the over line.
- The active side-nav marker is #00407A. Cyan #2ABEEE on the white active row is 2.17:1. Cyan stays as the hover bar on the dark nav, where it is 5.48:1.
- Loading, error, and session expired have no before screenshots. The previous mock did not have those states.
- The week control updates the label and clears picks. The mock still has one week of timetable data.

Preview from the repo root with `python3 -m http.server`, then open index.html. The page loads React and Babel from unpkg, so it needs a network.
