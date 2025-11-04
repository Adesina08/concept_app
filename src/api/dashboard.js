const delay = (value, ms = 300) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(value))), ms);
  });

const formatNumber = (value) =>
  Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

const formatPercentage = (value, options = {}) => {
  if (value === null || value === undefined) return '';
  const percentage = typeof value === 'number' ? value * 100 : parseFloat(value);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
  });

  return formatter.format(percentage / 100);
};

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

const adminMetricsResponse = {
  metrics: [
    { id: 'activeConcepts', label: 'Active Concepts', value: 24 },
    { id: 'totalRespondents', label: 'Total Respondents', value: 1587 },
    { id: 'feedbackCompletion', label: 'Feedback Completion', value: 0.85, type: 'percentage' },
    { id: 'systemPerformance', label: 'System Performance', value: 0.998, type: 'percentage', precision: 1 },
  ],
  concepts: [
    { id: 'concept-a', name: 'Concept A', company: 'Acme Corp' },
    { id: 'concept-b', name: 'Concept B', company: 'Beta Inc' },
    { id: 'concept-c', name: 'Concept C', company: 'Gamma Ltd' },
    { id: 'concept-d', name: 'Concept D', company: 'Delta LLC' },
    { id: 'concept-e', name: 'Concept E', company: 'Epsilon Co' },
  ],
};

const conceptSummaryResponse = {
  summaryCards: [
    { id: 'activeConcepts', label: 'Active Concepts', value: 5 },
    { id: 'surveyResponses', label: 'Survey Responses', value: 234 },
    { id: 'abTests', label: 'A/B Tests', value: 3 },
  ],
  activeConcepts: [
    {
      id: 'concept-a',
      title: 'Concept A: Eco-Friendly Packaging',
      completion: 0.75,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCNwi6CrHADEFpgsDm2v3g07eMyFodMW6dQ6beNKaMsjgrVr8rRL2Xts60bsPbkPCk7yQa8tyb-nqfzgCmUm-B_IuqhdjtMBSCHsfFcoeuVRSFI7HhWNlLDofJJvMUrVnspUIH9r55_2rHZ3GJaPER_B6kuus6hyLhlNXU885YHeHKU45lMViKOcfpCgCqLX-wsZ9oyEvCu8g6IJa1Yskr7zLuiRyxkg_W1MCK8TFq6cq9hp2IPqfpx5gTJ5oemWcqfyogiFS5MqfAp',
    },
    {
      id: 'concept-b',
      title: 'Concept B: Sustainable Materials',
      completion: 0.5,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBxwkR8a2e4cMLySwIhL0QlqwFRpY9k-bjAfPJPrl1P9q_aVGV9sV1-aO9azVioEFpt44QqZKkvUYQP6Dlt503NlKiJnENCl7izDkEKfViRSfEVBzDP6ACu7GyaDIpQaFj6NWlC17n1laGKYANhJ0Uu1yr6ZrsfCVpLqWPC5hlWMmaqWhaCSnGXwg_ksBttX7CWKeKTG98kPNUS-dG7ENrLFJ9s5RbeaeiY7axEKh75-vNc2kgOFZwfuACFMs8Occ34hQKjCMd9Lo2B',
    },
    {
      id: 'concept-c',
      title: 'Concept C: Reduced Waste',
      completion: 0.25,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCo0zZMmbQdk3HhzgzWMnvLjIguqygQSWf9X6y5x2C5Hl-xOuE0k_G1RzC223s2PJl2i2Vi87cqfXTwX4vCZt7NHYQ5i3FP5k-D7OjvsvimsTjmD_an8vvXfgpSTFvNaXEWkqOAm0DtgUZu1fxEwGHJXZK4Z13TysiIXNZ-Q11ylcGEb4IZMYaok0T85VdhxGYsOpaPD12_8RSTGogNnbFB4WFmIIEh_Z3yelAC6a6jeCfE2uUE-gDz6X6mt7N3yqKkVOQoCGTh4mzG',
    },
  ],
};

const conceptDetailsResponse = {
  'concept-a': {
    id: 'concept-a',
    name: 'AI-Powered Personal Finance Advisor',
    rating: 4.2,
    reviews: 125,
    ratingDistribution: [
      { label: '5', percentage: 0.3 },
      { label: '4', percentage: 0.4 },
      { label: '3', percentage: 0.15 },
      { label: '2', percentage: 0.1 },
      { label: '1', percentage: 0.05 },
    ],
    strengths: [
      {
        title: 'User-Centric Approach',
        description: 'The concept demonstrates a clear understanding of user needs and pain points.',
        icon: 'check',
      },
      {
        title: 'Innovation',
        description: 'The concept offers a novel solution that differentiates it from existing products.',
        icon: 'check',
      },
    ],
    weaknesses: [
      {
        title: 'Implementation Details',
        description: 'The concept lacks detailed information on implementation feasibility.',
        icon: 'x-mark',
      },
      {
        title: 'Market Validation',
        description: "The concept's market potential needs further validation.",
        icon: 'x-mark',
      },
    ],
    improvements: [
      {
        title: 'Elaborate on Implementation',
        description: 'Provide a more detailed explanation of how the concept will be implemented.',
        icon: 'lightbulb',
      },
      {
        title: 'Validate Market Potential',
        description: "Conduct market research to validate the concept's potential.",
        icon: 'lightbulb',
      },
    ],
    revisionSuggestions: [
      'Add a section detailing the technical feasibility of the concept.',
      "Include market research data to support the concept's potential.",
    ],
  },
};

