# SMJ MUN Platform

A premium international Model United Nations platform built with Next.js, Sanity CMS, PostgreSQL, Prisma, HDFC SmartGateway, and Resend Email Automation.

---

## Overview

SMJ MUN is designed as a modern conference and educational platform that allows students, schools, delegates, executive board members, and institutional partners to interact through a unified system.

The platform combines:

* Conference Management
* Content Publishing
* Student Registration
* OTP Verification
* Payment Processing
* Email Automation
* Partnership Inquiries
* Contact Management
* Media & Gallery Management

---

# Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* App Router

---

## CMS

* Sanity CMS v3
* Embedded Studio
* GROQ Queries
* Portable Text

Studio Route:

```bash
/studio
```

---

## Database

* PostgreSQL (Neon)
* Prisma ORM 7.8
* PrismaPg Adapter

---

## Payments

* HDFC SmartGateway
* Juspay SDK

---

## Email

* Resend

---

# Project Architecture

```txt
Frontend
   │
   ▼
Sanity CMS
   │
   ▼
Registration System
   │
   ▼
OTP Verification
   │
   ▼
Payment Processing
   │
   ▼
Email Automation
   │
   ▼
PostgreSQL Database
```

---

# CMS Content Structure

## Conferences

Used for:

```txt
/conferences
/conferences/[slug]
```

Fields:

```txt
title
slug
status
venue
date
registrationFee
registrationOpen
registrationCloseDate
capacity
committees[]
agenda
gallery
seoTitle
seoDescription
featuredImage
overview
```

---

## Blog

Used for:

```txt
/blog
/blog/[slug]
```

Fields:

```txt
title
slug
excerpt
coverImage
author
publishedAt
body
tags
seoTitle
seoDescription
```

---

## Media

Used for:

```txt
/media
```

Fields:

```txt
title
image
externalUrl
description
```

---

## Gallery

Used for:

```txt
/gallery
```

Fields:

```txt
title
images[]
description
```

---

# Dynamic Routes

## Conferences

```txt
/conferences
/conferences/[slug]
```

---

## Registration

```txt
/register/[slug]
```

---

## Blog

```txt
/blog
/blog/[slug]
```

---

## Media

```txt
/media
```

---

## Gallery

```txt
/gallery
```

---

## Partnerships

```txt
/partnerships
```

---

# Database Models

## RegistrationStatus

```txt
PENDING_OTP
PENDING_PAYMENT
PAID
PAYMENT_FAILED
CANCELLED
REFUNDED
```

---

## InquiryStatus

```txt
NEW
CONTACTED
CLOSED
```

---

## Registration

Stores:

```txt
Student Information
Conference Snapshot
Payment References
Registration Status
```

Important fields:

```txt
email
firstName
lastName
phone
institution
conferenceId
conferenceTitle
conferenceDate
conferenceFee
committeePreference
status
hdfcOrderId
paymentId
paidAt
```

Unique:

```txt
(email + conferenceId)
```

---

## RegistrationDraft

Temporary storage before OTP verification.

Fields:

```txt
email
firstName
lastName
phone
institution
city
committeePreference
dietaryRequirements
conferenceId
```

Deleted after successful OTP verification.

---

## OtpVerification

Fields:

```txt
email
otpHash
expiresAt
verified
attempts
createdAt
```

Security:

```txt
OTP never stored in plaintext
Only SHA-256 hash stored
```

---

## PartnershipInquiry

Stores institutional partnership requests.

---

## ContactInquiry

Stores contact form requests.

---

## VolunteerApplication

Volunteer recruitment.

---

## ExecutiveBoardApplication

Executive Board recruitment.

---

# Registration Flow

```txt
Student Opens Conference
          │
          ▼
Register Now
          │
          ▼
/register/[slug]
          │
          ▼
Submit Form
          │
          ▼
Registration Draft
          │
          ▼
Generate OTP
          │
          ▼
Hash OTP
          │
          ▼
OtpVerification Record
          │
          ▼
Send OTP Email
          │
          ▼
Verify OTP
          │
          ▼
Create Registration
          │
          ▼
PENDING_PAYMENT
          │
          ▼
Payment Page
```

---

# OTP System

Implemented in Phase 5.

Security:

```txt
6-digit OTP
10 minute expiry
SHA-256 hash
3 attempt limit
```

