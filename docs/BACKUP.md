# Data Backup & Export

## Overview

Business data is critical. Users need reliable ways to backup and export their data from IndexedDB.

## Export Options

### 1. Full Backup (JSON)

Export all data as a single JSON file.

```ts
// Export structure
{
  "version": "1.0",
  "exportedAt": "2026-09-27T10:30:00Z",
  "data": {
    "users": [...],
    "transactions": [...],
    "inventory": [...],
    "settings": [...]
  }
}
```

### 2. CSV Export

Export individual tables as CSV for spreadsheet use.

| Table | CSV File |
|-------|----------|
| Transactions | `transactions_2026-09-27.csv` |
| Inventory | `inventory_2026-09-27.csv` |
| Users | `users_2026-09-27.csv` |

### 3. PDF Reports

Generate PDF summaries for printing/sharing.

## Import/Restore

```ts
// Import validation
function validateBackup(data: unknown): boolean {
  // Check version compatibility
  // Validate data structure
  // Check for duplicates
}

// Restore from backup
async function restoreBackup(file: File) {
  const data = JSON.parse(await file.text());
  if (!validateBackup(data)) throw new Error("Invalid backup");

  // Clear existing data
  // Import new data
  // Verify integrity
}
```

## Auto-Backup

| Option | Description |
|--------|-------------|
| **Manual** | User triggers export from Settings |
| **Scheduled** | Weekly auto-backup to downloaded file |
| **Pre-delete** | Prompt backup before clearing data |

## Data Retention

| Data | Retention |
|------|-----------|
| Transactions | Forever (until user deletes) |
| Inventory | Forever (until user deletes) |
| Settings | Forever (until user deletes) |
| Activity logs | 90 days |

## Implementation Tasks

1. Create `BackupService` in `src/lib/backup.ts`
2. Add export buttons in Settings page
3. Add import/restore functionality
4. Add CSV export for each table
5. Add PDF report generation
6. Add backup validation
7. Test restore process

## Security Considerations

- Backup files contain sensitive financial data
- Encrypt backups if stored in cloud
- Warn users about sharing backup files
- Validate imported data to prevent corruption
