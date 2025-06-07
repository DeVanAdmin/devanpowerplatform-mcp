// Add these functions within the server.tool definitions

// PowerPlatform create record
server.tool(
  "create-record",
  "Create a new record in a PowerPlatform entity",
  {
    entityNamePlural: z.string().describe("The plural name of the entity (e.g., 'accounts', 'contacts')"),
    recordData: z.record(z.any()).describe("The data for the new record as a JSON object"),
  },
  async ({ entityNamePlural, recordData }) => {
    try {
      const service = getPowerPlatformService();
      const newRecord = await service.createRecord(entityNamePlural, recordData);

      const newRecordStr = JSON.stringify(newRecord, null, 2);

      return {
        content: [
          {
            type: "text",
            text: `Successfully created new record in '${entityNamePlural}':\n\n${newRecordStr}`,
          },
        ],
      };
    } catch (error: any) {
      console.error("Error creating record:", error);
      return {
        content: [
          {
            type: "text",
            text: `Failed to create record: ${error.message}`,
          },
        ],
      };
    }
  }
);

// PowerPlatform update record
server.tool(
  "update-record",
  "Update an existing record in a PowerPlatform entity",
  {
    entityNamePlural: z.string().describe("The plural name of the entity"),
    recordId: z.string().describe("The GUID of the record to update"),
    recordData: z.record(z.any()).describe("The data to update in the record as a JSON object"),
  },
  async ({ entityNamePlural, recordId, recordData }) => {
    try {
      const service = getPowerPlatformService();
      await service.updateRecord(entityNamePlural, recordId, recordData);

      return {
        content: [
          {
            type: "text",
            text: `Successfully updated record '${recordId}' in '${entityNamePlural}'.`,
          },
        ],
      };
    } catch (error: any) {
      console.error("Error updating record:", error);
      return {
        content: [
          {
            type: "text",
            text: `Failed to update record: ${error.message}`,
          },
        ],
      };
    }
  }
);

// PowerPlatform delete record
server.tool(
  "delete-record",
  "Delete a record from a PowerPlatform entity by ID",
  {
    entityNamePlural: z.string().describe("The plural name of the entity"),
    recordId: z.string().describe("The GUID of the record to delete"),
  },
  async ({ entityNamePlural, recordId }) => {
    try {
      const service = getPowerPlatformService();
      await service.deleteRecord(entityNamePlural, recordId);

      return {
        content: [
          {
            type: "text",
            text: `Successfully deleted record '${recordId}' from '${entityNamePlural}'.`,
          },
        ],
      };
    } catch (error: any) {
      console.error("Error deleting record:", error);
      return {
        content: [
          {
            type: "text",
            text: `Failed to delete record: ${error.message}`,
          },
        ],
      };
    }
  }
);
