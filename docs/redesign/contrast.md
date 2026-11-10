# Contrast

Ratios use the WCAG 2.2 relative luminance formula, rounded to two decimal places. Text needs 4.5:1. Borders, dots, and other UI marks need 3:1. The title is 22px and bold, which is large text, and it still clears 4.5:1.

## Pairs in the mock

| Foreground | Background | Where | Ratio | Target | Result |
| --- | --- | --- | --- | --- | --- |
| #00407A | #F6F8FA | Page title | 9.79 | 4.5 text | Pass |
| #00407A | #FFFFFF | Links, selected segment, filled dot | 10.43 | 4.5 text | Pass |
| #FFFFFF | #00407A | Primary button, current step | 10.43 | 4.5 text | Pass |
| #FFFFFF | #0F3D6B | Primary button hover | 11.05 | 4.5 text | Pass |
| #1B2430 | #FFFFFF | Body text | 15.65 | 4.5 text | Pass |
| #1B2430 | #F6F8FA | Text on the page and on Full | 14.70 | 4.5 text | Pass |
| #1B2430 | #EAF6ED | Text on a joined hour and the saved note | 14.09 | 4.5 text | Pass |
| #5A6572 | #FFFFFF | Secondary text | 5.93 | 4.5 text | Pass |
| #5A6572 | #F6F8FA | Full label for a PLF | 5.57 | 4.5 text | Pass |
| #5A6572 | #DCECFA | Counts on a needs hour | 4.92 | 4.5 text | Pass |
| #384250 | #F6F8FA | Full label and counts for staff | 9.56 | 4.5 text | Pass |
| #114A81 | #FFFFFF | Inline links | 9.05 | 4.5 text | Pass |
| #114A81 | #F0F6FC | Needs people chip | 8.31 | 4.5 text | Pass |
| #FFFFFF | #114A81 | Header | 9.05 | 4.5 text | Pass |
| #FFFFFF | #14528C | Text on a leaving hour | 8.03 | 4.5 text | Pass |
| #FFFFFF | #006747 | Join badge and completed step | 6.93 | 4.5 text | Pass |
| #006747 | #FFFFFF | Completed step label | 6.93 | 4.5 text | Pass |
| #92400E | #FFFBEB | Warning text | 6.84 | 4.5 text | Pass |
| #7F1D1D | #FFFFFF | Error text | 10.02 | 4.5 text | Pass |
| #A7B1C2 | #2E3846 | Side navigation | 5.49 | 4.5 text | Pass |
| #FFFFFF | #2E3846 | Side navigation hover | 11.86 | 4.5 text | Pass |
| #8A8D8F | #FFFFFF | Open borders and the header rule | 3.34 | 3 UI | Pass |
| #8A8D8F | #F6F8FA | Full cell border | 3.14 | 3 UI | Pass |
| #384250 | #FFFFFF | Your shift border | 10.18 | 3 UI | Pass |
| #14528C | #DCECFA | Needs hour border | 6.66 | 3 UI | Pass |
| #14528C | #FFFFFF | Leaving hour against the grid | 8.03 | 3 UI | Pass |
| #006747 | #FFFFFF | Joined hour border | 6.93 | 3 UI | Pass |
| #D15A06 | #FFFBEB | Warning border on its fill | 3.91 | 3 UI | Pass |
| #D15A06 | #F6F8FA | Week badge against the page | 3.81 | 3 UI | Pass |
| #D15A06 | #DCECFA | Warning badge on a needs hour | 3.37 | 3 UI | Pass |
| #D15A06 | #EAF6ED | Warning badge on a joined hour | 3.65 | 3 UI | Pass |
| #64748B | #FFFFFF | Empty capacity dot | 4.76 | 3 UI | Pass |
| #64748B | #DCECFA | Empty capacity dot on a needs hour | 3.95 | 3 UI | Pass |
| #00407A | #DCECFA | Filled capacity dot on a needs hour | 8.65 | 3 UI | Pass |
| #2ABEEE | #2E3846 | Navigation hover bar | 5.48 | 3 UI | Pass |
| #00407A | #FFFFFF | Active navigation bar and focus ring | 10.43 | 3 UI | Pass |
| #92400E | #F6F8FA | Focus ring on a primary button | 6.66 | 3 UI | Pass |

## Pairs that were not used

| Foreground | Background | Why it was dropped | Ratio | Target | Result |
| --- | --- | --- | --- | --- | --- |
| #D97706 | #DCECFA | Specified amber on a needs hour | 2.64 | 3 UI | Fail |
| #D97706 | #F6F8FA | Specified amber on the page | 2.99 | 3 UI | Fail |
| #D97706 | #FFFFFF | Specified amber as text | 3.19 | 4.5 text | Fail |
| #CBD5E1 | #FFFFFF | Suggested open border | 1.48 | 3 UI | Fail |
| #CFD7E0 | #F6F8FA | Suggested Full border | 1.37 | 3 UI | Fail |
| #D8E0E8 | #FFFFFF | Suggested divider | 1.33 | 3 UI | Fail |
| #8A8D8F | #DCECFA | Grey border on a needs hour | 2.77 | 3 UI | Fail |
| #2ABEEE | #FFFFFF | Cyan on the white active row | 2.17 | 3 UI | Fail |
| #F59E0B | #FFFFFF | Earlier amber as text | 2.15 | 4.5 text | Fail |

#D97706 on white does clear 3:1 for a non-text mark (3.19). It does not clear 3:1 on the needs fill or the page grey, which is where the badges sit, so the border is #D15A06. Needs hours use the #14528C border instead of the grey line.
