# Requirements

# Halfbakery v2.0: Project Requirements

This document outlines the core functional and design requirements for rebuilding the Halfbakery website, using the specific terminology and features requested for Halfbakery 2.0.

---

## 1. Core Functional Requirements (FR)

### FR 1.0 - User Authentication & Administration
| ID | Requirement | HB Terminology | Notes |
| :--- | :--- | :--- | :--- |
| FR 1.0.1 | Users must be able to register, log in, and log out. | Account | Standard secure authentication is required. |
| FR 1.0.2 | Users must have a public profile displaying their submitted **Ideas**, recent **Annotations**, and **Baking Score**. | Account | |
| FR 1.0.3 | The system must provide a mechanism for an existing Admin to promote other users to Admin status. | Admin | |

### FR 2.0 - Idea Submission and Categorization
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 2.0.1 | Logged-in users must be able to submit a new **Idea**. | |
| FR 2.0.2 | The submission form must include fields for: **Idea's Name** (Title), **Category** (selection list), **Summary**, and **Description**. | |
| FR 2.0.3 | The Title and Description fields must display an example in the original simple style: "A better mousse trap" (Title) and "Put coffee beans in mousse" (Description). | Font must be like the original brown, small font. |
| FR 2.0.4 | **Categories** must be pre-decided by Admins, supporting up to three levels (e.g., Main:Sub1/Sub2). | |
| FR 2.0.5 | Ideas must be categorized. Uncategorized Ideas are moved into categories by Admins. | The defaults to use the Category:Other  option. |
| FR 2.0.6 | **Content Rule:** Ideas must primarily be inventions. Ideas determined by users as "non inventions" may be flagged as MFD (**M**arked **F**or **D**eletion). | |
| FR 2.0.7 | Users must be able to add **Links** to an Idea, each requiring a Title, URL, and optional extra text. The list of links is shown on the idea page | |

### FR 3.0 - The Rating System
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 3.0.1 | The rating system uses binary votes: **Upvote** (+1) or **Downvote** (-1). | Users can only vote once per Idea, but can change their vote in time |
| FR 3.0.2 | Upvotes must be represented as **Pastries** (croissant emoji). Downvotes must be represented as **Fishbones** (fishbone emoji). | |
| FR 3.0.3 | The Idea's rating is the cumulative **Net Score** (+1s minus -1s). | This score must be displayed visually using full and partial emojis (e.g., one full croissant for every 4 net positive votes). |

### FR 4.0 - Annotations (The Discussion System)
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 4.0.1 | The discussion posts below an Idea are called **Annotations**. | |
| FR 4.0.2 | Annotations must be displayed sequentially in a non-hierarchical (flat) format. | |
| FR 4.0.3 | Users must be able to vote on Annotations using a pair of dedicated emojis: **Agree** and **Disagree**. | The count for each vote must be displayed next to the respective emoji. |
| FR 4.0.4 | Users must be able to **Flag (report abuse)** any Annotation. | The Flag count must be visible (for Admin review). |
| FR 4.0.5 | Users can assign pre-approved **Keywords** to the Idea, and also propose new Keywords (which may be erased by Admins). | This must use a system separate from the main Tags (FR 2.0.3). |

### FR 5.0 - Homepage: "Recent 3" Layout
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 5.0.1 | The default homepage must display the **"Recent 3"** layout as the initial page. | This is the primary landing page for all users. |
| FR 5.0.2 | The Recent 3 layout must display **3 columns**, each representing a different **Category**. | Categories are the main top-level categories defined by Admins. |
| FR 5.0.3 | Each column must have a **Category header** that is a clickable link leading to the full category page. | The category page shows all subcategories and their Ideas. |
| FR 5.0.4 | Under each category header, display the **3 most recent Ideas** from that category. | Ideas are sorted by most recent submission or last annotation date. |
| FR 5.0.5 | **Read/Unread State:** Idea titles must be displayed in **bold** for unread Ideas. If a user has visited an Idea, it becomes **unbolded**. | This tracks user's reading history across the entire site. |
| FR 5.0.6 | **New Annotation Indicator:** If someone adds an **Annotation** to an Idea after the user last visited it, the Idea title must become **bold again** (marked as unread/updated). | This ensures users can see which Ideas have new activity. |
| FR 5.0.7 | Each Idea title in the Recent 3 display must be a clickable link that opens the full Idea page with all its details and Annotations. | |

