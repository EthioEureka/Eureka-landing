# Requirements Document

## Introduction

This feature adds two capabilities to the Ethio-Eureka Next.js admin CMS dashboard: (1) a visibility (Eye/EyeOff) toggle on the Projects, Testimonials, and Services admin list pages, mirroring the pattern already in use on the Partners page; and (2) a search, filter, and sort toolbar above the table or grid on all four admin list pages (Projects, Testimonials, Services, Partners). All filtering and sorting is client-side against the already-loaded state array.

## Glossary

- **Admin_Dashboard**: The Next.js `"use client"` admin section at `/admin/*`.
- **Projects_Page**: The admin list page at `/admin/projects/page.tsx`.
- **Testimonials_Page**: The admin list page at `/admin/testimonials/page.tsx`.
- **Services_Page**: The admin list page at `/admin/services/page.tsx`.
- **Partners_Page**: The admin list page at `/admin/partners/page.tsx`.
- **Eye_Toggle**: A clickable `Eye` or `EyeOff` icon button (from `lucide-react`) that updates the `published` field of a record.
- **Visibility_Toolbar**: A row of controls — a text search input, a filter dropdown, and a sort dropdown — rendered above the main table or grid on each admin list page.
- **Optimistic_Update**: Immediately reflecting the new UI state in local React state before the API response returns, and reverting to the previous state if the API call fails.
- **Published_Record**: A record whose `published` field is `true`.
- **Hidden_Record**: A record whose `published` field is `false`.

---

## Requirements

### Requirement 1: Eye Toggle for Projects

**User Story:** As an admin, I want to toggle the visibility of individual projects from the list page, so that I can hide or show projects on the public site without deleting them.

#### Acceptance Criteria

1. WHEN the Projects_Page renders, THE Projects_Page SHALL display an Eye_Toggle button in the actions column for each project row, alongside the existing Edit, View Live, and Delete buttons.
2. WHEN the Eye_Toggle for a Published_Record is clicked, THE Projects_Page SHALL optimistically set `published` to `false` in local state, visually dim the row, and send `PUT /api/admin/projects/[id]` with body `{ published: false }`.
3. WHEN the Eye_Toggle for a Hidden_Record is clicked, THE Projects_Page SHALL optimistically set `published` to `true` in local state, restore the row to full opacity, and send `PUT /api/admin/projects/[id]` with body `{ published: true }`.
4. IF the `PUT /api/admin/projects/[id]` request fails, THEN THE Projects_Page SHALL revert the `published` field in local state to its value before the toggle was clicked.
5. WHEN a project is a Published_Record, THE Projects_Page SHALL render the Eye icon; WHEN a project is a Hidden_Record, THE Projects_Page SHALL render the EyeOff icon.
6. THE Projects_Page SHALL replace the hardcoded "PUBLISHED" status badge with the Eye_Toggle button in the Status column.
7. WHEN a project has `published: false`, THE fetchProjects function SHALL exclude it from results returned to the public landing page and `/work` page, because the existing `fetchProjects` query already filters `.eq("published", true)`.

### Requirement 2: Eye Toggle for Testimonials

**User Story:** As an admin, I want to toggle the visibility of individual testimonials from the list page, so that I can hide client quotes without permanently removing them.

#### Acceptance Criteria

1. WHEN the Testimonials_Page renders, THE Testimonials_Page SHALL display an Eye_Toggle button in the actions area of each testimonial card, alongside the existing Edit and Delete buttons.
2. WHEN the Eye_Toggle for a Published_Record is clicked, THE Testimonials_Page SHALL optimistically set `published` to `false` in local state, apply a visual dim to the card, and send `PUT /api/admin/testimonials/[id]` with body `{ published: false }`.
3. WHEN the Eye_Toggle for a Hidden_Record is clicked, THE Testimonials_Page SHALL optimistically set `published` to `true` in local state, restore the card to full opacity, and send `PUT /api/admin/testimonials/[id]` with body `{ published: true }`.
4. IF the `PUT /api/admin/testimonials/[id]` request fails, THEN THE Testimonials_Page SHALL revert the `published` field in local state to its prior value.
5. WHEN a testimonial is a Published_Record, THE Testimonials_Page SHALL render the Eye icon; WHEN a testimonial is a Hidden_Record, THE Testimonials_Page SHALL render the EyeOff icon.

