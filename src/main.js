import { extractionFields } from './extractionFields.js'

const app = document.querySelector('#app')

const REVIEW_STATUS = {
  unreviewed: 'Unreviewed',
  confirmed: 'Confirmed',
  edited: 'Edited',
}

// Development-only demo data. This is not retrieved from a real website.
// It exists only to test how the results area handles found and missing fields.
const developmentSampleResults = {
  ...extractionFields,
  programName: {
    ...extractionFields.programName,
    value: 'Demo Reentry Housing Program',
    found: true,
    sourceEvidence: 'Demo evidence: "Demo Reentry Housing Program provides transitional housing."',
  },
  website: {
    ...extractionFields.website,
    value: 'https://demo.example.org',
    found: true,
    sourceEvidence: 'Demo evidence: "Visit us online at https://demo.example.org."',
  },
  phone: {
    ...extractionFields.phone,
    value: '(555) 010-1234',
    found: true,
    sourceEvidence: 'Demo evidence: "Call (555) 010-1234 for intake questions."',
  },
  cost: {
    ...extractionFields.cost,
    value: '',
    found: false,
    sourceEvidence: '',
  },
  matPolicy: {
    ...extractionFields.matPolicy,
    value: 'MAT accepted with documentation',
    found: true,
    sourceEvidence: 'Demo evidence: "Participants using MAT should provide current documentation."',
  },
  waitlistAvailability: {
    ...extractionFields.waitlistAvailability,
    value: '',
    found: false,
    sourceEvidence: '',
  },
}

const getAiValue = (field) => field.aiValue ?? field.value ?? ''

const getAiDisplayValue = (field, hasBeenAnalyzed) => {
  if (!hasBeenAnalyzed) {
    return 'Not analyzed yet'
  }

  return field.found ? getAiValue(field) : 'Not Found'
}

const getReviewedValue = (field) => field.reviewedValue ?? (field.found ? getAiValue(field) : '')

const createReviewableResults = (results) => {
  const reviewableResults = {}

  Object.entries(results).forEach(([fieldKey, field]) => {
    const aiValue = field.value || ''

    reviewableResults[fieldKey] = {
      ...field,
      aiValue,
      reviewedValue: field.found ? aiValue : '',
      reviewStatus: REVIEW_STATUS.unreviewed,
    }
  })

  return reviewableResults
}

const createReviewStatusBadge = (field) => {
  const badge = document.createElement('span')
  badge.className = 'review-status'
  badge.textContent = field.reviewStatus || REVIEW_STATUS.unreviewed

  return badge
}

const updateReviewStatus = (field, badge, status) => {
  field.reviewStatus = status
  badge.textContent = status
}

const createReviewControls = (fieldKey, field, statusBadge) => {
  const reviewPanel = document.createElement('div')
  reviewPanel.className = 'review-panel'

  const label = document.createElement('label')
  label.setAttribute('for', `review-${fieldKey}`)
  label.textContent = 'Manager-reviewed value'

  const textarea = document.createElement('textarea')
  textarea.id = `review-${fieldKey}`
  textarea.name = `review-${fieldKey}`
  textarea.rows = 3
  textarea.value = getReviewedValue(field)
  textarea.placeholder = field.found
    ? 'Edit or clear the AI value after review.'
    : 'Enter a value if the program website supports it or leave blank.'

  textarea.addEventListener('input', () => {
    field.reviewedValue = textarea.value
    updateReviewStatus(field, statusBadge, REVIEW_STATUS.edited)
  })

  const actions = document.createElement('div')
  actions.className = 'review-actions'

  const confirmButton = document.createElement('button')
  confirmButton.type = 'button'
  confirmButton.className = 'secondary-button review-button'
  confirmButton.textContent = 'Mark confirmed'
  confirmButton.addEventListener('click', () => {
    const confirmedValue = field.found ? getAiValue(field) : ''
    field.reviewedValue = confirmedValue
    textarea.value = confirmedValue
    updateReviewStatus(field, statusBadge, REVIEW_STATUS.confirmed)
  })

  const clearButton = document.createElement('button')
  clearButton.type = 'button'
  clearButton.className = 'secondary-button review-button'
  clearButton.textContent = 'Clear reviewed value'
  clearButton.addEventListener('click', () => {
    field.reviewedValue = ''
    textarea.value = ''
    updateReviewStatus(field, statusBadge, REVIEW_STATUS.edited)
  })

  const note = document.createElement('p')
  note.className = 'review-note'
  note.textContent =
    'The AI result and source evidence remain unchanged. Use this field for the human-reviewed value.'

  actions.append(confirmButton, clearButton)
  reviewPanel.append(label, textarea, actions, note)

  return reviewPanel
}

