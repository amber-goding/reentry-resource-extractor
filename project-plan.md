# Reentry Resource Extractor Project Plan

This file is the source of truth for future implementation decisions unless the project scope is explicitly revised later.

## Problem

Reentry program listings are hard to create when important details are scattered across public websites and are not already organized into a clear structure.

## Primary User

The primary user is a transitional housing, halfway house, or reentry program manager who wants to turn existing public website information into a structured program listing.

## MVP User Flow

1. The manager enters the URL of their public website.
2. The application retrieves accessible website content.
3. AI analyzes that content and extracts specific reentry-program information.
4. Any missing information is marked as `Not Found`.
5. The manager reviews and edits the extracted information.
6. The listing is considered complete only after manager review.

## Information To Eventually Extract

- Program name
- Program description
- Location or service area
- Contact information
- Website URL
- Eligibility requirements
- Populations served
- Housing or service type
- Program rules or expectations
- Application or referral process
- Fees or costs
- Availability or capacity details
- Required documents
- Important deadlines or next steps

## Role Of AI

AI helps read accessible website content and organize found information into structured fields for manager review.

## What AI Is Not Allowed To Do

AI must not guess, infer, invent, or fill in missing information. If a detail is not found in the retrieved content, it must be marked as `Not Found`.

## Primary Failure Mode

The main risk is incorrect or invented program information being treated as accurate.

## Human Review

Human review reduces that risk by requiring a program manager to confirm, correct, or complete the extracted information before it is considered final.

## Out Of Scope For Version One

- Building the full interface
- Creating a scraper
- Creating a backend
- Adding a database
- Adding authentication
- Adding AI integration
- Publishing listings automatically
- Guessing missing program details
- Supporting private, non-public, or inaccessible website content
