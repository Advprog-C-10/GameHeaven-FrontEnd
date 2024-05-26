class CartService {
    static BASE_URL = "http://localhost:8080/api";

    static async addCart(cart) {
        try {
            const res = await fetch(`${CartService.BASE_URL}/carts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async getCartsByUserId(userId) {
        try {
            const res = await fetch(`${CartService.BASE_URL}/carts/user/${userId}`, {
                cache: 'no-store',
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async getCartById(id) {
        try {
            const res = await fetch(`${CartService.BASE_URL}/carts/${id}`, {
                cache: 'no-store',
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async updateCartQuantity(id, quantity) {
        try {
            const res = await fetch(`${CartService.BASE_URL}/carts/${id}/${quantity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quantity),
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async deleteCart(id) {
        try {
            await fetch(`${CartService.BASE_URL}/carts/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            throw error;
        }
    }
}

export default CartService;