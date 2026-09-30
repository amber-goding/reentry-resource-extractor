// Each extraction field uses the same shape so it can be displayed,
// reviewed, and later filled by AI-generated extraction results.
const createExtractionField = (label) => ({
  label,
  value: '',
  found: false,
  sourceEvidence: '',
})

// These are the program details the app will eventually try to extract
// from accessible public website content.
export const extractionFields = {
  programName: createExtractionField('Program name'),
  website: createExtractionField('Website'),
  address: createExtractionField('Address'),
  phone: createExtractionField('Phone'),
  email: createExtractionField('Email'),
  populationServed: createExtractionField('Population served'),
  genderEligibility: createExtractionField('Gender eligibility'),
  ageRequirements: createExtractionField('Age requirements'),
  housingType: createExtractionField('Housing type'),
  cost: createExtractionField('Cost'),
  lengthOfStay: createExtractionField('Length of stay'),
  employmentRequirement: createExtractionField('Employment requirement'),
  substanceUsePolicy: createExtractionField('Substance-use policy'),
  matPolicy: createExtractionField('MAT policy'),
  probationParoleEligibility: createExtractionField('Probation/parole eligibility'),
  transportation: createExtractionField('Transportation'),
  employmentAssistance: createExtractionField('Employment assistance'),
  counseling: createExtractionField('Counseling'),
  educationSupport: createExtractionField('Education support'),
  applicationProcess: createExtractionField('Application process'),
  waitlistAvailability: createExtractionField('Waitlist or availability'),
}