### FR 6.0 - Category Navigation System
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 6.0.1 | Clicking a **Category header** from the Recent 3 page must lead to a **Category Overview Page** showing all subcategories within that category. | |
| FR 6.0.2 | The Category Overview Page must display **subcategory links** that lead to **Subcategory Pages**. | |
| FR 6.0.3 | Each **Subcategory Page** must display a **complete list of all Ideas** within that subcategory, sorted according to the current Page Layout settings. | |
| FR 6.0.4 | Ideas in subcategory lists must also follow the **read/unread bolding system** described in FR 5.0.5 and FR 5.0.6. | |

### FR 6.1 - Field Navigation Footer
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 6.1.1 | All pages must display a **permanent footer navigation** with clickable field links spanning the full width of the page. | Provides consistent site-wide navigation to main fields/categories. |
| FR 6.1.2 | Footer field links must be implemented as **router-link components** navigating to `/field/:slug` routes. | Technical requirement: no static span elements, proper Vue router integration. |
| FR 6.1.3 | Footer field links must maintain **hover effects** and **consistent styling** with the original site aesthetic. | Dark background with light text, subtle hover transitions. |
| FR 6.1.4 | The footer navigation must be **dynamically generated** from the database field/category structure, not hardcoded. | Same requirement as FR 5.0.3 - no static category lists in frontend code. |
| FR 6.1.5 | Footer navigation must be the **only field navigation element** - no duplicate navigation sections should exist on any page. | Ensures clean, consistent user experience without navigation confusion. |

### FR 7.0 - Page Layouts (The "Views" Feature)
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 7.0.1 | The site must offer a feature called **Page Layouts** (formerly Views) allowing users to customize how Idea listings are displayed. | |
| FR 7.0.2 | Users must create a Layout using a form specifying criteria such as: **Name** (e.g., "Recent 3," "My Best"), **Sort Order** (Date, Vote, Author, Annotation Count, etc.), **Filtering** (alphabetic search, word inclusion), and **Display Limits/Grouping**. | |
| FR 7.0.3 | A list of user-created and default Page Layouts must be easily accessible via links on the side of the main page (HB1 style) and from the **Main Menu** (HB2 style). | |

### FR 8.0 - AI Search Functionality
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 8.0.1 | The site must include a natural language AI chat interface for **Smart Search**. | |
| FR 8.0.2 | The AI must first engage in a short back-and-forth discussion to verify and confirm the user's search intent. | |
| FR 8.0.3 | The final search results must be presented in a temporary (nameless) **Page Layout** customized by the AI based on the query. | |

### FR 9.0 - Administration Tasks
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 9.0.1 | Admins must be able to **Archive** an Idea (Idea can be viewed only by Admin). | |
| FR 9.0.2 | Admins must be able to **Delete** an Idea (no backup). | |
| FR 9.0.3 | Admins must be able to **Remove and Block Users**. | |
| FR 9.0.4 | Admins must have access to a **"Views/Admin/Flagged"** page showing all Ideas flagged as MFD by users. | As defined in GL 9.1.7 |
| FR 9.0.5 | The Admin Flagged view must display each flagged Idea with its **vote rating** and **flag count**. | Enables admins to make informed moderation decisions. |
| FR 9.0.6 | From the Admin Flagged view, admins must be able to **confirm deletion**, **clear flags**, or **archive** Ideas. | Workflow for processing MFD flags. |

---

## 2. Data Architecture and Database Requirements (DB)

### DB 10.0 - Database Technology and Structure
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| DB 10.0.1 | The application must use **MongoDB** as the primary NoSQL database for all data storage. | MongoDB provides flexibility for the hierarchical category structure and varying content types. |
| DB 10.0.2 | All category data must be loaded from a **JSON configuration file** called `categories.json` and stored in MongoDB. | This allows easy administration of the category hierarchy without code changes. |
| DB 10.0.3 | The homepage footer category tags must be **dynamically generated** from the database category structure. | No hardcoded category lists in the frontend code. |

### DB 11.0 - Data Models and Collections

#### DB 11.1 - Fields Collection (Main Categories)
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.1.1 | **Fields** are the top-level categories displayed on the homepage (business, computer, fashion, etc.). | `{ _id, name, slug, description, order, isActive }` | These are the main category headers in the 3-column layout. |
| DB 11.1.2 | Fields must support **ordering** for consistent display sequence. | `order: Number` | Determines the sequence in the homepage grid. |
| DB 11.1.3 | Fields can be **activated/deactivated** by admins without deletion. | `isActive: Boolean` | Allows temporary hiding of categories. |

