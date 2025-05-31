<script setup>
import { reactive } from 'vue';
const fromData = reactive({
  invoiceFrom: '',
  billTo: '',
  shipTo: '',
  invoiceNumber: '',
  invoiceDate: '',
  paymentTerms: '',
  dueDate: '',
  poNumber: '',
  notes: '',
  terms: '',
  tax:'',
  discount:'',
  shipping:'',
  amountPaid:'',
  lineItems: [
    {
      description: '',
      quantity: '',
      rate: '',
      amount: ''
    }
  ]
});


function addLineItem() {
  fromData.lineItems.push({
    description: '',
    quantity: '',
    rate: '',
    amount: ''
  });
}

function Subtotal() {
  return fromData.lineItems.reduce((total, item) => total + (item.quantity * item.rate || 0), 0).toFixed(2);
}

function calculateTax() {
  return (Subtotal() * (fromData.tax / 100)).toFixed(2);
}

function calculateTotal() {
  const subtotal = parseFloat(Subtotal());
  const tax = parseFloat(calculateTax());
  const discount = parseFloat(fromData.discount) || 0;
  const shipping = parseFloat(fromData.shipping) || 0;
  
  return (subtotal + tax - discount + shipping).toFixed(2);
}

function calculateBalanceDue() {
  const total = parseFloat(calculateTotal());
  const amountPaid = parseFloat(fromData.amountPaid) || 0;
  
  return (total - amountPaid).toFixed(2);
}

</script>

