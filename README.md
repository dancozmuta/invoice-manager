### Implementation Tech Stack:

Language: TypeScript
Framework: Angular
User-Centric Features:

Seamless hover states for all interactive elements on the page.
User-friendly operations, including creating, reading, updating, and deleting invoices.

### Expected Behaviour

Creating an Invoice

- Generate a unique ID for new invoices – a blend of 2 random uppercased letters and 4 random numbers.
- Craft invoices as drafts or pending. "Save as Draft" allows flexibility, while "Save & Send" demands completion of all fields.
- Dynamically set the paymentDue property by modifying the Payments Terms field, based on the createdAt date and specified payment terms.
- The total should reflect the sum of all items on the invoice.
Editing an Invoice

- Streamlined editing process, with all fields mandatory upon clicking "Save Changes."
- Smart handling of drafts – transitioning to "pending" status when changes are saved, with all fields required at this stage.
- Empower users to mark invoices as paid, instantly updating the status to "paid."
- User-friendly confirmation modal when attempting to delete invoices.