const createResultRow = (fieldKey, field, hasBeenAnalyzed, isReviewable) => {
  const row = document.createElement('li')
  row.className = 'result-row'

  const fieldSummary = document.createElement('div')
  fieldSummary.className = 'field-summary'

  const labelGroup = document.createElement('div')
  labelGroup.className = 'result-label-group'

  const label = document.createElement('h3')
  label.textContent = field.label
  labelGroup.append(label)

  let statusBadge

  if (isReviewable) {
    statusBadge = createReviewStatusBadge(field)
    labelGroup.append(statusBadge)
  }

  const value = document.createElement('p')
  value.className = 'result-value'

  if (isReviewable) {
    const valueLabel = document.createElement('strong')
    valueLabel.textContent = 'AI result: '
    value.append(valueLabel, getAiDisplayValue(field, hasBeenAnalyzed))
  } else {
    value.textContent = getAiDisplayValue(field, hasBeenAnalyzed)
  }

  const evidence = document.createElement('p')
  evidence.className = 'result-evidence'

  if (field.sourceEvidence) {
    const evidenceLabel = document.createElement('strong')
    evidenceLabel.textContent = 'Source evidence: '
    evidence.append(evidenceLabel, field.sourceEvidence)
  } else {
    evidence.textContent = hasBeenAnalyzed
      ? 'No source evidence available.'
      : 'Source evidence will appear here after analysis.'
  }

  fieldSummary.append(labelGroup, value)
  row.append(fieldSummary, evidence)

  if (isReviewable) {
    row.append(createReviewControls(fieldKey, field, statusBadge))
  }

  return row
}

const renderResults = (results, options = {}) => {
  const { hasBeenAnalyzed = false, isReviewable = false } = options

  resultsList.replaceChildren()

  Object.entries(results).forEach(([fieldKey, field]) => {
    resultsList.append(createResultRow(fieldKey, field, hasBeenAnalyzed, isReviewable))
  })
}

const mergeExtractionResults = (analysisResults) => {
  const mergedResults = {}

  Object.entries(extractionFields).forEach(([fieldKey, field]) => {
    mergedResults[fieldKey] = {
      ...field,
      value: analysisResults[fieldKey]?.value || '',
      found: Boolean(analysisResults[fieldKey]?.found),
      sourceEvidence: analysisResults[fieldKey]?.sourceEvidence || '',
    }
  })

  return mergedResults
}

app.innerHTML = `
  <main class="app-shell">
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow">Program listing helper</p>
      <h1 id="page-title">Reentry Resource Extractor</h1>
      <p class="intro-copy">
        Enter a public program website to prepare for a structured review of reentry housing
        and support-service details. Future analysis will mark missing information as
        <strong>Not Found</strong> instead of guessing.
      </p>
    </section>

    <section class="workflow" aria-labelledby="website-form-title">
      <div class="form-panel">
        <h2 id="website-form-title">Analyze a public website</h2>
        <form id="website-form" class="website-form">
          <div class="field-group">
            <label for="program-url">Program website URL</label>
            <input
              id="program-url"
              name="program-url"
              type="url"
              placeholder="https://example.org"
              autocomplete="url"
              required
            />
          </div>
          <button type="submit">Analyze Program</button>
        </form>
        <p id="form-status" class="form-status" role="status" aria-live="polite">
          Enter a public website URL to retrieve readable text and extract supported program information.
        </p>
        <section class="retrieval-panel" aria-labelledby="retrieval-title">
          <h3 id="retrieval-title">Retrieved website text</h3>
          <p id="retrieval-summary" class="retrieval-summary">
            Submit a public website URL to retrieve readable page text before AI extraction runs.
          </p>
          <pre id="retrieval-preview" class="retrieval-preview" hidden></pre>
        </section>
        <button id="demo-results-button" class="secondary-button" type="button">
          Show development sample results
        </button>
        <p class="demo-note">
          Development-only: sample results are test data for checking the interface, not real
          website analysis.
        </p>
      </div>

      <section class="results-panel" aria-labelledby="results-title">
        <div class="results-header">
          <div>
            <p class="eyebrow">Review fields</p>
            <h2 id="results-title">Extraction results</h2>
          </div>
          <p id="results-guidance" class="empty-state">
            Results will appear here after a website is analyzed. Until then, each field is shown
            as a placeholder from the extraction schema.
          </p>
        </div>
        <ul id="results-list" class="results-list"></ul>
      </section>
    </section>
  </main>
`