<template>
  <div class="container">
    <h1 class="my-5">{{ fromData }}</h1>
    <div class="row">
      <div class="col-md-12">
        <div class="invoice-container">
          <div class="invoice-container">
            <div class="row mb-4">
              
                <div class="col-md-6 mt-5">
                <div class="mb-3">
                    <label for="invoice-from" class="form-label required">Who is this invoice from?</label>
                    <input type="text" id="invoice-from" v-model="fromData.invoiceFrom" class="form-control" placeholder="(required)" />
                </div>
                <div class="mb-3">
                    <label for="bill-to" class="form-label required">Bill To</label>
                    <input type="text" id="bill-to" v-model="fromData.billTo" class="form-control" placeholder="(required)" />
                </div>
                
                <div class="mb-3">
                    <label for="ship-to" class="form-label">Ship To (optional)</label>
                    <input type="text" id="ship-to" v-model="fromData.shipTo" class="form-control" placeholder="(optional)" />
                </div>
                </div>
                
                <div class="col-md-6 text-md-end invoice-header">
                <h1 class="mb-3">INVOICE</h1>
                <div class="invoice-details d-inline-block text-start">
                    <div class="mb-2">
                    <label for="invoice-number" class="form-label">#</label>
                    <input type="text" id="invoice-number" v-model="fromData.invoiceNumber" class="form-control form-control-sm" placeholder="" />
                    </div>
                    <div class="mb-2">
                    <label for="invoice-date" class="form-label">Date</label>
                    <input type="date" id="invoice-date" v-model="fromData.invoiceDate" class="form-control form-control-sm" />
                    </div>
                    <div class="mb-2">
                    <label for="payment-terms" class="form-label">Payment Terms</label>
                    <input type="text" id="payment-terms" v-model="fromData.paymentTerms" class="form-control form-control-sm" placeholder="" />
                    </div>
                    <div class="mb-2">
                    <label for="due-date" class="form-label">Due Date</label>
                    <input type="date" id="due-date" v-model="fromData.dueDate" class="form-control form-control-sm" />
                    </div>
                    <div>
                    <label for="po-number" class="form-label">PO Number</label>
                    <input type="text" id="po-number" v-model="fromData.poNumber" class="form-control form-control-sm" placeholder="" />
                    </div>
                </div>
                </div>
            </div>
            <hr />
            
            <div class="table-responsive mb-3">
                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th style="min-width: 250px;">Item / Description</th>
                    <th style="width: 100px;">Quantity</th>
                    <th style="width: 120px;">Rate</th>
                    <th style="width: 140px;">Amount</th>
                    </tr>
                </thead>
                <tbody id="line-items">
                    <tr v-for="(item, index) in fromData.lineItems" :key="index">
                      <td>
                          <input type="text" v-model="item.description" class="form-control" placeholder="Description of service or product..." />
                      </td>
                      <td>
                          <input type="number" v-model="item.quantity" class="form-control" placeholder="0" value="" min="0" />
                      </td>
                      <td>
                          <div class="input-group">
                          <span class="input-group-text">$</span>
                          <input type="number" class="form-control" v-model="item.rate" placeholder="0.00" value="" step="0.01" min="0" />
                          </div>
                      </td>
                      <td>
                          <div class="input-group">
                          <span class="input-group-text">$</span>
                          <input type="number" class="form-control" :value="item.amount=item.quantity*item.rate" placeholder="0.00" value="" step="0.01" min="0" readonly />
                          </div>
                      </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <button type="button" @click="addLineItem" class="btn btn-success btn-sm add-line-btn">
                + Line Item
            </button>

            <hr />

            <div class="row">
                <div class="col-md-8">
                <div class="mb-4">
                    <label for="notes" class="form-label">Notes</label>
                    <textarea
                    id="notes"
                    class="form-control" v-model="fromData.notes" 
                    rows="3"
                    placeholder="Notes – any relevant information not already covered"
                    ></textarea>
                </div>
                <div>
                    <label for="terms" class="form-label">Terms</label>
                    <textarea
                    id="terms"
                    class="form-control" v-model="fromData.terms"
                    rows="3"
                    placeholder="Terms and conditions – late fees, payment methods, delivery schedule"
                    ></textarea>
                </div>
                </div>

                <div class="col-md-4">
                <div class="summary-card">
                    <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${{Subtotal()}}</span>
                    </div>
                    <div class="summary-row align-items-center">
                    <span>Tax</span>
                    <div class="d-flex align-items-center">
                        <input
                        type="number"
                        class="form-control form-control-sm me-2"
                        style="width: 60px;" v-model="fromData.tax" 
                        value="10"
                        step="0.01"
                        />
                        <span>%</span>
                    </div>
                    <span class="ms-auto">${{calculateTax()}}</span>
                    </div>
                    <div class="summary-row">
                    <span>+ Discount</span>
                    <input
                        type="text"
                        class="form-control form-control-sm text-end"
                        placeholder="$0.00" v-model="fromData.discount"
                        style="width: 100px;"
                    />
                    </div>
                    <div class="summary-row">
                    <span>+ Shipping</span>
                    <input
                        type="text"
                        class="form-control form-control-sm text-end"
                        placeholder="$0.00"
                        style="width: 100px;" v-model="fromData.shipping"
                    />
                    </div>
                    <div class="summary-row total">
                    <span>Total</span>
                    <span>${{calculateTotal()}}</span>
                    </div>
                    <div class="summary-row">
                    <span>Amount Paid</span>
                    <div class="input-group" style="width: 100px;">
                        <span class="input-group-text">$</span>
                        <input
                        type="number"
                        class="form-control form-control-sm"
                        placeholder="0.00"
                        step="0.01" v-model="fromData.amountPaid"
                        />
                    </div>
                    </div>
                    <div class="summary-row">
                    <span>Balance Due</span>
                    <span>${{ calculateBalanceDue() }}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
    body {
      background-color: #f8f9fa;
    }
    .invoice-container {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .invoice-header h1 {
      font-size: 2rem;
      font-weight: 400;
    }
    .logo-placeholder {
      border: 2px dashed #ced4da;
      width: 200px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .form-label.required::after {
      content: " *";
      color: #dc3545;
    }
    .table thead th {
      background-color: #343a40;
      color: #fff;
      vertical-align: middle;
    }
    .table td,
    .table th {
      vertical-align: middle;
    }
    .add-line-btn {
      margin-top: 0.5rem;
    }
    .summary-card {
      background-color: #f1f1f1;
      padding: 1rem;
      border-radius: 6px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .summary-row.total {
      font-size: 1.25rem;
      font-weight: 500;
      border-top: 1px solid #dee2e6;
      padding-top: 0.5rem;
      margin-top: 0.5rem;
    }
    @media (min-width: 768px) {
      .invoice-details .form-control {
        max-width: 200px;
      }
    }
    @media (max-width: 767.98px) {
      .invoice-details .form-control {
        margin-bottom: 0.5rem;
      }
    }
</style>