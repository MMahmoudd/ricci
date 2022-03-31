import login from './modules/login'
export const state = () => ({
    // locales: ['en', 'ar'],
    // locale: 'ar',
    shipping_to: {
        full_name: '',
        city: '',
        address: '',
        notes: '',
        paymentMethod: '',
        lat: null,
        lng: null
    },
    products: [],
})
export const getters = {
    phoneNumber(state) {
        return state.phoneNumber
    },
    shipping_to(state) {
        return state.shipping_to
    },
    products(state) {
        return state.products;
    },
}
export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
    },
    // increaseX(state, productData) {
    //     increase(state,productData,true)
    // },
    addItem(state, productData) {
        const hasProduct = state.products.findIndex(item => item.id === productData.id)
        if (hasProduct > -1) {} else {
            state.products.push(productData)
        }
        state.products.map(item => {
            if (item.id === productData.id) {
                item.quantity = productData.quantity
                item.total_price = item.quantity * item.price
                if (item.selectedAddons) {
                    const priceOfAllAddons = item.selectedAddons.reduce((p, c) => { return c.price + p }, 0)
                    item.totalPriceWithAddons = item.quantity * (item.price + priceOfAllAddons)
                } else {
                    item.totalPriceWithAddons = item.quantity * item.price
                }

                // item.totalPriceWithAddons =
                // item.selectedAddons.map(addon => {
                //     addon.quantity += 1
                //     addon.total_price = addon.quantity * addon.price
                //     item.totalPriceWithAddons += addon.total_price + item.total_price
                // })
            }
            return item;
        })
    },
    increase(state, productData) {
        const hasProduct = state.products.findIndex(item => item.id === productData.id)
        if (hasProduct > -1) {
            //   state.products[hasProduct].quantity += 1
            //   state.products[hasProduct].total_price = state.products[hasProduct].quantity * state.products[hasProduct].price
        } else {
            state.products.push(productData)
        }
        state.products.map(item => {
            if (item.id === productData.id) {
                item.quantity += 1
                item.total_price = item.quantity * item.price
                if (item.selectedAddons) {
                    const priceOfAllAddons = item.selectedAddons.reduce((p, c) => { return c.price + p }, 0)
                    item.totalPriceWithAddons = item.quantity * (item.price + priceOfAllAddons)
                } else {
                    item.totalPriceWithAddons = item.quantity * item.price
                }

                // item.totalPriceWithAddons =
                // item.selectedAddons.map(addon => {
                //     addon.quantity += 1
                //     addon.total_price = addon.quantity * addon.price
                //     item.totalPriceWithAddons += addon.total_price + item.total_price
                // })
            }
            return item;
        })
    },

    decrease(state, productData) {
        const hasProduct = state.products.findIndex(item => item.id === productData.id)
        if (hasProduct > -1) {
            const quantity = state.products[hasProduct].quantity
            if (quantity !== 1) {
                const hasProducts = state.products[hasProduct]
                hasProducts.quantity -= 1
                hasProducts.total_price = hasProducts.quantity * hasProducts.price
                if (hasProducts.selectedAddons) {
                    const priceOfAllAddons = hasProducts.selectedAddons.reduce((p, c) => { return c.price + p }, 0)
                    hasProducts.totalPriceWithAddons = hasProducts.quantity * (hasProducts.price + priceOfAllAddons)
                } else {
                    hasProducts.totalPriceWithAddons = hasProducts.quantity * hasProducts.price
                }
                // state.products.map(item => {
                //     item.quantity -= 1
                //     item.total_price = item.quantity * item.price
                // })
            }
        }
    },
    delete(state, productData) {
        const index = state.products.indexOf(productData);
        if (index > -1) {
            state.products.splice(index, 1);
        }
    },
    resetCart(state) {
        state.products = []
    }
}
export const modules = {
    login,
}