#### DB 11.2 - Categories Collection (Subcategories)
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.2.1 | **Categories** are subcategories within Fields, supporting up to 2 levels deep. | `{ _id, name, slug, fieldId, parentCategoryId, description, order, isActive }` | Optional `parentCategoryId` for sub-subcategories. |
| DB 11.2.2 | Categories must reference their parent **Field** via `fieldId`. | `fieldId: ObjectId` (references Fields collection) | Establishes the hierarchy: Field → Category → SubCategory. |
| DB 11.2.3 | Categories support **nested subcategories** via `parentCategoryId`. | `parentCategoryId: ObjectId` (optional, references Categories collection) | Enables Field:Category/SubCategory structure. |

#### DB 11.3 - Ideas Collection
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.3.1 | **Ideas** are the core content items submitted by users. | `{ _id, title, description, summary, authorId, categoryId, netScore, createdAt, updatedAt, lastAnnotationAt, status, links }` | Primary content entity. |
| DB 11.3.2 | Ideas must track **vote totals** as a single `netScore` field. | `netScore: Number` (sum of +1 and -1 votes) | Simplified scoring: Pastries minus Fishbones. |
| DB 11.3.3 | Ideas must track **timestamps** for creation, updates, and last annotation. | `createdAt, updatedAt, lastAnnotationAt: Date` | Used for sorting and "new activity" detection. |
| DB 11.3.4 | Ideas support **multiple links** as an embedded array. | `links: [{ title, url, description }]` | External references related to the idea. **Note: Links are NOT a separate collection.** |
| DB 11.3.5 | Ideas have **status** for admin moderation. | `status: String` (active, archived, deleted, mfd) | Supports admin workflow and MFD process. |
| DB 11.3.6 | Ideas must track **MFD flags** from users. | `mfdFlags: Number, mfdFlaggedBy: [userId]` | User-initiated flagging for MFD status. |

#### DB 11.4 - Annotations Collection
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.4.1 | **Annotations** are discussion posts attached to Ideas. | `{ _id, ideaId, authorId, content, agreeVotes, disagreeVotes, flags, createdAt, updatedAt }` | Flat discussion system (non-hierarchical). |
| DB 11.4.2 | Annotations track **Agree/Disagree votes** separately. | `agreeVotes: Number, disagreeVotes: Number` | Different voting system than Ideas. |
| DB 11.4.3 | Annotations support **flagging** for abuse reporting. | `flags: Number` | Admin moderation feature. |
| DB 11.4.4 | Each new Annotation must **update the parent Idea's `lastAnnotationAt`** timestamp. | Auto-trigger on annotation creation/update | Enables "new activity" detection for read/unread system. |

#### DB 11.5 - Users Collection
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.5.1 | **Users** store authentication and profile information. | `{ _id, username, email, passwordHash, role, bakingScore, createdAt, lastLoginAt, readIdeas }` | Standard user management. |
| DB 11.5.2 | Users must track **read Ideas** for the bold/unbold system. | `readIdeas: [{ ideaId, lastReadAt }]` | Enables read/unread state tracking. |
| DB 11.5.3 | Users have **roles** for permission management. | `role: String` (user, admin) | Basic role-based access control. |
| DB 11.5.4 | Users track **Baking Score** as a community metric. | `bakingScore: Number` | Calculated from user's contributions and votes received. |

### DB 12.0 - Data Relationships and Queries
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| DB 12.0.1 | **Homepage Recent 3**: Query must efficiently retrieve the 3 most recent Ideas per Field, sorted by `lastAnnotationAt` or `createdAt`. | Primary query for homepage display. |
| DB 12.0.2 | **Read/Unread Logic**: Compare Idea's `lastAnnotationAt` with User's `readIdeas.lastReadAt` to determine bold/unbold state. | Core functionality for activity tracking. |
| DB 12.0.3 | **Category Navigation**: Efficient queries to load Field → Categories → Ideas hierarchy for navigation pages. | Supports the category browsing system. |
| DB 12.0.4 | **Search and Filtering**: Support text search across Idea titles, descriptions, and category names. | Backend support for the live search feature. |

#### DB 11.6 - User Votes Collection
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.6.1 | **User Votes** track individual voting records to prevent duplicate votes. | `{ _id, userId, ideaId, voteType, createdAt, updatedAt }` | Ensures one vote per user per idea. |
| DB 11.6.2 | Vote changes must **update both the vote record and the Idea's netScore**. | `voteType: String` (upvote, downvote, removed) | Supports vote changes and removals. |

#### DB 11.7 - Annotation Votes Collection  
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.7.1 | **Annotation Votes** track Agree/Disagree votes on annotations. | `{ _id, userId, annotationId, voteType, createdAt }` | Separate voting system for annotations. |
| DB 11.7.2 | Annotation votes use **Agree/Disagree** instead of Upvote/Downvote. | `voteType: String` (agree, disagree) | Different terminology than idea votes. |

