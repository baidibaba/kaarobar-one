# AI Implementation Roadmap

## Overview

AI features will be added incrementally, starting with rule-based systems and evolving to LLM-powered features.

## Phase 1: Rule-Based Intelligence (V1)

No external AI APIs — smart logic based on business rules.

### Features

| Feature | Description | Trigger |
|---------|-------------|---------|
| Smart Categorization | Auto-categorize transactions based on keywords | Transaction added |
| Low Stock Alerts | Warn when stock falls below threshold | Stock updated |
| Daily Reminders | Summarize day's activity | App launch |
| Duplicate Detection | Warn about potential duplicate transactions | Transaction added |
| Spending Patterns | Show spending trends | Ledger view |

### Implementation

```ts
// Example: Smart categorization
function categorizeTransaction(description: string): string {
  const keywords = {
    food: ["khana", "food", "roti", "chai", "دال", "چاول"],
    rent: ["rent", "kira", "کرایہ"],
    salary: ["salary", "taneez", "تنخواہ"],
    utilities: ["bijli", "electricity", "gas", "پانی"],
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((w) => description.toLowerCase().includes(w))) {
      return category;
    }
  }

  return "other";
}
```

---

## Phase 2: Machine Learning (V2)

On-device ML for predictions and patterns.

### Features

| Feature | Description | Model |
|---------|-------------|-------|
| Sales Forecasting | Predict next week/month sales | Time series |
| Demand Prediction | Predict which items will run out | Classification |
| Anomaly Detection | Flag unusual transactions | Outlier detection |
| Price Optimization | Suggest optimal sale prices | Regression |

### Implementation

```ts
// Example: Simple moving average for sales forecast
function forecastSales(history: number[], period = 7): number[] {
  const forecast: number[] = [];
  for (let i = 0; i < period; i++) {
    const recent = history.slice(-7);
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
    forecast.push(Math.round(avg));
  }
  return forecast;
}
```

---

## Phase 3: LLM-Powered Assistant (V3)

AI chat interface for business queries.

### Features

| Feature | Description | Example Query |
|---------|-------------|---------------|
| Business Q&A | Ask questions about your data | "How much did I sell today?" |
| Voice Input | Speak to enter transactions | "Sale 5000 to Ahmed" |
| Smart Suggestions | AI suggests next actions | "Restock milk — running low" |
| Report Summary | Natural language summaries | "Summarize this week" |
| Business Insights | AI-generated recommendations | "Consider increasing milk stock" |

### Architecture

```
User Query → Intent Parser → Data Fetcher → Response Generator → UI
                  ↓
            Context Builder
                  ↓
            Local Data (Dexie)
```

### AI Integration Options

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| OpenAI API | Powerful, well-known | Cost, privacy | $$$ |
| Anthropic Claude | Strong reasoning | Cost, privacy | $$$ |
| Ollama (local) | Privacy, no cost | Limited power | Free |
| Hybrid | Balance | Complexity | $$ |

### Privacy-First Approach

```ts
// Send only necessary data to AI
async function queryAI(question: string, context: BusinessContext) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({
      question,
      // Only send aggregated data, not raw transactions
      summary: {
        totalSales: context.totalSales,
        totalExpenses: context.totalExpenses,
        topProducts: context.topProducts,
      },
    }),
  });
  return response.json();
}
```

---

## Phase 4: Advanced AI (Future)

### Features

| Feature | Description |
|---------|-------------|
| Predictive Ordering | AI predicts what to order and when |
| Customer Insights | Track customer purchase patterns |
| Competitive Analysis | Compare with market trends |
| Automated Reports | AI-generated daily/weekly reports |
| Voice-First Interface | Full voice control |

---

## AI Ethics & Privacy

### Principles

1. **Transparency** — Always show when AI is being used
2. **User Control** — Users can disable AI features
3. **Data Privacy** — Minimize data sent to external APIs
4. **Explainability** — AI decisions should be explainable
5. **Fallback** — Graceful degradation when AI unavailable

### Data Handling

| Data | Sent to Cloud | Stays Local |
|------|--------------|-------------|
| Raw transactions | Never | Always |
| Aggregated stats | Only with consent | Default |
| Business summaries | Only with consent | Default |
| Personal info | Never | Always |

---

## Implementation Checklist

### Phase 1 (V1)
- [ ] Smart categorization
- [ ] Low stock alerts
- [ ] Daily reminders
- [ ] Duplicate detection
- [ ] Spending patterns

### Phase 2 (V2)
- [ ] Sales forecasting
- [ ] Demand prediction
- [ ] Anomaly detection
- [ ] Price optimization

### Phase 3 (V3)
- [ ] AI assistant UI
- [ ] Intent parser
- [ ] Voice input
- [ ] Business Q&A
- [ ] Smart suggestions

### Phase 4 (Future)
- [ ] Predictive ordering
- [ ] Customer insights
- [ ] Automated reports
- [ ] Voice-first interface