### Requirement 3: Eye Toggle for Services

**User Story:** As an admin, I want to toggle the visibility of individual services from the list page, so that I can hide services from the public site without deleting them.

#### Acceptance Criteria

1. WHEN the Services_Page renders, THE Services_Page SHALL display an Eye_Toggle button in the actions column for each service row, alongside the existing Edit and Delete buttons.
2. WHEN the Eye_Toggle for a Published_Record is clicked, THE Services_Page SHALL optimistically set `published` to `false` in local state, visually dim the row, and send `PUT /api/admin/services/[id]` with body `{ published: false }`.
3. WHEN the Eye_Toggle for a Hidden_Record is clicked, THE Services_Page SHALL optimistically set `published` to `true` in local state, restore the row to full opacity, and send `PUT /api/admin/services/[id]` with body `{ published: true }`.
4. IF the `PUT /api/admin/services/[id]` request fails, THEN THE Services_Page SHALL revert the `published` field in local state to its prior value.
5. WHEN a service is a Published_Record, THE Services_Page SHALL render the Eye icon; WHEN a service is a Hidden_Record, THE Services_Page SHALL render the EyeOff icon.

### Requirement 4: Visibility Toolbar — Projects Page

**User Story:** As an admin, I want to search, filter, and sort the projects list, so that I can quickly find and manage specific projects.

#### Acceptance Criteria

1. THE Projects_Page SHALL render a Visibility_Toolbar above the projects table containing: a text search input, a filter dropdown, and a sort dropdown.
2. WHEN text is entered in the search input, THE Projects_Page SHALL filter the displayed rows to those where `title` or `category` contains the search text (case-insensitive, instant, client-side).
3. WHEN the filter dropdown is set to "Featured", THE Projects_Page SHALL display only rows where `featured` is `true`.
4. WHEN the filter dropdown is set to "Standard", THE Projects_Page SHALL display only rows where `featured` is `false`.
5. WHEN the filter dropdown is set to "Visible", THE Projects_Page SHALL display only Published_Records.
6. WHEN the filter dropdown is set to "Hidden", THE Projects_Page SHALL display only Hidden_Records.
7. WHEN the filter dropdown is set to "All", THE Projects_Page SHALL display all rows regardless of `featured` or `published` status.
8. WHEN the sort dropdown is set to "Newest First", THE Projects_Page SHALL sort displayed rows by `year` descending.
9. WHEN the sort dropdown is set to "Oldest First", THE Projects_Page SHALL sort displayed rows by `year` ascending.
10. WHEN the sort dropdown is set to "A–Z", THE Projects_Page SHALL sort displayed rows by `title` alphabetically ascending.
11. WHEN the sort dropdown is set to "Z–A", THE Projects_Page SHALL sort displayed rows by `title` alphabetically descending.
12. WHEN the sort dropdown is set to "Sort Order", THE Projects_Page SHALL sort displayed rows by `sort_order` ascending.
13. WHILE search, filter, and sort controls are active simultaneously, THE Projects_Page SHALL apply all three in the order: filter first, then search, then sort.

### Requirement 5: Visibility Toolbar — Testimonials Page

**User Story:** As an admin, I want to search, filter, and sort the testimonials list, so that I can quickly find and manage specific testimonials.

#### Acceptance Criteria

1. THE Testimonials_Page SHALL render a Visibility_Toolbar above the testimonials grid containing: a text search input, a filter dropdown, and a sort dropdown.
2. WHEN text is entered in the search input, THE Testimonials_Page SHALL filter displayed cards to those where `client_name` or `company` contains the search text (case-insensitive, instant, client-side).
3. WHEN the filter dropdown is set to "Featured", THE Testimonials_Page SHALL display only cards where `featured` is `true`.
4. WHEN the filter dropdown is set to "Visible", THE Testimonials_Page SHALL display only Published_Records.
5. WHEN the filter dropdown is set to "Hidden", THE Testimonials_Page SHALL display only Hidden_Records.
6. WHEN the filter dropdown is set to "All", THE Testimonials_Page SHALL display all cards regardless of status.
7. WHEN the sort dropdown is set to "A–Z", THE Testimonials_Page SHALL sort displayed cards by `client_name` alphabetically ascending.
8. WHEN the sort dropdown is set to "Z–A", THE Testimonials_Page SHALL sort displayed cards by `client_name` alphabetically descending.
9. WHEN the sort dropdown is set to "Featured First", THE Testimonials_Page SHALL display featured testimonials before non-featured ones.
10. WHEN the sort dropdown is set to "Sort Order", THE Testimonials_Page SHALL sort displayed cards by `sort_order` ascending.

