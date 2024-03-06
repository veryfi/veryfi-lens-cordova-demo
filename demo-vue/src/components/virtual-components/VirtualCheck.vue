<template>
    <v-card class="pa-3">
        <div class="d-flex flex-row justify-end">
            <p class="text-body-2 font-weight-bold">{{ dataExtracted.check_number }}</p>
        </div>
        <div class="d-flex flex-row justify-end mt-2" v-if="dataExtracted.data != null">
            <p class="text-body-2 font-weight-bold">Date: </p>
            <p class="text-body-2 ms-3">{{ dataExtracted.date }}</p>
        </div>
        <div class="d-flex flex-row justify-start mt-2">
            <p class="text-body-2 font-weight-bold">Pay: </p>
            <p class="text-body-2 ">{{ dataExtracted.amount_text }}</p>
        </div>
        <div class="d-flex flex-row justify-start mt-2">
            <p class="text-body-2 font-weight-bold">Amount: </p>
            <p class="text-body-2 ms-2">{{ dataExtracted.amount }}</p>
        </div>
        <div class="d-flex flex-row justify-start mt-2">
            <p class="text-body-2 font-weight-bold">Receiver: </p>
            <p class="text-body-2 ms-2">{{ dataExtracted.receiver_name }}</p>
        </div>
        <div class="d-flex flex-row justify-start mt-2" v-if="dataExtracted.receiver_address != null">
            <p class="text-body-2">{{ dataExtracted.receiver_address }}</p>
        </div>
        <div class="d-flex flex-row justify-start mt-2">
            <p class="text-body-2 font-weight-bold">Memo: </p>
            <p class="text-body-2 ms-2">{{ dataExtracted.memo }}</p>
        </div>
    </v-card>
</template>
<script>

export default {
    name: 'VirtualCheck',
    computed: {
        dataExtracted() {
            return this.$store.state.dataExtracted;
        }
    }
}

</script>