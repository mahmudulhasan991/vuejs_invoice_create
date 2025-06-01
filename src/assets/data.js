import { reactive } from 'vue';
export const fromData1 = reactive({
  invoiceFrom: 'ABC Company',
  billTo: 'XYZ Enterprises',
  shipTo: 'XYZ Enterprises - Warehouse',
  invoiceNumber: 'INV-001',
  invoiceDate: '2025-06-01',
  paymentTerms: 'Net 30',
  dueDate: '2025-07-01',
  poNumber: 'PO-123456',
  notes: 'Thank you for your business.',
  terms: 'Payment due within 30 days.',
  tax: '50.00',
  discount: '20.00',
  shipping: '15.00',
  amountPaid: '100.00',
  lineItems: [
    {
      description: 'Web Design Services',
      quantity: '1',
      rate: '500.00',
      amount: '500.00'
    },
    {
      description: 'Monthly Hosting',
      quantity: '2',
      rate: '100.00',
      amount: '200.00'
    },
    {
      description: 'Web Design Services',
      quantity: '1',
      rate: '500.00',
      amount: '500.00'
    },
    {
      description: 'Monthly Hosting',
      quantity: '2',
      rate: '100.00',
      amount: '200.00'
    },
    {
      description: 'Web Design Services',
      quantity: '1',
      rate: '500.00',
      amount: '500.00'
    },
    {
      description: 'Monthly Hosting',
      quantity: '2',
      rate: '100.00',
      amount: '200.00'
    },
  ]
});

export const fromData2 = reactive({
  invoiceFrom: 'DEF Solutions',
  billTo: 'LMN Corp',
  shipTo: 'LMN Corp - HQ',
  invoiceNumber: 'INV-002',
  invoiceDate: '2025-06-01',
  paymentTerms: 'Due on Receipt',
  dueDate: '2025-06-01',
  poNumber: 'PO-7891011',
  notes: 'We appreciate your prompt payment.',
  terms: 'Please remit payment immediately.',
  tax: '30.00',
  discount: '10.00',
  shipping: '25.00',
  amountPaid: '200.00',
  lineItems: [
    {
      description: 'Consulting Services',
      quantity: '3',
      rate: '150.00',
      amount: '450.00'
    },
    {
      description: 'Software License',
      quantity: '1',
      rate: '300.00',
      amount: '300.00'
    },
    {
      description: 'Consulting Services',
      quantity: '3',
      rate: '150.00',
      amount: '450.00'
    },
    {
      description: 'Consulting Services',
      quantity: '3',
      rate: '150.00',
      amount: '450.00'
    },
    {
      description: 'Software License',
      quantity: '1',
      rate: '300.00',
      amount: '300.00'
    },
  ]
});