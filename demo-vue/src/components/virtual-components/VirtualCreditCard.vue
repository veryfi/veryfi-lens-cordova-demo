<template>
    <div class="container">
        <div class="card">
            <div class="card-inner">
                <div class="front">
                    <img src="https://i.ibb.co/PYss3yv/map.png" class="map-img">
                    <div class="row">
                        <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px">
                        <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px">
                    </div>
                    <div class="row card-no" v-if="dataExtracted.card_number != null">
                        <p>{{ dataExtracted.card_number }}</p>
                    </div>
                    <div class="row card-holder">
                        <p>CARD HOLDER</p>
                        <p>VALID TILL</p>
                    </div>
                    <div class="row name">
                        <p>{{ dataExtracted.card_name }}</p>
                        <p v-if="dataExtracted.card_dates != null">{{ dataExtracted.card_dates[0] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    width: 350px;
    height: 250px;
    color: #fff;
    cursor: pointer;
    perspective: 1000px;
}

.card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 1s;
    transform-style: preserve-3d;
}

.front {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, #0045c7, #ff2c7d);
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 30px;
    border-radius: 15px;
    overflow: hidden;
    z-index: 1;
    backface-visibility: hidden;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.map-img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    z-index: -1;
}

.card-no {
    font-size: 28px;
    margin-top: 30px;
}

.card-holder {
    font-size: 12px;
    margin-top: 40px;
}

.name {
    font-size: 22px;
    margin-top: 0px;
}
</style>
<script>

export default {
    name: 'VirtualCreditCard',
    computed: {
        dataExtracted() {
            return this.$store.state.dataExtracted;
        },
    }
}

</script>