import { extractionFields } from './extractionFields.js'

const app = document.querySelector('#app')

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

const getFieldDisplayValue = (field, hasBeenAnalyzed) => {
  if (!hasBeenAnalyzed) {
    return 'Not analyzed yet'
  }

  return field.found ? field.value : 'Not Found'
}

const createResultRow = (field, hasBeenAnalyzed) => {
  const row = document.createElement('li')
  row.className = 'result-row'

  const fieldSummary = document.createElement('div')

  const label = document.createElement('h3')
  label.textContent = field.label

  const value = document.createElement('p')
  value.className = 'result-value'
  value.textContent = getFieldDisplayValue(field, hasBeenAnalyzed)

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

  fieldSummary.append(label, value)
  row.append(fieldSummary, evidence)

  return row
}

const renderResults = (results, hasBeenAnalyzed = false) => {
  resultsList.replaceChildren()

  Object.values(results).forEach((field) => {
    resultsList.append(createResultRow(field, hasBeenAnalyzed))
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
          <p class="empty-state">
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
const urlInput = document.querySelector('#program-url')
const analyzeButton = form.querySelector('button[type="submit"]')
const retrievalSummary = document.querySelector('#retrieval-summary')
const retrievalPreview = document.querySelector('#retrieval-preview')

renderResults(extractionFields)

const setLoadingState = (isLoading) => {
  analyzeButton.disabled = isLoading
  analyzeButton.textContent = isLoading ? 'Retrieving...' : 'Analyze Program'
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
      renderResults(mergeExtractionResults(analysis.results), true)
      statusMessage.textContent =
        'AI extraction completed. Please review each field and its source evidence before using the results.'
    } catch (error) {
      renderResults(extractionFields)
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
  renderResults(developmentSampleResults, true)
  statusMessage.textContent =
    'Development sample results are displayed for interface testing only. They are not from a real website.'
})
