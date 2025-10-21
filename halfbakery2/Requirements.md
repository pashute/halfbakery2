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

### FR 5.0 - Page Layouts (The "Views" Feature)
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 5.0.1 | The site must offer a feature called **Page Layouts** (formerly Views) allowing users to customize how Idea listings are displayed. | |
| FR 5.0.2 | Users must create a Layout using a form specifying criteria such as: **Name** (e.g., "Recent 3," "My Best"), **Sort Order** (Date, Vote, Author, Annotation Count, etc.), **Filtering** (alphabetic search, word inclusion), and **Display Limits/Grouping**. | |
| FR 5.0.3 | A list of user-created and default Page Layouts must be easily accessible via links on the side of the main page (HB1 style) and from the **Main Menu** (HB2 style). | |

### FR 6.0 - AI Search Functionality
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 6.0.1 | The site must include a natural language AI chat interface for **Smart Search**. | |
| FR 6.0.2 | The AI must first engage in a short back-and-forth discussion to verify and confirm the user's search intent. | |
| FR 6.0.3 | The final search results must be presented in a temporary (nameless) **Page Layout** customized by the AI based on the query. | |

### FR 7.0 - Administration Tasks
| ID | Requirement | Notes |
| :--- | :--- | :--- |
| FR 7.0.1 | Admins must be able to **Archive** an Idea (Idea can be viewed only by Admin). | |
| FR 7.0.2 | Admins must be able to **Delete** an Idea (no backup). | |
| FR 7.0.3 | Admins must be able to **Remove and Block Users**. | |

---

## 2. User Interface (UI) and Technical Requirements (TECH)

| ID | Requirement | Notes |
| :--- | :--- | :--- |
| UI 8.1 | **Design:** The site must maintain a simple, minimalist aesthetic: **Off-white background, large fonts, and clear textboxes with clear headers.** | No fancy elements; simple and direct like the original site. |
| UI 8.2 | **Header Links:** The main header must prominently display links matching the HB1 style: `idea: add, search, overview, recent, by name, random` and `meta: news, help, about, links, report a problem`. | |
| UI 8.3 | **Technology:** The application should be built using **Vue.js** and standard frameworks. | |

---

## 3. Help Documents and Tutorials (HD)

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
| GL 9.1.7 | **MFD** | **Marked For Deletion.** A status for Ideas (usually non-inventions) that an Admin has flagged for removal. |
