<template>
    <div class="receipt">
        <img :src="dataExtracted.vendor.logo" width="90" height="90" class="vendor" />
        <p class="text-body-2 font-weight-bold">{{ dataExtracted.vendor.name }}</p>
        <p class="text-body-2">{{ dataExtracted.vendor.address }}</p>
        <p class="text-body-2">{{ dataExtracted.vendor.phone_number }}</p>
        <div class="divider"></div>
        <p class="text-body-2">{{ dataExtracted.date }}</p>
        <div class="divider"></div>
        <div v-if="dataExtracted.category != null" class="d-flex flex-row justify-start">
            <p class="text-body-2">Category: </p>
            <p class="text-body-2 ms-1">{{ dataExtracted.category }}</p>
        </div>
        <div class="divider"></div>

        <div class="d-flex flex-row pa-0 ma-0" v-for="(item, i) in dataExtracted.line_items" :key="i">
            <p class="text-body-2 font-weight-bold">{{ item.quantity }}</p>
            <p class="text-body-2 font-weight-bold ms-3 me-auto">{{ item.description }}</p>
            <p class="text-body-2 font-weight-bold">{{ item.total }}</p>
        </div>

        <div v-if="dataExtracted.line_items.length > 0" class="divider"></div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Subtotal:</p>
            <p class="text-body-2">{{ dataExtracted.subtotal }}</p>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Tax:</p>
            <p class="text-body-2">{{ dataExtracted.tax }}</p>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Tip:</p>
            <p class="text-body-2">{{ dataExtracted.tip }}</p>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2 font-weight-bold">Total:</p>
            <p class="text-body-2 font-weight-bold">{{ dataExtracted.total }}</p>
        </div>
        <div class="divider"></div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Currency:</p>
            <p class="text-body-2">{{ dataExtracted.currency_code }}</p>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Payment:</p>
            <p class="text-body-2">{{ dataExtracted.payment.display_name }}</p>
        </div>
        <div class="divider"></div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Reference #:</p>
            <p class="text-body-2">{{ dataExtracted.reference_number }}</p>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <p class="text-body-2">Invoice #:</p>
            <p class="text-body-2">{{ dataExtracted.invoice_number }}</p>
        </div>
    </div>
</template>
<style scoped>

.receipt {
    width: 270px;
    padding: 10px;
    background-color: #FFFFFF;
    max-height: 500px;
    -webkit-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 2px;
    overflow: scroll;
}

.vendor {
    width: 90px;
    height: 90;
    border-radius: 50%;
    border: 3px solid black;
    object-fit: cover;
}

.divider {
    height: 1px;
    width: 100%;
    background-color: #aaa;
    margin: 3px 0;
}

</style>
<script>

export default {
    name: 'VirtualReceipt',
    computed: {
        dataExtracted() {
            return this.$store.state.dataExtracted;
        },
    }
}

</script>