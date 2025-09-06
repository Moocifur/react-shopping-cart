const BASE_URL = 'https://fakestoreapi.com';

export const fakeStoreApi = {

    // Get All Products
    getAllProducts: async () => {
        try {

            // url/page/allproducts
            const response = await fetch(`${BASE_URL}/products`);
            
            // if response is classified as an error
            if (!response.ok) {
                throw new Error(`HTTP error! status :${response.status}`);
            }

            // didnt classify as an error, so return what we got
            return await response.json();

          // Our last line for errors  
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    
    // Get a SINGLE Product
    getProduct: async (id) => {
        try {

            // url/products/idnumber
            const response = await fetch(`${BASE_URL}/products/${id}`);

            //if response is classified as an error
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Passed known error check, now try for our item
            return await response.json();

        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    },

    // Get by Category
    getProductsByCategory: async (category) => {
        try {
            // url/products/category
            const response = await fetch(`${BASE_URL}/products/${category}`);

            // If returned an Error
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // We got thru, take our response, make to json
            return await response.json();
        
        } catch (error) {
            console.error(`Error fetching products in category ${category}:`, error);
            throw error;
        } 
    }
};