// here i write workaround for handling CartChange because in back-end hash doesn't change of that cart, when it updates it's values so i'll check other way in front-end.
// also webworker because updateSubscription isn't available in back-end
let intervalId = null;
let currentCartHash = null;

if (typeof self !== 'undefined') {
  self.onmessage = async (event) => {
    if (event.data.type === 'fetchCart') {
      const { endpoint, token, cartHash } = event.data;
      currentCartHash = cartHash;
      const fetchCartData = async () => {
        try {
          const graphqlQuery = `
                query GetCart {
                    getCart {
                        _id
                        hash
                        items {
                            _id
                            quantity
                            product {
                                _id
                                title
                                cost
                                availableQuantity
                            }
                        }
                        createdAt
                        updatedAt
                    }
                }
            `;

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({ query: graphqlQuery }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `GraphQL Error: ${response.status} - ${errorData?.errors?.[0]?.message || response.statusText}`,
            );
          }
          const { data } = await response.json();
          if (data?.getCart) {
            currentCartItems = data.getCart.items;
            self.postMessage({ type: 'cartUpdate', data: data.getCart });
          } else {
            self.postMessage({ type: 'cartUpdate', data: null });
          }
        } catch (error) {
          self.postMessage({ type: 'error', message: error.message });
        }
      };

      let currentCartItems = [];

      await fetchCartData();
      if (!intervalId) {
        intervalId = setInterval(fetchCartData, 10000);
      }
    } else if (event.data.type === 'stop') {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };

  self.onerror = (error) => {
    console.error('Worker error:', error);
  };
} else {
  console.warn('Web worker not initialized in non-browser environment.');
}