#### DB 11.8 - Page Formats Collection
| ID | Requirement | Schema | Notes |
| :--- | :--- | :--- | :--- |
| DB 11.8.1 | **Page Formats** store user-defined view configurations (formerly "Views"). | `{ _id, name, tableFormat, searchFields, descriptions, sortFields, groupFields, summaries, userId, isDefault, createdAt }` | **Note: Not implemented yet.** |
| DB 11.8.2 | Page Formats support **multiple display formats** and **custom sorting**. | `tableFormat: String, sortFields: Array, groupFields: Array` | **To be completed.** |
| DB 11.8.3 | **Default Page Formats** must include: Recent 3, Active Ideas, Simple-Search. | `isDefault: Boolean` | System-provided formats available to all users. |

### DB 13.0 - Missing Data Architecture Components
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| DB 13.0.1 | **Missing Categories and Fields Views**: Dedicated pages for browsing category hierarchies. | **To be completed.** |
| DB 13.0.2 | **Advanced Search Form**: Complex search interface for creating custom Page Formats. | **Details to be specified.** |
| DB 13.0.3 | **User Session Management**: JWT tokens, session persistence, and user preferences. | **To be completed.** |
| DB 13.0.4 | **Real-time Updates**: WebSocket or polling system for new annotation notifications. | **To be completed.** |

---

## 3. State Management and Frontend Architecture (ARCH)

### ARCH 14.0 - Vue.js State Management (Pinia)
| ID | Requirement | Notes |  
| :--- | :--- | :--- |
| ARCH 14.0.1 | The application must use **Pinia** for centralized state management across Vue components. | **To be completed.** |
| ARCH 14.0.2 | **User Store**: Manage authentication state, user profile, and read/unread tracking. | **To be completed.** |
| ARCH 14.0.3 | **Theme Store**: Persist theme selection across browser sessions. | **To be completed.** |
| ARCH 14.0.4 | **Search Store**: Manage search state and filter results. | **To be completed.** |

### ARCH 15.0 - API Integration Requirements  
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| ARCH 15.0.1 | **REST API Design**: Standardized endpoints for all CRUD operations. | **To be completed.** |
| ARCH 15.0.2 | **Authentication**: JWT-based authentication with refresh tokens. | **To be completed.** |
| ARCH 15.0.3 | **Caching Strategy**: Client-side caching for categories and frequently accessed data. | **To be completed.** |

### ARCH 16.0 - AI Search Integration
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| ARCH 16.0.1 | **AI Chat Interface**: Natural language processing for search intent understanding. | **To be completed.** |
| ARCH 16.0.2 | **Temporary Page Format Generation**: AI creates custom views based on search queries. | **To be completed.** |
| ARCH 16.0.3 | **AI Prompt Engineering**: Structured prompts for consistent search result formatting. | **To be completed.** |

---

## 4. User Interface (UI) and Technical Requirements (TECH)

| ID | Requirement | Notes |
| :--- | :--- | :--- |
| UI 8.1 | **Design:** The site must maintain a simple, minimalist aesthetic: **Off-white background, large fonts, and clear textboxes with clear headers.** | No fancy elements; simple and direct like the original site. |
| UI 8.2 | **Header Links:** The main header must prominently display links matching the HB1 style: `idea: add, search, overview, recent, by name, random` and `meta: news, help, about, links, report a problem`. | |
| UI 8.3 | **Technology:** The application should be built using **Vue.js** and standard frameworks. | |

---

## 5. Help Documents and Tutorials (HD)

The help section must define unique terms and explain core functionality.

### HD 9.1 - Halfbakery Jargon Glossary (Updated)
| ID | Term | Definition |
| :--- | :--- | :--- |
| GL 9.1.1 | **Half-Baked** | A clever concept that needs significant further refinement, feasibility testing, or major development before it can be considered a full product or concept. |
| GL 9.1.2 | **Idea** | The primary post (usually an invention) submitted by a user. |
| GL 9.1.3 | **Annotation** | A user-submitted comment or critique on an Idea. Annotations can be voted on (Agree/Disagree). |
| GL 9.1.4 | **Page Layouts** | User-defined, customized ways to display and sort Idea listings on the main page (formerly known as Views). |
| GL 9.1.5 | **Pastry / Fishbone** | The units of rating. Pastry = +1 (Upvote). Fishbone = -1 (Downvote). |
| GL 9.1.6 | **Net Score** | The cumulative rating of an Idea ($\text{Pastries} - \text{Fishbones}$). |
| GL 9.1.7 | **MFD** | **Marked For Deletion.** A status that the users mark by flagging. The website shows this publicly and the admins has a way of seening flagged ideas with their vote and flag rating. Views/Admin/Flagged |