OTP is:

* Never stored raw
* Never logged
* Never exposed through APIs

---

# Payment Architecture

Provider:

```txt
HDFC SmartGateway
(Juspay)
```

Flow:

```txt
OTP Verified
        │
        ▼
Registration Created
        │
        ▼
PENDING_PAYMENT
        │
        ▼
Create HDFC Order
        │
        ▼
Redirect To HDFC
        │
        ▼
User Pays
        │
        ▼
Return To Platform
        │
        ▼
Verify With HDFC
        │
        ▼
CHARGED
        │
        ▼
PAID
        │
        ▼
Send Confirmation Email
```

---

# Payment Security Rules

Frontend NEVER marks payments successful.

Only backend verification can update:

```txt
Registration.status = PAID
```

Verification checks:

```txt
Order ID
Amount
Registration
HDFC Status
```

Only:

```txt
CHARGED
```

can mark registration as:

```txt
PAID
```

---

# HDFC Service Layer

## lib/hdfc

```txt
client.ts
create-order.ts
check-order-status.ts
types.ts
strip-http.ts
```

---

## lib/payment

```txt
create-payment-session.ts
verify-payment.ts
generate-order-id.ts
errors.ts
log-payment-event.ts
```

---

# Email System

Provider:

```txt
Resend
```

---

## Email Types

### OTP Email

Triggered after OTP generation.

---

### Registration Confirmation

Triggered after:

```txt
Registration.status = PAID
```

---

### Partnership Confirmation

Triggered after inquiry submission.

---

### Contact Confirmation

Triggered after contact form submission.

---

# Email Architecture

```txt
lib/email/
│
├── client.ts
├── send-email.ts
├── send-otp-email.ts
├── send-registration-email.ts
├── send-partnership-email.ts
├── send-contact-email.ts
│
└── templates/
    ├── otp-template.ts
    ├── registration-template.ts
    ├── partnership-template.ts
    └── contact-template.ts
```

---

# Email Modes

## Test Mode

```env
EMAIL_MODE=test
EMAIL_FROM=onboarding@resend.dev
```

Used during development.

---

## Production Mode

```env
EMAIL_MODE=production
EMAIL_FROM=noreply@smjmun.com
```

Uses verified domain.

No code changes required.

---

# Environment Variables

## Sanity

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_TOKEN=
```

---

## Database

```env
DATABASE_URL=
```

---

## Email

```env
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_REPLY_TO=
EMAIL_MODE=
```

---

## HDFC

```env
HDFC_MERCHANT_ID=
HDFC_KEY_UUID=
HDFC_PAYMENT_PAGE_CLIENT_ID=
HDFC_PUBLIC_KEY_PATH=
HDFC_PRIVATE_KEY_PATH=
HDFC_BASE_URL=
APP_URL=
```

---

# Completed Phases

## Phase 1

Sanity CMS Setup

Status:

```txt
COMPLETED
```

---

## Phase 2

Dynamic CMS Integration

Status:

```txt
COMPLETED
```

---

## Phase 3

Prisma + PostgreSQL

Status:

```txt
COMPLETED
```

---

## Phase 4

Registration Foundation

Status:

```txt
COMPLETED
```

---

## Phase 5

OTP Verification

Status:

```txt
COMPLETED
```

---

## Phase 6B

HDFC Payment Architecture

Status:

```txt
COMPLETED
```

Waiting for:

```txt
HDFC Credentials
```

---

## Phase 7

Email Automation

Status:

```txt
COMPLETED
```

---

# Current Focus

UI Sprint

Priority Areas:

```txt
Landing Page
Conference Listing Page
Conference Detail Page
Blog Experience
Registration Experience
```

Goals:

```txt
Premium UI
Luxury Academic Design
Better Mobile Experience
Better Accessibility
Higher Registration Conversion
```

---

# Project Status

```txt
CMS                ✅ Complete
Database           ✅ Complete
Registration       ✅ Complete
OTP Verification   ✅ Complete
Payments           ✅ Complete (Awaiting Credentials)
Email Automation   ✅ Complete
UI Polish          🚧 In Progress
```

---
   

Stack:

Next.js + TypeScript + Sanity + Prisma + PostgreSQL + HDFC + Resend

Mission:

Empower future leaders through diplomacy, collaboration, and global dialogue.
