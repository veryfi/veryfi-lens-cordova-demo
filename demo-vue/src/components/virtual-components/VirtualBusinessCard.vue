<template>

    <v-card width="350">
        <v-container class="pa-0 ma-0">
            <v-row>
                <v-col class="bg-grey-darken-3 text-center pa-5">
                    <p>{{ dataExtracted.person }}</p>
                    <p>{{ dataExtracted.title }}</p>
                    <p>{{ dataExtracted.email }}</p>
                    <p>{{ dataExtracted.phone }}</p>
                    <p>{{ dataExtracted.mobile }}</p>
                    <p>{{ dataExtracted.fax }}</p>
                    <p>{{ dataExtracted.address }}</p>
                </v-col>
            </v-row>
        </v-container>        
    </v-card>

</template>
<script>

export default {
    name: 'VirtualBusinessCard',
    computed: {
        dataExtracted() {
           return this.$store.state.dataExtracted;
        }
    }
}

</script>