### Requirement 6: Visibility Toolbar — Services Page

**User Story:** As an admin, I want to search, filter, and sort the services list, so that I can quickly find and manage specific services.

#### Acceptance Criteria

1. THE Services_Page SHALL render a Visibility_Toolbar above the services table containing: a text search input, a filter dropdown, and a sort dropdown.
2. WHEN text is entered in the search input, THE Services_Page SHALL filter displayed rows to those where `title` contains the search text (case-insensitive, instant, client-side).
3. WHEN the filter dropdown is set to "In Marquee", THE Services_Page SHALL display only rows where `show_in_marquee` is `true`.
4. WHEN the filter dropdown is set to "Hidden from Marquee", THE Services_Page SHALL display only rows where `show_in_marquee` is `false`.
5. WHEN the filter dropdown is set to "Visible", THE Services_Page SHALL display only Published_Records.
6. WHEN the filter dropdown is set to "Hidden", THE Services_Page SHALL display only Hidden_Records.
7. WHEN the filter dropdown is set to "All", THE Services_Page SHALL display all rows regardless of marquee or published status.
8. WHEN the sort dropdown is set to "Sort Order", THE Services_Page SHALL sort displayed rows by `sort_order` ascending.
9. WHEN the sort dropdown is set to "A–Z", THE Services_Page SHALL sort displayed rows by `title` alphabetically ascending.
10. WHEN the sort dropdown is set to "Z–A", THE Services_Page SHALL sort displayed rows by `title` alphabetically descending.

### Requirement 7: Visibility Toolbar — Partners Page

**User Story:** As an admin, I want to search, filter, and sort the partners list, so that I can quickly find and manage specific partners.

#### Acceptance Criteria

1. THE Partners_Page SHALL render a Visibility_Toolbar above the partners list containing: a text search input, a filter dropdown, and a sort dropdown.
2. WHEN text is entered in the search input, THE Partners_Page SHALL filter displayed partners to those where `name` contains the search text (case-insensitive, instant, client-side).
3. WHEN the filter dropdown is set to "Visible", THE Partners_Page SHALL display only Published_Records.
4. WHEN the filter dropdown is set to "Hidden", THE Partners_Page SHALL display only Hidden_Records.
5. WHEN the filter dropdown is set to "All", THE Partners_Page SHALL display all partners regardless of published status.
6. WHEN the sort dropdown is set to "Sort Order", THE Partners_Page SHALL sort displayed partners by `sort_order` ascending.
7. WHEN the sort dropdown is set to "A–Z", THE Partners_Page SHALL sort displayed partners by `name` alphabetically ascending.
8. WHEN the sort dropdown is set to "Z–A", THE Partners_Page SHALL sort displayed partners by `name` alphabetically descending.

### Requirement 8: Toolbar UI Consistency

**User Story:** As an admin, I want a visually consistent toolbar across all four list pages, so that the interface feels cohesive.

#### Acceptance Criteria

1. THE Visibility_Toolbar on every admin list page SHALL use the same Tailwind CSS classes and component structure for the search input, filter dropdown, and sort dropdown.
2. THE Visibility_Toolbar search input SHALL display a `Search` icon (from `lucide-react`) as a leading inline decoration.
3. THE Visibility_Toolbar filter and sort dropdowns SHALL display a `SlidersHorizontal` icon (from `lucide-react`) as a leading inline decoration on each dropdown.
4. WHILE the Visibility_Toolbar search input is empty and the filter is "All" and the sort is the default, THE Admin_Dashboard SHALL display the toolbar in its default resting state without any active-filter indicator.
5. THE Visibility_Toolbar SHALL be rendered between the page header section and the main content table or grid.
