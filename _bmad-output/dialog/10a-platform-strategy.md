# Step 10a: Platform Strategy

## Opening Discussion

Saga presented platform options:

- Mobile App / Expo / React Native
- H5 / responsive web
- Mini program
- React Native app with independent backend

Saga noted that the existing demo uses Expo / React Native and that the product naturally fits mobile usage because users need camera, album upload, image import, generation result browsing, and credit purchase.

## User Decision

Sue chose option 1: continue with React Native App first.

## Confirmed Platform Strategy

### Primary Platform

React Native mobile app first.

### Device Priority

Mobile-first. Desktop is not a full experience target for MVP.

### Target Systems

iOS and Android are both future targets. MVP distribution can use Expo, Android package, TestFlight, or similar seed-user distribution methods.

### Core Interaction Models

- Touch-first mobile interaction
- Camera/photo upload
- External reference image import
- Generation result browsing
- Save/share results
- Credit purchase and balance visibility

### Backend Strategy

An independent backend is required for:

- Login/account management
- Generation credits
- Orders/payment
- Image storage and delivery
- image2 API encapsulation
- Generation history
- Domestic access stability

### Offline Strategy

No offline generation. Cached result viewing may be considered later, but all generation requires network access.

### H5 Strategy

H5 can later serve as landing, invitation, download, or marketing page. It should not carry the core generation experience in MVP.

## Rationale

The product's core actions are naturally mobile: taking/uploading photos, importing images, viewing visual results, and making quick style decisions. React Native lets the existing demo direction continue while preserving a path to iOS/Android. The independent backend is necessary because image2 access, credits, payment, storage, and domestic availability cannot be exposed directly to users.

## Reflection Checkpoint

Saga summarized the strategy and Sue confirmed: OK.