const iterationHistoryResponse = {
  'concept-a': [
    { id: 'v3', version: 'Version 3.0', releasedAt: '2024-03-15T00:00:00Z' },
    { id: 'v2', version: 'Version 2.0', releasedAt: '2024-03-10T00:00:00Z' },
    { id: 'v1', version: 'Version 1.0', releasedAt: '2024-03-05T00:00:00Z' },
  ],
};

const finalReportResponse = {
  'concept-a': {
    topConcept: {
      title: 'AI-Powered Personal Finance Advisor',
      description:
        'A personalized financial planning tool that leverages AI to provide tailored investment strategies and budgeting advice.',
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCaMepnbZfjredeUYNTpzdpBMLcBoq14Z4sy1MSGvDftsRn4pn80p3az59BqV09mfoz-McjxX2Lsf0kuL482sGhVDZAmCL7CFIzduEf5RKY-goX4UGYUlONZBaCF9C9BHawYKqBspbhuB9Y0UODArUVJbkc-7UfFcli81Ma8UgP55smCRlSCZuVEXr7xaV4cyqHs05BIKZc7U6WPHq-Fj3qGgYp2pE4og99BToFAHt9Rd4ygxMXWROKGJu2aMosHvs5IaVXY373eU1E",
    },
    keyInsights: [
      { id: 'satisfaction', title: 'User Satisfaction', value: 0.85, icon: 'smiley' },
      { id: 'preference', title: 'Concept Preference', value: 0.78, icon: 'star' },
      { id: 'rating', title: 'Average Rating', value: '4.8/5', icon: 'chart-line' },
    ],
    downloads: [
      { id: 'white-paper', label: 'Download White Paper', href: '#' },
    ],
  },
};

export async function fetchAdminMetrics() {
  return delay(adminMetricsResponse);
}

export async function fetchConceptSummary() {
  return delay(conceptSummaryResponse);
}

export async function fetchConceptDetails(conceptId = 'concept-a') {
  const detail = conceptDetailsResponse[conceptId] ?? conceptDetailsResponse['concept-a'];
  return delay(detail);
}

export async function fetchIterationHistory(conceptId = 'concept-a') {
  const iterations = iterationHistoryResponse[conceptId] ?? iterationHistoryResponse['concept-a'];
  return delay(iterations);
}

export async function fetchFinalReport(conceptId = 'concept-a') {
  const report = finalReportResponse[conceptId] ?? finalReportResponse['concept-a'];
  return delay(report);
}

export const selectAdminMetricCards = (response) =>
  response.metrics.map((metric) => {
    if (metric.type === 'percentage') {
      return {
        id: metric.id,
        label: metric.label,
        value: formatPercentage(metric.value, { maximumFractionDigits: metric.precision ?? 0 }),
      };
    }

    return {
      id: metric.id,
      label: metric.label,
      value: formatNumber(metric.value),
    };
  });

export const selectAdminConcepts = (response) =>
  response.concepts.map((concept) => ({
    id: concept.id,
    title: concept.name,
    subtitle: concept.company,
    action: { label: 'View', to: `/concept-refinement-details/${concept.id}`, className: 'text-base font-medium leading-normal text-white hover:text-[#929bc9]' },
  }));

export const selectSummaryCards = (response) =>
  response.summaryCards.map((card) => ({
    id: card.id,
    label: card.label,
    value: formatNumber(card.value),
  }));

export const selectActiveConcepts = (response) =>
  response.activeConcepts.map((concept) => ({
    id: concept.id,
    title: concept.title,
    subtitle: `${formatPercentage(concept.completion, { maximumFractionDigits: 0 })} Complete`,
    media: concept.image,
    to: `/concept-refinement-details/${concept.id}`,
  }));

export const selectConceptDetails = (response) => ({
  id: response.id,
  name: response.name,
  rating: response.rating.toFixed(1),
  reviews: formatNumber(response.reviews),
  ratingDistribution: response.ratingDistribution.map((item) => ({
    label: item.label,
    percentage: formatPercentage(item.percentage, { maximumFractionDigits: 0 }),
    rawPercentage: item.percentage * 100,
  })),
  strengths: response.strengths,
  weaknesses: response.weaknesses,
  improvements: response.improvements,
  revisionSuggestions: response.revisionSuggestions,
});

export const selectIterationItems = (response, conceptId = 'concept-a') =>
  response.map((item) => ({
    id: item.id,
    title: item.version,
    subtitle: formatDate(item.releasedAt),
    to: `/concept-refinement-details/${conceptId}?iteration=${item.id}`,
    trailingIcon: 'arrow-right',
  }));

export const selectFinalReport = (response) => ({
  topConcept: response.topConcept,
  keyInsights: response.keyInsights.map((insight) => ({
    id: insight.id,
    title: insight.title,
    value: typeof insight.value === 'number'
      ? formatPercentage(insight.value, { maximumFractionDigits: insight.id === 'rating' ? 0 : 0 })
      : insight.value,
    icon: insight.icon,
  })),
  downloads: response.downloads,
});

export { formatDate };
