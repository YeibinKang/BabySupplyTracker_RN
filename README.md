# BabySupplyTracker_RN
> A React Native version of the Baby Supply Tracker app for parents/caregivers.


## Project Introduction
As a parent who knows firsthand the chaos of keeping track of baby supplies, I'm on a mission to create a game-changing mobile app that makes parents' lives a little easier.🚀

## Target User
A new parent, a seasoned pro, or somewhere in between!

## Result of user survey
Between March 24 and April 2, 2025, I conducted a survey involving 44 caregivers in Canada and South Korea to better understand their needs and behaviors.

Key findings include:
- 52% of caregivers shop for baby supplies at least once a week.
- 75% either don’t track supplies or rely on memory.
- **Importantly, 75% of respondents said they would likely use the app once it becomes available.**

You can find more detailed information and product overview pdf file in the link below.
[Slide Deck (PDF)](./BabySupplyTracker-ProductOverview.pdf)


## Main features
* Basic inventory management (View, Add, Update, Delete items)
* Colored-coded cards for quick status check (accessible for colorblind user)
* Filter by category and inventory status
* Guest mode: No login required, local-only inventory
* Logged-in mode: Requires login, enables inventory sharing between users
* Connection with Google Shopping Link for low stock items

## Product Design Insights
- **Minimal Input Flow**: Reduced required fields to accommodate busy parents.
- **Guest Mode**: Survey data showed many parents don’t need sharing — login is optional.
- **Optional Details**: Users can choose to input more details via toggles.
- **Accessibility**: Colorblind-friendly status indicators for low stock and expiry.
- **Clear Filters**: Easy-to-use filtering with visual feedback and reset option.


## Tech Stack

|  | Skills |
|----------|---------------------------|
| Frontend  | React Native, TypeScript |
| Backend  | Firebase                  |
| State    | Context API               |
| Other    | Expo, Firebase Auth (optional) |

## Screenshots

| Inventory List - Login Mode | Add Item | Filtering | Item detail | Inventory List - Guest Mode |
|-----------------------|-----------------------|-----------------------|-----------------------|-----------------------|
| <img src="https://github.com/user-attachments/assets/90e7d2ab-95a9-4017-b17a-1a2833b7382d" width="250"> |<img src="https://github.com/user-attachments/assets/a42ca5ed-f13d-4ba8-b30c-16f4e0260e3c" width="275"> |<img src="https://github.com/user-attachments/assets/0e1e4c5e-cb59-40dc-8f5c-4081a043ea69" width="250"> | <img src="https://github.com/user-attachments/assets/9df118db-bc4a-4369-821a-b3806995535c" width="275"> | <img src="https://github.com/user-attachments/assets/27afb98c-76e6-4003-ac82-1f5e8697151d" width="250">|

## [1.1.0] - 2025-08-07
### Added
- Added ShoppingListContext
- Defined ShoppingListItem data type
- Started to develop Shopping list functionality



## 🚀 Getting Started
1. Clone repository
```bash
git clone git@github.com:YeibinKang/BabySupplyTracker_RN.git
```
2. Install dependencies:
``` bash
npm install
```
3. Run the app:
``` bash
npm start
```