const form = document.querySelector('#website-form')
const statusMessage = document.querySelector('#form-status')
const demoResultsButton = document.querySelector('#demo-results-button')
const resultsList = document.querySelector('#results-list')
const resultsGuidance = document.querySelector('#results-guidance')
const urlInput = document.querySelector('#program-url')
const analyzeButton = form.querySelector('button[type="submit"]')
const retrievalSummary = document.querySelector('#retrieval-summary')
const retrievalPreview = document.querySelector('#retrieval-preview')

renderResults(extractionFields)

const setLoadingState = (isLoading) => {
  analyzeButton.disabled = isLoading
  analyzeButton.textContent = isLoading ? 'Retrieving...' : 'Analyze Program'
}

const setDefaultResultsGuidance = () => {
  resultsGuidance.textContent =
    'Results will appear here after a website is analyzed. Until then, each field is shown as a placeholder from the extraction schema.'
}

const setReviewResultsGuidance = () => {
  resultsGuidance.textContent =
    'AI-generated information is a draft. Review every field before use, confirm accurate fields, and edit or clear anything that is incorrect or unsupported.'
}

const showRetrievalMessage = (message, type = 'neutral') => {
  retrievalSummary.className = `retrieval-summary ${type}`
  retrievalSummary.textContent = message
}

const showRetrievedText = ({ finalUrl, text, characterCount }) => {
  const previewText = text.length > 1200 ? `${text.slice(0, 1200)}...` : text

  showRetrievalMessage(
    `Readable website content was retrieved from ${finalUrl}. ${characterCount} characters were extracted.`,
    'success',
  )
  retrievalPreview.hidden = false
  retrievalPreview.textContent = previewText
}

const requestReadableWebsiteText = async (url) => {
  const response = await fetch('/api/retrieve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })

  const body = await response.json()

  if (!response.ok || !body.ok) {
    throw new Error(body.message || 'The website could not be retrieved.')
  }

  return body
}

const requestAnalysis = async ({ finalUrl, text }) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sourceUrl: finalUrl,
      text,
    }),
  })

  const body = await response.json()

  if (!response.ok || !body.ok) {
    throw new Error(body.message || 'AI extraction could not be completed.')
  }

  return body
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const submittedUrl = urlInput.value.trim()

  setLoadingState(true)
  setDefaultResultsGuidance()
  renderResults(extractionFields)
  retrievalPreview.hidden = true
  retrievalPreview.textContent = ''
  showRetrievalMessage('Retrieving readable text from the submitted page...', 'loading')
  statusMessage.textContent = 'Retrieving the submitted page before AI extraction runs.'

  try {
    const retrievedWebsite = await requestReadableWebsiteText(submittedUrl)

    showRetrievedText(retrievedWebsite)
    analyzeButton.textContent = 'Analyzing...'
    statusMessage.textContent =
      'Readable website text was retrieved. AI extraction is now checking the supported fields.'

    try {
      const analysis = await requestAnalysis(retrievedWebsite)
      const reviewableResults = createReviewableResults(mergeExtractionResults(analysis.results))

      renderResults(reviewableResults, { hasBeenAnalyzed: true, isReviewable: true })
      setReviewResultsGuidance()
      statusMessage.textContent =
        'AI extraction completed. Review each field, confirm accurate values, and edit or clear anything that needs correction.'
    } catch (error) {
      renderResults(extractionFields)
      setDefaultResultsGuidance()
      statusMessage.textContent = `Retrieval succeeded, but AI extraction failed: ${error.message}`
    }
  } catch (error) {
    showRetrievalMessage(error.message, 'error')
    statusMessage.textContent = 'Retrieval failed. No extraction fields were changed.'
  } finally {
    setLoadingState(false)
  }
})

demoResultsButton.addEventListener('click', () => {
  renderResults(createReviewableResults(developmentSampleResults), {
    hasBeenAnalyzed: true,
    isReviewable: true,
  })
  setReviewResultsGuidance()
  statusMessage.textContent =
    'Development sample results are displayed for interface testing only. They are not from a real website.'
})
