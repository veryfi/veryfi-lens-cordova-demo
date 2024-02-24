import { createStore } from 'vuex';
import * as DocumentTypes from '@/constants/document-types';

import {
    defaultReceiptConfig,
    defaultLongReceiptConfig,
    defaultCheckConfig,
    defaultCreditCardConfig,
    defaultBusinessCardConfig,
    defaultCodeConfig,
    defaultW2Config,
    defaultW9Config,
    defaultBankStatementsConfig,
    defaultBarcodesConfig,
    defaultInsuranceCardConfig,
    defaultPassportConfig,
    defaultDriverLicenseConfig
} from '@/constants/config';

const store = createStore({
    state: {
        receipt: defaultReceiptConfig,
        long_receipt: defaultLongReceiptConfig,
        check: defaultCheckConfig,
        credit_card: defaultCreditCardConfig,
        business_card: defaultBusinessCardConfig,
        code: defaultCodeConfig,
        w2: defaultW2Config,
        w9: defaultW9Config,
        bank_statements: defaultBankStatementsConfig,
        barcodes: defaultBarcodesConfig,
        insurance_card: defaultInsuranceCardConfig,
        passport: defaultPassportConfig,
        driver_license: defaultDriverLicenseConfig,
    },
    mutations: {
        resetSetting(state, setting) {
            switch (setting) {
                case DocumentTypes.RECEIPT:
                    state[setting] = defaultReceiptConfig
                    break;
                case DocumentTypes.LONG_RECEIPT:
                    state[setting] = defaultLongReceiptConfig
                    break;
                case DocumentTypes.CHECK:
                    state[setting] = defaultCheckConfig
                    break;
                case DocumentTypes.CREDIT_CARD:
                    state[setting] = defaultCreditCardConfig
                    break;
                case DocumentTypes.BUSINESS_CARD:
                    state[setting] = defaultBusinessCardConfig
                    break;
                case DocumentTypes.CODE:
                    state[setting] = defaultCodeConfig
                    break;
                case DocumentTypes.W2:
                    state[setting] = defaultW2Config
                    break;
                case DocumentTypes.W9:
                    state[setting] = defaultW9Config
                    break;
                case DocumentTypes.BANK_STATEMENTS:
                    state[setting] = defaultBankStatementsConfig
                    break;
                case DocumentTypes.BARCODES:
                    state[setting] = defaultBarcodesConfig
                    break;
                case DocumentTypes.INSURANCE_CARD:
                    state[setting] = defaultInsuranceCardConfig
                    break;
                case DocumentTypes.PASSPORT:
                    state[setting] = defaultPassportConfig
                    break;
                case DocumentTypes.DRIVER_LICENSE:
                    state[setting] = defaultDriverLicenseConfig
                    break;
            }
        }
    },
});

export default store;